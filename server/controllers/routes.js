const express = require('express');
const router = express.Router();

const Admin = require('../models/admin');
const Services = require('../models/services');
const Tips = require('../models/tips');
const User = require('../models/users');
const Response = require('./response');

const jwt = require('jsonwebtoken');
const hasValidToken = require('../utils/handleToken');

/*
 *  User Routes
 */
router.get('/users', (req, res) => {
    User.all((users) => {
        if (!users.some(user => user instanceof User)) return Response.noContent(res)
        res.json(users)
    })
}).post('/users', (req, res) => {
    if (!req.body.firstname || !req.body.lastname || !req.body.status || !req.body.active) return Response.badRequest(res)
    User.create(req.body.firstname, req.body.lastname, req.body.status, req.body.active, (user) => {
        Response.success(res)
    })
})

router.get('/users/:id', (req, res) => {
    User.find(req.params.id, (user) => {
        if (!user || user.id === null) return Response.noContent(res)
        res.json(user)
    })
}).put('/users/:id', (req, res) => {
    if (!req.body.firstname || !req.body.lastname || !req.body.status || !req.body.active) return Response.badRequest(res)
    User.update(req.params.id, req.body.firstname, req.body.lastname, req.body.status, req.body.active, (user) => {
        Response.success(res)
    })
}).delete('/users/:id', hasValidToken, (req, res) => {
    User.delete(req.params.id, (user) => {
        Response.success(res)
    })
})


/*
 *  Tips Routes
 */
router.get('/tips', (req, res) => {
    Tips.all((tips) => {
        if (!tips.some(tip => tip instanceof Tips)) return Response.noContent(res)
        res.json(tips)
    })
}).post('/tips', (req, res) => {
    if (!req.body.userid || !req.body.name) return Response.badRequest(res)
    Tips.create(req.body.userid, req.body.name, (tip) => {
        Response.success(res)
    })
})

router.get('/tips/:id', (req, res) => {
    Tips.find(req.params.id, (tip) => {
        if (!tip || tip.id === null) return Response.noContent(res)
        res.json(tip)
    })
}).put('/tips/:id', hasValidToken, (req, res) => {
    if (!req.body.name) return Response.badRequest(res)
    Tips.update(req.params.id, req.body.name, (tip) => {
        Response.success(res)
    })
}).delete('/tips/:id', hasValidToken, (req, res) => {
    Tips.delete(req.params.id, (tip) => {
        Response.success(res)
    })
})


/*
 *  Services Routes
 */
router.get('/services', (req, res) => {
    Services.all((services) => {
        if (!services.some(service => service instanceof Services)) return Response.noContent(res)
        res.json(services)
    })
}).post('/services', (req, res) => {
    if (!req.body.shiftType || !req.body.shiftClose) return Response.badRequest(res)
    Services.create(req.body.shiftType, req.body.shiftClose, (service) => {
        Response.success(res)
    })
})

router.get('/services/:id', (req, res) => {
    Services.find(req.params.id, (service) => {
        if (!service || service.id === null) return Response.noContent(res)
        res.json(service)
    })
}).put('/services/:id', (req, res) => {
    if (!req.body.shiftType || !req.body.shiftClose) return Response.badRequest(res)
    Services.update(req.params.id, req.body.shiftType, req.body.shiftClose, (service) => {
        Response.success(res)
    })
}).delete('/services/:id', hasValidToken, (req, res) => {
    Services.delete(req.params.id, (service) => {
        Response.success(res)
    })
})


/*
 *  Admin Routes
 */
router.post('/admin', (req, res) => {
    if (!req.body.pincode) return Response.badRequest(res)
    Admin.find(req.body.pincode, (admin) => {
        if (!admin || admin.id === null) return Response.noContent(res)
        const token = jwt.sign({pincode: admin.pincode}, "SecretJWT", {expiresIn: '1h'})
        req.session.token = token
        console.log(req.session.token);
        Response.success(res)
    })
}).post('/admin/new', hasValidToken, (req, res) => {
    console.log(req.body.pincode);
    console.log(req.session.token);
    if (!req.body.pincode) return Response.badRequest(res)
    Admin.create(req.body.pincode, (pincode) => {
        if (!pincode || pincode.id === null) return Response.noContent(res)
        Response.success(res)
    })
})

/*
 * Statistic Routes
 */
router.get('/statistics', (req, res) => {
    User.all((users) => {
        Tips.all((tips) => {
            Services.all((services) => {
                const statistics = {
                    users: users.length,
                    tips: tips.length,
                    services: services.length
                }
                res.json(statistics)
            })
        })
    })
})


/*
 *  Handle Other Routes
 */
router.get('/*', (req, res) => {
    Response.pageNotFound(res)
})

module.exports = router;