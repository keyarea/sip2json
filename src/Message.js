// import Utils from "./Utils";
// import Grammar from "./Grammar";
// import sdp_transform from "sdp-transform";
// import Constants from "./Constants";
const Utils = require('./Utils');
const Grammar = require('./Grammar');
const sdp_transform = require("sdp-transform");
const Constants = require('./Constants');



class IncomingMessage
{
    constructor()
    {
        this.data = null;
        this.headers = null;
        this.method = null;
        this.via = null;
        this.via_branch = null;
        this.call_id = null;
        this.cseq = null;
        this.from = null;
        this.from_tag = null;
        this.to = null;
        this.to_tag = null;
        this.body = null;
        this.sdp = null;
    }

    /**
     * Insert a header of the given name and value into the last position of the
     * header array.
     */
    addHeader(name, value)
    {
        const header = { raw: value };

        name = Utils.headerize(name);

        if (this.headers[name])
        {
            this.headers[name].push(header);
        }
        else
        {
            this.headers[name] = [ header ];
        }
    }

    /**
     * Get the value of the given header name at the given position.
     */
    getHeader(name)
    {
        const header = this.headers[Utils.headerize(name)];

        if (header)
        {
            if (header[0])
            {
                return header[0].raw;
            }
        }
        else
        {
            return;
        }
    }

    /**
     * Get the header/s of the given name.
     */
    getHeaders(name)
    {
        const headers = this.headers[Utils.headerize(name)];
        const result = [];

        if (!headers)
        {
            return [];
        }

        for (const header of headers)
        {
            result.push(header.raw);
        }

        return result;
    }

    /**
     * Verify the existence of the given header.
     */
    hasHeader(name)
    {
        return !!(this.headers[Utils.headerize(name)]);
    }

    /**
     * Parse the given header on the given index.
     * -param {String} name header name
     * -param {Number} [idx=0] header index
     * -returns {Object|undefined} Parsed header object, undefined if the header
     *  is not present or in case of a parsing error.
     */
    parseHeader(name, idx = 0)
    {
        name = Utils.headerize(name);

        if (!this.headers[name])
        {
            console.log(`header "${name}" not present`);

            return;
        }
        else if (idx >= this.headers[name].length)
        {
            console.log(`not so many "${name}" headers present`);

            return;
        }

        const header = this.headers[name][idx];
        const value = header.raw;

        if (header.parsed)
        {
            return header.parsed;
        }

        // Substitute '-' by '_' for grammar rule matching.
        const parsed = Grammar.parse(value, name.replace(/-/g, '_'));

        if (parsed === -1)
        {
            this.headers[name].splice(idx, 1); // delete from headers
            console.log(`error parsing "${name}" header field with value "${value}"`);

            return;
        }
        else
        {
            header.parsed = parsed;

            return parsed;
        }
    }

    /**
     * Message Header attribute selector. Alias of parseHeader.
     * -param {String} name header name
     * -param {Number} [idx=0] header index
     * -returns {Object|undefined} Parsed header object, undefined if the header
     *  is not present or in case of a parsing error.
     *
     * -example
     * message.s('via',3).port
     */
    s(name, idx)
    {
        return this.parseHeader(name, idx);
    }

    /**
     * Replace the value of the given header by the value.
     * -param {String} name header name
     * -param {String} value header value
     */
    setHeader(name, value)
    {
        const header = { raw: value };

        this.headers[Utils.headerize(name)] = [ header ];
    }

    /**
     * Parse the current body as a SDP and store the resulting object
     * into this.sdp.
     * -param {Boolean} force: Parse even if this.sdp already exists.
     *
     * Returns this.sdp.
     */
    parseSDP(force)
    {
        if (!force && this.sdp)
        {
            return this.sdp;
        }
        else
        {
            this.sdp = sdp_transform.parse(this.body || '');

            return this.sdp;
        }
    }

    toString()
    {
        return this.data;
    }
}

class IncomingRequest extends IncomingMessage
{
    constructor(ua)
    {
        super();

        this.ua = ua;
        this.headers = {};
        this.ruri = null;
        this.transport = null;
        this.server_transaction = null;
    }

