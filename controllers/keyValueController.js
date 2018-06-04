var keyValueModel = require('../models/keyValueModel.js');
var moment = require("moment");

/**
 * keyValueController.js
 *
 * @description :: Server-side logic for managing keyValue.
 */

const TTL = 30
const TTL_type = "seconds" // minutes | seconds | hours

module.exports = {

    /**
     * keyValueController.list()
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
        return keyValueModel
            .find(d).lean().then(datas => {
                // var ret_keyValue = []
                var ret_json = {}
                datas.map(async d => {

                    const terminate_At = moment(d.updated_at).add(TTL, TTL_type);
                    // d.updated_at = moment.utc(d.updated_at).local().format("hh:mm:ss A");
                    // d.created_at = moment.utc(d.created_at).local().format('hh:mm:ss A');
                    // d.terminate_At = terminate_At.utc().local().format("hh:mm:ss A")

                    const t = terminate_At.diff(moment(), TTL_type)
                    console.log(t)
                    if (t <= 0) {
                        keyValueModel.findByIdAndRemove(d._id).then(d => {
                            console.log('deleted')
                        })
                    }
                    else {
                        // if (req.query.keys) {
                        keyValueModel.findByIdAndUpdate(d._id).then(d => {
                            console.log('TTL Updated')
                        })
                        // }
                        // ret_keyValue.push(d)
                        ret_json[d.key] = d.value
                    }
                })
                res.send(ret_json)
            });
    },

    /**
     * keyValueController.create()
     */
    create: function(req, res) {
        var keys = Object.keys(req.body);
        const value = Object.values(req.body);

        const promise_array = keys.map(async(each_keys, i) => {

            // As key must be uniuqe in hashtable
            var query = { "key": each_keys },
                update = { "value": value[i] },
                options = { upsert: true, new: true };

            // Find the document
            return keyValueModel.findOneAndUpdate(query, update, options).then(d => {
                return d;
            }).catch(ex => {
                return ex;
            })
        })


        Promise.all(promise_array).then(function(values) {
            return res.status(201).send({
                status: true,
                message: "processed"
            })
        }).catch(ex => {
            return res.status(500).json({
                message: 'Error when updating keyvalue.',
                error: ex
            });
        });
    },
    update: function(req, res) {
        var keys = Object.keys(req.body);
        const value = Object.values(req.body);

        let prmises = keys.map(async(each_keys, i) => {

            // As key must be uniuqe in hashtable
            var query = { "key": each_keys },
                update = { "value": value[i] }

            // Find the document
            return keyValueModel.findOneAndUpdate(query, update).then(d => {
                return d;
            }).catch(ex => {
                return ex;
            })
        })

        Promise.all(prmises).then(function(values) {
            return res.status(201).send({
                status: true,
                message: "processed"
            })
        }).catch(ex => {
            return res.status(500).json({
                message: 'Error when updating keyvalue.',
                error: ex
            });
        });
    }
};
