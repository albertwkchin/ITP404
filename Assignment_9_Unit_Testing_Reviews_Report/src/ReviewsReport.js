var ReviewsReport = function(name, reviewDataArray) {
    this.reviewDataArray = reviewDataArray;
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

        reviewDataArray.forEach(function sumUp(value) {
            rating += value.stars;
        });

        rating = rating/(reviewDataArray.length);

        //console.log('Average rating for ' + this.name + ' is ' + rating);

        this.averageStarRating = rating;
        return rating;
    };

    this.getAverageCost = function() {
        // compute average cost:
        var cost = 0;

        reviewDataArray.forEach(function sumUp(value) {
            cost += value.cost;
        });

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
        var message = "name: " + this.name + '\n' +
            "averageStarRating: " + this.averageStarRating + '\n' +
            "totalReviews: " + this.totalReviews + '\n' +
            "averageCost: {" + '\n' +
            "   numeric: " + this.averageCost.numeric + '\n' +
            "   symbol: " + this.averageCost.symbol + '\n' +
            "}";
        /*
        console.log("name: " + this.name);
        console.log("averageStarRating: " + this.averageStarRating);
        console.log("totalReviews: " + this.totalReviews);
        console.log("averageCost: {");
        console.log("   numeric: " + this.averageCost.numeric);
        console.log("   symbol: " + this.averageCost.symbol);
        console.log("}");
        */
        console.log(message);
        return message;
    };

};

ReviewsReport.prototype.findWithLowestRating = function(number) {
    var returnArray = [];
    this.reviewDataArray.forEach(function returnRestaurants(value) {
       if (value.stars >= number) {
           returnArray.push(value);
       }
    });
    return returnArray;
};
