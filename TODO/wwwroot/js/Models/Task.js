export let Task = new Class({
    initialize: function (data) {
        this.title = ko.observable(data.title);
        this.status = ko.observable(data.status);
        this.id = data.id;
    }
});