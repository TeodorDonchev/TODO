import { CommunicationFacade } from '../CommunicationFacade.js';
import { Task } from '../Models/Task.js';
import { BaseVM } from './BaseVM.js';


export var TasksVM = new Class({
    initialize: function (currentVM, tasks) {
        var self = this;

        ko.utils.extend(self, new BaseVM(currentVM, tasks));

        self.newTaskText = ko.observable();

        self.addTask = function () {
            if (self.newTaskText()) {
                let newTask = new Task({
                    title: self.newTaskText(),
                    status: "new"
                });

                CommunicationFacade.postTask(newTask, function () {
                    self.newTaskText('');
                    tasks.push(newTask);
                    self.goToTasks();
                })
            }
        }

        self.newTasks = ko.computed(function () {
            return ko.utils.arrayFilter(tasks(), function (task) {
                return task.status() === "new";
            });
        })

        self.inProgressTasks = ko.computed(function () {
            return ko.utils.arrayFilter(tasks(), function (task) {
                return task.status() === "inProgress";
            });
        })

        self.finishedTasks = ko.computed(function () {
            return ko.utils.arrayFilter(tasks(), function (task) {
                return task.status() === "finished";
            })
        })

        self.moveToNew = function (task) {
            task.status("new");
            CommunicationFacade.updateTask(task);
        }

        self.moveToInProgress = function (task) {
            task.status("inProgress");

            CommunicationFacade.updateTask(task);
        }

        self.moveToFinished = function (task) {
            task.status("finished");

            CommunicationFacade.updateTask(task);
        }

        self.deleteTask = function (task) {

            CommunicationFacade.deleteTask(task, function () {
                tasks.remove(task);
                CommunicationFacade.archiveTask(task);
            });

        }

        self.goToTasks();
    }
})


//ko.applyBindings(new TaskVM(), document.getElementById('active-tasks-template'));