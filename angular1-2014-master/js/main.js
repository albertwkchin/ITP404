var app = angular.module('gradebook', []);

app.controller('GradebookController', function ($scope, gradesApi, gradeStats) {

    $scope.students = [];
    //$http.get('grades.json').then(function(response) {
    //   console.log(response);
    //   $scope.students = response.data;
    //});

    gradesApi.all().then(function(response) {
        $scope.students = response.data;

    });

    //[
    //	{ "first": "Michael", "last": "Crowley", "grade": 19.5 },
    // 	{ "first": "David", 	"last": "Tang", 	 "grade": 18.0 },
    // 	{ "first": "Patrick", "last": "Dent", 	 "grade": 18.5 },
    //	{ "first": "Trina", 	"last": "Gregory", "grade": 19.0 },
    //	{ "first": "Nitin", 	"last": "Kale", 	 "grade": 20.0 }
    //]

    $scope.$watch('students', function() {
        $scope.gradeAverage = gradeStats.getAverage($scope.students);
    }, true);

    $scope.addStudent = function() {
      console.log('adding student');
      console.log($scope.first, $scope.last, $scope.grade);
      $scope.students.push({
          first: $scope.first,
          last: $scope.last,
          grade: $scope.grade
      });
    };
});

app.factory('gradesApi', function($http) {
   return {
       all: function() {
            return $http.get('grades.json');
       }
   }
});

app.factory('gradeStats', function() {
    function getAverage(students) {
        var sum = 0;

        students.forEach(function(student) {
           sum += student.grade;
        });

        return sum / students.length;
    }

    return {
        getAverage: getAverage
    }
});












