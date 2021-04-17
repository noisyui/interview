function TreeNode(val) {
    this.val = val;
    this.left = null;
    this.right = null;
};

let createTree = array => {
    if (!array || array.length === 0) return null;

    let root = new TreeNode(array[0]);
    let queue = [root];
    let index = 1;

    while (index < array.length) {
        let len = queue.length;
        while (len && index < array.length) {
            let node = queue.shift();
            node.left = new TreeNode(array[index++]);
            queue.push(node.left);
            if (index < array.length) {
                node.right = new TreeNode(array[index++]);
                queue.push(node.right);
            }
            len--;
        }
    }

    return root;
};

let traverseTree = root => {
    let depthGot = false;
    let depth = 1;
    let recursive = (root) => {
        if (!root) return;
        if (!root.left && !root.right) {
            depthGot = true;
        }
        if (!depthGot) {
            depth++;
        }
        recursive(root.left);
        console.log(root.val);
        recursive(root.right);
    }

    recursive(root);
    return depth;
};

let array1 = [1, 2, 3, 4, 5];
let array2 = [1, 2, 3, 4, 5, 6, 7, 9, 3, 5, 20];

let tree1 = createTree(array1);
let depth1 = traverseTree(tree1);

let tree2 = createTree(array2);
let depth2 = traverseTree(tree2);

let constructTree = array => {
    let recursive = (l, r) => {
        if (l > r) return;
        let mid = Math.floor((l + r) / 2);
        let node = new TreeNode(array[mid]);
        node.left = recursive(l, mid - 1);
        node.right = recursive(mid + 1, r);
        return node;
    }
    return recursive(0, array.length - 1);
};

let root = constructTree([1, 2, 3, 4]);
