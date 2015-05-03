"use strict";

var gui = require('nw.gui');
var win = gui.Window.get();
var tray = new gui.Tray({ icon: 'public/images/icon.png' });
var PrintersMenu = require('./lib/printers-menu.js');
var printersMenuInstance = new PrintersMenu(gui);

win.hide();

printersMenuInstance.loadEntries();

tray.menu = printersMenuInstance.menu;