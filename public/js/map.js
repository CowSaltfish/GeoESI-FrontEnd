// var osmlayer = new ol.layers.TileLayer({
//     source: new ol.source.OSM()

// const { ol } = require("../src/ol/ol");

// });
// new ol.layers.Tile.TileLayer

// const map = new ol.map({
//     layers: [
//         new ol.layers.Tile.TileLayer({
//             source: new ol.source.OSM(),
//         }),
//     ],
//     target: 'map',
//     view: new ol.view({
//         center: [0,0],
//         zoom:2,
//     }),
// });

var layerIndex = 0;  //图层索引
var layerArray = [];  //图层数组



//随机产生一个使用rgba()函数表示的颜色字符串
function getRandomColor(){
    var rgb = [];
    for(var i=0;i<3;i++){
        var randomNum = Math.floor(255 * Math.random());
        rgb.push(randomNum);
    }
    return 'rgba(' + rgb[0].toString() + ',' + rgb[1].toString() + ',' + rgb[2].toString() + ',' + '1)';
}

//从geojson数据中找出所有的地层类别，返回一个字符串数组
function getUniqueTypes(geoData){
    var features = geoData.features;
    var types = [];
    features.forEach(function(item){
        var type = item.properties['地层类'];
        if(types.indexOf(type) === -1){
            types.push(type);
        }
    });
    return types;
}

// const textFunction = function(){

// }

//从geojson数据中找出所有的地层岩性，返回一个字符串数组
function getUniqueRockTypes(geoData){
    var features = geoData.features;
    var types = [];
    features.forEach(function(item){
        var type = item.properties['Type'];
        if(types.indexOf(type) === -1){
            types.push(type);
        }
    });
    return types;
}




//根据类别随机生成一个样式（只有填充颜色属性），返回一个对象
function getColor(types){
    var colors = {};
    types.forEach(function(item){
        colors[item] = getRandomColor();
    });
    return colors;
}

// styles[feature.getProperties()['地层类']]



// const styles = {
//     '西横山组': new ol.style.Style({
//         fill: new ol.style.Fill({
//             color: getRandomColor()
//         })
//     })
// }







//OSM地图  使用XYZ的方式加载
var osmlayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
        url: 'http://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    })
});

//天地图矢量
var map_vec = new ol.layer.Tile({
    source: new ol.source.XYZ({
        url: "http://t4.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=0aee970f92d59a9373093eede919035f"
    })
});

//天地图矢量注记
var map_info = new ol.layer.Tile({
    source: new ol.source.XYZ({
        url: "http://t3.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=0aee970f92d59a9373093eede919035f"
    })
});

//geojson数据
var strata = new ol.layer.Vector({
    source: new ol.source.Vector({
        projection: "EPSG:3857",
        url: "../data/nanjing3857.json",
        format: new ol.format.GeoJSON()
    })
})


//创建map，与id为'map'的div关联
var map = new ol.Map({
    interactions: ol.interaction.defaults().extend([new ol.interaction.DragRotateAndZoom()]),
    layers: [ map_vec, map_info ],
    view: new ol.View(
        {
            center: ol.proj.transform([110, 30], "EPSG:4326", "EPSG:3857"),
            zoom: 4,
            projection: "EPSG:3857"
        }),
    target: "map"
});
// map.getView().setCenter([110, 30]);


// //加载本地geojson数据并按类别赋不同颜色
// fetch('http://localhost:5000/data/nanjing3857.json').then((result) => {
//     result.json().then((res) => {
//         // console.log(res);

//         var localData = res;
//         var types = getUniqueTypes(localData);
//         var colors = getColor(types);
//         const styleFunction = function(feature){
//             // console.log(feature.get(6));
//             // return styles[feature.getProperties()['地层类']];
//             var color = colors[feature.get('地层类')];
//             return new ol.style.Style({
//                 fill: new ol.style.Fill({
//                     color: color
//                 }),
//                 text: new ol.style.Text({
//                     font: 'Normal 16px/1 sans-serif',
//                     text: feature.get('地层名')
//                 })
//             })
//         }

//         const vectorSource = new ol.source.Vector()

//         var newLs = vectorSource.on('change', function(){
//             if(vectorSource.getState() === 'ready'){
//                 var extent = vectorSource.getExtent();
//                 var view = map.getView();
//                 view.fit(extent);
//                 vectorSource.un(newLs);
//             }
//         })

//         vectorSource.addFeatures(new ol.format.GeoJSON().readFeatures(localData));


//         console.log(vectorSource);
//         const vectorLayer = new ol.layer.Vector({
//             source: vectorSource,
//             style: styleFunction
//         })

//         console.log('layer generated!');

        
//         map.addLayer(map_vec);
//         map.addLayer(map_info);

//         map.addLayer(vectorLayer);

        
        
//     })
// })

