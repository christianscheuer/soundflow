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
