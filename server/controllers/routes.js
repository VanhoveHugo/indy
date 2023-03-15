let express = require('express');
let router = express.Router();

const User = require('../models/users');
const Errors = require('./errors');

/*
 *  User Routes
 */
router.get('/users', (req, res) => {
    User.all((users) => {
        if(!users.some(user => user instanceof User)) return Errors.noContent(res)
        res.json(users)
    })
}).post('/users', (req, res) => {
    User.create(req.body.firstname, req.body.lastname, req.body.status, req.body.active, (user) => {
        res.json(user)
    })
})

router.get('/users/:id', (req, res) => {
    User.find(req.params.id, (user) => {
        if(!user || user.id === null) return Errors.noContent(res)
        res.json(user)
    })
}).put('/users/:id', (req, res) => {
    User.update(req.params.id, req.body.firstname, req.body.lastname, req.body.status, req.body.active, (user) => {
        res.json(user)
    })
}).delete('/users/:id', (req, res) => {
    User.delete(req.params.id, (user) => {
        res.json(user)
    })
})

router.get('/*', (req, res) => {
	Errors.pageNotFound(res)
})

module.exports = router;