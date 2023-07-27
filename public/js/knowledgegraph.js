// const { G6 } = require("gg-editor");

// const { G6 } = require("gg-editor");

// const { G6 } = require("gg-editor");

// layui.use('table', function(){
//     var table = layui.table;

//     // table.render({
//     //     elem:'subGraphTable',
//     //     height:100,

//     // });
// })

layui.use('form',function(){
    var form = layui.form;

    form.on('select(subGraphs)', function(data){
        console.log(data);
        console.log(data.value);
        console.log(typeof(data.value));

        if(data.value != ""){

            var TB = document.getElementById("subGraphTB");

            var newtr = document.createElement("tr");
            var td1 = document.createElement("td");
            // var td2 = document.createElement("td");
            // var td3 = document.createElement("td");
            
            td1.innerHTML = data.value;
            // td2.innerHTML = data.value;
            // td3.innerHTML = data.value;

            newtr.appendChild(td1);
            // newtr.appendChild(td2);
            // newtr.appendChild(td3);

            TB.appendChild(newtr);

        }

    })
});

layui.use('colorpicker', function(){
    var $ = layui.$
    ,colorpicker = layui.colorpicker;
    //表单赋值
    colorpicker.render({
        elem: '#test-form'
        ,color: '#1c97f5'
        ,done: function(color){
        $('#test-form-input').val(color);
        }
    });
});



function createKG(){
    layui.use('layer', function(){
        var layer = layui.layer;
        var index =  layer.open({
            type: 1,
            title: "创建实例知识图谱",
            content: $('#createknowledgegraph'),
            area: ['500px', '390px'],
            success: function(layero, index){
                layero.find('.layui-layer-content').attr('style', 'overflow: visible;');
            }
        });

        $('#confirmKGSettings').click(function(){

            var dataSource = $('#KGSource').val();
            var name = $('#KGName').val();
            var layout = $('#selectlayout').val();
            var legendPos = $('#selectlegendpos').val();
            if(dataSource && name && layout && legendPos){
                layer.close(index);
            }
            
        })
    });

    // console.log($('#createknowledgegraph').html());
}



var divSelectStr = "#mountNode";  //选中的图所在div的id选择器，用于实现地图和图谱之间的视图切换

var graphIndex = 0;  //图索引
var dataArray = [];  //图数据数组
var graphArray = [];  //图数组


