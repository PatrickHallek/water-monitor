var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Sensor = new Schema({
    user: String,
    duration: Number,
    image: String,
    sensorName: String,
    sensorNumber: Number,
    timestamp: Date,
    waterLevel: String,
    room: String
});

module.exports = mongoose.model('sensor', Sensor);