var express = require('express');
var router = express.Router();
var IndexController = require('../controllers/index_controller');



router.get('/', IndexController.getIndexPage);
router.post('/', IndexController.postResponse);
router.get('/reset', IndexController.resetQuestion);
router.get('/statistic', IndexController.getStatisticPage);
router.get('/getuser', IndexController.getUser);
router.post('/setname', IndexController.setName);
router.get('/statistic_data', IndexController.getStatisticData);

module.exports = router;