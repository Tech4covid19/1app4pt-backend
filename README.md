# 1app4pt-backend

## Local development ##

1. Create a .env file based on the .env.local tenmplate file and fill the variables 

2. Update dependencies by running

    `npm install`

3. Start the server

    `npm start`

4. All endpoints are available under the following path on the server:

    `<server>/api/v1`

## Current endpoints ##

### Enrollment ###

Sends an email with the enrollment information.

`[POST] api/v1/enrollment`

payload:

`{
    "name": "John Doe",
    "email": "john.doe@nowhere.com",
    "affiliation": "A nice NGO",
    "newsletter": false
}`

