To get the basic server working, `npm install` the dependencies, and run `node server`. This will only work if the Arduino is hooked up to the USB port. At the moment, it runs a server on port 8080 and turns pin 13 on and off.

For running on Raspberry Pi, after you `npm install`, change line 75 in the node_modules/duino/lib/board.js to `ls /dev | grep -e usb -e USB -e ACM`
