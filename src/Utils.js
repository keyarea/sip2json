module.exports =  {

    headerize :(string) =>
    {
        const exceptions = {
            'Call-Id'          : 'Call-ID',
            'Cseq'             : 'CSeq',
            'Www-Authenticate' : 'WWW-Authenticate'
        };

        const name = string.toLowerCase()
            .replace(/_/g, '-')
            .split('-');
        let hname = '';
        const parts = name.length;
        let part;

        for (part = 0; part < parts; part++)
        {
            if (part !== 0)
            {
                hname +='-';
            }
            hname += name[part].charAt(0).toUpperCase()+name[part].substring(1);
        }
        if (exceptions[hname])
        {
            hname = exceptions[hname];
        }

        return hname;
    },
    str_utf8_length : (string) => unescape(encodeURIComponent(string)).length,

    /**
     * Hex-escape a SIP URI user.
     * Don't hex-escape ':' (%3A), '+' (%2B), '?' (%3F"), '/' (%2F).
     *
     * Used by 'normalizeTarget'.
     */
    escapeUser: (user) =>
        encodeURIComponent(decodeURIComponent(user))
            .replace(/%3A/ig, ':')
            .replace(/%2B/ig, '+')
            .replace(/%3F/ig, '?')
            .replace(/%2F/ig, '/')
}
