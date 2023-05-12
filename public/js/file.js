layui.use('upload', function(){
    var upload = layui.upload;
    // var uploadInst = upload.render();
    upload.render({
        elem:"#openFile",
        url:'/file',
        choose:function(obj){
            console.log(obj);
        },
        done:function(res){
            console.log(res);
            console.log('done');
            alert('文件上传成功！');
        },
        error:function(){
            console.log('error!');
        }
    })
})
