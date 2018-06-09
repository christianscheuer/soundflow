# Memory Locations (Pro Tools)
[Back to Pro Tools](./README.md)


## Go to a specific memory location (11)
```js
sf.ui.proTools.memoryLocationsGoto({
	memoryLocationNumber: 11,
	restoreWindowOpenState: true,
	useKeyboard: true,
});
```

## Select between two memory locations (1 and 4)
```js
 sf.ui.proTools.memoryLocationsGoto({
    memoryLocationNumber: 1,
    restoreWindowOpenState: true,
    useKeyboard: true,
});

sf.ui.proTools.memoryLocationsGoto({
    extendSelection: true,
    memoryLocationNumber: 4,
    restoreWindowOpenState: true,
    useKeyboard: true,
});
```

