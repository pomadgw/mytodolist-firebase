const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
const firebase = require('firebase-admin');

firebase.initializeApp();

const db = firebase.database();

const app = express();
app.use(bodyParser.json());

const todolistRouter = express.Router();

app.use('/api', todolistRouter);

exports.todolist = functions.https.onRequest(app);