async function drawKGmap(kgName, kgData){

    //自定义图布局
    // var graphlayout = $('#graphlayout').val();
    // var graphlayoutcopy = graphlayout;
    // var layout = graphlayout === "" ? "force" : graphlayoutcopy;
    // if( layout !== "force" ){
    //     graph.updateLayout({
    //         type: layout,
    //         linkDistance: 180,
    //         nodeSize: 42,
    //         // nodeStrength: 1,
    //         preventOverlap: true,
    //         nodeSpacing: 20,
    //         // workerEnabled: true
    //         // maxIteration: 200
    //     })
    // }

    // var selectedDataSource = $('#KGSource').val();
    // var KGName = $('#KGName').val();
    // // var constructingMode = $('#constructingMode').val();
    // var selectedlayout = $('#selectlayout').val();
    // var selectedlegendpos = $('#selectlegendpos').val();

    //new
    //新窗口配置
     // var selectedKGDataSource = $('#KGDataSource').val();
    // var selectedGeoBoundDS = $('#GeoBoundDS').val();
    // var enteredKGName = $('#EnteredKGName').val();
    
    //展示本地数据
    // var test_string = '实例知识图谱展示Demo';
    // var data = await (await fetch('/test/' + test_string)).json();


    // var tempShpPath = shpPathObj[selectedKGDataSource];
    // // var tempBoundaryShpPath = boundaryShpPathObj[selectedGeoBoundDS];
    // var tempBoundaryShpPath = shpPathObj[selectedGeoBoundDS];
    

    // var rawdata = {};

    layui.use('layer', async function(){
        var layer = layui.layer;
        var index = layer.load(1);

        // //请求图谱数据
        // var rawdata = await (await fetch('http://localhost:8081/kg/searchAllKG')).json();

        // //画图用样本数据
        // var rawdata = await (await fetch('http://localhost:5000/upload/testtwo.json')).json();
        // console.log(rawdata);

        // var tempUrl = "http://localhost:8081/kg/create";
        // var temprawdata = await (await fetch(tempUrl, {
        //     method: 'post',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         facePath: tempShpPath,
        //         boundaryPath: tempBoundaryShpPath
        //     })
        // })).json();
        // console.log(temprawdata);

        layer.close(index);
        
        //解析图谱数据
        var data = parseRawData(kgData);

        //使用本地数据
        // var data = await getAndParseKGData();

        graphIndex++;
        // console.log(graphIndex);

        //保存从接收到的源数据解析出来的图谱数据（包括节点和边）
        dataArray.push(data);

        //输出数据信息
        // console.log(data.nodes.length);
        // console.log(data.edges.length);
        // console.log(data.nodes[0]);
        // console.log(data.edges[0]);

        //工具条
        const toolbar = new G6.ToolBar({
            position: {x: 10, y: 10},
        });

        //图例项
        const typeConfigs = {
            'type1': {
            type: 'circle',
            size: 70,
            style: {
                fill: '#00CCFF'
            }
            },
            'type2': {
            type: 'circle',
            size: 70,
            style: {
                fill: '#FF9900'
            }
            },
            'type3': {
            type: 'circle',
            size: 70,
            style: {
                fill: '#88EE88'
            }
            },
            'eType1': {
            type: 'line',
            style: {
                width: 100,
                stroke: '#999',
                endArrow: {
                    path: G6.Arrow.triangle(8, 8, 21),
                    d: 21,
                    fill: "#999"
                }
            }
            },
        }

        console.log(typeof(data.nodes));
        console.log(data.nodes);
        console.log(data.edges);

        //将每个节点都关联到图例项上
        data.nodes.forEach(node => {

            // var labels = node.labels;

            // // var label = node.label;
            // // var id = node.id;
            // // if(label === 'I'){
            // //     node = Object.assign(node, {...typeConfigs['type2']});
            // //     return;
            // // }

            // // if(label === 'I' && id === '8327'){
            // //     node = Object.assign(node, {...typeConfigs['type2']});
            // //     return;
            // // }

            // if(labels.indexOf('Face') !== -1){
            //     node = Object.assign(node, {...typeConfigs['type1']});
            //     return;
            // }
            // if(labels.indexOf('GeoEvent') !== -1){
            //     node = Object.assign(node, {...typeConfigs['type2']});
            //     return;
            // }
            // if(labels.indexOf('Fault') !== -1){
            //     node = Object.assign(node, {...typeConfigs['type3']});
            //     return;
            // }


            // if(labels.indexOf('Boundary') !== -1){
            //     node = Object.assign(node, {...typeConfigs['type1']});
            //     return;
            // }


            var nodeName = node.properties.labelName;
            if(nodeName === 'Face'){
                node = Object.assign(node, {...typeConfigs['type1']});
                return;
            }
            if(nodeName === 'GeoEvent'){
                node = Object.assign(node, {...typeConfigs['type2']});
                return;
            }
            if(nodeName === 'Fault'){
                node = Object.assign(node, {...typeConfigs['type3']});
                return;
            }
        })

        //将每条边都关联到图例项上
        data.edges.forEach(edge => {
            edge = Object.assign(edge, {...typeConfigs['eType1']});
        })

        //图例数据
        const legendData = {
            nodes: [{
            id: 'type1',
            label: 'Stratum',
            order: 0,
            ...typeConfigs['type1']
            }, {
            id: 'type2',
            label: 'GeoEvent',
            order: 1,
            ...typeConfigs['type2']
            }, {
            id: 'type3',
            label: 'Fault',
            order: 2,
            ...typeConfigs['type3']
            },
            ],
            edges: [{
            id: 'eType1',
            label: 'Edge',
            order: 2,
            ...typeConfigs['eType1']
            }]
        }

        //图例
        var legend = new G6.Legend({
            data: legendData,
            align: 'center',
            layout: 'horizontal', // vertical
            position: 'right-bottom',
            vertiSep: 18,
            horiSep: 24,
            offsetY: -24,
            padding: [4, 16, 8, 16],
            margin: [6, 240, 100, 6],
            containerStyle: {
            fill: '#ccc',
            lineWidth: 1
            },
            title: 'Legend',
            titleConfig: {
            position: 'center',
            offsetX: 0,
            offsetY: 12,
            },
        });

        //提示框
        const tooltip = new G6.Tooltip({
            offsetX: 10,
            offsetY: 10,
            trigger: 'click',
            itemTypes: ['node', 'edge'],
            getContent: (e) => {
                const outDiv = document.createElement("div");
                outDiv.style.width = "fit-content";
                outDiv.style.fontSize = "12px";
                var type = e.item.getType();
                console.log(type);
                console.log(typeof type);
                if(type === "node"){
                    outDiv.innerHTML = `
                    <h4 style="font-weight:800">空间</h4>
                    <ul>
                        <li>&nbsp;&nbsp;&nbsp;&nbsp;Type: ${e.item.getType()}</li>
                    </ul>
                    <h4 style="font-weight:800">语义</h4>
                    <ul>
                        <li>&nbsp;&nbsp;&nbsp;&nbsp;Type: ${e.item.getType()}</li>
                    </ul>
                    <h4 style="font-weight:800">几何形态</h4>
                    <ul>
                        <li>&nbsp;&nbsp;&nbsp;&nbsp;Type: ${e.item.getType()}</li>
                    </ul>
                    <h4 style="font-weight:800">要素关系</h4>
                    <ul>
                        <li>&nbsp;&nbsp;&nbsp;&nbsp;Type: ${e.item.getType()}</li>
                    </ul>
                    <h4 style="font-weight:800">演化过程</h4>
                    <ul>
                        <li>&nbsp;&nbsp;&nbsp;&nbsp;Type: ${e.item.getType()}</li>
                    </ul>
                    <h4 style="font-weight:800">要素属性</h4>
                    <ul>
                        <li>&nbsp;&nbsp;&nbsp;&nbsp;Type: ${e.item.getType()}</li>
                    </ul>
                    `;
                }
                if(type === "edge"){
                    outDiv.innerHTML = `
                    <h4 style="font-weight:800">空间</h4>
                    <ul>
                        <li>&nbsp;&nbsp;&nbsp;&nbsp;Type: ${e.item.getType()}</li>
                    </ul>
                    <h4 style="font-weight:800">语义</h4>
                    <ul>
                        <li>&nbsp;&nbsp;&nbsp;&nbsp;Type: ${e.item.getType()}</li>
                    </ul>
                    <h4 style="font-weight:800">几何形态</h4>
                    <ul>
                        <li>&nbsp;&nbsp;&nbsp;&nbsp;Type: ${e.item.getType()}</li>
                    </ul>
                    <h4 style="font-weight:800">要素关系</h4>
                    <ul>
                        <li>&nbsp;&nbsp;&nbsp;&nbsp;Type: ${e.item.getType()}</li>
                    </ul>
                    <h4 style="font-weight:800">演化过程</h4>
                    <ul>
                        <li>&nbsp;&nbsp;&nbsp;&nbsp;Type: ${e.item.getType()}</li>
                    </ul>
                    <h4 style="font-weight:800">要素属性</h4>
                    <ul>
                        <li>&nbsp;&nbsp;&nbsp;&nbsp;Type: ${e.item.getType()}</li>
                    </ul>
                    `;
                }
                return outDiv;
            }
        })

        //处理边，使得两节点之间的多条边不会相互重叠
        G6.Util.processParallelEdges(data.edges);
        
        //获取layui-body元素
        var layuiBodySource = document.getElementsByClassName("layui-body");
        var layuiBody = layuiBodySource[0];

        //创建图谱容器并添加到layui-body元素中
        var tempDiv = document.createElement("div");
        var tempDivId = "mountNode" + graphIndex.toString();
        tempDiv.id = tempDivId;
        layuiBody.appendChild(tempDiv);

        

        //新创建的图谱所在容器的选择器
        divSelectStr = "#" + tempDivId;

        // //将其他图谱全部隐藏
        // var childNodes = layuiBody.childNodes;

        // var divs = childNodes.get

        // console.log(divs);
        // for(var i=3;i<divs.length - 1;i++){
        //     var div = divs[i];
        //     div.classList.remove('show');
        //     div.classList.add('none');
        // }

        //将其他图谱全部隐藏
        for(var i=1;i<graphIndex;i++){
            var divId = "mountNode" + i.toString();
            var div = document.getElementById(divId);
            div.classList.remove('show');
            div.classList.add('none');
        }

        var graph = new G6.Graph({
            container: tempDivId,
            width: window.innerWidth,
            height: window.innerHeight,
            // fitView: true,
            // fitCenter: true,
            linkCenter: true,
            plugins: [toolbar, tooltip],
            // enabledStack: true,
            modes: {
                default: ['zoom-canvas', 'drag-canvas', 'drag-node']
            },
            // layout: {
            //   type: 'radial',
            //   unitRadius: 50
            // },
            layout: {
                type: 'force',
                // type: 'fruchterman',
                linkDistance: 500,
                nodeSize: 32,
                // nodeStrength: 1,
                preventOverlap: true,
                nodeSpacing: 50,
                // workerEnabled: true
                // maxIteration: 1000,
                // type: 'fruchterman',
                // gravity: 5,
                // speed: 5,
                // // for rendering after each iteration
                // // tick: () => {
                // //     graph.refreshPositions()
                // // }
            },
            // animate: true,
            defaultNode: {
                size: 20,
                color: 'steelblue',
                style: {
                    lineWidth: 2,
                    fill: '#fff'
                },
                labelCfg: {
                    style: {
                        fill: '#000',
                        fontSize: 20,
                    },
                },
            },
            defaultEdge: {
                type: 'quadratic',
                size: 3,
                color: '#999',
                style: {
                    // endArrow: {
                    //   path: 'M 4,0 L -4,-4 L -4,4 Z',
                    //   d: 4
                    // }
                    // endArrow: {
                    //     path: G6.Arrow.triangle(8, 8, 21),
                    //     d: 21,
                    //     fill: "#999"
                    // }
                    endArrow: true
                },
                labelCfg: {
                    refY: 7,
                    autoRotate: true,
                    style: {
                        fontSize: 20
                    }
                }
            },
        });

        // //为每类节点设置不同的样式
        graph.node((node) => {

            // var labels = node.labels;

            // // var label = node.label;
            // // var id = node.id;
            // // if(label === 'I'){
            // //     return {
            // //         id: node.id,
            // //         label: node.label,
            // //         // type: "Boundary",
            // //         style:{
            // //             fill:"#FF9900",
            // //             // stroke:"#000000"
            // //         }
            // //     }
            // // }

            // // if(label === 'I' && id === '8327'){
            // //     return {
            // //         id: node.id,
            // //         label: node.label,
            // //         // type: "Boundary",
            // //         style:{
            // //             fill:"#FF9900",
            // //             // stroke:"#000000"
            // //         }
            // //     }
            // // }

            // if(labels.indexOf("Boundary") !== -1){
            //     return {
            //         id: node.id,
            //         label: node.label,
            //         // type: "Boundary",
            //         style:{
            //             fill:"#CCCC99",
            //             // stroke:"#000000"
            //         }
            //     }
            // }else if(labels.indexOf("Face") !== -1){
            //     return {
            //         id: node.id,
            //         label: node.label,
            //         // type: "Face",
            //         style:{
            //             fill:"#00CCFF",
            //             // stroke:"#000000"
            //         }
            //     }
            // }else if(labels.indexOf("GeoEvent") !== -1){
            //     return {
            //         id: node.id,
            //         label: node.label,
            //         // type: "GeoEvent",
            //         style:{
            //             fill:"#FF9900",
            //             // stroke:"#000000"
            //         }
            //     }
            // }else if(labels.indexOf("Fault") !== -1){
            //     return {
            //         id: node.id,
            //         label: node.label,
            //         // type: "Fault",
            //         style:{
            //             fill:"#88EE88",
            //             // stroke:"#000000"
            //         }
            //     }
            // }else{
            //     alert("New category founded!");
            //     return {
            //         id: node.id,
            //         label: node.label,
            //         style:{
            //             fill:"#FFFFFF",
            //             stroke:"#000000"
            //         }
            //     }
            // }


            
            var labelName = node.properties.labelName;

            var eventType = node.properties.eventType;
            

            if(labelName === "Boundary"){
                return {
                    id: node.id,
                    label: node.label,
                    // type: "Boundary",
                    style:{
                        fill:"#CCCC99",
                        // stroke:"#000000"
                    }
                }
            }else if(labelName === "Face"){
                return {
                    id: node.id,
                    label: node.label,
                    // type: "Face",
                    style:{
                        fill:"#00CCFF",
                        // stroke:"#000000"
                    }
                }
            }else if(labelName === "GeoEvent"){
                if(eventType==="FRACTURE"){
                    return {
                        id: node.id,
                        label: node.label,
                        // type: "GeoEvent",
                        style:{
                            fill:"#fa8072",
                            // stroke:"#000000"
                        }
                    }
                }
                else if(eventType==="GENERATION"){
                    return {
                        id: node.id,
                        label: node.label,
                        // type: "GeoEvent",
                        style:{
                            fill:"#2e8b57",
                            // stroke:"#000000"
                        }
                    }
                }
                else{
                    return {
                        id: node.id,
                        label: node.label,
                        // type: "GeoEvent",
                        style:{
                            fill:"#FF9900",
                            // stroke:"#000000"
                        }
                    }
                }
            }else if(labelName === "Fault"){
                return {
                    id: node.id,
                    label: node.label,
                    // type: "Fault",
                    style:{
                        fill:"#88EE88",
                        // stroke:"#000000"
                    }
                }
            }else{
                console.log(labelName)
                // alert("New category founded!");
                return {
                    id: node.id,
                    label: node.label,
                    style:{
                        fill:"#FFFFFF",
                        stroke:"#000000"
                    }
                }
            }

        });


        console.log("渲染时的数据内容：");
        console.log(data);

        graph.data(data);
        graph.render();

        // graph.on('node:dragstart', function(e) {
            
        //     // const forceLayout = graph.get('layoutController').layoutMethods[0];
        //     // forceLayout.stop();

        //     graph.layout();
        //     // refreshDragedNodePosition(e);
        // });
        // graph.on('node:drag', function(e) {
        //     // refreshDragedNodePosition(e);
        // });
        // graph.on('node:dragend', function(e) {
        //     e.item.get('model').fx = null;
        //     e.item.get('model').fy = null;
        // });
        graph.on('node:mouseenter', (e) => {
            graph.setItemState(e.item, 'active', true);
        });
        graph.on('node:mouseleave', (e) => {
            graph.setItemState(e.item, 'active', false);
        });
        graph.on('edge:mouseenter', (e) => {
            graph.setItemState(e.item, 'active', true);
        });
        graph.on('edge:mouseleave', (e) => {
            graph.setItemState(e.item, 'active', false);
        });

        //保存新建的图谱
        graphArray.push(graph);

        //在左侧面板的知识图谱列表中添加刚刚新建的图谱
        $('<dd><a id="' + graphIndex.toString() + '"' + ' href="javascript:;" >'+ kgName +'</a></dd>').appendTo('#graphList');

        //重新渲染左侧导航栏
        layui.use('element', function(){
            var element = layui.element;

            element.render('nav', 'test');
        })

        $('#' + graphIndex.toString()).click(showSelectGraph);
        

        
        // $('#exportPic').click(function(){
        //     graph.downloadFullImage('graph', 'image/jpeg', {backgroundColor: '#FFF'});
        // })

    })



    

    

    // $('#customizeLayout').click(function(){
    //     layui.use('layer', function(){
    //         var layer = layui.layer;
    //         layer.open({
    //             type: 1,
    //             title: "自定义设置",
    //             content: $('#customizeSettings'),
    //             area: ['500px', '230px'],
    //             success: function(layero, index){
    //                 layero.find('.layui-layer-content').attr('style', 'overflow: visible;');
    //             }
    //         });
    //     });
    // })

    // $('#confirmSettings').click(function(){

    //     var graphlayout = $('#graphlayout').val();
    //     var graphlegend = $('#graphlegend').val();

    //     if(graphlayout === "" && graphlegend === ""){
    //         return;
    //     }

    //     if(graphlayout !== ""){
    //         graph.updateLayout({
    //             type: graphlayout,
    //             linkDistance: 180,
    //             nodeSize: 42,
    //             // nodeStrength: 1,
    //             preventOverlap: true,
    //             nodeSpacing: 20,
    //             // workerEnabled: true
    //             // maxIteration: 200
    //         });
    //         graph.layout();
    //     }

    //     console.log(graphlayout);

    //     // if(legendpos !== ""){
    //     //     graph.set('plugins', [])
    //     // }

    //     // graph.refresh();
    //     // graph.paint();

    // })


}

