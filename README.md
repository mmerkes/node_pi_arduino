# Node-Pi-Arduino

To get the basic server working, `npm install` the dependencies, and run `node server`. This will only work if the Arduino is hooked up to the USB port. At the moment, it runs a server on port 8080 and turns pin 13 on and off.

## Dependencies

### Node

If running on Ubuntu, you may want to do the following to get an
up-to-date package:

````
sudo aptitude update
sudo aptitude install -y python-software-properties python g++ make
sudo add-apt-repository ppa:chris-lea/node.js
sudo aptitude update
sudo aptitude install nodejs
````

That will install node and npm.

### Java

If you don't already have Java, you'll need to do

````
sudo aptitude install openjdk-7-jre
````

### Platform Specific

Basically, the problem seems to be locating the Arduino.

#### OS X

Things seem to work?

#### Raspbian on Raspberry Pi

After you `npm install`, change line 75 in the 
node_modules/duino/lib/board.js to 

````
ls /dev | grep -e usb -e USB -e ACM
````

#### Ubuntu, 32bit

Seems you need to change line 75 in
node_modules/duino/lib/board.js to 

````
ls /dev | grep -e ACM
````

## Duino On the Arduino

You need to `git clone git@github.com:etca/duino.git`, and upload the
sketch at `src/du.ino` from the duino repo to your Arduino.

## Run It!

Once your dependencies are installed, the sketch is running on the
Arduino, and your arduino is connected to the host with node,
run `sudo node server.js` to start the server. It'll default to port 3000.

That's it.

