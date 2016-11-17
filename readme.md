## Synopsis

URL-Shortener is a simple node based application to create a randomly generated, shortened hyperlink of a URL.

## Code Example
Post a key value pair of "link" = "yourlink"
```http
localhost:3000/api/v3/url?link=yourlink
```
                OR

POST a json object with desired link to the URL shown below.
```http
localhost:3000/api/v3/url
```
```json
{"link":"yourlink"}
```

The POST request will randomly generate a shortURL and will Return a JSON object created to the database.
```json
{
  "id": 1,
  "link": "yourlink",
  "shortUrl": "min.oc4wc",
  "updatedAt": "2016-10-31T00:27:33.000Z",
  "createdAt": "2016-10-31T00:27:33.000Z"
}
```
Based on the JSON object you can Delete, Read, & Update using Delete, GET and POST respectively. All object modifying request types require supplying the object id to the Url:
```http
POST    localhost:3000/api/v3/url/:id
DELETE  localhost:3000/api/v3/url/:id
GET     localhost:3000/api/v3/url/:id
UPDATE  localhost:3000/api/v3/url/:id
```

For specific functionality see API Reference below.

## Motivation

This Project was created to meat the requirements of DWA Assignments.

## Installation

* installation instructions are predicated on the user having previously installed mysql & node.js on his/her machine. The application will use a local mysql database based on the settings of the .env file.  

1. Download source files and install required node modules according to the package.json

2. In terminal run
```bash
 $ cd YourPathHere/URL-Shortener
 ```
```bash
 $ node src/server.js
 ```
3. Rename the .envSample file to .env and adjust parameters to match your local database.
```env
DB_NAME=apiCrud
DB_USER=root
DB_PASS=
DB_HOST=127.0.0.1
DB_SCHEMA=mysql
DB_PORT=3306
DEBUG=false
Version=x.x.x
```

4. In browser navigate to
```http
http://localhost:3000/api/v3/url
```

## API Reference

Endpoints:
The endpoints urls can be adjusted in the lib/urlRequest.js. (all tests are written for the default routes).

CRUD for URLs
* POST /api/v3/url            Creates a shortened URL
* GET /api/v3/urls            Display all URLS
* GET /api/v3/url/:id         Displays URL based upon id
* POST /api/v3/url/:id        Update URL based upon id
* DELETE  /api/v3/url/:id     Delete url based upon id

Routes:
* /go/:shortURL               redirects the user to the actual url based upon the short URL provided
* /api/v3/url                 loads GUI

## Tests

Tests are located in the test folder and utilize supertest, chai, and mocha. In the terminal ensure the node server is disabled and then run the command

``` bash
mocha
```

## Contributors

Main Contributor Brody Escalera.
##Workflow
 Create a feature branch off of the master branch and use a feature branch workflow to submit your feature. All features require a passing unit test before they will be merged to the main branch. After all unit tests are passing a pull request of your feature will be merged into the master branch. Then the master branch will be pushed to the release branch. Codeship will run all applications tests, if all are passing then the release branch will auto deploy on heroku. Following a final review of the deployed release a manual deployment to the production server will be promoted on heroku.  
## Deployment
1.) The master branch is pushed to the release branch
2.) Codeship runs the unit tests against the release branch
3.) If All tests are passed the release branch is deployed to the staging server
4.)After Final review the staging server is manually promoted to the production server.

## License

The MIT License (MIT)
Copyright (c) <2016> <Brody Escalera>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
