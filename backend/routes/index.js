var express = require('express');
var router = express.Router();
var IndexController = require("../controller/index");

router.get('/:id', IndexController.getSensorData);
router.get('/plant/:id', IndexController.renderPlantDetail);
router.get('/add', IndexController.addValve);
router.post('/', IndexController.postSensor);
module.exports = router;
