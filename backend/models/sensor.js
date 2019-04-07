var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Sensor = new Schema({
    user: String,
    image: String,
    sensorName: String,
    sensorNumber: Number,
    timestamp: Date,
    waterLevel: String,
});

module.exports = mongoose.model('sensor', Sensor);