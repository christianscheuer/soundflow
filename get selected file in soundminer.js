function getSoundminerPath() {
    var chr = sf.ui.soundminer.mainWindow.getElements('AXChildren');
    var sa = chr.filter(function (c) { return c.role == 'AXScrollArea' })[1];
    var path = sa.getElements('AXChildren')[0].value.value;

    return path;
}

var path = getSoundminerPath();
