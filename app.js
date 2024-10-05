const express = require('express');
const app = express();
const cartRoutes = require('./routes/cartRoutes'); // Make sure the file path is correct
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); 

app.use('/', cartRoutes); // Using cartRoutes

app.listen(8000, () => {
    console.log('Server running on http://localhost:8000');
});
