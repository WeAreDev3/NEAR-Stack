function ansi2html(text, options) {
    var defaultOptions = {
        lineSeparator: '<br>',
        theme: {
            black: '#000000',
            white: '#FFFFFF',
            red: '#ED3A2C',
            green: '#B3E43A',
            yellow: '#FEA626',
            blue: '#8890FF',
            magenta: '#FE4386',
            cyan: '#76E0F3',
            darkgray: '#686868',
            lightgray: '#CCCCCC',
            lightred: '#FF6E67',
            lightgreen: '#5FFA68',
            lightyellow: '#FFFC67',
            lightblue: '#B9B1FF',
            lightmagenta: '#FF77FF',
            lightcyan: '#60FDFF'
        }
    };

    if (Object.prototype.toString.call(options) !== '[object Object]') {
        options = _.clone(defaultOptions);
    } else {
        options = _.defaults(options, defaultOptions);
    }

    var ansiRegex = /\x1b(?:\[(0*\d{1,3}(?:;0*\d{1,3})*)?([a-z])?|.?)/ig,
        defaultStyle = {
            bold: false,
            italic: false,
            underline: false,
            blink: false,
            hidden: false,
            strike: false,
            color: options.theme.white,
            background: options.theme.black
        },
        oldStyle = {},
        newStyle = {},
        htmlMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            '\'': '&#39;',
            '/': '&#x2F;',
            '\n': options.lineSeparator
        },
        ansiMap = {
            '0': _.clone(defaultStyle),
            '1': {
                bold: true
            },
            '3': {
                italic: true
            },
            '4': {
                underline: true
            },
            '5': {
                blink: true
            },
            '7': {
                get color() {
                    return oldStyle.background;
                },
                get background() {
                    return oldStyle.color;
                }
            },
            '8': {
                hidden: true
            },
            '9': {
                strike: true
            },
            '22': {
                bold: false
            },
            '23': {
                italic: false
            },
            '24': {
                underline: false
            },
            '25': {
                blink: false
            },
            '27': {
                get color() {
                    return oldStyle.background;
                },
                get background() {
                    return oldStyle.color;
                }
            },
            '28': {
                hidden: false
            },
            '29': {
                strike: false
            },
            '30': {
                color: options.theme.black
            },
            '31': {
                color: options.theme.red
            },
            '32': {
                color: options.theme.green
            },
            '33': {
                color: options.theme.yellow
            },
            '34': {
                color: options.theme.blue
            },
            '35': {
                color: options.theme.magenta
            },
            '36': {
                color: options.theme.cyan
            },
            '37': {
                color: options.theme.lightgray
            },
            '39': {
                color: defaultStyle.color
            },
            '40': {
                background: options.theme.black
            },
            '41': {
                background: options.theme.red
            },
            '42': {
                background: options.theme.green
            },
            '43': {
                background: options.theme.yellow
            },
            '44': {
                background: options.theme.blue
            },
            '45': {
                background: options.theme.magenta
            },
            '46': {
                background: options.theme.cyan
            },
            '47': {
                background: options.theme.lightgray
            },
            '49': {
                background: defaultStyle.background
            },
            '90': {
                color: options.theme.darkgray
            },
            '91': {
                color: options.theme.lightred
            },
            '92': {
                color: options.theme.lightgreen
            },
            '93': {
                color: options.theme.lightyellow
            },
            '94': {
                color: options.theme.lightblue
            },
            '95': {
                color: options.theme.lightmagenta
            },
            '96': {
                color: options.theme.lightcyan
            },
            '97': {
                color: options.theme.white
            },
            '100': {
                background: options.theme.darkgray
            },
            '101': {
                background: options.theme.lightred
            },
            '102': {
                background: options.theme.lightgreen
            },
            '103': {
                background: options.theme.lightyellow
            },
            '104': {
                background: options.theme.lightblue
            },
            '105': {
                background: options.theme.lightmagenta
            },
            '106': {
                background: options.theme.lightcyan
            },
            '107': {
                background: options.theme.white
            }
        };

    // Escape any HTML
    text = String(text).replace(/[&<>"'\/\n]/g, function(s) {
        return htmlMap[s];
    });

    function codes2Css(match, codes, finalChar, index, input) {
        var output = '';

        if (finalChar === 'm') {
            if (typeof codes === 'undefined') {
                codes = '0';
            }

            codes = codes ? codes.split(';').map(function(code) {
                return ansiMap[parseInt(code) + ''] || {};
            }) : [];

            // console.log('Codes: %O', _.cloneDeep(codes));

            var outputClasses = [],
                outputStyles = [];

            codes.unshift(newStyle, oldStyle);

            _.assign.apply(_, codes);

            newStyle = _.pick(newStyle, function(value, key) {
                return value !== defaultStyle[key];
            });

            if (_.isEqual(newStyle, oldStyle)) {
                // console.log(_.cloneDeep(newStyle));
                // console.log('No style differences');
                return output;
            }

            // console.log('New: %O, old: %O', _.cloneDeep(newStyle), _.cloneDeep(oldStyle));

            if (_.isEmpty(newStyle)) {
                // console.log('Empty');
                if (!_.isEmpty(oldStyle)) {
                    // console.log('Old was NOT empty');
                    output = '</span>';
                } else {
                    output = '';
                }
            } else {
                if (!_.isEmpty(oldStyle)) {
                    // console.log('Old was NOT empty');
                    output += '</span>';
                }

                output += '<span';

                _.each(newStyle, function(value, key) {
                    // console.log(key, value);
                    if (value !== defaultStyle[key]) {
                        switch (key) {
                            case 'bold':
                            case 'italic':
                            case 'underline':
                            case 'blink':
                            case 'strike':
                                outputClasses.push(key);
                                break;
                            case 'color':
                                outputStyles.push('color: ' + value + ';');
                                break;
                            case 'background':
                                outputStyles.push('background-color: ' + value + ';');
                                break;
                        }
                    }
                });

                output += outputClasses.length ? ' class="' + outputClasses.join(' ') + '"' : '';
                output += outputStyles.length ? ' style="' + outputStyles.join(' ') + '"' : '';
                output += '>';
            }

            oldStyle = _.clone(newStyle);

            // console.log(output);
        }

        return output;
    }

    var output = text.replace(ansiRegex, codes2Css);
    // console.log(output);
    return output;
}
// var testtext = 'Hello \x1b[000000032;0000000000031mout there\x1b[0m, how is the\n\x1b[1mWorld\x1b[22m going\x1b:?';

// document.getElementById('log').innerHTML += ansi2html(testtext);
