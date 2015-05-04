'use strict';

let printer = require('printer');
let singleton = Symbol();

class PrintersManager {
    constructor() {
        this.printers = [];
    }

    loadPrinter(name) {
        return printer.getPrinter(name);
    }

    loadPrinters() {
        this.printers = printer.getPrinters();
        return this;
    }

    loadPrintersNames() {
        return this.loadPrinters().printers.map(function (printer) {
            return printer.name;
        });
    }

    rawPrint(data) {
        var self = this;

        printer.printDirect({
            data: data,
            printer: this.selectedPrinter,
            type: 'RAW', // type: RAW, TEXT, PDF, JPEG, .. depends on platform
            success: function (jobID){
                console.log(`Sent to printer '${self.selectedPrinter}' with ID: ${jobID}`);
            },
            error: function (err){
                console.log(err);
            }
        });
    }

    get selectedPrinter() {
        return this.selected;
    }

    set selectedPrinter(printer) {
        this.selected = printer;
    }

    static get instance() {
        if (!this[singleton]) {
            this[singleton] = new PrintersManager();
        }
        return this[singleton];
    }
}

module.exports = PrintersManager;