    /**
     * Stateful reply.
     * -param {Number} code status code
     * -param {String} reason reason phrase
     * -param {Object} headers extra headers
     * -param {String} body body
     * -param {Function} [onSuccess] onSuccess callback
     * -param {Function} [onFailure] onFailure callback
     */
    reply(code, reason, extraHeaders, body, onSuccess, onFailure)
    {
        const supported = [];
        let to = this.getHeader('To');

        code = code || null;
        reason = reason || null;

        // Validate code and reason values.
        if (!code || (code < 100 || code > 699))
        {
            throw new TypeError(`Invalid status_code: ${code}`);
        }
        else if (reason && typeof reason !== 'string' && !(reason instanceof String))
        {
            throw new TypeError(`Invalid reason_phrase: ${reason}`);
        }

        reason = reason || Constants.REASON_PHRASE[code] || '';
        extraHeaders = Utils.cloneArray(extraHeaders);

        let response = `SIP/2.0 ${code} ${reason}\r\n`;

        if (this.method === Constants.INVITE && code > 100 && code <= 200)
        {
            const headers = this.getHeaders('record-route');

            for (const header of headers)
            {
                response += `Record-Route: ${header}\r\n`;
            }
        }

        const vias = this.getHeaders('via');

        for (const via of vias)
        {
            response += `Via: ${via}\r\n`;
        }

        if (!this.to_tag && code > 100)
        {
            to += `;tag=${Utils.newTag()}`;
        }
        else if (this.to_tag && !this.s('to').hasParam('tag'))
        {
            to += `;tag=${this.to_tag}`;
        }

        response += `To: ${to}\r\n`;
        response += `From: ${this.getHeader('From')}\r\n`;
        response += `Call-ID: ${this.call_id}\r\n`;
        response += `CSeq: ${this.cseq} ${this.method}\r\n`;

        for (const header of extraHeaders)
        {
            response += `${header.trim()}\r\n`;
        }

        // Supported.
        switch (this.method)
        {
            case Constants.INVITE:
                if (this.ua.configuration.session_timers)
                {
                    supported.push('timer');
                }
                if (this.ua.contact.pub_gruu || this.ua.contact.temp_gruu)
                {
                    supported.push('gruu');
                }
                supported.push('ice', 'replaces');
                break;
            case Constants.UPDATE:
                if (this.ua.configuration.session_timers)
                {
                    supported.push('timer');
                }
                if (body)
                {
                    supported.push('ice');
                }
                supported.push('replaces');
        }

        supported.push('outbound');

        // Allow and Accept.
        if (this.method === Constants.OPTIONS)
        {
            response += `Allow: ${Constants.ALLOWED_METHODS}\r\n`;
            response += `Accept: ${Constants.ACCEPTED_BODY_TYPES}\r\n`;
        }
        else if (code === 405)
        {
            response += `Allow: ${Constants.ALLOWED_METHODS}\r\n`;
        }
        else if (code === 415)
        {
            response += `Accept: ${Constants.ACCEPTED_BODY_TYPES}\r\n`;
        }

        response += `Supported: ${supported}\r\n`;

        if (body)
        {
            const length = Utils.str_utf8_length(body);

            response += 'Content-Type: application/sdp\r\n';
            response += `Content-Length: ${length}\r\n\r\n`;
            response += body;
        }
        else
        {
            response += `Content-Length: ${0}\r\n\r\n`;
        }

        this.server_transaction.receiveResponse(code, response, onSuccess, onFailure);
    }

    /**
     * Stateless reply.
     * -param {Number} code status code
     * -param {String} reason reason phrase
     */
    reply_sl(code = null, reason = null)
    {
        const vias = this.getHeaders('via');

        // Validate code and reason values.
        if (!code || (code < 100 || code > 699))
        {
            throw new TypeError(`Invalid status_code: ${code}`);
        }
        else if (reason && typeof reason !== 'string' && !(reason instanceof String))
        {
            throw new TypeError(`Invalid reason_phrase: ${reason}`);
        }

        reason = reason || Constants.REASON_PHRASE[code] || '';

        let response = `SIP/2.0 ${code} ${reason}\r\n`;

        for (const via of vias)
        {
            response += `Via: ${via}\r\n`;
        }

        let to = this.getHeader('To');

        if (!this.to_tag && code > 100)
        {
            to += `;tag=${Utils.newTag()}`;
        }
        else if (this.to_tag && !this.s('to').hasParam('tag'))
        {
            to += `;tag=${this.to_tag}`;
        }

        response += `To: ${to}\r\n`;
        response += `From: ${this.getHeader('From')}\r\n`;
        response += `Call-ID: ${this.call_id}\r\n`;
        response += `CSeq: ${this.cseq} ${this.method}\r\n`;
        response += `Content-Length: ${0}\r\n\r\n`;

        this.transport.send(response);
    }
}

class IncomingResponse extends IncomingMessage
{
    constructor()
    {
        super();

        this.headers = {};
        this.status_code = null;
        this.reason_phrase = null;
    }
}

module.exports = {
    IncomingRequest,
    IncomingResponse
};
