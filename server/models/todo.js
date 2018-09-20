const mongoose = require('mongoose');
const Task = mongoose.model('Task');

let TodoSchema = new mongoose.Schema({
  title: { type: String, required: [true, "can't be blank"], index: true },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
}, { timestamps: true });

TodoSchema.pre('remove', (next) => {
  Task.remove({ todoId: this._id }).exec();
  next();
})

TodoSchema.methods.toDto = function () {
  return {
    id: this._id,
    title: this.title,
    tasks: this.tasks.map((task) => {
      return task.toDto();
    })
  }
}

mongoose.model('Todo', TodoSchema);








const Todo = mongoose.model('Todo');
const router = require('express').Router();

router.param('todo', function (req, res, next, id) {

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.sendStatus(422);
  }

  Todo.findById(id)
      .populate('tasks')
      .then(function (todo) {
          if (!todo) { return res.sendStatus(404); }

          req.todo = todo;

          return next();
      });
});

router.get('/', (req, res) => {

  Todo.find()
      .populate('tasks')
      .then((todos) => {
          if (!todos) { return res.sendStatus(404); }

          return res.json({
              todos: todos.map((todo) => {
                  return todo.toDto();
              })
          }).statusCode(200);
      });
});

router.post('/', (req, res) => {
  if (!req.body.title) {
      res.sendStatus(422);
  }

  let todo = new Todo();
  todo.title = req.body.title;

  todo.save().then(() => {
      res.json(todo.toDto()).statusCode(201);
  })

});

router.delete('/:todo', (req, res) => {

  req.todo.remove().then(function () {
      return res.sendStatus(200);
  });
});
