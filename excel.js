/**
 * Problem Statement
Excel is a very successful Microsoft product, used by billions of people around the world.
A common problem our customers are facing is that they create Excel sheets which cannot be correctly evaluated.
We want to create a "spell checker" to reduce these errors.

A simple Excel sheet contains columns AA to ZZ and rows between 00 to 99. For example, AA00 is the top-left cell and MN54 is approximately in the middle.

Each cell contains rational numbers or a mathematical expression, potentially referencing other cells. An empty cell can be assumed to contain the number 0.

An Excel sheet can be evaluated if it is possible to deterministically expand all mathematical expressions to rational numbers.

For example:

This Excel sheet can be evaluated:


Input Data
The data is given as a list of cells and values (either as an array of strings or from a file), in random order:

Example 1
AA00 = 10
AA01 = AA00 + AB00
AB00 = 15
Your program will output: The Excel sheet can be evaluated.

Example 2
AA00 = 10
AB00 = (AA00 + AA01) * 15
AA01 = 20 + AB00

Your program will output: The Excel sheet cannot be evaluated.
 */

function canEvaluated(strArray) {
    function recursive(key, valArray) {
        if (valArray === null) return true;
        if (valArray.indexOf(key) !== -1) return false;
        for (let val of valArray) {
            let valArr = map.get(val);
            if (!recursive(key, valArr)) return false;
        }
        return true;
    }

    let map = new Map();
    for (let str of strArray) {
        let pair = str.split('=');
        let values = pair[1].match(/[A-Z]{2}[0-9]{2}/g);
        map.set(pair[0].trim(), values);
    }

    for (let key of map.keys()) {
        if (!recursive(key, map.get(key))) return false;
    }

    return true;
}

// let res = canEvaluated(['AA00 = 10', 'AA01 = AA00 + AB00', ' AB00 = 15']);
let res = canEvaluated(['AA00 = 10', 'AB00 = (AA00 + AA01) * 15', 'AA01 = 20 + AB00']);
console.log(res);
