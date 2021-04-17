/*let stack = [];
let minStack = [];

stack.push(-2);
minStack.push(-2);

stack.push(-2);

stack.push(-3);
minStack.push(-3);
*/

class MinStack {

    constructor() {
        this.stack = [];
        this.minStack = [];
    }

    /**
     *  -- Push element x onto stack.
     */
    push(x) {
        this.stack.push(x);
        if (this.minStack.length === 0) {
            this.minStack.push(x);
        } else {
            let min = this.minStack[this.minStack.length - 1];
            if (x <= min) {
                this.minStack.push(x);
            }
        }
    }

    /**
     * -- Removes the element on top of the stack.
     */
    pop() {
        if (this.stack.length) {
            let poped = this.stack.pop();
            if (poped === this.minStack[this.minStack.length - 1]) {
                this.minStack.pop();
            }
            return poped;
        }
        return null;
    }

    /**
     *  -- Get the top element.
     */
    top() {
        if (this.stack.length) {
            return this.stack[this.stack.length - 1];
        }
        return null;
    }

    /**
     *  -- Retrieve the minimum element in the stack.
     */
    getMin() {
        if (this.minStack.length) {
            return this.minStack[this.minStack.length - 1];
        }
        return null;
    }
}

let minStack = new MinStack();
minStack.push(1);
minStack.push(2);
minStack.push(0);
minStack.push(-1);
console.log(minStack.getMin());
console.log(minStack.pop());
console.log(minStack.getMin());
console.log(minStack.top());