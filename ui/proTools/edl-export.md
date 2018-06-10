## How to export an EDL from a track in your pro tools session

```js
const ptxPath = '/path/to/my/project.ptx';
const edlPath = '/path/to/my/project.edl';
const edlSequenceName = 'EDLTEST';
const frameRate = '25nd';
const trackName = 'Boom 1';

//Read the PTX session
var ptx = sf.projects.ptxRead({
    path: ptxPath
}).ptxSession;

//Open an EDL builder
var edlBuilder = sf.projects.edlBuild({
    frameRate: frameRate,
    sequenceName: edlSequenceName
}).edlBuilder;

//Get the ptx track named trackName
var track = ptx.mainSequence.tracks.filter(function(t){return t.name == trackName;})[0];

//Get the first playlist from our track
var pl = track.playlistGroups[0].playlists[0];

//Add it to our EDL builder
edlBuilder.addPtxPlaylist(pl);

//Save our EDL
edlBuilder.save(edlPath);
```
