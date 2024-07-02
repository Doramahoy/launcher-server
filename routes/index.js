const Router = require('express')

const router = new Router();
const updateRouter = require('./updateRouter')
const downloadRouter = require('./downloadRouter')

router.use('/update', updateRouter);
router.use('/download', downloadRouter);
module.exports = router;