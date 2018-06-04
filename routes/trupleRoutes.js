var express = require('express');
var router = express.Router();
var trupleController = require('../controllers/trupleController.js');

/*
 * GET
 */
router.get('/', trupleController.list);

/*
 * POST
 */
router.post('/', trupleController.create);

/*
 * PUT
 */
router.patch('/', trupleController.update);

/*
 * DELETE
 */
// router.delete('/:id', trupleController.remove);

module.exports = router;
