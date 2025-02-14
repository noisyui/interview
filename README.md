# interview

Here is a collection of interview code tests.

## du.cpp 
This is a command line tool used to generate the information of user-specified directory, such as path and size of each sub directory and file.

![](du/du.png)

## linear_congruence.js
The puzzle comes from a test in school: Put 11.2L liquid into bottles with volume 500ml and 300ml, when 
injecting, 20ml liquid will be wasted each time. Try to put as much as possible into bottles with least waste.
Then how many bottles of each should be prepared? (Any bottle must be filled)

Simplify from y = 21 in equation 8x + 13y = 280 ====> 5y' % 8 = 1 ====> y' = 5 ====> x = (5 * 13 + 7) / 8 = 9 and y = 21 - 5 = 16.
Here x stands for number of 300ml bottles, y for number of 500ml bottles, y' for subtracted number of 500ml bottles from 21
So 9 bottles of volume 300ml and 16 bottles of volume 500ml should be prepared, to achieve lease waste

Actually this a classic problem in math called linear congruence. Here is another general example: 6x % 17 = 3, 
and the answer will be 9, as 6 * 9 % 17 = 54 % 17 = 3. It will be taken as an example in this function.
And the algorighm complexity is mainly determined by the factor parameter.
