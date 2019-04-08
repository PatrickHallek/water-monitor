var Sensor = require('../models/sensor');
var dateFormat = require('dateformat');

exports.getSensorData = (req, res, err) => {
    Sensor.find({
            user: req.params.id
        })
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.json("Nothing found in database :(");
        })
};

exports.postSensor = (req, res, err) => {
    var data = res.socket.parser.incoming.body;
    var user = data.user;
    var key = data.soilMoisture.toString().slice(0, 2);
    var sensorNr = data.soilMoisture.toString().slice(2, 5);
    var soilMoisture = 100 - data.soilMoisture.toString().slice(5, 8);

    var update = {};
    if (user) update.user = user;
    if (waterLevel) update.waterLevel = soilMoisture;
    if (sensorNr) update.sensorNr = sensorNr;
    update.timestamp = Date.now();
    update.sensorNumber = "Name";
    update.room = "Raum";
    update.duration = 1;
    update.image = "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1932&q=80";


    if (key == 99) {
        Sensor.findOneAndUpdate({
                sensorNumber: sensorNr,
                user: data.user
            }, {
                $set: update
            }, {
                upsert: true,
            })
            .then(data => {
                res.status(201).json({
                    message: "Data saved to database!",
                    data: data
                });
            })
            .catch(err => {
                console.log(err);
            });
    } else {
        console.log(data);
    }
}

exports.postUpdateSensor = (req, res, err) => {
    var update = {};
    if (req.body.image) update.image = req.body.image;
    if (req.body.sensorName) update.sensorName = req.body.sensorName;
    if (req.body.duration) update.duration = req.body.duration;
    if (req.body.room) update.room = req.body.room;
    if (!req.body.user) {
        res.status(201).json({
            message: "No user"
        });
        return;
    };
    Sensor.findOneAndUpdate({
            sensorNumber: req.body.sensorNr,
            user: req.body.user
        }, {
            $set: update
        }, {
            upsert: false,
        })
        .then(data => {
            res.status(201).json({
                message: "Data saved to database!",
                data: data
            });
        })
        .catch(err => {
            console.log(err);
        });
}











exports.postStreamSensor = (req, res, err) => {
    var data = res.socket.parser.incoming.body;
    var user = data.user;
    var key = data.soilMoisture.toString().slice(0, 1);
    var sensorNr = data.soilMoisture.toString().slice(1, 4);
    var soilMoisture = data.soilMoisture.toString().slice(4, 8) / 10;
    if (soilMoisture > 100) {
        soilMoisture = 100;
    }
    if (key == 9) {
        var update = {
            "$push": {}
        };
        update["$push"]["sensor." + sensorNr + ".dataStream"] = {
            timestamp: Date.now(),
            waterLevel: soilMoisture + "%",
        };

        Valve.findOneAndUpdate({
                user: user
            }, update, {
                upsert: true,
            })
            .then(data => {
                res.status(201).json({
                    message: "Data saved to database!",
                    data: data
                });
            })
            .catch(err => {
                console.log(err);
            });
    } else {
        console.log("Wrong key");
    }
}