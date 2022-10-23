const express = require('express');
const bodyParser = require('body-parser');
const serveIndex = require('serve-index');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const Alert = require('./model/Alert');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URL,
    { dbName: process.env.DB_NAME });

app.use('/public', express.static('public'));
app.use('/public', serveIndex('public'));

app.get('/', async (req, res) => {
    res.send("Hello world");
});

app.get('/alerts', async (req, res) => {
    const alerts = await Alert.find({});
    res.send(alerts);
});

app.post('/alert/:id/update', async (req, res) => {
    const alert = await Alert.findOne({ id: req.params.id });
    if ('is_new' in req.body) {
        alert.is_new = req.body.is_new;
    } else {
        if (req.body.reason) alert.reason = req.body.reason;
        if (req.body.action) alert.action = req.body.action;
        if (req.body.comment) alert.comment = req.body.comment;
    }
    await alert.save();
    res.send({ message: 'Updated Successfully!' });
})

const PORT = process.env.PORT || 5000;
app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);