const { request, response } = require("express");
const db = require("../db")
const checkuser = (request, response) => {
    let { username, password } = request.body;
    let query = `select username,upassword from usercredentials where username="${username}" and upassword="${password}"`;
    db.query(query, (err, data) => {
        if (err) {
            console.log(err);
        } else if (data.length > 0) {
            response.status(200).json({ msg: "validuser"});
        } else {
            response.status(404).json({ msg: "invaliduser" });
        }
    })
}
module.exports = { checkuser }