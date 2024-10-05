const accsModel = require('../models/accsModel'); // Adjust the path as necessary

exports.getUsers = (req, res) => {
    accsModel.getUsers((err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            return res.status(500).json({ message: 'Error fetching users' });
        }
        res.json(results); // Send the results as JSON response
    });
};
