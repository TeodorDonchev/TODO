import { MainVM } from './MainVM.js';
import { Task } from '../Models/Task.js';
import { CommunicationFacade } from '../CommunicationFacade.js';

export var BaseVM = new Class({
    initialize: function (currentVM, tasks) {
        var self = this;
        /*ko.utils.extend(self, MainVM)*/
        self.currentTemplate = currentVM() === 'tasksVM' ? ko.observable('active-tasks-template') : ko.observable('archived-tasks-template');


        self.goToTasks = function () {
            CommunicationFacade.getTasks(function (data) {
                let newData = data.map(function (task) {
                    return new Task(task);
                });
                // self.archivedTasks(null);
                tasks(newData);
                currentVM('tasksVM');
                self.currentTemplate('active-tasks-template');
            });
        }

        self.goToArchive = function () {
            CommunicationFacade.getArchivedTasks(function (data) {
                let newData = data.map(function (task) {
                    return new Task(task);
                });
                // self.tasks(null);
                tasks(newData);
                currentVM('archivedTasksVM');
                self.currentTemplate('archived-tasks-template');
            });
        }
    }
})