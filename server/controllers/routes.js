let express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.get('/*', (req, res) => {
	res.send('404')
})

module.exports = router;