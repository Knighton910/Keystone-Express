var express = require('express'),
    app = express(),
    keystone = require('keystone'),
    serve = require('serve-static'),
    favicon = require('serve-favicon'),
    body = require('body-parser'),
    cookieParser = require('cookie-parser'),
    multer = require('multer');

var cookieSecret = 'secretCookie'

app.use(cookieParser(cookieSecret));
app.use(body.urlencoded({ extended: true }));
app.use(body.json());
app.use(multer());

keystone.init({
  'name': 'KeystoneExpress', 'brand': 'KeystoneExpress',
  'session': false, 'updates': 'updates',
  'auth': true, 'user model': 'No',
  'cloudinary config': 'cloudinary://api_key:api_secret@cloud_name',
  'auto update': true, 'cookie secret': cookieSecret
});

// Let keystone know where your models are defined. Here we have it at the `/models`
keystone.import('models');

// Serve your static assets
app.use(serve('./public'));

// This is where your normal routes and files are handled
app.get('/', function(req, res, next) {
  res.send('hello world');
});

keystone.app = app;
keystone.start();
