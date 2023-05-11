/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/virastar/lib/virastar.js":
/*!***********************************************!*\
  !*** ./node_modules/virastar/lib/virastar.js ***!
  \***********************************************/
/***/ (function(module) {

/*!
* Virastar - v0.21.0 - 2020-05-14
* https://github.com/brothersincode/virastar
* Licensed: MIT
*/

(function (name, global, definition) {
  if (true) module.exports = definition();
  else {}
}('Virastar', this, function () {
  function Virastar (text, options) {
    if (!(this instanceof Virastar)) {
      return new Virastar(text, options);
    }

    text = text || {};

    if (typeof text === 'object') {
      this.opts = parseOptions(text);
    } else if (typeof text === 'string') {
      this.opts = parseOptions(options || {});
      return cleanup(text);
    }

    return this;
  }

  function parseOptions (options) {
    // @ref: https://scotch.io/bar-talk/copying-objects-in-javascript
    var parsed = Object.assign({}, defaults);

    for (var i in parsed) {
      if (options.hasOwnProperty(i)) { // eslint-disable-line no-prototype-builtins
        parsed[i] = options[i];
      }
    }

    return parsed;
  }

  function charReplace (text, fromBatch, toBatch) {
    var fromChars = fromBatch.split('');
    var toChars = toBatch.split('');
    for (var i in fromChars) {
      text = text.replace(newRegExp(fromChars[i]), toChars[i]);
    }
    return text;
  }

  function arrReplace (text, array) {
    for (var i in array) {
      if (array.hasOwnProperty(i)) { // eslint-disable-line no-prototype-builtins
        text = text.replace(newRegExp('[' + array[i] + ']'), i);
      }
    }
    return text;
  }

  function newRegExp (pattern, flags) {
    return new RegExp(pattern, flags || 'g');
  }

  var charsPersian = 'ءاآأإئؤبپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیةيك';

  // @REF: https://en.wikipedia.org/wiki/Persian_alphabet#Diacritics
  // `\u064e\u0650\u064f\u064b\u064d\u064c\u0651\u06c0`
  var charsDiacritic = 'ًٌٍَُِّْ';

  // @source: https://github.com/jhermsmeier/uri.regex
  var patternURI = "([A-Za-z][A-Za-z0-9+\\-.]*):(?:(//)(?:((?:[A-Za-z0-9\\-._~!$&'()*+,;=:]|%[0-9A-Fa-f]{2})*)@)?((?:\\[(?:(?:(?:(?:[0-9A-Fa-f]{1,4}:){6}|::(?:[0-9A-Fa-f]{1,4}:){5}|(?:[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,1}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){3}|(?:(?:[0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})?::(?:[0-9A-Fa-f]{1,4}:){2}|(?:(?:[0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}:|(?:(?:[0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})?::)(?:[0-9A-Fa-f]{1,4}:[0-9A-Fa-f]{1,4}|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))|(?:(?:[0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})?::[0-9A-Fa-f]{1,4}|(?:(?:[0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})?::)|[Vv][0-9A-Fa-f]+\\.[A-Za-z0-9\\-._~!$&'()*+,;=:]+)\\]|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(?:[A-Za-z0-9\\-._~!$&'()*+,;=]|%[0-9A-Fa-f]{2})*))(?::([0-9]*))?((?:/(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*)|/((?:(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:/(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*)?)|((?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})+(?:/(?:[A-Za-z0-9\\-._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)*)|)(?:\\?((?:[A-Za-z0-9\\-._~!$&'()*+,;=:@/?]|%[0-9A-Fa-f]{2})*))?(?:\\#((?:[A-Za-z0-9\\-._~!$&'()*+,;=:@/?]|%[0-9A-Fa-f]{2})*))?";
  var patternAfter = '\\s.,;،؛!؟?"\'()[\\]{}“”«»';

  var defaults = {
    // aggresive: true, // DEPRECATED
    cleanup_begin_and_end: true,
    cleanup_extra_marks: true,
    cleanup_kashidas: true,
    cleanup_line_breaks: true,
    cleanup_rlm: true,
    cleanup_spacing: true,
    cleanup_zwnj: true,
    decode_htmlentities: true,
    fix_arabic_numbers: true,
    fix_dashes: true,
    fix_diacritics: true,
    fix_english_numbers: true,
    fix_english_quotes_pairs: true,
    fix_english_quotes: true,
    fix_hamzeh: true,
    fix_hamzeh_arabic: false,
    fix_misc_non_persian_chars: true,
    fix_misc_spacing: true,
    fix_numeral_symbols: true,
    fix_perfix_spacing: true,
    fix_persian_glyphs: true,
    fix_punctuations: true,
    fix_question_mark: true,
    fix_spacing_for_braces_and_quotes: true,
    fix_spacing_for_punctuations: true,
    fix_suffix_misc: true,
    fix_suffix_spacing: true,
    fix_three_dots: true,
    kashidas_as_parenthetic: true,
    markdown_normalize_braces: true,
    markdown_normalize_lists: true,
    normalize_dates: true,
    normalize_ellipsis: true,
    normalize_eol: true,
    preserve_braces: false,
    preserve_brackets: false,
    preserve_comments: true,
    preserve_entities: true,
    preserve_frontmatter: true,
    preserve_HTML: true,
    preserve_nbsps: true,
    preserve_URIs: true,
    remove_diacritics: false,
    skip_markdown_ordered_lists_numbers_conversion: false
  };

  var digits = '۱۲۳۴۵۶۷۸۹۰';

  /* eslint-disable */
  var entities = {
    'sbquo;': '\u201a',
    'lsquo;': '\u2018',
    'lsquor;': '\u201a',
    'ldquo;': '\u201c',
    'ldquor;': '\u201e',
    'rdquo;': '\u201d',
    'rdquor;': '\u201d',
    'rsquo;': '\u2019',
    'rsquor;': '\u2019',
    'apos;': '\'',
    'QUOT;': '"',
    'QUOT': '"',
    'quot;': '"',
    'quot': '"',
    'zwj;': '\u200d',
    'ZWNJ;': '\u200c',
    'zwnj;': '\u200c',
    'shy;': '\u00ad' // wrongly used as zwnj
  };

  // props @ebraminio/persiantools
  var glyphs = {
    // these two are for visually available ZWNJ #visualZwnj
    '\u200cه': 'ﻫ',
    'ی\u200c': 'ﻰﻲ',
    'ﺃ': 'ﺄﺃ',
    'ﺁ': 'ﺁﺂ',
    'ﺇ': 'ﺇﺈ',
    'ا': 'ﺎا',
    'ب': 'ﺏﺐﺑﺒ',
    'پ': 'ﭖﭗﭘﭙ',
    'ت': 'ﺕﺖﺗﺘ',
    'ث': 'ﺙﺚﺛﺜ',
    'ج': 'ﺝﺞﺟﺠ',
    'چ': 'ﭺﭻﭼﭽ',
    'ح': 'ﺡﺢﺣﺤ',
    'خ': 'ﺥﺦﺧﺨ',
    'د': 'ﺩﺪ',
    'ذ': 'ﺫﺬ',
    'ر': 'ﺭﺮ',
    'ز': 'ﺯﺰ',
    'ژ': 'ﮊﮋ',
    'س': 'ﺱﺲﺳﺴ',
    'ش': 'ﺵﺶﺷﺸ',
    'ص': 'ﺹﺺﺻﺼ',
    'ض': 'ﺽﺾﺿﻀ',
    'ط': 'ﻁﻂﻃﻄ',
    'ظ': 'ﻅﻆﻇﻈ',
    'ع': 'ﻉﻊﻋﻌ',
    'غ': 'ﻍﻎﻏﻐ',
    'ف': 'ﻑﻒﻓﻔ',
    'ق': 'ﻕﻖﻗﻘ',
    'ک': 'ﮎﮏﮐﮑﻙﻚﻛﻜ',
    'گ': 'ﮒﮓﮔﮕ',
    'ل': 'ﻝﻞﻟﻠ',
    'م': 'ﻡﻢﻣﻤ',
    'ن': 'ﻥﻦﻧﻨ',
    'ه': 'ﻩﻪﻫﻬ',
    'هٔ': 'ﮤﮥ',
    'و': 'ﻭﻮ',
    'ﺅ': 'ﺅﺆ',
    'ی': 'ﯼﯽﯾﯿﻯﻰﻱﻲﻳﻴ',
    'ئ': 'ﺉﺊﺋﺌ',
    'لا': 'ﻼ',
    'ﻹ': 'ﻺ',
    'ﻷ': 'ﻸ',
    'ﻵ': 'ﻶ'
  };
  /* eslint-enable */

  function cleanup (text, options) {
    if (typeof text !== 'string') {
      throw new TypeError('Expected a String, but received ' + typeof text);
    }

    // dont bother if its empty or whitespace
    if (!text.trim()) {
      return text;
    }

    var opts = options ? parseOptions(options) : this.opts;

    // single space paddings around the string
    text = ' ' + text + ' ';

    // preserves frontmatter data in the text
    if (opts.preserve_frontmatter) {
      var frontmatter = [];
      text = text.replace(/^ ---[\S\s]*?---\n/g, function (matched) {
        frontmatter.push(matched);
        return ' __FRONTMATTER__PRESERVER__ ';
      });
    }

    // preserves all html tags in the text
    // @props: @wordpress/wordcount
    if (opts.preserve_HTML) {
      var html = [];
      text = text.replace(/<\/?[a-z][^>]*?>/gi, function (matched) {
        html.push(matched);
        return ' __HTML__PRESERVER__ ';
      });
    }

    // preserves all html comments in the text
    // @props: @wordpress/wordcount
    if (opts.preserve_comments) {
      var comments = [];
      text = text.replace(/<!--[\s\S]*?-->/g, function (matched) {
        comments.push(matched);
        return ' __COMMENT__PRESERVER__ ';
      });
    }

    // preserves strings inside square brackets (`[]`)
    if (opts.preserve_brackets) {
      var brackets = [];
      text = text.replace(/(\[.*?\])/g, function (matched) {
        brackets.push(matched);
        return ' __BRACKETS__PRESERVER__ ';
      });
    }

    // preserves strings inside curly braces (`{}`)
    if (opts.preserve_braces) {
      var braces = [];
      text = text.replace(/(\{.*?\})/g, function (matched) {
        braces.push(matched);
        return ' __BRACES__PRESERVER__ ';
      });
    }

    // preserves all uri strings in the text
    if (opts.preserve_URIs) {
      var mdlinks = [];
      var uris = [];

      // stores markdown links separetly
      text = text.replace(/]\((.*?)\)/g, function (matched, link) {
        if (link) {
          mdlinks.push(link.trim());
          return '](__MD_LINK__PRESERVER__)'; // no padding!
        }
        return matched;
      });

      text = text.replace(newRegExp(patternURI), function (matched) {
        uris.push(matched);
        return ' __URI__PRESERVER__ ';
      });
    }

    // preserves all no-break space entities in the text
    if (opts.preserve_nbsps) {
      var nbsps = [];
      text = text.replace(/&nbsp;|&#160;/gi, function (matched) {
        nbsps.push(matched);
        return ' __NBSPS__PRESERVER__ ';
      });
    }

    if (opts.decode_htmlentities) {
      text = decodeHTMLEntities(text);
    }

    // preserves all html entities in the text
    // @props: @substack/node-ent
    if (opts.preserve_entities) {
      var entities = [];
      text = text.replace(/&(#?[^;\W]+;?)/g, function (matched) {
        entities.push(matched);
        return ' __ENTITIES__PRESERVER__ ';
      });
    }

    if (opts.normalize_eol) {
      text = normalizeEOL(text);
    }

    if (opts.fix_persian_glyphs) {
      text = fixPersianGlyphs(text);
    }

    if (opts.fix_dashes) {
      text = fixDashes(text);
    }

    if (opts.fix_three_dots) {
      text = fixThreeDots(text);
    }

    if (opts.normalize_ellipsis) {
      text = normalizeEllipsis(text);
    }

    if (opts.fix_english_quotes_pairs) {
      text = fixEnglishQuotesPairs(text);
    }

    if (opts.fix_english_quotes) {
      text = fixEnglishQuotes(text);
    }

    if (opts.fix_hamzeh) {
      if (opts.fix_hamzeh_arabic) {
        text = fixHamzehArabic(text);
      }

      text = fixHamzeh(text);
    } else if (opts.fix_suffix_spacing) {
      if (opts.fix_hamzeh_arabic) {
        text = fixHamzehArabicAlt(text);
      }

      text = fixSuffixSpacingHamzeh(text);
    }

    if (opts.cleanup_rlm) {
      text = cleanupRLM(text);
    }

    if (opts.cleanup_zwnj) {
      text = cleanupZWNJ(text);
    }

    if (opts.fix_arabic_numbers) {
      text = fixArabicNumbers(text);
    }

    // word tokenizer
    text = text.replace(/(^|\s+)([[({"'“«]?)(\S+)([\])}"'”»]?)(?=($|\s+))/g,
      function (matched, before, leadings, word, trailings, after) {
        // should not replace to persian chars in english phrases
        if (word.match(/[a-zA-Z\-_]{2,}/g)) {
          return matched;
        }

        // should not touch sprintf directives
        // @source: https://stackoverflow.com/a/8915445/
        if (word.match(/%(?:\d+\$)?[+-]?(?:[ 0]|'.{1})?-?\d*(?:\.\d+)?[bcdeEufFgGosxX]/g)) {
          return matched;
        }

        // should not touch numbers in html entities
        if (word.match(/&#\d+;/g)) {
          return matched;
        }

        // skips converting english numbers of ordered lists in markdown
        if (opts.skip_markdown_ordered_lists_numbers_conversion && (matched + trailings + after).match(/(?:(?:\r?\n)|(?:\r\n?)|(?:^|\n))\d+\.\s/)) {
          return matched;
        }

        if (opts.fix_english_numbers) {
          matched = fixEnglishNumbers(matched);
        }

        if (opts.fix_numeral_symbols) {
          matched = fixNumeralSymbols(matched);
        }

        if (opts.fix_punctuations) {
          matched = fixPunctuations(matched);
        }

        if (opts.fix_misc_non_persian_chars) {
          matched = fixMiscNonPersianChars(matched);
        }

        if (opts.fix_question_mark) {
          matched = fixQuestionMark(matched);
        }

        return matched;
      }
    );

    if (opts.normalize_dates) {
      text = normalizeDates(text);
    }

    if (opts.fix_perfix_spacing) {
      text = fixPerfixSpacing(text);
    }

    if (opts.fix_suffix_spacing) {
      text = fixSuffixSpacing(text);
    }

    if (opts.fix_suffix_misc) {
      text = fixSuffixMisc(text);
    }

    if (opts.fix_spacing_for_braces_and_quotes) {
      text = fixBracesSpacing(text);
    }

    if (opts.cleanup_extra_marks) {
      text = cleanupExtraMarks(text);
    }

    if (opts.fix_spacing_for_punctuations) {
      text = fixPunctuationSpacing(text);
    }

    if (opts.kashidas_as_parenthetic) {
      text = kashidasAsParenthetic(text);
    }

    if (opts.cleanup_kashidas) {
      text = cleanupKashidas(text);
    }

    if (opts.markdown_normalize_braces) {
      text = markdownNormalizeBraces(text);
    }

    if (opts.markdown_normalize_lists) {
      text = markdownNormalizeLists(text);
    }

    // doing it again after `fixPunctuationSpacing()`
    if (opts.fix_spacing_for_braces_and_quotes) {
      text = fixBracesSpacingInside(text);
    }

    if (opts.fix_misc_spacing) {
      text = fixMiscSpacing(text);
    }

    if (opts.remove_diacritics) {
      text = removeDiacritics(text);
    } else if (opts.fix_diacritics) {
      text = fixDiacritics(text);
    }

    if (opts.cleanup_spacing) {
      text = cleanupSpacing(text);
    }

    if (opts.cleanup_zwnj) {
      text = cleanupZWNJLate(text);
    }

    if (opts.cleanup_line_breaks) {
      text = cleanupLineBreaks(text);
    }

    // bringing back entities
    if (opts.preserve_entities) {
      text = text.replace(/[ ]?__ENTITIES__PRESERVER__[ ]?/g, function () {
        return entities.shift();
      });
    }

    // bringing back nbsps
    if (opts.preserve_nbsps) {
      text = text.replace(/[ ]?__NBSPS__PRESERVER__[ ]?/g, function () {
        return nbsps.shift();
      });
    }

    // bringing back URIs
    if (opts.preserve_URIs) {
      // no padding!
      text = text.replace(/__MD_LINK__PRESERVER__/g, function () {
        return mdlinks.shift();
      });

      text = text.replace(/[ ]?__URI__PRESERVER__[ ]?/g, function () {
        return uris.shift();
      });
    }

    // bringing back braces
    if (opts.preserve_braces) {
      text = text.replace(/[ ]?__BRACES__PRESERVER__[ ]?/g, function () {
        return braces.shift();
      });
    }

    // bringing back brackets
    if (opts.preserve_brackets) {
      text = text.replace(/[ ]?__BRACKETS__PRESERVER__[ ]?/g, function () {
        return brackets.shift();
      });
    }

    // bringing back HTML comments
    if (opts.preserve_comments) {
      text = text.replace(/[ ]?__COMMENT__PRESERVER__[ ]?/g, function () {
        return comments.shift();
      });
    }

    // bringing back HTML tags
    if (opts.preserve_HTML) {
      text = text.replace(/[ ]?__HTML__PRESERVER__[ ]?/g, function () {
        return html.shift();
      });
    }

    // bringing back frontmatter
    if (opts.preserve_frontmatter) {
      text = text.replace(/[ ]?__FRONTMATTER__PRESERVER__[ ]?/g, function () {
        return frontmatter.shift();
      });
    }

    if (opts.cleanup_begin_and_end) {
      text = cleanupBeginAndEnd(text);
    } else {
      // removes single space paddings around the string
      text = text.replace(/^[ ]/g, '').replace(/[ ]$/g, '');
    }

    return text;
  }

  // props @ebraminio/persiantools
  function cleanupZWNJ (text) {
    return text

      // converts all soft hyphens (&shy;) into zwnj
      .replace(/\u00ad/g, '\u200c')

      // removes more than one zwnj
      .replace(/\u200c{2,}/g, '\u200c')

      // cleans zwnj before and after numbers, english words, spaces and punctuations
      .replace(/\u200c([\w\s0-9۰-۹[\](){}«»“”.…,:;?!$%@#*=+\-/\\،؛٫٬×٪؟ـ])/g, '$1')
      .replace(/([\w\s0-9۰-۹[\](){}«»“”.…,:;?!$%@#*=+\-/\\،؛٫٬×٪؟ـ])\u200c/g, '$1')

      // removes unnecessary zwnj on start/end of each line
      .replace(/(^\u200c|\u200c$)/gm, '')
    ;
  }

  // late checks for zwnjs
  function cleanupZWNJLate (text) {
    return text

      // cleans zwnj after characters that don't conncet to the next
      .replace(/([إأةؤورزژاآدذ،؛,:«»\\/@#$٪×*()ـ\-=|])\u200c/g, '$1')
    ;
  }

  // converts numeral and selected html character-sets into original characters
  // @props: @substack/node-ent
  function decodeHTMLEntities (text) {
    return text.replace(/&(#?[^;\W]+;?)/g, function (matched, match) {
      var n;
      if ((n = /^#(\d+);?$/.exec(match))) {
        return String.fromCharCode(parseInt(n[1], 10));
      } else if ((n = /^#[Xx]([A-Fa-f0-9]+);?/.exec(match))) {
        return String.fromCharCode(parseInt(n[1], 16));
      } else {
        var hasSemi = /;$/.test(match);
        var withoutSemi = hasSemi ? match.replace(/;$/, '') : match;
        var target = entities[withoutSemi] || (hasSemi && entities[match]);

        if (typeof target === 'number') {
          return String.fromCharCode(target);
        } else if (typeof target === 'string') {
          return target;
        } else {
          return '&' + match;
        }
      }
    });
  }

  function normalizeEOL (text) {
    return text

      // replaces windows end of lines with unix eol (`\n`)
      .replace(/(\r?\n)|(\r\n?)/g, '\n')
    ;
  }

  function fixDashes (text) {
    return text

      // replaces triple dash to mdash
      .replace(/-{3}/g, '—')

      // replaces double dash to ndash
      .replace(/-{2}/g, '–')
    ;
  }

  function fixThreeDots (text) {
    return text

      // removes spaces between dots
      .replace(/\.([ ]+)(?=[.])/g, '.')

      // replaces three dots with ellipsis character
      .replace(/[ \t]*\.{3,}/g, '…')
    ;
  }

  function normalizeEllipsis (text) {
    return text

      // replaces more than one ellipsis with one
      .replace(/(…){2,}/g, '…')

      // replaces (space|tab|zwnj) after ellipsis with one space
      // NOTE: allows for space before ellipsis
      .replace(/([ ]{1,})*…[ \t\u200c]*/g, '$1… ')
    ;
  }

  function fixEnglishQuotesPairs (text) {
    return text

      // replaces english quote pairs with their persian equivalent
      .replace(/(“)(.+?)(”)/g, '«$2»')
    ;
  }

  // replaces english quote marks with their persian equivalent
  function fixEnglishQuotes (text) {
    return text
      .replace(/(["'`]+)(.+?)(\1)/g, '«$2»')
    ;
  }

  function fixHamzeh (text) {
    var replacement = '$1هٔ$3';
    return text

      // replaces ه followed by (space|ZWNJ|lrm) follow by ی with هٔ
      .replace(/(\S)(ه[\s\u200c\u200e]+[یي])([\s\u200c\u200e])/g, replacement) // heh + ye

      // replaces ه followed by (space|ZWNJ|lrm|nothing) follow by ء with هٔ
      .replace(/(\S)(ه[\s\u200c\u200e]?\u0621)([\s\u200c\u200e])/g, replacement) // heh + standalone hamza

      // replaces هٓ or single-character ۀ with the standard هٔ
      // props @ebraminio/persiantools
      .replace(/(ۀ|هٓ)/g, 'هٔ')
    ;
  }

  function fixHamzehArabic (text) {
    return text

      // converts arabic hamzeh ة to هٔ
      .replace(/(\S)ة([\s\u200c\u200e])/g, '$1هٔ$2')
    ;
  }

  function fixHamzehArabicAlt (text) {
    return text
      // converts arabic hamzeh ة to ه‌ی
      .replace(/(\S)ة([\s\u200c\u200e])/g, '$1ه‌ی$2')
    ;
  }

  function cleanupRLM (text) {
    return text
      // converts Right-to-left marks followed by persian characters to
      // zero-width non-joiners (ZWNJ)
      .replace(/([^a-zA-Z\-_])(\u200F)/g, '$1\u200c')
    ;
  }

  // converts incorrect persian glyphs to standard characters
  function fixPersianGlyphs (text) {
    return arrReplace(text, glyphs);
  }

  // props @ebraminio/persiantools
  function fixMiscNonPersianChars (text) {
    return charReplace(text, 'كڪيىۍېہە', 'ککییییههه');
    // return text
    //   .replace(/ك/g, 'ک') // arabic kaf
    //   .replace(/ڪ/g, 'ک') // arabic letter swash kaf
    //   .replace(/ي/g, 'ی') // arabic
    //   .replace(/ى/g, 'ی') // urdu
    //   .replace(/ۍ/g, 'ی') // pushtu
    //   .replace(/ې/g, 'ی') // uyghur
    //   .replace(/ہ/g, 'ه') // converts &#x06C1; to &#x0647; ہہہہ to ههه
    //   .replace(/[ەھ]/g, 'ه'); // kurdish
  }

  // replaces english numbers with their persian equivalent
  function fixEnglishNumbers (text) {
    return charReplace(text, '1234567890', digits);
  }

  // replaces arabic numbers with their persian equivalent
  function fixArabicNumbers (text) {
    return charReplace(text, '١٢٣٤٥٦٧٨٩٠', digits);
  }

  // @REF: https://github.com/shkarimpour/pholiday/pull/5/files
  function convertPersianNumbers (text) {
    return text.replace(/[\u0660-\u0669\u06f0-\u06f9]/g, function (char) {
      return char.charCodeAt(0) & 0xf;
    });
  }

  function fixNumeralSymbols (text) {
    return text

      // replaces english percent signs (U+066A)
      // props @ebraminio/persiantools
      .replace(/([۰-۹]) ?%/g, '$1٪')

      // replaces dots between numbers into decimal separator (U+066B)
      // props @ebraminio/persiantools
      .replace(/([۰-۹])\.(?=[۰-۹])/g, '$1٫')

      // replaces commas between numbers into thousands separator (U+066C)
      // props @languagetool-org
      .replace(/([۰-۹]),(?=[۰-۹])/g, '$1٬')
    ;
  }

  function normalizeDates (text) {
    return text

      // re-orders date parts with slash as delimiter
      .replace(/([0-9۰-۹]{1,2})([/-])([0-9۰-۹]{1,2})\2([0-9۰-۹]{4})/g, function (matched, day, delimiter, month, year) {
        return year + '/' + month + '/' + day;
      })
    ;
  }

  function fixPunctuations (text) {
    return charReplace(text, ',;', '،؛');
  }

  // replaces question marks with its persian equivalent
  function fixQuestionMark (text) {
    return text
      .replace(/(\?)/g, '\u061F') // \u061F = ؟
    ;
  }

  // puts zwnj between the word and the prefix:
  // - mi* nemi* bi*
  // NOTE: there's a possible bug here: prefixes could be separate nouns
  function fixPerfixSpacing (text) {
    var replacement = '$1\u200c$3';
    return text
      .replace(/((\s|^)ن?می) ([^ ])/g, replacement)
      .replace(/((\s|^)بی) ([^ ])/g, replacement) // props @zoghal
    ;
  }

  // puts zwnj between the word and the suffix
  // NOTE: possible bug: suffixes could be nouns
  function fixSuffixSpacing (text) {
    var replacement = '$1\u200c$2';
    return text

      // must done before others
      // *ha *haye
      .replace(newRegExp('([' + charsPersian + charsDiacritic + ']) (ها(ی)?[' + patternAfter + '])'), replacement)

      // *am *at *ash *ei *eid *eem *and *man *tan *shan
      .replace(newRegExp('([' + charsPersian + charsDiacritic + ']) ((ام|ات|اش|ای|اید|ایم|اند|مان|تان|شان)[' + patternAfter + '])'), replacement)

      // *tar *tari *tarin
      .replace(newRegExp('([' + charsPersian + charsDiacritic + ']) (تر((ی)|(ین))?[' + patternAfter + '])'), replacement)

      // *hayee *hayam *hayat *hayash *hayetan *hayeman *hayeshan
      .replace(newRegExp('([' + charsPersian + charsDiacritic + ']) ((هایی|هایم|هایت|هایش|هایمان|هایتان|هایشان)[' + patternAfter + '])'), replacement)
    ;
  }

  function fixSuffixSpacingHamzeh (text) {
    var replacement = '$1\u0647\u200c\u06cc$3';
    return text

      // heh + ye
      .replace(/(\S)(ه[\s\u200c]+[یي])([\s\u200c])/g, replacement)

      // heh + standalone hamza
      .replace(/(\S)(ه[\s\u200c]?\u0621)([\s\u200c])/g, replacement)

      // heh + hamza above
      .replace(/(\S)(ه[\s\u200c]?\u0654)([\s\u200c])/g, replacement)
    ;
  }

  function fixSuffixMisc (text) {
    return text
      // replaces ه followed by ئ or ی, and then by ی, with ه\u200cای,
      // EXAMPLE: خانه‌ئی becomes خانه‌ای
      // props @ebraminio/persiantools
      .replace(/(\S)ه[\u200c\u200e][ئی]ی([\s\u200c\u200e])/g, '$1ه\u200cای$2')
    ;
  }

  function cleanupExtraMarks (text) {
    return text

      // removes space between different/same marks (combining for cleanup)
      .replace(/([؟?!])([ ]+)(?=[؟?!])/g, '$1')

      // replaces more than one exclamation mark with just one
      .replace(/(!){2,}/g, '$1')
      // replaces more than one english or persian question mark with just one
      .replace(/(\u061F|\?){2,}/g, '$1') // \u061F = `؟`
      // re-orders consecutive marks
      .replace(/(!)([ \t]*)([\u061F?])/g, '$3$1') // `?!` --> `!?`
    ;
  }

  // replaces kashidas to ndash in parenthetic
  function kashidasAsParenthetic (text) {
    return text
      .replace(/(\s)\u0640+/g, '$1–')
      .replace(/\u0640+(\s)/g, '–$1')
    ;
  }

  function cleanupKashidas (text) {
    return text
      // converts kashida between numbers to ndash
      .replace(/([0-9۰-۹]+)ـ+([0-9۰-۹]+)/g, '$1–$2')

      // removes all kashidas between non-whitespace characters
      // MAYBE: more punctuations
      .replace(/([^\s.])\u0640+(?![\s.])/g, '$1')
    ;
  }

  function fixPunctuationSpacing (text) {
    return text
      // removes space before punctuations
      .replace(/[ \t\u200c]*([:;,؛،.؟?!]{1})/g, '$1')

      // removes more than one space after punctuations
      // except followed by new-lines (or preservers)
      .replace(/([:;,؛،.؟?!]{1})[ \t\u200c]*(?!\n|_{2})/g, '$1 ')

      // removes space after colon that separates time parts
      .replace(/([0-9۰-۹]+):\s+([0-9۰-۹]+)/g, '$1:$2')

      // removes space after dots in numbers
      .replace(/([0-9۰-۹]+)\. ([0-9۰-۹]+)/g, '$1.$2')

      // removes space before common domain tlds
      .replace(/([\w\-_]+)\. (ir|com|org|net|info|edu|me)([\s/\\\])»:;.])/g, '$1.$2$3')

      // removes space between different/same marks (double-check)
      .replace(/([؟?!])([ ]+)(?=[؟?!])/g, '$1')
    ;
  }

  function fixBracesSpacing (text) {
    var replacement = ' $1$2$3 ';
    return text
      // removes inside spaces and more than one outside
      // for `()`, `[]`, `{}`, `“”` and `«»`
      .replace(/[ \t\u200c]*(\()\s*([^)]+?)\s*?(\))[ \t\u200c]*/g, replacement)
      .replace(/[ \t\u200c]*(\[)\s*([^\]]+?)\s*?(\])[ \t\u200c]*/g, replacement)
      .replace(/[ \t\u200c]*(\{)\s*([^}]+?)\s*?(\})[ \t\u200c]*/g, replacement)
      .replace(/[ \t\u200c]*(“)\s*([^”]+?)\s*?(”)[ \t\u200c]*/g, replacement)
      .replace(/[ \t\u200c]*(«)\s*([^»]+?)\s*?(»)[ \t\u200c]*/g, replacement)
    ;
  }

  function fixBracesSpacingInside (text) {
    var replacement = '$1$2$3';
    return text
      // removes inside spaces for `()`, `[]`, `{}`, `“”` and `«»`
      .replace(/(\()\s*([^)]+?)\s*?(\))/g, replacement)
      .replace(/(\[)\s*([^\]]+?)\s*?(\])/g, replacement)
      .replace(/(\{)\s*([^}]+?)\s*?(\})/g, replacement)
      .replace(/(“)\s*([^”]+?)\s*?(”)/g, replacement)
      .replace(/(«)\s*([^»]+?)\s*?(»)/g, replacement)

      // NOTE: must be here, wierd not working if on `markdownNormalizeBraces()`
      // removes markdown link spaces inside normal ()
      .replace(/(\(\[.*?\]\(.*?\))\s+(\))/g, '$1$2')
    ;
  }

  function markdownNormalizeBraces (text) {
    return text
      // removes space between ! and opening brace on markdown images
      // EXAMPLE: `! [alt] (src)` --> `![alt](src)`
      .replace(/! (\[.*?\])[ ]?(\(.*?\))[ ]?/g, '!$1$2')

      // removes spaces between [] and ()
      // EXAMPLE: `[text] (link)` --> `[text](link)`
      .replace(/(\[.*?\])[ \t]+(\(.*?\))/g, '$1$2')

      // removes spaces inside double () [] {}
      // EXAMPLE: `[[ text ]]` --> `[[text]]`
      .replace(/\(\([ \t]*(.*?)[ \t]*\)\)/g, '(($1))')
      .replace(/\[\[[ \t]*(.*?)[ \t]*\]\]/g, '[[$1]]')
      .replace(/\{\{[ \t]*(.*?)[ \t]*\}\}/g, '{{$1}}')
      .replace(/\{\{\{[ \t]*(.*?)[ \t]*\}\}\}/g, '{{{$1}}}') // mustache escape

      // removes spaces between double () [] {}
      // EXAMPLE: `[[text] ]` --> `[[text]]`
      .replace(/(\(\(.*\))[ \t]+(\))/g, '$1$2')
      .replace(/(\[\[.*\])[ \t]+(\])/g, '$1$2')
      .replace(/(\{\{.*\})[ \t]+(\})/g, '$1$2')
    ;
  }

  function markdownNormalizeLists (text) {
    return text
      // removes extra line between two items list
      .replace(/((\n|^)\*.*?)\n+(?=\n\*)/g, '$1')
      .replace(/((\n|^)-.*?)\n+(?=\n-)/g, '$1')
      .replace(/((\n|^)#.*?)\n+(?=\n#)/g, '$1')
    ;
  }

  function fixMiscSpacing (text) {
    return text

      // removes space before parentheses on misc cases
      .replace(/ \((ص|عج|س|ع|ره)\)/g, '($1)')

      // removes space before braces containing numbers
      .replace(/ \[([0-9۰-۹]+)\]/g, '[$1]')
    ;
  }

  function fixDiacritics (text) {
    return text
      // cleans zwnj before diacritic characters
      .replace(newRegExp('\u200c([' + charsDiacritic + '])'), '$1')

      // cleans more than one diacritic characters
      // props @languagetool-org
      .replace(newRegExp('(.*)([' + charsDiacritic + ']){2,}(.*)'), '$1$2$3')

      // cleans spaces before diacritic characters
      .replace(newRegExp('(\\S)[ ]+([' + charsDiacritic + '])'), '$1$2')
    ;
  }

  function removeDiacritics (text) {
    return text

      // removes all diacritic characters
      .replace(newRegExp('[' + charsDiacritic + ']+'), '')
    ;
  }

  function cleanupSpacing (text) {
    return text

      // replaces more than one space with just a single one
      // except before/after preservers and before new-lines
      // .replace(/(?<![_]{2})([ ]{2,})(?![_]{2}|\n)/g, ' ') // WORKS: using lookbehind
      .replace(/([^_])([ ]{2,})(?![_]{2}|\n)/g, '$1 ')

      // cleans whitespace/zwnj between new-lines
      // @REF: https://stackoverflow.com/a/10965543/
      .replace(/\n[\s\u200c]*\n/g, '\n\n')
    ;
  }

  function cleanupLineBreaks (text) {
    return text

      // cleans more than two contiguous line-breaks
      .replace(/\n{2,}/g, '\n\n')
    ;
  }

  function cleanupBeginAndEnd (text) {
    return text

      // removes space/tab/zwnj/nbsp from the beginning of the new-lines
      .replace(/([\n]+)[ \t\u200c\u00a0]*/g, '$1')

      // removes spaces, tabs, zwnj, direction marks and new lines from
      // the beginning and end of text
      // @REF: http://stackoverflow.com/a/38490203
      .replace(/^[\s\u200c\u200e\u200f]+|[\s\u200c\u200e\u200f]+$/g, '')
    ;
  }

  function flipPunctuations (text) {
    var end = ['-'];
    var start = ['!', '.', '،', '…', '"'];
    var before = [];
    var after = [];

    text = fixThreeDots(text);

    for (var iStart = 0; iStart < start.length; iStart++) {
      var sElement = start[iStart];
      var sReg = newRegExp('^\\' + sElement, 'i');
      if (sReg.test(text)) {
        text = text.replace(sReg, '').trim();
        after.push(sElement);
      }
    }

    for (var iEnd = 0; iEnd < end.length; iEnd++) {
      var eElement = end[iEnd];
      var eReg = newRegExp('\\' + eElement + '$', 'i');
      if (eReg.test(text)) {
        text = text.replace(eReg, '').trim();
        before.push(eElement);
      }
    }

    for (var iBefore = 0; iBefore < before.length; iBefore++) {
      text = before[iBefore] + ' ' + text;
    }

    for (var iAfter = 0; iAfter < after.length; iAfter++) {
      text += after[iAfter];
    }

    return normalizeEllipsis(text);
  }

  // swap incorrect quotes pairs `»«` to `«»` and `”“` to `“”`
  function swapQuotes (text) {
    return text
      .replace(/(»)(.+?)(«)/g, '«$2»')
      .replace(/(”)(.+?)(“)/g, '“$2”')
    ;
  }

  Virastar.prototype = {

    // public methods
    defaults: defaults,
    cleanup: cleanup,

    // internal methods
    // cleanupZWNJ: cleanupZWNJ,
    // cleanupZWNJLate: cleanupZWNJLate,
    // decodeHTMLEntities: decodeHTMLEntities,
    // normalizeEOL: normalizeEOL,
    // fixDashes: fixDashes,
    // fixThreeDots: fixThreeDots,
    // normalizeEllipsis: normalizeEllipsis,
    // fixEnglishQuotesPairs: fixEnglishQuotesPairs,
    // fixEnglishQuotes: fixEnglishQuotes,
    // fixHamzeh: fixHamzeh,
    // fixHamzehArabic: fixHamzehArabic,
    // fixHamzehArabicAlt: fixHamzehArabicAlt,
    // cleanupRLM: cleanupRLM,
    // fixPersianGlyphs: fixPersianGlyphs,
    // fixMiscNonPersianChars: fixMiscNonPersianChars,
    // fixEnglishNumbers: fixEnglishNumbers,
    // fixArabicNumbers: fixArabicNumbers,
    // fixNumeralSymbols: fixNumeralSymbols,
    // fixPunctuations: fixPunctuations,
    // fixQuestionMark: fixQuestionMark,
    // fixPerfixSpacing: fixPerfixSpacing,
    // fixSuffixSpacing: fixSuffixSpacing,
    // fixSuffixSpacingHamzeh: fixSuffixSpacingHamzeh,
    // fixSuffixMisc: fixSuffixMisc,
    // cleanupExtraMarks: cleanupExtraMarks,
    // kashidasAsParenthetic: kashidasAsParenthetic,
    // cleanupKashidas: cleanupKashidas,
    // fixPunctuationSpacing: fixPunctuationSpacing,
    // fixBracesSpacing: fixBracesSpacing,
    // fixBracesSpacingInside: fixBracesSpacingInside,
    // markdownNormalizeBraces: markdownNormalizeBraces,
    // markdownNormalizeLists: markdownNormalizeLists,
    // fixDiacritics: fixDiacritics,
    // cleanupSpacing: cleanupSpacing,
    // cleanupLineBreaks: cleanupLineBreaks,
    // cleanupBeginAndEnd: cleanupBeginAndEnd,

    // extra methods
    convertPersianNumbers: convertPersianNumbers,
    flipPunctuations: flipPunctuations,
    swapQuotes: swapQuotes
  };

  return Virastar;
}));


/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/edit-post":
/*!**********************************!*\
  !*** external ["wp","editPost"] ***!
  \**********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["editPost"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "@wordpress/notices":
/*!*********************************!*\
  !*** external ["wp","notices"] ***!
  \*********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["notices"];

/***/ }),

/***/ "@wordpress/plugins":
/*!*********************************!*\
  !*** external ["wp","plugins"] ***!
  \*********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["plugins"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/plugins */ "@wordpress/plugins");
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_plugins__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_edit_post__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/edit-post */ "@wordpress/edit-post");
/* harmony import */ var _wordpress_edit_post__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_edit_post__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_notices__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/notices */ "@wordpress/notices");
/* harmony import */ var _wordpress_notices__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_notices__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__);







var Virastar = __webpack_require__(/*! virastar */ "./node_modules/virastar/lib/virastar.js");
var virastar = new Virastar();
(0,_wordpress_plugins__WEBPACK_IMPORTED_MODULE_1__.registerPlugin)('wpp-virastar', {
  render() {
    const {
      createWarningNotice,
      createSuccessNotice
    } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useDispatch)(_wordpress_notices__WEBPACK_IMPORTED_MODULE_4__.store);
    const handleVirastar = e => {
      const WppOptions = parseWPLocalizedOptions();
      e.target.classList.add('disabled');
      let title = wp.data.select('core/editor').getEditedPostAttribute('title');
      let excerpt = wp.data.select('core/editor').getEditedPostAttribute('excerpt');
      wp.data.dispatch('core/editor').editPost({
        title: virastar.cleanup(title, WppOptions)
      });
      wp.data.dispatch('core/editor').editPost({
        excerpt: virastar.cleanup(excerpt, WppOptions)
      });
      const blocks = wp.data.select('core/block-editor').getBlocks();
      blocks.forEach(wppVirastarReviewBlock);
      virastarSuccess();
      e.target.classList.remove('disabled');
    };
    const virastarError = () => createWarningNotice((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Virastar reviewed content successfully!'), {
      type: 'snackbar',
      icon: '😵‍💫'
    });
    const virastarSuccess = () => createSuccessNotice((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Virastar reviewed content successfully!'), {
      type: 'snackbar',
      icon: '😍'
    });
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_edit_post__WEBPACK_IMPORTED_MODULE_2__.PluginDocumentSettingPanel, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('✍️ Parsi Virastar', 'wp-parsidate'),
      className: "wpp-virastar-panel",
      initialOpen: "true"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.Button, {
      variant: "primary",
      className: "wpp-run-virastar",
      onClick: handleVirastar
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Run Virastar', 'wp-parsidate')));
  }
});
const wppVirastarReviewBlock = block => {
  const WppOptions = parseWPLocalizedOptions();
  if (!!block.attributes.content && !!block.attributes.content.length) {
    wp.data.dispatch('core/block-editor').updateBlockAttributes(block.clientId, {
      content: virastar.cleanup(block.attributes.content, WppOptions)
    });
  }
  if (!!block.innerBlocks.length) {
    let innerBlocks = block.innerBlocks;
    innerBlocks.forEach(wppVirastarReviewBlock);
  }
};
function parseWPLocalizedOptions() {
  if (WPPVirastarOptions === "undefined") {
    return {};
  } else {
    let parsedArr = {};
    let injectedOptions = Object.keys(WPPVirastarOptions);
    injectedOptions.forEach((item, index) => parsedArr[item] = !!+WPPVirastarOptions[item]);
    return parsedArr;
  }
}
}();
/******/ })()
;
//# sourceMappingURL=index.js.map