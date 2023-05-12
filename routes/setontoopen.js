const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.post('/', (req, res) => {

    var reqbody = req.body;
    var ontoName = reqbody.ontoName;

    var ingObj = {
        "latestOnto":ontoName,
        "operation":"open"
    }

    fs.writeFileSync(path.join(__dirname, "../public/upload/config/ing.json"), JSON.stringify(ingObj));

    res.send(JSON.stringify({
        "msg":"set successfully"
    }));
})

module.exports = router;