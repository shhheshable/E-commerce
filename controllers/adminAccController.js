// adminAccController.js
const adminAccModel = require('../models/adminAccModel');

exports.getAdminAccount = (req, res) => {
    const userToken = req.query.token || req.session.userToken; // Get token from query or session
    console.log('User Token:', userToken); // Log for debugging

    // Check if the token is defined
    if (!userToken) {
        return res.status(401).json({ error: 'Unauthorized access. Token is missing.' });
    }

    adminAccModel.getAdminAccount(userToken, (err, accountData) => {
        if (err) {
            console.error('Error fetching admin account data:', err);
            return res.status(500).json({ error: 'Server error' });
        }

        console.log('Account Data:', accountData); // Log account data

        // Render the admin account view, passing account data
        res.render('admin/adminAcc', {
            account: accountData, // Pass account data to the view
            token: userToken // Pass the user token to the view if needed
        });
    });
};
