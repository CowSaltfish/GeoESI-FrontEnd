const express = require('express');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

const router = express.Router();

router.post('/', (req, res) => {

    var dirname = path.dirname(__dirname);
    var curpath = path.join(dirname, '/public/upload');

    var oldPath = "";
    var newPath = "";




    var form = new formidable.IncomingForm();

    // console.log(req);

    form.uploadDir = curpath;

    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
        
        if(err){
            console.log('parsing failed!');
            console.log(err);
        }

        // console.log('wuhu');
        // console.log(file.filepath);
        // console.log('success!');
        // console.log(file);

        var dir = form.uploadDir;

        var oldName = files.file.filepath;
        var newName = path.join(dir, files.file.originalFilename);

        fs.rename(oldName, newName, () => {
            console.log(`renamed to ${newName}`);
        })

        res.send({
            "msg":"file uploaded!"
        });

    });

    // form.on('fileBegin', function(name, file){
    //     console.log(file.filepath);
    // })

    // form.on('file', function(name, file){
    //     // console.log('Uploaded' + file.originalFilename);
    //     oldPath = file.filepath;

    //     var newName = file.originalFilename;

    //     var oldPathPrefix = path.dirname(oldPath);
    //     newPath = path.join(oldPathPrefix, newName);

    //     fs.rename(oldPath, newPath, (err) => {
    //         if(err){
    //             console.log(err);
    //             console.log('重命名出错');
    //             return;
    //         }
    //     })

    // })

    // form.on('end', function(name, file){

    //     console.log(oldPath);
    //     console.log(newPath);

    //     // fs.rename(oldPath, newPath, (err) => {
    //     //     if(err){
    //     //         console.log(err);
    //     //         console.log('重命名出错')
    //     //         return;
    //     //     }
    //     // })

    //     return res.send({
    //         "msg":"file uploaded!"
    //     });

    //     // res.end();
    // })

    // return;

});

module.exports = router;