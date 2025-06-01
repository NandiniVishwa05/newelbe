const { request, response } = require("express");
const db = require("../db")
const insertFormData = ('/add', (req, res) => {
    const { name, address, department, udob, gender, hobbies } = req.body;
    console.log("Received req.body:", req.body);
    console.log("Hobbies received:", hobbies);
    const userQuery = `INSERT INTO userdetails (uname, uaddress, udepartment, udob, ugender) VALUES (?, ?, ?, ?, ?)`;
    db.query(userQuery, [name, address, department, udob, gender], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Failed to insert user');
        }
        const userId = result.insertId;
        const hobbyQuery = `INSERT INTO user_hobbies (user_id, hobby_id) VALUES (?, ?)`;
        let i = 0;
        function insertNextHobby() {
            if (i < hobbies.length) {
                db.query(hobbyQuery, [userId, hobbies[i]], (err2) => {
                    if (err2) {
                        console.error(err2);
                        return res.status(500).send('Failed to insert hobbies');
                    }
                    i++;
                    insertNextHobby();
                });
            } else {
                res.send({ msg: "UserInsertedSuccessfully" });
            }
        }
        insertNextHobby();
    });
});

module.exports = { insertFormData }