const fs = require('fs');

let MAX_SPECS_COUNT = 100;
let testData = fs.readFileSync("./specs/sample.spec.js", 'utf8');

for (let i = 0; i < MAX_SPECS_COUNT; i++) {
    let content = testData
        .replace("My test: describe", "My suite " + i)
        .replace("My failed test", "My failed test#" + i)
        .replace("My random failed test", "My random failed test#" + i)
    fs.writeFileSync(`./specs/sample_${i}.spec.js`, content)
}


