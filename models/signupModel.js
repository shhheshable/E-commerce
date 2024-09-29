const db = require('../config/db');

exports.createUser = ({Fname, Lname, Bday, contactNumber, States, CityName, ZipCode, EmailAdd, Pass}, callback) => {
    const query = 'insert into tblaccounts (email, password) values (?, ?)';

    db.query(query, [EmailAdd, Pass], (err, results) => {
        callback(err, results);
        
    console.log('ayos na')
    });

};

exports.createUser = ({Fname, Lname, Bday, contactNumber, States, CityName, ZipCode, EmailAdd, Pass}, callback) => {
    const query = 'insert into tbluser (name, birthdate, profile, address) values (?, ?, ?, ?, ?)';

    db.query(query, [])
};