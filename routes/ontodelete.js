const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.post('/', (req, res) => {

    var reqbody = req.body;
    var ontoName = reqbody.ontoName;

    //删除ontology.json中存储的对应的本体名
    var ontoObjStr = fs.readFileSync(path.join(__dirname, "../public/upload/config/ontology.json"));
    var ontoObj = JSON.parse(ontoObjStr);
    var ontoArray = ontoObj.ontoArr;

    var index = ontoArray.indexOf(ontoName);
    ontoArray.splice(index, 1);

    var finalOntoObj = {
        "ontoArr": ontoArray
    }

    fs.writeFileSync(path.join(__dirname, "../public/upload/config/ontology.json"), JSON.stringify(finalOntoObj));

    //删除对应的json格式的本体数据
    // if(fs.existsSync(path.join(__dirname, "../public/upload/onto/" + ontoName + ".json"))){
    //     fs.unlinkSync(path.join(__dirname, "../public/upload/onto/" + ontoName + ".json"));
    // }
    
    res.send(JSON.stringify({
        "msg":"deleted"
    }))
})

module.exports = router;