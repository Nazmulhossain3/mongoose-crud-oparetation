const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.use(express.json());

// Connect to the database using mongoose
mongoose.connect('mongodb://localhost:27017/todos', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Connection is successful"))
    .catch(err => console.error("Connection failed:", err));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
