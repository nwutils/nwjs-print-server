# nwjs-print-server

A simple [nw.js](https://github.com/nwjs/nw.js) application that bridges a website to a local printer (I.E. printing recipes from a web application)

## Installation
Clone this repo, setup the application using `npm install`

## Usages
 **server side** :
```bash
npm start
```

**client side**:
```javascript
$(function () {
    // Connects to localserver
    var printServer = io('http://localhost:9001');
    
    // Waits for connect event
    printServer.on('connect', function () {
        // Launches a raw-print on the selected printer.
        // you can select the default printer using the tooltip menu of the nw.js's tray icon
        printServer.emit('raw-print', 'raw data');
    });
});
  ```
