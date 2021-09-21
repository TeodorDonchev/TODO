export var CommunicationFacade = new function () {
    this.headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };

    this.getTasks = function (callback) {
        return $.get('/api/tasks').then(function (res) { callback(res) })
    }

    this.postTask = function (task, callback) {
        return $.post({
            url: '/api/tasks', 
            headers: this.headers,
            data: ko.toJSON(task),
            success: callback
        });
    }

    this.deleteTask = function (task, callback) {
        return $.ajax({
            url:`/api/tasks/${task.id}`,
            method: "DELETE",
            headers: this.headers
        }).done(callback);
    }

    this.updateTask = function (task) {
        return $.ajax({
            url:`/api/tasks/${task.id}`,
            method: "PUT",
            headers: this.headers,
            data: ko.toJSON(task)
        })
    }

    this.archiveTask = function (task) {
        return $.post({
            url:'/api/ArchivedTasks',
            headers: this.headers,
            data: ko.toJSON(task)
        });

    }

    this.getArchivedTasks = function (callback) {
        return $.get('/api/ArchivedTasks').then(function (res) { return callback(res) })
    }
}