const path = require('path');

const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Internal Server Error'); // Handle error
        }
        // Redirect to login or home page after successful logout
        res.redirect('/login'); // Redirect to login page
    });
};

module.exports = { logout };
