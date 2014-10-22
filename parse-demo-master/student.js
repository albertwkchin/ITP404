// unsure of what to actually put for the arguments of initialize
Parse.initialize("pnJygXb8gR6uLVsHteh9TOVPD7274xUC4ibX8or3", "V9bxmD1uicpUI8svYWu7W0IsLbTvJV4UISRHynVu");

// Student model
var Student = Parse.Object.extend('Student');

var jane = new Student();
jane.save({
    first: 'Jane',
    last: 'Doe',
    position: 'TA'
}).then(function () {
   console.log('saved', jane, jane.toJSON());
});

jane.save({
   position: 'student'
});