require('dotenv').config();
const express = require('express')
const cors = require('cors')
const router = require('./routes/index')
const fileUpload = require('express-fileupload')
const path = require('path')
const errorHandler = require('./middleware/ErrorHandlingMiddleware.js')

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static', 'images', 'profile-pics')));
app.use(fileUpload({}));
app.use('/launcher', router);

app.use(errorHandler);

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Server started on ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start();
