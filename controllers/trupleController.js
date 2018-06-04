var trupleModel = require('../models/trupleModel.js');
var moment = require("moment");

/**
 * trupleController.js
 *
 * @description :: Server-side logic for managing truples.
 */

const TTL = 300
const TTL_type = "seconds" // minutes | seconds | hours

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
            .find(d).lean().then(datas => {
                // var ret_truple = []
                var ret_json = {}
                datas.map(async d => {

                    const terminate_At = moment(d.updated_at).add(TTL, TTL_type);
                    // d.updated_at = moment.utc(d.updated_at).local().format("hh:mm:ss A");
                    // d.created_at = moment.utc(d.created_at).local().format('hh:mm:ss A');
                    // d.terminate_At = terminate_At.utc().local().format("hh:mm:ss A")
                    
                    
                    
                    const t = terminate_At.diff(moment(), TTL_type)
                    console.log(t)
                    if (t <= 0) {
                        trupleModel.findByIdAndRemove(d._id).then(d => {
                            console.log('deleted')
                        })
                    }
                    else {
                        if (req.query.keys) {
                            trupleModel.findByIdAndUpdate(d._id).then(d => {
                                console.log('TTL Updated')
                            })
                        }
                        // ret_truple.push(d)
                        ret_json[d.key] = d.value
                    }
                })

                res.send(ret_json)
            });
    },

    /**
     * trupleController.create()
     */
    create: function(req, res) {
        const key = Object.keys(req.body)[0];
        const value = Object.values(req.body)[0];
        
        // As key must be uniuqe in hashtable 
        
        var query = { "key": key },
            update = { "value": value },
            options = { upsert: true, new: true };

        // Find the document
        trupleModel.findOneAndUpdate(query, update, options).then(d => {
            res.status(201).json(d)
        })
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
