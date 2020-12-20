const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
const firebase = require('firebase-admin');

firebase.initializeApp();

const db = firebase.database();

const app = express();
app.use(bodyParser.json());

const todolistRouter = express.Router();

todolistRouter.get('/todos', async (req, res) => {
  await db.ref('/todos').once('value').then((snapshot) => {
    res.json(snapshot.val());
  });
});

todolistRouter.get('/todos/:id', async (req, res) => {
  await db.ref('/todos')
    .orderByKey()
    .equalTo(req.params.id)
    .once('value')
    .then((snapshot) => {
      res.json(snapshot.val());
    });
});

todolistRouter.post('/todos', async (req, res) => {
  const { todo } = req.body;
  const todoListsRef = db.ref('/todos');
  await todoListsRef.push({
    todo,
    is_marked_done: false
  })

  await db.ref('/todos').once('value').then((snapshot) => {
    res.json(snapshot.val());
  });
});

todolistRouter.patch('/todos/:id/toggle-mark', async (req, res) => {
  const { id } = req.params;

  const data = (await db.ref('/todos')
    .orderByKey()
    .equalTo(id)
    .once('value')).val()[id];
  data.is_marked_done = !data.is_marked_done;

  await db.ref(`/todos/${id}`).set(data);
  res.json({
    id: data,
  });
});

app.use('/api', todolistRouter);

exports.todolist = functions.https.onRequest(app);
