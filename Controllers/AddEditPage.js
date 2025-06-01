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

const fetchformdetails = (request, response) => {
    let uid = request.params.uid;
    console.log(uid);

    let query = `select * from userdetails where id = ${uid}`;
    let query2 = `select hobby_id from user_hobbies as u join hobby as h on u.hobby_id = h.id where user_id = ${uid}`;
    db.query(query, (err, data) => {
        if (err) {
            console.log(err);
        } else if (data.length > 0) {
            db.query(query2, (err2, data2) => {
                data[0].hobby = data2
                console.log(data2);
                
                response.json({ msg: "Datafound", data: data });
            })
        } else {
            response.status(404).json({ msg: "DataNotFound" });
        }
    })
}
module.exports = { insertFormData, fetchformdetails }