import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { ICrudTodoApiBoundary } from '@clean-todo/bl';
import type { Todo } from '@clean-todo/bl';

function createSchema() {
  const TodoSchema = new mongoose.Schema({
    id: { type: String, require: true },
    done: { type: Boolean },
    createdOn: { type: Number },
    modifiedOn: { type: Number },
    description: { type: String },
  });

  return mongoose.model('todo', TodoSchema);
}

function connectToMongoDB() {
  dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });
  const { MONGODB_URI } = process.env;

  MONGODB_URI &&
    mongoose
      .connect(MONGODB_URI)
      .then(() => {
        console.log('🥭[mongo]: DB connected');
      })
      .catch((err) => {
        console.log(err);
      });
}

export function inMongo(): ICrudTodoApiBoundary {
  const todosModel = createSchema();
  connectToMongoDB();

  return {
    async createTodo(todo: Todo) {
      const newTodo = new todosModel(todo);
      await newTodo.save();

      return todo;
    },
    async updateTodo(todo: Todo) {
      await todosModel.findOneAndUpdate({ id: todo.id }, { $set: todo });

      return todo;
    },
    async deleteTodo(id) {
      await todosModel.findOneAndDelete({ id });
    },
    async getAllTodos() {
      const allTodos = await todosModel.find({});
      return allTodos;
    },
    async deleteAllTodos() {
      await todosModel.deleteMany();
    },
    async updateAllTodos(todos) {
      await todosModel.deleteMany();

      await todosModel.insertMany(todos);
    },
  };
}
