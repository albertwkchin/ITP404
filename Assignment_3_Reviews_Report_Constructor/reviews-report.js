/* data */

var reviews = {};

reviews.restaurantA = [
    {
        title: '',
        stars: 4,
        cost: 2,
        description: ''
    },
    {
        title: '',
        stars: 3,
        cost: 1,
        description: ''
    },
    {
        title: '',
        stars: 4,
        cost: 3,
        description: ''
    },
    {
        title: '',
        stars: 4,
        cost: 3,
        description: ''
    },
    {
        title: '',
        stars: 5,
        cost: 2,
        description: ''
    },
    {
        title: '',
        stars: 3,
        cost: 2,
        description: ''
    }
];

reviews.restaurantB = [
    {
        title: '',
        stars: 5,
        cost: 3,
        description: ''
    },
    {
        title: '',
        stars: 3,
        cost: 4,
        description: ''
    },
    {
        title: '',
        stars: 4,
        cost: 4,
        description: ''
    },
    {
        title: '',
        stars: 5,
        cost: 4,
        description: ''
    },
    {
        title: '',
        stars: 2,
        cost: 3,
        description: ''
    },
    {
        title: '',
        stars: 5,
        cost: 4,
        description: ''
    },
    {
        title: '',
        stars: 5,
        cost: 5,
        description: ''
    }
];

var ReviewsReport = function(name, reviewDataArray) {
    this.name = name;
    this.averageStarRating = null;
    this.totalReviews = reviewDataArray.length;
    this.averageCost = {
        numeric: null,
        symbol: null
    }

    this.getAverageRating = function() {
        // compute average rating:
        var rating = 0;

        for (var i = 0; i < reviewDataArray.length; i++) {
            rating = rating + reviewDataArray[i].stars;
        }

        rating = rating/(reviewDataArray.length);

        //console.log('Average rating for ' + this.name + ' is ' + rating);

        this.averageStarRating = rating;
        return rating;
    };

    this.getAverageCost = function() {
        // compute average cost:
        var cost = 0;

        for (var i = 0; i < reviewDataArray.length; i++) {
            cost = cost + reviewDataArray[i].cost;
        }

        cost = cost/(reviewDataArray.length);

        //console.log('Average cost for ' + this.name + ' is ' + cost);

        this.averageCost.numeric = cost;
        return cost;
    };

    this.convertCostToDollarSign = function(cost) {
        // convert the cost to symbol
        if (cost < 1.5) {
            this.averageCost.symbol = "$";
        }

        else if ( (cost >= 1.5) && (cost < 2.5) ) {
            this.averageCost.symbol = "$$";
        }

        else if ( (cost >= 2.5) && (cost < 3.5) ) {
            this.averageCost.symbol = "$$$";
        }

        else { // cost is damn high!!!!
            this.averageCost.symbol = "$$$$";
        }
    }

    this.summarize = function() {
        console.log("name: " + this.name);
        console.log("averageStarRating: " + this.averageStarRating);
        console.log("totalReviews: " + this.totalReviews);
        console.log("averageCost: {");
        console.log("   numeric: " + this.averageCost.numeric);
        console.log("   symbol: " + this.averageCost.symbol);
        console.log("}");
    };

};

var reportA = new ReviewsReport('Restaurant A 2014', reviews.restaurantA);
reportA.getAverageRating(); // 3.8333333333333335
reportA.getAverageCost(); // 2.1666666666666665
reportA.convertCostToDollarSign(2.1666666666666665); // '$$'

var reportB = new ReviewsReport('Restaurant B 2014', reviews.restaurantB);
reportB.getAverageRating(); // 4.142857142857143
reportB.getAverageCost(); // 3.857142857142857
reportB.convertCostToDollarSign(3.857142857142857); // '$$$$'

console.log("reportA.summarize():");
reportA.summarize();

console.log("reportB.summarize():");
reportB.summarize();


