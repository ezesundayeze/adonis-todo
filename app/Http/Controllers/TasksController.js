"use strict";
const Task = use("App/Model/Task");

class TasksController {
  *index(request, response) {
    const tasks = yield Task.query().where("completed", false).fetch();

    yield response.sendView("tasks.index", { tasks: tasks });
  }

  *store(request, response) {
    // TODO
    const taskData = request.only("task");
    yield Task.create(taskData);
    response.redirect("/");
  }

  *create(request, response) {
    // Create todo
    yield response.sendView("tasks.create");
  }

  *update(request, response) {
    const task = yield Task.find(request.param("id"));
    task.completed = true;
    yield task.save();
    response.redirect("/");
  }

  *completed(request, response) {
    const tasks = yield Task.query().where("completed", true).fetch();
    yield response.sendView("tasks.index", { tasks: tasks.toJSON() });
  }

  *destroy(request, response) {
    const task = yield Task.find(request.param("id"));
    yield task.delete();
    response.redirect("/");
  }
}

module.exports = TasksController;