async function constructKGMap(){
    
    //地层数据
    var selectedKGDataSource = $('#KGDataSource').val();
    //地质界线数据
    var selectedGeoBoundDS = $('#GeoBoundDS').val();
    //图谱名称
    var enteredKGName = $('#EnteredKGName').val();
    console.log(selectedKGDataSource);

    //地层数据路径
    var tempShpPath = shpPathObj[selectedKGDataSource];
    // var tempBoundaryShpPath = boundaryShpPathObj[selectedGeoBoundDS];
    //地质界线数据路径
    var tempBoundaryShpPath = shpPathObj[selectedGeoBoundDS];

    console.log(tempShpPath);
    console.log(tempBoundaryShpPath);

    //获取图谱数据
    var tempUrl = "http://localhost:8081/kg/create";
    var temprawdata = await (await fetch(tempUrl, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            facePath: tempShpPath,
            boundaryPath: tempBoundaryShpPath
        })
    })).json();
    console.log(temprawdata);

    //绘制图谱
    drawKGmap(enteredKGName, temprawdata);

    //切换到图谱面板
    document.getElementById('opengraph').click();

}
async function clearAll(){
    layui.use('layer', async function(){
        var tempUrl = "http://localhost:8081/kg/clearAll";
        await fetch(tempUrl);
        alert("知识图谱已重置!");

    })
}
function showOntoQueryRes(kgName, queryRes){

    layui.use('layer', async function(){
        // var layer = layui.layer;
        // var index = layer.load(1);

        // //请求图谱数据
        // var rawdata = await (await fetch('http://localhost:8081/kg/searchAllKG')).json();
        // console.log(rawdata);

        // var tempUrl = "http://localhost:8081/kg/create";
        // var temprawdata = await (await fetch(tempUrl, {
        //     method: 'post',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         facePath: tempShpPath,
        //         boundaryPath: tempBoundaryShpPath
        //     })
        // })).json();
        // console.log(temprawdata);

        // layer.close(index);
        
        //解析图谱数据
        var data = parseOntoQueryRes(queryRes);

        //使用本地数据
        // var data = await getAndParseKGData();

        graphIndex++;
        // console.log(graphIndex);

        //保存从接收到的源数据解析出来的图谱数据（包括节点和边）
        dataArray.push(data);

        //输出数据信息
        // console.log(data.nodes.length);
        // console.log(data.edges.length);
        // console.log(data.nodes[0]);
        // console.log(data.edges[0]);

        //工具条
        const toolbar = new G6.ToolBar({
            position: {x: 10, y: 10},
        });

        //图例项
        const typeConfigs = {
            'type1': {
            type: 'circle',
            size: 32,
            style: {
                fill: '#00CCFF'
            }
            },
            'type2': {
            type: 'circle',
            size: 32,
            style: {
                fill: '#FF9900'
            }
            },
            'type3': {
            type: 'circle',
            size: 32,
            style: {
                fill: '#88EE88'
            }
            },
            'eType1': {
            type: 'line',
            style: {
                width: 42,
                stroke: '#999',
            }
            },
        }

        console.log(typeof(data.nodes));
        console.log(data.nodes);
        console.log(data.edges);

        //将每个节点都关联到图例项上
        data.nodes.forEach(node => {

            // var labels = node.labels;

            // // var label = node.label;
            // // var id = node.id;
            // // if(label === 'I'){
            // //     node = Object.assign(node, {...typeConfigs['type2']});
            // //     return;
            // // }

            // // if(label === 'I' && id === '8327'){
            // //     node = Object.assign(node, {...typeConfigs['type2']});
            // //     return;
            // // }

            // if(labels.indexOf('Face') !== -1){
            //     node = Object.assign(node, {...typeConfigs['type1']});
            //     return;
            // }
            // if(labels.indexOf('GeoEvent') !== -1){
            //     node = Object.assign(node, {...typeConfigs['type2']});
            //     return;
            // }
            // if(labels.indexOf('Fault') !== -1){
            //     node = Object.assign(node, {...typeConfigs['type3']});
            //     return;
            // }


            // if(labels.indexOf('Boundary') !== -1){
            //     node = Object.assign(node, {...typeConfigs['type1']});
            //     return;
            // }


            var nodeName = node.properties.labelName;
            if(nodeName === 'Face'){
                node = Object.assign(node, {...typeConfigs['type1']});
                return;
            }
            if(nodeName === 'GeoEvent'){
                node = Object.assign(node, {...typeConfigs['type2']});
                return;
            }
            if(nodeName === 'Fault'){
                node = Object.assign(node, {...typeConfigs['type3']});
                return;
            }
        })

        //将每条边都关联到图例项上
        data.edges.forEach(edge => {
            edge = Object.assign(edge, {...typeConfigs['eType1']});
        })

        //图例数据
        const legendData = {
            nodes: [{
            id: 'type1',
            label: 'Stratum',
            order: 0,
            ...typeConfigs['type1']
            }, {
            id: 'type2',
            label: 'GeoEvent',
            order: 1,
            ...typeConfigs['type2']
            }, {
            id: 'type3',
            label: 'Fault',
            order: 2,
            ...typeConfigs['type3']
            },
            ],
            edges: [{
            id: 'eType1',
            label: 'Edge',
            order: 2,
            ...typeConfigs['eType1']
            }]
        }

        //图例
        var legend = new G6.Legend({
            data: legendData,
            align: 'center',
            layout: 'horizontal', // vertical
            position: 'right-bottom',
            vertiSep: 18,
            horiSep: 24,
            offsetY: -24,
            padding: [4, 16, 8, 16],
            margin: [6, 240, 100, 6],
            containerStyle: {
            fill: '#ccc',
            lineWidth: 1
            },
            title: 'Legend',
            titleConfig: {
            position: 'center',
            offsetX: 0,
            offsetY: 12,
            },
        });

        //提示框
        const tooltip = new G6.Tooltip({
            offsetX: 10,
            offsetY: 10,
            trigger: 'click',
            itemTypes: ['node', 'edge'],
            getContent: (e) => {
                const outDiv = document.createElement("div");
                outDiv.style.width = "fit-content";
                outDiv.style.fontSize = "12px";
                var type = e.item.getType();
                console.log(type);
                console.log(typeof type);
                if(type === "node"){
                    outDiv.innerHTML = `
                    <h4 style="font-weight:800">空间</h4>
                    <ul>
                        <li>&nbsp;&nbsp;&nbsp;&nbsp;Type: ${e.item.getType()}</li>
                    </ul>
                    <h4 style="font-weight:800">语义</h4>
                    <ul>
                        <li>&nbsp;&nbsp;&nbsp;&nbsp;Type: ${e.item.getType()}</li>
                    </ul>
                    <h4 style="font-weight:800">几何形态</h4>
                    <ul>
                        <li>&nbsp;&nbsp;&nbsp;&nbsp;Type: ${e.item.getType()}</li>
                    </ul>
                    <h4 style="font-weight:800">要素关系</h4>
                    <ul>
                        <li>&nbsp;&nbsp;&nbsp;&nbsp;Type: ${e.item.getType()}</li>
                    </ul>
                    <h4 style="font-weight:800">演化过程</h4>
                    <ul>
                        <li>&nbsp;&nbsp;&nbsp;&nbsp;Type: ${e.item.getType()}</li>
                    </ul>
                    <h4 style="font-weight:800">要素属性</h4>
                    <ul>
                        <li>&nbsp;&nbsp;&nbsp;&nbsp;Type: ${e.item.getType()}</li>
                    </ul>
                    `;
                }
                if(type === "edge"){
                    outDiv.innerHTML = `
                    <h4 style="font-weight:800">空间</h4>
                    <ul>
                        <li>&nbsp;&nbsp;&nbsp;&nbsp;Type: ${e.item.getType()}</li>
                    </ul>
                    <h4 style="font-weight:800">语义</h4>
                    <ul>
                        <li>&nbsp;&nbsp;&nbsp;&nbsp;Type: ${e.item.getType()}</li>
                    </ul>
                    <h4 style="font-weight:800">几何形态</h4>
                    <ul>
                        <li>&nbsp;&nbsp;&nbsp;&nbsp;Type: ${e.item.getType()}</li>
                    </ul>
                    <h4 style="font-weight:800">要素关系</h4>
                    <ul>
                        <li>&nbsp;&nbsp;&nbsp;&nbsp;Type: ${e.item.getType()}</li>
                    </ul>
                    <h4 style="font-weight:800">演化过程</h4>
                    <ul>
                        <li>&nbsp;&nbsp;&nbsp;&nbsp;Type: ${e.item.getType()}</li>
                    </ul>
                    <h4 style="font-weight:800">要素属性</h4>
                    <ul>
                        <li>&nbsp;&nbsp;&nbsp;&nbsp;Type: ${e.item.getType()}</li>
                    </ul>
                    `;
                }
                return outDiv;
            }
        })

        //处理边，使得两节点之间的多条边不会相互重叠
        G6.Util.processParallelEdges(data.edges);
        
        //获取layui-body元素
        var layuiBodySource = document.getElementsByClassName("layui-body");
        var layuiBody = layuiBodySource[0];

        //创建图谱容器并添加到layui-body元素中
        var tempDiv = document.createElement("div");
        var tempDivId = "mountNode" + graphIndex.toString();
        tempDiv.id = tempDivId;
        layuiBody.appendChild(tempDiv);

        

        //新创建的图谱所在容器的选择器
        divSelectStr = "#" + tempDivId;

        // //将其他图谱全部隐藏
        // var childNodes = layuiBody.childNodes;

        // var divs = childNodes.get

        // console.log(divs);
        // for(var i=3;i<divs.length - 1;i++){
        //     var div = divs[i];
        //     div.classList.remove('show');
        //     div.classList.add('none');
        // }

        //将其他图谱全部隐藏
        for(var i=1;i<graphIndex;i++){
            var divId = "mountNode" + i.toString();
            var div = document.getElementById(divId);
            div.classList.remove('show');
            div.classList.add('none');
        }

        var graph = new G6.Graph({
            container: tempDivId,
            width: window.innerWidth,
            height: window.innerHeight,
            // fitView: true,
            // fitCenter: true,
            linkCenter: true,
            plugins: [toolbar, legend, tooltip],
            // enabledStack: true,
            modes: {
                default: ['zoom-canvas', 'drag-canvas', 'drag-node']
            },
            // layout: {
            //   type: 'radial',
            //   unitRadius: 50
            // },
            layout: {
                type: 'force',
                linkDistance: 200,
                nodeSize: 42,
                // nodeStrength: 1,
                preventOverlap: true,
                nodeSpacing: 20,
                // workerEnabled: true
                // maxIteration: 1000,
                // type: 'fruchterman',
                // gravity: 5,
                // speed: 5,
                // // for rendering after each iteration
                // // tick: () => {
                // //     graph.refreshPositions()
                // // }
            },
            // animate: true,
            defaultNode: {
                size: 42,
                color: 'steelblue',
                style: {
                    lineWidth: 2,
                    fill: '#fff'
                },
                labelCfg: {
                    style: {
                        fill: '#000',
                        fontSize: 12,
                    },
                },
            },
            defaultEdge: {
                type: 'quadratic',
                size: 1,
                color: '#999',
                style: {
                    // endArrow: {
                    //   path: 'M 4,0 L -4,-4 L -4,4 Z',
                    //   d: 4
                    // }
                    endArrow: {
                        path: G6.Arrow.triangle(8, 8, 21),
                        d: 21,
                        fill: "#999"
                    }
                },
                labelCfg: {
                    refY: 7,
                    autoRotate: true,
                    style: {
                        fontSize: 10
                    }
                }
            },
        });

        // //为每类节点设置不同的样式
        // graph.node((node) => {

        //     // var labels = node.labels;

        //     // // var label = node.label;
        //     // // var id = node.id;
        //     // // if(label === 'I'){
        //     // //     return {
        //     // //         id: node.id,
        //     // //         label: node.label,
        //     // //         // type: "Boundary",
        //     // //         style:{
        //     // //             fill:"#FF9900",
        //     // //             // stroke:"#000000"
        //     // //         }
        //     // //     }
        //     // // }

        //     // // if(label === 'I' && id === '8327'){
        //     // //     return {
        //     // //         id: node.id,
        //     // //         label: node.label,
        //     // //         // type: "Boundary",
        //     // //         style:{
        //     // //             fill:"#FF9900",
        //     // //             // stroke:"#000000"
        //     // //         }
        //     // //     }
        //     // // }

        //     // if(labels.indexOf("Boundary") !== -1){
        //     //     return {
        //     //         id: node.id,
        //     //         label: node.label,
        //     //         // type: "Boundary",
        //     //         style:{
        //     //             fill:"#CCCC99",
        //     //             // stroke:"#000000"
        //     //         }
        //     //     }
        //     // }else if(labels.indexOf("Face") !== -1){
        //     //     return {
        //     //         id: node.id,
        //     //         label: node.label,
        //     //         // type: "Face",
        //     //         style:{
        //     //             fill:"#00CCFF",
        //     //             // stroke:"#000000"
        //     //         }
        //     //     }
        //     // }else if(labels.indexOf("GeoEvent") !== -1){
        //     //     return {
        //     //         id: node.id,
        //     //         label: node.label,
        //     //         // type: "GeoEvent",
        //     //         style:{
        //     //             fill:"#FF9900",
        //     //             // stroke:"#000000"
        //     //         }
        //     //     }
        //     // }else if(labels.indexOf("Fault") !== -1){
        //     //     return {
        //     //         id: node.id,
        //     //         label: node.label,
        //     //         // type: "Fault",
        //     //         style:{
        //     //             fill:"#88EE88",
        //     //             // stroke:"#000000"
        //     //         }
        //     //     }
        //     // }else{
        //     //     alert("New category founded!");
        //     //     return {
        //     //         id: node.id,
        //     //         label: node.label,
        //     //         style:{
        //     //             fill:"#FFFFFF",
        //     //             stroke:"#000000"
        //     //         }
        //     //     }
        //     // }


            
        //     var labelName = node.properties.labelName;

        //     if(labelName === "Boundary"){
        //         return {
        //             id: node.id,
        //             label: node.label,
        //             // type: "Boundary",
        //             style:{
        //                 fill:"#CCCC99",
        //                 // stroke:"#000000"
        //             }
        //         }
        //     }else if(labelName === "Face"){
        //         return {
        //             id: node.id,
        //             label: node.label,
        //             // type: "Face",
        //             style:{
        //                 fill:"#00CCFF",
        //                 // stroke:"#000000"
        //             }
        //         }
        //     }else if(labelName === "GeoEvent"){
        //         return {
        //             id: node.id,
        //             label: node.label,
        //             // type: "GeoEvent",
        //             style:{
        //                 fill:"#FF9900",
        //                 // stroke:"#000000"
        //             }
        //         }
        //     }else if(labelName === "Fault"){
        //         return {
        //             id: node.id,
        //             label: node.label,
        //             // type: "Fault",
        //             style:{
        //                 fill:"#88EE88",
        //                 // stroke:"#000000"
        //             }
        //         }
        //     }else{
        //         console.log(labelName)
        //         alert("New category founded!");
        //         return {
        //             id: node.id,
        //             label: node.label,
        //             style:{
        //                 fill:"#FFFFFF",
        //                 stroke:"#000000"
        //             }
        //         }
        //     }

        // });


        graph.data(data);
        graph.render();

        graph.on('node:dragstart', function(e) {
            
            // const forceLayout = graph.get('layoutController').layoutMethods[0];
            // forceLayout.stop();

            graph.layout();
            // refreshDragedNodePosition(e);
        });
        graph.on('node:drag', function(e) {
            // refreshDragedNodePosition(e);
        });
        graph.on('node:dragend', function(e) {
            e.item.get('model').fx = null;
            e.item.get('model').fy = null;
        });
        graph.on('node:mouseenter', (e) => {
            graph.setItemState(e.item, 'active', true);
        });
        graph.on('node:mouseleave', (e) => {
            graph.setItemState(e.item, 'active', false);
        });
        graph.on('edge:mouseenter', (e) => {
            graph.setItemState(e.item, 'active', true);
        });
        graph.on('edge:mouseleave', (e) => {
            graph.setItemState(e.item, 'active', false);
        });

        //保存新建的图谱
        graphArray.push(graph);

        //在左侧面板的知识图谱列表中添加刚刚新建的图谱
        $('<dd><a id="' + graphIndex.toString() + '"' + ' href="javascript:;" >'+ kgName +'</a></dd>').appendTo('#graphList');

        //重新渲染左侧导航栏
        layui.use('element', function(){
            var element = layui.element;

            element.render('nav', 'test');
        })

        $('#' + graphIndex.toString()).click(showSelectGraph);
        

        
        // $('#exportPic').click(function(){
        //     graph.downloadFullImage('graph', 'image/jpeg', {backgroundColor: '#FFF'});
        // })

    })

}

