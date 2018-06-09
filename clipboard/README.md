# Clipboard scripts
[Home](../)

## Set clipboard text
```js
sf.clipboard.setText({
    text: 'One two three'
});
```

## Wait for clipboard text for 2 seconds and store in text variable
```js
var text = sf.clipboard.waitForText({
    timeoutMs: 2000    
}).text;
```
