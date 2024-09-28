const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use()
app.set('view engine', 'ejs');
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.use('/', authRoutes);


const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
