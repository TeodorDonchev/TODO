import { CommunicationFacade } from '../CommunicationFacade.js';
import { Task } from '../Models/Task.js';
import { BaseVM } from './BaseVM.js';


export var ArchivedTasksVM = new Class({
    initialize: function(currentVM, tasks) {
        var self = this;
        ko.utils.extend(self, new BaseVM(currentVM, tasks));
        //BaseVM.apply(self);

    }
})


//ko.applyBindings(new ArchivedTaskVM(), document.getElementById('archived-tasks-template'));