const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const categories = require('./routes/api/categoriesRouter');
const expenses = require('./routes/api/expenseRouter');
const budget = require('./routes/api/budgetRouter');

const app = express();

//Bodyparser MiddleWare
app.use(bodyParser.json());

//DB config
const db = require('./Config/Keys').mongoURI;

//Connect to Mongo
mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true
})
    .then(() => console.log("MongoDB Connected..."))
    .catch(err => console.log(err));

//Use Routes
app.use('/api/category', categories);
app.use('/api/budget', budget);
app.use('/api/expense', expenses);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
