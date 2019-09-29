
module.exports = {
    parse(input, startRule) {
        /*
         * Parses the input with a generated parser. If the parsing is successfull,
         * returns a value explicitly or implicitly specified by the grammar from
         * which the parser was generated (see |PEG.buildParser|). If the parsing is
         * unsuccessful, throws |PEG.parser.SyntaxError| describing the error.
         */
        var parseFunctions = {
            "CRLF": parse_CRLF,
            "DIGIT": parse_DIGIT,
            "ALPHA": parse_ALPHA,
            "HEXDIG": parse_HEXDIG,
            "WSP": parse_WSP,
            "OCTET": parse_OCTET,
            "DQUOTE": parse_DQUOTE,
            "SP": parse_SP,
            "HTAB": parse_HTAB,
            "alphanum": parse_alphanum,
            "reserved": parse_reserved,
            "unreserved": parse_unreserved,
            "mark": parse_mark,
            "escaped": parse_escaped,
            "LWS": parse_LWS,
            "SWS": parse_SWS,
            "HCOLON": parse_HCOLON,
            "TEXT_UTF8_TRIM": parse_TEXT_UTF8_TRIM,
            "TEXT_UTF8char": parse_TEXT_UTF8char,
            "UTF8_NONASCII": parse_UTF8_NONASCII,
            "UTF8_CONT": parse_UTF8_CONT,
            "LHEX": parse_LHEX,
            "token": parse_token,
            "token_nodot": parse_token_nodot,
            "separators": parse_separators,
            "word": parse_word,
            "STAR": parse_STAR,
            "SLASH": parse_SLASH,
            "EQUAL": parse_EQUAL,
            "LPAREN": parse_LPAREN,
            "RPAREN": parse_RPAREN,
            "RAQUOT": parse_RAQUOT,
            "LAQUOT": parse_LAQUOT,
            "COMMA": parse_COMMA,
            "SEMI": parse_SEMI,
            "COLON": parse_COLON,
            "LDQUOT": parse_LDQUOT,
            "RDQUOT": parse_RDQUOT,
            "comment": parse_comment,
            "ctext": parse_ctext,
            "quoted_string": parse_quoted_string,
            "quoted_string_clean": parse_quoted_string_clean,
            "qdtext": parse_qdtext,
            "quoted_pair": parse_quoted_pair,
            "SIP_URI_noparams": parse_SIP_URI_noparams,
            "SIP_URI": parse_SIP_URI,
            "uri_scheme": parse_uri_scheme,
            "uri_scheme_sips": parse_uri_scheme_sips,
            "uri_scheme_sip": parse_uri_scheme_sip,
            "userinfo": parse_userinfo,
            "user": parse_user,
            "user_unreserved": parse_user_unreserved,
            "password": parse_password,
            "hostport": parse_hostport,
            "host": parse_host,
            "hostname": parse_hostname,
            "domainlabel": parse_domainlabel,
            "toplabel": parse_toplabel,
            "IPv6reference": parse_IPv6reference,
            "IPv6address": parse_IPv6address,
            "h16": parse_h16,
            "ls32": parse_ls32,
            "IPv4address": parse_IPv4address,
            "dec_octet": parse_dec_octet,
            "port": parse_port,
            "uri_parameters": parse_uri_parameters,
            "uri_parameter": parse_uri_parameter,
            "transport_param": parse_transport_param,
            "user_param": parse_user_param,
            "method_param": parse_method_param,
            "ttl_param": parse_ttl_param,
            "maddr_param": parse_maddr_param,
            "lr_param": parse_lr_param,
            "other_param": parse_other_param,
            "pname": parse_pname,
            "pvalue": parse_pvalue,
            "paramchar": parse_paramchar,
            "param_unreserved": parse_param_unreserved,
            "headers": parse_headers,
            "header": parse_header,
            "hname": parse_hname,
            "hvalue": parse_hvalue,
            "hnv_unreserved": parse_hnv_unreserved,
            "Request_Response": parse_Request_Response,
            "Request_Line": parse_Request_Line,
            "Request_URI": parse_Request_URI,
            "absoluteURI": parse_absoluteURI,
            "hier_part": parse_hier_part,
            "net_path": parse_net_path,
            "abs_path": parse_abs_path,
            "opaque_part": parse_opaque_part,
            "uric": parse_uric,
            "uric_no_slash": parse_uric_no_slash,
            "path_segments": parse_path_segments,
            "segment": parse_segment,
            "param": parse_param,
            "pchar": parse_pchar,
            "scheme": parse_scheme,
            "authority": parse_authority,
            "srvr": parse_srvr,
            "reg_name": parse_reg_name,
            "query": parse_query,
            "SIP_Version": parse_SIP_Version,
            "INVITEm": parse_INVITEm,
            "ACKm": parse_ACKm,
            "OPTIONSm": parse_OPTIONSm,
            "BYEm": parse_BYEm,
            "CANCELm": parse_CANCELm,
            "REGISTERm": parse_REGISTERm,
            "SUBSCRIBEm": parse_SUBSCRIBEm,
            "NOTIFYm": parse_NOTIFYm,
            "REFERm": parse_REFERm,
            "Method": parse_Method,
            "Status_Line": parse_Status_Line,
            "Status_Code": parse_Status_Code,
            "extension_code": parse_extension_code,
            "Reason_Phrase": parse_Reason_Phrase,
            "Allow_Events": parse_Allow_Events,
            "Call_ID": parse_Call_ID,
            "Contact": parse_Contact,
            "contact_param": parse_contact_param,
            "name_addr": parse_name_addr,
            "display_name": parse_display_name,
            "contact_params": parse_contact_params,
            "c_p_q": parse_c_p_q,
            "c_p_expires": parse_c_p_expires,
            "delta_seconds": parse_delta_seconds,
            "qvalue": parse_qvalue,
            "generic_param": parse_generic_param,
            "gen_value": parse_gen_value,
            "Content_Disposition": parse_Content_Disposition,
            "disp_type": parse_disp_type,
            "disp_param": parse_disp_param,
            "handling_param": parse_handling_param,
            "Content_Encoding": parse_Content_Encoding,
            "Content_Length": parse_Content_Length,
            "Content_Type": parse_Content_Type,
            "media_type": parse_media_type,
            "m_type": parse_m_type,
            "discrete_type": parse_discrete_type,
            "composite_type": parse_composite_type,
            "extension_token": parse_extension_token,
            "x_token": parse_x_token,
            "m_subtype": parse_m_subtype,
            "m_parameter": parse_m_parameter,
            "m_value": parse_m_value,
            "CSeq": parse_CSeq,
            "CSeq_value": parse_CSeq_value,
            "Expires": parse_Expires,
            "Event": parse_Event,
            "event_type": parse_event_type,
            "From": parse_From,
            "from_param": parse_from_param,
            "tag_param": parse_tag_param,
            "Max_Forwards": parse_Max_Forwards,
            "Min_Expires": parse_Min_Expires,
            "Name_Addr_Header": parse_Name_Addr_Header,
            "Proxy_Authenticate": parse_Proxy_Authenticate,
            "challenge": parse_challenge,
            "other_challenge": parse_other_challenge,
            "auth_param": parse_auth_param,
            "digest_cln": parse_digest_cln,
            "realm": parse_realm,
            "realm_value": parse_realm_value,
            "domain": parse_domain,
            "URI": parse_URI,
            "nonce": parse_nonce,
            "nonce_value": parse_nonce_value,
            "opaque": parse_opaque,
            "stale": parse_stale,
            "algorithm": parse_algorithm,
            "qop_options": parse_qop_options,
            "qop_value": parse_qop_value,
            "Proxy_Require": parse_Proxy_Require,
            "Record_Route": parse_Record_Route,
            "rec_route": parse_rec_route,
            "Reason": parse_Reason,
            "reason_param": parse_reason_param,
            "reason_cause": parse_reason_cause,
            "Require": parse_Require,
            "Route": parse_Route,
            "route_param": parse_route_param,
            "Subscription_State": parse_Subscription_State,
            "substate_value": parse_substate_value,
            "subexp_params": parse_subexp_params,
            "event_reason_value": parse_event_reason_value,
            "Subject": parse_Subject,
            "Supported": parse_Supported,
            "To": parse_To,
            "to_param": parse_to_param,
            "Via": parse_Via,
            "via_param": parse_via_param,
            "via_params": parse_via_params,
            "via_ttl": parse_via_ttl,
            "via_maddr": parse_via_maddr,
            "via_received": parse_via_received,
            "via_branch": parse_via_branch,
            "response_port": parse_response_port,
            "sent_protocol": parse_sent_protocol,
            "protocol_name": parse_protocol_name,
            "transport": parse_transport,
            "sent_by": parse_sent_by,
            "via_host": parse_via_host,
            "via_port": parse_via_port,
            "ttl": parse_ttl,
            "WWW_Authenticate": parse_WWW_Authenticate,
            "Session_Expires": parse_Session_Expires,
            "s_e_expires": parse_s_e_expires,
            "s_e_params": parse_s_e_params,
            "s_e_refresher": parse_s_e_refresher,
            "extension_header": parse_extension_header,
            "header_value": parse_header_value,
            "message_body": parse_message_body,
            "uuid_URI": parse_uuid_URI,
            "uuid": parse_uuid,
            "hex4": parse_hex4,
            "hex8": parse_hex8,
            "hex12": parse_hex12,
            "Refer_To": parse_Refer_To,
            "Replaces": parse_Replaces,
            "call_id": parse_call_id,
            "replaces_param": parse_replaces_param,
            "to_tag": parse_to_tag,
            "from_tag": parse_from_tag,
            "early_flag": parse_early_flag
        };
        if (startRule !== undefined) {
            if (parseFunctions[startRule] === undefined) {
                throw new Error("Invalid rule name: " + quote(startRule) + ".");
            }
        } else {
            startRule = "CRLF";
        }
        var pos = 0;
        var reportFailures = 0;
        var rightmostFailuresPos = 0;
        var rightmostFailuresExpected = [];

        function padLeft(input, padding, length) {
            var result = input;
            var padLength = length - input.length;
            for (var i = 0; i < padLength; i++) {
                result = padding + result;
            }
            return result;
        }

        function escape(ch) {
            var charCode = ch.charCodeAt(0);
            var escapeChar;
            var length;
            if (charCode <= 0xFF) {
                escapeChar = 'x';
                length = 2;
            } else {
                escapeChar = 'u';
                length = 4;
            }
            return '\\' + escapeChar + padLeft(charCode.toString(16).toUpperCase(), '0', length);
        }

        function matchFailed(failure) {
            if (pos < rightmostFailuresPos) {
                return;
            }
            if (pos > rightmostFailuresPos) {
                rightmostFailuresPos = pos;
                rightmostFailuresExpected = [];
            }
            rightmostFailuresExpected.push(failure);
        }

        function parse_CRLF() {
            var result0;
            if (input.substr(pos, 2) === "\r\n") {
                result0 = "\r\n";
                pos += 2;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"\\r\\n\"");
                }
            }
            return result0;
        }

        function parse_DIGIT() {
            var result0;
            if (/^[0-9]/.test(input.charAt(pos))) {
                result0 = input.charAt(pos);
                pos++;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("[0-9]");
                }
            }
            return result0;
        }

        function parse_ALPHA() {
            var result0;
            if (/^[a-zA-Z]/.test(input.charAt(pos))) {
                result0 = input.charAt(pos);
                pos++;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("[a-zA-Z]");
                }
            }
            return result0;
        }

        function parse_HEXDIG() {
            var result0;
            if (/^[0-9a-fA-F]/.test(input.charAt(pos))) {
                result0 = input.charAt(pos);
                pos++;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("[0-9a-fA-F]");
                }
            }
            return result0;
        }

        function parse_WSP() {
            var result0;
            result0 = parse_SP();
            if (result0 === null) {
                result0 = parse_HTAB();
            }
            return result0;
        }

        function parse_OCTET() {
            var result0;
            if (/^[\0-\xFF]/.test(input.charAt(pos))) {
                result0 = input.charAt(pos);
                pos++;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("[\\0-\\xFF]");
                }
            }
            return result0;
        }

        function parse_DQUOTE() {
            var result0;
            if (/^["]/.test(input.charAt(pos))) {
                result0 = input.charAt(pos);
                pos++;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("[\"]");
                }
            }
            return result0;
        }

        function parse_SP() {
            var result0;
            if (input.charCodeAt(pos) === 32) {
                result0 = " ";
                pos++;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\" \"");
                }
            }
            return result0;
        }

        function parse_HTAB() {
            var result0;
            if (input.charCodeAt(pos) === 9) {
                result0 = "\t";
                pos++;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"\\t\"");
                }
            }
            return result0;
        }

        function parse_alphanum() {
            var result0;
            if (/^[a-zA-Z0-9]/.test(input.charAt(pos))) {
                result0 = input.charAt(pos);
                pos++;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("[a-zA-Z0-9]");
                }
            }
            return result0;
        }

        function parse_reserved() {
            var result0;
            if (input.charCodeAt(pos) === 59) {
                result0 = ";";
                pos++;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\";\"");
                }
            }
            if (result0 === null) {
                if (input.charCodeAt(pos) === 47) {
                    result0 = "/";
                    pos++;
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"/\"");
                    }
                }
                if (result0 === null) {
                    if (input.charCodeAt(pos) === 63) {
                        result0 = "?";
                        pos++;
                    } else {
                        result0 = null;
                        if (reportFailures === 0) {
                            matchFailed("\"?\"");
                        }
                    }
                    if (result0 === null) {
                        if (input.charCodeAt(pos) === 58) {
                            result0 = ":";
                            pos++;
                        } else {
                            result0 = null;
                            if (reportFailures === 0) {
                                matchFailed("\":\"");
                            }
                        }
                        if (result0 === null) {
                            if (input.charCodeAt(pos) === 64) {
                                result0 = "@";
                                pos++;
                            } else {
                                result0 = null;
                                if (reportFailures === 0) {
                                    matchFailed("\"@\"");
                                }
                            }
                            if (result0 === null) {
                                if (input.charCodeAt(pos) === 38) {
                                    result0 = "&";
                                    pos++;
                                } else {
                                    result0 = null;
                                    if (reportFailures === 0) {
                                        matchFailed("\"&\"");
                                    }
                                }
                                if (result0 === null) {
                                    if (input.charCodeAt(pos) === 61) {
                                        result0 = "=";
                                        pos++;
                                    } else {
                                        result0 = null;
                                        if (reportFailures === 0) {
                                            matchFailed("\"=\"");
                                        }
                                    }
                                    if (result0 === null) {
                                        if (input.charCodeAt(pos) === 43) {
                                            result0 = "+";
                                            pos++;
                                        } else {
                                            result0 = null;
                                            if (reportFailures === 0) {
                                                matchFailed("\"+\"");
                                            }
                                        }
                                        if (result0 === null) {
                                            if (input.charCodeAt(pos) === 36) {
                                                result0 = "$";
                                                pos++;
                                            } else {
                                                result0 = null;
                                                if (reportFailures === 0) {
                                                    matchFailed("\"$\"");
                                                }
                                            }
                                            if (result0 === null) {
                                                if (input.charCodeAt(pos) === 44) {
                                                    result0 = ",";
                                                    pos++;
                                                } else {
                                                    result0 = null;
                                                    if (reportFailures === 0) {
                                                        matchFailed("\",\"");
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return result0;
        }

        function parse_unreserved() {
            var result0;
            result0 = parse_alphanum();
            if (result0 === null) {
                result0 = parse_mark();
            }
            return result0;
        }

        function parse_mark() {
            var result0;
            if (input.charCodeAt(pos) === 45) {
                result0 = "-";
                pos++;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"-\"");
                }
            }
            if (result0 === null) {
                if (input.charCodeAt(pos) === 95) {
                    result0 = "_";
                    pos++;
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"_\"");
                    }
                }
                if (result0 === null) {
                    if (input.charCodeAt(pos) === 46) {
                        result0 = ".";
                        pos++;
                    } else {
                        result0 = null;
                        if (reportFailures === 0) {
                            matchFailed("\".\"");
                        }
                    }
                    if (result0 === null) {
                        if (input.charCodeAt(pos) === 33) {
                            result0 = "!";
                            pos++;
                        } else {
                            result0 = null;
                            if (reportFailures === 0) {
                                matchFailed("\"!\"");
                            }
                        }
                        if (result0 === null) {
                            if (input.charCodeAt(pos) === 126) {
                                result0 = "~";
                                pos++;
                            } else {
                                result0 = null;
                                if (reportFailures === 0) {
                                    matchFailed("\"~\"");
                                }
                            }
                            if (result0 === null) {
                                if (input.charCodeAt(pos) === 42) {
                                    result0 = "*";
                                    pos++;
                                } else {
                                    result0 = null;
                                    if (reportFailures === 0) {
                                        matchFailed("\"*\"");
                                    }
                                }
                                if (result0 === null) {
                                    if (input.charCodeAt(pos) === 39) {
                                        result0 = "'";
                                        pos++;
                                    } else {
                                        result0 = null;
                                        if (reportFailures === 0) {
                                            matchFailed("\"'\"");
                                        }
                                    }
                                    if (result0 === null) {
                                        if (input.charCodeAt(pos) === 40) {
                                            result0 = "(";
                                            pos++;
                                        } else {
                                            result0 = null;
                                            if (reportFailures === 0) {
                                                matchFailed("\"(\"");
                                            }
                                        }
                                        if (result0 === null) {
                                            if (input.charCodeAt(pos) === 41) {
                                                result0 = ")";
                                                pos++;
                                            } else {
                                                result0 = null;
                                                if (reportFailures === 0) {
                                                    matchFailed("\")\"");
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return result0;
        }

        function parse_escaped() {
            var result0, result1, result2;
            var pos0, pos1;
            pos0 = pos;
            pos1 = pos;
            if (input.charCodeAt(pos) === 37) {
                result0 = "%";
                pos++;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"%\"");
                }
            }
            if (result0 !== null) {
                result1 = parse_HEXDIG();
                if (result1 !== null) {
                    result2 = parse_HEXDIG();
                    if (result2 !== null) {
                        result0 = [result0, result1, result2];
                    } else {
                        result0 = null;
                        pos = pos1;
                    }
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset, escaped) {
                    return escaped.join('');
                })(pos0, result0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_LWS() {
            var result0, result1, result2;
            var pos0, pos1, pos2;
            pos0 = pos;
            pos1 = pos;
            pos2 = pos;
            result0 = [];
            result1 = parse_WSP();
            while (result1 !== null) {
                result0.push(result1);
                result1 = parse_WSP();
            }
            if (result0 !== null) {
                result1 = parse_CRLF();
                if (result1 !== null) {
                    result0 = [result0, result1];
                } else {
                    result0 = null;
                    pos = pos2;
                }
            } else {
                result0 = null;
                pos = pos2;
            }
            result0 = result0 !== null ? result0 : "";
            if (result0 !== null) {
                result2 = parse_WSP();
                if (result2 !== null) {
                    result1 = [];
                    while (result2 !== null) {
                        result1.push(result2);
                        result2 = parse_WSP();
                    }
                } else {
                    result1 = null;
                }
                if (result1 !== null) {
                    result0 = [result0, result1];
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset) {
                    return " ";
                })(pos0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_SWS() {
            var result0;
            result0 = parse_LWS();
            result0 = result0 !== null ? result0 : "";
            return result0;
        }

        function parse_HCOLON() {
            var result0, result1, result2;
            var pos0, pos1;
            pos0 = pos;
            pos1 = pos;
            result0 = [];
            result1 = parse_SP();
            if (result1 === null) {
                result1 = parse_HTAB();
            }
            while (result1 !== null) {
                result0.push(result1);
                result1 = parse_SP();
                if (result1 === null) {
                    result1 = parse_HTAB();
                }
            }
            if (result0 !== null) {
                if (input.charCodeAt(pos) === 58) {
                    result1 = ":";
                    pos++;
                } else {
                    result1 = null;
                    if (reportFailures === 0) {
                        matchFailed("\":\"");
                    }
                }
                if (result1 !== null) {
                    result2 = parse_SWS();
                    if (result2 !== null) {
                        result0 = [result0, result1, result2];
                    } else {
                        result0 = null;
                        pos = pos1;
                    }
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset) {
                    return ':';
                })(pos0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_TEXT_UTF8_TRIM() {
            var result0, result1, result2, result3;
            var pos0, pos1, pos2;
            pos0 = pos;
            pos1 = pos;
            result1 = parse_TEXT_UTF8char();
            if (result1 !== null) {
                result0 = [];
                while (result1 !== null) {
                    result0.push(result1);
                    result1 = parse_TEXT_UTF8char();
                }
            } else {
                result0 = null;
            }
            if (result0 !== null) {
                result1 = [];
                pos2 = pos;
                result2 = [];
                result3 = parse_LWS();
                while (result3 !== null) {
                    result2.push(result3);
                    result3 = parse_LWS();
                }
                if (result2 !== null) {
                    result3 = parse_TEXT_UTF8char();
                    if (result3 !== null) {
                        result2 = [result2, result3];
                    } else {
                        result2 = null;
                        pos = pos2;
                    }
                } else {
                    result2 = null;
                    pos = pos2;
                }
                while (result2 !== null) {
                    result1.push(result2);
                    pos2 = pos;
                    result2 = [];
                    result3 = parse_LWS();
                    while (result3 !== null) {
                        result2.push(result3);
                        result3 = parse_LWS();
                    }
                    if (result2 !== null) {
                        result3 = parse_TEXT_UTF8char();
                        if (result3 !== null) {
                            result2 = [result2, result3];
                        } else {
                            result2 = null;
                            pos = pos2;
                        }
                    } else {
                        result2 = null;
                        pos = pos2;
                    }
                }
                if (result1 !== null) {
                    result0 = [result0, result1];
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset) {
                    return input.substring(pos, offset);
                })(pos0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_TEXT_UTF8char() {
            var result0;
            if (/^[!-~]/.test(input.charAt(pos))) {
                result0 = input.charAt(pos);
                pos++;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("[!-~]");
                }
            }
            if (result0 === null) {
                result0 = parse_UTF8_NONASCII();
            }
            return result0;
        }

        function parse_UTF8_NONASCII() {
            var result0;
            if (/^[\x80-\uFFFF]/.test(input.charAt(pos))) {
                result0 = input.charAt(pos);
                pos++;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("[\\x80-\\uFFFF]");
                }
            }
            return result0;
        }

        function parse_UTF8_CONT() {
            var result0;
            if (/^[\x80-\xBF]/.test(input.charAt(pos))) {
                result0 = input.charAt(pos);
                pos++;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("[\\x80-\\xBF]");
                }
            }
            return result0;
        }

        function parse_LHEX() {
            var result0;
            result0 = parse_DIGIT();
            if (result0 === null) {
                if (/^[a-f]/.test(input.charAt(pos))) {
                    result0 = input.charAt(pos);
                    pos++;
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("[a-f]");
                    }
                }
            }
            return result0;
        }

        function parse_token() {
            var result0, result1;
            var pos0;
            pos0 = pos;
            result1 = parse_alphanum();
            if (result1 === null) {
                if (input.charCodeAt(pos) === 45) {
                    result1 = "-";
                    pos++;
                } else {
                    result1 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"-\"");
                    }
                }
                if (result1 === null) {
                    if (input.charCodeAt(pos) === 46) {
                        result1 = ".";
                        pos++;
                    } else {
                        result1 = null;
                        if (reportFailures === 0) {
                            matchFailed("\".\"");
                        }
                    }
                    if (result1 === null) {
                        if (input.charCodeAt(pos) === 33) {
                            result1 = "!";
                            pos++;
                        } else {
                            result1 = null;
                            if (reportFailures === 0) {
                                matchFailed("\"!\"");
                            }
                        }
                        if (result1 === null) {
                            if (input.charCodeAt(pos) === 37) {
                                result1 = "%";
                                pos++;
                            } else {
                                result1 = null;
                                if (reportFailures === 0) {
                                    matchFailed("\"%\"");
                                }
                            }
                            if (result1 === null) {
                                if (input.charCodeAt(pos) === 42) {
                                    result1 = "*";
                                    pos++;
                                } else {
                                    result1 = null;
                                    if (reportFailures === 0) {
                                        matchFailed("\"*\"");
                                    }
                                }
                                if (result1 === null) {
                                    if (input.charCodeAt(pos) === 95) {
                                        result1 = "_";
                                        pos++;
                                    } else {
                                        result1 = null;
                                        if (reportFailures === 0) {
                                            matchFailed("\"_\"");
                                        }
                                    }
                                    if (result1 === null) {
                                        if (input.charCodeAt(pos) === 43) {
                                            result1 = "+";
                                            pos++;
                                        } else {
                                            result1 = null;
                                            if (reportFailures === 0) {
                                                matchFailed("\"+\"");
                                            }
                                        }
                                        if (result1 === null) {
                                            if (input.charCodeAt(pos) === 96) {
                                                result1 = "`";
                                                pos++;
                                            } else {
                                                result1 = null;
                                                if (reportFailures === 0) {
                                                    matchFailed("\"`\"");
                                                }
                                            }
                                            if (result1 === null) {
                                                if (input.charCodeAt(pos) === 39) {
                                                    result1 = "'";
                                                    pos++;
                                                } else {
                                                    result1 = null;
                                                    if (reportFailures === 0) {
                                                        matchFailed("\"'\"");
                                                    }
                                                }
                                                if (result1 === null) {
                                                    if (input.charCodeAt(pos) === 126) {
                                                        result1 = "~";
                                                        pos++;
                                                    } else {
                                                        result1 = null;
                                                        if (reportFailures === 0) {
                                                            matchFailed("\"~\"");
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (result1 !== null) {
                result0 = [];
                while (result1 !== null) {
                    result0.push(result1);
                    result1 = parse_alphanum();
                    if (result1 === null) {
                        if (input.charCodeAt(pos) === 45) {
                            result1 = "-";
                            pos++;
                        } else {
                            result1 = null;
                            if (reportFailures === 0) {
                                matchFailed("\"-\"");
                            }
                        }
                        if (result1 === null) {
                            if (input.charCodeAt(pos) === 46) {
                                result1 = ".";
                                pos++;
                            } else {
                                result1 = null;
                                if (reportFailures === 0) {
                                    matchFailed("\".\"");
                                }
                            }
                            if (result1 === null) {
                                if (input.charCodeAt(pos) === 33) {
                                    result1 = "!";
                                    pos++;
                                } else {
                                    result1 = null;
                                    if (reportFailures === 0) {
                                        matchFailed("\"!\"");
                                    }
                                }
                                if (result1 === null) {
                                    if (input.charCodeAt(pos) === 37) {
                                        result1 = "%";
                                        pos++;
                                    } else {
                                        result1 = null;
                                        if (reportFailures === 0) {
                                            matchFailed("\"%\"");
                                        }
                                    }
                                    if (result1 === null) {
                                        if (input.charCodeAt(pos) === 42) {
                                            result1 = "*";
                                            pos++;
                                        } else {
                                            result1 = null;
                                            if (reportFailures === 0) {
                                                matchFailed("\"*\"");
                                            }
                                        }
                                        if (result1 === null) {
                                            if (input.charCodeAt(pos) === 95) {
                                                result1 = "_";
                                                pos++;
                                            } else {
                                                result1 = null;
                                                if (reportFailures === 0) {
                                                    matchFailed("\"_\"");
                                                }
                                            }
                                            if (result1 === null) {
                                                if (input.charCodeAt(pos) === 43) {
                                                    result1 = "+";
                                                    pos++;
                                                } else {
                                                    result1 = null;
                                                    if (reportFailures === 0) {
                                                        matchFailed("\"+\"");
                                                    }
                                                }
                                                if (result1 === null) {
                                                    if (input.charCodeAt(pos) === 96) {
                                                        result1 = "`";
                                                        pos++;
                                                    } else {
                                                        result1 = null;
                                                        if (reportFailures === 0) {
                                                            matchFailed("\"`\"");
                                                        }
                                                    }
                                                    if (result1 === null) {
                                                        if (input.charCodeAt(pos) === 39) {
                                                            result1 = "'";
                                                            pos++;
                                                        } else {
                                                            result1 = null;
                                                            if (reportFailures === 0) {
                                                                matchFailed("\"'\"");
                                                            }
                                                        }
                                                        if (result1 === null) {
                                                            if (input.charCodeAt(pos) === 126) {
                                                                result1 = "~";
                                                                pos++;
                                                            } else {
                                                                result1 = null;
                                                                if (reportFailures === 0) {
                                                                    matchFailed("\"~\"");
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                result0 = null;
            }
            if (result0 !== null) {
                result0 = (function (offset) {
                    return input.substring(pos, offset);
                })(pos0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_token_nodot() {
            var result0, result1;
            var pos0;
            pos0 = pos;
            result1 = parse_alphanum();
            if (result1 === null) {
                if (input.charCodeAt(pos) === 45) {
                    result1 = "-";
                    pos++;
                } else {
                    result1 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"-\"");
                    }
                }
                if (result1 === null) {
                    if (input.charCodeAt(pos) === 33) {
                        result1 = "!";
                        pos++;
                    } else {
                        result1 = null;
                        if (reportFailures === 0) {
                            matchFailed("\"!\"");
                        }
                    }
                    if (result1 === null) {
                        if (input.charCodeAt(pos) === 37) {
                            result1 = "%";
                            pos++;
                        } else {
                            result1 = null;
                            if (reportFailures === 0) {
                                matchFailed("\"%\"");
                            }
                        }
                        if (result1 === null) {
                            if (input.charCodeAt(pos) === 42) {
                                result1 = "*";
                                pos++;
                            } else {
                                result1 = null;
                                if (reportFailures === 0) {
                                    matchFailed("\"*\"");
                                }
                            }
                            if (result1 === null) {
                                if (input.charCodeAt(pos) === 95) {
                                    result1 = "_";
                                    pos++;
                                } else {
                                    result1 = null;
                                    if (reportFailures === 0) {
                                        matchFailed("\"_\"");
                                    }
                                }
                                if (result1 === null) {
                                    if (input.charCodeAt(pos) === 43) {
                                        result1 = "+";
                                        pos++;
                                    } else {
                                        result1 = null;
                                        if (reportFailures === 0) {
                                            matchFailed("\"+\"");
                                        }
                                    }
                                    if (result1 === null) {
                                        if (input.charCodeAt(pos) === 96) {
                                            result1 = "`";
                                            pos++;
                                        } else {
                                            result1 = null;
                                            if (reportFailures === 0) {
                                                matchFailed("\"`\"");
                                            }
                                        }
                                        if (result1 === null) {
                                            if (input.charCodeAt(pos) === 39) {
                                                result1 = "'";
                                                pos++;
                                            } else {
                                                result1 = null;
                                                if (reportFailures === 0) {
                                                    matchFailed("\"'\"");
                                                }
                                            }
                                            if (result1 === null) {
                                                if (input.charCodeAt(pos) === 126) {
                                                    result1 = "~";
                                                    pos++;
                                                } else {
                                                    result1 = null;
                                                    if (reportFailures === 0) {
                                                        matchFailed("\"~\"");
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (result1 !== null) {
                result0 = [];
                while (result1 !== null) {
                    result0.push(result1);
                    result1 = parse_alphanum();
                    if (result1 === null) {
                        if (input.charCodeAt(pos) === 45) {
                            result1 = "-";
                            pos++;
                        } else {
                            result1 = null;
                            if (reportFailures === 0) {
                                matchFailed("\"-\"");
                            }
                        }
                        if (result1 === null) {
                            if (input.charCodeAt(pos) === 33) {
                                result1 = "!";
                                pos++;
                            } else {
                                result1 = null;
                                if (reportFailures === 0) {
                                    matchFailed("\"!\"");
                                }
                            }
                            if (result1 === null) {
                                if (input.charCodeAt(pos) === 37) {
                                    result1 = "%";
                                    pos++;
                                } else {
                                    result1 = null;
                                    if (reportFailures === 0) {
                                        matchFailed("\"%\"");
                                    }
                                }
                                if (result1 === null) {
                                    if (input.charCodeAt(pos) === 42) {
                                        result1 = "*";
                                        pos++;
                                    } else {
                                        result1 = null;
                                        if (reportFailures === 0) {
                                            matchFailed("\"*\"");
                                        }
                                    }
                                    if (result1 === null) {
                                        if (input.charCodeAt(pos) === 95) {
                                            result1 = "_";
                                            pos++;
                                        } else {
                                            result1 = null;
                                            if (reportFailures === 0) {
                                                matchFailed("\"_\"");
                                            }
                                        }
                                        if (result1 === null) {
                                            if (input.charCodeAt(pos) === 43) {
                                                result1 = "+";
                                                pos++;
                                            } else {
                                                result1 = null;
                                                if (reportFailures === 0) {
                                                    matchFailed("\"+\"");
                                                }
                                            }
                                            if (result1 === null) {
                                                if (input.charCodeAt(pos) === 96) {
                                                    result1 = "`";
                                                    pos++;
                                                } else {
                                                    result1 = null;
                                                    if (reportFailures === 0) {
                                                        matchFailed("\"`\"");
                                                    }
                                                }
                                                if (result1 === null) {
                                                    if (input.charCodeAt(pos) === 39) {
                                                        result1 = "'";
                                                        pos++;
                                                    } else {
                                                        result1 = null;
                                                        if (reportFailures === 0) {
                                                            matchFailed("\"'\"");
                                                        }
                                                    }
                                                    if (result1 === null) {
                                                        if (input.charCodeAt(pos) === 126) {
                                                            result1 = "~";
                                                            pos++;
                                                        } else {
                                                            result1 = null;
                                                            if (reportFailures === 0) {
                                                                matchFailed("\"~\"");
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                result0 = null;
            }
            if (result0 !== null) {
                result0 = (function (offset) {
                    return input.substring(pos, offset);
                })(pos0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_separators() {
            var result0;
            if (input.charCodeAt(pos) === 40) {
                result0 = "(";
                pos++;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"(\"");
                }
            }
            if (result0 === null) {
                if (input.charCodeAt(pos) === 41) {
                    result0 = ")";
                    pos++;
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("\")\"");
                    }
                }
                if (result0 === null) {
                    if (input.charCodeAt(pos) === 60) {
                        result0 = "<";
                        pos++;
                    } else {
                        result0 = null;
                        if (reportFailures === 0) {
                            matchFailed("\"<\"");
                        }
                    }
                    if (result0 === null) {
                        if (input.charCodeAt(pos) === 62) {
                            result0 = ">";
                            pos++;
                        } else {
                            result0 = null;
                            if (reportFailures === 0) {
                                matchFailed("\">\"");
                            }
                        }
                        if (result0 === null) {
                            if (input.charCodeAt(pos) === 64) {
                                result0 = "@";
                                pos++;
                            } else {
                                result0 = null;
                                if (reportFailures === 0) {
                                    matchFailed("\"@\"");
                                }
                            }
                            if (result0 === null) {
                                if (input.charCodeAt(pos) === 44) {
                                    result0 = ",";
                                    pos++;
                                } else {
                                    result0 = null;
                                    if (reportFailures === 0) {
                                        matchFailed("\",\"");
                                    }
                                }
                                if (result0 === null) {
                                    if (input.charCodeAt(pos) === 59) {
                                        result0 = ";";
                                        pos++;
                                    } else {
                                        result0 = null;
                                        if (reportFailures === 0) {
                                            matchFailed("\";\"");
                                        }
                                    }
                                    if (result0 === null) {
                                        if (input.charCodeAt(pos) === 58) {
                                            result0 = ":";
                                            pos++;
                                        } else {
                                            result0 = null;
                                            if (reportFailures === 0) {
                                                matchFailed("\":\"");
                                            }
                                        }
                                        if (result0 === null) {
                                            if (input.charCodeAt(pos) === 92) {
                                                result0 = "\\";
                                                pos++;
                                            } else {
                                                result0 = null;
                                                if (reportFailures === 0) {
                                                    matchFailed("\"\\\\\"");
                                                }
                                            }
                                            if (result0 === null) {
                                                result0 = parse_DQUOTE();
                                                if (result0 === null) {
                                                    if (input.charCodeAt(pos) === 47) {
                                                        result0 = "/";
                                                        pos++;
                                                    } else {
                                                        result0 = null;
                                                        if (reportFailures === 0) {
                                                            matchFailed("\"/\"");
                                                        }
                                                    }
                                                    if (result0 === null) {
                                                        if (input.charCodeAt(pos) === 91) {
                                                            result0 = "[";
                                                            pos++;
                                                        } else {
                                                            result0 = null;
                                                            if (reportFailures === 0) {
                                                                matchFailed("\"[\"");
                                                            }
                                                        }
                                                        if (result0 === null) {
                                                            if (input.charCodeAt(pos) === 93) {
                                                                result0 = "]";
                                                                pos++;
                                                            } else {
                                                                result0 = null;
                                                                if (reportFailures === 0) {
                                                                    matchFailed("\"]\"");
                                                                }
                                                            }
                                                            if (result0 === null) {
                                                                if (input.charCodeAt(pos) === 63) {
                                                                    result0 = "?";
                                                                    pos++;
                                                                } else {
                                                                    result0 = null;
                                                                    if (reportFailures === 0) {
                                                                        matchFailed("\"?\"");
                                                                    }
                                                                }
                                                                if (result0 === null) {
                                                                    if (input.charCodeAt(pos) === 61) {
                                                                        result0 = "=";
                                                                        pos++;
                                                                    } else {
                                                                        result0 = null;
                                                                        if (reportFailures === 0) {
                                                                            matchFailed("\"=\"");
                                                                        }
                                                                    }
                                                                    if (result0 === null) {
                                                                        if (input.charCodeAt(pos) === 123) {
                                                                            result0 = "{";
                                                                            pos++;
                                                                        } else {
                                                                            result0 = null;
                                                                            if (reportFailures === 0) {
                                                                                matchFailed("\"{\"");
                                                                            }
                                                                        }
                                                                        if (result0 === null) {
                                                                            if (input.charCodeAt(pos) === 125) {
                                                                                result0 = "}";
                                                                                pos++;
                                                                            } else {
                                                                                result0 = null;
                                                                                if (reportFailures === 0) {
                                                                                    matchFailed("\"}\"");
                                                                                }
                                                                            }
                                                                            if (result0 === null) {
                                                                                result0 = parse_SP();
                                                                                if (result0 === null) {
                                                                                    result0 = parse_HTAB();
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return result0;
        }

        function parse_word() {
            var result0, result1;
            var pos0;
            pos0 = pos;
            result1 = parse_alphanum();
            if (result1 === null) {
                if (input.charCodeAt(pos) === 45) {
                    result1 = "-";
                    pos++;
                } else {
                    result1 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"-\"");
                    }
                }
                if (result1 === null) {
                    if (input.charCodeAt(pos) === 46) {
                        result1 = ".";
                        pos++;
                    } else {
                        result1 = null;
                        if (reportFailures === 0) {
                            matchFailed("\".\"");
                        }
                    }
                    if (result1 === null) {
                        if (input.charCodeAt(pos) === 33) {
                            result1 = "!";
                            pos++;
                        } else {
                            result1 = null;
                            if (reportFailures === 0) {
                                matchFailed("\"!\"");
                            }
                        }
                        if (result1 === null) {
                            if (input.charCodeAt(pos) === 37) {
                                result1 = "%";
                                pos++;
                            } else {
                                result1 = null;
                                if (reportFailures === 0) {
                                    matchFailed("\"%\"");
                                }
                            }
                            if (result1 === null) {
                                if (input.charCodeAt(pos) === 42) {
                                    result1 = "*";
                                    pos++;
                                } else {
                                    result1 = null;
                                    if (reportFailures === 0) {
                                        matchFailed("\"*\"");
                                    }
                                }
                                if (result1 === null) {
                                    if (input.charCodeAt(pos) === 95) {
                                        result1 = "_";
                                        pos++;
                                    } else {
                                        result1 = null;
                                        if (reportFailures === 0) {
                                            matchFailed("\"_\"");
                                        }
                                    }
                                    if (result1 === null) {
                                        if (input.charCodeAt(pos) === 43) {
                                            result1 = "+";
                                            pos++;
                                        } else {
                                            result1 = null;
                                            if (reportFailures === 0) {
                                                matchFailed("\"+\"");
                                            }
                                        }
                                        if (result1 === null) {
                                            if (input.charCodeAt(pos) === 96) {
                                                result1 = "`";
                                                pos++;
                                            } else {
                                                result1 = null;
                                                if (reportFailures === 0) {
                                                    matchFailed("\"`\"");
                                                }
                                            }
                                            if (result1 === null) {
                                                if (input.charCodeAt(pos) === 39) {
                                                    result1 = "'";
                                                    pos++;
                                                } else {
                                                    result1 = null;
                                                    if (reportFailures === 0) {
                                                        matchFailed("\"'\"");
                                                    }
                                                }
                                                if (result1 === null) {
                                                    if (input.charCodeAt(pos) === 126) {
                                                        result1 = "~";
                                                        pos++;
                                                    } else {
                                                        result1 = null;
                                                        if (reportFailures === 0) {
                                                            matchFailed("\"~\"");
                                                        }
                                                    }
                                                    if (result1 === null) {
                                                        if (input.charCodeAt(pos) === 40) {
                                                            result1 = "(";
                                                            pos++;
                                                        } else {
                                                            result1 = null;
                                                            if (reportFailures === 0) {
                                                                matchFailed("\"(\"");
                                                            }
                                                        }
                                                        if (result1 === null) {
                                                            if (input.charCodeAt(pos) === 41) {
                                                                result1 = ")";
                                                                pos++;
                                                            } else {
                                                                result1 = null;
                                                                if (reportFailures === 0) {
                                                                    matchFailed("\")\"");
                                                                }
                                                            }
                                                            if (result1 === null) {
                                                                if (input.charCodeAt(pos) === 60) {
                                                                    result1 = "<";
                                                                    pos++;
                                                                } else {
                                                                    result1 = null;
                                                                    if (reportFailures === 0) {
                                                                        matchFailed("\"<\"");
                                                                    }
                                                                }
                                                                if (result1 === null) {
                                                                    if (input.charCodeAt(pos) === 62) {
                                                                        result1 = ">";
                                                                        pos++;
                                                                    } else {
                                                                        result1 = null;
                                                                        if (reportFailures === 0) {
                                                                            matchFailed("\">\"");
                                                                        }
                                                                    }
                                                                    if (result1 === null) {
                                                                        if (input.charCodeAt(pos) === 58) {
                                                                            result1 = ":";
                                                                            pos++;
                                                                        } else {
                                                                            result1 = null;
                                                                            if (reportFailures === 0) {
                                                                                matchFailed("\":\"");
                                                                            }
                                                                        }
                                                                        if (result1 === null) {
                                                                            if (input.charCodeAt(pos) === 92) {
                                                                                result1 = "\\";
                                                                                pos++;
                                                                            } else {
                                                                                result1 = null;
                                                                                if (reportFailures === 0) {
                                                                                    matchFailed("\"\\\\\"");
                                                                                }
                                                                            }
                                                                            if (result1 === null) {
                                                                                result1 = parse_DQUOTE();
                                                                                if (result1 === null) {
                                                                                    if (input.charCodeAt(pos) === 47) {
                                                                                        result1 = "/";
                                                                                        pos++;
                                                                                    } else {
                                                                                        result1 = null;
                                                                                        if (reportFailures === 0) {
                                                                                            matchFailed("\"/\"");
                                                                                        }
                                                                                    }
                                                                                    if (result1 === null) {
                                                                                        if (input.charCodeAt(pos) === 91) {
                                                                                            result1 = "[";
                                                                                            pos++;
                                                                                        } else {
                                                                                            result1 = null;
                                                                                            if (reportFailures === 0) {
                                                                                                matchFailed("\"[\"");
                                                                                            }
                                                                                        }
                                                                                        if (result1 === null) {
                                                                                            if (input.charCodeAt(pos) === 93) {
                                                                                                result1 = "]";
                                                                                                pos++;
                                                                                            } else {
                                                                                                result1 = null;
                                                                                                if (reportFailures === 0) {
                                                                                                    matchFailed("\"]\"");
                                                                                                }
                                                                                            }
                                                                                            if (result1 === null) {
                                                                                                if (input.charCodeAt(pos) === 63) {
                                                                                                    result1 = "?";
                                                                                                    pos++;
                                                                                                } else {
                                                                                                    result1 = null;
                                                                                                    if (reportFailures === 0) {
                                                                                                        matchFailed("\"?\"");
                                                                                                    }
                                                                                                }
                                                                                                if (result1 === null) {
                                                                                                    if (input.charCodeAt(pos) === 123) {
                                                                                                        result1 = "{";
                                                                                                        pos++;
                                                                                                    } else {
                                                                                                        result1 = null;
                                                                                                        if (reportFailures === 0) {
                                                                                                            matchFailed("\"{\"");
                                                                                                        }
                                                                                                    }
                                                                                                    if (result1 === null) {
                                                                                                        if (input.charCodeAt(pos) === 125) {
                                                                                                            result1 = "}";
                                                                                                            pos++;
                                                                                                        } else {
                                                                                                            result1 = null;
                                                                                                            if (reportFailures === 0) {
                                                                                                                matchFailed("\"}\"");
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (result1 !== null) {
                result0 = [];
                while (result1 !== null) {
                    result0.push(result1);
                    result1 = parse_alphanum();
                    if (result1 === null) {
                        if (input.charCodeAt(pos) === 45) {
                            result1 = "-";
                            pos++;
                        } else {
                            result1 = null;
                            if (reportFailures === 0) {
                                matchFailed("\"-\"");
                            }
                        }
                        if (result1 === null) {
                            if (input.charCodeAt(pos) === 46) {
                                result1 = ".";
                                pos++;
                            } else {
                                result1 = null;
                                if (reportFailures === 0) {
                                    matchFailed("\".\"");
                                }
                            }
                            if (result1 === null) {
                                if (input.charCodeAt(pos) === 33) {
                                    result1 = "!";
                                    pos++;
                                } else {
                                    result1 = null;
                                    if (reportFailures === 0) {
                                        matchFailed("\"!\"");
                                    }
                                }
                                if (result1 === null) {
                                    if (input.charCodeAt(pos) === 37) {
                                        result1 = "%";
                                        pos++;
                                    } else {
                                        result1 = null;
                                        if (reportFailures === 0) {
                                            matchFailed("\"%\"");
                                        }
                                    }
                                    if (result1 === null) {
                                        if (input.charCodeAt(pos) === 42) {
                                            result1 = "*";
                                            pos++;
                                        } else {
                                            result1 = null;
                                            if (reportFailures === 0) {
                                                matchFailed("\"*\"");
                                            }
                                        }
                                        if (result1 === null) {
                                            if (input.charCodeAt(pos) === 95) {
                                                result1 = "_";
                                                pos++;
                                            } else {
                                                result1 = null;
                                                if (reportFailures === 0) {
                                                    matchFailed("\"_\"");
                                                }
                                            }
                                            if (result1 === null) {
                                                if (input.charCodeAt(pos) === 43) {
                                                    result1 = "+";
                                                    pos++;
                                                } else {
                                                    result1 = null;
                                                    if (reportFailures === 0) {
                                                        matchFailed("\"+\"");
                                                    }
                                                }
                                                if (result1 === null) {
                                                    if (input.charCodeAt(pos) === 96) {
                                                        result1 = "`";
                                                        pos++;
                                                    } else {
                                                        result1 = null;
                                                        if (reportFailures === 0) {
                                                            matchFailed("\"`\"");
                                                        }
                                                    }
                                                    if (result1 === null) {
                                                        if (input.charCodeAt(pos) === 39) {
                                                            result1 = "'";
                                                            pos++;
                                                        } else {
                                                            result1 = null;
                                                            if (reportFailures === 0) {
                                                                matchFailed("\"'\"");
                                                            }
                                                        }
                                                        if (result1 === null) {
                                                            if (input.charCodeAt(pos) === 126) {
                                                                result1 = "~";
                                                                pos++;
                                                            } else {
                                                                result1 = null;
                                                                if (reportFailures === 0) {
                                                                    matchFailed("\"~\"");
                                                                }
                                                            }
                                                            if (result1 === null) {
                                                                if (input.charCodeAt(pos) === 40) {
                                                                    result1 = "(";
                                                                    pos++;
                                                                } else {
                                                                    result1 = null;
                                                                    if (reportFailures === 0) {
                                                                        matchFailed("\"(\"");
                                                                    }
                                                                }
                                                                if (result1 === null) {
                                                                    if (input.charCodeAt(pos) === 41) {
                                                                        result1 = ")";
                                                                        pos++;
                                                                    } else {
                                                                        result1 = null;
                                                                        if (reportFailures === 0) {
                                                                            matchFailed("\")\"");
                                                                        }
                                                                    }
                                                                    if (result1 === null) {
                                                                        if (input.charCodeAt(pos) === 60) {
                                                                            result1 = "<";
                                                                            pos++;
                                                                        } else {
                                                                            result1 = null;
                                                                            if (reportFailures === 0) {
                                                                                matchFailed("\"<\"");
                                                                            }
                                                                        }
                                                                        if (result1 === null) {
                                                                            if (input.charCodeAt(pos) === 62) {
                                                                                result1 = ">";
                                                                                pos++;
                                                                            } else {
                                                                                result1 = null;
                                                                                if (reportFailures === 0) {
                                                                                    matchFailed("\">\"");
                                                                                }
                                                                            }
                                                                            if (result1 === null) {
                                                                                if (input.charCodeAt(pos) === 58) {
                                                                                    result1 = ":";
                                                                                    pos++;
                                                                                } else {
                                                                                    result1 = null;
                                                                                    if (reportFailures === 0) {
                                                                                        matchFailed("\":\"");
                                                                                    }
                                                                                }
                                                                                if (result1 === null) {
                                                                                    if (input.charCodeAt(pos) === 92) {
                                                                                        result1 = "\\";
                                                                                        pos++;
                                                                                    } else {
                                                                                        result1 = null;
                                                                                        if (reportFailures === 0) {
                                                                                            matchFailed("\"\\\\\"");
                                                                                        }
                                                                                    }
                                                                                    if (result1 === null) {
                                                                                        result1 = parse_DQUOTE();
                                                                                        if (result1 === null) {
                                                                                            if (input.charCodeAt(pos) === 47) {
                                                                                                result1 = "/";
                                                                                                pos++;
                                                                                            } else {
                                                                                                result1 = null;
                                                                                                if (reportFailures === 0) {
                                                                                                    matchFailed("\"/\"");
                                                                                                }
                                                                                            }
                                                                                            if (result1 === null) {
                                                                                                if (input.charCodeAt(pos) === 91) {
                                                                                                    result1 = "[";
                                                                                                    pos++;
                                                                                                } else {
                                                                                                    result1 = null;
                                                                                                    if (reportFailures === 0) {
                                                                                                        matchFailed("\"[\"");
                                                                                                    }
                                                                                                }
                                                                                                if (result1 === null) {
                                                                                                    if (input.charCodeAt(pos) === 93) {
                                                                                                        result1 = "]";
                                                                                                        pos++;
                                                                                                    } else {
                                                                                                        result1 = null;
                                                                                                        if (reportFailures === 0) {
                                                                                                            matchFailed("\"]\"");
                                                                                                        }
                                                                                                    }
                                                                                                    if (result1 === null) {
                                                                                                        if (input.charCodeAt(pos) === 63) {
                                                                                                            result1 = "?";
                                                                                                            pos++;
                                                                                                        } else {
                                                                                                            result1 = null;
                                                                                                            if (reportFailures === 0) {
                                                                                                                matchFailed("\"?\"");
                                                                                                            }
                                                                                                        }
                                                                                                        if (result1 === null) {
                                                                                                            if (input.charCodeAt(pos) === 123) {
                                                                                                                result1 = "{";
                                                                                                                pos++;
                                                                                                            } else {
                                                                                                                result1 = null;
                                                                                                                if (reportFailures === 0) {
                                                                                                                    matchFailed("\"{\"");
                                                                                                                }
                                                                                                            }
                                                                                                            if (result1 === null) {
                                                                                                                if (input.charCodeAt(pos) === 125) {
                                                                                                                    result1 = "}";
                                                                                                                    pos++;
                                                                                                                } else {
                                                                                                                    result1 = null;
                                                                                                                    if (reportFailures === 0) {
                                                                                                                        matchFailed("\"}\"");
                                                                                                                    }
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                result0 = null;
            }
            if (result0 !== null) {
                result0 = (function (offset) {
                    return input.substring(pos, offset);
                })(pos0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_STAR() {
            var result0, result1, result2;
            var pos0, pos1;
            pos0 = pos;
            pos1 = pos;
            result0 = parse_SWS();
            if (result0 !== null) {
                if (input.charCodeAt(pos) === 42) {
                    result1 = "*";
                    pos++;
                } else {
                    result1 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"*\"");
                    }
                }
                if (result1 !== null) {
                    result2 = parse_SWS();
                    if (result2 !== null) {
                        result0 = [result0, result1, result2];
                    } else {
                        result0 = null;
                        pos = pos1;
                    }
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset) {
                    return "*";
                })(pos0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_SLASH() {
            var result0, result1, result2;
            var pos0, pos1;
            pos0 = pos;
            pos1 = pos;
            result0 = parse_SWS();
            if (result0 !== null) {
                if (input.charCodeAt(pos) === 47) {
                    result1 = "/";
                    pos++;
                } else {
                    result1 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"/\"");
                    }
                }
                if (result1 !== null) {
                    result2 = parse_SWS();
                    if (result2 !== null) {
                        result0 = [result0, result1, result2];
                    } else {
                        result0 = null;
                        pos = pos1;
                    }
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset) {
                    return "/";
                })(pos0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_EQUAL() {
            var result0, result1, result2;
            var pos0, pos1;
            pos0 = pos;
            pos1 = pos;
            result0 = parse_SWS();
            if (result0 !== null) {
                if (input.charCodeAt(pos) === 61) {
                    result1 = "=";
                    pos++;
                } else {
                    result1 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"=\"");
                    }
                }
                if (result1 !== null) {
                    result2 = parse_SWS();
                    if (result2 !== null) {
                        result0 = [result0, result1, result2];
                    } else {
                        result0 = null;
                        pos = pos1;
                    }
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset) {
                    return "=";
                })(pos0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_LPAREN() {
            var result0, result1, result2;
            var pos0, pos1;
            pos0 = pos;
            pos1 = pos;
            result0 = parse_SWS();
            if (result0 !== null) {
                if (input.charCodeAt(pos) === 40) {
                    result1 = "(";
                    pos++;
                } else {
                    result1 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"(\"");
                    }
                }
                if (result1 !== null) {
                    result2 = parse_SWS();
                    if (result2 !== null) {
                        result0 = [result0, result1, result2];
                    } else {
                        result0 = null;
                        pos = pos1;
                    }
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset) {
                    return "(";
                })(pos0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_RPAREN() {
            var result0, result1, result2;
            var pos0, pos1;
            pos0 = pos;
            pos1 = pos;
            result0 = parse_SWS();
            if (result0 !== null) {
                if (input.charCodeAt(pos) === 41) {
                    result1 = ")";
                    pos++;
                } else {
                    result1 = null;
                    if (reportFailures === 0) {
                        matchFailed("\")\"");
                    }
                }
                if (result1 !== null) {
                    result2 = parse_SWS();
                    if (result2 !== null) {
                        result0 = [result0, result1, result2];
                    } else {
                        result0 = null;
                        pos = pos1;
                    }
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset) {
                    return ")";
                })(pos0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_RAQUOT() {
            var result0, result1;
            var pos0, pos1;
            pos0 = pos;
            pos1 = pos;
            if (input.charCodeAt(pos) === 62) {
                result0 = ">";
                pos++;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\">\"");
                }
            }
            if (result0 !== null) {
                result1 = parse_SWS();
                if (result1 !== null) {
                    result0 = [result0, result1];
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset) {
                    return ">";
                })(pos0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_LAQUOT() {
            var result0, result1;
            var pos0, pos1;
            pos0 = pos;
            pos1 = pos;
            result0 = parse_SWS();
            if (result0 !== null) {
                if (input.charCodeAt(pos) === 60) {
                    result1 = "<";
                    pos++;
                } else {
                    result1 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"<\"");
                    }
                }
                if (result1 !== null) {
                    result0 = [result0, result1];
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset) {
                    return "<";
                })(pos0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_COMMA() {
            var result0, result1, result2;
            var pos0, pos1;
            pos0 = pos;
            pos1 = pos;
            result0 = parse_SWS();
            if (result0 !== null) {
                if (input.charCodeAt(pos) === 44) {
                    result1 = ",";
                    pos++;
                } else {
                    result1 = null;
                    if (reportFailures === 0) {
                        matchFailed("\",\"");
                    }
                }
                if (result1 !== null) {
                    result2 = parse_SWS();
                    if (result2 !== null) {
                        result0 = [result0, result1, result2];
                    } else {
                        result0 = null;
                        pos = pos1;
                    }
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset) {
                    return ",";
                })(pos0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_SEMI() {
            var result0, result1, result2;
            var pos0, pos1;
            pos0 = pos;
            pos1 = pos;
            result0 = parse_SWS();
            if (result0 !== null) {
                if (input.charCodeAt(pos) === 59) {
                    result1 = ";";
                    pos++;
                } else {
                    result1 = null;
                    if (reportFailures === 0) {
                        matchFailed("\";\"");
                    }
                }
                if (result1 !== null) {
                    result2 = parse_SWS();
                    if (result2 !== null) {
                        result0 = [result0, result1, result2];
                    } else {
                        result0 = null;
                        pos = pos1;
                    }
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset) {
                    return ";";
                })(pos0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_COLON() {
            var result0, result1, result2;
            var pos0, pos1;
            pos0 = pos;
            pos1 = pos;
            result0 = parse_SWS();
            if (result0 !== null) {
                if (input.charCodeAt(pos) === 58) {
                    result1 = ":";
                    pos++;
                } else {
                    result1 = null;
                    if (reportFailures === 0) {
                        matchFailed("\":\"");
                    }
                }
                if (result1 !== null) {
                    result2 = parse_SWS();
                    if (result2 !== null) {
                        result0 = [result0, result1, result2];
                    } else {
                        result0 = null;
                        pos = pos1;
                    }
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset) {
                    return ":";
                })(pos0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_LDQUOT() {
            var result0, result1;
            var pos0, pos1;
            pos0 = pos;
            pos1 = pos;
            result0 = parse_SWS();
            if (result0 !== null) {
                result1 = parse_DQUOTE();
                if (result1 !== null) {
                    result0 = [result0, result1];
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset) {
                    return "\"";
                })(pos0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_RDQUOT() {
            var result0, result1;
            var pos0, pos1;
            pos0 = pos;
            pos1 = pos;
            result0 = parse_DQUOTE();
            if (result0 !== null) {
                result1 = parse_SWS();
                if (result1 !== null) {
                    result0 = [result0, result1];
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset) {
                    return "\"";
                })(pos0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_comment() {
            var result0, result1, result2;
            var pos0;
            pos0 = pos;
            result0 = parse_LPAREN();
            if (result0 !== null) {
                result1 = [];
                result2 = parse_ctext();
                if (result2 === null) {
                    result2 = parse_quoted_pair();
                    if (result2 === null) {
                        result2 = parse_comment();
                    }
                }
                while (result2 !== null) {
                    result1.push(result2);
                    result2 = parse_ctext();
                    if (result2 === null) {
                        result2 = parse_quoted_pair();
                        if (result2 === null) {
                            result2 = parse_comment();
                        }
                    }
                }
                if (result1 !== null) {
                    result2 = parse_RPAREN();
                    if (result2 !== null) {
                        result0 = [result0, result1, result2];
                    } else {
                        result0 = null;
                        pos = pos0;
                    }
                } else {
                    result0 = null;
                    pos = pos0;
                }
            } else {
                result0 = null;
                pos = pos0;
            }
            return result0;
        }

        function parse_ctext() {
            var result0;
            if (/^[!-']/.test(input.charAt(pos))) {
                result0 = input.charAt(pos);
                pos++;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("[!-']");
                }
            }
            if (result0 === null) {
                if (/^[*-[]/.test(input.charAt(pos))) {
                    result0 = input.charAt(pos);
                    pos++;
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("[*-[]");
                    }
                }
                if (result0 === null) {
                    if (/^[\]-~]/.test(input.charAt(pos))) {
                        result0 = input.charAt(pos);
                        pos++;
                    } else {
                        result0 = null;
                        if (reportFailures === 0) {
                            matchFailed("[\\]-~]");
                        }
                    }
                    if (result0 === null) {
                        result0 = parse_UTF8_NONASCII();
                        if (result0 === null) {
                            result0 = parse_LWS();
                        }
                    }
                }
            }
            return result0;
        }

        function parse_quoted_string() {
            var result0, result1, result2, result3;
            var pos0, pos1;
            pos0 = pos;
            pos1 = pos;
            result0 = parse_SWS();
            if (result0 !== null) {
                result1 = parse_DQUOTE();
                if (result1 !== null) {
                    result2 = [];
                    result3 = parse_qdtext();
                    if (result3 === null) {
                        result3 = parse_quoted_pair();
                    }
                    while (result3 !== null) {
                        result2.push(result3);
                        result3 = parse_qdtext();
                        if (result3 === null) {
                            result3 = parse_quoted_pair();
                        }
                    }
                    if (result2 !== null) {
                        result3 = parse_DQUOTE();
                        if (result3 !== null) {
                            result0 = [result0, result1, result2, result3];
                        } else {
                            result0 = null;
                            pos = pos1;
                        }
                    } else {
                        result0 = null;
                        pos = pos1;
                    }
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset) {
                    return input.substring(pos, offset);
                })(pos0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_quoted_string_clean() {
            var result0, result1, result2, result3;
            var pos0, pos1;
            pos0 = pos;
            pos1 = pos;
            result0 = parse_SWS();
            if (result0 !== null) {
                result1 = parse_DQUOTE();
                if (result1 !== null) {
                    result2 = [];
                    result3 = parse_qdtext();
                    if (result3 === null) {
                        result3 = parse_quoted_pair();
                    }
                    while (result3 !== null) {
                        result2.push(result3);
                        result3 = parse_qdtext();
                        if (result3 === null) {
                            result3 = parse_quoted_pair();
                        }
                    }
                    if (result2 !== null) {
                        result3 = parse_DQUOTE();
                        if (result3 !== null) {
                            result0 = [result0, result1, result2, result3];
                        } else {
                            result0 = null;
                            pos = pos1;
                        }
                    } else {
                        result0 = null;
                        pos = pos1;
                    }
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset) {
                    var trimmed = input
                        .substring(pos, offset)
                        .trim();
                    return trimmed
                        .substring(1, trimmed.length - 1) // remove outer quotes
                        .replace(/\\([\x00-\x09\x0b-\x0c\x0e-\x7f])/g, '$1');
                })(pos0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_qdtext() {
            var result0;
            result0 = parse_LWS();
            if (result0 === null) {
                if (input.charCodeAt(pos) === 33) {
                    result0 = "!";
                    pos++;
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"!\"");
                    }
                }
                if (result0 === null) {
                    if (/^[#-[]/.test(input.charAt(pos))) {
                        result0 = input.charAt(pos);
                        pos++;
                    } else {
                        result0 = null;
                        if (reportFailures === 0) {
                            matchFailed("[#-[]");
                        }
                    }
                    if (result0 === null) {
                        if (/^[\]-~]/.test(input.charAt(pos))) {
                            result0 = input.charAt(pos);
                            pos++;
                        } else {
                            result0 = null;
                            if (reportFailures === 0) {
                                matchFailed("[\\]-~]");
                            }
                        }
                        if (result0 === null) {
                            result0 = parse_UTF8_NONASCII();
                        }
                    }
                }
            }
            return result0;
        }

        function parse_quoted_pair() {
            var result0, result1;
            var pos0;
            pos0 = pos;
            if (input.charCodeAt(pos) === 92) {
                result0 = "\\";
                pos++;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"\\\\\"");
                }
            }
            if (result0 !== null) {
                if (/^[\0-\t]/.test(input.charAt(pos))) {
                    result1 = input.charAt(pos);
                    pos++;
                } else {
                    result1 = null;
                    if (reportFailures === 0) {
                        matchFailed("[\\0-\\t]");
                    }
                }
                if (result1 === null) {
                    if (/^[\x0B-\f]/.test(input.charAt(pos))) {
                        result1 = input.charAt(pos);
                        pos++;
                    } else {
                        result1 = null;
                        if (reportFailures === 0) {
                            matchFailed("[\\x0B-\\f]");
                        }
                    }
                    if (result1 === null) {
                        if (/^[\x0E-]/.test(input.charAt(pos))) {
                            result1 = input.charAt(pos);
                            pos++;
                        } else {
                            result1 = null;
                            if (reportFailures === 0) {
                                matchFailed("[\\x0E-]");
                            }
                        }
                    }
                }
                if (result1 !== null) {
                    result0 = [result0, result1];
                } else {
                    result0 = null;
                    pos = pos0;
                }
            } else {
                result0 = null;
                pos = pos0;
            }
            return result0;
        }

        function parse_SIP_URI_noparams() {
            var result0, result1, result2, result3;
            var pos0, pos1;
            pos0 = pos;
            pos1 = pos;
            result0 = parse_uri_scheme();
            if (result0 !== null) {
                if (input.charCodeAt(pos) === 58) {
                    result1 = ":";
                    pos++;
                } else {
                    result1 = null;
                    if (reportFailures === 0) {
                        matchFailed("\":\"");
                    }
                }
                if (result1 !== null) {
                    result2 = parse_userinfo();
                    result2 = result2 !== null ? result2 : "";
                    if (result2 !== null) {
                        result3 = parse_hostport();
                        if (result3 !== null) {
                            result0 = [result0, result1, result2, result3];
                        } else {
                            result0 = null;
                            pos = pos1;
                        }
                    } else {
                        result0 = null;
                        pos = pos1;
                    }
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset) {
                    try {
                        data.uri = new URI(data.scheme, data.user, data.host, data.port);
                        delete data.scheme;
                        delete data.user;
                        delete data.host;
                        delete data.host_type;
                        delete data.port;
                    } catch (e) {
                        data = -1;
                    }
                })(pos0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_SIP_URI() {
            var result0, result1, result2, result3, result4, result5;
            var pos0, pos1;
            pos0 = pos;
            pos1 = pos;
            result0 = parse_uri_scheme();
            if (result0 !== null) {
                if (input.charCodeAt(pos) === 58) {
                    result1 = ":";
                    pos++;
                } else {
                    result1 = null;
                    if (reportFailures === 0) {
                        matchFailed("\":\"");
                    }
                }
                if (result1 !== null) {
                    result2 = parse_userinfo();
                    result2 = result2 !== null ? result2 : "";
                    if (result2 !== null) {
                        result3 = parse_hostport();
                        if (result3 !== null) {
                            result4 = parse_uri_parameters();
                            if (result4 !== null) {
                                result5 = parse_headers();
                                result5 = result5 !== null ? result5 : "";
                                if (result5 !== null) {
                                    result0 = [result0, result1, result2, result3, result4, result5];
                                } else {
                                    result0 = null;
                                    pos = pos1;
                                }
                            } else {
                                result0 = null;
                                pos = pos1;
                            }
                        } else {
                            result0 = null;
                            pos = pos1;
                        }
                    } else {
                        result0 = null;
                        pos = pos1;
                    }
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset) {
                    var header;
                    try {
                        data.uri = new URI(data.scheme, data.user, data.host, data.port, data.uri_params, data.uri_headers);
                        delete data.scheme;
                        delete data.user;
                        delete data.host;
                        delete data.host_type;
                        delete data.port;
                        delete data.uri_params;
                        if (startRule === 'SIP_URI') {
                            data = data.uri;
                        }
                    } catch (e) {
                        data = -1;
                    }
                })(pos0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_uri_scheme() {
            var result0;
            result0 = parse_uri_scheme_sips();
            if (result0 === null) {
                result0 = parse_uri_scheme_sip();
            }
            return result0;
        }
        function parse_uri_scheme_sips() {
            var result0;
            var pos0;
            pos0 = pos;
            if (input.substr(pos, 4).toLowerCase() === "sips") {
                result0 = input.substr(pos, 4);
                pos += 4;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"sips\"");
                }
            }
            if (result0 !== null) {
                result0 = (function (offset, scheme) {
                    data.scheme = scheme.toLowerCase();
                })(pos0, result0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_uri_scheme_sip() {
            var result0;
            var pos0;
            pos0 = pos;
            if (input.substr(pos, 3).toLowerCase() === "sip") {
                result0 = input.substr(pos, 3);
                pos += 3;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"sip\"");
                }
            }
            if (result0 !== null) {
                result0 = (function (offset, scheme) {
                    data.scheme = scheme.toLowerCase();
                })(pos0, result0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_userinfo() {
            var result0, result1, result2;
            var pos0, pos1, pos2;
            pos0 = pos;
            pos1 = pos;
            result0 = parse_user();
            if (result0 !== null) {
                pos2 = pos;
                if (input.charCodeAt(pos) === 58) {
                    result1 = ":";
                    pos++;
                } else {
                    result1 = null;
                    if (reportFailures === 0) {
                        matchFailed("\":\"");
                    }
                }
                if (result1 !== null) {
                    result2 = parse_password();
                    if (result2 !== null) {
                        result1 = [result1, result2];
                    } else {
                        result1 = null;
                        pos = pos2;
                    }
                } else {
                    result1 = null;
                    pos = pos2;
                }
                result1 = result1 !== null ? result1 : "";
                if (result1 !== null) {
                    if (input.charCodeAt(pos) === 64) {
                        result2 = "@";
                        pos++;
                    } else {
                        result2 = null;
                        if (reportFailures === 0) {
                            matchFailed("\"@\"");
                        }
                    }
                    if (result2 !== null) {
                        result0 = [result0, result1, result2];
                    } else {
                        result0 = null;
                        pos = pos1;
                    }
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset) {
                    data.user = decodeURIComponent(input.substring(pos - 1, offset));
                })(pos0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_user() {
            var result0, result1;
            result1 = parse_unreserved();
            if (result1 === null) {
                result1 = parse_escaped();
                if (result1 === null) {
                    result1 = parse_user_unreserved();
                }
            }
            if (result1 !== null) {
                result0 = [];
                while (result1 !== null) {
                    result0.push(result1);
                    result1 = parse_unreserved();
                    if (result1 === null) {
                        result1 = parse_escaped();
                        if (result1 === null) {
                            result1 = parse_user_unreserved();
                        }
                    }
                }
            } else {
                result0 = null;
            }
            return result0;
        }

        function parse_user_unreserved() {
            var result0;
            if (input.charCodeAt(pos) === 38) {
                result0 = "&";
                pos++;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"&\"");
                }
            }
            if (result0 === null) {
                if (input.charCodeAt(pos) === 61) {
                    result0 = "=";
                    pos++;
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"=\"");
                    }
                }
                if (result0 === null) {
                    if (input.charCodeAt(pos) === 43) {
                        result0 = "+";
                        pos++;
                    } else {
                        result0 = null;
                        if (reportFailures === 0) {
                            matchFailed("\"+\"");
                        }
                    }
                    if (result0 === null) {
                        if (input.charCodeAt(pos) === 36) {
                            result0 = "$";
                            pos++;
                        } else {
                            result0 = null;
                            if (reportFailures === 0) {
                                matchFailed("\"$\"");
                            }
                        }
                        if (result0 === null) {
                            if (input.charCodeAt(pos) === 44) {
                                result0 = ",";
                                pos++;
                            } else {
                                result0 = null;
                                if (reportFailures === 0) {
                                    matchFailed("\",\"");
                                }
                            }
                            if (result0 === null) {
                                if (input.charCodeAt(pos) === 59) {
                                    result0 = ";";
                                    pos++;
                                } else {
                                    result0 = null;
                                    if (reportFailures === 0) {
                                        matchFailed("\";\"");
                                    }
                                }
                                if (result0 === null) {
                                    if (input.charCodeAt(pos) === 63) {
                                        result0 = "?";
                                        pos++;
                                    } else {
                                        result0 = null;
                                        if (reportFailures === 0) {
                                            matchFailed("\"?\"");
                                        }
                                    }
                                    if (result0 === null) {
                                        if (input.charCodeAt(pos) === 47) {
                                            result0 = "/";
                                            pos++;
                                        } else {
                                            result0 = null;
                                            if (reportFailures === 0) {
                                                matchFailed("\"/\"");
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return result0;
        }

        function parse_password() {
            var result0, result1;
            var pos0;
            pos0 = pos;
            result0 = [];
            result1 = parse_unreserved();
            if (result1 === null) {
                result1 = parse_escaped();
                if (result1 === null) {
                    if (input.charCodeAt(pos) === 38) {
                        result1 = "&";
                        pos++;
                    } else {
                        result1 = null;
                        if (reportFailures === 0) {
                            matchFailed("\"&\"");
                        }
                    }
                    if (result1 === null) {
                        if (input.charCodeAt(pos) === 61) {
                            result1 = "=";
                            pos++;
                        } else {
                            result1 = null;
                            if (reportFailures === 0) {
                                matchFailed("\"=\"");
                            }
                        }
                        if (result1 === null) {
                            if (input.charCodeAt(pos) === 43) {
                                result1 = "+";
                                pos++;
                            } else {
                                result1 = null;
                                if (reportFailures === 0) {
                                    matchFailed("\"+\"");
                                }
                            }
                            if (result1 === null) {
                                if (input.charCodeAt(pos) === 36) {
                                    result1 = "$";
                                    pos++;
                                } else {
                                    result1 = null;
                                    if (reportFailures === 0) {
                                        matchFailed("\"$\"");
                                    }
                                }
                                if (result1 === null) {
                                    if (input.charCodeAt(pos) === 44) {
                                        result1 = ",";
                                        pos++;
                                    } else {
                                        result1 = null;
                                        if (reportFailures === 0) {
                                            matchFailed("\",\"");
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            while (result1 !== null) {
                result0.push(result1);
                result1 = parse_unreserved();
                if (result1 === null) {
                    result1 = parse_escaped();
                    if (result1 === null) {
                        if (input.charCodeAt(pos) === 38) {
                            result1 = "&";
                            pos++;
                        } else {
                            result1 = null;
                            if (reportFailures === 0) {
                                matchFailed("\"&\"");
                            }
                        }
                        if (result1 === null) {
                            if (input.charCodeAt(pos) === 61) {
                                result1 = "=";
                                pos++;
                            } else {
                                result1 = null;
                                if (reportFailures === 0) {
                                    matchFailed("\"=\"");
                                }
                            }
                            if (result1 === null) {
                                if (input.charCodeAt(pos) === 43) {
                                    result1 = "+";
                                    pos++;
                                } else {
                                    result1 = null;
                                    if (reportFailures === 0) {
                                        matchFailed("\"+\"");
                                    }
                                }
                                if (result1 === null) {
                                    if (input.charCodeAt(pos) === 36) {
                                        result1 = "$";
                                        pos++;
                                    } else {
                                        result1 = null;
                                        if (reportFailures === 0) {
                                            matchFailed("\"$\"");
                                        }
                                    }
                                    if (result1 === null) {
                                        if (input.charCodeAt(pos) === 44) {
                                            result1 = ",";
                                            pos++;
                                        } else {
                                            result1 = null;
                                            if (reportFailures === 0) {
                                                matchFailed("\",\"");
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (result0 !== null) {
                result0 = (function (offset) {
                    data.password = input.substring(pos, offset);
                })(pos0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_hostport() {
            var result0, result1, result2;
            var pos0, pos1;
            pos0 = pos;
            result0 = parse_host();
            if (result0 !== null) {
                pos1 = pos;
                if (input.charCodeAt(pos) === 58) {
                    result1 = ":";
                    pos++;
                } else {
                    result1 = null;
                    if (reportFailures === 0) {
                        matchFailed("\":\"");
                    }
                }
                if (result1 !== null) {
                    result2 = parse_port();
                    if (result2 !== null) {
                        result1 = [result1, result2];
                    } else {
                        result1 = null;
                        pos = pos1;
                    }
                } else {
                    result1 = null;
                    pos = pos1;
                }
                result1 = result1 !== null ? result1 : "";
                if (result1 !== null) {
                    result0 = [result0, result1];
                } else {
                    result0 = null;
                    pos = pos0;
                }
            } else {
                result0 = null;
                pos = pos0;
            }
            return result0;
        }

        function parse_host() {
            var result0;
            var pos0;
            pos0 = pos;
            result0 = parse_hostname();
            if (result0 === null) {
                result0 = parse_IPv4address();
                if (result0 === null) {
                    result0 = parse_IPv6reference();
                }
            }
            if (result0 !== null) {
                result0 = (function (offset) {
                    data.host = input.substring(pos, offset).toLowerCase();
                    return data.host;
                })(pos0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_hostname() {
            var result0, result1, result2;
            var pos0, pos1, pos2;
            pos0 = pos;
            pos1 = pos;
            result0 = [];
            pos2 = pos;
            result1 = parse_domainlabel();
            if (result1 !== null) {
                if (input.charCodeAt(pos) === 46) {
                    result2 = ".";
                    pos++;
                } else {
                    result2 = null;
                    if (reportFailures === 0) {
                        matchFailed("\".\"");
                    }
                }
                if (result2 !== null) {
                    result1 = [result1, result2];
                } else {
                    result1 = null;
                    pos = pos2;
                }
            } else {
                result1 = null;
                pos = pos2;
            }
            while (result1 !== null) {
                result0.push(result1);
                pos2 = pos;
                result1 = parse_domainlabel();
                if (result1 !== null) {
                    if (input.charCodeAt(pos) === 46) {
                        result2 = ".";
                        pos++;
                    } else {
                        result2 = null;
                        if (reportFailures === 0) {
                            matchFailed("\".\"");
                        }
                    }
                    if (result2 !== null) {
                        result1 = [result1, result2];
                    } else {
                        result1 = null;
                        pos = pos2;
                    }
                } else {
                    result1 = null;
                    pos = pos2;
                }
            }
            if (result0 !== null) {
                result1 = parse_toplabel();
                if (result1 !== null) {
                    if (input.charCodeAt(pos) === 46) {
                        result2 = ".";
                        pos++;
                    } else {
                        result2 = null;
                        if (reportFailures === 0) {
                            matchFailed("\".\"");
                        }
                    }
                    result2 = result2 !== null ? result2 : "";
                    if (result2 !== null) {
                        result0 = [result0, result1, result2];
                    } else {
                        result0 = null;
                        pos = pos1;
                    }
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset) {
                    data.host_type = 'domain';
                    return input.substring(pos, offset);
                })(pos0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_domainlabel() {
            var result0, result1, result2;
            var pos0;
            pos0 = pos;
            result0 = parse_alphanum();
            if (result0 !== null) {
                result1 = [];
                result2 = parse_alphanum();
                if (result2 === null) {
                    if (input.charCodeAt(pos) === 45) {
                        result2 = "-";
                        pos++;
                    } else {
                        result2 = null;
                        if (reportFailures === 0) {
                            matchFailed("\"-\"");
                        }
                    }
                    if (result2 === null) {
                        if (input.charCodeAt(pos) === 95) {
                            result2 = "_";
                            pos++;
                        } else {
                            result2 = null;
                            if (reportFailures === 0) {
                                matchFailed("\"_\"");
                            }
                        }
                    }
                }
                while (result2 !== null) {
                    result1.push(result2);
                    result2 = parse_alphanum();
                    if (result2 === null) {
                        if (input.charCodeAt(pos) === 45) {
                            result2 = "-";
                            pos++;
                        } else {
                            result2 = null;
                            if (reportFailures === 0) {
                                matchFailed("\"-\"");
                            }
                        }
                        if (result2 === null) {
                            if (input.charCodeAt(pos) === 95) {
                                result2 = "_";
                                pos++;
                            } else {
                                result2 = null;
                                if (reportFailures === 0) {
                                    matchFailed("\"_\"");
                                }
                            }
                        }
                    }
                }
                if (result1 !== null) {
                    result0 = [result0, result1];
                } else {
                    result0 = null;
                    pos = pos0;
                }
            } else {
                result0 = null;
                pos = pos0;
            }
            return result0;
        }

        function parse_toplabel() {
            var result0, result1, result2;
            var pos0;
            pos0 = pos;
            result0 = parse_ALPHA();
            if (result0 !== null) {
                result1 = [];
                result2 = parse_alphanum();
                if (result2 === null) {
                    if (input.charCodeAt(pos) === 45) {
                        result2 = "-";
                        pos++;
                    } else {
                        result2 = null;
                        if (reportFailures === 0) {
                            matchFailed("\"-\"");
                        }
                    }
                    if (result2 === null) {
                        if (input.charCodeAt(pos) === 95) {
                            result2 = "_";
                            pos++;
                        } else {
                            result2 = null;
                            if (reportFailures === 0) {
                                matchFailed("\"_\"");
                            }
                        }
                    }
                }
                while (result2 !== null) {
                    result1.push(result2);
                    result2 = parse_alphanum();
                    if (result2 === null) {
                        if (input.charCodeAt(pos) === 45) {
                            result2 = "-";
                            pos++;
                        } else {
                            result2 = null;
                            if (reportFailures === 0) {
                                matchFailed("\"-\"");
                            }
                        }
                        if (result2 === null) {
                            if (input.charCodeAt(pos) === 95) {
                                result2 = "_";
                                pos++;
                            } else {
                                result2 = null;
                                if (reportFailures === 0) {
                                    matchFailed("\"_\"");
                                }
                            }
                        }
                    }
                }
                if (result1 !== null) {
                    result0 = [result0, result1];
                } else {
                    result0 = null;
                    pos = pos0;
                }
            } else {
                result0 = null;
                pos = pos0;
            }
            return result0;
        }

        function parse_IPv6reference() {
            var result0, result1, result2;
            var pos0, pos1;
            pos0 = pos;
            pos1 = pos;
            if (input.charCodeAt(pos) === 91) {
                result0 = "[";
                pos++;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"[\"");
                }
            }
            if (result0 !== null) {
                result1 = parse_IPv6address();
                if (result1 !== null) {
                    if (input.charCodeAt(pos) === 93) {
                        result2 = "]";
                        pos++;
                    } else {
                        result2 = null;
                        if (reportFailures === 0) {
                            matchFailed("\"]\"");
                        }
                    }
                    if (result2 !== null) {
                        result0 = [result0, result1, result2];
                    } else {
                        result0 = null;
                        pos = pos1;
                    }
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset) {
                    data.host_type = 'IPv6';
                    return input.substring(pos, offset);
                })(pos0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_IPv6address() {
            var result0, result1, result2, result3, result4, result5, result6, result7, result8, result9, result10,
                result11, result12;
            var pos0, pos1, pos2;
            pos0 = pos;
            pos1 = pos;
            result0 = parse_h16();
            if (result0 !== null) {
                if (input.charCodeAt(pos) === 58) {
                    result1 = ":";
                    pos++;
                } else {
                    result1 = null;
                    if (reportFailures === 0) {
                        matchFailed("\":\"");
                    }
                }
                if (result1 !== null) {
                    result2 = parse_h16();
                    if (result2 !== null) {
                        if (input.charCodeAt(pos) === 58) {
                            result3 = ":";
                            pos++;
                        } else {
                            result3 = null;
                            if (reportFailures === 0) {
                                matchFailed("\":\"");
                            }
                        }
                        if (result3 !== null) {
                            result4 = parse_h16();
                            if (result4 !== null) {
                                if (input.charCodeAt(pos) === 58) {
                                    result5 = ":";
                                    pos++;
                                } else {
                                    result5 = null;
                                    if (reportFailures === 0) {
                                        matchFailed("\":\"");
                                    }
                                }
                                if (result5 !== null) {
                                    result6 = parse_h16();
                                    if (result6 !== null) {
                                        if (input.charCodeAt(pos) === 58) {
                                            result7 = ":";
                                            pos++;
                                        } else {
                                            result7 = null;
                                            if (reportFailures === 0) {
                                                matchFailed("\":\"");
                                            }
                                        }
                                        if (result7 !== null) {
                                            result8 = parse_h16();
                                            if (result8 !== null) {
                                                if (input.charCodeAt(pos) === 58) {
                                                    result9 = ":";
                                                    pos++;
                                                } else {
                                                    result9 = null;
                                                    if (reportFailures === 0) {
                                                        matchFailed("\":\"");
                                                    }
                                                }
                                                if (result9 !== null) {
                                                    result10 = parse_h16();
                                                    if (result10 !== null) {
                                                        if (input.charCodeAt(pos) === 58) {
                                                            result11 = ":";
                                                            pos++;
                                                        } else {
                                                            result11 = null;
                                                            if (reportFailures === 0) {
                                                                matchFailed("\":\"");
                                                            }
                                                        }
                                                        if (result11 !== null) {
                                                            result12 = parse_ls32();
                                                            if (result12 !== null) {
                                                                result0 = [result0, result1, result2, result3, result4, result5, result6, result7, result8, result9, result10, result11, result12];
                                                            } else {
                                                                result0 = null;
                                                                pos = pos1;
                                                            }
                                                        } else {
                                                            result0 = null;
                                                            pos = pos1;
                                                        }
                                                    } else {
                                                        result0 = null;
                                                        pos = pos1;
                                                    }
                                                } else {
                                                    result0 = null;
                                                    pos = pos1;
                                                }
                                            } else {
                                                result0 = null;
                                                pos = pos1;
                                            }
                                        } else {
                                            result0 = null;
                                            pos = pos1;
                                        }
                                    } else {
                                        result0 = null;
                                        pos = pos1;
                                    }
                                } else {
                                    result0 = null;
                                    pos = pos1;
                                }
                            } else {
                                result0 = null;
                                pos = pos1;
                            }
                        } else {
                            result0 = null;
                            pos = pos1;
                        }
                    } else {
                        result0 = null;
                        pos = pos1;
                    }
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 === null) {
                pos1 = pos;
                if (input.substr(pos, 2) === "::") {
                    result0 = "::";
                    pos += 2;
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"::\"");
                    }
                }
                if (result0 !== null) {
                    result1 = parse_h16();
                    if (result1 !== null) {
                        if (input.charCodeAt(pos) === 58) {
                            result2 = ":";
                            pos++;
                        } else {
                            result2 = null;
                            if (reportFailures === 0) {
                                matchFailed("\":\"");
                            }
                        }
                        if (result2 !== null) {
                            result3 = parse_h16();
                            if (result3 !== null) {
                                if (input.charCodeAt(pos) === 58) {
                                    result4 = ":";
                                    pos++;
                                } else {
                                    result4 = null;
                                    if (reportFailures === 0) {
                                        matchFailed("\":\"");
                                    }
                                }
                                if (result4 !== null) {
                                    result5 = parse_h16();
                                    if (result5 !== null) {
                                        if (input.charCodeAt(pos) === 58) {
                                            result6 = ":";
                                            pos++;
                                        } else {
                                            result6 = null;
                                            if (reportFailures === 0) {
                                                matchFailed("\":\"");
                                            }
                                        }
                                        if (result6 !== null) {
                                            result7 = parse_h16();
                                            if (result7 !== null) {
                                                if (input.charCodeAt(pos) === 58) {
                                                    result8 = ":";
                                                    pos++;
                                                } else {
                                                    result8 = null;
                                                    if (reportFailures === 0) {
                                                        matchFailed("\":\"");
                                                    }
                                                }
                                                if (result8 !== null) {
                                                    result9 = parse_h16();
                                                    if (result9 !== null) {
                                                        if (input.charCodeAt(pos) === 58) {
                                                            result10 = ":";
                                                            pos++;
                                                        } else {
                                                            result10 = null;
                                                            if (reportFailures === 0) {
                                                                matchFailed("\":\"");
                                                            }
                                                        }
                                                        if (result10 !== null) {
                                                            result11 = parse_ls32();
                                                            if (result11 !== null) {
                                                                result0 = [result0, result1, result2, result3, result4, result5, result6, result7, result8, result9, result10, result11];
                                                            } else {
                                                                result0 = null;
                                                                pos = pos1;
                                                            }
                                                        } else {
                                                            result0 = null;
                                                            pos = pos1;
                                                        }
                                                    } else {
                                                        result0 = null;
                                                        pos = pos1;
                                                    }
                                                } else {
                                                    result0 = null;
                                                    pos = pos1;
                                                }
                                            } else {
                                                result0 = null;
                                                pos = pos1;
                                            }
                                        } else {
                                            result0 = null;
                                            pos = pos1;
                                        }
                                    } else {
                                        result0 = null;
                                        pos = pos1;
                                    }
                                } else {
                                    result0 = null;
                                    pos = pos1;
                                }
                            } else {
                                result0 = null;
                                pos = pos1;
                            }
                        } else {
                            result0 = null;
                            pos = pos1;
                        }
                    } else {
                        result0 = null;
                        pos = pos1;
                    }
                } else {
                    result0 = null;
                    pos = pos1;
                }
                if (result0 === null) {
                    pos1 = pos;
                    if (input.substr(pos, 2) === "::") {
                        result0 = "::";
                        pos += 2;
                    } else {
                        result0 = null;
                        if (reportFailures === 0) {
                            matchFailed("\"::\"");
                        }
                    }
                    if (result0 !== null) {
                        result1 = parse_h16();
                        if (result1 !== null) {
                            if (input.charCodeAt(pos) === 58) {
                                result2 = ":";
                                pos++;
                            } else {
                                result2 = null;
                                if (reportFailures === 0) {
                                    matchFailed("\":\"");
                                }
                            }
                            if (result2 !== null) {
                                result3 = parse_h16();
                                if (result3 !== null) {
                                    if (input.charCodeAt(pos) === 58) {
                                        result4 = ":";
                                        pos++;
                                    } else {
                                        result4 = null;
                                        if (reportFailures === 0) {
                                            matchFailed("\":\"");
                                        }
                                    }
                                    if (result4 !== null) {
                                        result5 = parse_h16();
                                        if (result5 !== null) {
                                            if (input.charCodeAt(pos) === 58) {
                                                result6 = ":";
                                                pos++;
                                            } else {
                                                result6 = null;
                                                if (reportFailures === 0) {
                                                    matchFailed("\":\"");
                                                }
                                            }
                                            if (result6 !== null) {
                                                result7 = parse_h16();
                                                if (result7 !== null) {
                                                    if (input.charCodeAt(pos) === 58) {
                                                        result8 = ":";
                                                        pos++;
                                                    } else {
                                                        result8 = null;
                                                        if (reportFailures === 0) {
                                                            matchFailed("\":\"");
                                                        }
                                                    }
                                                    if (result8 !== null) {
                                                        result9 = parse_ls32();
                                                        if (result9 !== null) {
                                                            result0 = [result0, result1, result2, result3, result4, result5, result6, result7, result8, result9];
                                                        } else {
                                                            result0 = null;
                                                            pos = pos1;
                                                        }
                                                    } else {
                                                        result0 = null;
                                                        pos = pos1;
                                                    }
                                                } else {
                                                    result0 = null;
                                                    pos = pos1;
                                                }
                                            } else {
                                                result0 = null;
                                                pos = pos1;
                                            }
                                        } else {
                                            result0 = null;
                                            pos = pos1;
                                        }
                                    } else {
                                        result0 = null;
                                        pos = pos1;
                                    }
                                } else {
                                    result0 = null;
                                    pos = pos1;
                                }
                            } else {
                                result0 = null;
                                pos = pos1;
                            }
                        } else {
                            result0 = null;
                            pos = pos1;
                        }
                    } else {
                        result0 = null;
                        pos = pos1;
                    }
                    if (result0 === null) {
                        pos1 = pos;
                        if (input.substr(pos, 2) === "::") {
                            result0 = "::";
                            pos += 2;
                        } else {
                            result0 = null;
                            if (reportFailures === 0) {
                                matchFailed("\"::\"");
                            }
                        }
                        if (result0 !== null) {
                            result1 = parse_h16();
                            if (result1 !== null) {
                                if (input.charCodeAt(pos) === 58) {
                                    result2 = ":";
                                    pos++;
                                } else {
                                    result2 = null;
                                    if (reportFailures === 0) {
                                        matchFailed("\":\"");
                                    }
                                }
                                if (result2 !== null) {
                                    result3 = parse_h16();
                                    if (result3 !== null) {
                                        if (input.charCodeAt(pos) === 58) {
                                            result4 = ":";
                                            pos++;
                                        } else {
                                            result4 = null;
                                            if (reportFailures === 0) {
                                                matchFailed("\":\"");
                                            }
                                        }
                                        if (result4 !== null) {
                                            result5 = parse_h16();
                                            if (result5 !== null) {
                                                if (input.charCodeAt(pos) === 58) {
                                                    result6 = ":";
                                                    pos++;
                                                } else {
                                                    result6 = null;
                                                    if (reportFailures === 0) {
                                                        matchFailed("\":\"");
                                                    }
                                                }
                                                if (result6 !== null) {
                                                    result7 = parse_ls32();
                                                    if (result7 !== null) {
                                                        result0 = [result0, result1, result2, result3, result4, result5, result6, result7];
                                                    } else {
                                                        result0 = null;
                                                        pos = pos1;
                                                    }
                                                } else {
                                                    result0 = null;
                                                    pos = pos1;
                                                }
                                            } else {
                                                result0 = null;
                                                pos = pos1;
                                            }
                                        } else {
                                            result0 = null;
                                            pos = pos1;
                                        }
                                    } else {
                                        result0 = null;
                                        pos = pos1;
                                    }
                                } else {
                                    result0 = null;
                                    pos = pos1;
                                }
                            } else {
                                result0 = null;
                                pos = pos1;
                            }
                        } else {
                            result0 = null;
                            pos = pos1;
                        }
                        if (result0 === null) {
                            pos1 = pos;
                            if (input.substr(pos, 2) === "::") {
                                result0 = "::";
                                pos += 2;
                            } else {
                                result0 = null;
                                if (reportFailures === 0) {
                                    matchFailed("\"::\"");
                                }
                            }
                            if (result0 !== null) {
                                result1 = parse_h16();
                                if (result1 !== null) {
                                    if (input.charCodeAt(pos) === 58) {
                                        result2 = ":";
                                        pos++;
                                    } else {
                                        result2 = null;
                                        if (reportFailures === 0) {
                                            matchFailed("\":\"");
                                        }
                                    }
                                    if (result2 !== null) {
                                        result3 = parse_h16();
                                        if (result3 !== null) {
                                            if (input.charCodeAt(pos) === 58) {
                                                result4 = ":";
                                                pos++;
                                            } else {
                                                result4 = null;
                                                if (reportFailures === 0) {
                                                    matchFailed("\":\"");
                                                }
                                            }
                                            if (result4 !== null) {
                                                result5 = parse_ls32();
                                                if (result5 !== null) {
                                                    result0 = [result0, result1, result2, result3, result4, result5];
                                                } else {
                                                    result0 = null;
                                                    pos = pos1;
                                                }
                                            } else {
                                                result0 = null;
                                                pos = pos1;
                                            }
                                        } else {
                                            result0 = null;
                                            pos = pos1;
                                        }
                                    } else {
                                        result0 = null;
                                        pos = pos1;
                                    }
                                } else {
                                    result0 = null;
                                    pos = pos1;
                                }
                            } else {
                                result0 = null;
                                pos = pos1;
                            }
                            if (result0 === null) {
                                pos1 = pos;
                                if (input.substr(pos, 2) === "::") {
                                    result0 = "::";
                                    pos += 2;
                                } else {
                                    result0 = null;
                                    if (reportFailures === 0) {
                                        matchFailed("\"::\"");
                                    }
                                }
                                if (result0 !== null) {
                                    result1 = parse_h16();
                                    if (result1 !== null) {
                                        if (input.charCodeAt(pos) === 58) {
                                            result2 = ":";
                                            pos++;
                                        } else {
                                            result2 = null;
                                            if (reportFailures === 0) {
                                                matchFailed("\":\"");
                                            }
                                        }
                                        if (result2 !== null) {
                                            result3 = parse_ls32();
                                            if (result3 !== null) {
                                                result0 = [result0, result1, result2, result3];
                                            } else {
                                                result0 = null;
                                                pos = pos1;
                                            }
                                        } else {
                                            result0 = null;
                                            pos = pos1;
                                        }
                                    } else {
                                        result0 = null;
                                        pos = pos1;
                                    }
                                } else {
                                    result0 = null;
                                    pos = pos1;
                                }
                                if (result0 === null) {
                                    pos1 = pos;
                                    if (input.substr(pos, 2) === "::") {
                                        result0 = "::";
                                        pos += 2;
                                    } else {
                                        result0 = null;
                                        if (reportFailures === 0) {
                                            matchFailed("\"::\"");
                                        }
                                    }
                                    if (result0 !== null) {
                                        result1 = parse_ls32();
                                        if (result1 !== null) {
                                            result0 = [result0, result1];
                                        } else {
                                            result0 = null;
                                            pos = pos1;
                                        }
                                    } else {
                                        result0 = null;
                                        pos = pos1;
                                    }
                                    if (result0 === null) {
                                        pos1 = pos;
                                        if (input.substr(pos, 2) === "::") {
                                            result0 = "::";
                                            pos += 2;
                                        } else {
                                            result0 = null;
                                            if (reportFailures === 0) {
                                                matchFailed("\"::\"");
                                            }
                                        }
                                        if (result0 !== null) {
                                            result1 = parse_h16();
                                            if (result1 !== null) {
                                                result0 = [result0, result1];
                                            } else {
                                                result0 = null;
                                                pos = pos1;
                                            }
                                        } else {
                                            result0 = null;
                                            pos = pos1;
                                        }
                                        if (result0 === null) {
                                            pos1 = pos;
                                            result0 = parse_h16();
                                            if (result0 !== null) {
                                                if (input.substr(pos, 2) === "::") {
                                                    result1 = "::";
                                                    pos += 2;
                                                } else {
                                                    result1 = null;
                                                    if (reportFailures === 0) {
                                                        matchFailed("\"::\"");
                                                    }
                                                }
                                                if (result1 !== null) {
                                                    result2 = parse_h16();
                                                    if (result2 !== null) {
                                                        if (input.charCodeAt(pos) === 58) {
                                                            result3 = ":";
                                                            pos++;
                                                        } else {
                                                            result3 = null;
                                                            if (reportFailures === 0) {
                                                                matchFailed("\":\"");
                                                            }
                                                        }
                                                        if (result3 !== null) {
                                                            result4 = parse_h16();
                                                            if (result4 !== null) {
                                                                if (input.charCodeAt(pos) === 58) {
                                                                    result5 = ":";
                                                                    pos++;
                                                                } else {
                                                                    result5 = null;
                                                                    if (reportFailures === 0) {
                                                                        matchFailed("\":\"");
                                                                    }
                                                                }
                                                                if (result5 !== null) {
                                                                    result6 = parse_h16();
                                                                    if (result6 !== null) {
                                                                        if (input.charCodeAt(pos) === 58) {
                                                                            result7 = ":";
                                                                            pos++;
                                                                        } else {
                                                                            result7 = null;
                                                                            if (reportFailures === 0) {
                                                                                matchFailed("\":\"");
                                                                            }
                                                                        }
                                                                        if (result7 !== null) {
                                                                            result8 = parse_h16();
                                                                            if (result8 !== null) {
                                                                                if (input.charCodeAt(pos) === 58) {
                                                                                    result9 = ":";
                                                                                    pos++;
                                                                                } else {
                                                                                    result9 = null;
                                                                                    if (reportFailures === 0) {
                                                                                        matchFailed("\":\"");
                                                                                    }
                                                                                }
                                                                                if (result9 !== null) {
                                                                                    result10 = parse_ls32();
                                                                                    if (result10 !== null) {
                                                                                        result0 = [result0, result1, result2, result3, result4, result5, result6, result7, result8, result9, result10];
                                                                                    } else {
                                                                                        result0 = null;
                                                                                        pos = pos1;
                                                                                    }
                                                                                } else {
                                                                                    result0 = null;
                                                                                    pos = pos1;
                                                                                }
                                                                            } else {
                                                                                result0 = null;
                                                                                pos = pos1;
                                                                            }
                                                                        } else {
                                                                            result0 = null;
                                                                            pos = pos1;
                                                                        }
                                                                    } else {
                                                                        result0 = null;
                                                                        pos = pos1;
                                                                    }
                                                                } else {
                                                                    result0 = null;
                                                                    pos = pos1;
                                                                }
                                                            } else {
                                                                result0 = null;
                                                                pos = pos1;
                                                            }
                                                        } else {
                                                            result0 = null;
                                                            pos = pos1;
                                                        }
                                                    } else {
                                                        result0 = null;
                                                        pos = pos1;
                                                    }
                                                } else {
                                                    result0 = null;
                                                    pos = pos1;
                                                }
                                            } else {
                                                result0 = null;
                                                pos = pos1;
                                            }
                                            if (result0 === null) {
                                                pos1 = pos;
                                                result0 = parse_h16();
                                                if (result0 !== null) {
                                                    pos2 = pos;
                                                    if (input.charCodeAt(pos) === 58) {
                                                        result1 = ":";
                                                        pos++;
                                                    } else {
                                                        result1 = null;
                                                        if (reportFailures === 0) {
                                                            matchFailed("\":\"");
                                                        }
                                                    }
                                                    if (result1 !== null) {
                                                        result2 = parse_h16();
                                                        if (result2 !== null) {
                                                            result1 = [result1, result2];
                                                        } else {
                                                            result1 = null;
                                                            pos = pos2;
                                                        }
                                                    } else {
                                                        result1 = null;
                                                        pos = pos2;
                                                    }
                                                    result1 = result1 !== null ? result1 : "";
                                                    if (result1 !== null) {
                                                        if (input.substr(pos, 2) === "::") {
                                                            result2 = "::";
                                                            pos += 2;
                                                        } else {
                                                            result2 = null;
                                                            if (reportFailures === 0) {
                                                                matchFailed("\"::\"");
                                                            }
                                                        }
                                                        if (result2 !== null) {
                                                            result3 = parse_h16();
                                                            if (result3 !== null) {
                                                                if (input.charCodeAt(pos) === 58) {
                                                                    result4 = ":";
                                                                    pos++;
                                                                } else {
                                                                    result4 = null;
                                                                    if (reportFailures === 0) {
                                                                        matchFailed("\":\"");
                                                                    }
                                                                }
                                                                if (result4 !== null) {
                                                                    result5 = parse_h16();
                                                                    if (result5 !== null) {
                                                                        if (input.charCodeAt(pos) === 58) {
                                                                            result6 = ":";
                                                                            pos++;
                                                                        } else {
                                                                            result6 = null;
                                                                            if (reportFailures === 0) {
                                                                                matchFailed("\":\"");
                                                                            }
                                                                        }
                                                                        if (result6 !== null) {
                                                                            result7 = parse_h16();
                                                                            if (result7 !== null) {
                                                                                if (input.charCodeAt(pos) === 58) {
                                                                                    result8 = ":";
                                                                                    pos++;
                                                                                } else {
                                                                                    result8 = null;
                                                                                    if (reportFailures === 0) {
                                                                                        matchFailed("\":\"");
                                                                                    }
                                                                                }
                                                                                if (result8 !== null) {
                                                                                    result9 = parse_ls32();
                                                                                    if (result9 !== null) {
                                                                                        result0 = [result0, result1, result2, result3, result4, result5, result6, result7, result8, result9];
                                                                                    } else {
                                                                                        result0 = null;
                                                                                        pos = pos1;
                                                                                    }
                                                                                } else {
                                                                                    result0 = null;
                                                                                    pos = pos1;
                                                                                }
                                                                            } else {
                                                                                result0 = null;
                                                                                pos = pos1;
                                                                            }
                                                                        } else {
                                                                            result0 = null;
                                                                            pos = pos1;
                                                                        }
                                                                    } else {
                                                                        result0 = null;
                                                                        pos = pos1;
                                                                    }
                                                                } else {
                                                                    result0 = null;
                                                                    pos = pos1;
                                                                }
                                                            } else {
                                                                result0 = null;
                                                                pos = pos1;
                                                            }
                                                        } else {
                                                            result0 = null;
                                                            pos = pos1;
                                                        }
                                                    } else {
                                                        result0 = null;
                                                        pos = pos1;
                                                    }
                                                } else {
                                                    result0 = null;
                                                    pos = pos1;
                                                }
                                                if (result0 === null) {
                                                    pos1 = pos;
                                                    result0 = parse_h16();
                                                    if (result0 !== null) {
                                                        pos2 = pos;
                                                        if (input.charCodeAt(pos) === 58) {
                                                            result1 = ":";
                                                            pos++;
                                                        } else {
                                                            result1 = null;
                                                            if (reportFailures === 0) {
                                                                matchFailed("\":\"");
                                                            }
                                                        }
                                                        if (result1 !== null) {
                                                            result2 = parse_h16();
                                                            if (result2 !== null) {
                                                                result1 = [result1, result2];
                                                            } else {
                                                                result1 = null;
                                                                pos = pos2;
                                                            }
                                                        } else {
                                                            result1 = null;
                                                            pos = pos2;
                                                        }
                                                        result1 = result1 !== null ? result1 : "";
                                                        if (result1 !== null) {
                                                            pos2 = pos;
                                                            if (input.charCodeAt(pos) === 58) {
                                                                result2 = ":";
                                                                pos++;
                                                            } else {
                                                                result2 = null;
                                                                if (reportFailures === 0) {
                                                                    matchFailed("\":\"");
                                                                }
                                                            }
                                                            if (result2 !== null) {
                                                                result3 = parse_h16();
                                                                if (result3 !== null) {
                                                                    result2 = [result2, result3];
                                                                } else {
                                                                    result2 = null;
                                                                    pos = pos2;
                                                                }
                                                            } else {
                                                                result2 = null;
                                                                pos = pos2;
                                                            }
                                                            result2 = result2 !== null ? result2 : "";
                                                            if (result2 !== null) {
                                                                if (input.substr(pos, 2) === "::") {
                                                                    result3 = "::";
                                                                    pos += 2;
                                                                } else {
                                                                    result3 = null;
                                                                    if (reportFailures === 0) {
                                                                        matchFailed("\"::\"");
                                                                    }
                                                                }
                                                                if (result3 !== null) {
                                                                    result4 = parse_h16();
                                                                    if (result4 !== null) {
                                                                        if (input.charCodeAt(pos) === 58) {
                                                                            result5 = ":";
                                                                            pos++;
                                                                        } else {
                                                                            result5 = null;
                                                                            if (reportFailures === 0) {
                                                                                matchFailed("\":\"");
                                                                            }
                                                                        }
                                                                        if (result5 !== null) {
                                                                            result6 = parse_h16();
                                                                            if (result6 !== null) {
                                                                                if (input.charCodeAt(pos) === 58) {
                                                                                    result7 = ":";
                                                                                    pos++;
                                                                                } else {
                                                                                    result7 = null;
                                                                                    if (reportFailures === 0) {
                                                                                        matchFailed("\":\"");
                                                                                    }
                                                                                }
                                                                                if (result7 !== null) {
                                                                                    result8 = parse_ls32();
                                                                                    if (result8 !== null) {
                                                                                        result0 = [result0, result1, result2, result3, result4, result5, result6, result7, result8];
                                                                                    } else {
                                                                                        result0 = null;
                                                                                        pos = pos1;
                                                                                    }
                                                                                } else {
                                                                                    result0 = null;
                                                                                    pos = pos1;
                                                                                }
                                                                            } else {
                                                                                result0 = null;
                                                                                pos = pos1;
                                                                            }
                                                                        } else {
                                                                            result0 = null;
                                                                            pos = pos1;
                                                                        }
                                                                    } else {
                                                                        result0 = null;
                                                                        pos = pos1;
                                                                    }
                                                                } else {
                                                                    result0 = null;
                                                                    pos = pos1;
                                                                }
                                                            } else {
                                                                result0 = null;
                                                                pos = pos1;
                                                            }
                                                        } else {
                                                            result0 = null;
                                                            pos = pos1;
                                                        }
                                                    } else {
                                                        result0 = null;
                                                        pos = pos1;
                                                    }
                                                    if (result0 === null) {
                                                        pos1 = pos;
                                                        result0 = parse_h16();
                                                        if (result0 !== null) {
                                                            pos2 = pos;
                                                            if (input.charCodeAt(pos) === 58) {
                                                                result1 = ":";
                                                                pos++;
                                                            } else {
                                                                result1 = null;
                                                                if (reportFailures === 0) {
                                                                    matchFailed("\":\"");
                                                                }
                                                            }
                                                            if (result1 !== null) {
                                                                result2 = parse_h16();
                                                                if (result2 !== null) {
                                                                    result1 = [result1, result2];
                                                                } else {
                                                                    result1 = null;
                                                                    pos = pos2;
                                                                }
                                                            } else {
                                                                result1 = null;
                                                                pos = pos2;
                                                            }
                                                            result1 = result1 !== null ? result1 : "";
                                                            if (result1 !== null) {
                                                                pos2 = pos;
                                                                if (input.charCodeAt(pos) === 58) {
                                                                    result2 = ":";
                                                                    pos++;
                                                                } else {
                                                                    result2 = null;
                                                                    if (reportFailures === 0) {
                                                                        matchFailed("\":\"");
                                                                    }
                                                                }
                                                                if (result2 !== null) {
                                                                    result3 = parse_h16();
                                                                    if (result3 !== null) {
                                                                        result2 = [result2, result3];
                                                                    } else {
                                                                        result2 = null;
                                                                        pos = pos2;
                                                                    }
                                                                } else {
                                                                    result2 = null;
                                                                    pos = pos2;
                                                                }
                                                                result2 = result2 !== null ? result2 : "";
                                                                if (result2 !== null) {
                                                                    pos2 = pos;
                                                                    if (input.charCodeAt(pos) === 58) {
                                                                        result3 = ":";
                                                                        pos++;
                                                                    } else {
                                                                        result3 = null;
                                                                        if (reportFailures === 0) {
                                                                            matchFailed("\":\"");
                                                                        }
                                                                    }
                                                                    if (result3 !== null) {
                                                                        result4 = parse_h16();
                                                                        if (result4 !== null) {
                                                                            result3 = [result3, result4];
                                                                        } else {
                                                                            result3 = null;
                                                                            pos = pos2;
                                                                        }
                                                                    } else {
                                                                        result3 = null;
                                                                        pos = pos2;
                                                                    }
                                                                    result3 = result3 !== null ? result3 : "";
                                                                    if (result3 !== null) {
                                                                        if (input.substr(pos, 2) === "::") {
                                                                            result4 = "::";
                                                                            pos += 2;
                                                                        } else {
                                                                            result4 = null;
                                                                            if (reportFailures === 0) {
                                                                                matchFailed("\"::\"");
                                                                            }
                                                                        }
                                                                        if (result4 !== null) {
                                                                            result5 = parse_h16();
                                                                            if (result5 !== null) {
                                                                                if (input.charCodeAt(pos) === 58) {
                                                                                    result6 = ":";
                                                                                    pos++;
                                                                                } else {
                                                                                    result6 = null;
                                                                                    if (reportFailures === 0) {
                                                                                        matchFailed("\":\"");
                                                                                    }
                                                                                }
                                                                                if (result6 !== null) {
                                                                                    result7 = parse_ls32();
                                                                                    if (result7 !== null) {
                                                                                        result0 = [result0, result1, result2, result3, result4, result5, result6, result7];
                                                                                    } else {
                                                                                        result0 = null;
                                                                                        pos = pos1;
                                                                                    }
                                                                                } else {
                                                                                    result0 = null;
                                                                                    pos = pos1;
                                                                                }
                                                                            } else {
                                                                                result0 = null;
                                                                                pos = pos1;
                                                                            }
                                                                        } else {
                                                                            result0 = null;
                                                                            pos = pos1;
                                                                        }
                                                                    } else {
                                                                        result0 = null;
                                                                        pos = pos1;
                                                                    }
                                                                } else {
                                                                    result0 = null;
                                                                    pos = pos1;
                                                                }
                                                            } else {
                                                                result0 = null;
                                                                pos = pos1;
                                                            }
                                                        } else {
                                                            result0 = null;
                                                            pos = pos1;
                                                        }
                                                        if (result0 === null) {
                                                            pos1 = pos;
                                                            result0 = parse_h16();
                                                            if (result0 !== null) {
                                                                pos2 = pos;
                                                                if (input.charCodeAt(pos) === 58) {
                                                                    result1 = ":";
                                                                    pos++;
                                                                } else {
                                                                    result1 = null;
                                                                    if (reportFailures === 0) {
                                                                        matchFailed("\":\"");
                                                                    }
                                                                }
                                                                if (result1 !== null) {
                                                                    result2 = parse_h16();
                                                                    if (result2 !== null) {
                                                                        result1 = [result1, result2];
                                                                    } else {
                                                                        result1 = null;
                                                                        pos = pos2;
                                                                    }
                                                                } else {
                                                                    result1 = null;
                                                                    pos = pos2;
                                                                }
                                                                result1 = result1 !== null ? result1 : "";
                                                                if (result1 !== null) {
                                                                    pos2 = pos;
                                                                    if (input.charCodeAt(pos) === 58) {
                                                                        result2 = ":";
                                                                        pos++;
                                                                    } else {
                                                                        result2 = null;
                                                                        if (reportFailures === 0) {
                                                                            matchFailed("\":\"");
                                                                        }
                                                                    }
                                                                    if (result2 !== null) {
                                                                        result3 = parse_h16();
                                                                        if (result3 !== null) {
                                                                            result2 = [result2, result3];
                                                                        } else {
                                                                            result2 = null;
                                                                            pos = pos2;
                                                                        }
                                                                    } else {
                                                                        result2 = null;
                                                                        pos = pos2;
                                                                    }
                                                                    result2 = result2 !== null ? result2 : "";
                                                                    if (result2 !== null) {
                                                                        pos2 = pos;
                                                                        if (input.charCodeAt(pos) === 58) {
                                                                            result3 = ":";
                                                                            pos++;
                                                                        } else {
                                                                            result3 = null;
                                                                            if (reportFailures === 0) {
                                                                                matchFailed("\":\"");
                                                                            }
                                                                        }
                                                                        if (result3 !== null) {
                                                                            result4 = parse_h16();
                                                                            if (result4 !== null) {
                                                                                result3 = [result3, result4];
                                                                            } else {
                                                                                result3 = null;
                                                                                pos = pos2;
                                                                            }
                                                                        } else {
                                                                            result3 = null;
                                                                            pos = pos2;
                                                                        }
                                                                        result3 = result3 !== null ? result3 : "";
                                                                        if (result3 !== null) {
                                                                            pos2 = pos;
                                                                            if (input.charCodeAt(pos) === 58) {
                                                                                result4 = ":";
                                                                                pos++;
                                                                            } else {
                                                                                result4 = null;
                                                                                if (reportFailures === 0) {
                                                                                    matchFailed("\":\"");
                                                                                }
                                                                            }
                                                                            if (result4 !== null) {
                                                                                result5 = parse_h16();
                                                                                if (result5 !== null) {
                                                                                    result4 = [result4, result5];
                                                                                } else {
                                                                                    result4 = null;
                                                                                    pos = pos2;
                                                                                }
                                                                            } else {
                                                                                result4 = null;
                                                                                pos = pos2;
                                                                            }
                                                                            result4 = result4 !== null ? result4 : "";
                                                                            if (result4 !== null) {
                                                                                if (input.substr(pos, 2) === "::") {
                                                                                    result5 = "::";
                                                                                    pos += 2;
                                                                                } else {
                                                                                    result5 = null;
                                                                                    if (reportFailures === 0) {
                                                                                        matchFailed("\"::\"");
                                                                                    }
                                                                                }
                                                                                if (result5 !== null) {
                                                                                    result6 = parse_ls32();
                                                                                    if (result6 !== null) {
                                                                                        result0 = [result0, result1, result2, result3, result4, result5, result6];
                                                                                    } else {
                                                                                        result0 = null;
                                                                                        pos = pos1;
                                                                                    }
                                                                                } else {
                                                                                    result0 = null;
                                                                                    pos = pos1;
                                                                                }
                                                                            } else {
                                                                                result0 = null;
                                                                                pos = pos1;
                                                                            }
                                                                        } else {
                                                                            result0 = null;
                                                                            pos = pos1;
                                                                        }
                                                                    } else {
                                                                        result0 = null;
                                                                        pos = pos1;
                                                                    }
                                                                } else {
                                                                    result0 = null;
                                                                    pos = pos1;
                                                                }
                                                            } else {
                                                                result0 = null;
                                                                pos = pos1;
                                                            }
                                                            if (result0 === null) {
                                                                pos1 = pos;
                                                                result0 = parse_h16();
                                                                if (result0 !== null) {
                                                                    pos2 = pos;
                                                                    if (input.charCodeAt(pos) === 58) {
                                                                        result1 = ":";
                                                                        pos++;
                                                                    } else {
                                                                        result1 = null;
                                                                        if (reportFailures === 0) {
                                                                            matchFailed("\":\"");
                                                                        }
                                                                    }
                                                                    if (result1 !== null) {
                                                                        result2 = parse_h16();
                                                                        if (result2 !== null) {
                                                                            result1 = [result1, result2];
                                                                        } else {
                                                                            result1 = null;
                                                                            pos = pos2;
                                                                        }
                                                                    } else {
                                                                        result1 = null;
                                                                        pos = pos2;
                                                                    }
                                                                    result1 = result1 !== null ? result1 : "";
                                                                    if (result1 !== null) {
                                                                        pos2 = pos;
                                                                        if (input.charCodeAt(pos) === 58) {
                                                                            result2 = ":";
                                                                            pos++;
                                                                        } else {
                                                                            result2 = null;
                                                                            if (reportFailures === 0) {
                                                                                matchFailed("\":\"");
                                                                            }
                                                                        }
                                                                        if (result2 !== null) {
                                                                            result3 = parse_h16();
                                                                            if (result3 !== null) {
                                                                                result2 = [result2, result3];
                                                                            } else {
                                                                                result2 = null;
                                                                                pos = pos2;
                                                                            }
                                                                        } else {
                                                                            result2 = null;
                                                                            pos = pos2;
                                                                        }
                                                                        result2 = result2 !== null ? result2 : "";
                                                                        if (result2 !== null) {
                                                                            pos2 = pos;
                                                                            if (input.charCodeAt(pos) === 58) {
                                                                                result3 = ":";
                                                                                pos++;
                                                                            } else {
                                                                                result3 = null;
                                                                                if (reportFailures === 0) {
                                                                                    matchFailed("\":\"");
                                                                                }
                                                                            }
                                                                            if (result3 !== null) {
                                                                                result4 = parse_h16();
                                                                                if (result4 !== null) {
                                                                                    result3 = [result3, result4];
                                                                                } else {
                                                                                    result3 = null;
                                                                                    pos = pos2;
                                                                                }
                                                                            } else {
                                                                                result3 = null;
                                                                                pos = pos2;
                                                                            }
                                                                            result3 = result3 !== null ? result3 : "";
                                                                            if (result3 !== null) {
                                                                                pos2 = pos;
                                                                                if (input.charCodeAt(pos) === 58) {
                                                                                    result4 = ":";
                                                                                    pos++;
                                                                                } else {
                                                                                    result4 = null;
                                                                                    if (reportFailures === 0) {
                                                                                        matchFailed("\":\"");
                                                                                    }
                                                                                }
                                                                                if (result4 !== null) {
                                                                                    result5 = parse_h16();
                                                                                    if (result5 !== null) {
                                                                                        result4 = [result4, result5];
                                                                                    } else {
                                                                                        result4 = null;
                                                                                        pos = pos2;
                                                                                    }
                                                                                } else {
                                                                                    result4 = null;
                                                                                    pos = pos2;
                                                                                }
                                                                                result4 = result4 !== null ? result4 : "";
                                                                                if (result4 !== null) {
                                                                                    pos2 = pos;
                                                                                    if (input.charCodeAt(pos) === 58) {
                                                                                        result5 = ":";
                                                                                        pos++;
                                                                                    } else {
                                                                                        result5 = null;
                                                                                        if (reportFailures === 0) {
                                                                                            matchFailed("\":\"");
                                                                                        }
                                                                                    }
                                                                                    if (result5 !== null) {
                                                                                        result6 = parse_h16();
                                                                                        if (result6 !== null) {
                                                                                            result5 = [result5, result6];
                                                                                        } else {
                                                                                            result5 = null;
                                                                                            pos = pos2;
                                                                                        }
                                                                                    } else {
                                                                                        result5 = null;
                                                                                        pos = pos2;
                                                                                    }
                                                                                    result5 = result5 !== null ? result5 : "";
                                                                                    if (result5 !== null) {
                                                                                        if (input.substr(pos, 2) === "::") {
                                                                                            result6 = "::";
                                                                                            pos += 2;
                                                                                        } else {
                                                                                            result6 = null;
                                                                                            if (reportFailures === 0) {
                                                                                                matchFailed("\"::\"");
                                                                                            }
                                                                                        }
                                                                                        if (result6 !== null) {
                                                                                            result7 = parse_h16();
                                                                                            if (result7 !== null) {
                                                                                                result0 = [result0, result1, result2, result3, result4, result5, result6, result7];
                                                                                            } else {
                                                                                                result0 = null;
                                                                                                pos = pos1;
                                                                                            }
                                                                                        } else {
                                                                                            result0 = null;
                                                                                            pos = pos1;
                                                                                        }
                                                                                    } else {
                                                                                        result0 = null;
                                                                                        pos = pos1;
                                                                                    }
                                                                                } else {
                                                                                    result0 = null;
                                                                                    pos = pos1;
                                                                                }
                                                                            } else {
                                                                                result0 = null;
                                                                                pos = pos1;
                                                                            }
                                                                        } else {
                                                                            result0 = null;
                                                                            pos = pos1;
                                                                        }
                                                                    } else {
                                                                        result0 = null;
                                                                        pos = pos1;
                                                                    }
                                                                } else {
                                                                    result0 = null;
                                                                    pos = pos1;
                                                                }
                                                                if (result0 === null) {
                                                                    pos1 = pos;
                                                                    result0 = parse_h16();
                                                                    if (result0 !== null) {
                                                                        pos2 = pos;
                                                                        if (input.charCodeAt(pos) === 58) {
                                                                            result1 = ":";
                                                                            pos++;
                                                                        } else {
                                                                            result1 = null;
                                                                            if (reportFailures === 0) {
                                                                                matchFailed("\":\"");
                                                                            }
                                                                        }
                                                                        if (result1 !== null) {
                                                                            result2 = parse_h16();
                                                                            if (result2 !== null) {
                                                                                result1 = [result1, result2];
                                                                            } else {
                                                                                result1 = null;
                                                                                pos = pos2;
                                                                            }
                                                                        } else {
                                                                            result1 = null;
                                                                            pos = pos2;
                                                                        }
                                                                        result1 = result1 !== null ? result1 : "";
                                                                        if (result1 !== null) {
                                                                            pos2 = pos;
                                                                            if (input.charCodeAt(pos) === 58) {
                                                                                result2 = ":";
                                                                                pos++;
                                                                            } else {
                                                                                result2 = null;
                                                                                if (reportFailures === 0) {
                                                                                    matchFailed("\":\"");
                                                                                }
                                                                            }
                                                                            if (result2 !== null) {
                                                                                result3 = parse_h16();
                                                                                if (result3 !== null) {
                                                                                    result2 = [result2, result3];
                                                                                } else {
                                                                                    result2 = null;
                                                                                    pos = pos2;
                                                                                }
                                                                            } else {
                                                                                result2 = null;
                                                                                pos = pos2;
                                                                            }
                                                                            result2 = result2 !== null ? result2 : "";
                                                                            if (result2 !== null) {
                                                                                pos2 = pos;
                                                                                if (input.charCodeAt(pos) === 58) {
                                                                                    result3 = ":";
                                                                                    pos++;
                                                                                } else {
                                                                                    result3 = null;
                                                                                    if (reportFailures === 0) {
                                                                                        matchFailed("\":\"");
                                                                                    }
                                                                                }
                                                                                if (result3 !== null) {
                                                                                    result4 = parse_h16();
                                                                                    if (result4 !== null) {
                                                                                        result3 = [result3, result4];
                                                                                    } else {
                                                                                        result3 = null;
                                                                                        pos = pos2;
                                                                                    }
                                                                                } else {
                                                                                    result3 = null;
                                                                                    pos = pos2;
                                                                                }
                                                                                result3 = result3 !== null ? result3 : "";
                                                                                if (result3 !== null) {
                                                                                    pos2 = pos;
                                                                                    if (input.charCodeAt(pos) === 58) {
                                                                                        result4 = ":";
                                                                                        pos++;
                                                                                    } else {
                                                                                        result4 = null;
                                                                                        if (reportFailures === 0) {
                                                                                            matchFailed("\":\"");
                                                                                        }
                                                                                    }
                                                                                    if (result4 !== null) {
                                                                                        result5 = parse_h16();
                                                                                        if (result5 !== null) {
                                                                                            result4 = [result4, result5];
                                                                                        } else {
                                                                                            result4 = null;
                                                                                            pos = pos2;
                                                                                        }
                                                                                    } else {
                                                                                        result4 = null;
                                                                                        pos = pos2;
                                                                                    }
                                                                                    result4 = result4 !== null ? result4 : "";
                                                                                    if (result4 !== null) {
                                                                                        pos2 = pos;
                                                                                        if (input.charCodeAt(pos) === 58) {
                                                                                            result5 = ":";
                                                                                            pos++;
                                                                                        } else {
                                                                                            result5 = null;
                                                                                            if (reportFailures === 0) {
                                                                                                matchFailed("\":\"");
                                                                                            }
                                                                                        }
                                                                                        if (result5 !== null) {
                                                                                            result6 = parse_h16();
                                                                                            if (result6 !== null) {
                                                                                                result5 = [result5, result6];
                                                                                            } else {
                                                                                                result5 = null;
                                                                                                pos = pos2;
                                                                                            }
                                                                                        } else {
                                                                                            result5 = null;
                                                                                            pos = pos2;
                                                                                        }
                                                                                        result5 = result5 !== null ? result5 : "";
                                                                                        if (result5 !== null) {
                                                                                            pos2 = pos;
                                                                                            if (input.charCodeAt(pos) === 58) {
                                                                                                result6 = ":";
                                                                                                pos++;
                                                                                            } else {
                                                                                                result6 = null;
                                                                                                if (reportFailures === 0) {
                                                                                                    matchFailed("\":\"");
                                                                                                }
                                                                                            }
                                                                                            if (result6 !== null) {
                                                                                                result7 = parse_h16();
                                                                                                if (result7 !== null) {
                                                                                                    result6 = [result6, result7];
                                                                                                } else {
                                                                                                    result6 = null;
                                                                                                    pos = pos2;
                                                                                                }
                                                                                            } else {
                                                                                                result6 = null;
                                                                                                pos = pos2;
                                                                                            }
                                                                                            result6 = result6 !== null ? result6 : "";
                                                                                            if (result6 !== null) {
                                                                                                if (input.substr(pos, 2) === "::") {
                                                                                                    result7 = "::";
                                                                                                    pos += 2;
                                                                                                } else {
                                                                                                    result7 = null;
                                                                                                    if (reportFailures === 0) {
                                                                                                        matchFailed("\"::\"");
                                                                                                    }
                                                                                                }
                                                                                                if (result7 !== null) {
                                                                                                    result0 = [result0, result1, result2, result3, result4, result5, result6, result7];
                                                                                                } else {
                                                                                                    result0 = null;
                                                                                                    pos = pos1;
                                                                                                }
                                                                                            } else {
                                                                                                result0 = null;
                                                                                                pos = pos1;
                                                                                            }
                                                                                        } else {
                                                                                            result0 = null;
                                                                                            pos = pos1;
                                                                                        }
                                                                                    } else {
                                                                                        result0 = null;
                                                                                        pos = pos1;
                                                                                    }
                                                                                } else {
                                                                                    result0 = null;
                                                                                    pos = pos1;
                                                                                }
                                                                            } else {
                                                                                result0 = null;
                                                                                pos = pos1;
                                                                            }
                                                                        } else {
                                                                            result0 = null;
                                                                            pos = pos1;
                                                                        }
                                                                    } else {
                                                                        result0 = null;
                                                                        pos = pos1;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (result0 !== null) {
                result0 = (function (offset) {
                    data.host_type = 'IPv6';
                    return input.substring(pos, offset);
                })(pos0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_h16() {
            var result0, result1, result2, result3;
            var pos0;
            pos0 = pos;
            result0 = parse_HEXDIG();
            if (result0 !== null) {
                result1 = parse_HEXDIG();
                result1 = result1 !== null ? result1 : "";
                if (result1 !== null) {
                    result2 = parse_HEXDIG();
                    result2 = result2 !== null ? result2 : "";
                    if (result2 !== null) {
                        result3 = parse_HEXDIG();
                        result3 = result3 !== null ? result3 : "";
                        if (result3 !== null) {
                            result0 = [result0, result1, result2, result3];
                        } else {
                            result0 = null;
                            pos = pos0;
                        }
                    } else {
                        result0 = null;
                        pos = pos0;
                    }
                } else {
                    result0 = null;
                    pos = pos0;
                }
            } else {
                result0 = null;
                pos = pos0;
            }
            return result0;
        }

        function parse_ls32() {
            var result0, result1, result2;
            var pos0;
            pos0 = pos;
            result0 = parse_h16();
            if (result0 !== null) {
                if (input.charCodeAt(pos) === 58) {
                    result1 = ":";
                    pos++;
                } else {
                    result1 = null;
                    if (reportFailures === 0) {
                        matchFailed("\":\"");
                    }
                }
                if (result1 !== null) {
                    result2 = parse_h16();
                    if (result2 !== null) {
                        result0 = [result0, result1, result2];
                    } else {
                        result0 = null;
                        pos = pos0;
                    }
                } else {
                    result0 = null;
                    pos = pos0;
                }
            } else {
                result0 = null;
                pos = pos0;
            }
            if (result0 === null) {
                result0 = parse_IPv4address();
            }
            return result0;
        }

        function parse_IPv4address() {
            var result0, result1, result2, result3, result4, result5, result6;
            var pos0, pos1;
            pos0 = pos;
            pos1 = pos;
            result0 = parse_dec_octet();
            if (result0 !== null) {
                if (input.charCodeAt(pos) === 46) {
                    result1 = ".";
                    pos++;
                } else {
                    result1 = null;
                    if (reportFailures === 0) {
                        matchFailed("\".\"");
                    }
                }
                if (result1 !== null) {
                    result2 = parse_dec_octet();
                    if (result2 !== null) {
                        if (input.charCodeAt(pos) === 46) {
                            result3 = ".";
                            pos++;
                        } else {
                            result3 = null;
                            if (reportFailures === 0) {
                                matchFailed("\".\"");
                            }
                        }
                        if (result3 !== null) {
                            result4 = parse_dec_octet();
                            if (result4 !== null) {
                                if (input.charCodeAt(pos) === 46) {
                                    result5 = ".";
                                    pos++;
                                } else {
                                    result5 = null;
                                    if (reportFailures === 0) {
                                        matchFailed("\".\"");
                                    }
                                }
                                if (result5 !== null) {
                                    result6 = parse_dec_octet();
                                    if (result6 !== null) {
                                        result0 = [result0, result1, result2, result3, result4, result5, result6];
                                    } else {
                                        result0 = null;
                                        pos = pos1;
                                    }
                                } else {
                                    result0 = null;
                                    pos = pos1;
                                }
                            } else {
                                result0 = null;
                                pos = pos1;
                            }
                        } else {
                            result0 = null;
                            pos = pos1;
                        }
                    } else {
                        result0 = null;
                        pos = pos1;
                    }
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset) {
                    data.host_type = 'IPv4';
                    return input.substring(pos, offset);
                })(pos0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_dec_octet() {
            var result0, result1, result2;
            var pos0;
            pos0 = pos;
            if (input.substr(pos, 2) === "25") {
                result0 = "25";
                pos += 2;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"25\"");
                }
            }
            if (result0 !== null) {
                if (/^[0-5]/.test(input.charAt(pos))) {
                    result1 = input.charAt(pos);
                    pos++;
                } else {
                    result1 = null;
                    if (reportFailures === 0) {
                        matchFailed("[0-5]");
                    }
                }
                if (result1 !== null) {
                    result0 = [result0, result1];
                } else {
                    result0 = null;
                    pos = pos0;
                }
            } else {
                result0 = null;
                pos = pos0;
            }
            if (result0 === null) {
                pos0 = pos;
                if (input.charCodeAt(pos) === 50) {
                    result0 = "2";
                    pos++;
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"2\"");
                    }
                }
                if (result0 !== null) {
                    if (/^[0-4]/.test(input.charAt(pos))) {
                        result1 = input.charAt(pos);
                        pos++;
                    } else {
                        result1 = null;
                        if (reportFailures === 0) {
                            matchFailed("[0-4]");
                        }
                    }
                    if (result1 !== null) {
                        result2 = parse_DIGIT();
                        if (result2 !== null) {
                            result0 = [result0, result1, result2];
                        } else {
                            result0 = null;
                            pos = pos0;
                        }
                    } else {
                        result0 = null;
                        pos = pos0;
                    }
                } else {
                    result0 = null;
                    pos = pos0;
                }
                if (result0 === null) {
                    pos0 = pos;
                    if (input.charCodeAt(pos) === 49) {
                        result0 = "1";
                        pos++;
                    } else {
                        result0 = null;
                        if (reportFailures === 0) {
                            matchFailed("\"1\"");
                        }
                    }
                    if (result0 !== null) {
                        result1 = parse_DIGIT();
                        if (result1 !== null) {
                            result2 = parse_DIGIT();
                            if (result2 !== null) {
                                result0 = [result0, result1, result2];
                            } else {
                                result0 = null;
                                pos = pos0;
                            }
                        } else {
                            result0 = null;
                            pos = pos0;
                        }
                    } else {
                        result0 = null;
                        pos = pos0;
                    }
                    if (result0 === null) {
                        pos0 = pos;
                        if (/^[1-9]/.test(input.charAt(pos))) {
                            result0 = input.charAt(pos);
                            pos++;
                        } else {
                            result0 = null;
                            if (reportFailures === 0) {
                                matchFailed("[1-9]");
                            }
                        }
                        if (result0 !== null) {
                            result1 = parse_DIGIT();
                            if (result1 !== null) {
                                result0 = [result0, result1];
                            } else {
                                result0 = null;
                                pos = pos0;
                            }
                        } else {
                            result0 = null;
                            pos = pos0;
                        }
                        if (result0 === null) {
                            result0 = parse_DIGIT();
                        }
                    }
                }
            }
            return result0;
        }

        function parse_port() {
            var result0, result1, result2, result3, result4;
            var pos0, pos1;
            pos0 = pos;
            pos1 = pos;
            result0 = parse_DIGIT();
            result0 = result0 !== null ? result0 : "";
            if (result0 !== null) {
                result1 = parse_DIGIT();
                result1 = result1 !== null ? result1 : "";
                if (result1 !== null) {
                    result2 = parse_DIGIT();
                    result2 = result2 !== null ? result2 : "";
                    if (result2 !== null) {
                        result3 = parse_DIGIT();
                        result3 = result3 !== null ? result3 : "";
                        if (result3 !== null) {
                            result4 = parse_DIGIT();
                            result4 = result4 !== null ? result4 : "";
                            if (result4 !== null) {
                                result0 = [result0, result1, result2, result3, result4];
                            } else {
                                result0 = null;
                                pos = pos1;
                            }
                        } else {
                            result0 = null;
                            pos = pos1;
                        }
                    } else {
                        result0 = null;
                        pos = pos1;
                    }
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset, port) {
                    port = parseInt(port.join(''));
                    data.port = port;
                    return port;
                })(pos0, result0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_uri_parameters() {
            var result0, result1, result2;
            var pos0;
            result0 = [];
            pos0 = pos;
            if (input.charCodeAt(pos) === 59) {
                result1 = ";";
                pos++;
            } else {
                result1 = null;
                if (reportFailures === 0) {
                    matchFailed("\";\"");
                }
            }
            if (result1 !== null) {
                result2 = parse_uri_parameter();
                if (result2 !== null) {
                    result1 = [result1, result2];
                } else {
                    result1 = null;
                    pos = pos0;
                }
            } else {
                result1 = null;
                pos = pos0;
            }
            while (result1 !== null) {
                result0.push(result1);
                pos0 = pos;
                if (input.charCodeAt(pos) === 59) {
                    result1 = ";";
                    pos++;
                } else {
                    result1 = null;
                    if (reportFailures === 0) {
                        matchFailed("\";\"");
                    }
                }
                if (result1 !== null) {
                    result2 = parse_uri_parameter();
                    if (result2 !== null) {
                        result1 = [result1, result2];
                    } else {
                        result1 = null;
                        pos = pos0;
                    }
                } else {
                    result1 = null;
                    pos = pos0;
                }
            }
            return result0;
        }

        function parse_uri_parameter() {
            var result0;
            result0 = parse_transport_param();
            if (result0 === null) {
                result0 = parse_user_param();
                if (result0 === null) {
                    result0 = parse_method_param();
                    if (result0 === null) {
                        result0 = parse_ttl_param();
                        if (result0 === null) {
                            result0 = parse_maddr_param();
                            if (result0 === null) {
                                result0 = parse_lr_param();
                                if (result0 === null) {
                                    result0 = parse_other_param();
                                }
                            }
                        }
                    }
                }
            }
            return result0;
        }

        function parse_transport_param() {
            var result0, result1;
            var pos0, pos1;
            pos0 = pos;
            pos1 = pos;
            if (input.substr(pos, 10).toLowerCase() === "transport=") {
                result0 = input.substr(pos, 10);
                pos += 10;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"transport=\"");
                }
            }
            if (result0 !== null) {
                if (input.substr(pos, 3).toLowerCase() === "udp") {
                    result1 = input.substr(pos, 3);
                    pos += 3;
                } else {
                    result1 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"udp\"");
                    }
                }
                if (result1 === null) {
                    if (input.substr(pos, 3).toLowerCase() === "tcp") {
                        result1 = input.substr(pos, 3);
                        pos += 3;
                    } else {
                        result1 = null;
                        if (reportFailures === 0) {
                            matchFailed("\"tcp\"");
                        }
                    }
                    if (result1 === null) {
                        if (input.substr(pos, 4).toLowerCase() === "sctp") {
                            result1 = input.substr(pos, 4);
                            pos += 4;
                        } else {
                            result1 = null;
                            if (reportFailures === 0) {
                                matchFailed("\"sctp\"");
                            }
                        }
                        if (result1 === null) {
                            if (input.substr(pos, 3).toLowerCase() === "tls") {
                                result1 = input.substr(pos, 3);
                                pos += 3;
                            } else {
                                result1 = null;
                                if (reportFailures === 0) {
                                    matchFailed("\"tls\"");
                                }
                            }
                            if (result1 === null) {
                                result1 = parse_token();
                            }
                        }
                    }
                }
                if (result1 !== null) {
                    result0 = [result0, result1];
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset, transport) {
                    if (!data.uri_params) data.uri_params = {};
                    data.uri_params['transport'] = transport.toLowerCase();
                })(pos0, result0[1]);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_user_param() {
            var result0, result1;
            var pos0, pos1;
            pos0 = pos;
            pos1 = pos;
            if (input.substr(pos, 5).toLowerCase() === "user=") {
                result0 = input.substr(pos, 5);
                pos += 5;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"user=\"");
                }
            }
            if (result0 !== null) {
                if (input.substr(pos, 5).toLowerCase() === "phone") {
                    result1 = input.substr(pos, 5);
                    pos += 5;
                } else {
                    result1 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"phone\"");
                    }
                }
                if (result1 === null) {
                    if (input.substr(pos, 2).toLowerCase() === "ip") {
                        result1 = input.substr(pos, 2);
                        pos += 2;
                    } else {
                        result1 = null;
                        if (reportFailures === 0) {
                            matchFailed("\"ip\"");
                        }
                    }
                    if (result1 === null) {
                        result1 = parse_token();
                    }
                }
                if (result1 !== null) {
                    result0 = [result0, result1];
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset, user) {
                    if (!data.uri_params) data.uri_params = {};
                    data.uri_params['user'] = user.toLowerCase();
                })(pos0, result0[1]);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_method_param() {
            var result0, result1;
            var pos0, pos1;
            pos0 = pos;
            pos1 = pos;
            if (input.substr(pos, 7).toLowerCase() === "method=") {
                result0 = input.substr(pos, 7);
                pos += 7;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"method=\"");
                }
            }
            if (result0 !== null) {
                result1 = parse_Method();
                if (result1 !== null) {
                    result0 = [result0, result1];
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset, method) {
                    if (!data.uri_params) data.uri_params = {};
                    data.uri_params['method'] = method;
                })(pos0, result0[1]);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_ttl_param() {
            var result0, result1;
            var pos0, pos1;
            pos0 = pos;
            pos1 = pos;
            if (input.substr(pos, 4).toLowerCase() === "ttl=") {
                result0 = input.substr(pos, 4);
                pos += 4;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"ttl=\"");
                }
            }
            if (result0 !== null) {
                result1 = parse_ttl();
                if (result1 !== null) {
                    result0 = [result0, result1];
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset, ttl) {
                    if (!data.params) data.params = {};
                    data.params['ttl'] = ttl;
                })(pos0, result0[1]);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_maddr_param() {
            var result0, result1;
            var pos0, pos1;
            pos0 = pos;
            pos1 = pos;
            if (input.substr(pos, 6).toLowerCase() === "maddr=") {
                result0 = input.substr(pos, 6);
                pos += 6;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"maddr=\"");
                }
            }
            if (result0 !== null) {
                result1 = parse_host();
                if (result1 !== null) {
                    result0 = [result0, result1];
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset, maddr) {
                    if (!data.uri_params) data.uri_params = {};
                    data.uri_params['maddr'] = maddr;
                })(pos0, result0[1]);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_lr_param() {
            var result0, result1, result2;
            var pos0, pos1, pos2;
            pos0 = pos;
            pos1 = pos;
            if (input.substr(pos, 2).toLowerCase() === "lr") {
                result0 = input.substr(pos, 2);
                pos += 2;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"lr\"");
                }
            }
            if (result0 !== null) {
                pos2 = pos;
                if (input.charCodeAt(pos) === 61) {
                    result1 = "=";
                    pos++;
                } else {
                    result1 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"=\"");
                    }
                }
                if (result1 !== null) {
                    result2 = parse_token();
                    if (result2 !== null) {
                        result1 = [result1, result2];
                    } else {
                        result1 = null;
                        pos = pos2;
                    }
                } else {
                    result1 = null;
                    pos = pos2;
                }
                result1 = result1 !== null ? result1 : "";
                if (result1 !== null) {
                    result0 = [result0, result1];
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset) {
                    if (!data.uri_params) data.uri_params = {};
                    data.uri_params['lr'] = undefined;
                })(pos0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_other_param() {
            var result0, result1, result2;
            var pos0, pos1, pos2;
            pos0 = pos;
            pos1 = pos;
            result0 = parse_pname();
            if (result0 !== null) {
                pos2 = pos;
                if (input.charCodeAt(pos) === 61) {
                    result1 = "=";
                    pos++;
                } else {
                    result1 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"=\"");
                    }
                }
                if (result1 !== null) {
                    result2 = parse_pvalue();
                    if (result2 !== null) {
                        result1 = [result1, result2];
                    } else {
                        result1 = null;
                        pos = pos2;
                    }
                } else {
                    result1 = null;
                    pos = pos2;
                }
                result1 = result1 !== null ? result1 : "";
                if (result1 !== null) {
                    result0 = [result0, result1];
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset, param, value) {
                    if (!data.uri_params) data.uri_params = {};
                    if (typeof value === 'undefined') {
                        value = undefined;
                    } else {
                        value = value[1];
                    }
                    data.uri_params[param.toLowerCase()] = value;
                })(pos0, result0[0], result0[1]);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_pname() {
            var result0, result1;
            var pos0;
            pos0 = pos;
            result1 = parse_paramchar();
            if (result1 !== null) {
                result0 = [];
                while (result1 !== null) {
                    result0.push(result1);
                    result1 = parse_paramchar();
                }
            } else {
                result0 = null;
            }
            if (result0 !== null) {
                result0 = (function (offset, pname) {
                    return pname.join('');
                })(pos0, result0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_pvalue() {
            var result0, result1;
            var pos0;
            pos0 = pos;
            result1 = parse_paramchar();
            if (result1 !== null) {
                result0 = [];
                while (result1 !== null) {
                    result0.push(result1);
                    result1 = parse_paramchar();
                }
            } else {
                result0 = null;
            }
            if (result0 !== null) {
                result0 = (function (offset, pvalue) {
                    return pvalue.join('');
                })(pos0, result0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_paramchar() {
            var result0;
            result0 = parse_param_unreserved();
            if (result0 === null) {
                result0 = parse_unreserved();
                if (result0 === null) {
                    result0 = parse_escaped();
                }
            }
            return result0;
        }

        function parse_param_unreserved() {
            var result0;
            if (input.charCodeAt(pos) === 91) {
                result0 = "[";
                pos++;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"[\"");
                }
            }
            if (result0 === null) {
                if (input.charCodeAt(pos) === 93) {
                    result0 = "]";
                    pos++;
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"]\"");
                    }
                }
                if (result0 === null) {
                    if (input.charCodeAt(pos) === 47) {
                        result0 = "/";
                        pos++;
                    } else {
                        result0 = null;
                        if (reportFailures === 0) {
                            matchFailed("\"/\"");
                        }
                    }
                    if (result0 === null) {
                        if (input.charCodeAt(pos) === 58) {
                            result0 = ":";
                            pos++;
                        } else {
                            result0 = null;
                            if (reportFailures === 0) {
                                matchFailed("\":\"");
                            }
                        }
                        if (result0 === null) {
                            if (input.charCodeAt(pos) === 38) {
                                result0 = "&";
                                pos++;
                            } else {
                                result0 = null;
                                if (reportFailures === 0) {
                                    matchFailed("\"&\"");
                                }
                            }
                            if (result0 === null) {
                                if (input.charCodeAt(pos) === 43) {
                                    result0 = "+";
                                    pos++;
                                } else {
                                    result0 = null;
                                    if (reportFailures === 0) {
                                        matchFailed("\"+\"");
                                    }
                                }
                                if (result0 === null) {
                                    if (input.charCodeAt(pos) === 36) {
                                        result0 = "$";
                                        pos++;
                                    } else {
                                        result0 = null;
                                        if (reportFailures === 0) {
                                            matchFailed("\"$\"");
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return result0;
        }

        function parse_headers() {
            var result0, result1, result2, result3, result4;
            var pos0, pos1;
            pos0 = pos;
            if (input.charCodeAt(pos) === 63) {
                result0 = "?";
                pos++;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"?\"");
                }
            }
            if (result0 !== null) {
                result1 = parse_header();
                if (result1 !== null) {
                    result2 = [];
                    pos1 = pos;
                    if (input.charCodeAt(pos) === 38) {
                        result3 = "&";
                        pos++;
                    } else {
                        result3 = null;
                        if (reportFailures === 0) {
                            matchFailed("\"&\"");
                        }
                    }
                    if (result3 !== null) {
                        result4 = parse_header();
                        if (result4 !== null) {
                            result3 = [result3, result4];
                        } else {
                            result3 = null;
                            pos = pos1;
                        }
                    } else {
                        result3 = null;
                        pos = pos1;
                    }
                    while (result3 !== null) {
                        result2.push(result3);
                        pos1 = pos;
                        if (input.charCodeAt(pos) === 38) {
                            result3 = "&";
                            pos++;
                        } else {
                            result3 = null;
                            if (reportFailures === 0) {
                                matchFailed("\"&\"");
                            }
                        }
                        if (result3 !== null) {
                            result4 = parse_header();
                            if (result4 !== null) {
                                result3 = [result3, result4];
                            } else {
                                result3 = null;
                                pos = pos1;
                            }
                        } else {
                            result3 = null;
                            pos = pos1;
                        }
                    }
                    if (result2 !== null) {
                        result0 = [result0, result1, result2];
                    } else {
                        result0 = null;
                        pos = pos0;
                    }
                } else {
                    result0 = null;
                    pos = pos0;
                }
            } else {
                result0 = null;
                pos = pos0;
            }
            return result0;
        }

        function parse_header() {
            var result0, result1, result2;
            var pos0, pos1;
            pos0 = pos;
            pos1 = pos;
            result0 = parse_hname();
            if (result0 !== null) {
                if (input.charCodeAt(pos) === 61) {
                    result1 = "=";
                    pos++;
                } else {
                    result1 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"=\"");
                    }
                }
                if (result1 !== null) {
                    result2 = parse_hvalue();
                    if (result2 !== null) {
                        result0 = [result0, result1, result2];
                    } else {
                        result0 = null;
                        pos = pos1;
                    }
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset, hname, hvalue) {
                    hname = hname.join('').toLowerCase();
                    hvalue = hvalue.join('');
                    if (!data.uri_headers) data.uri_headers = {};
                    if (!data.uri_headers[hname]) {
                        data.uri_headers[hname] = [hvalue];
                    } else {
                        data.uri_headers[hname].push(hvalue);
                    }
                })(pos0, result0[0], result0[2]);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_hname() {
            var result0, result1;
            result1 = parse_hnv_unreserved();
            if (result1 === null) {
                result1 = parse_unreserved();
                if (result1 === null) {
                    result1 = parse_escaped();
                }
            }
            if (result1 !== null) {
                result0 = [];
                while (result1 !== null) {
                    result0.push(result1);
                    result1 = parse_hnv_unreserved();
                    if (result1 === null) {
                        result1 = parse_unreserved();
                        if (result1 === null) {
                            result1 = parse_escaped();
                        }
                    }
                }
            } else {
                result0 = null;
            }
            return result0;
        }

        function parse_hvalue() {
            var result0, result1;
            result0 = [];
            result1 = parse_hnv_unreserved();
            if (result1 === null) {
                result1 = parse_unreserved();
                if (result1 === null) {
                    result1 = parse_escaped();
                }
            }
            while (result1 !== null) {
                result0.push(result1);
                result1 = parse_hnv_unreserved();
                if (result1 === null) {
                    result1 = parse_unreserved();
                    if (result1 === null) {
                        result1 = parse_escaped();
                    }
                }
            }
            return result0;
        }

        function parse_hnv_unreserved() {
            var result0;
            if (input.charCodeAt(pos) === 91) {
                result0 = "[";
                pos++;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"[\"");
                }
            }
            if (result0 === null) {
                if (input.charCodeAt(pos) === 93) {
                    result0 = "]";
                    pos++;
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"]\"");
                    }
                }
                if (result0 === null) {
                    if (input.charCodeAt(pos) === 47) {
                        result0 = "/";
                        pos++;
                    } else {
                        result0 = null;
                        if (reportFailures === 0) {
                            matchFailed("\"/\"");
                        }
                    }
                    if (result0 === null) {
                        if (input.charCodeAt(pos) === 63) {
                            result0 = "?";
                            pos++;
                        } else {
                            result0 = null;
                            if (reportFailures === 0) {
                                matchFailed("\"?\"");
                            }
                        }
                        if (result0 === null) {
                            if (input.charCodeAt(pos) === 58) {
                                result0 = ":";
                                pos++;
                            } else {
                                result0 = null;
                                if (reportFailures === 0) {
                                    matchFailed("\":\"");
                                }
                            }
                            if (result0 === null) {
                                if (input.charCodeAt(pos) === 43) {
                                    result0 = "+";
                                    pos++;
                                } else {
                                    result0 = null;
                                    if (reportFailures === 0) {
                                        matchFailed("\"+\"");
                                    }
                                }
                                if (result0 === null) {
                                    if (input.charCodeAt(pos) === 36) {
                                        result0 = "$";
                                        pos++;
                                    } else {
                                        result0 = null;
                                        if (reportFailures === 0) {
                                            matchFailed("\"$\"");
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return result0;
        }

        function parse_Request_Response() {
            var result0;
            result0 = parse_Status_Line();
            if (result0 === null) {
                result0 = parse_Request_Line();
            }
            return result0;
        }

        function parse_Request_Line() {
            var result0, result1, result2, result3, result4;
            var pos0;
            pos0 = pos;
            result0 = parse_Method();
            if (result0 !== null) {
                result1 = parse_SP();
                if (result1 !== null) {
                    result2 = parse_Request_URI();
                    if (result2 !== null) {
                        result3 = parse_SP();
                        if (result3 !== null) {
                            result4 = parse_SIP_Version();
                            if (result4 !== null) {
                                result0 = [result0, result1, result2, result3, result4];
                            } else {
                                result0 = null;
                                pos = pos0;
                            }
                        } else {
                            result0 = null;
                            pos = pos0;
                        }
                    } else {
                        result0 = null;
                        pos = pos0;
                    }
                } else {
                    result0 = null;
                    pos = pos0;
                }
            } else {
                result0 = null;
                pos = pos0;
            }
            return result0;
        }

        function parse_Request_URI() {
            var result0;
            result0 = parse_SIP_URI();
            if (result0 === null) {
                result0 = parse_absoluteURI();
            }
            return result0;
        }

        function parse_absoluteURI() {
            var result0, result1, result2;
            var pos0;
            pos0 = pos;
            result0 = parse_scheme();
            if (result0 !== null) {
                if (input.charCodeAt(pos) === 58) {
                    result1 = ":";
                    pos++;
                } else {
                    result1 = null;
                    if (reportFailures === 0) {
                        matchFailed("\":\"");
                    }
                }
                if (result1 !== null) {
                    result2 = parse_hier_part();
                    if (result2 === null) {
                        result2 = parse_opaque_part();
                    }
                    if (result2 !== null) {
                        result0 = [result0, result1, result2];
                    } else {
                        result0 = null;
                        pos = pos0;
                    }
                } else {
                    result0 = null;
                    pos = pos0;
                }
            } else {
                result0 = null;
                pos = pos0;
            }
            return result0;
        }

        function parse_hier_part() {
            var result0, result1, result2;
            var pos0, pos1;
            pos0 = pos;
            result0 = parse_net_path();
            if (result0 === null) {
                result0 = parse_abs_path();
            }
            if (result0 !== null) {
                pos1 = pos;
                if (input.charCodeAt(pos) === 63) {
                    result1 = "?";
                    pos++;
                } else {
                    result1 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"?\"");
                    }
                }
                if (result1 !== null) {
                    result2 = parse_query();
                    if (result2 !== null) {
                        result1 = [result1, result2];
                    } else {
                        result1 = null;
                        pos = pos1;
                    }
                } else {
                    result1 = null;
                    pos = pos1;
                }
                result1 = result1 !== null ? result1 : "";
                if (result1 !== null) {
                    result0 = [result0, result1];
                } else {
                    result0 = null;
                    pos = pos0;
                }
            } else {
                result0 = null;
                pos = pos0;
            }
            return result0;
        }

        function parse_net_path() {
            var result0, result1, result2;
            var pos0;
            pos0 = pos;
            if (input.substr(pos, 2) === "//") {
                result0 = "//";
                pos += 2;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"//\"");
                }
            }
            if (result0 !== null) {
                result1 = parse_authority();
                if (result1 !== null) {
                    result2 = parse_abs_path();
                    result2 = result2 !== null ? result2 : "";
                    if (result2 !== null) {
                        result0 = [result0, result1, result2];
                    } else {
                        result0 = null;
                        pos = pos0;
                    }
                } else {
                    result0 = null;
                    pos = pos0;
                }
            } else {
                result0 = null;
                pos = pos0;
            }
            return result0;
        }

        function parse_abs_path() {
            var result0, result1;
            var pos0;
            pos0 = pos;
            if (input.charCodeAt(pos) === 47) {
                result0 = "/";
                pos++;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"/\"");
                }
            }
            if (result0 !== null) {
                result1 = parse_path_segments();
                if (result1 !== null) {
                    result0 = [result0, result1];
                } else {
                    result0 = null;
                    pos = pos0;
                }
            } else {
                result0 = null;
                pos = pos0;
            }
            return result0;
        }

        function parse_opaque_part() {
            var result0, result1, result2;
            var pos0;
            pos0 = pos;
            result0 = parse_uric_no_slash();
            if (result0 !== null) {
                result1 = [];
                result2 = parse_uric();
                while (result2 !== null) {
                    result1.push(result2);
                    result2 = parse_uric();
                }
                if (result1 !== null) {
                    result0 = [result0, result1];
                } else {
                    result0 = null;
                    pos = pos0;
                }
            } else {
                result0 = null;
                pos = pos0;
            }
            return result0;
        }

        function parse_uric() {
            var result0;
            result0 = parse_reserved();
            if (result0 === null) {
                result0 = parse_unreserved();
                if (result0 === null) {
                    result0 = parse_escaped();
                }
            }
            return result0;
        }

        function parse_uric_no_slash() {
            var result0;
            result0 = parse_unreserved();
            if (result0 === null) {
                result0 = parse_escaped();
                if (result0 === null) {
                    if (input.charCodeAt(pos) === 59) {
                        result0 = ";";
                        pos++;
                    } else {
                        result0 = null;
                        if (reportFailures === 0) {
                            matchFailed("\";\"");
                        }
                    }
                    if (result0 === null) {
                        if (input.charCodeAt(pos) === 63) {
                            result0 = "?";
                            pos++;
                        } else {
                            result0 = null;
                            if (reportFailures === 0) {
                                matchFailed("\"?\"");
                            }
                        }
                        if (result0 === null) {
                            if (input.charCodeAt(pos) === 58) {
                                result0 = ":";
                                pos++;
                            } else {
                                result0 = null;
                                if (reportFailures === 0) {
                                    matchFailed("\":\"");
                                }
                            }
                            if (result0 === null) {
                                if (input.charCodeAt(pos) === 64) {
                                    result0 = "@";
                                    pos++;
                                } else {
                                    result0 = null;
                                    if (reportFailures === 0) {
                                        matchFailed("\"@\"");
                                    }
                                }
                                if (result0 === null) {
                                    if (input.charCodeAt(pos) === 38) {
                                        result0 = "&";
                                        pos++;
                                    } else {
                                        result0 = null;
                                        if (reportFailures === 0) {
                                            matchFailed("\"&\"");
                                        }
                                    }
                                    if (result0 === null) {
                                        if (input.charCodeAt(pos) === 61) {
                                            result0 = "=";
                                            pos++;
                                        } else {
                                            result0 = null;
                                            if (reportFailures === 0) {
                                                matchFailed("\"=\"");
                                            }
                                        }
                                        if (result0 === null) {
                                            if (input.charCodeAt(pos) === 43) {
                                                result0 = "+";
                                                pos++;
                                            } else {
                                                result0 = null;
                                                if (reportFailures === 0) {
                                                    matchFailed("\"+\"");
                                                }
                                            }
                                            if (result0 === null) {
                                                if (input.charCodeAt(pos) === 36) {
                                                    result0 = "$";
                                                    pos++;
                                                } else {
                                                    result0 = null;
                                                    if (reportFailures === 0) {
                                                        matchFailed("\"$\"");
                                                    }
                                                }
                                                if (result0 === null) {
                                                    if (input.charCodeAt(pos) === 44) {
                                                        result0 = ",";
                                                        pos++;
                                                    } else {
                                                        result0 = null;
                                                        if (reportFailures === 0) {
                                                            matchFailed("\",\"");
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return result0;
        }

        function parse_path_segments() {
            var result0, result1, result2, result3;
            var pos0, pos1;
            pos0 = pos;
            result0 = parse_segment();
            if (result0 !== null) {
                result1 = [];
                pos1 = pos;
                if (input.charCodeAt(pos) === 47) {
                    result2 = "/";
                    pos++;
                } else {
                    result2 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"/\"");
                    }
                }
                if (result2 !== null) {
                    result3 = parse_segment();
                    if (result3 !== null) {
                        result2 = [result2, result3];
                    } else {
                        result2 = null;
                        pos = pos1;
                    }
                } else {
                    result2 = null;
                    pos = pos1;
                }
                while (result2 !== null) {
                    result1.push(result2);
                    pos1 = pos;
                    if (input.charCodeAt(pos) === 47) {
                        result2 = "/";
                        pos++;
                    } else {
                        result2 = null;
                        if (reportFailures === 0) {
                            matchFailed("\"/\"");
                        }
                    }
                    if (result2 !== null) {
                        result3 = parse_segment();
                        if (result3 !== null) {
                            result2 = [result2, result3];
                        } else {
                            result2 = null;
                            pos = pos1;
                        }
                    } else {
                        result2 = null;
                        pos = pos1;
                    }
                }
                if (result1 !== null) {
                    result0 = [result0, result1];
                } else {
                    result0 = null;
                    pos = pos0;
                }
            } else {
                result0 = null;
                pos = pos0;
            }
            return result0;
        }

        function parse_segment() {
            var result0, result1, result2, result3;
            var pos0, pos1;
            pos0 = pos;
            result0 = [];
            result1 = parse_pchar();
            while (result1 !== null) {
                result0.push(result1);
                result1 = parse_pchar();
            }
            if (result0 !== null) {
                result1 = [];
                pos1 = pos;
                if (input.charCodeAt(pos) === 59) {
                    result2 = ";";
                    pos++;
                } else {
                    result2 = null;
                    if (reportFailures === 0) {
                        matchFailed("\";\"");
                    }
                }
                if (result2 !== null) {
                    result3 = parse_param();
                    if (result3 !== null) {
                        result2 = [result2, result3];
                    } else {
                        result2 = null;
                        pos = pos1;
                    }
                } else {
                    result2 = null;
                    pos = pos1;
                }
                while (result2 !== null) {
                    result1.push(result2);
                    pos1 = pos;
                    if (input.charCodeAt(pos) === 59) {
                        result2 = ";";
                        pos++;
                    } else {
                        result2 = null;
                        if (reportFailures === 0) {
                            matchFailed("\";\"");
                        }
                    }
                    if (result2 !== null) {
                        result3 = parse_param();
                        if (result3 !== null) {
                            result2 = [result2, result3];
                        } else {
                            result2 = null;
                            pos = pos1;
                        }
                    } else {
                        result2 = null;
                        pos = pos1;
                    }
                }
                if (result1 !== null) {
                    result0 = [result0, result1];
                } else {
                    result0 = null;
                    pos = pos0;
                }
            } else {
                result0 = null;
                pos = pos0;
            }
            return result0;
        }

        function parse_param() {
            var result0, result1;
            result0 = [];
            result1 = parse_pchar();
            while (result1 !== null) {
                result0.push(result1);
                result1 = parse_pchar();
            }
            return result0;
        }

        function parse_pchar() {
            var result0;
            result0 = parse_unreserved();
            if (result0 === null) {
                result0 = parse_escaped();
                if (result0 === null) {
                    if (input.charCodeAt(pos) === 58) {
                        result0 = ":";
                        pos++;
                    } else {
                        result0 = null;
                        if (reportFailures === 0) {
                            matchFailed("\":\"");
                        }
                    }
                    if (result0 === null) {
                        if (input.charCodeAt(pos) === 64) {
                            result0 = "@";
                            pos++;
                        } else {
                            result0 = null;
                            if (reportFailures === 0) {
                                matchFailed("\"@\"");
                            }
                        }
                        if (result0 === null) {
                            if (input.charCodeAt(pos) === 38) {
                                result0 = "&";
                                pos++;
                            } else {
                                result0 = null;
                                if (reportFailures === 0) {
                                    matchFailed("\"&\"");
                                }
                            }
                            if (result0 === null) {
                                if (input.charCodeAt(pos) === 61) {
                                    result0 = "=";
                                    pos++;
                                } else {
                                    result0 = null;
                                    if (reportFailures === 0) {
                                        matchFailed("\"=\"");
                                    }
                                }
                                if (result0 === null) {
                                    if (input.charCodeAt(pos) === 43) {
                                        result0 = "+";
                                        pos++;
                                    } else {
                                        result0 = null;
                                        if (reportFailures === 0) {
                                            matchFailed("\"+\"");
                                        }
                                    }
                                    if (result0 === null) {
                                        if (input.charCodeAt(pos) === 36) {
                                            result0 = "$";
                                            pos++;
                                        } else {
                                            result0 = null;
                                            if (reportFailures === 0) {
                                                matchFailed("\"$\"");
                                            }
                                        }
                                        if (result0 === null) {
                                            if (input.charCodeAt(pos) === 44) {
                                                result0 = ",";
                                                pos++;
                                            } else {
                                                result0 = null;
                                                if (reportFailures === 0) {
                                                    matchFailed("\",\"");
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return result0;
        }

        function parse_scheme() {
            var result0, result1, result2;
            var pos0, pos1;
            pos0 = pos;
            pos1 = pos;
            result0 = parse_ALPHA();
            if (result0 !== null) {
                result1 = [];
                result2 = parse_ALPHA();
                if (result2 === null) {
                    result2 = parse_DIGIT();
                    if (result2 === null) {
                        if (input.charCodeAt(pos) === 43) {
                            result2 = "+";
                            pos++;
                        } else {
                            result2 = null;
                            if (reportFailures === 0) {
                                matchFailed("\"+\"");
                            }
                        }
                        if (result2 === null) {
                            if (input.charCodeAt(pos) === 45) {
                                result2 = "-";
                                pos++;
                            } else {
                                result2 = null;
                                if (reportFailures === 0) {
                                    matchFailed("\"-\"");
                                }
                            }
                            if (result2 === null) {
                                if (input.charCodeAt(pos) === 46) {
                                    result2 = ".";
                                    pos++;
                                } else {
                                    result2 = null;
                                    if (reportFailures === 0) {
                                        matchFailed("\".\"");
                                    }
                                }
                            }
                        }
                    }
                }
                while (result2 !== null) {
                    result1.push(result2);
                    result2 = parse_ALPHA();
                    if (result2 === null) {
                        result2 = parse_DIGIT();
                        if (result2 === null) {
                            if (input.charCodeAt(pos) === 43) {
                                result2 = "+";
                                pos++;
                            } else {
                                result2 = null;
                                if (reportFailures === 0) {
                                    matchFailed("\"+\"");
                                }
                            }
                            if (result2 === null) {
                                if (input.charCodeAt(pos) === 45) {
                                    result2 = "-";
                                    pos++;
                                } else {
                                    result2 = null;
                                    if (reportFailures === 0) {
                                        matchFailed("\"-\"");
                                    }
                                }
                                if (result2 === null) {
                                    if (input.charCodeAt(pos) === 46) {
                                        result2 = ".";
                                        pos++;
                                    } else {
                                        result2 = null;
                                        if (reportFailures === 0) {
                                            matchFailed("\".\"");
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                if (result1 !== null) {
                    result0 = [result0, result1];
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset) {
                    data.scheme = input.substring(pos, offset);
                })(pos0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_authority() {
            var result0;
            result0 = parse_srvr();
            if (result0 === null) {
                result0 = parse_reg_name();
            }
            return result0;
        }

        function parse_srvr() {
            var result0, result1;
            var pos0, pos1;
            pos0 = pos;
            pos1 = pos;
            result0 = parse_userinfo();
            if (result0 !== null) {
                if (input.charCodeAt(pos) === 64) {
                    result1 = "@";
                    pos++;
                } else {
                    result1 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"@\"");
                    }
                }
                if (result1 !== null) {
                    result0 = [result0, result1];
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            result0 = result0 !== null ? result0 : "";
            if (result0 !== null) {
                result1 = parse_hostport();
                if (result1 !== null) {
                    result0 = [result0, result1];
                } else {
                    result0 = null;
                    pos = pos0;
                }
            } else {
                result0 = null;
                pos = pos0;
            }
            result0 = result0 !== null ? result0 : "";
            return result0;
        }

        function parse_reg_name() {
            var result0, result1;
            result1 = parse_unreserved();
            if (result1 === null) {
                result1 = parse_escaped();
                if (result1 === null) {
                    if (input.charCodeAt(pos) === 36) {
                        result1 = "$";
                        pos++;
                    } else {
                        result1 = null;
                        if (reportFailures === 0) {
                            matchFailed("\"$\"");
                        }
                    }
                    if (result1 === null) {
                        if (input.charCodeAt(pos) === 44) {
                            result1 = ",";
                            pos++;
                        } else {
                            result1 = null;
                            if (reportFailures === 0) {
                                matchFailed("\",\"");
                            }
                        }
                        if (result1 === null) {
                            if (input.charCodeAt(pos) === 59) {
                                result1 = ";";
                                pos++;
                            } else {
                                result1 = null;
                                if (reportFailures === 0) {
                                    matchFailed("\";\"");
                                }
                            }
                            if (result1 === null) {
                                if (input.charCodeAt(pos) === 58) {
                                    result1 = ":";
                                    pos++;
                                } else {
                                    result1 = null;
                                    if (reportFailures === 0) {
                                        matchFailed("\":\"");
                                    }
                                }
                                if (result1 === null) {
                                    if (input.charCodeAt(pos) === 64) {
                                        result1 = "@";
                                        pos++;
                                    } else {
                                        result1 = null;
                                        if (reportFailures === 0) {
                                            matchFailed("\"@\"");
                                        }
                                    }
                                    if (result1 === null) {
                                        if (input.charCodeAt(pos) === 38) {
                                            result1 = "&";
                                            pos++;
                                        } else {
                                            result1 = null;
                                            if (reportFailures === 0) {
                                                matchFailed("\"&\"");
                                            }
                                        }
                                        if (result1 === null) {
                                            if (input.charCodeAt(pos) === 61) {
                                                result1 = "=";
                                                pos++;
                                            } else {
                                                result1 = null;
                                                if (reportFailures === 0) {
                                                    matchFailed("\"=\"");
                                                }
                                            }
                                            if (result1 === null) {
                                                if (input.charCodeAt(pos) === 43) {
                                                    result1 = "+";
                                                    pos++;
                                                } else {
                                                    result1 = null;
                                                    if (reportFailures === 0) {
                                                        matchFailed("\"+\"");
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (result1 !== null) {
                result0 = [];
                while (result1 !== null) {
                    result0.push(result1);
                    result1 = parse_unreserved();
                    if (result1 === null) {
                        result1 = parse_escaped();
                        if (result1 === null) {
                            if (input.charCodeAt(pos) === 36) {
                                result1 = "$";
                                pos++;
                            } else {
                                result1 = null;
                                if (reportFailures === 0) {
                                    matchFailed("\"$\"");
                                }
                            }
                            if (result1 === null) {
                                if (input.charCodeAt(pos) === 44) {
                                    result1 = ",";
                                    pos++;
                                } else {
                                    result1 = null;
                                    if (reportFailures === 0) {
                                        matchFailed("\",\"");
                                    }
                                }
                                if (result1 === null) {
                                    if (input.charCodeAt(pos) === 59) {
                                        result1 = ";";
                                        pos++;
                                    } else {
                                        result1 = null;
                                        if (reportFailures === 0) {
                                            matchFailed("\";\"");
                                        }
                                    }
                                    if (result1 === null) {
                                        if (input.charCodeAt(pos) === 58) {
                                            result1 = ":";
                                            pos++;
                                        } else {
                                            result1 = null;
                                            if (reportFailures === 0) {
                                                matchFailed("\":\"");
                                            }
                                        }
                                        if (result1 === null) {
                                            if (input.charCodeAt(pos) === 64) {
                                                result1 = "@";
                                                pos++;
                                            } else {
                                                result1 = null;
                                                if (reportFailures === 0) {
                                                    matchFailed("\"@\"");
                                                }
                                            }
                                            if (result1 === null) {
                                                if (input.charCodeAt(pos) === 38) {
                                                    result1 = "&";
                                                    pos++;
                                                } else {
                                                    result1 = null;
                                                    if (reportFailures === 0) {
                                                        matchFailed("\"&\"");
                                                    }
                                                }
                                                if (result1 === null) {
                                                    if (input.charCodeAt(pos) === 61) {
                                                        result1 = "=";
                                                        pos++;
                                                    } else {
                                                        result1 = null;
                                                        if (reportFailures === 0) {
                                                            matchFailed("\"=\"");
                                                        }
                                                    }
                                                    if (result1 === null) {
                                                        if (input.charCodeAt(pos) === 43) {
                                                            result1 = "+";
                                                            pos++;
                                                        } else {
                                                            result1 = null;
                                                            if (reportFailures === 0) {
                                                                matchFailed("\"+\"");
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                result0 = null;
            }
            return result0;
        }

        function parse_query() {
            var result0, result1;
            result0 = [];
            result1 = parse_uric();
            while (result1 !== null) {
                result0.push(result1);
                result1 = parse_uric();
            }
            return result0;
        }

        function parse_SIP_Version() {
            var result0, result1, result2, result3, result4, result5;
            var pos0, pos1;
            pos0 = pos;
            pos1 = pos;
            if (input.substr(pos, 3).toLowerCase() === "sip") {
                result0 = input.substr(pos, 3);
                pos += 3;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"SIP\"");
                }
            }
            if (result0 !== null) {
                if (input.charCodeAt(pos) === 47) {
                    result1 = "/";
                    pos++;
                } else {
                    result1 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"/\"");
                    }
                }
                if (result1 !== null) {
                    result3 = parse_DIGIT();
                    if (result3 !== null) {
                        result2 = [];
                        while (result3 !== null) {
                            result2.push(result3);
                            result3 = parse_DIGIT();
                        }
                    } else {
                        result2 = null;
                    }
                    if (result2 !== null) {
                        if (input.charCodeAt(pos) === 46) {
                            result3 = ".";
                            pos++;
                        } else {
                            result3 = null;
                            if (reportFailures === 0) {
                                matchFailed("\".\"");
                            }
                        }
                        if (result3 !== null) {
                            result5 = parse_DIGIT();
                            if (result5 !== null) {
                                result4 = [];
                                while (result5 !== null) {
                                    result4.push(result5);
                                    result5 = parse_DIGIT();
                                }
                            } else {
                                result4 = null;
                            }
                            if (result4 !== null) {
                                result0 = [result0, result1, result2, result3, result4];
                            } else {
                                result0 = null;
                                pos = pos1;
                            }
                        } else {
                            result0 = null;
                            pos = pos1;
                        }
                    } else {
                        result0 = null;
                        pos = pos1;
                    }
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset) {
                    data.sip_version = input.substring(pos, offset);
                })(pos0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_INVITEm() {
            var result0;
            if (input.substr(pos, 6) === "INVITE") {
                result0 = "INVITE";
                pos += 6;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"INVITE\"");
                }
            }
            return result0;
        }

        function parse_ACKm() {
            var result0;
            if (input.substr(pos, 3) === "ACK") {
                result0 = "ACK";
                pos += 3;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"ACK\"");
                }
            }
            return result0;
        }

        function parse_OPTIONSm() {
            var result0;
            if (input.substr(pos, 7) === "OPTIONS") {
                result0 = "OPTIONS";
                pos += 7;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"OPTIONS\"");
                }
            }
            return result0;
        }

        function parse_BYEm() {
            var result0;
            if (input.substr(pos, 3) === "BYE") {
                result0 = "BYE";
                pos += 3;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"BYE\"");
                }
            }
            return result0;
        }

        function parse_CANCELm() {
            var result0;
            if (input.substr(pos, 6) === "CANCEL") {
                result0 = "CANCEL";
                pos += 6;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"CANCEL\"");
                }
            }
            return result0;
        }

        function parse_REGISTERm() {
            var result0;
            if (input.substr(pos, 8) === "REGISTER") {
                result0 = "REGISTER";
                pos += 8;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"REGISTER\"");
                }
            }
            return result0;
        }

        function parse_SUBSCRIBEm() {
            var result0;
            if (input.substr(pos, 9) === "SUBSCRIBE") {
                result0 = "SUBSCRIBE";
                pos += 9;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"SUBSCRIBE\"");
                }
            }
            return result0;
        }

        function parse_NOTIFYm() {
            var result0;
            if (input.substr(pos, 6) === "NOTIFY") {
                result0 = "NOTIFY";
                pos += 6;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"NOTIFY\"");
                }
            }
            return result0;
        }

        function parse_REFERm() {
            var result0;
            if (input.substr(pos, 5) === "REFER") {
                result0 = "REFER";
                pos += 5;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"REFER\"");
                }
            }
            return result0;
        }

        function parse_Method() {
            var result0;
            var pos0;
            pos0 = pos;
            result0 = parse_INVITEm();
            if (result0 === null) {
                result0 = parse_ACKm();
                if (result0 === null) {
                    result0 = parse_OPTIONSm();
                    if (result0 === null) {
                        result0 = parse_BYEm();
                        if (result0 === null) {
                            result0 = parse_CANCELm();
                            if (result0 === null) {
                                result0 = parse_REGISTERm();
                                if (result0 === null) {
                                    result0 = parse_SUBSCRIBEm();
                                    if (result0 === null) {
                                        result0 = parse_NOTIFYm();
                                        if (result0 === null) {
                                            result0 = parse_REFERm();
                                            if (result0 === null) {
                                                result0 = parse_token();
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (result0 !== null) {
                result0 = (function (offset) {
                    data.method = input.substring(pos, offset);
                    return data.method;
                })(pos0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_Status_Line() {
            var result0, result1, result2, result3, result4;
            var pos0;
            pos0 = pos;
            result0 = parse_SIP_Version();
            if (result0 !== null) {
                result1 = parse_SP();
                if (result1 !== null) {
                    result2 = parse_Status_Code();
                    if (result2 !== null) {
                        result3 = parse_SP();
                        if (result3 !== null) {
                            result4 = parse_Reason_Phrase();
                            if (result4 !== null) {
                                result0 = [result0, result1, result2, result3, result4];
                            } else {
                                result0 = null;
                                pos = pos0;
                            }
                        } else {
                            result0 = null;
                            pos = pos0;
                        }
                    } else {
                        result0 = null;
                        pos = pos0;
                    }
                } else {
                    result0 = null;
                    pos = pos0;
                }
            } else {
                result0 = null;
                pos = pos0;
            }
            return result0;
        }

        function parse_Status_Code() {
            var result0;
            var pos0;
            pos0 = pos;
            result0 = parse_extension_code();
            if (result0 !== null) {
                result0 = (function (offset, status_code) {
                    data.status_code = parseInt(status_code.join(''));
                })(pos0, result0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_extension_code() {
            var result0, result1, result2;
            var pos0;
            pos0 = pos;
            result0 = parse_DIGIT();
            if (result0 !== null) {
                result1 = parse_DIGIT();
                if (result1 !== null) {
                    result2 = parse_DIGIT();
                    if (result2 !== null) {
                        result0 = [result0, result1, result2];
                    } else {
                        result0 = null;
                        pos = pos0;
                    }
                } else {
                    result0 = null;
                    pos = pos0;
                }
            } else {
                result0 = null;
                pos = pos0;
            }
            return result0;
        }

        function parse_Reason_Phrase() {
            var result0, result1;
            var pos0;
            pos0 = pos;
            result0 = [];
            result1 = parse_reserved();
            if (result1 === null) {
                result1 = parse_unreserved();
                if (result1 === null) {
                    result1 = parse_escaped();
                    if (result1 === null) {
                        result1 = parse_UTF8_NONASCII();
                        if (result1 === null) {
                            result1 = parse_UTF8_CONT();
                            if (result1 === null) {
                                result1 = parse_SP();
                                if (result1 === null) {
                                    result1 = parse_HTAB();
                                }
                            }
                        }
                    }
                }
            }
            while (result1 !== null) {
                result0.push(result1);
                result1 = parse_reserved();
                if (result1 === null) {
                    result1 = parse_unreserved();
                    if (result1 === null) {
                        result1 = parse_escaped();
                        if (result1 === null) {
                            result1 = parse_UTF8_NONASCII();
                            if (result1 === null) {
                                result1 = parse_UTF8_CONT();
                                if (result1 === null) {
                                    result1 = parse_SP();
                                    if (result1 === null) {
                                        result1 = parse_HTAB();
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (result0 !== null) {
                result0 = (function (offset) {
                    data.reason_phrase = input.substring(pos, offset);
                })(pos0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_Allow_Events() {
            var result0, result1, result2, result3;
            var pos0, pos1;
            pos0 = pos;
            result0 = parse_event_type();
            if (result0 !== null) {
                result1 = [];
                pos1 = pos;
                result2 = parse_COMMA();
                if (result2 !== null) {
                    result3 = parse_event_type();
                    if (result3 !== null) {
                        result2 = [result2, result3];
                    } else {
                        result2 = null;
                        pos = pos1;
                    }
                } else {
                    result2 = null;
                    pos = pos1;
                }
                while (result2 !== null) {
                    result1.push(result2);
                    pos1 = pos;
                    result2 = parse_COMMA();
                    if (result2 !== null) {
                        result3 = parse_event_type();
                        if (result3 !== null) {
                            result2 = [result2, result3];
                        } else {
                            result2 = null;
                            pos = pos1;
                        }
                    } else {
                        result2 = null;
                        pos = pos1;
                    }
                }
                if (result1 !== null) {
                    result0 = [result0, result1];
                } else {
                    result0 = null;
                    pos = pos0;
                }
            } else {
                result0 = null;
                pos = pos0;
            }
            return result0;
        }

        function parse_Call_ID() {
            var result0, result1, result2;
            var pos0, pos1, pos2;
            pos0 = pos;
            pos1 = pos;
            result0 = parse_word();
            if (result0 !== null) {
                pos2 = pos;
                if (input.charCodeAt(pos) === 64) {
                    result1 = "@";
                    pos++;
                } else {
                    result1 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"@\"");
                    }
                }
                if (result1 !== null) {
                    result2 = parse_word();
                    if (result2 !== null) {
                        result1 = [result1, result2];
                    } else {
                        result1 = null;
                        pos = pos2;
                    }
                } else {
                    result1 = null;
                    pos = pos2;
                }
                result1 = result1 !== null ? result1 : "";
                if (result1 !== null) {
                    result0 = [result0, result1];
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset) {
                    data = input.substring(pos, offset);
                })(pos0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_Contact() {
            var result0, result1, result2, result3;
            var pos0, pos1, pos2;
            pos0 = pos;
            result0 = parse_STAR();
            if (result0 === null) {
                pos1 = pos;
                result0 = parse_contact_param();
                if (result0 !== null) {
                    result1 = [];
                    pos2 = pos;
                    result2 = parse_COMMA();
                    if (result2 !== null) {
                        result3 = parse_contact_param();
                        if (result3 !== null) {
                            result2 = [result2, result3];
                        } else {
                            result2 = null;
                            pos = pos2;
                        }
                    } else {
                        result2 = null;
                        pos = pos2;
                    }
                    while (result2 !== null) {
                        result1.push(result2);
                        pos2 = pos;
                        result2 = parse_COMMA();
                        if (result2 !== null) {
                            result3 = parse_contact_param();
                            if (result3 !== null) {
                                result2 = [result2, result3];
                            } else {
                                result2 = null;
                                pos = pos2;
                            }
                        } else {
                            result2 = null;
                            pos = pos2;
                        }
                    }
                    if (result1 !== null) {
                        result0 = [result0, result1];
                    } else {
                        result0 = null;
                        pos = pos1;
                    }
                } else {
                    result0 = null;
                    pos = pos1;
                }
            }
            if (result0 !== null) {
                result0 = (function (offset) {
                    var idx, length;
                    length = data.multi_header.length;
                    for (idx = 0; idx < length; idx++) {
                        if (data.multi_header[idx].parsed === null) {
                            data = null;
                            break;
                        }
                    }
                    if (data !== null) {
                        data = data.multi_header;
                    } else {
                        data = -1;
                    }
                })(pos0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_contact_param() {
            var result0, result1, result2, result3;
            var pos0, pos1, pos2;
            pos0 = pos;
            pos1 = pos;
            result0 = parse_SIP_URI_noparams();
            if (result0 === null) {
                result0 = parse_name_addr();
            }
            if (result0 !== null) {
                result1 = [];
                pos2 = pos;
                result2 = parse_SEMI();
                if (result2 !== null) {
                    result3 = parse_contact_params();
                    if (result3 !== null) {
                        result2 = [result2, result3];
                    } else {
                        result2 = null;
                        pos = pos2;
                    }
                } else {
                    result2 = null;
                    pos = pos2;
                }
                while (result2 !== null) {
                    result1.push(result2);
                    pos2 = pos;
                    result2 = parse_SEMI();
                    if (result2 !== null) {
                        result3 = parse_contact_params();
                        if (result3 !== null) {
                            result2 = [result2, result3];
                        } else {
                            result2 = null;
                            pos = pos2;
                        }
                    } else {
                        result2 = null;
                        pos = pos2;
                    }
                }
                if (result1 !== null) {
                    result0 = [result0, result1];
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset) {
                    var header;
                    if (!data.multi_header) data.multi_header = [];
                    try {
                        header = new NameAddrHeader(data.uri, data.display_name, data.params);
                        delete data.uri;
                        delete data.display_name;
                        delete data.params;
                    } catch (e) {
                        header = null;
                    }
                    data.multi_header.push({
                        'possition': pos,
                        'offset': offset,
                        'parsed': header
                    });
                })(pos0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_name_addr() {
            var result0, result1, result2, result3;
            var pos0;
            pos0 = pos;
            result0 = parse_display_name();
            result0 = result0 !== null ? result0 : "";
            if (result0 !== null) {
                result1 = parse_LAQUOT();
                if (result1 !== null) {
                    result2 = parse_SIP_URI();
                    if (result2 !== null) {
                        result3 = parse_RAQUOT();
                        if (result3 !== null) {
                            result0 = [result0, result1, result2, result3];
                        } else {
                            result0 = null;
                            pos = pos0;
                        }
                    } else {
                        result0 = null;
                        pos = pos0;
                    }
                } else {
                    result0 = null;
                    pos = pos0;
                }
            } else {
                result0 = null;
                pos = pos0;
            }
            return result0;
        }

        function parse_display_name() {
            var result0, result1, result2, result3;
            var pos0, pos1, pos2;
            pos0 = pos;
            pos1 = pos;
            result0 = parse_token();
            if (result0 !== null) {
                result1 = [];
                pos2 = pos;
                result2 = parse_LWS();
                if (result2 !== null) {
                    result3 = parse_token();
                    if (result3 !== null) {
                        result2 = [result2, result3];
                    } else {
                        result2 = null;
                        pos = pos2;
                    }
                } else {
                    result2 = null;
                    pos = pos2;
                }
                while (result2 !== null) {
                    result1.push(result2);
                    pos2 = pos;
                    result2 = parse_LWS();
                    if (result2 !== null) {
                        result3 = parse_token();
                        if (result3 !== null) {
                            result2 = [result2, result3];
                        } else {
                            result2 = null;
                            pos = pos2;
                        }
                    } else {
                        result2 = null;
                        pos = pos2;
                    }
                }
                if (result1 !== null) {
                    result0 = [result0, result1];
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 === null) {
                result0 = parse_quoted_string_clean();
            }
            if (result0 !== null) {
                result0 = (function (offset, display_name) {
                    if (typeof display_name === 'string') { // quoted_string_clean
                        data.display_name = display_name;
                    } else { // token ( LWS token )*
                        data.display_name = display_name[1].reduce(function (acc, cur) {
                            return acc + cur[0] + cur[1];
                        }, display_name[0]);
                    }
                })(pos0, result0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_contact_params() {
            var result0;
            result0 = parse_c_p_q();
            if (result0 === null) {
                result0 = parse_c_p_expires();
                if (result0 === null) {
                    result0 = parse_generic_param();
                }
            }
            return result0;
        }

        function parse_c_p_q() {
            var result0, result1, result2;
            var pos0, pos1;
            pos0 = pos;
            pos1 = pos;
            if (input.substr(pos, 1).toLowerCase() === "q") {
                result0 = input.substr(pos, 1);
                pos++;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"q\"");
                }
            }
            if (result0 !== null) {
                result1 = parse_EQUAL();
                if (result1 !== null) {
                    result2 = parse_qvalue();
                    if (result2 !== null) {
                        result0 = [result0, result1, result2];
                    } else {
                        result0 = null;
                        pos = pos1;
                    }
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset, q) {
                    if (!data.params) data.params = {};
                    data.params['q'] = q;
                })(pos0, result0[2]);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_c_p_expires() {
            var result0, result1, result2;
            var pos0, pos1;
            pos0 = pos;
            pos1 = pos;
            if (input.substr(pos, 7).toLowerCase() === "expires") {
                result0 = input.substr(pos, 7);
                pos += 7;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"expires\"");
                }
            }
            if (result0 !== null) {
                result1 = parse_EQUAL();
                if (result1 !== null) {
                    result2 = parse_delta_seconds();
                    if (result2 !== null) {
                        result0 = [result0, result1, result2];
                    } else {
                        result0 = null;
                        pos = pos1;
                    }
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset, expires) {
                    if (!data.params) data.params = {};
                    data.params['expires'] = expires;
                })(pos0, result0[2]);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_delta_seconds() {
            var result0, result1;
            var pos0;
            pos0 = pos;
            result1 = parse_DIGIT();
            if (result1 !== null) {
                result0 = [];
                while (result1 !== null) {
                    result0.push(result1);
                    result1 = parse_DIGIT();
                }
            } else {
                result0 = null;
            }
            if (result0 !== null) {
                result0 = (function (offset, delta_seconds) {
                    return parseInt(delta_seconds.join(''));
                })(pos0, result0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_qvalue() {
            var result0, result1, result2, result3, result4;
            var pos0, pos1, pos2;
            pos0 = pos;
            pos1 = pos;
            if (input.charCodeAt(pos) === 48) {
                result0 = "0";
                pos++;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"0\"");
                }
            }
            if (result0 !== null) {
                pos2 = pos;
                if (input.charCodeAt(pos) === 46) {
                    result1 = ".";
                    pos++;
                } else {
                    result1 = null;
                    if (reportFailures === 0) {
                        matchFailed("\".\"");
                    }
                }
                if (result1 !== null) {
                    result2 = parse_DIGIT();
                    result2 = result2 !== null ? result2 : "";
                    if (result2 !== null) {
                        result3 = parse_DIGIT();
                        result3 = result3 !== null ? result3 : "";
                        if (result3 !== null) {
                            result4 = parse_DIGIT();
                            result4 = result4 !== null ? result4 : "";
                            if (result4 !== null) {
                                result1 = [result1, result2, result3, result4];
                            } else {
                                result1 = null;
                                pos = pos2;
                            }
                        } else {
                            result1 = null;
                            pos = pos2;
                        }
                    } else {
                        result1 = null;
                        pos = pos2;
                    }
                } else {
                    result1 = null;
                    pos = pos2;
                }
                result1 = result1 !== null ? result1 : "";
                if (result1 !== null) {
                    result0 = [result0, result1];
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset) {
                    return parseFloat(input.substring(pos, offset));
                })(pos0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_generic_param() {
            var result0, result1, result2;
            var pos0, pos1, pos2;
            pos0 = pos;
            pos1 = pos;
            result0 = parse_token();
            if (result0 !== null) {
                pos2 = pos;
                result1 = parse_EQUAL();
                if (result1 !== null) {
                    result2 = parse_gen_value();
                    if (result2 !== null) {
                        result1 = [result1, result2];
                    } else {
                        result1 = null;
                        pos = pos2;
                    }
                } else {
                    result1 = null;
                    pos = pos2;
                }
                result1 = result1 !== null ? result1 : "";
                if (result1 !== null) {
                    result0 = [result0, result1];
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset, param, value) {
                    if (!data.params) data.params = {};
                    if (typeof value === 'undefined') {
                        value = undefined;
                    } else {
                        value = value[1];
                    }
                    data.params[param.toLowerCase()] = value;
                })(pos0, result0[0], result0[1]);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_gen_value() {
            var result0;
            result0 = parse_token();
            if (result0 === null) {
                result0 = parse_host();
                if (result0 === null) {
                    result0 = parse_quoted_string();
                }
            }
            return result0;
        }

        function parse_Content_Disposition() {
            var result0, result1, result2, result3;
            var pos0, pos1;
            pos0 = pos;
            result0 = parse_disp_type();
            if (result0 !== null) {
                result1 = [];
                pos1 = pos;
                result2 = parse_SEMI();
                if (result2 !== null) {
                    result3 = parse_disp_param();
                    if (result3 !== null) {
                        result2 = [result2, result3];
                    } else {
                        result2 = null;
                        pos = pos1;
                    }
                } else {
                    result2 = null;
                    pos = pos1;
                }
                while (result2 !== null) {
                    result1.push(result2);
                    pos1 = pos;
                    result2 = parse_SEMI();
                    if (result2 !== null) {
                        result3 = parse_disp_param();
                        if (result3 !== null) {
                            result2 = [result2, result3];
                        } else {
                            result2 = null;
                            pos = pos1;
                        }
                    } else {
                        result2 = null;
                        pos = pos1;
                    }
                }
                if (result1 !== null) {
                    result0 = [result0, result1];
                } else {
                    result0 = null;
                    pos = pos0;
                }
            } else {
                result0 = null;
                pos = pos0;
            }
            return result0;
        }

        function parse_disp_type() {
            var result0;
            if (input.substr(pos, 6).toLowerCase() === "render") {
                result0 = input.substr(pos, 6);
                pos += 6;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"render\"");
                }
            }
            if (result0 === null) {
                if (input.substr(pos, 7).toLowerCase() === "session") {
                    result0 = input.substr(pos, 7);
                    pos += 7;
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"session\"");
                    }
                }
                if (result0 === null) {
                    if (input.substr(pos, 4).toLowerCase() === "icon") {
                        result0 = input.substr(pos, 4);
                        pos += 4;
                    } else {
                        result0 = null;
                        if (reportFailures === 0) {
                            matchFailed("\"icon\"");
                        }
                    }
                    if (result0 === null) {
                        if (input.substr(pos, 5).toLowerCase() === "alert") {
                            result0 = input.substr(pos, 5);
                            pos += 5;
                        } else {
                            result0 = null;
                            if (reportFailures === 0) {
                                matchFailed("\"alert\"");
                            }
                        }
                        if (result0 === null) {
                            result0 = parse_token();
                        }
                    }
                }
            }
            return result0;
        }

        function parse_disp_param() {
            var result0;
            result0 = parse_handling_param();
            if (result0 === null) {
                result0 = parse_generic_param();
            }
            return result0;
        }

        function parse_handling_param() {
            var result0, result1, result2;
            var pos0;
            pos0 = pos;
            if (input.substr(pos, 8).toLowerCase() === "handling") {
                result0 = input.substr(pos, 8);
                pos += 8;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"handling\"");
                }
            }
            if (result0 !== null) {
                result1 = parse_EQUAL();
                if (result1 !== null) {
                    if (input.substr(pos, 8).toLowerCase() === "optional") {
                        result2 = input.substr(pos, 8);
                        pos += 8;
                    } else {
                        result2 = null;
                        if (reportFailures === 0) {
                            matchFailed("\"optional\"");
                        }
                    }
                    if (result2 === null) {
                        if (input.substr(pos, 8).toLowerCase() === "required") {
                            result2 = input.substr(pos, 8);
                            pos += 8;
                        } else {
                            result2 = null;
                            if (reportFailures === 0) {
                                matchFailed("\"required\"");
                            }
                        }
                        if (result2 === null) {
                            result2 = parse_token();
                        }
                    }
                    if (result2 !== null) {
                        result0 = [result0, result1, result2];
                    } else {
                        result0 = null;
                        pos = pos0;
                    }
                } else {
                    result0 = null;
                    pos = pos0;
                }
            } else {
                result0 = null;
                pos = pos0;
            }
            return result0;
        }

        function parse_Content_Encoding() {
            var result0, result1, result2, result3;
            var pos0, pos1;
            pos0 = pos;
            result0 = parse_token();
            if (result0 !== null) {
                result1 = [];
                pos1 = pos;
                result2 = parse_COMMA();
                if (result2 !== null) {
                    result3 = parse_token();
                    if (result3 !== null) {
                        result2 = [result2, result3];
                    } else {
                        result2 = null;
                        pos = pos1;
                    }
                } else {
                    result2 = null;
                    pos = pos1;
                }
                while (result2 !== null) {
                    result1.push(result2);
                    pos1 = pos;
                    result2 = parse_COMMA();
                    if (result2 !== null) {
                        result3 = parse_token();
                        if (result3 !== null) {
                            result2 = [result2, result3];
                        } else {
                            result2 = null;
                            pos = pos1;
                        }
                    } else {
                        result2 = null;
                        pos = pos1;
                    }
                }
                if (result1 !== null) {
                    result0 = [result0, result1];
                } else {
                    result0 = null;
                    pos = pos0;
                }
            } else {
                result0 = null;
                pos = pos0;
            }
            return result0;
        }

        function parse_Content_Length() {
            var result0, result1;
            var pos0;
            pos0 = pos;
            result1 = parse_DIGIT();
            if (result1 !== null) {
                result0 = [];
                while (result1 !== null) {
                    result0.push(result1);
                    result1 = parse_DIGIT();
                }
            } else {
                result0 = null;
            }
            if (result0 !== null) {
                result0 = (function (offset, length) {
                    data = parseInt(length.join(''));
                })(pos0, result0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_Content_Type() {
            var result0;
            var pos0;
            pos0 = pos;
            result0 = parse_media_type();
            if (result0 !== null) {
                result0 = (function (offset) {
                    data = input.substring(pos, offset);
                })(pos0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_media_type() {
            var result0, result1, result2, result3, result4, result5;
            var pos0, pos1;
            pos0 = pos;
            result0 = parse_m_type();
            if (result0 !== null) {
                result1 = parse_SLASH();
                if (result1 !== null) {
                    result2 = parse_m_subtype();
                    if (result2 !== null) {
                        result3 = [];
                        pos1 = pos;
                        result4 = parse_SEMI();
                        if (result4 !== null) {
                            result5 = parse_m_parameter();
                            if (result5 !== null) {
                                result4 = [result4, result5];
                            } else {
                                result4 = null;
                                pos = pos1;
                            }
                        } else {
                            result4 = null;
                            pos = pos1;
                        }
                        while (result4 !== null) {
                            result3.push(result4);
                            pos1 = pos;
                            result4 = parse_SEMI();
                            if (result4 !== null) {
                                result5 = parse_m_parameter();
                                if (result5 !== null) {
                                    result4 = [result4, result5];
                                } else {
                                    result4 = null;
                                    pos = pos1;
                                }
                            } else {
                                result4 = null;
                                pos = pos1;
                            }
                        }
                        if (result3 !== null) {
                            result0 = [result0, result1, result2, result3];
                        } else {
                            result0 = null;
                            pos = pos0;
                        }
                    } else {
                        result0 = null;
                        pos = pos0;
                    }
                } else {
                    result0 = null;
                    pos = pos0;
                }
            } else {
                result0 = null;
                pos = pos0;
            }
            return result0;
        }

        function parse_m_type() {
            var result0;
            result0 = parse_discrete_type();
            if (result0 === null) {
                result0 = parse_composite_type();
            }
            return result0;
        }

        function parse_discrete_type() {
            var result0;
            if (input.substr(pos, 4).toLowerCase() === "text") {
                result0 = input.substr(pos, 4);
                pos += 4;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"text\"");
                }
            }
            if (result0 === null) {
                if (input.substr(pos, 5).toLowerCase() === "image") {
                    result0 = input.substr(pos, 5);
                    pos += 5;
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"image\"");
                    }
                }
                if (result0 === null) {
                    if (input.substr(pos, 5).toLowerCase() === "audio") {
                        result0 = input.substr(pos, 5);
                        pos += 5;
                    } else {
                        result0 = null;
                        if (reportFailures === 0) {
                            matchFailed("\"audio\"");
                        }
                    }
                    if (result0 === null) {
                        if (input.substr(pos, 5).toLowerCase() === "video") {
                            result0 = input.substr(pos, 5);
                            pos += 5;
                        } else {
                            result0 = null;
                            if (reportFailures === 0) {
                                matchFailed("\"video\"");
                            }
                        }
                        if (result0 === null) {
                            if (input.substr(pos, 11).toLowerCase() === "application") {
                                result0 = input.substr(pos, 11);
                                pos += 11;
                            } else {
                                result0 = null;
                                if (reportFailures === 0) {
                                    matchFailed("\"application\"");
                                }
                            }
                            if (result0 === null) {
                                result0 = parse_extension_token();
                            }
                        }
                    }
                }
            }
            return result0;
        }

        function parse_composite_type() {
            var result0;
            if (input.substr(pos, 7).toLowerCase() === "message") {
                result0 = input.substr(pos, 7);
                pos += 7;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"message\"");
                }
            }
            if (result0 === null) {
                if (input.substr(pos, 9).toLowerCase() === "multipart") {
                    result0 = input.substr(pos, 9);
                    pos += 9;
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"multipart\"");
                    }
                }
                if (result0 === null) {
                    result0 = parse_extension_token();
                }
            }
            return result0;
        }

        function parse_extension_token() {
            var result0;
            result0 = parse_token();
            if (result0 === null) {
                result0 = parse_x_token();
            }
            return result0;
        }

        function parse_x_token() {
            var result0, result1;
            var pos0;
            pos0 = pos;
            if (input.substr(pos, 2).toLowerCase() === "x-") {
                result0 = input.substr(pos, 2);
                pos += 2;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"x-\"");
                }
            }
            if (result0 !== null) {
                result1 = parse_token();
                if (result1 !== null) {
                    result0 = [result0, result1];
                } else {
                    result0 = null;
                    pos = pos0;
                }
            } else {
                result0 = null;
                pos = pos0;
            }
            return result0;
        }

        function parse_m_subtype() {
            var result0;
            result0 = parse_extension_token();
            if (result0 === null) {
                result0 = parse_token();
            }
            return result0;
        }

        function parse_m_parameter() {
            var result0, result1, result2;
            var pos0;
            pos0 = pos;
            result0 = parse_token();
            if (result0 !== null) {
                result1 = parse_EQUAL();
                if (result1 !== null) {
                    result2 = parse_m_value();
                    if (result2 !== null) {
                        result0 = [result0, result1, result2];
                    } else {
                        result0 = null;
                        pos = pos0;
                    }
                } else {
                    result0 = null;
                    pos = pos0;
                }
            } else {
                result0 = null;
                pos = pos0;
            }
            return result0;
        }

        function parse_m_value() {
            var result0;
            result0 = parse_token();
            if (result0 === null) {
                result0 = parse_quoted_string();
            }
            return result0;
        }

        function parse_CSeq() {
            var result0, result1, result2;
            var pos0;
            pos0 = pos;
            result0 = parse_CSeq_value();
            if (result0 !== null) {
                result1 = parse_LWS();
                if (result1 !== null) {
                    result2 = parse_Method();
                    if (result2 !== null) {
                        result0 = [result0, result1, result2];
                    } else {
                        result0 = null;
                        pos = pos0;
                    }
                } else {
                    result0 = null;
                    pos = pos0;
                }
            } else {
                result0 = null;
                pos = pos0;
            }
            return result0;
        }

        function parse_CSeq_value() {
            var result0, result1;
            var pos0;
            pos0 = pos;
            result1 = parse_DIGIT();
            if (result1 !== null) {
                result0 = [];
                while (result1 !== null) {
                    result0.push(result1);
                    result1 = parse_DIGIT();
                }
            } else {
                result0 = null;
            }
            if (result0 !== null) {
                result0 = (function (offset, cseq_value) {
                    data.value = parseInt(cseq_value.join(''));
                })(pos0, result0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_Expires() {
            var result0;
            var pos0;
            pos0 = pos;
            result0 = parse_delta_seconds();
            if (result0 !== null) {
                result0 = (function (offset, expires) {
                    data = expires;
                })(pos0, result0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_Event() {
            var result0, result1, result2, result3;
            var pos0, pos1, pos2;
            pos0 = pos;
            pos1 = pos;
            result0 = parse_event_type();
            if (result0 !== null) {
                result1 = [];
                pos2 = pos;
                result2 = parse_SEMI();
                if (result2 !== null) {
                    result3 = parse_generic_param();
                    if (result3 !== null) {
                        result2 = [result2, result3];
                    } else {
                        result2 = null;
                        pos = pos2;
                    }
                } else {
                    result2 = null;
                    pos = pos2;
                }
                while (result2 !== null) {
                    result1.push(result2);
                    pos2 = pos;
                    result2 = parse_SEMI();
                    if (result2 !== null) {
                        result3 = parse_generic_param();
                        if (result3 !== null) {
                            result2 = [result2, result3];
                        } else {
                            result2 = null;
                            pos = pos2;
                        }
                    } else {
                        result2 = null;
                        pos = pos2;
                    }
                }
                if (result1 !== null) {
                    result0 = [result0, result1];
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset, event_type) {
                    data.event = event_type.join('').toLowerCase();
                })(pos0, result0[0]);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_event_type() {
            var result0, result1, result2, result3;
            var pos0, pos1;
            pos0 = pos;
            result0 = parse_token_nodot();
            if (result0 !== null) {
                result1 = [];
                pos1 = pos;
                if (input.charCodeAt(pos) === 46) {
                    result2 = ".";
                    pos++;
                } else {
                    result2 = null;
                    if (reportFailures === 0) {
                        matchFailed("\".\"");
                    }
                }
                if (result2 !== null) {
                    result3 = parse_token_nodot();
                    if (result3 !== null) {
                        result2 = [result2, result3];
                    } else {
                        result2 = null;
                        pos = pos1;
                    }
                } else {
                    result2 = null;
                    pos = pos1;
                }
                while (result2 !== null) {
                    result1.push(result2);
                    pos1 = pos;
                    if (input.charCodeAt(pos) === 46) {
                        result2 = ".";
                        pos++;
                    } else {
                        result2 = null;
                        if (reportFailures === 0) {
                            matchFailed("\".\"");
                        }
                    }
                    if (result2 !== null) {
                        result3 = parse_token_nodot();
                        if (result3 !== null) {
                            result2 = [result2, result3];
                        } else {
                            result2 = null;
                            pos = pos1;
                        }
                    } else {
                        result2 = null;
                        pos = pos1;
                    }
                }
                if (result1 !== null) {
                    result0 = [result0, result1];
                } else {
                    result0 = null;
                    pos = pos0;
                }
            } else {
                result0 = null;
                pos = pos0;
            }
            return result0;
        }

        function parse_From() {
            var result0, result1, result2, result3;
            var pos0, pos1, pos2;
            pos0 = pos;
            pos1 = pos;
            result0 = parse_SIP_URI_noparams();
            if (result0 === null) {
                result0 = parse_name_addr();
            }
            if (result0 !== null) {
                result1 = [];
                pos2 = pos;
                result2 = parse_SEMI();
                if (result2 !== null) {
                    result3 = parse_from_param();
                    if (result3 !== null) {
                        result2 = [result2, result3];
                    } else {
                        result2 = null;
                        pos = pos2;
                    }
                } else {
                    result2 = null;
                    pos = pos2;
                }
                while (result2 !== null) {
                    result1.push(result2);
                    pos2 = pos;
                    result2 = parse_SEMI();
                    if (result2 !== null) {
                        result3 = parse_from_param();
                        if (result3 !== null) {
                            result2 = [result2, result3];
                        } else {
                            result2 = null;
                            pos = pos2;
                        }
                    } else {
                        result2 = null;
                        pos = pos2;
                    }
                }
                if (result1 !== null) {
                    result0 = [result0, result1];
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset) {
                    var tag = data.tag;
                    try {
                        data = new NameAddrHeader(data.uri, data.display_name, data.params);
                        if (tag) {
                            data.setParam('tag', tag)
                        }
                    } catch (e) {
                        data = -1;
                    }
                })(pos0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_from_param() {
            var result0;
            result0 = parse_tag_param();
            if (result0 === null) {
                result0 = parse_generic_param();
            }
            return result0;
        }

        function parse_tag_param() {
            var result0, result1, result2;
            var pos0, pos1;
            pos0 = pos;
            pos1 = pos;
            if (input.substr(pos, 3).toLowerCase() === "tag") {
                result0 = input.substr(pos, 3);
                pos += 3;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"tag\"");
                }
            }
            if (result0 !== null) {
                result1 = parse_EQUAL();
                if (result1 !== null) {
                    result2 = parse_token();
                    if (result2 !== null) {
                        result0 = [result0, result1, result2];
                    } else {
                        result0 = null;
                        pos = pos1;
                    }
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset, tag) {
                    data.tag = tag;
                })(pos0, result0[2]);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_Max_Forwards() {
            var result0, result1;
            var pos0;
            pos0 = pos;
            result1 = parse_DIGIT();
            if (result1 !== null) {
                result0 = [];
                while (result1 !== null) {
                    result0.push(result1);
                    result1 = parse_DIGIT();
                }
            } else {
                result0 = null;
            }
            if (result0 !== null) {
                result0 = (function (offset, forwards) {
                    data = parseInt(forwards.join(''));
                })(pos0, result0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_Min_Expires() {
            var result0;
            var pos0;
            pos0 = pos;
            result0 = parse_delta_seconds();
            if (result0 !== null) {
                result0 = (function (offset, min_expires) {
                    data = min_expires;
                })(pos0, result0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_Name_Addr_Header() {
            var result0, result1, result2, result3, result4, result5, result6;
            var pos0, pos1, pos2;
            pos0 = pos;
            pos1 = pos;
            result0 = [];
            result1 = parse_display_name();
            while (result1 !== null) {
                result0.push(result1);
                result1 = parse_display_name();
            }
            if (result0 !== null) {
                result1 = parse_LAQUOT();
                if (result1 !== null) {
                    result2 = parse_SIP_URI();
                    if (result2 !== null) {
                        result3 = parse_RAQUOT();
                        if (result3 !== null) {
                            result4 = [];
                            pos2 = pos;
                            result5 = parse_SEMI();
                            if (result5 !== null) {
                                result6 = parse_generic_param();
                                if (result6 !== null) {
                                    result5 = [result5, result6];
                                } else {
                                    result5 = null;
                                    pos = pos2;
                                }
                            } else {
                                result5 = null;
                                pos = pos2;
                            }
                            while (result5 !== null) {
                                result4.push(result5);
                                pos2 = pos;
                                result5 = parse_SEMI();
                                if (result5 !== null) {
                                    result6 = parse_generic_param();
                                    if (result6 !== null) {
                                        result5 = [result5, result6];
                                    } else {
                                        result5 = null;
                                        pos = pos2;
                                    }
                                } else {
                                    result5 = null;
                                    pos = pos2;
                                }
                            }
                            if (result4 !== null) {
                                result0 = [result0, result1, result2, result3, result4];
                            } else {
                                result0 = null;
                                pos = pos1;
                            }
                        } else {
                            result0 = null;
                            pos = pos1;
                        }
                    } else {
                        result0 = null;
                        pos = pos1;
                    }
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset) {
                    try {
                        data = new NameAddrHeader(data.uri, data.display_name, data.params);
                    } catch (e) {
                        data = -1;
                    }
                })(pos0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_Proxy_Authenticate() {
            var result0;
            result0 = parse_challenge();
            return result0;
        }

        function parse_challenge() {
            var result0, result1, result2, result3, result4, result5;
            var pos0, pos1;
            pos0 = pos;
            if (input.substr(pos, 6).toLowerCase() === "digest") {
                result0 = input.substr(pos, 6);
                pos += 6;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"Digest\"");
                }
            }
            if (result0 !== null) {
                result1 = parse_LWS();
                if (result1 !== null) {
                    result2 = parse_digest_cln();
                    if (result2 !== null) {
                        result3 = [];
                        pos1 = pos;
                        result4 = parse_COMMA();
                        if (result4 !== null) {
                            result5 = parse_digest_cln();
                            if (result5 !== null) {
                                result4 = [result4, result5];
                            } else {
                                result4 = null;
                                pos = pos1;
                            }
                        } else {
                            result4 = null;
                            pos = pos1;
                        }
                        while (result4 !== null) {
                            result3.push(result4);
                            pos1 = pos;
                            result4 = parse_COMMA();
                            if (result4 !== null) {
                                result5 = parse_digest_cln();
                                if (result5 !== null) {
                                    result4 = [result4, result5];
                                } else {
                                    result4 = null;
                                    pos = pos1;
                                }
                            } else {
                                result4 = null;
                                pos = pos1;
                            }
                        }
                        if (result3 !== null) {
                            result0 = [result0, result1, result2, result3];
                        } else {
                            result0 = null;
                            pos = pos0;
                        }
                    } else {
                        result0 = null;
                        pos = pos0;
                    }
                } else {
                    result0 = null;
                    pos = pos0;
                }
            } else {
                result0 = null;
                pos = pos0;
            }
            if (result0 === null) {
                result0 = parse_other_challenge();
            }
            return result0;
        }

        function parse_other_challenge() {
            var result0, result1, result2, result3, result4, result5;
            var pos0, pos1;
            pos0 = pos;
            result0 = parse_token();
            if (result0 !== null) {
                result1 = parse_LWS();
                if (result1 !== null) {
                    result2 = parse_auth_param();
                    if (result2 !== null) {
                        result3 = [];
                        pos1 = pos;
                        result4 = parse_COMMA();
                        if (result4 !== null) {
                            result5 = parse_auth_param();
                            if (result5 !== null) {
                                result4 = [result4, result5];
                            } else {
                                result4 = null;
                                pos = pos1;
                            }
                        } else {
                            result4 = null;
                            pos = pos1;
                        }
                        while (result4 !== null) {
                            result3.push(result4);
                            pos1 = pos;
                            result4 = parse_COMMA();
                            if (result4 !== null) {
                                result5 = parse_auth_param();
                                if (result5 !== null) {
                                    result4 = [result4, result5];
                                } else {
                                    result4 = null;
                                    pos = pos1;
                                }
                            } else {
                                result4 = null;
                                pos = pos1;
                            }
                        }
                        if (result3 !== null) {
                            result0 = [result0, result1, result2, result3];
                        } else {
                            result0 = null;
                            pos = pos0;
                        }
                    } else {
                        result0 = null;
                        pos = pos0;
                    }
                } else {
                    result0 = null;
                    pos = pos0;
                }
            } else {
                result0 = null;
                pos = pos0;
            }
            return result0;
        }

        function parse_auth_param() {
            var result0, result1, result2;
            var pos0;
            pos0 = pos;
            result0 = parse_token();
            if (result0 !== null) {
                result1 = parse_EQUAL();
                if (result1 !== null) {
                    result2 = parse_token();
                    if (result2 === null) {
                        result2 = parse_quoted_string();
                    }
                    if (result2 !== null) {
                        result0 = [result0, result1, result2];
                    } else {
                        result0 = null;
                        pos = pos0;
                    }
                } else {
                    result0 = null;
                    pos = pos0;
                }
            } else {
                result0 = null;
                pos = pos0;
            }
            return result0;
        }

        function parse_digest_cln() {
            var result0;
            result0 = parse_realm();
            if (result0 === null) {
                result0 = parse_domain();
                if (result0 === null) {
                    result0 = parse_nonce();
                    if (result0 === null) {
                        result0 = parse_opaque();
                        if (result0 === null) {
                            result0 = parse_stale();
                            if (result0 === null) {
                                result0 = parse_algorithm();
                                if (result0 === null) {
                                    result0 = parse_qop_options();
                                    if (result0 === null) {
                                        result0 = parse_auth_param();
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return result0;
        }

        function parse_realm() {
            var result0, result1, result2;
            var pos0;
            pos0 = pos;
            if (input.substr(pos, 5).toLowerCase() === "realm") {
                result0 = input.substr(pos, 5);
                pos += 5;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"realm\"");
                }
            }
            if (result0 !== null) {
                result1 = parse_EQUAL();
                if (result1 !== null) {
                    result2 = parse_realm_value();
                    if (result2 !== null) {
                        result0 = [result0, result1, result2];
                    } else {
                        result0 = null;
                        pos = pos0;
                    }
                } else {
                    result0 = null;
                    pos = pos0;
                }
            } else {
                result0 = null;
                pos = pos0;
            }
            return result0;
        }

        function parse_realm_value() {
            var result0;
            var pos0;
            pos0 = pos;
            result0 = parse_quoted_string_clean();
            if (result0 !== null) {
                result0 = (function (offset, realm) {
                    data.realm = realm;
                })(pos0, result0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_domain() {
            var result0, result1, result2, result3, result4, result5, result6;
            var pos0, pos1;
            pos0 = pos;
            if (input.substr(pos, 6).toLowerCase() === "domain") {
                result0 = input.substr(pos, 6);
                pos += 6;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"domain\"");
                }
            }
            if (result0 !== null) {
                result1 = parse_EQUAL();
                if (result1 !== null) {
                    result2 = parse_LDQUOT();
                    if (result2 !== null) {
                        result3 = parse_URI();
                        if (result3 !== null) {
                            result4 = [];
                            pos1 = pos;
                            result6 = parse_SP();
                            if (result6 !== null) {
                                result5 = [];
                                while (result6 !== null) {
                                    result5.push(result6);
                                    result6 = parse_SP();
                                }
                            } else {
                                result5 = null;
                            }
                            if (result5 !== null) {
                                result6 = parse_URI();
                                if (result6 !== null) {
                                    result5 = [result5, result6];
                                } else {
                                    result5 = null;
                                    pos = pos1;
                                }
                            } else {
                                result5 = null;
                                pos = pos1;
                            }
                            while (result5 !== null) {
                                result4.push(result5);
                                pos1 = pos;
                                result6 = parse_SP();
                                if (result6 !== null) {
                                    result5 = [];
                                    while (result6 !== null) {
                                        result5.push(result6);
                                        result6 = parse_SP();
                                    }
                                } else {
                                    result5 = null;
                                }
                                if (result5 !== null) {
                                    result6 = parse_URI();
                                    if (result6 !== null) {
                                        result5 = [result5, result6];
                                    } else {
                                        result5 = null;
                                        pos = pos1;
                                    }
                                } else {
                                    result5 = null;
                                    pos = pos1;
                                }
                            }
                            if (result4 !== null) {
                                result5 = parse_RDQUOT();
                                if (result5 !== null) {
                                    result0 = [result0, result1, result2, result3, result4, result5];
                                } else {
                                    result0 = null;
                                    pos = pos0;
                                }
                            } else {
                                result0 = null;
                                pos = pos0;
                            }
                        } else {
                            result0 = null;
                            pos = pos0;
                        }
                    } else {
                        result0 = null;
                        pos = pos0;
                    }
                } else {
                    result0 = null;
                    pos = pos0;
                }
            } else {
                result0 = null;
                pos = pos0;
            }
            return result0;
        }

        function parse_URI() {
            var result0;
            result0 = parse_absoluteURI();
            if (result0 === null) {
                result0 = parse_abs_path();
            }
            return result0;
        }

        function parse_nonce() {
            var result0, result1, result2;
            var pos0;
            pos0 = pos;
            if (input.substr(pos, 5).toLowerCase() === "nonce") {
                result0 = input.substr(pos, 5);
                pos += 5;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"nonce\"");
                }
            }
            if (result0 !== null) {
                result1 = parse_EQUAL();
                if (result1 !== null) {
                    result2 = parse_nonce_value();
                    if (result2 !== null) {
                        result0 = [result0, result1, result2];
                    } else {
                        result0 = null;
                        pos = pos0;
                    }
                } else {
                    result0 = null;
                    pos = pos0;
                }
            } else {
                result0 = null;
                pos = pos0;
            }
            return result0;
        }

        function parse_nonce_value() {
            var result0;
            var pos0;
            pos0 = pos;
            result0 = parse_quoted_string_clean();
            if (result0 !== null) {
                result0 = (function (offset, nonce) {
                    data.nonce = nonce;
                })(pos0, result0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_opaque() {
            var result0, result1, result2;
            var pos0, pos1;
            pos0 = pos;
            pos1 = pos;
            if (input.substr(pos, 6).toLowerCase() === "opaque") {
                result0 = input.substr(pos, 6);
                pos += 6;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"opaque\"");
                }
            }
            if (result0 !== null) {
                result1 = parse_EQUAL();
                if (result1 !== null) {
                    result2 = parse_quoted_string_clean();
                    if (result2 !== null) {
                        result0 = [result0, result1, result2];
                    } else {
                        result0 = null;
                        pos = pos1;
                    }
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset, opaque) {
                    data.opaque = opaque;
                })(pos0, result0[2]);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_stale() {
            var result0, result1, result2;
            var pos0, pos1;
            pos0 = pos;
            if (input.substr(pos, 5).toLowerCase() === "stale") {
                result0 = input.substr(pos, 5);
                pos += 5;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"stale\"");
                }
            }
            if (result0 !== null) {
                result1 = parse_EQUAL();
                if (result1 !== null) {
                    pos1 = pos;
                    if (input.substr(pos, 4).toLowerCase() === "true") {
                        result2 = input.substr(pos, 4);
                        pos += 4;
                    } else {
                        result2 = null;
                        if (reportFailures === 0) {
                            matchFailed("\"true\"");
                        }
                    }
                    if (result2 !== null) {
                        result2 = (function (offset) {
                            data.stale = true;
                        })(pos1);
                    }
                    if (result2 === null) {
                        pos = pos1;
                    }
                    if (result2 === null) {
                        pos1 = pos;
                        if (input.substr(pos, 5).toLowerCase() === "false") {
                            result2 = input.substr(pos, 5);
                            pos += 5;
                        } else {
                            result2 = null;
                            if (reportFailures === 0) {
                                matchFailed("\"false\"");
                            }
                        }
                        if (result2 !== null) {
                            result2 = (function (offset) {
                                data.stale = false;
                            })(pos1);
                        }
                        if (result2 === null) {
                            pos = pos1;
                        }
                    }
                    if (result2 !== null) {
                        result0 = [result0, result1, result2];
                    } else {
                        result0 = null;
                        pos = pos0;
                    }
                } else {
                    result0 = null;
                    pos = pos0;
                }
            } else {
                result0 = null;
                pos = pos0;
            }
            return result0;
        }

        function parse_algorithm() {
            var result0, result1, result2;
            var pos0, pos1;
            pos0 = pos;
            pos1 = pos;
            if (input.substr(pos, 9).toLowerCase() === "algorithm") {
                result0 = input.substr(pos, 9);
                pos += 9;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"algorithm\"");
                }
            }
            if (result0 !== null) {
                result1 = parse_EQUAL();
                if (result1 !== null) {
                    if (input.substr(pos, 3).toLowerCase() === "md5") {
                        result2 = input.substr(pos, 3);
                        pos += 3;
                    } else {
                        result2 = null;
                        if (reportFailures === 0) {
                            matchFailed("\"MD5\"");
                        }
                    }
                    if (result2 === null) {
                        if (input.substr(pos, 8).toLowerCase() === "md5-sess") {
                            result2 = input.substr(pos, 8);
                            pos += 8;
                        } else {
                            result2 = null;
                            if (reportFailures === 0) {
                                matchFailed("\"MD5-sess\"");
                            }
                        }
                        if (result2 === null) {
                            result2 = parse_token();
                        }
                    }
                    if (result2 !== null) {
                        result0 = [result0, result1, result2];
                    } else {
                        result0 = null;
                        pos = pos1;
                    }
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset, algorithm) {
                    data.algorithm = algorithm.toUpperCase();
                })(pos0, result0[2]);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_qop_options() {
            var result0, result1, result2, result3, result4, result5, result6;
            var pos0, pos1, pos2;
            pos0 = pos;
            if (input.substr(pos, 3).toLowerCase() === "qop") {
                result0 = input.substr(pos, 3);
                pos += 3;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"qop\"");
                }
            }
            if (result0 !== null) {
                result1 = parse_EQUAL();
                if (result1 !== null) {
                    result2 = parse_LDQUOT();
                    if (result2 !== null) {
                        pos1 = pos;
                        result3 = parse_qop_value();
                        if (result3 !== null) {
                            result4 = [];
                            pos2 = pos;
                            if (input.charCodeAt(pos) === 44) {
                                result5 = ",";
                                pos++;
                            } else {
                                result5 = null;
                                if (reportFailures === 0) {
                                    matchFailed("\",\"");
                                }
                            }
                            if (result5 !== null) {
                                result6 = parse_qop_value();
                                if (result6 !== null) {
                                    result5 = [result5, result6];
                                } else {
                                    result5 = null;
                                    pos = pos2;
                                }
                            } else {
                                result5 = null;
                                pos = pos2;
                            }
                            while (result5 !== null) {
                                result4.push(result5);
                                pos2 = pos;
                                if (input.charCodeAt(pos) === 44) {
                                    result5 = ",";
                                    pos++;
                                } else {
                                    result5 = null;
                                    if (reportFailures === 0) {
                                        matchFailed("\",\"");
                                    }
                                }
                                if (result5 !== null) {
                                    result6 = parse_qop_value();
                                    if (result6 !== null) {
                                        result5 = [result5, result6];
                                    } else {
                                        result5 = null;
                                        pos = pos2;
                                    }
                                } else {
                                    result5 = null;
                                    pos = pos2;
                                }
                            }
                            if (result4 !== null) {
                                result3 = [result3, result4];
                            } else {
                                result3 = null;
                                pos = pos1;
                            }
                        } else {
                            result3 = null;
                            pos = pos1;
                        }
                        if (result3 !== null) {
                            result4 = parse_RDQUOT();
                            if (result4 !== null) {
                                result0 = [result0, result1, result2, result3, result4];
                            } else {
                                result0 = null;
                                pos = pos0;
                            }
                        } else {
                            result0 = null;
                            pos = pos0;
                        }
                    } else {
                        result0 = null;
                        pos = pos0;
                    }
                } else {
                    result0 = null;
                    pos = pos0;
                }
            } else {
                result0 = null;
                pos = pos0;
            }
            return result0;
        }

        function parse_qop_value() {
            var result0;
            var pos0;
            pos0 = pos;
            if (input.substr(pos, 8).toLowerCase() === "auth-int") {
                result0 = input.substr(pos, 8);
                pos += 8;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"auth-int\"");
                }
            }
            if (result0 === null) {
                if (input.substr(pos, 4).toLowerCase() === "auth") {
                    result0 = input.substr(pos, 4);
                    pos += 4;
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"auth\"");
                    }
                }
                if (result0 === null) {
                    result0 = parse_token();
                }
            }
            if (result0 !== null) {
                result0 = (function (offset, qop_value) {
                    data.qop || (data.qop = []);
                    data.qop.push(qop_value.toLowerCase());
                })(pos0, result0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_Proxy_Require() {
            var result0, result1, result2, result3;
            var pos0, pos1;
            pos0 = pos;
            result0 = parse_token();
            if (result0 !== null) {
                result1 = [];
                pos1 = pos;
                result2 = parse_COMMA();
                if (result2 !== null) {
                    result3 = parse_token();
                    if (result3 !== null) {
                        result2 = [result2, result3];
                    } else {
                        result2 = null;
                        pos = pos1;
                    }
                } else {
                    result2 = null;
                    pos = pos1;
                }
                while (result2 !== null) {
                    result1.push(result2);
                    pos1 = pos;
                    result2 = parse_COMMA();
                    if (result2 !== null) {
                        result3 = parse_token();
                        if (result3 !== null) {
                            result2 = [result2, result3];
                        } else {
                            result2 = null;
                            pos = pos1;
                        }
                    } else {
                        result2 = null;
                        pos = pos1;
                    }
                }
                if (result1 !== null) {
                    result0 = [result0, result1];
                } else {
                    result0 = null;
                    pos = pos0;
                }
            } else {
                result0 = null;
                pos = pos0;
            }
            return result0;
        }

        function parse_Record_Route() {
            var result0, result1, result2, result3;
            var pos0, pos1, pos2;
            pos0 = pos;
            pos1 = pos;
            result0 = parse_rec_route();
            if (result0 !== null) {
                result1 = [];
                pos2 = pos;
                result2 = parse_COMMA();
                if (result2 !== null) {
                    result3 = parse_rec_route();
                    if (result3 !== null) {
                        result2 = [result2, result3];
                    } else {
                        result2 = null;
                        pos = pos2;
                    }
                } else {
                    result2 = null;
                    pos = pos2;
                }
                while (result2 !== null) {
                    result1.push(result2);
                    pos2 = pos;
                    result2 = parse_COMMA();
                    if (result2 !== null) {
                        result3 = parse_rec_route();
                        if (result3 !== null) {
                            result2 = [result2, result3];
                        } else {
                            result2 = null;
                            pos = pos2;
                        }
                    } else {
                        result2 = null;
                        pos = pos2;
                    }
                }
                if (result1 !== null) {
                    result0 = [result0, result1];
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset) {
                    var idx, length;
                    length = data.multi_header.length;
                    for (idx = 0; idx < length; idx++) {
                        if (data.multi_header[idx].parsed === null) {
                            data = null;
                            break;
                        }
                    }
                    if (data !== null) {
                        data = data.multi_header;
                    } else {
                        data = -1;
                    }
                })(pos0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_rec_route() {
            var result0, result1, result2, result3;
            var pos0, pos1, pos2;
            pos0 = pos;
            pos1 = pos;
            result0 = parse_name_addr();
            if (result0 !== null) {
                result1 = [];
                pos2 = pos;
                result2 = parse_SEMI();
                if (result2 !== null) {
                    result3 = parse_generic_param();
                    if (result3 !== null) {
                        result2 = [result2, result3];
                    } else {
                        result2 = null;
                        pos = pos2;
                    }
                } else {
                    result2 = null;
                    pos = pos2;
                }
                while (result2 !== null) {
                    result1.push(result2);
                    pos2 = pos;
                    result2 = parse_SEMI();
                    if (result2 !== null) {
                        result3 = parse_generic_param();
                        if (result3 !== null) {
                            result2 = [result2, result3];
                        } else {
                            result2 = null;
                            pos = pos2;
                        }
                    } else {
                        result2 = null;
                        pos = pos2;
                    }
                }
                if (result1 !== null) {
                    result0 = [result0, result1];
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset) {
                    var header;
                    if (!data.multi_header) data.multi_header = [];
                    try {
                        header = new NameAddrHeader(data.uri, data.display_name, data.params);
                        delete data.uri;
                        delete data.display_name;
                        delete data.params;
                    } catch (e) {
                        header = null;
                    }
                    data.multi_header.push({
                        'possition': pos,
                        'offset': offset,
                        'parsed': header
                    });
                })(pos0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_Reason() {
            var result0, result1, result2, result3;
            var pos0, pos1, pos2;
            pos0 = pos;
            pos1 = pos;
            if (input.substr(pos, 3).toLowerCase() === "sip") {
                result0 = input.substr(pos, 3);
                pos += 3;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"SIP\"");
                }
            }
            if (result0 === null) {
                result0 = parse_token();
            }
            if (result0 !== null) {
                result1 = [];
                pos2 = pos;
                result2 = parse_SEMI();
                if (result2 !== null) {
                    result3 = parse_reason_param();
                    if (result3 !== null) {
                        result2 = [result2, result3];
                    } else {
                        result2 = null;
                        pos = pos2;
                    }
                } else {
                    result2 = null;
                    pos = pos2;
                }
                while (result2 !== null) {
                    result1.push(result2);
                    pos2 = pos;
                    result2 = parse_SEMI();
                    if (result2 !== null) {
                        result3 = parse_reason_param();
                        if (result3 !== null) {
                            result2 = [result2, result3];
                        } else {
                            result2 = null;
                            pos = pos2;
                        }
                    } else {
                        result2 = null;
                        pos = pos2;
                    }
                }
                if (result1 !== null) {
                    result0 = [result0, result1];
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset, protocol) {
                    data.protocol = protocol.toLowerCase();
                    if (!data.params) data.params = {};
                    if (data.params.text && data.params.text[0] === '"') {
                        var text = data.params.text;
                        data.text = text.substring(1, text.length - 1);
                        delete data.params.text;
                    }
                })(pos0, result0[0]);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_reason_param() {
            var result0;
            result0 = parse_reason_cause();
            if (result0 === null) {
                result0 = parse_generic_param();
            }
            return result0;
        }

        function parse_reason_cause() {
            var result0, result1, result2, result3;
            var pos0, pos1;
            pos0 = pos;
            pos1 = pos;
            if (input.substr(pos, 5).toLowerCase() === "cause") {
                result0 = input.substr(pos, 5);
                pos += 5;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"cause\"");
                }
            }
            if (result0 !== null) {
                result1 = parse_EQUAL();
                if (result1 !== null) {
                    result3 = parse_DIGIT();
                    if (result3 !== null) {
                        result2 = [];
                        while (result3 !== null) {
                            result2.push(result3);
                            result3 = parse_DIGIT();
                        }
                    } else {
                        result2 = null;
                    }
                    if (result2 !== null) {
                        result0 = [result0, result1, result2];
                    } else {
                        result0 = null;
                        pos = pos1;
                    }
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset, cause) {
                    data.cause = parseInt(cause.join(''));
                })(pos0, result0[2]);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_Require() {
            var result0, result1, result2, result3;
            var pos0, pos1;
            pos0 = pos;
            result0 = parse_token();
            if (result0 !== null) {
                result1 = [];
                pos1 = pos;
                result2 = parse_COMMA();
                if (result2 !== null) {
                    result3 = parse_token();
                    if (result3 !== null) {
                        result2 = [result2, result3];
                    } else {
                        result2 = null;
                        pos = pos1;
                    }
                } else {
                    result2 = null;
                    pos = pos1;
                }
                while (result2 !== null) {
                    result1.push(result2);
                    pos1 = pos;
                    result2 = parse_COMMA();
                    if (result2 !== null) {
                        result3 = parse_token();
                        if (result3 !== null) {
                            result2 = [result2, result3];
                        } else {
                            result2 = null;
                            pos = pos1;
                        }
                    } else {
                        result2 = null;
                        pos = pos1;
                    }
                }
                if (result1 !== null) {
                    result0 = [result0, result1];
                } else {
                    result0 = null;
                    pos = pos0;
                }
            } else {
                result0 = null;
                pos = pos0;
            }
            return result0;
        }

        function parse_Route() {
            var result0, result1, result2, result3;
            var pos0, pos1;
            pos0 = pos;
            result0 = parse_route_param();
            if (result0 !== null) {
                result1 = [];
                pos1 = pos;
                result2 = parse_COMMA();
                if (result2 !== null) {
                    result3 = parse_route_param();
                    if (result3 !== null) {
                        result2 = [result2, result3];
                    } else {
                        result2 = null;
                        pos = pos1;
                    }
                } else {
                    result2 = null;
                    pos = pos1;
                }
                while (result2 !== null) {
                    result1.push(result2);
                    pos1 = pos;
                    result2 = parse_COMMA();
                    if (result2 !== null) {
                        result3 = parse_route_param();
                        if (result3 !== null) {
                            result2 = [result2, result3];
                        } else {
                            result2 = null;
                            pos = pos1;
                        }
                    } else {
                        result2 = null;
                        pos = pos1;
                    }
                }
                if (result1 !== null) {
                    result0 = [result0, result1];
                } else {
                    result0 = null;
                    pos = pos0;
                }
            } else {
                result0 = null;
                pos = pos0;
            }
            return result0;
        }

        function parse_route_param() {
            var result0, result1, result2, result3;
            var pos0, pos1;
            pos0 = pos;
            result0 = parse_name_addr();
            if (result0 !== null) {
                result1 = [];
                pos1 = pos;
                result2 = parse_SEMI();
                if (result2 !== null) {
                    result3 = parse_generic_param();
                    if (result3 !== null) {
                        result2 = [result2, result3];
                    } else {
                        result2 = null;
                        pos = pos1;
                    }
                } else {
                    result2 = null;
                    pos = pos1;
                }
                while (result2 !== null) {
                    result1.push(result2);
                    pos1 = pos;
                    result2 = parse_SEMI();
                    if (result2 !== null) {
                        result3 = parse_generic_param();
                        if (result3 !== null) {
                            result2 = [result2, result3];
                        } else {
                            result2 = null;
                            pos = pos1;
                        }
                    } else {
                        result2 = null;
                        pos = pos1;
                    }
                }
                if (result1 !== null) {
                    result0 = [result0, result1];
                } else {
                    result0 = null;
                    pos = pos0;
                }
            } else {
                result0 = null;
                pos = pos0;
            }
            return result0;
        }

        function parse_Subscription_State() {
            var result0, result1, result2, result3;
            var pos0, pos1;
            pos0 = pos;
            result0 = parse_substate_value();
            if (result0 !== null) {
                result1 = [];
                pos1 = pos;
                result2 = parse_SEMI();
                if (result2 !== null) {
                    result3 = parse_subexp_params();
                    if (result3 !== null) {
                        result2 = [result2, result3];
                    } else {
                        result2 = null;
                        pos = pos1;
                    }
                } else {
                    result2 = null;
                    pos = pos1;
                }
                while (result2 !== null) {
                    result1.push(result2);
                    pos1 = pos;
                    result2 = parse_SEMI();
                    if (result2 !== null) {
                        result3 = parse_subexp_params();
                        if (result3 !== null) {
                            result2 = [result2, result3];
                        } else {
                            result2 = null;
                            pos = pos1;
                        }
                    } else {
                        result2 = null;
                        pos = pos1;
                    }
                }
                if (result1 !== null) {
                    result0 = [result0, result1];
                } else {
                    result0 = null;
                    pos = pos0;
                }
            } else {
                result0 = null;
                pos = pos0;
            }
            return result0;
        }

        function parse_substate_value() {
            var result0;
            var pos0;
            pos0 = pos;
            if (input.substr(pos, 6).toLowerCase() === "active") {
                result0 = input.substr(pos, 6);
                pos += 6;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"active\"");
                }
            }
            if (result0 === null) {
                if (input.substr(pos, 7).toLowerCase() === "pending") {
                    result0 = input.substr(pos, 7);
                    pos += 7;
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"pending\"");
                    }
                }
                if (result0 === null) {
                    if (input.substr(pos, 10).toLowerCase() === "terminated") {
                        result0 = input.substr(pos, 10);
                        pos += 10;
                    } else {
                        result0 = null;
                        if (reportFailures === 0) {
                            matchFailed("\"terminated\"");
                        }
                    }
                    if (result0 === null) {
                        result0 = parse_token();
                    }
                }
            }
            if (result0 !== null) {
                result0 = (function (offset) {
                    data.state = input.substring(pos, offset);
                })(pos0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_subexp_params() {
            var result0, result1, result2;
            var pos0, pos1;
            pos0 = pos;
            pos1 = pos;
            if (input.substr(pos, 6).toLowerCase() === "reason") {
                result0 = input.substr(pos, 6);
                pos += 6;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"reason\"");
                }
            }
            if (result0 !== null) {
                result1 = parse_EQUAL();
                if (result1 !== null) {
                    result2 = parse_event_reason_value();
                    if (result2 !== null) {
                        result0 = [result0, result1, result2];
                    } else {
                        result0 = null;
                        pos = pos1;
                    }
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset, reason) {
                    if (typeof reason !== 'undefined') data.reason = reason;
                })(pos0, result0[2]);
            }
            if (result0 === null) {
                pos = pos0;
            }
            if (result0 === null) {
                pos0 = pos;
                pos1 = pos;
                if (input.substr(pos, 7).toLowerCase() === "expires") {
                    result0 = input.substr(pos, 7);
                    pos += 7;
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"expires\"");
                    }
                }
                if (result0 !== null) {
                    result1 = parse_EQUAL();
                    if (result1 !== null) {
                        result2 = parse_delta_seconds();
                        if (result2 !== null) {
                            result0 = [result0, result1, result2];
                        } else {
                            result0 = null;
                            pos = pos1;
                        }
                    } else {
                        result0 = null;
                        pos = pos1;
                    }
                } else {
                    result0 = null;
                    pos = pos1;
                }
                if (result0 !== null) {
                    result0 = (function (offset, expires) {
                        if (typeof expires !== 'undefined') data.expires = expires;
                    })(pos0, result0[2]);
                }
                if (result0 === null) {
                    pos = pos0;
                }
                if (result0 === null) {
                    pos0 = pos;
                    pos1 = pos;
                    if (input.substr(pos, 11).toLowerCase() === "retry_after") {
                        result0 = input.substr(pos, 11);
                        pos += 11;
                    } else {
                        result0 = null;
                        if (reportFailures === 0) {
                            matchFailed("\"retry_after\"");
                        }
                    }
                    if (result0 !== null) {
                        result1 = parse_EQUAL();
                        if (result1 !== null) {
                            result2 = parse_delta_seconds();
                            if (result2 !== null) {
                                result0 = [result0, result1, result2];
                            } else {
                                result0 = null;
                                pos = pos1;
                            }
                        } else {
                            result0 = null;
                            pos = pos1;
                        }
                    } else {
                        result0 = null;
                        pos = pos1;
                    }
                    if (result0 !== null) {
                        result0 = (function (offset, retry_after) {
                            if (typeof retry_after !== 'undefined') data.retry_after = retry_after;
                        })(pos0, result0[2]);
                    }
                    if (result0 === null) {
                        pos = pos0;
                    }
                    if (result0 === null) {
                        result0 = parse_generic_param();
                    }
                }
            }
            return result0;
        }

        function parse_event_reason_value() {
            var result0;
            if (input.substr(pos, 11).toLowerCase() === "deactivated") {
                result0 = input.substr(pos, 11);
                pos += 11;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"deactivated\"");
                }
            }
            if (result0 === null) {
                if (input.substr(pos, 9).toLowerCase() === "probation") {
                    result0 = input.substr(pos, 9);
                    pos += 9;
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"probation\"");
                    }
                }
                if (result0 === null) {
                    if (input.substr(pos, 8).toLowerCase() === "rejected") {
                        result0 = input.substr(pos, 8);
                        pos += 8;
                    } else {
                        result0 = null;
                        if (reportFailures === 0) {
                            matchFailed("\"rejected\"");
                        }
                    }
                    if (result0 === null) {
                        if (input.substr(pos, 7).toLowerCase() === "timeout") {
                            result0 = input.substr(pos, 7);
                            pos += 7;
                        } else {
                            result0 = null;
                            if (reportFailures === 0) {
                                matchFailed("\"timeout\"");
                            }
                        }
                        if (result0 === null) {
                            if (input.substr(pos, 6).toLowerCase() === "giveup") {
                                result0 = input.substr(pos, 6);
                                pos += 6;
                            } else {
                                result0 = null;
                                if (reportFailures === 0) {
                                    matchFailed("\"giveup\"");
                                }
                            }
                            if (result0 === null) {
                                if (input.substr(pos, 10).toLowerCase() === "noresource") {
                                    result0 = input.substr(pos, 10);
                                    pos += 10;
                                } else {
                                    result0 = null;
                                    if (reportFailures === 0) {
                                        matchFailed("\"noresource\"");
                                    }
                                }
                                if (result0 === null) {
                                    if (input.substr(pos, 9).toLowerCase() === "invariant") {
                                        result0 = input.substr(pos, 9);
                                        pos += 9;
                                    } else {
                                        result0 = null;
                                        if (reportFailures === 0) {
                                            matchFailed("\"invariant\"");
                                        }
                                    }
                                    if (result0 === null) {
                                        result0 = parse_token();
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return result0;
        }

        function parse_Subject() {
            var result0;
            result0 = parse_TEXT_UTF8_TRIM();
            result0 = result0 !== null ? result0 : "";
            return result0;
        }

        function parse_Supported() {
            var result0, result1, result2, result3;
            var pos0, pos1;
            pos0 = pos;
            result0 = parse_token();
            if (result0 !== null) {
                result1 = [];
                pos1 = pos;
                result2 = parse_COMMA();
                if (result2 !== null) {
                    result3 = parse_token();
                    if (result3 !== null) {
                        result2 = [result2, result3];
                    } else {
                        result2 = null;
                        pos = pos1;
                    }
                } else {
                    result2 = null;
                    pos = pos1;
                }
                while (result2 !== null) {
                    result1.push(result2);
                    pos1 = pos;
                    result2 = parse_COMMA();
                    if (result2 !== null) {
                        result3 = parse_token();
                        if (result3 !== null) {
                            result2 = [result2, result3];
                        } else {
                            result2 = null;
                            pos = pos1;
                        }
                    } else {
                        result2 = null;
                        pos = pos1;
                    }
                }
                if (result1 !== null) {
                    result0 = [result0, result1];
                } else {
                    result0 = null;
                    pos = pos0;
                }
            } else {
                result0 = null;
                pos = pos0;
            }
            result0 = result0 !== null ? result0 : "";
            return result0;
        }

        function parse_To() {
            var result0, result1, result2, result3;
            var pos0, pos1, pos2;
            pos0 = pos;
            pos1 = pos;
            result0 = parse_SIP_URI_noparams();
            if (result0 === null) {
                result0 = parse_name_addr();
            }
            if (result0 !== null) {
                result1 = [];
                pos2 = pos;
                result2 = parse_SEMI();
                if (result2 !== null) {
                    result3 = parse_to_param();
                    if (result3 !== null) {
                        result2 = [result2, result3];
                    } else {
                        result2 = null;
                        pos = pos2;
                    }
                } else {
                    result2 = null;
                    pos = pos2;
                }
                while (result2 !== null) {
                    result1.push(result2);
                    pos2 = pos;
                    result2 = parse_SEMI();
                    if (result2 !== null) {
                        result3 = parse_to_param();
                        if (result3 !== null) {
                            result2 = [result2, result3];
                        } else {
                            result2 = null;
                            pos = pos2;
                        }
                    } else {
                        result2 = null;
                        pos = pos2;
                    }
                }
                if (result1 !== null) {
                    result0 = [result0, result1];
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset) {
                    var tag = data.tag;
                    try {
                        data = new NameAddrHeader(data.uri, data.display_name, data.params);
                        if (tag) {
                            data.setParam('tag', tag)
                        }
                    } catch (e) {
                        data = -1;
                    }
                })(pos0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_to_param() {
            var result0;
            result0 = parse_tag_param();
            if (result0 === null) {
                result0 = parse_generic_param();
            }
            return result0;
        }

        function parse_Via() {
            var result0, result1, result2, result3;
            var pos0, pos1;
            pos0 = pos;
            result0 = parse_via_param();
            if (result0 !== null) {
                result1 = [];
                pos1 = pos;
                result2 = parse_COMMA();
                if (result2 !== null) {
                    result3 = parse_via_param();
                    if (result3 !== null) {
                        result2 = [result2, result3];
                    } else {
                        result2 = null;
                        pos = pos1;
                    }
                } else {
                    result2 = null;
                    pos = pos1;
                }
                while (result2 !== null) {
                    result1.push(result2);
                    pos1 = pos;
                    result2 = parse_COMMA();
                    if (result2 !== null) {
                        result3 = parse_via_param();
                        if (result3 !== null) {
                            result2 = [result2, result3];
                        } else {
                            result2 = null;
                            pos = pos1;
                        }
                    } else {
                        result2 = null;
                        pos = pos1;
                    }
                }
                if (result1 !== null) {
                    result0 = [result0, result1];
                } else {
                    result0 = null;
                    pos = pos0;
                }
            } else {
                result0 = null;
                pos = pos0;
            }
            return result0;
        }

        function parse_via_param() {
            var result0, result1, result2, result3, result4, result5;
            var pos0, pos1;
            pos0 = pos;
            result0 = parse_sent_protocol();
            if (result0 !== null) {
                result1 = parse_LWS();
                if (result1 !== null) {
                    result2 = parse_sent_by();
                    if (result2 !== null) {
                        result3 = [];
                        pos1 = pos;
                        result4 = parse_SEMI();
                        if (result4 !== null) {
                            result5 = parse_via_params();
                            if (result5 !== null) {
                                result4 = [result4, result5];
                            } else {
                                result4 = null;
                                pos = pos1;
                            }
                        } else {
                            result4 = null;
                            pos = pos1;
                        }
                        while (result4 !== null) {
                            result3.push(result4);
                            pos1 = pos;
                            result4 = parse_SEMI();
                            if (result4 !== null) {
                                result5 = parse_via_params();
                                if (result5 !== null) {
                                    result4 = [result4, result5];
                                } else {
                                    result4 = null;
                                    pos = pos1;
                                }
                            } else {
                                result4 = null;
                                pos = pos1;
                            }
                        }
                        if (result3 !== null) {
                            result0 = [result0, result1, result2, result3];
                        } else {
                            result0 = null;
                            pos = pos0;
                        }
                    } else {
                        result0 = null;
                        pos = pos0;
                    }
                } else {
                    result0 = null;
                    pos = pos0;
                }
            } else {
                result0 = null;
                pos = pos0;
            }
            return result0;
        }

        function parse_via_params() {
            var result0;
            result0 = parse_via_ttl();
            if (result0 === null) {
                result0 = parse_via_maddr();
                if (result0 === null) {
                    result0 = parse_via_received();
                    if (result0 === null) {
                        result0 = parse_via_branch();
                        if (result0 === null) {
                            result0 = parse_response_port();
                            if (result0 === null) {
                                result0 = parse_generic_param();
                            }
                        }
                    }
                }
            }
            return result0;
        }

        function parse_via_ttl() {
            var result0, result1, result2;
            var pos0, pos1;
            pos0 = pos;
            pos1 = pos;
            if (input.substr(pos, 3).toLowerCase() === "ttl") {
                result0 = input.substr(pos, 3);
                pos += 3;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"ttl\"");
                }
            }
            if (result0 !== null) {
                result1 = parse_EQUAL();
                if (result1 !== null) {
                    result2 = parse_ttl();
                    if (result2 !== null) {
                        result0 = [result0, result1, result2];
                    } else {
                        result0 = null;
                        pos = pos1;
                    }
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset, via_ttl_value) {
                    data.ttl = via_ttl_value;
                })(pos0, result0[2]);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_via_maddr() {
            var result0, result1, result2;
            var pos0, pos1;
            pos0 = pos;
            pos1 = pos;
            if (input.substr(pos, 5).toLowerCase() === "maddr") {
                result0 = input.substr(pos, 5);
                pos += 5;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"maddr\"");
                }
            }
            if (result0 !== null) {
                result1 = parse_EQUAL();
                if (result1 !== null) {
                    result2 = parse_host();
                    if (result2 !== null) {
                        result0 = [result0, result1, result2];
                    } else {
                        result0 = null;
                        pos = pos1;
                    }
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset, via_maddr) {
                    data.maddr = via_maddr;
                })(pos0, result0[2]);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_via_received() {
            var result0, result1, result2;
            var pos0, pos1;
            pos0 = pos;
            pos1 = pos;
            if (input.substr(pos, 8).toLowerCase() === "received") {
                result0 = input.substr(pos, 8);
                pos += 8;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"received\"");
                }
            }
            if (result0 !== null) {
                result1 = parse_EQUAL();
                if (result1 !== null) {
                    result2 = parse_IPv4address();
                    if (result2 === null) {
                        result2 = parse_IPv6address();
                    }
                    if (result2 !== null) {
                        result0 = [result0, result1, result2];
                    } else {
                        result0 = null;
                        pos = pos1;
                    }
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset, via_received) {
                    data.received = via_received;
                })(pos0, result0[2]);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_via_branch() {
            var result0, result1, result2;
            var pos0, pos1;
            pos0 = pos;
            pos1 = pos;
            if (input.substr(pos, 6).toLowerCase() === "branch") {
                result0 = input.substr(pos, 6);
                pos += 6;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"branch\"");
                }
            }
            if (result0 !== null) {
                result1 = parse_EQUAL();
                if (result1 !== null) {
                    result2 = parse_token();
                    if (result2 !== null) {
                        result0 = [result0, result1, result2];
                    } else {
                        result0 = null;
                        pos = pos1;
                    }
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset, via_branch) {
                    data.branch = via_branch;
                })(pos0, result0[2]);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_response_port() {
            var result0, result1, result2, result3;
            var pos0, pos1, pos2;
            pos0 = pos;
            pos1 = pos;
            if (input.substr(pos, 5).toLowerCase() === "rport") {
                result0 = input.substr(pos, 5);
                pos += 5;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"rport\"");
                }
            }
            if (result0 !== null) {
                pos2 = pos;
                result1 = parse_EQUAL();
                if (result1 !== null) {
                    result2 = [];
                    result3 = parse_DIGIT();
                    while (result3 !== null) {
                        result2.push(result3);
                        result3 = parse_DIGIT();
                    }
                    if (result2 !== null) {
                        result1 = [result1, result2];
                    } else {
                        result1 = null;
                        pos = pos2;
                    }
                } else {
                    result1 = null;
                    pos = pos2;
                }
                result1 = result1 !== null ? result1 : "";
                if (result1 !== null) {
                    result0 = [result0, result1];
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset) {
                    if (typeof response_port !== 'undefined')
                        data.rport = response_port.join('');
                })(pos0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_sent_protocol() {
            var result0, result1, result2, result3, result4;
            var pos0;
            pos0 = pos;
            result0 = parse_protocol_name();
            if (result0 !== null) {
                result1 = parse_SLASH();
                if (result1 !== null) {
                    result2 = parse_token();
                    if (result2 !== null) {
                        result3 = parse_SLASH();
                        if (result3 !== null) {
                            result4 = parse_transport();
                            if (result4 !== null) {
                                result0 = [result0, result1, result2, result3, result4];
                            } else {
                                result0 = null;
                                pos = pos0;
                            }
                        } else {
                            result0 = null;
                            pos = pos0;
                        }
                    } else {
                        result0 = null;
                        pos = pos0;
                    }
                } else {
                    result0 = null;
                    pos = pos0;
                }
            } else {
                result0 = null;
                pos = pos0;
            }
            return result0;
        }

        function parse_protocol_name() {
            var result0;
            var pos0;
            pos0 = pos;
            if (input.substr(pos, 3).toLowerCase() === "sip") {
                result0 = input.substr(pos, 3);
                pos += 3;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"SIP\"");
                }
            }
            if (result0 === null) {
                result0 = parse_token();
            }
            if (result0 !== null) {
                result0 = (function (offset, via_protocol) {
                    data.protocol = via_protocol;
                })(pos0, result0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_transport() {
            var result0;
            var pos0;
            pos0 = pos;
            if (input.substr(pos, 3).toLowerCase() === "udp") {
                result0 = input.substr(pos, 3);
                pos += 3;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"UDP\"");
                }
            }
            if (result0 === null) {
                if (input.substr(pos, 3).toLowerCase() === "tcp") {
                    result0 = input.substr(pos, 3);
                    pos += 3;
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"TCP\"");
                    }
                }
                if (result0 === null) {
                    if (input.substr(pos, 3).toLowerCase() === "tls") {
                        result0 = input.substr(pos, 3);
                        pos += 3;
                    } else {
                        result0 = null;
                        if (reportFailures === 0) {
                            matchFailed("\"TLS\"");
                        }
                    }
                    if (result0 === null) {
                        if (input.substr(pos, 4).toLowerCase() === "sctp") {
                            result0 = input.substr(pos, 4);
                            pos += 4;
                        } else {
                            result0 = null;
                            if (reportFailures === 0) {
                                matchFailed("\"SCTP\"");
                            }
                        }
                        if (result0 === null) {
                            result0 = parse_token();
                        }
                    }
                }
            }
            if (result0 !== null) {
                result0 = (function (offset, via_transport) {
                    data.transport = via_transport;
                })(pos0, result0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_sent_by() {
            var result0, result1, result2;
            var pos0, pos1;
            pos0 = pos;
            result0 = parse_via_host();
            if (result0 !== null) {
                pos1 = pos;
                result1 = parse_COLON();
                if (result1 !== null) {
                    result2 = parse_via_port();
                    if (result2 !== null) {
                        result1 = [result1, result2];
                    } else {
                        result1 = null;
                        pos = pos1;
                    }
                } else {
                    result1 = null;
                    pos = pos1;
                }
                result1 = result1 !== null ? result1 : "";
                if (result1 !== null) {
                    result0 = [result0, result1];
                } else {
                    result0 = null;
                    pos = pos0;
                }
            } else {
                result0 = null;
                pos = pos0;
            }
            return result0;
        }

        function parse_via_host() {
            var result0;
            var pos0;
            pos0 = pos;
            result0 = parse_IPv4address();
            if (result0 === null) {
                result0 = parse_IPv6reference();
                if (result0 === null) {
                    result0 = parse_hostname();
                }
            }
            if (result0 !== null) {
                result0 = (function (offset) {
                    data.host = input.substring(pos, offset);
                })(pos0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_via_port() {
            var result0, result1, result2, result3, result4;
            var pos0, pos1;
            pos0 = pos;
            pos1 = pos;
            result0 = parse_DIGIT();
            result0 = result0 !== null ? result0 : "";
            if (result0 !== null) {
                result1 = parse_DIGIT();
                result1 = result1 !== null ? result1 : "";
                if (result1 !== null) {
                    result2 = parse_DIGIT();
                    result2 = result2 !== null ? result2 : "";
                    if (result2 !== null) {
                        result3 = parse_DIGIT();
                        result3 = result3 !== null ? result3 : "";
                        if (result3 !== null) {
                            result4 = parse_DIGIT();
                            result4 = result4 !== null ? result4 : "";
                            if (result4 !== null) {
                                result0 = [result0, result1, result2, result3, result4];
                            } else {
                                result0 = null;
                                pos = pos1;
                            }
                        } else {
                            result0 = null;
                            pos = pos1;
                        }
                    } else {
                        result0 = null;
                        pos = pos1;
                    }
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset, via_sent_by_port) {
                    data.port = parseInt(via_sent_by_port.join(''));
                })(pos0, result0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_ttl() {
            var result0, result1, result2;
            var pos0, pos1;
            pos0 = pos;
            pos1 = pos;
            result0 = parse_DIGIT();
            if (result0 !== null) {
                result1 = parse_DIGIT();
                result1 = result1 !== null ? result1 : "";
                if (result1 !== null) {
                    result2 = parse_DIGIT();
                    result2 = result2 !== null ? result2 : "";
                    if (result2 !== null) {
                        result0 = [result0, result1, result2];
                    } else {
                        result0 = null;
                        pos = pos1;
                    }
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset, ttl) {
                    return parseInt(ttl.join(''));
                })(pos0, result0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_WWW_Authenticate() {
            var result0;
            result0 = parse_challenge();
            return result0;
        }

        function parse_Session_Expires() {
            var result0, result1, result2, result3;
            var pos0, pos1;
            pos0 = pos;
            result0 = parse_s_e_expires();
            if (result0 !== null) {
                result1 = [];
                pos1 = pos;
                result2 = parse_SEMI();
                if (result2 !== null) {
                    result3 = parse_s_e_params();
                    if (result3 !== null) {
                        result2 = [result2, result3];
                    } else {
                        result2 = null;
                        pos = pos1;
                    }
                } else {
                    result2 = null;
                    pos = pos1;
                }
                while (result2 !== null) {
                    result1.push(result2);
                    pos1 = pos;
                    result2 = parse_SEMI();
                    if (result2 !== null) {
                        result3 = parse_s_e_params();
                        if (result3 !== null) {
                            result2 = [result2, result3];
                        } else {
                            result2 = null;
                            pos = pos1;
                        }
                    } else {
                        result2 = null;
                        pos = pos1;
                    }
                }
                if (result1 !== null) {
                    result0 = [result0, result1];
                } else {
                    result0 = null;
                    pos = pos0;
                }
            } else {
                result0 = null;
                pos = pos0;
            }
            return result0;
        }

        function parse_s_e_expires() {
            var result0;
            var pos0;
            pos0 = pos;
            result0 = parse_delta_seconds();
            if (result0 !== null) {
                result0 = (function (offset, expires) {
                    data.expires = expires;
                })(pos0, result0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_s_e_params() {
            var result0;
            result0 = parse_s_e_refresher();
            if (result0 === null) {
                result0 = parse_generic_param();
            }
            return result0;
        }

        function parse_s_e_refresher() {
            var result0, result1, result2;
            var pos0, pos1;
            pos0 = pos;
            pos1 = pos;
            if (input.substr(pos, 9).toLowerCase() === "refresher") {
                result0 = input.substr(pos, 9);
                pos += 9;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"refresher\"");
                }
            }
            if (result0 !== null) {
                result1 = parse_EQUAL();
                if (result1 !== null) {
                    if (input.substr(pos, 3).toLowerCase() === "uac") {
                        result2 = input.substr(pos, 3);
                        pos += 3;
                    } else {
                        result2 = null;
                        if (reportFailures === 0) {
                            matchFailed("\"uac\"");
                        }
                    }
                    if (result2 === null) {
                        if (input.substr(pos, 3).toLowerCase() === "uas") {
                            result2 = input.substr(pos, 3);
                            pos += 3;
                        } else {
                            result2 = null;
                            if (reportFailures === 0) {
                                matchFailed("\"uas\"");
                            }
                        }
                    }
                    if (result2 !== null) {
                        result0 = [result0, result1, result2];
                    } else {
                        result0 = null;
                        pos = pos1;
                    }
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset, s_e_refresher_value) {
                    data.refresher = s_e_refresher_value.toLowerCase();
                })(pos0, result0[2]);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_extension_header() {
            var result0, result1, result2;
            var pos0;
            pos0 = pos;
            result0 = parse_token();
            if (result0 !== null) {
                result1 = parse_HCOLON();
                if (result1 !== null) {
                    result2 = parse_header_value();
                    if (result2 !== null) {
                        result0 = [result0, result1, result2];
                    } else {
                        result0 = null;
                        pos = pos0;
                    }
                } else {
                    result0 = null;
                    pos = pos0;
                }
            } else {
                result0 = null;
                pos = pos0;
            }
            return result0;
        }

        function parse_header_value() {
            var result0, result1;
            result0 = [];
            result1 = parse_TEXT_UTF8char();
            if (result1 === null) {
                result1 = parse_UTF8_CONT();
                if (result1 === null) {
                    result1 = parse_LWS();
                }
            }
            while (result1 !== null) {
                result0.push(result1);
                result1 = parse_TEXT_UTF8char();
                if (result1 === null) {
                    result1 = parse_UTF8_CONT();
                    if (result1 === null) {
                        result1 = parse_LWS();
                    }
                }
            }
            return result0;
        }

        function parse_message_body() {
            var result0, result1;
            result0 = [];
            result1 = parse_OCTET();
            while (result1 !== null) {
                result0.push(result1);
                result1 = parse_OCTET();
            }
            return result0;
        }

        function parse_uuid_URI() {
            var result0, result1;
            var pos0;
            pos0 = pos;
            if (input.substr(pos, 5) === "uuid:") {
                result0 = "uuid:";
                pos += 5;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"uuid:\"");
                }
            }
            if (result0 !== null) {
                result1 = parse_uuid();
                if (result1 !== null) {
                    result0 = [result0, result1];
                } else {
                    result0 = null;
                    pos = pos0;
                }
            } else {
                result0 = null;
                pos = pos0;
            }
            return result0;
        }

        function parse_uuid() {
            var result0, result1, result2, result3, result4, result5, result6, result7, result8;
            var pos0, pos1;
            pos0 = pos;
            pos1 = pos;
            result0 = parse_hex8();
            if (result0 !== null) {
                if (input.charCodeAt(pos) === 45) {
                    result1 = "-";
                    pos++;
                } else {
                    result1 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"-\"");
                    }
                }
                if (result1 !== null) {
                    result2 = parse_hex4();
                    if (result2 !== null) {
                        if (input.charCodeAt(pos) === 45) {
                            result3 = "-";
                            pos++;
                        } else {
                            result3 = null;
                            if (reportFailures === 0) {
                                matchFailed("\"-\"");
                            }
                        }
                        if (result3 !== null) {
                            result4 = parse_hex4();
                            if (result4 !== null) {
                                if (input.charCodeAt(pos) === 45) {
                                    result5 = "-";
                                    pos++;
                                } else {
                                    result5 = null;
                                    if (reportFailures === 0) {
                                        matchFailed("\"-\"");
                                    }
                                }
                                if (result5 !== null) {
                                    result6 = parse_hex4();
                                    if (result6 !== null) {
                                        if (input.charCodeAt(pos) === 45) {
                                            result7 = "-";
                                            pos++;
                                        } else {
                                            result7 = null;
                                            if (reportFailures === 0) {
                                                matchFailed("\"-\"");
                                            }
                                        }
                                        if (result7 !== null) {
                                            result8 = parse_hex12();
                                            if (result8 !== null) {
                                                result0 = [result0, result1, result2, result3, result4, result5, result6, result7, result8];
                                            } else {
                                                result0 = null;
                                                pos = pos1;
                                            }
                                        } else {
                                            result0 = null;
                                            pos = pos1;
                                        }
                                    } else {
                                        result0 = null;
                                        pos = pos1;
                                    }
                                } else {
                                    result0 = null;
                                    pos = pos1;
                                }
                            } else {
                                result0 = null;
                                pos = pos1;
                            }
                        } else {
                            result0 = null;
                            pos = pos1;
                        }
                    } else {
                        result0 = null;
                        pos = pos1;
                    }
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset, uuid) {
                    data = input.substring(pos + 5, offset);
                })(pos0, result0[0]);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_hex4() {
            var result0, result1, result2, result3;
            var pos0;
            pos0 = pos;
            result0 = parse_HEXDIG();
            if (result0 !== null) {
                result1 = parse_HEXDIG();
                if (result1 !== null) {
                    result2 = parse_HEXDIG();
                    if (result2 !== null) {
                        result3 = parse_HEXDIG();
                        if (result3 !== null) {
                            result0 = [result0, result1, result2, result3];
                        } else {
                            result0 = null;
                            pos = pos0;
                        }
                    } else {
                        result0 = null;
                        pos = pos0;
                    }
                } else {
                    result0 = null;
                    pos = pos0;
                }
            } else {
                result0 = null;
                pos = pos0;
            }
            return result0;
        }

        function parse_hex8() {
            var result0, result1;
            var pos0;
            pos0 = pos;
            result0 = parse_hex4();
            if (result0 !== null) {
                result1 = parse_hex4();
                if (result1 !== null) {
                    result0 = [result0, result1];
                } else {
                    result0 = null;
                    pos = pos0;
                }
            } else {
                result0 = null;
                pos = pos0;
            }
            return result0;
        }

        function parse_hex12() {
            var result0, result1, result2;
            var pos0;
            pos0 = pos;
            result0 = parse_hex4();
            if (result0 !== null) {
                result1 = parse_hex4();
                if (result1 !== null) {
                    result2 = parse_hex4();
                    if (result2 !== null) {
                        result0 = [result0, result1, result2];
                    } else {
                        result0 = null;
                        pos = pos0;
                    }
                } else {
                    result0 = null;
                    pos = pos0;
                }
            } else {
                result0 = null;
                pos = pos0;
            }
            return result0;
        }

        function parse_Refer_To() {
            var result0, result1, result2, result3;
            var pos0, pos1, pos2;
            pos0 = pos;
            pos1 = pos;
            result0 = parse_SIP_URI_noparams();
            if (result0 === null) {
                result0 = parse_name_addr();
            }
            if (result0 !== null) {
                result1 = [];
                pos2 = pos;
                result2 = parse_SEMI();
                if (result2 !== null) {
                    result3 = parse_generic_param();
                    if (result3 !== null) {
                        result2 = [result2, result3];
                    } else {
                        result2 = null;
                        pos = pos2;
                    }
                } else {
                    result2 = null;
                    pos = pos2;
                }
                while (result2 !== null) {
                    result1.push(result2);
                    pos2 = pos;
                    result2 = parse_SEMI();
                    if (result2 !== null) {
                        result3 = parse_generic_param();
                        if (result3 !== null) {
                            result2 = [result2, result3];
                        } else {
                            result2 = null;
                            pos = pos2;
                        }
                    } else {
                        result2 = null;
                        pos = pos2;
                    }
                }
                if (result1 !== null) {
                    result0 = [result0, result1];
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset) {
                    try {
                        data = new NameAddrHeader(data.uri, data.display_name, data.params);
                    } catch (e) {
                        data = -1;
                    }
                })(pos0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_Replaces() {
            var result0, result1, result2, result3;
            var pos0, pos1;
            pos0 = pos;
            result0 = parse_call_id();
            if (result0 !== null) {
                result1 = [];
                pos1 = pos;
                result2 = parse_SEMI();
                if (result2 !== null) {
                    result3 = parse_replaces_param();
                    if (result3 !== null) {
                        result2 = [result2, result3];
                    } else {
                        result2 = null;
                        pos = pos1;
                    }
                } else {
                    result2 = null;
                    pos = pos1;
                }
                while (result2 !== null) {
                    result1.push(result2);
                    pos1 = pos;
                    result2 = parse_SEMI();
                    if (result2 !== null) {
                        result3 = parse_replaces_param();
                        if (result3 !== null) {
                            result2 = [result2, result3];
                        } else {
                            result2 = null;
                            pos = pos1;
                        }
                    } else {
                        result2 = null;
                        pos = pos1;
                    }
                }
                if (result1 !== null) {
                    result0 = [result0, result1];
                } else {
                    result0 = null;
                    pos = pos0;
                }
            } else {
                result0 = null;
                pos = pos0;
            }
            return result0;
        }

        function parse_call_id() {
            var result0, result1, result2;
            var pos0, pos1, pos2;
            pos0 = pos;
            pos1 = pos;
            result0 = parse_word();
            if (result0 !== null) {
                pos2 = pos;
                if (input.charCodeAt(pos) === 64) {
                    result1 = "@";
                    pos++;
                } else {
                    result1 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"@\"");
                    }
                }
                if (result1 !== null) {
                    result2 = parse_word();
                    if (result2 !== null) {
                        result1 = [result1, result2];
                    } else {
                        result1 = null;
                        pos = pos2;
                    }
                } else {
                    result1 = null;
                    pos = pos2;
                }
                result1 = result1 !== null ? result1 : "";
                if (result1 !== null) {
                    result0 = [result0, result1];
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset) {
                    data.call_id = input.substring(pos, offset);
                })(pos0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_replaces_param() {
            var result0;
            result0 = parse_to_tag();
            if (result0 === null) {
                result0 = parse_from_tag();
                if (result0 === null) {
                    result0 = parse_early_flag();
                    if (result0 === null) {
                        result0 = parse_generic_param();
                    }
                }
            }
            return result0;
        }

        function parse_to_tag() {
            var result0, result1, result2;
            var pos0, pos1;
            pos0 = pos;
            pos1 = pos;
            if (input.substr(pos, 6) === "to-tag") {
                result0 = "to-tag";
                pos += 6;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"to-tag\"");
                }
            }
            if (result0 !== null) {
                result1 = parse_EQUAL();
                if (result1 !== null) {
                    result2 = parse_token();
                    if (result2 !== null) {
                        result0 = [result0, result1, result2];
                    } else {
                        result0 = null;
                        pos = pos1;
                    }
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset, to_tag) {
                    data.to_tag = to_tag;
                })(pos0, result0[2]);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_from_tag() {
            var result0, result1, result2;
            var pos0, pos1;
            pos0 = pos;
            pos1 = pos;
            if (input.substr(pos, 8) === "from-tag") {
                result0 = "from-tag";
                pos += 8;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"from-tag\"");
                }
            }
            if (result0 !== null) {
                result1 = parse_EQUAL();
                if (result1 !== null) {
                    result2 = parse_token();
                    if (result2 !== null) {
                        result0 = [result0, result1, result2];
                    } else {
                        result0 = null;
                        pos = pos1;
                    }
                } else {
                    result0 = null;
                    pos = pos1;
                }
            } else {
                result0 = null;
                pos = pos1;
            }
            if (result0 !== null) {
                result0 = (function (offset, from_tag) {
                    data.from_tag = from_tag;
                })(pos0, result0[2]);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function parse_early_flag() {
            var result0;
            var pos0;
            pos0 = pos;
            if (input.substr(pos, 10) === "early-only") {
                result0 = "early-only";
                pos += 10;
            } else {
                result0 = null;
                if (reportFailures === 0) {
                    matchFailed("\"early-only\"");
                }
            }
            if (result0 !== null) {
                result0 = (function (offset) {
                    data.early_only = true;
                })(pos0);
            }
            if (result0 === null) {
                pos = pos0;
            }
            return result0;
        }

        function cleanupExpected(expected) {
            expected.sort();
            var lastExpected = null;
            var cleanExpected = [];
            for (var i = 0; i < expected.length; i++) {
                if (expected[i] !== lastExpected) {
                    cleanExpected.push(expected[i]);
                    lastExpected = expected[i];
                }
            }
            return cleanExpected;
        }

        function computeErrorPosition() {
            /*
         * The first idea was to use |String.split| to break the input up to the
         * error position along newlines and derive the line and column from
         * there. However IE's |split| implementation is so broken that it was
         * enough to prevent it.
         */
            var line = 1;
            var column = 1;
            var seenCR = false;
            for (var i = 0; i < Math.max(pos, rightmostFailuresPos); i++) {
                var ch = input.charAt(i);
                if (ch === "\n") {
                    if (!seenCR) {
                        line++;
                    }
                    column = 1;
                    seenCR = false;
                } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
                    line++;
                    column = 1;
                    seenCR = true;
                } else {
                    column++;
                    seenCR = false;
                }
            }
            return {line: line, column: column};
        }

        var URI = require('./URI');
        var NameAddrHeader = require('./NameAddrHeader');
        var data = {};
        var result = parseFunctions[startRule]();
        /*
       * The parser is now in one of the following three states:
       *
       * 1. The parser successfully parsed the whole input.
       *
       *    - |result !== null|
       *    - |pos === input.length|
       *    - |rightmostFailuresExpected| may or may not contain something
       *
       * 2. The parser successfully parsed only a part of the input.
       *
       *    - |result !== null|
       *    - |pos < input.length|
       *    - |rightmostFailuresExpected| may or may not contain something
       *
       * 3. The parser did not successfully parse any part of the input.
       *
       *   - |result === null|
       *   - |pos === 0|
       *   - |rightmostFailuresExpected| contains at least one failure
       *
       * All code following this comment (including called functions) must
       * handle these states.
       */
        if (result === null || pos !== input.length) {
            var offset = Math.max(pos, rightmostFailuresPos);
            var found = offset < input.length ? input.charAt(offset) : null;
            var errorPosition = computeErrorPosition();
            new this.SyntaxError(
                cleanupExpected(rightmostFailuresExpected),
                found,
                offset,
                errorPosition.line,
                errorPosition.column
            );
            return -1;
        }
        return data;
    }
}
