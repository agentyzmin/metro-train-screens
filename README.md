# A3 Metro Train Screen

## Getting Started

* Install [Node.js](https://nodejs.org/)
* Install dependencies  
```
npm install --global gulp-cli
npm install -d
```
* Launch gulp to build css file
```
gulp
```
* Launch server. `--dummy` option will switch stations in a loop. Normally it is enough to test.
```
node BE/server.js --dummy
```
* Open [http://localhost:7777](http://localhost:7777) in browser

## Serial port emulation

In order to emulate the serial port and send custom DTMF sequences, follow the manual:

1. Open a new terminal window and run the following command to allocate a pseudo-terminal.
   ```bash
   socat -d -d pty,raw,echo=0 pty,raw,echo=0
   ```
   
   You will get something like this:
   ```bash
   2017/01/28 16:43:09 socat[13278] N PTY is /dev/pts/20
   2017/01/28 16:43:09 socat[13278] N PTY is /dev/pts/21
   2017/01/28 16:43:09 socat[13278] N starting data transfer loop with FDs [5,5] and [7,7]
   ```

2. Put the first PTY port in the `PORT` variable of `BE/informer.js`
   ```javascript
   var PORT = '/dev/pts/20';
   ```

3. Send DTMF sequences to the second PTY port:
    ```bash
    echo 0108 > /dev/pts/21
    ```
