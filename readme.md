## Synopsis
 [![NPM Version][npm-image]][npm-url]
URL-Shortener is a simple node based application to create a randomly generated, shortened hyperlink of a URL.

## Code Example

localhost:3000/api/v1/url?link=www.google.com

                OR

POST a json object with desired link to the URL shown below.
{"link":"www.google.com"}
localhost:3000/api/v1/url


Returns JSON data
{
  "id": 1,
  "link": "www.google.com",
  "shortUrl": "min.oc4wc",
  "updatedAt": "2016-10-31T00:27:33.000Z",
  "createdAt": "2016-10-31T00:27:33.000Z"
}

based on this object you can Delete, Read, & Update by supplying the id to the Url:
localhost:3000/api/v1/url/id  or in this case localhost:3000/api/v1/url/1

For specific functionality see API Refernce below.
    ***the shorUrl will be limited to 5 alpha-numeric Characters Maximum.


## Motivation

This Project was created to meat the requirements of DWA Assignments.

## Installation

* installation instructions are predicated on the user having previously installed node.js on his/her machine.

1. Download source files.

2. In terminal run
```bash
 $ cd YourPathHere/URL-Shortener
 ```
* $ node src/server.js

3. Rename the .envSample file to .env and adjust parameters to match your local database.

4. In browser navigate to http://localhost:3000/api/v1/url

## API Reference

Endpoints:
CRUD for URLs
* POST /api/v1/url            Creates a shortened URL
* GET /api/v1/urls            Display all URLS
* GET /api/v1/url/:id         Displays URL based upon id
* POST /api/v1/url/:id        Update URL based upon id
* DELETE  /api/v1/url/:id     Delete url based upon id

Routes:
* /go/:shortURL               redirects the user to the actual url based upon the short URL provided
* /api/v1/url                 loads GUI

## Tests

Tests are can be run using Mocha in the terminal.

##Usage

* To enable debugging set DEBUG=true in the .env file - Logs will be presented in the terminal window.
* To disable debugging set DEBUG=false in the .env file - logs will be saved to /logs/All-logs.log.

## Contributors

Main Contributor Brody Escalera.

## License

The MIT License (MIT)
Copyright (c) <2016> <Brody Escalera>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.