# YO-ICSS

This project was generated with the [Angular Full-Stack Generator](https://github.com/DaftMonk/generator-angular-fullstack) version 3.0.0-rc8.

This project based on WEBRTC technology.

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and NPM](nodejs.org) >= v0.12.0
- [Bower](bower.io) (`npm install --global bower`)
- [Grunt](http://gruntjs.com/) (`npm install --global grunt-cli`)
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`

### Developing (local)

1. Run `npm install` to install server dependencies.

2. Run `bower install` to install front-end dependencies.

3. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running

4. Run `grunt serve` to start the development server. It should automatically open the client in your browser when ready.

## Build & development
* (local)  keep an instance of the MongoDB Daemon running
* Run `grunt build` for building and `grunt serve` for preview.
or
* Run 'node start' for starting the server.

## Testing

Running `npm test` will run the unit tests with karma.


## Login info

* Client: client@example.com : client 
* Employee: employee@example.com : employee 
* Manager: manager@example.com : manager 
* Admin: admin@example.com : admin 

## devDependencies vs Dependencies
* dependencies - run 'npm install' from a directory that contains 'package.json' or 'npm install $package' on any other directory. Those dependencies are required to run and devDependencies only to develop (e.g : unit tests, minification, ...)
* devDependencies - run 'npm install' from a directory that contains 'package.json', unless you pass the '--production' flag. not installed on 'npm install $package' on any other directory. unless you give it the '--dev' flag.
* 
## ISSUES
1. https://github.com/nodejs/node-gyp
