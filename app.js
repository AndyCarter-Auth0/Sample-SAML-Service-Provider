var saml2 = require('saml2-js');
var fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

const dotenv = require('dotenv');
dotenv.config();

app.use(bodyParser.urlencoded({ 
    extended: true
}));
 
var indexRouter = require('./routes/index');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var sp_options = {
    entity_id: process.env.SERVER + ":" + process.env.PORT + "/metadata.xml",
    private_key: fs.readFileSync("samlsp.key").toString(),
    certificate: fs.readFileSync("samlsp.pem").toString(),
    assert_endpoint: process.env.SERVER + ":" + process.env.PORT + "/assert",
    allow_unencrypted_assertion: true
};
var sp = new saml2.ServiceProvider(sp_options);
// Add Auth0 as an identity provider
var idp_options = {
    sso_login_url: process.env.IDP_LOGIN_URL, 
    sso_logout_url: process.env.IDP_SLO_URL,
    certificates: [fs.readFileSync(path.resolve(process.env.IDP_PUBLIC_CERT)).toString()]
};
var idp = new saml2.IdentityProvider(idp_options);

app.get("/metadata.xml", function (req, res) {
    res.type('application/xml');
    res.send(sp.create_metadata());
});

// Starting point for login
app.get("/login", function (req, res) {
    sp.create_login_request_url(idp, {}, function (err, login_url, request_id) {
        if (err != null)
            return res.send(500);
        res.redirect(login_url);
    });
});

// Assert endpoint for when login completes
app.post("/assert", function (req, res) {
    var options = {
        request_body: req.body
    };
    sp.post_assert(idp, options, function (err, saml_response) {
        if (err != null) {
            return res.send(500);
        }
        // Save name_id and session_index for logout
        // Note:  In practice these should be saved in the user session, not globally.
        name_id = saml_response.user.name_id;
        session_index = saml_response.user.session_index;
        res.render("assert", {
            username: saml_response.user.name,
            title: 'SAML Service Provider Test Application',
            samlresponse: saml_response
        });
    });
});

// Starting point for logout
app.get("/logout", function (req, res) {
    var options = {
        name_id: name_id,
        session_index: session_index
    };

    sp.create_logout_request_url(idp, options, function (err, logout_url) {
        if (err != null)
            return res.send(500);
        res.redirect(logout_url);
    });
});

app.use('/', indexRouter);
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;