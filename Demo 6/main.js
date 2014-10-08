$('p').css('color', 'red').css('text-decoration', 'underline');

$('p').css({
    color: 'red',
    'text-decoration': 'underline'
});

var qs = jQuery.param({
    name: 'David',
    age: 29,
    school: 'USC'
});

// name=David&age=29&school=USC
console.log(qs);

$('p').on('click', function (e) {
    console.log(this);
    this.className = 'stylish';
})