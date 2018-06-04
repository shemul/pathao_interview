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
    list: function(req, res) {
        var keyset = []
        let d = {}

        if (req.query.keys) {
            keyset = req.query.keys.split(",")
            d = {
                ...d,
                'key': keyset
            }
        }
        return trupleModel
            .find(d, {
                _id: 0,
                key: 1,
                value: 1
            }).lean().then(datas => {
                res.send(datas)
            });
    },

    /**
     * trupleController.create()
     */
    create: function(req, res) {
        const key = Object.keys(req.body)[0];
        const value = Object.values(req.body)[0];
        var truple = new trupleModel({
            key: key,
            value: value
        });

        truple.save(function(err, truple) {
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
    update: function(req, res) {

        const key = Object.keys(req.body)[0];
        const value = Object.values(req.body)[0];

        trupleModel.findOne({ 'key': key }, function(err, truple) {
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

            // truple.key = req.body.key ? req.body.key : truple.key;
            truple.key = key;
            truple.value = value;

            truple.save(function(err, truple) {
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
