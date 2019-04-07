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
    if (key == 99) {
        Sensor.findOneAndUpdate({
                sensorNumber: sensorNr
            }, {
                $set: {
                    user: user,
                    timestamp: Date.now(),
                    waterLevel: soilMoisture,
                    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1932&q=80",
                    sensorName: "Name",
                    sensorNumber: sensorNr,
                }
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

exports.renderPlantDetail = (req, res, err) => {
    Valve.find({
        _id: req.params.id
    }).then(data => {
        res.render('plant-detail', {
            title: 'Express',
            data: data
        });
    }).catch(err => {
        console.log(err);
        res.redirect('/')
    });
};

exports.addValve = (req, res, err) => {
    var now = dateFormat(new Date(), "dd.mm.yy, hh:MM:ss");
    new Valve({
        name: "Ventil 3",
        lastOpening: now,
        currentFlowRate: 0.7,
        currentWaterLevel: 50,
        irrigationData: [{}]
    }).save().then(() => {
        res.redirect('/')
    }).catch(err => {
        res.json(err)
    });
};



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