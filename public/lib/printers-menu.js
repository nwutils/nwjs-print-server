'use strict';
var printer = require('printer');
var printers = printer.getPrinters();

class PrintersMenu {

    constructor(gui) {
        this.gui = gui;
        this.menu = new this.gui.Menu();
        this.menuItems = [];
        this.defaultMenuItems = [
            new this.gui.MenuItem({
                type: 'separator'
            }),
            new this.gui.MenuItem({
                label: 'Esci',
                click: function () {
                    process.exit();
                }
            })
        ];
    }

    loadEntries() {
        if (printers.length) {
            this.menuItems = printers.map(function (printer) {
                return new this.gui.MenuItem({
                    type: 'checkbox',
                    label: printer.name,
                    click: function () {}
                });
            }.bind(this));
        } else {
            let noResultsMenuItem = new this.gui.MenuItem({
                label: 'No printers detected'
            });
            noResultsMenuItem.enabled = false;
            this.menuItems.push(noResultsMenuItem);
        }

        this.menuItems = this.menuItems.concat(this.defaultMenuItems);

        this.menuItems.forEach(function (menuItem) {
            this.menu.append(menuItem);
        }.bind(this));
    }
}

module.exports = PrintersMenu;