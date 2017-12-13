const path = require('path')
const fs = require('fs')

const categories = ['Pd', 'Zs']
const filename = path.join(__dirname, 'table.js')
generate(categories, filename)

/*
Letter
Lu	Letter uppercase	
Ll	Letter lowercase	
Lt	Letter titlecase
Lm	Letter modifier
Lo	Letter other

Mark
Mn	Mark nonspacing		
Mc	Mark spacing combining	
Me	Mark enclosing

Number
Nd	Number decimal digit
Nl	Number letter
No	Number other

Punctuation
Pc	Punctuation connector
Pd	Punctuation dash
Ps	Punctuation open
Pe	Punctuation close
Pi	Punctuation initial quote
Pf	Punctuation final quote
Po	Punctuation other

Symbol
Sm	Symbol math
Sc	Symbol currency
Sk	Symbol modifier	
So	Symbol other

Separator
Zs	Separator space
Zl	Separator line
Zp	Separator paragraph

Other
Cc	Other control
Cf	Other format
Cs	Other surrogate
Co	Other private use
Cn	Other not assigned
*/

function generate(categories, filename) {
    let output = 'module.exports = {'

    categories.forEach((cat, catIdx) => {
        let data = require('unicode/category/' + cat),
            keys = Object.keys(data),
            length = keys.length,
            content = ''

        if (catIdx > 0) {
            output += ','
        }
        for (let i = 0; i < length; i++) {
            if (i > 0) {
                content += ','
            }
            let entity = data[keys[i]]
            content += JSON.stringify({
                code: entity.value,
                name: entity.name.toLowerCase(),
                symbol: entity.symbol
            })
        }
        output += cat + ':[' + content + ']'
    })

    output += '}'
    fs.writeFileSync(filename, output, {
        encoding: 'utf8'
    })
    console.log('lookup table was generated successfully')
}