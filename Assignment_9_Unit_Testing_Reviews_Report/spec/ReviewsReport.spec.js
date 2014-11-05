describe('ReviewsReport', function() {
    var reviews = {};
    var reportA;
    var reportB;

    beforeEach(function() {
        reviews.restaurantA = [
            {
                title: '',
                stars: 5,
                cost: 11,
                description: ''
            },
            {
                title: '',
                stars: 4,
                cost: 13,
                description: ''
            },
            {
                title: '',
                stars: 3,
                cost: 15,
                description: ''
            },
            {
                title: '',
                stars: 2,
                cost: 17,
                description: ''
            },
            {
                title: '',
                stars: 1,
                cost: 19,
                description: ''
            },
            {
                title: '',
                stars: 3,
                cost: 21,
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
                stars: 5,
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
                cost: 2,
                description: ''
            },
            {
                title: '',
                stars: 4,
                cost: 2,
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
                stars: 1,
                cost: 3,
                description: ''
            }
        ];

        reportA = new ReviewsReport('Restaurant A 2014', reviews.restaurantA);
        reportB = new ReviewsReport('Restaurant B 2014', reviews.restaurantB);
    });


    describe('report.getAverageRating()', function() {
        it('should return the average rating of the restaurant', function() {
            var averageRatingA = reportA.getAverageRating();
            var averageRatingB = reportB.getAverageRating();
            expect(averageRatingA).toEqual(3);
            expect(averageRatingB).toEqual(4);
        });
    });

    describe('report.getAverageCost()', function() {
        it('should return the average cost of the restaurant', function() {
            var averageRatingA = reportA.getAverageCost();
            var averageRatingB = reportB.getAverageCost();
            expect(averageRatingA).toEqual(16);
            expect(averageRatingB).toEqual(3);
        });
    });

    describe('report.convertCostToDollarSign()', function() {
        it('should return the average cost of the restaurant', function() {
            reportA.convertCostToDollarSign(reportA.getAverageCost());
            reportB.convertCostToDollarSign(reportB.getAverageCost());
            expect(reportA.averageCost.symbol).toEqual("$$$$");
            expect(reportB.averageCost.symbol).toEqual("$$$");
        });
    });

    describe('report.summarize()', function() {
        it('should print out all the restaurant statistics', function() {
            var messageA = reportA.summarize();
            var messageB = reportB.summarize();
            expect(messageA).toEqual("name: " + reportA.name + '\n' +
                "averageStarRating: " + reportA.averageStarRating + '\n' +
                "totalReviews: " + reportA.totalReviews + '\n' +
                "averageCost: {" + '\n' +
                "   numeric: " + reportA.averageCost.numeric + '\n' +
                "   symbol: " + reportA.averageCost.symbol + '\n' +
                "}");
            expect(messageB).toEqual("name: " + reportB.name + '\n' +
                "averageStarRating: " + reportB.averageStarRating + '\n' +
                "totalReviews: " + reportB.totalReviews + '\n' +
                "averageCost: {" + '\n' +
                "   numeric: " + reportB.averageCost.numeric + '\n' +
                "   symbol: " + reportB.averageCost.symbol + '\n' +
                "}");
        });
    });

    describe('report.findWithLowestRating(4)', function() {
        it('should return arrays with restaurants with stars >= 4', function() {
            var returnArrayA = reportA.findWithLowestRating(4);
            var returnArrayB = reportB.findWithLowestRating(4);
            expect(returnArrayA).toEqual([
                {
                    title: '',
                    stars: 5,
                    cost: 11,
                    description: ''
                },
                {
                    title: '',
                    stars: 4,
                    cost: 13,
                    description: ''
                }
            ]);
            expect(returnArrayB).toEqual([
                {
                    title: '',
                    stars: 5,
                    cost: 3,
                    description: ''
                },
                {
                    title: '',
                    stars: 5,
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
                    cost: 2,
                    description: ''
                },
                {
                    title: '',
                    stars: 4,
                    cost: 2,
                    description: ''
                }
            ]);
        });
    });

});