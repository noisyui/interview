/**
 * Input: nums = [1,3,-1,-3,5,3,6,7], and k = 3
Output: [3,3,5,5,6,7] 
Explanation: 
Window position                Max
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
 */

function windowMax(nums, k) {
    let ans = [];

    let start = 0;
    let preMax = -Number.MAX_VALUE;

    while (start < nums.length - k + 1) {
        let end = start + k;
        if (start > 0 && nums[start - 1] !== preMax) {
            preMax = Math.max(preMax, nums[end - 1])
        } else {
            preMax = nums[start];
            for (let i = start; i < end; i++) {
                if (nums[i] > preMax) preMax = nums[i];
            }
        }

        ans.push(preMax);

        // update
        start++;
    }

    return ans;
}


let ans = windowMax([1,3,-1,-3,5,3,6,7], 3);
for(let a of ans) {
    console.log(a);
}

