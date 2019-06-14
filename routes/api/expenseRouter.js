const expressRoute = require('express');
const router = expressRoute.Router();

//Category Model
const Expense = require('../../models/Expense');

//@route GET api/expense
//@desc Get All Expenses
//@access Public
router.get('/', (req, res) => {
    Expense.find()
        .sort({ date: -1 })
        .then(items => res.json(items))
});

//@route POST api/expenses
//@desc Create an Expense
//@access Public
router.post('/', (req, res) => {
    const newItem = new Expense({
        category: req.body.category,
        item: req.body.item,
        amount: req.body.amount
    });

    newItem.save().then(item => res.json(item));
});

//@route Delete api/expenses
//@desc Delete an Item
//@access Public
router.delete('/:id', (req, res) => {
    Expense.findById(req.params.id) //id is from the URI
        .then(item => item.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: true }));
});

//@route SoftDelete api/expenses
//@desc SoftDelete an Expense by updating isActive false
//@access Public
router.put('/:id', (req, res) => {
    Expense.update({_id:req.params.id},req.body)
    .then(data => {
        if(!data) return res.status(404).end();
        return res.status(200).json(data);
    })
    .catch(err =>res.status(404).json({error: true}));
});

module.exports = router