function refreshDragedNodePosition(e) {
    var model = e.item.get('model');
    model.fx = e.x;
    model.fy = e.y;
    // model.x = e.x;
    // model.y = e.y;
}

function customizeSettings(){
    layui.use('layer', function(){
        var layer = layui.layer;
        layer.open({
            type: 1,
            title: "自定义设置",
            content: $('#customizeSettings'),
            area: ['500px', '230px'],
            success: function(layero, index){
                layero.find('.layui-layer-content').attr('style', 'overflow: visible;');
            }
        });
    });

    $('#confirmSettings').click(function(){

        var graphlayout = $('#graphlayout').val();

        if(graphlayout === ""){
            return;
        }

        if(graphlayout !== ""){
            graph.updateLayout({
                type: graphlayout,
                linkDistance: 180,
                nodeSize: 42,
                // nodeStrength: 1,
                preventOverlap: true,
                nodeSpacing: 20,
                // workerEnabled: true
                // maxIteration: 200
            });
            graph.layout();
        }

        console.log(graphlayout);

        // if(legendpos !== ""){
        //     graph.set('plugins', [])
        // }

        // graph.refresh();
        // graph.paint();

    })
}

// //解析原始数据
// function parseRawData(rawdata){

//     var rawnodes = rawdata.nodes;
//     var rawedges = rawdata.relationships;

