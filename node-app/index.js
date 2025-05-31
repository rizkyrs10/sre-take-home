const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello from Node.js Service!');
});

app.listen(8080, () => {
    console.log('Node.js Service running on port 8080');
});
