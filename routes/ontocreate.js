const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.post('/', (req, res) => {

    console.log(req.body);
    console.log(typeof req.body);

    var reqbody = req.body;
    var ontoName = reqbody.ontoName;


    var ontoObjStr = fs.readFileSync(path.join(__dirname, "../public/upload/config/ontology.json"), 'utf-8');
    var ontoObj = JSON.parse(ontoObjStr);
    var ontoArray = ontoObj.ontoArr;

    if(ontoArray.indexOf(ontoName) !== -1){
        res.send(JSON.stringify({
            "msg":"alreadyexists"
        }));
        return;
    }

    // ontoArray.push(ontoName);

    // var finalOntoObj = {
    //     "ontoArr": ontoArray
    // }

    // var ingObjStr = fs.readFileSync(path.join(__dirname, "../public/upload/config/ing.json"), 'utf-8');
    // var ingObj = JSON.parse(ingObjStr);
    // var latestOnto = ingObj.latestOnto;

    var finalIngObj = {
        "latestOnto": ontoName,
        "operation": "create"
    }

    // fs.writeFileSync(path.join(__dirname, "../public/upload/config/ontology.json"), JSON.stringify(finalOntoObj));
    fs.writeFileSync(path.join(__dirname, "../public/upload/config/ing.json"), JSON.stringify(finalIngObj));

    



    res.send(JSON.stringify({
        msg: "created"
    }));
})

module.exports = router;