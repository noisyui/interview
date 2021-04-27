
setImmediate(() => {
    console.log(1);
    setTimeout(() => {
        console.log(2);
    }, 10);
    setImmediate(() => {
        console.log(3);
    });
    process.nextTick(() => {
        console.log(4);
    });
});

process.nextTick(() => {
    console.log(5);
    setTimeout(() => {
        console.log(6);
    }, 10);
    setImmediate(() => {
        console.log(7);
    });
    process.nextTick(() => {
        console.log(8);
    });
});

console.log(9);

// result: 9 5 8 1 4 7 3 6 2
