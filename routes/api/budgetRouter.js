const expressRoute = require('express');
const router = expressRoute.Router();

//Category Model
const Budget = require('../../models/Budget');

//@route GET api/categories
//@desc Get All Categories
//@access Public
router.get('/', (req, res) => {
    Budget.find()
        .sort({ date: -1 })
        .then(amount => res.json(amount))
});

//@route POST api/categories
//@desc Create an Item
//@access Public
router.post('/', (req, res) => {
    const newBudget = new Budget({
        totalamount: req.body.amount
    });

    newBudget.save().then(item => res.json(item));
});

//@route SoftDelete api/categories
//@desc SoftDelete an Item by update isActive false
//@access Public
router.put('/:id', (req, res) => {
    Budget.update({_id:req.params.id},req.body)
    .then(data => {
        if(!data) return res.status(404).end();
        return res.status(200).json(data);
    })
    .catch(err =>res.status(404).json({error: true})); 
});

module.exports = router