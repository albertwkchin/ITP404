var Book = Backbone.Model.extend({
    defaults: {
        image: 'images/default.png'
    }
});

var BookItemView = Backbone.View.extend({
    template: Handlebars.compile($('#book-template').html()),

    initialize: function() {
        this.listenTo(this.model, 'change', function() {
           this.render();
        });
    },

    className: 'book',

    events: {
        'click a.like': 'like'
    },

    like: function(e) {
        e.preventDefault();
        this.model.set({
            hasLiked: true,
            likes: this.model.get('likes') + 1
        });
    },

    render: function() {
        var html = this.template(this.model.toJSON());
        this.$el.html(html);
    }
})

var book1 = new Book({
    title: 'You dont know JS',
    image: 'images/ydkjs_scoe-and-closures.jpg',
    likes: 20
})

var book2 = new Book({
    title: 'Javascript Patterns',
    likeds: 10
})

var book1View = new BookItemView({
    model: book1
})

book1View.render();

var book2View = new BookItemView({
    model: book2View
});

book2View.render();

$('#container').append(book1View.el);