const { request, response } = require("express");
const db = require("../db")
const fetchtabledata = (request, response) => {
    let query = `select * from userdetails`;
    db.query(query, (err, data) => {
        if (err) {
            console.log(err);
        } else if (data.length > 0) {
            response.json({ msg: "Datafound", data: data });
        } else {
            response.status(404).json({ msg: "DataNotFound" });
        }
    })
}
const deleteuserdata = (request, response) => {
    let uid = request.params.uid;
    let query = `delete from userdetails where id = ${uid}`;
    db.query(query, (err, data) => {
        if (err) {
            console.log(err);
        } else if (data.affectedRows > 0) {
            response.json({ msg: "DataDeleted" });
        }
    })
}
const searchuserdata = (request, response) => {
    let searchinput = request.params.searchinput;
    let query = `select * from userdetails where uname like '%${searchinput}%'`;
    db.query(query, (err, data) => {
        if (err) {
            console.log(err);
        } else if (data.length > 0) {
            response.json({ msg: "SearchDataSuccessfully", data: data });
        } else {
            response.json({ msg: "DataNotFound" })
        }
    })
}
module.exports = { deleteuserdata, fetchtabledata, searchuserdata }