//     console.log(rawnodes[0].id);
//     console.log(typeof(rawnodes[0].id));

//     var maxX = -10000;
//     var maxY = -10000;
//     var minX = 10000;
//     var minY = 10000;


//     rawnodes.forEach(node => {

//         if(node.labelName == 'Face'){

//             var tempx = node.position[0];
//             var tempy = node.position[1];

//             if( tempx > maxX ){
//                 maxX = tempx;
//             }
//             if( tempy > maxY ){
//                 maxY = tempy;
//             }
//             if( tempx < minX ){
//                 minX = tempx;
//             }
//             if( tempy < minY ){
//                 minY = tempy;
//             }

//         }

//     })

//     var MBR_length = maxX - minX;
//     var MBR_height = maxY - minY;


//     console.log(maxX);
//     console.log(maxY);
//     console.log(minX);
//     console.log(minY);

//     var xRatio = MBR_length/window.innerWidth;
//     var yRatio = MBR_height/window.innerHeight;

//     console.log("确定缩放比例：");
//     console.log(xRatio);
//     console.log(yRatio);

//     // 缩放比例
//     var zoomRatio = 0;

//     if(xRatio > yRatio){
//         zoomRatio = xRatio;
//     }
//     else{
//         zoomRatio = yRatio;
//     }

//     console.log(zoomRatio);

//     var originX = minX;
//     var originY = minY;






//     var unCompleteNodes = rawnodes.map(item => {

//         var nodeX = item.position[0];
//         var nodeY = item.position[1];

//         var xDiff = (nodeX - originX)/zoomRatio;
//         var yDiff = (nodeY - originY)/zoomRatio;

//         var xPos = Math.round(xDiff);
//         var yPos = window.innerHeight - Math.round(yDiff);
        

//         return {
//             id: item.id.toString(),
//             x:xPos,
//             y:yPos,
//             label: item.nodeName,
//             labelName:item.labelName,
//             properties: item
//         }
//     });

//     var nodesBackup = unCompleteNodes;

//     var nodes = unCompleteNodes.map( item => {

//         var labelName = item.labelName;

//         if(labelName == "Face" || labelName == "Boundary"){
//             return item;
//         }

//         if(labelName == "GeoEvent"){
            
