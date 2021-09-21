import { TasksVM } from './TasksVM.js';
import { ArchivedTasksVM } from './ArchivedTasksVM.js';
import { Task } from '../Models/Task.js';

function viewModelFactory(currentVM, tasks) {
    if (currentVM() === 'tasksVM') {
        return new TasksVM(currentVM, tasks);
    } else {
        return new ArchivedTasksVM(currentVM, tasks);
    }
}

export var MainVM = new Class({
    initialize: function () {
        var self = this;

        self.tasks = ko.observableArray([]);
        self.currentVM = ko.observable('tasksVM');

        //ko.when(function () {
        //    return self.currentVM() === 'archivedTaskVM';
        //}, function (result) {
        //    self.dataContext = viewModelFactory('test')
        //    console.log(result);
        //});

        self.dataContext = ko.observable(new TasksVM(self.currentVM, self.tasks));

        self.currentVM.subscribe(function (newValue) {
            self.dataContext(viewModelFactory(self.currentVM, self.tasks));
            console.log(self.currentVM());
            console.log(self.dataContext());

        })


    }
})


ko.applyBindings(new MainVM());
