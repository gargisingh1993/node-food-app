var food = require('./models/food');

function getfoods(res) {
    food.find(function (err, foods) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
		
        if (err) {
            res.send(err);
        }
		res.json(foods); // return all foods in JSON format
    });
};

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all foods
	
    app.get('/api/foods', function (req, res) {
        // use mongoose to get all foods in the database
        getfoods(res);
    });
	
    // create food and send back all foods after creation
	
    app.post('/api/foods', function (req, res) {
        // create a food, information comes from AJAX request from Angular (info regarding the name and the price of the food)
        food.create({
            text: req.body.text,
			Price: req.body.Price,
            done: false
        }, function (err, food) {
            if (err)
                res.send(err);

            // get and return all the foods after you create another
            getfoods(res);
        });

    });

    // delete a food
	
    app.delete('/api/foods/:food_id', function (req, res) {
        food.remove({
            _id: req.params.food_id
        }, function (err, food) {
            if (err)
                res.send(err);
				getfoods(res);
        });
    });
	
app.get('/api/total',function(req,res){
		// use mongoose to get all foods prices in the database
		food.find(function (err, foods) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }
		// Code to calculate the Total after VAT and other taxes 
		var totalprice = 0;
		for(var i=0;i<foods.length;i++){
				totalprice += foods[i].Price;
			}
		var totalpriceVAT = (totalprice/100)*7.5;
		totalprice += totalpriceVAT;
		return res.json(totalprice);
	});
	});
	
	// to find the total of the foods in the database 
    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};