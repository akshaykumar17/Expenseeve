const expressRoute = require('express');
const router = expressRoute.Router();

//Category Model
const Item = require('../../models/Category');

//@route GET api/categories
//@desc Get All Categories
//@access Public
router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items))
});

//@route POST api/categories
//@desc Create an Item
//@access Public
router.post('/', (req, res) => {
    const newItem = new Item({
        category: req.body.category
    });

    newItem.save().then(item => res.json(item));
});

//@route Delete api/categories
//@desc Delete an Item
//@access Public
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id) //id is from the URI
        .then(item => item.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: true }));
});

//@route SoftDelete api/categories
//@desc SoftDelete an Item by update isActive false
//@access Public
router.put('/:id', (req, res) => {
    Item.update({_id:req.params.id},req.body)
    .then(data => {
        if(!data) return res.status(404).end();
        return res.status(200).json(data);
    })
    .catch(err =>res.status(404).json({error: true}));
});

module.exports = router