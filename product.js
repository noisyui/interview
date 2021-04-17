/**
 * Given an array nums of n integers where n > 1, return an array output such that output[i] is equal to the product of all the elements of nums except nums[i].

Example:

Input: [1,2,3,4]
Output: [24,12,8,6]
Constraint: It's guaranteed that the product of the elements of any prefix or suffix of the array (including the whole array) fits in a 32 bit integer.

Note: Please solve it without division and in O(n).
 */

function product(nums) {
    let ans = [];

    let left = [1];
    let right = [1];

    let leftProduct = 1;
    let rightProduct = 1;

    for (let i = 0; i < nums.length - 1; i++) {
        leftProduct *= nums[i];
        left.push(leftProduct);
    }
    for (let i = nums.length - 1; i > 0; i--) {
        rightProduct *= nums[i];
        right.unshift(rightProduct);
    }

    for (let i = 0; i < nums.length; i++) {
        ans[i] = left[i] * right[i];
    }

    return ans;
}

let ans = product([1,2,3,4]);
for(let a of ans) {
    console.log(a);
}