//             var label = item.label;
//             var connectedNodes = [];

//             unCompleteNodes.forEach(node => {

//                 if( (node.label == item.label) && node.labelName !== "GeoEvent" ){
//                     connectedNodes.push(node);
//                 }

//             });

//             if(connectedNodes.length <= 1){
//                 return {
//                     id: item.id,
//                     x: connectedNodes[0].x+50,
//                     y: connectedNodes[0].y-50,
//                     label: item.label,
//                     labelName: item.labelName,
//                     properties: item.properties
//                 }
//             }
//             else{
//                 var averageX = 0;
//                 var averageY = 0;

//                 var sumX = 0;
//                 var sumY = 0;

//                 connectedNodes.forEach(node => {

//                     sumX += node.x;
//                     sumY += node.y;

//                 })

//                 averageX = Math.round(sumX/connectedNodes.length);
//                 averageY = Math.round(sumY/connectedNodes.length);

//                 return {
//                     id: item.id,
//                     x: averageX,
//                     y: averageY,
//                     label: item.label,
//                     labelName: item.labelName,
//                     properties: item.properties
//                 }

//             }


//         }


//     } )

//     // var tempNum = 1000;

//     var edges = rawedges.map(item => {
//       return {
//         // id: item.id.toString(),
//         source: item.startNode.toString(),
//         target: item.endNode.toString(),
//         label: item.relationName,
//         properties: item
//       }
//     });
//     console.log(edges.length);

//     // var edges = rawedges.map(item => {
//     //     tempNum++;
//     //     return {
//     //       id: tempNum.toString(),
//     //       source: item.startNode.toString(),
//     //       target: item.endNode.toString(),
//     //       label: item.type,
//     //       properties: item
//     //     }
//     //   });
//     // console.log(edges.length);


//     function checkNode(node){
//       return node.labelName !== 'Boundary' && node.labelName !== "GeoEvent" ;
//     }
    
//     //非地质界线节点
//     var finalNodes = nodes.filter(checkNode);
//     console.log("节点数：");
//     console.log(finalNodes.length);

//     //非地质界线节点Id集合
//     var nodeIds = finalNodes.map(item => {
//       return item.id;
//     })

//     console.log(nodeIds.length);

//     function checkEdge(edge){
//       return ((nodeIds.indexOf(edge.source) != -1) && (nodeIds.indexOf(edge.target) != -1));
//     }

    



//     //与地质界线节点无关的节点
//     var finalEdges = edges.filter(checkEdge);
//     console.log("边数：");
//     console.log(finalEdges.length);


//     //只保留单向边
//     var edgePtPairs = [];

//     var newEdges = [];

//     for(var i=0;i<finalEdges.length;i++){

//         var source = finalEdges[i].source;
//         var target = finalEdges[i].target;

//         var newEdgePair = [];

//         var newOrNot = true;

//         edgePtPairs.forEach(edgePair => {

//             if(edgePair.indexOf(source) !== -1 && edgePair.indexOf(target) !== -1){

//                 newOrNot = false;

//             }
//         })

//         if(newOrNot){
//             newEdgePair.push(source);
//             newEdgePair.push(target);
//             edgePtPairs.push(newEdgePair);
//             newEdges.push(finalEdges[i]);
//         }

//     }



//     var finalData = {
//       nodes: finalNodes,
//       edges: newEdges
//     }

//     return finalData;
// }

//解析原始数据
function parseRawData(rawdata){

    var rawnodes = rawdata.nodes;
    var rawedges = rawdata.relationships;

    console.log(rawnodes[0].id);
    console.log(typeof(rawnodes[0].id));

    // var maxX = -10000;
    // var maxY = -10000;
    // var minX = 10000;
    // var minY = 10000;


    // rawnodes.forEach(node => {

    //     if(node.labelName == 'Face'){

    //         var tempx = node.position[0];
    //         var tempy = node.position[1];

    //         if( tempx > maxX ){
    //             maxX = tempx;
    //         }
    //         if( tempy > maxY ){
    //             maxY = tempy;
    //         }
    //         if( tempx < minX ){
    //             minX = tempx;
    //         }
    //         if( tempy < minY ){
    //             minY = tempy;
    //         }

    //     }

    // })

    // var MBR_length = maxX - minX;
    // var MBR_height = maxY - minY;


    // console.log(maxX);
    // console.log(maxY);
    // console.log(minX);
    // console.log(minY);

    // var xRatio = MBR_length/window.innerWidth;
    // var yRatio = MBR_height/window.innerHeight;

    // console.log("确定缩放比例：");
    // console.log(xRatio);
    // console.log(yRatio);

    // // 缩放比例
    // var zoomRatio = 0;

    // if(xRatio > yRatio){
    //     zoomRatio = xRatio;
    // }
    // else{
    //     zoomRatio = yRatio;
    // }

    // console.log(zoomRatio);

    // var originX = minX;
    // var originY = minY;






    // var unCompleteNodes = rawnodes.map(item => {

    //     var nodeX = item.position[0];
    //     var nodeY = item.position[1];

    //     var xDiff = (nodeX - originX)/zoomRatio;
    //     var yDiff = (nodeY - originY)/zoomRatio;

    //     var xPos = Math.round(xDiff);
    //     var yPos = window.innerHeight - Math.round(yDiff);
        

    //     return {
    //         id: item.id.toString(),
    //         x:xPos,
    //         y:yPos,
    //         label: item.nodeName,
    //         labelName:item.labelName,
    //         properties: item
    //     }
    // });

    // var nodesBackup = unCompleteNodes;

    // var nodes = unCompleteNodes.map( item => {

    //     var labelName = item.labelName;

    //     if(labelName == "Face" || labelName == "Boundary"){
    //         return item;
    //     }

    //     if(labelName == "GeoEvent"){
            
    //         var label = item.label;
    //         var connectedNodes = [];

    //         unCompleteNodes.forEach(node => {

    //             if( (node.label == item.label) && node.labelName !== "GeoEvent" ){
    //                 connectedNodes.push(node);
    //             }

    //         });

    //         if(connectedNodes.length <= 1){
    //             return {
    //                 id: item.id,
    //                 x: connectedNodes[0].x+50,
    //                 y: connectedNodes[0].y-50,
    //                 label: item.label,
    //                 labelName: item.labelName,
    //                 properties: item.properties
    //             }
    //         }
    //         else{
    //             var averageX = 0;
    //             var averageY = 0;

    //             var sumX = 0;
    //             var sumY = 0;

    //             connectedNodes.forEach(node => {

    //                 sumX += node.x;
    //                 sumY += node.y;

    //             })

    //             averageX = Math.round(sumX/connectedNodes.length);
    //             averageY = Math.round(sumY/connectedNodes.length);

    //             return {
    //                 id: item.id,
    //                 x: averageX,
    //                 y: averageY,
    //                 label: item.label,
    //                 labelName: item.labelName,
    //                 properties: item.properties
    //             }

    //         }


    //     }


    // } )

    var tempNum = 1000;

    // var edges = rawedges.map(item => {
    //   return {
    //     // id: item.id.toString(),
    //     source: item.startNode.toString(),
    //     target: item.endNode.toString(),
    //     label: item.relationName,
    //     properties: item
    //   }
    // });
    // console.log(edges.length);

    var nodes = rawnodes.map(item => {
        return {
            // id: item.id.toString(),
            id: item.id.toString(),
            label: item.nodeName,
            labelName: item.labelName,
            properties: item
        }
    });

    var edges = rawedges.map(item => {
        tempNum++;
        return {
          id: tempNum.toString(),
          source: item.startNode.toString(),
          target: item.endNode.toString(),
          label: item.relationName!=null?item.relationName:item.properties.relationName,
          properties: item
        }
      });
    console.log(edges.length);

    //筛选节点类型
    // function checkNode(node){
    //   return node.labelName !== 'Boundary' && node.labelName !== "GeoEvent" ;
    // }
    
    //非地质界线节点
    // var finalNodes = nodes.filter(checkNode);
    var finalNodes = nodes;
    console.log("节点数：");
    console.log(finalNodes.length);

    //非地质界线节点Id集合
    var nodeIds = finalNodes.map(item => {
      return item.id;
    })

    console.log(nodeIds.length);

    function checkEdge(edge){
      return ((nodeIds.indexOf(edge.source) != -1) && (nodeIds.indexOf(edge.target) != -1));
    }

    //与地质界线节点无关的节点
    var finalEdges = edges.filter(checkEdge);
    console.log("边数：");
    console.log(finalEdges.length);


    //只保留单向边
    var edgePtPairs = [];

    var newEdges = [];

    for(var i=0;i<finalEdges.length;i++){

        var source = finalEdges[i].source;
        var target = finalEdges[i].target;

        var newEdgePair = [];

        var newOrNot = true;

        edgePtPairs.forEach(edgePair => {

            if(edgePair.indexOf(source) !== -1 && edgePair.indexOf(target) !== -1){

                newOrNot = false;

            }
        })

        if(newOrNot){
            newEdgePair.push(source);
            newEdgePair.push(target);
            edgePtPairs.push(newEdgePair);
            newEdges.push(finalEdges[i]);
        }

    }



    var finalData = {
      nodes: finalNodes,
      edges: newEdges
    }

    return finalData;
}

