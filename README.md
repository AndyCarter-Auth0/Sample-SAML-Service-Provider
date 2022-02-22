# SAML Service Provider Test Application

This is a NodeJS and saml2-js SAML service provider application, to test a SAML identity provider application registered in Auth0

## What is Auth0?

Auth0 helps you to:

- Add authentication with multiple authentication sources, either social like Google, Facebook, Microsoft Account, LinkedIn, GitHub, Twitter, Box, Salesforce, among others, or enterprise identity systems like Windows Azure AD, Google Apps, Active Directory, ADFS or any SAML Identity Provider.
- Add authentication through more traditional username/password databases.
- Add support for linking different user accounts with the same user.
- Support for generating signed Json Web Tokens to call your APIs and flow the user identity securely.
- Analytics of how, when and where users are logging in.
- Pull data from other sources and add it to the user profile, through JavaScript rules.

## Create a free Auth0 account
- Go to Auth0 and click Sign Up.
- Use Google, GitHub or Microsoft Account to login.

## SAML Service Provider Test Application Features

- Login and Logout
- ACS endpoint
- Assertion Viewer

This application is purely for testing, and is not production ready. Do not use in a production environment.

## Tech

This application uses a number of open source projects to work properly:

- [node.js]
- [Express]
- [saml2-js]
- [jade]



[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [node.js]: <http://nodejs.org>
   [express]: <http://expressjs.com>
   [jade]: <https://jade-lang.com/>
   [saml2-js]: <https://github.com/Clever/saml2>

## Installation

Add an application in your Auth0 Dashboard that has the SAML 2 Web App Add-On enabled - https://auth0.com/docs/authenticate/protocols/saml/saml-sso-integrations/enable-saml2-web-app-addon

![App Screenshot](https://images.ctfassets.net/cdy7uua7fh8z/3T90BDpyTXFUWDp1JkncBU/86bdba6bed8130b34b42b25c9bf2d232/dashboard-applications-applications-addons-saml2-web-app-usage.png)

- Download the certificate shown on screen for your application and add to the root of this application. Note the filename for the certificate, you will need this to configure the app
- Note the Identity Provider Login URL - you will need this to configure the app
- In the settings tab, enter the following for the Application Callback URL:
  - http://localhost:3000/assert
- In the settings tab, ensure you have the following in the settings box:

```sh
{
  "logout": {
    "callback": "http://localhost:3000/",
    "slo_enabled": true
  },
  "binding": "urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect"
}
```

In the SAML Service Provider Test Application root folder, create a .env file with the following 

```sh
NODE_ENV=development
PORT=3000
SERVER=http://localhost
IDP_LOGIN_URL=<IDENTITY_PROVIDER_LOGIN_URL>
IDP_SLO_URL=<IDENTITY_PROVIDER_LOGIN_URL>/logout
IDP_PUBLIC_CERT=<DOWNLOADED_AUTH0_CERT>
```

Requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and start the server.

```sh
cd SAML Service Provider
npm i
npm start 
```


## Authors

- [@andycarter](mailto:andy.carter@okta.com)


## License

This project is licensed under the MIT license. See the LICENSE file for more info.

