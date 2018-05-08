
## SoundFlow script for reconform tests
```js
function readEdl(path)
{
    var lines = sf.file.readLines({ path: path }).lines;

    var entries = [];
    for(var i=0; i<lines.length; i++)
    {
        var line = lines[i];

        var ch = line.charCodeAt(0);
        if (ch >= 48 && ch <= 59)
        {
            //Starts with a number
            var cols = line.split(' ');
            for(var c=cols.length-1; c>=0; c--) if (!cols[c].length) cols.splice(c, 1);
            var tcArray = cols.slice(-4);

            var entry = {
                sourceIn: tcArray[0],
                sourceOut: tcArray[1],
                destIn: tcArray[2],
                destOut: tcArray[3]
            };
            entries.push(entry);
        }
        else
            continue;
    }
    return entries;
}

var entries = readEdl('/Users/chr/Desktop/change.edl');

for(var i=0; i<entries.length; i++)
{
    var entry = entries[i];

    sf.ui.proTools.selectionSetTimecode({
        selectionStart: entry.sourceIn,
        selectionEnd: entry.sourceOut
    });
    sf.ui.proTools.menuClickMenu({ menuPath: ['Edit', 'Copy'] });

    sf.ui.proTools.selectionSetTimecode({
        selectionStart: entry.destIn,
        selectionEnd: entry.destOut
    });
    sf.ui.proTools.menuClickMenu({ menuPath: ['Edit', 'Paste'] });
    
}
```
## Sample EDL
```
TITLE:   EVM_PICTURELOCK_080318_EDL 
FCM: NON-DROP FRAME
000001  PICTURELOCK_210218_REF_H264      V     C        00:00:00:00 00:07:39:12 00:59:54:24 01:07:34:11 
*FROM CLIP NAME:  PICTURELOCK_210218_REF_H264 
*SOURCE FILE: PICTURELOCK_210218_REF_H264
000002  PICTURELOCK_210218_REF_H264      V     C        00:08:20:11 00:19:28:10 01:07:45:00 01:18:52:24 
*FROM CLIP NAME:  PICTURELOCK_210218_REF_H264 
*SOURCE FILE: PICTURELOCK_210218_REF_H264
```