function parseOntoQueryRes(rawdata){

    var rawnodes = rawdata.nodes;
    var rawedges = rawdata.relationships;

    var tempNodes = rawnodes.map(item => {
      return {
        id: item.id.toString(),
        label: item.nodeName,
        properties: item
      }
    });

    //去掉重复的结点
    var tempIdList = [];
    var nodes = [];
    for(var i=0;i<tempNodes.length;i++){
        var node = tempNodes[i];
        var id = node.id;
        if(tempIdList.indexOf(id) != -1) continue;
        tempIdList.push(id);
        nodes.push(node);
    }

    var tempNum = 1000;

    // var edges = rawedges.map(item => {
    //   return {
    //     id: item.id.toString(),
    //     source: item.startNode.toString(),
    //     target: item.endNode.toString(),
    //     label: item.relationName,
    //     properties: item
    //   }
    // });
    // console.log(edges.length);

    var edges = rawedges.map(item => {
        tempNum++;
        return {
          id: tempNum.toString(),
          source: item.startNode.toString(),
          target: item.endNode.toString(),
          label: item.type,
          properties: item
        }
      });
    // console.log(edges.length);


    function checkNode(node){
      return node.properties.labelName !== 'Boundary';
    }
    
    //非地质界线节点
    var finalNodes = nodes.filter(checkNode);
    console.log("节点数：");
    console.log(finalNodes.length);

    //非地质界线节点Id集合
    var nodeIds = finalNodes.map(item => {
      return item.id;
    })

    console.log(nodeIds.length);

    function checkEdge(edge){
      return ((nodeIds.indexOf(edge.source) != -1) && (nodeIds.indexOf(edge.target) != -1));
    }

    //与地质界线节点无关的边（关系）
    var finalEdges = edges.filter(checkEdge);
    console.log("边数：");
    console.log(finalEdges.length);



    var finalData = {
      nodes: finalNodes,
      edges: finalEdges
    }

    return finalData;

}

//下载json数据
const download = (fileName, blob) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    link.remove();
    URL.revokeObjectURL(link.href);
};

//
function showSelectGraph(){

    document.getElementById('opengraph').click();
    
    var indexStr =  $(this).attr('id');

    //图谱index
    var index = parseInt(indexStr);

    divSelectStr = "#mountNode" + indexStr;
    

    // //需要展示的图谱在layui-body所含元素中的索引
    // var showIndex = index + 2;
    // console.log('wuhu');
    // console.log(showIndex);

    // //获取layui-body元素
    // var layuiBodySource = document.getElementsByClassName('layui-body');
    // var layuiBody = layuiBodySource[0];

    // //获取layui-body元素中的所有div标签
    // var divs = layuiBody.getElementsByTagName('div');

    // for(var i=3;i<divs.length;i++){
    //     var div = divs[i];
    //     if(i === showIndex){
    //         div.classList.remove('none');
    //         div.classList.add('show');
    //         console.log(div);
    //         continue;
    //     }
    //     div.classList.remove('show');
    //     div.classList.add('none');
    //     console.log(div);
    // }

    //将其他图谱全部隐藏
    for(var i=1;i<=graphIndex;i++){
        var divId = "mountNode" + i.toString();
        var div = document.getElementById(divId);
        if(i === index){
            div.classList.remove('none');
            div.classList.add('show');
            continue;
        }
        div.classList.remove('show');
        div.classList.add('none');
    }

}


async function getAndParseKGData(){

    var rawdata = await (await fetch('http://localhost:5000/upload/Intrusion_IA.json')).json();

    var primaryEdgesP = rawdata.map(item => {
        return item.p.segments[0].relationship;
    });

    var primaryEdgesQ = rawdata.map(item => {
        return item.q.segments[0].relationship;
    });
    // var primaryEdgesQ = [];

    var primaryEdges = [...primaryEdgesP, ...primaryEdgesQ];

    // console.log(primaryEdges[0]);

    var edges = primaryEdges.map(item => {
        return {
            source: item.start.toString(),
            target: item.end.toString(),
            label: item.type,
            id: item.identity.toString(),
            properties: item.properties
        }
    });

    var startnodesP = rawdata.map(item => {
        return {
            id: item.p.start.identity,
            node: item.p.start
        }
    });
    var startnodesQ = rawdata.map(item => {
        return {
            id: item.q.start.identity,
            node: item.q.start
        }
    });
    // var startnodesQ = [];
    var startnodes = [...startnodesP, ...startnodesQ];
    console.log(startnodes.length);

    var endnodesP = rawdata.map(item => {
        return {
            id: item.p.end.identity,
            node: item.p.end
        }
    });
    var endnodesQ = rawdata.map(item => {
        return {
            id: item.q.end.identity,
            node: item.q.end
        }
    });
    // var endnodesQ = [];
    var endnodes = [...endnodesP, ...endnodesQ];
    console.log(endnodes.length);

    startnodes.push.apply(startnodes, endnodes);
    console.log(startnodes.length);


    var idArray = startnodes.map(item => {
        return item.id;
    });
    const uniqueIdList = [...new Set(idArray)];
    // console.log('uniqueIdList的长度：');
    // console.log(uniqueIdList.length);

    // const uniqueNodes = [...new Set(startnodes)];
    // console.log('uniqueNodes的长度：');
    // console.log(uniqueNodes.length);


    var tempIdList = [];
    var primaryNodes = [];


    for(var i=0;i<startnodes.length;i++){

        var tempnode = startnodes[i];
        var tempid = tempnode.id;
        if(tempIdList.indexOf(tempid) != -1) continue;
        tempIdList.push(tempid);
        primaryNodes.push(tempnode);

    }

    //不含重复id的节点集合
    var nodes = primaryNodes.map(item => {
        return {
            id: item.node.identity.toString(),
            label: item.node.properties.nodeName,
            labels: item.node.labels,
            properties: item.node.properties
        }
    });


    //从节点中排除掉地质界线节点，从边中排除连接了地质界线节点的边
    //检查节点是否为非地质界线节点
    function checkNode(node){
      return node.labels.indexOf('Boundary') === -1;
    }

    //检查节点是否为地质界线节点
    function checkFalseNode(node){
      return node.labels.indexOf('Boundary') !== -1;
    }

    //非地质界线节点，作为图的节点数据
    var finalNodes = nodes.filter(checkNode);

    //地质界线节点
    var falseNodes = nodes.filter(checkFalseNode);

    //地质界线节点id的集合
    var falseNodeIds = falseNodes.map(item => {
      return item.id;
    })

    //检查边是否与地质界线节点无关
    function checkEdge(edge){
      return falseNodeIds.indexOf(edge.source) === -1 && falseNodeIds.indexOf(edge.target) === -1;
    }


    var tempEdgeIdList = [];
    var tempEdgeList = [];

    //获取不重复的边
    for(var i=0;i<edges.length;i++){

        var tempedge = edges[i];
        var tempid = tempedge.id;
        if(tempEdgeIdList.indexOf(tempid) !== -1) continue;
        tempEdgeIdList.push(tempid);
        tempEdgeList.push(tempedge);

    }



    //与地质界线节点无关的边，作为图的边数据
    var finalEdges = tempEdgeList.filter(checkEdge);

    console.log("最终节点的数量：");
    console.log(finalNodes.length);

    var finalData = {
        nodes: finalNodes,
        edges: finalEdges
    };

    return finalData;

}

