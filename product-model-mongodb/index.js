const express = require("express")
const app = express();
const mongoose = require('mongoose');

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
})

app.get('/', (req, res) => {
    res.send('Hello there')
});

mongoose.connect('yourmongodbkey')
.then(() => {
    console.log('Connected to database');
})
.catch((error) => {
    console.log('Connection failed', error)
})