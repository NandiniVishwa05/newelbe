const express = require("express")
const router = express.Router()
const { checkuser } = require("../Controllers/Login")
const { insertFormData } = require("../Controllers/AddEditPage")
const { fetchtabledata} = require("../Controllers/ListPage")
const { deleteuserdata,searchuserdata} = require("../Controllers/ListPage")
router.post('/checkuser', checkuser);
router.post('/insertFormData', insertFormData);
router.get('/fetchtabledata', fetchtabledata);
router.delete('/deleteuserdata/:uid', deleteuserdata);
router.get('/searchuserdata/:searchinput', searchuserdata);
module.exports = router