async function constructKG(){

    layui.use('layer', function(){
        var layer = layui.layer;
        index =  layer.open({
            type: 1,
            title: "知识图谱构建",
            content: $('#constructKG'),
            area: ['500px', '280px']
        });

        $('#closeCKG').click(function(){
            layer.close(index);
        });

        // $('#OKKG').click(function(){
        //     layer.close(index);
        // })
        
    });

}

async function kgClear(){

    layui.use('layer', function(){
        var layer = layui.layer;
        index =  layer.open({
            type: 1,
            title: "知识图谱重置",
            content: $('#kgClear'),
            area: ['500px', '150px']
        });

        $('#closeCKG').click(function(){
            layer.close(index);
        });
        
    });

}

async function fuseKG(){

    layui.use('layer', function(){
        var layer = layui.layer;
        index =  layer.open({
            type: 1,
            title: "知识图谱融合",
            content: $('#fuseKG'),
            area: ['500px', '500px']
        });

        $('#closeFKG').click(function(){
            layer.close(index);
        })
        
    });

}

async function queryByKnow(){

    layui.use('layer', function(){
        var layer = layui.layer;
        index =  layer.open({
            type: 1,
            title: "知识图谱查询",
            content: $('#queryByKnow'),
            area: ['500px', '300px']
        });

        $('#closeQBK').click(function(){
            layer.close(index);
        });
        
    });

}

async function identifyOneFault(){

    layui.use('layer', function(){
        var layer = layui.layer;
        index =  layer.open({
            type: 1,
            title: "断层构造个体识别",
            content: $('#identifyOneFault'),
            area: ['500px', '350px']
        });

        $('#closeIOF').click(function(){
            layer.close(index);
        })
        
    });

}

async function identifyFold(){

    layui.use('layer', function(){
        var layer = layui.layer;
        index =  layer.open({
            type: 1,
            title: "褶皱构造识别",
            content: $('#identifyFold'),
            area: ['500px', '180px']
        });

        $('#closeIF').click(function(){
            layer.close(index);
        })
        
    });

}

async function createGeoRelationshipForm(){
    layui.use('layer', function(){
        var layer = layui.layer;
        index =  layer.open({
            type: 1,
            title: "地质关系创建",
            content: $('#createGeoRelationshipForm'),
            area: ['500px', '200px']
        });

        $('#okCGRF').click(function(){
            layer.close(index);
        });
        $('#closeCGRF').click(function(){
            layer.close(index);
        });
        
    });
}

async function createTemporalRelationshipForm(){
    layui.use('layer', function(){
        var layer = layui.layer;
        index =  layer.open({
            type: 1,
            title: "时间关系创建",
            content: $('#createTemporalRelationshipForm'),
            area: ['500px', '200px']
        });

        $('#okCTRF').click(function(){
            layer.close(index);
        });
        $('#closeCTRF').click(function(){
            layer.close(index);
        });
        
    });
}

async function parseTemporalIntervalOfEventForm(){
    layui.use('layer', function(){
        var layer = layui.layer;
        index =  layer.open({
            type: 1,
            title: "时间区间解析",
            content: $('#parseTemporalIntervalOfEventForm'),
            area: ['500px', '200px']
        });

        $('#okPTIEF').click(function(){
            layer.close(index);
        });
        $('#closePTIEF').click(function(){
            layer.close(index);
        });
    });
}

async function detectAndCorrectTemporalConflictForm(){
    layui.use('layer', function(){
        var layer = layui.layer;
        index =  layer.open({
            type: 1,
            title: "冲突检测与校正",
            content: $('#detectAndCorrectTemporalConflictForm'),
            area: ['500px', '200px']
        });

        $('#okDCTCF').click(function(){
            layer.close(index);
        });
        $('#closeDCTCF').click(function(){
            layer.close(index);
        });
    });
}

async function generateGeoEventSequenceForm(){
    layui.use('layer', function(){
        var layer = layui.layer;
        index =  layer.open({
            type: 1,
            title: "时间序列生成",
            content: $('#generateGeoEventSequenceForm'),
            area: ['500px', '200px']
        });

        $('#okGGSF').click(function(){
            layer.close(index);
        });
        $('#closeGGSF').click(function(){
            layer.close(index);
        });
    });
}

async function parseGeoEvByTime(){
    layui.use('layer', function(){
        var layer = layui.layer;
        index =  layer.open({
            type: 1,
            title: "地质事件时序解析",
            content: $('#parseGeoEvByTime'),
            area: ['500px', '230px']
        });

        $('#closePGE').click(function(){
            layer.close(index);
        });
        
    });
}

async function identifyFaults(){
    layui.use('layer', function(){
        var layer = layui.layer;
        index =  layer.open({
            type: 1,
            title: "断层构造组合识别",
            content: $('#identifyFaults'),
            area: ['750px', '300px']
        });

        $('#closeIFS').click(function(){
            layer.close(index);
        });
        
    });
}

async function identifyCircStruc(){
    layui.use('layer', function(){
        var layer = layui.layer;
        index =  layer.open({
            type: 1,
            title: "穹窿/盆地/方山识别",
            content: $('#identifyCircStruc'),
            area: ['750px', '350px']
        });

        $('#closeICS').click(function(){
            layer.close(index);
        });
        
    });
}

async function nodeRelaVisual(){
    layui.use('layer', function(){
        var layer = layui.layer;
        index =  layer.open({
            type: 1,
            title: "节点关系可视化设置",
            content: $('#nodeRelaVisual'),
            area: ['750px', '300px']
        });

        $('#closeNRV').click(function(){
            layer.close(index);
        });
        
    });
}

async function queryByCypher(){
    layui.use('layer', async function(){
        var cypher = $('#cypherText').val();
        console.log(cypher);

        var tempUrl = "http://localhost:8081/kg/search";
        var temprawdata = await(await fetch(tempUrl+'?cypher=' + cypher , {
            method: 'get'
        })).json();
        // console.log(temprawdata);

        //绘制图谱
        drawKGmap("查询图", temprawdata);

        //切换到图谱面板
        document.getElementById('opengraph').click();

        alert("知识查询成功!");

    })


}

async function createGeoRelationship(){
    layui.use('layer', async function(){
        var tempUrl = "http://localhost:8081/temporal/create-geological-relationship";
        var temprawdata = await (await fetch(tempUrl)).json();
        // console.log(temprawdata);

        //绘制图谱
        drawKGmap("地质关系子图", temprawdata);

        //切换到图谱面板
        document.getElementById('opengraph').click();

        alert("地质关系创建成功!");

    })


}

async function createTemporalRelationship(){
    layui.use('layer', async function(){
        var tempUrl = "http://localhost:8081/temporal/create-temporal-relationship";
        var temprawdata = await (await fetch(tempUrl)).json();
        // console.log(temprawdata);

        //绘制图谱
        drawKGmap("时间关系子图", temprawdata);
        
        //切换到图谱面板
        document.getElementById('opengraph').click();

        alert("时间关系创建成功!");

    })

    
}

async function parseTemporalIntervalOfEvent(){
    layui.use('layer', async function(){
        var tempUrl = "http://localhost:8081/temporal/parse-temporal-interval";
        var temprawdata = await (await fetch(tempUrl)).json();
        // console.log(temprawdata);

        // //绘制图谱
        drawKGmap("断裂事件时间区间子图", temprawdata);

        //切换到图谱面板
        document.getElementById('opengraph').click();

        alert("时间区间解析成功!");

    })

    
}

async function detectAndCorrectTemporalConflict(){
    layui.use('layer', async function(){
        var tempUrl = "http://localhost:8081/temporal/detect-correct-conflict";
        var temprawdata = await (await fetch(tempUrl)).json();
        // console.log(temprawdata);

        //绘制图谱
        drawKGmap("冲突校正后的时间关系子图", temprawdata);

        //切换到图谱面板
        document.getElementById('opengraph').click();

        alert("冲突检测与校正成功!");
        alert("有向环个数：\n3\n删除时间关系：\nNE13-NE14 NW6-NE13 NW7-NE6");


    })

    
}

async function generateGeoEventSequence(){
    layui.use('layer', async function(){
        var tempUrl = "http://localhost:8081/temporal/generate-event-sequence";
        var temprawdata = await (await fetch(tempUrl)).json();
        // console.log(temprawdata);

        //绘制图谱
        drawKGmap("地质事件时间序列", temprawdata);

        //切换到图谱面板
        document.getElementById('opengraph').click();

        alert("时间序列生成成功!");

    })

    
}

