## SoundFlow script

```js
var startFromMemoryLocationNumber = 1;
var edlPath = '/Users/chr/Desktop/MYEDLFILEHERE.edl';
var skipClipsWithNoSceneName = true;

function readEdl(path)
{
    var lines = sf.file.readLines({ path: path }).lines;

    var entries = [];
    var lastEntry;
    for(var i=0; i<lines.length; i++)
    {
        var line = lines[i];

        var ch = line.charCodeAt(0);
        var chr = line[0];
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
            lastEntry = entry;
            entries.push(entry);
        }
        else if (chr == '*')
        {
            var els = line.substring(1).split(':');
            if (els[0].trim() == 'FROM CLIP NAME')
            {
                var clipName = line.substring(1 + els[0].length + 1);
                if (lastEntry) lastEntry.clipName = clipName;
            }
        }
        else
            continue;
    }
    return entries;
}

function getSceneName(entry)
{
    if (!entry.clipName)
        return { name: "", valid: false };

    if (entry.clipName.indexOf('/') >= 0)
    {
        var els = entry.clipName.split('/');
        var name = els[0] + '/' + els[1].split(' ')[0];
        return { name: name, valid: true };
    }
    else
        return { name: entry.clipName, valid: false };
}

function mergeEntriesByScene(entries)
{
    var result = [];
    var lastSceneName;
    for(var i=0; i<entries.length; i++)
    {
        var entry = entries[i];

        var sceneNameObj = getSceneName(entry);
        if (!sceneNameObj.valid && skipClipsWithNoSceneName)
            continue;
        var sceneName = sceneNameObj.name;

        if (sceneName !== lastSceneName || sceneName === "" || lastSceneName === undefined)
        {
            entry.sceneName = sceneName;
            result.push(entry);
            lastSceneName = sceneName;
        }
    }
    return result;
}

sf.ui.proTools.appActivateMainWindow();

var entries = mergeEntriesByScene(readEdl(edlPath));
var memLocNum = startFromMemoryLocationNumber;
for(var i=0; i<entries.length; i++)
{
    var entry = entries[i];

    sf.ui.proTools.selectionSetTimecode({
        selectionStart: entry.destIn
    });

    sf.ui.proTools.menuClickMenu({ menuPath: ['Edit', 'Separate Clip', 'At Selection'] });
    
    sf.ui.proTools.memoryLocationsCreate({
        name: entry.sceneName,
        memoryLocationNumber: memLocNum
    });

    memLocNum++;
}

```
