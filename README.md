# SoundFlow Scripts, Documentation & Samples

Hi!
This repo contains custom scripts, documentation, samples etc. for SoundFlow - the GUI automation software for macOS, specifically designed and optimized for users of Pro Tools, Cubase, etc.


# Custom scripts

SoundFlow allows you to write custom scripts to automate your Mac.
To get you started, here's a list of some scripts that we find usable in our daily work as sound designers in Pro Tools.



## Go to a specific memory location
```js
sf.ui.proTools.memoryLocationsGoto({
	memoryLocationNumber: 11,
	restoreWindowOpenState: true,
	useKeyboard: true,
});
```

## Toggle volume automation for all tracks via a keyboard press:
```js
sf.keyboard.press({
	keys: 'alt+minus'
});
```

## Open a specific AudioSuite plugin by invoking the menu item:
```js
sf.ui.proTools.audioSuiteActivatePlugin({
	category: 'Other',
	name: 'Gain'
});
```

## Open the "Pro Tools" app with a shell script:
```js
sf.system.exec({
	commandLine: 'open "/Applications/Pro Tools.app"'
});
```

## Show + Select our stems
```js
//Define the track names of our stems
var stems = ['DX STEM', 'FOLEY STEM', 'FG STEM', 'BG STEM', 'MX STEM'];

//Show our stems if they aren't already showing
sf.ui.proTools.trackShowByName({
	names: stems
});

//Select our stems
sf.ui.proTools.trackSelectByName({
	names: stems
});
```

## Select Trim mode for all tracks
```js
//Hold down option key
sf.keyboard.modifiers({
    isOption: true
});

//Set automation mode to trim
sf.ui.proTools.selectedTrack.proToolsAutomationModeSet({
    automationModeName: 'trim',
    trackTargetMode: 'AllTracks'
});

//Release option key
sf.keyboard.modifiers();
```

# Miscellaneous scripts

## Control your Mac's volume with a Midi Event (eg. fader value)
```js
var vol = Math.floor(Number(event.trigger.midiBytes[2]) / 127.0 * 100.0);
sf.system.execAppleScript({
	script: 'set volume output volume ' + vol + ' --100%'
});
```

## Toggle mute/unmute for your Mac
```js
sf.system.execAppleScript({
    script:
        'set curVolume to get volume settings\n' +
        'if output muted of curVolume is false then\n' +
        '	set volume with output muted\n' +
        'else\n' +
        '	set volume without output muted\n' +
        'end if'
});
```

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

## Send midi to SoundFlow Custom Midi Output
```js
sf.midi.send({
    midiBytes: [
        0x90, /* 0x90: Note On */
        48,   /* 48:   C3 */
        80    /* 80:   Velocity */
        ],
    outputNum: 1  /* Send out via SoundFlow Custom Midi Output 1 */
});
```

## Assign a specific color to the selected clip
```js
sf.ui.proTools.colorsSelect({
    colorBrightness: 'Medium',
    colorNumber: 4,
    colorTarget: 'ClipsInTracks'
});
```
