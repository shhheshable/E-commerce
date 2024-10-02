const path = require('path');
const home = require('../models/homeModel');
const multer = require('multer');
const { exit } = require('process');



const logs = (req, res) => {
    

    

      
        
            // Store the token in the session
            req.session.userToken = result.token; // Store the token in the session

            // If the login is successful, redirect to the home page
           res.redirect(`/blala?${result.token}`);
  
};

module.exports = {logs};