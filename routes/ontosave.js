const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.post('/', (req, res) => {

    var reqbody = req.body;

    var ontoName = reqbody.sendOntoName;
    // var ontoData = reqbody.sendObj;

    var ontoObjStr = fs.readFileSync(path.join(__dirname, "../public/upload/config/ontology.json"));
    var ontoObj = JSON.parse(ontoObjStr);
    var ontoArray = ontoObj.ontoArr;

    var firstOrNot = "no";

    //如果本体是第一次保存（即刚刚新建），需要添加到ontology.json文件中
    if(ontoArray.indexOf(ontoName) === -1){
        ontoArray.push(ontoName);
        var finalOntoObj = {
            "ontoArr": ontoArray
        }
        fs.writeFileSync(path.join(__dirname, "../public/upload/config/ontology.json"), JSON.stringify(finalOntoObj));
        firstOrNot = "yes";
    }

    //将本体文件保存到 public/upload/onto 目录下
    // fs.writeFileSync(path.join(__dirname, "../public/upload/onto/" + ontoName + ".json"), JSON.stringify(ontoData));



    res.send(JSON.stringify({
        "msg":"saved",
        "firstOrNot":firstOrNot
    }));
})

module.exports = router;