const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
const firebase = require('firebase-admin');

firebase.initializeApp();

const db = firebase.database();

const app = express();
app.use(bodyParser.json());

const todolistRouter = express.Router();

todolistRouter.get('/', async (req, res) => {
  await db.ref('/todos').once('value').then((snapshot) => {
    res.json(snapshot.val());
  });
});

todolistRouter.get('/:id', async (req, res) => {
  await db.ref('/todos')
    .orderByKey()
    .equalTo(req.params.id)
    .once('value')
    .then((snapshot) => {
      res.json(snapshot.val());
    });
});

todolistRouter.post('/', async (req, res) => {
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

todolistRouter.patch('/:id/toggle-mark', async (req, res) => {
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

todolistRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  await db.ref(`/todos/${id}`).set(null);
  res.json({
    statius: 'OK'
  })
});

app.use('/api/todos', todolistRouter);

exports.todolist = functions.https.onRequest(app);
