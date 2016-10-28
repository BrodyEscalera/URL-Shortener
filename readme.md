## Synopsis

URL-Shortener is a simple node based application to create a randomly generated, shortened hyperlink of a URL.

## Code Example
Simply send a post request of the URL to  API/V1

Returns JSON data
{
"URLLink": "http://Randomly Generated Link"  (the link will be limited to 5 alpha-numeric Characters Maximum)
}

## Motivation

This Project was created to meat the requirements of DWA Assignment 1.

## Installation

* installation instructions are predicated on the user having previously installed node.js on his/her machine.

1. Download source files.

2. In terminal run

$ cd YourPathHere/URL-Shortener
$ node src/server.js

3. In browser navigate to http://localhost:3000/api/v1


## API Reference

API Reference documents are forthcoming.

## Tests

Tests are can be run using Mocha in the terminal.

## Contributors

Main Contributor Brody Escalera.

## License

The MIT License (MIT)
Copyright (c) <2016> <Brody Escalera>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.