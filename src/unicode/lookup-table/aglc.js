// Loose interpretation of Adobe Glyph List in categories
// Important: each glyph can be assigned to multiple categories

// properties:
// `category` maps from Unicode General Category
// `block` maps from Unicode Block

module.exports = [
    {
        name: 'Basic Latin and Latin 1',
        category: [],
        block: ['1', '2']
    },
    {
        name: 'Extended Latin A',
        category: [],
        block: ['3', '67']
    },
    {
        name: 'Extended Latin B',
        category: [],
        block: ['4']
    },
    {
        name: 'Punctuation',
        category: ['Mn', 'Po', 'Ps', 'Pe', 'Pd', 'Pi', 'Pf', 'Pc'],
        block: ['69']
    },
    {
        name: 'Dashes & Quotes',
        category: ['Pc', 'Pd', 'Pi', 'Pf'],
        block: []
    },
    {
        name: 'Currency',
        category: ['Sc'],
        block: []
    },
    {
        name: 'Numbers',
        category: ['No'],
        block: ['74']
    },
    {
        name: 'Math Symbols',
        category: ['Sm'],
        block: []
    },
    {
        name: 'Symbols',
        category: ['So', 'Sk'],
        block: []
    },
    {
        name: 'Greek and Coptic',
        category: [],
        block: ['8']
    }
]

/*
categories: {
    Lu: 'Letter, uppercase',
    Sm: 'Symbol, math',
    Sc: 'Symbol, currency',
    So: 'Symbol, other',
    Ll: 'Letter, lowercase',
    Sk: 'Symbol, modifier',
    Mn: 'Mark, nonspacing',
    Lo: 'Letter, other',
    Po: 'Punctuation, other',
    Ps: 'Punctuation, open',
    Pe: 'Punctuation, close',
    Lm: 'Letter, modifier',
    Nd: 'Number, decimal digit',
    Pd: 'Punctuation, dash',
    No: 'Number, other',
    Pi: 'Punctuation, initial quote',
    Pf: 'Punctuation, final quote',
    Zs: 'Separator, space',
    Pc: 'Punctuation, connector'
},
blocks: {
    '1': 'Basic Latin',
    '2': 'Latin-1 Supplement',
    '3': 'Latin Extended-A',
    '4': 'Latin Extended-B',
    '6': 'Spacing Modifier Letters',
    '7': 'Combining Diacritical Marks',
    '8': 'Greek and Coptic',
    '67': 'Latin Extended Additional',
    '69': 'General Punctuation',
    '71': 'Currency Symbols',
    '73': 'Letterlike Symbols',
    '74': 'Number Forms',
    '75': 'Arrows',
    '76': 'Mathematical Operators',
    '77': 'Miscellaneous Technical',
    '81': 'Box Drawing',
    '82': 'Block Elements',
    '83': 'Geometric Shapes',
    '84': 'Miscellaneous Symbols'
}
*/
