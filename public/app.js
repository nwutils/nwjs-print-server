"use strict";

let gui = require('nw.gui');
let PrintersMenu = require('./lib/printers-menu.js');
let PrintersManager = require('./lib/printers-manager.js');
let Connector = require('./lib/connector.js');

let win = gui.Window.get();
let tray = new gui.Tray({ icon: 'public/images/icon.png' });

let printersManager = PrintersManager.instance;
let printersMenuInstance = new PrintersMenu(gui, printersManager);
let connector = new Connector(printersManager);

win.hide();

printersMenuInstance.loadEntries();

tray.menu = printersMenuInstance.menu;