# SoundFlow Scripts, Documentation & Samples

Hi!
This repo contains custom scripts, documentation, samples etc. for SoundFlow - the GUI automation software for macOS, specifically designed and optimized for users of Pro Tools, Cubase, etc.


# Custom scripts

SoundFlow allows you to write custom scripts to automate your Mac.
To get you started, here's a list of some scripts that we find usable in our daily work as sound designers in Pro Tools and other apps.


## Pro Tools (sf.ui.proTools.*)
[Pro Tools scripts](./ui/proTools/)

## Keyboard (sf.keyboard.*)
[Keyboard scripts](./keyboard/)

## Clipboard (sf.clipboard.*)
[Clipboard scripts](./clipboard/)


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

## Toggle 'Input monitor mode' for all your stems
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

sf.keyboard.press({
	keys: 'shift+i'
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

## Assign channel strip to insert slot 1 of the selected mono tracks
```js
sf.ui.proTools.selectedTrack.insertOrSendSelect({
    insertOrSend: 'Insert',
    pluginNumber: 1,
    pluginPath: ['plug-in', 'EQ', 'Channel Strip (mono)'],
    selectForAllSelectedTracks: true
});
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

## Close all open tabs in iZotope RX6 Audio Editor
```js

sf.ui.izotope.appActivateMainWindow();

var mainWin = sf.ui.izotope.windows[0];
var mainWinGrp = mainWin.getFirstOf('AXGroup');

function hasOpenTabs()
{
    try {
        return !!mainWinGrp.getFirstOf('AXRadioButton');
    }
    catch (err) {
        return false;
    }
}

while(hasOpenTabs())
{
    sf.keyboard.press({
        keys: 'cmd+w'
    });

    var dlgRes = sf.ui.izotope.dialogWaitForManual({
        dialogTitle: '',
        timeout: 500,
    }, function(err){});

    if (dlgRes.dialog)
    {
        dlgRes.dialog.dialogClickButton({
            buttonTitle: 'No'
        });
    }

    sf.wait({ intervalMs: 200 });
}
```

## Send clips to iZotope via iZotope RX 6 Connect
```js
sf.ui.proTools.audioSuiteActivatePlugin({
    category: 'Noise Reduction',
    name: 'RX 6 Connect'
});

var win = sf.ui.proTools.getFloatingWindowWithTitleStartingWith("Audio Suite: RX 6 Connect");

win.getFirstWithTitle('Processing Input Mode').menuOpenPopupMenuFromElement().popupMenu.menuClickPopupMenu({
    menuName: 'clip by clip'
});

win.getFirstWithTitle("Analyze").elementClick();    
```

## Send back to PT from iZotope via Connect
```js
sf.ui.izotope.mainWindow.getFirstWithDescription('RX6 Main Window').getFirstWithDescription("Shuttle").elementClick();
```

## Render into PT track from iZotope Connect
```js
var win = sf.ui.proTools.getFloatingWindowWithTitleStartingWith("Audio Suite: RX 6 Connect");
win.getFirstWithTitle("Render").elementClick();
```
