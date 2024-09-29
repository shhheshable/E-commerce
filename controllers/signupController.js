const path = require('path');
const signUp = require('../models/signupModel');
const multer = require('multer');
const { exit } = require('process');

const createAcc = (req, res) => {
    const Fname = req.body.firstname;
    const Lname = req.body.lastname;
    const Bday = req.body.birthdate;
    const contactNumber = req.body.contact;
    const States = req.body.state;
    const CityName = req.body.city;
    const ZipCode = req.body.zip;
    const EmailAdd = req.body.email;
    const Pass = req.body.register_password;
    const accId = req.body.acc_id;
    signUp.createUser({Fname, Lname, Bday, contactNumber, States, CityName, ZipCode, EmailAdd, Pass, accId}, (err) => {
        if (err) {
            return res.status(500).send('error');
        }
        res.redirect('/signup');
    });
};

module.exports = {createAcc};