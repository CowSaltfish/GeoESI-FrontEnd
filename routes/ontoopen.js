const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get('/:ontoName', (req, res) => {

    var ontoName = req.params.ontoName;

    var ontoStr = fs.readFileSync(path.join(__dirname, "../public/upload/onto/" + ontoName + ".json"));
    var onto = JSON.parse(ontoStr);

    // var ingObj = {
    //     "latestOnto":ontoName,
    //     "operation":"open"
    // }

    // //更新ing.json文件
    // fs.writeFileSync(path.join(__dirname, "../public/upload/config/ing.json"), JSON.stringify(ingObj));

    //将本体数据响应给浏览器
    res.send(JSON.stringify(onto));
})

module.exports = router;