//展示平面地质图 参数为平面图的geojson数据
function showPlanMap(geoJsonData, shp){
    
    var types = getUniqueTypes(geoJsonData);
    var colors = getColor(types);
    const styleFunction = function(feature){
        // console.log(feature.get(6));
        // return styles[feature.getProperties()['地层类']];
        var color = colors[feature.get('地层类')];
        return new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'black',
                width: 1
            }),
            fill: new ol.style.Fill({
                color: color
            }),
            text: new ol.style.Text({
                font: 'Normal 16px/1 sans-serif',
                text: feature.get('地层名')
            })
        })
    }

    const vectorSource = new ol.source.Vector();

    var newLs = vectorSource.on('change', function(){
        if(vectorSource.getState() === 'ready'){
            var extent = vectorSource.getExtent();
            var view = map.getView();
            view.fit(extent);
            vectorSource.un(newLs);
        }
    })

    vectorSource.addFeatures(new ol.format.GeoJSON().readFeatures(geoJsonData));


    console.log(vectorSource);
    const vectorLayer = new ol.layer.Vector({
        source: vectorSource,
        style: styleFunction
    })

    console.log('layer generated!');

    for(var i=0;i<layerArray.length;i++){
        var layer = layerArray[i];
        layer.setVisible(false);
    }

    map.addLayer(vectorLayer);

    layerIndex++;

    $('<dd><a id="layer' + layerIndex.toString() +'" href="javascript:;">' + shp + '</a></dd>').appendTo('#layerList');

    //重新渲染左侧导航栏
    layui.use('element', function(){
        var element = layui.element;

        element.render('nav', 'test');
    })

    $('#layer' + layerIndex.toString()).click(showSelectedLayer);

    layerArray.push(vectorLayer);

}




//展示剖面地质图 参数为剖面图的geojson数据
function showSectionMap(geoJsonData, shp){

    // var types = getUniqueTypes(geoJsonData);
    // var colors = getColor(types);
    // const styleFunction = function(feature){
    //     // console.log(feature.get(6));
    //     // return styles[feature.getProperties()['地层类']];
    //     var color = colors[feature.get('地层类')];
    //     return new ol.style.Style({
    //         fill: new ol.style.Fill({
    //             color: color
    //         }),
    //         text: new ol.style.Text({
    //             font: 'Normal 16px/1 sans-serif',
    //             text: feature.get('地层名')
    //         })
    //     })
    // }

    var types = getUniqueRockTypes(geoJsonData);
    var colors = getColor(types);
    const styleFunction = function(feature){
        // console.log(feature.get(6));
        // return styles[feature.getProperties()['地层类']];
        var color = colors[feature.get('Type')];
        return new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'black',
                width: 2
            }),
            fill: new ol.style.Fill({
                color: color
            }),
            text: new ol.style.Text({
                font: 'Normal 16px/1 sans-serif',
                text: feature.get('S_Name')
            })
        })
    }


    const vectorSource = new ol.source.Vector();

    var newLs = vectorSource.on('change', function(){
        if(vectorSource.getState() === 'ready'){
            var extent = vectorSource.getExtent();
            var view = map.getView();
            view.fit(extent);
            vectorSource.un(newLs);
        }
    })

    vectorSource.addFeatures(new ol.format.GeoJSON().readFeatures(geoJsonData));


    console.log(vectorSource);
    const vectorLayer = new ol.layer.Vector({
        source: vectorSource,
        style: styleFunction
    })

    console.log('layer generated!');

    
    // map.addLayer(map_vec);
    // map.addLayer(map_info);

    // console.log(map.getLayers().a);

    for(var i=0;i<layerArray.length;i++){
        var layer = layerArray[i];
        layer.setVisible(false);
    }


    map.addLayer(vectorLayer);

    layerIndex++;

    $('<dd><a id="layer' + layerIndex.toString() + '" href="javascript:;">' + shp + '</a></dd>').appendTo('#layerList');

    //重新渲染左侧导航栏
    layui.use('element', function(){
        var element = layui.element;

        element.render('nav', 'test');
    })

    $('#layer' + layerIndex.toString()).click(showSelectedLayer);

    
    layerArray.push(vectorLayer);

}

function showSelectedLayer(){

    document.getElementById('openmap').click();

    var idStr = $(this).attr('id');
    var indexStr = idStr.charAt(idStr.length - 1);
    var index = parseInt(indexStr);

    for(var i=0;i<layerIndex;i++){
        if(i === index - 1){
            layerArray[i].setVisible(true);

            var source = layerArray[i].getSource();
            var extent = source.getExtent();
            var view = map.getView();
            view.fit(extent);

        }
        else{
            layerArray[i].setVisible(false);
        }
    }

}


// //使图层在地图上居中显示
// var ls = strata.getSource().on('change', function(){
//     if(strata.getSource().getState() === 'ready'){

//         var extent = strata.getSource().getExtent();
//         var view = map.getView();
//         view.fit(extent);

//         strata.getSource().un(ls);

//     }
// })

// console.log(strata.N.source.s);
// console.log(typeof(strata.N.source.s));