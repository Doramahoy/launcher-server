const Router = require('express');
const router = new Router();
const updateController = require('../controllers/updateController');

router.get('/checkUpdateAssembly', updateController.checkUpdateAssembly);
router.get('/downloadUpdateAssembly', updateController.downloadUpdateAssembly);
router.get('/checkUpdateLauncher', updateController.checkUpdateLauncher);
router.get('/downloadUpdateLauncher', updateController.downloadUpdateLauncher);

module.exports = router;