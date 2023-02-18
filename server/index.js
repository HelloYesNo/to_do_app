const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

//CREATE todo
app.post('/todos', async (req, res) => {
  try {
    const { description } = req.body;
    console.log(req.body);
    const newTodo = await pool.query(
      'INSERT INTO todo (description) VALUES($1) RETURNING *',
      [description]
    );

    res.json(newTodo);
  }

  catch (err) {
    console.error(err.message);
  }
});

//GET all todos
app.get('/todos', async (req, res) => {
  try {
    const allTodos = await pool.query('SELECT * FROM todo');
    res.json(allTodos.rows);
  }

  catch (err) {
    console.error(err.message);
  }
});

//GET todo
app.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query('SELECT * FROM todo WHERE id = $1', [id]);

    res.json(todo.rows[0]);
  }
  
  catch (err) {
    console.error(err.message);
  }
});

//UPDATE todo
app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      'UPDATE todo SET description = $1 WHERE id = $2',
      [description, id]
    );

    res.json('Todo was updated!');
  }

  catch (err) {
    console.error(err.message);
  }
});

//DELETE todo
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query('DELETE FROM todo WHERE id = $1', [id]);
    res.json('Todo was deleted!');
  }

  catch (err) {
    console.error(err.message);
  }
});


app.listen(4000, () => {
  console.log('Server is listening on port 4000');
});