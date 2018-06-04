var express = require('express');
var router = express.Router();
var keyValueController = require('../controllers/keyValueController');

/*
 * GET
 */
router.get('/', keyValueController.list);

/*
 * POST
 */
router.post('/', keyValueController.create);

/*
 * PUT
 */
router.patch('/', keyValueController.update);

/*
 * DELETE
 */
// router.delete('/:id', keyValueController.remove);

module.exports = router;
