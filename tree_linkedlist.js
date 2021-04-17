function Node(val) {
    this.val = val;
    this.next = null;
}

function TreeNode(val) {
    this.val = val;
    this.left = null;
    this.right = null;
}

function convert(root) {
    let temp = new Node(0);
    let dumb = temp;

    let buildTree = function (root) {
        if (root) {
            buildTree(root.left);
            let node = new Node(root.val);
            temp.next = node;
            temp = temp.next;
            buildTree(root.right);
        }
    }

    buildTree(root);
    return dumb.next;
}

let root = new TreeNode(2);
root.left = new TreeNode(1);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right = new TreeNode(3);
root.right.left = new TreeNode(7);
root.right.right = new TreeNode(10);

let node = convert(root);
while (node) {
    console.log(node.val);
    node = node.next;
}