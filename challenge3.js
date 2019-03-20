/* We tell the computer to use a certain libary that
 * makes it easier to talk to the devices */
var dm = require('tinkerforge-device-manager');

/* We tell the computer to look for connected devices */
dm.initialize();

/* We tell the computer to run the function "registerDevice"
 * for every connected device that it finds. */
dm.setConnectCallback(registerDevice);

var led; // Variable to store the LED device

/* This is the function that is called 
 * for every connected device */
function registerDevice(device) {
}