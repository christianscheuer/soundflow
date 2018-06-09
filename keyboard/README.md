# Keyboard
[Home](../README.md)


## Hold down modifiers
```js
//Start holding down Shift
sf.keyboard.modifiers({
    isShift: true
});

//Start holding down Shift and Option
sf.keyboard.modifiers({
    isShift: true,
    isOption: true
});

//Start holding down Control
sf.keyboard.modifiers({
    isControl: true
});

//Start holding down all 4 modifiers
sf.keyboard.modifiers({
    isShift: true,
    isOption: true,
    isCommand: true,
    isControl: true
});

//Release all modifiers
sf.keyboard.modifiers();
```

