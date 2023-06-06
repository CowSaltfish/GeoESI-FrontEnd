layui.use('upload', function(){
    var upload = layui.upload;
    upload.render({
        elem: '#uploadOntology',
        url: '/file',
        accept: 'file',
        done: function(res){
            console.log(res);


            
        },
        error: function(err){
            console.log('error!');
        }
    })
})

var TB = document.getElementById('ontoTB');
// var myContent = document.getElementById('content');

// 给tbody绑定点击事件（事件委托）
TB.onclick = function (e) {

    var firstClassName = e.target.className.split(" ")[0];

    // 如果当前点击的是删除按钮
    if (firstClassName == 'del') {

        var ontoNameNode = e.target.parentElement.parentElement;
        var html = ontoNameNode.innerHTML;
        
        var row = document.createElement("tr");
        row.innerHTML = html;

        var firstChildOfRow = row.firstChild;
        var ontoName = firstChildOfRow.innerHTML;


        // 弹出一个询问框，并用x接收返回值 ----  
        // 询问框返回值只有两个  点击确认：true  点击取消：false
        var x = confirm('确认删除吗？');
        // 如果x值为真，即点击了确认，删除所在行
        if (x) { 
            // e.target 为当前点击对象--->删除按钮
            // e.target.parentElement ---> td 
            // e.target.parentElement.parentElement  ---> tr
            TB.removeChild(e.target.parentElement.parentElement);

            fetch('/ontodelete/', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "ontoName":ontoName
                })
            })
            .then(res => res.json())
            .then(data => {

                console.log(data);
                fetch('http://localhost:8081/ontology/deleteOntologyByName?ontologyName=' + ontoName, {
                    method: 'post'
                })
                .then(res => {
                    console.log("ontology deleted");
                })

            })

        }
    }
    if(firstClassName === "openonto"){

        var ontoNameNode = e.target.parentElement.parentElement;
        var html = ontoNameNode.innerHTML;
        
        var row = document.createElement("tr");
        row.innerHTML = html;

        var firstChildOfRow = row.firstChild;
        var ontoName = firstChildOfRow.innerHTML;

        fetch('/setontoopen/', {
            method: 'post',
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                "ontoName": ontoName
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            window.open('../manipulationEditEdgeNoDrag.html');
        })

    }
    // // 如果当前点击的是修改按钮
    // if(e.target.className == 'ref'){
    //     // 下面的div要显示出来
    //     myContent.style.display = "block";
    //     // 给每一个输入框赋初始值
    //     /* 
    //         这是让 myContent.children[0] 第一个输入框的value（输入框中显示的字为姓名）
    //         e.target.parentElement.parentElement  ---> tr
    //         e.target.parentElement.parentElement.children[0]  --->  tr的第一个子节点，即姓名所在的td
    //     */
    //     myContent.children[0].value = e.target.parentElement.parentElement.children[0].innerText;
    //     // 这与第一个原理如出一辙
    //     myContent.children[1].value = e.target.parentElement.parentElement.children[1].innerText;

    //     // 给div绑定点击事件（事件委托），这里形参用ev是为了区别上面的e
    //     myContent.onclick = function(ev){
    //         // 如果点击的是确认修改
    //         if (ev.target.className == 'confirm') {
    //             // 下面的div要隐藏起来
    //             myContent.style.display = "none";
    //             // 点击了确认修改就把文本框的value值赋值给对应td的文本
    //             e.target.parentElement.parentElement.children[0].innerText =  myContent.children[0].value;
    //             e.target.parentElement.parentElement.children[1].innerText =  myContent.children[1].value;
    //         }
    //         // 如果点击的是取消，下面的div同样要隐藏，之所以这样写，是因为只有点击这两个按钮才会执行隐藏操作
    //         if (ev.target.className == 'cancel') {
    //             myContent.style.display = "none";
    //         }
    //     }
    // }
}


var index = "";

async function createontology(){
    layui.use('layer', function(){
        var layer = layui.layer;
        index =  layer.open({
            type: 1,
            title: "创建本体",
            content: $('#createontology'),
            area: ['500px', '170px']
        });

        
    });

    // var blobtext = await (await fetch('http://localhost:5000/upload/blob.json')).text();
    // console.log(blobtext);

    // console.log($('#createontology').html());
}

$('#confirmOntologySettings').click(function(){

    var ontoName = $('#ontoName').val();

    if(ontoName){
        layer.close(index);
    }

    var ontoJson = {
        ontoName: ontoName
    }

    fetch('/ontocreate/', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ontoJson)
    })
    .then(response => response.json())
    .then(data => {

        console.log(data);
        console.log(typeof data);

        var msg = data.msg;
        if(msg === "alreadyexists"){
            alert("此本体已存在，请重新输入本体名称！");
            return;
        }

        

        window.open('../manipulationEditEdgeNoDrag.html');

    })
    .catch(error => {
        console.log(error);
    })


    
    
})




function manageOntology(){
    layui.use('layer', function(){
        var layer = layui.layer;
        var index = layer.open({
            type: 1,
            title: '管理本体',
            content: $('#manageOntology'),
            area: ['600px', '300px'],
            cancel: function(index, layero){
                var ontoTable = document.getElementById('ontoTB');
                ontoTable.innerHTML = "";
            }
        })
    })

    fetch('http://localhost:5000/upload/config/ontology.json')
    .then(res => res.json())
    .then(data => {

        var ontoArr = data.ontoArr;

        for(var i=0;i<ontoArr.length;i++){
            var onto = ontoArr[i];

            $(`<tr><td>`+ onto +`</td><td><button type="button" class="openonto layui-btn layui-btn-sm">打开</button><button type="button" class="del layui-btn layui-btn-danger layui-btn-sm">删除</button></td></tr>`).appendTo('#ontoTB');
            

        }

    })

}

function openQueryWindow(){

    fetch('http://localhost:5000/upload/config/ontology.json')
    .then(res => res.json())
    .then(data => {

        var ontoArr = data.ontoArr;

        console.log(ontoArr);

        $('<option value="">请选择本体</option>').appendTo('#ontologyName');

        for(var i=0;i<ontoArr.length;i++){
            var onto = ontoArr[i];
            console.log(onto);
            console.log(typeof onto);

            $('<option value="' + onto + '">' + onto +'</option>').appendTo('#ontologyName');
            console.log('wuhu');

        }

        var resetBtn = document.getElementById('ontoQueryReset');
        resetBtn.click();

        layui.use('layer', function(){
            var layer = layui.layer;
            
            var index = layer.open({
                type: 1,
                title: "本体查询",
                content: $('#queryByOnto'),
                area: ['500px', '260px'],
                success: function(layero, index){
                    layero.find('.layui-layer-content').attr('style', 'overflow: visible;');
                },
                cancel: function(index, layero){
                    var ontoNameSelector = document.getElementById('ontologyName');
                    ontoNameSelector.innerHTML = "";
                }
            });
    
    
        })





    })

    

    
    


}

var ontoQueryResult = {};

function queryByOntology(){

    var ontoName = $('#ontologyName').val();

    fetch('http://localhost:8081/kg/searchByOntology?ontologyName=' + ontoName, {
        method: 'get'
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        // ontoQueryResult = data;
        //展示本体查询的结果
        showOntoQueryRes(ontoName, data);
        // console.log(data.nodes);
        console.log("query by ontology successfully!");
    })
}