var Sensor = require('../models/sensor');
var dateFormat = require('dateformat');

exports.getSensorData = (req, res, err) => {
    Sensor.find({
            appToken: req.params.id
        })
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.json("Nothing found in database :(");
        })
};

exports.postSensor = (req, res, err) => {
    var data = res.socket.parser.incoming.body;
    var appToken = data.appToken;
    var key = data.soilMoisture.toString().slice(0, 2);
    var sensorNr = data.soilMoisture.toString().slice(2, 5);
    var waterLevel = 100 - data.soilMoisture.toString().slice(5, 8);

    var update = {};
    if (appToken) update.appToken = appToken;
    if (waterLevel) update.waterLevel = waterLevel;
    if (sensorNr) update.sensorNr = sensorNr;
    update.timestamp = Date.now();

    console.log(update);

    if (key == 99 && sensorNr >= 100) {
        Sensor.findOneAndUpdate({
                sensorNumber: sensorNr,
                appToken: data.appToken
            }, {
                $set: update
            }, {
                upsert: true,
            })
            .then(data => {
                res.status(200).json({
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
    if (!req.body.appToken) {
        res.status(201).json({
            message: "No user"
        });
        return;
    };
    console.log(req.body)
    Sensor.findOneAndUpdate({
            sensorNumber: req.body.sensorNumber,
            appToken: req.body.appToken
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

exports.postDeleteSensor = (req, res, err) => {
    console.log(req.body)
    if (!req.body.appToken && !req.body.sensorNumber) {
        res.status(201).json({
            message: "No user"
        });
        return;
    };
    Sensor.findOneAndDelete({
            sensorNumber: req.body.sensorNumber,
            appToken: req.body.appToken
        })
        .then(data => {
            res.status(201).json({
                message: "Sensor was deleted",
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