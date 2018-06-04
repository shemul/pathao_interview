var trupleModel = require('../models/trupleModel.js');

/**
 * trupleController.js
 *
 * @description :: Server-side logic for managing truples.
 */
module.exports = {

    /**
     * trupleController.list()
     */
    list: function (req, res) {
        trupleModel.find(function (err, truples) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting truple.',
                    error: err
                });
            }
            return res.json(truples);
        });
    },

    /**
     * trupleController.create()
     */
    create: function (req, res) {
        var truple = new trupleModel({
			key : req.body.key,
			value : req.body.value

        });

        truple.save(function (err, truple) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating truple',
                    error: err
                });
            }
            return res.status(201).json(truple);
        });
    },

    /**
     * trupleController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        trupleModel.findOne({_id: id}, function (err, truple) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting truple',
                    error: err
                });
            }
            if (!truple) {
                return res.status(404).json({
                    message: 'No such truple'
                });
            }

            truple.key = req.body.key ? req.body.key : truple.key;
			truple.value = req.body.value ? req.body.value : truple.value;
			
            truple.save(function (err, truple) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating truple.',
                        error: err
                    });
                }

                return res.json(truple);
            });
        });
    }
};
