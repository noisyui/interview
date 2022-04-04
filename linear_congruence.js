/**
 * The puzzle comes from a test in school: Put 11.2L liquid into bottles with volume 500ml and 300ml, when 
 * injecting, 20ml liquid will be wasted each time. Try to put as much as possible into bottles with least waste.
 * Then how many bottles of each should be prepared?
 * Simplify from y = 21 in equation 8x + 13y = 280 ====> 5y' % 8 = 1 ====> y' = 5 ====> x = (5 * 13 + 7) / 8 = 9 and y = 21 - 5 = 16.
 * Here x stands for number of 300ml bottles, y for number of 500ml bottles, y' for subtracted number of 500ml bottles from 21
 * So 9 bottles of volume 300ml and 16 bottles of volume 500ml should be prepared, to achieve lease waste
 * 
 * Actually this a classic problem in math called linear congruence. Here is another general example: 6x % 17 = 3, 
 * and the answer will be 9, as 6 * 9 % 17 = 54 % 17 = 3. It will be taken as an example in this function.
 * And the algorighm complexity only determines by the factor parameter.
 * 
 * @param factor is 6
 * @param mod is 17 
 * @param remainder is 3
 * @returns the least positive integer number satifies the equation
 * 
 */
let linearCongruence = (factor, mod, remainder) => {
    if (remainder >= mod) {
        throw Error(`Invalid equation: remainder(${remainder}) is greater than or equal to mod(${mod})`);
    }

    if (factor > mod) {
        factor = factor % mod;
    }

    if (factor === 1) return remainder;

    if ((mod % factor === 0) && (remainder % factor !== 0)) {
        throw Error(`The equation has no solution: ${factor}x % ${mod} = ${remainder}`);
    }

    // 3 % 6 = 3
    let target = remainder % factor;

    // 17 % 6 = 5
    let lack = mod % factor;
    // 6 - 5 = 1
    let exceed = factor - lack;

    // 17 / 6 = 2
    let times = Math.floor(mod / factor);

    // 6
    let initialRemainder = factor;

    let ans = 0;

    // initialReminder will change in this way: 6 -> 1 -> 2 -> 3 
    // 6, 12 (times = 2)
    // 6 - 5 = 1, 7, 13 (times = 3)
    // 1 + 1 = 2, 8, 14 (times = 3)
    // 2 + 1 = 3, hit the target
    // the anser will be 2 + 3 + 3 + 1 = 9
    while (initialRemainder !== target) {
        if (initialRemainder <= lack) ans += (times + 1);
        else ans += times;

        let temp = initialRemainder + exceed; 
        if (temp < factor) {
            initialRemainder = temp;
        } else {
            initialRemainder = initialRemainder - lack;
        }
    }

    // if the remainder is, e.g. 15, then (15 - 3) / 6 = 2 should be added to ans, and also 3 itself(1).
    return ans + (remainder - target) / factor + 1;
}

/**
 * Simple but slow version for purpose of verify and test.
 * @param {*} factor 
 * @param {*} mod 
 * @param {*} remainder 
 * @returns 
 */
let loopVersion = (factor, mod, remainder) => {
    let ans = 1;
    let temp = factor % mod;
    while ((ans * temp) % mod !== remainder) ans++;
    return ans;
}

let exceptionTest = (factor, mod, remainder) => {
    try {
        linearCongruence(factor, mod, remainder);
    } catch (error) {
        console.error(error.message);
    }
}

console.log(linearCongruence(6, 17, 3) === 9);
console.log(linearCongruence(5, 8, 1) === 5);
console.log(linearCongruence(59, 89, 13) === 50);
console.log(linearCongruence(15, 22, 16) === 4);
console.log(linearCongruence(1, 22, 16) === 16);
console.log(linearCongruence(594581909, 893409561, 13454) === 630165805);
exceptionTest(5, 10, 3);
exceptionTest(5, 8, 10);

let timeTaken = "Time taken by linearCongruence";
console.time(timeTaken);
console.log(linearCongruence(594581, 893409561, 13454));
// console.log(linearCongruence(5945801, 89340956561, 1334454));
console.timeEnd(timeTaken);

let timeTaken1 = "Time taken by loopVersion";
console.time(timeTaken1);
console.log(loopVersion(594581, 893409561, 13454));
// console.log(loopVersion(5945801, 89340956561, 1334454));
console.timeEnd(timeTaken1);