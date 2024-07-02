const Router = require('express');
const router = new Router();
const downloadController = require('../controllers/downloadController');

router.get('/downloadAssembly', downloadController.downloadAssembly);
router.get('/downloadLauncher', downloadController.downloadLauncher);

module.exports = router;