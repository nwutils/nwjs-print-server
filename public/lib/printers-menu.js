'use strict';

let config = require('../config/all.js');

class PrintersMenu {

    constructor(gui, printersManager) {
        this.gui = gui;
        this.menu = new this.gui.Menu();
        this.menuItems = [];
        this.printersManager = printersManager;
        this.defaultMenuItems = [
            new this.gui.MenuItem({
                type: 'separator'
            }),
            new this.gui.MenuItem({
                label: `-- Listening on port ${config.WEBSOCKET_PORT} --`,
                enabled: false
            }),
            new this.gui.MenuItem({
                label: 'Esci',
                click: function () {
                    process.exit();
                }
            })
        ];
    }

    // TODO: refactor this with a proper scope, cleaner alternative
    getDefaultPrintHandler(printersMenuInstance) {
        let printersMenu = printersMenuInstance;
        let printersManager = printersMenuInstance.printersManager;
        return function () {
            let menuItem = this;

            printersMenu.menuItems.forEach(function (item) {
                if(item.type === 'checkbox' && item.label !== menuItem.label) {
                    item.checked = false;
                }
            });

            if (menuItem.checked) {
                printersManager.selectedPrinter = menuItem.label;
            }

            if (!menuItem.checked && printersManager.selectedPrinter === menuItem.label) {
                menuItem.checked = true;
                printersManager.selectedPrinter = menuItem.label;
            }
        };
    }

    loadEntries() {
        let printersNames = this.printersManager.loadPrintersNames();

        if (printersNames.length) {
            this.menuItems = printersNames.map(function (name) {
                return new this.gui.MenuItem({
                    type: 'checkbox',
                    label: name,
                    click: this.getDefaultPrintHandler(this)
                });
            }.bind(this));

            if (this.menuItems.length) {
                this.menuItems[0].checked = true;
                this.printersManager.selectedPrinter = this.menuItems[0].label;
            }
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