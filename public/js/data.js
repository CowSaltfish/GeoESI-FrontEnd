var shpArray = [];
var shpPathObj = {};
var boundaryShpPathObj = {};

var files;

layui.use('upload', function(){
    var upload = layui.upload;
    upload.render({
        elem: '#selectShp',
        url: 'http://localhost:8081/file/upload',
        accept: 'file',
        multiple: true,
        number: 12,
        auto: false,
        bindAction: '#uploadShp',
        choose: function(obj){
            // files  = this.files = obj.pushFile();
            files = obj.pushFile();
            clearFiles();
            // console.log(files);
            // console.log(obj);
            obj.preview(function(index, file, result){
                // console.log(file);
                if($('#shpName').val() === ''){
                    $('#shpName').attr('value', file.name);
                }else{
                    $('#shpName').attr('value', $('#shpName').val() + ';' + file.name);
                }
                obj.pushFile();
            })
        },
        done: function(res){

            var shpName = $('#shpName').val();
            var shpSource = $('#shpSource').val();
            // var projection = $('#projection').val();

            console.log(typeof(res));
            console.log(res.shpPath);

            var primaryShpPath = res.shpPath;
            var unCompleteShpPath = primaryShpPath.split('.')[0];
            var completeShpPath = unCompleteShpPath + '.shp';

            var tempArr = unCompleteShpPath.split('\\');
            var shp = tempArr[tempArr.length -1];

            var len = shp.length;
            var completeGeoPath = unCompleteShpPath.slice(0, unCompleteShpPath.length - 4 - len) + 'geojson' + '\\' + shp + '.json';

            
            // console.log('finalshpstr');
            // console.log(finalShpPath);
            // console.log('finalgeostr');
            // console.log(finalGeoPath);


            if(shpArray.indexOf(shp) === -1){

                // alert("file uploaded!");

                shpArray.push(shp);

                var shpArr = completeShpPath.split('\\');
                var finalShpPath = shpArr.join('/');
                var geoArr = completeGeoPath.split('\\');
                var finalGeoPath = geoArr.join('/');

                var regex = /boundary$/;

                if(regex.test(shp)){
                    // var tempShp = shp;
                    // var tempShpName = tempShp.replace("boundary", "");
                    shpPathObj[shp] = finalShpPath;
                    boundaryShpPathObj[shp] = finalShpPath;                    $('<option value="' + shp + '">' + shp +'</option>').appendTo('#KGDataSource');
                    $('<option value="' + shp + '">' + shp +'</option>').appendTo('#GeoBoundDS');
                    document.getElementById('closeCKG').click();
                }
                else{
                    shpPathObj[shp] = finalShpPath;
                    // $('<option value="' + shp + '">' + shp +'</option>').appendTo('#KGSource');
                    $('<option value="' + shp + '">' + shp +'</option>').appendTo('#KGDataSource');
                    $('<option value="' + shp + '">' + shp +'</option>').appendTo('#GeoBoundDS');
                    document.getElementById('closeCKG').click();
                }

                fetch('http://localhost:8081/shp/toGeoJson?fullShpPath' + '=' + finalShpPath + '&' + 'fullGeoPath' + '=' + finalGeoPath).then((res) => {
                    res.json().then((result) => {
                        console.log(result);

                        if(shpSource === "section"){
                            showSectionMap(result, shp);
                        }
                        else if(shpSource === "plan" || shpSource === "boundary"){
                            showPlanMap(result, shp);
                        }
                        
                    })
                })

            }

            console.log(completeShpPath);
            console.log(completeGeoPath);


            console.log('上传成功！');
            
            clearFiles();

        },
        error: function(){
            console.log('error!');
        }
    })
})

function addStratigraphicTimeTable(obj){
    //todo：打开文件对话框
    console.log("todo打开文件对话框");

    //  files = obj.pushFile();
    //  clearFiles();
    //  obj.preview(function(index, file, result){
    //      // console.log(file);
    //      if($('#shpName').val() === ''){
    //          $('#shpName').attr('value', file.name);
    //      }else{
    //          $('#shpName').attr('value', $('#shpName').val() + ';' + file.name);
    //      }
    //      obj.pushFile();
    //  })
}

function clearFiles(){
    for(var x in files){
        delete files[x];
    }
}

function addShp(){
    layui.use('layer', function(){
        var layer = layui.layer;
        var index = layer.open({
            type: 1,
            title: '添加shp',
            content: $('#addShp'),
            area: ['400px', '230px'],
            success: function(layero, index){
                layero.find('.layui-layer-content').attr('style', 'overflow: visible;');
            }
        });

        $('#uploadShp').click(function(){

            var shpName = $('#shpName').val();
            var shpSource = $('#shpSource').val();
            if(shpName && shpSource){
                layer.close(index);
            }
            
        })
    });
}

function clearShpName(){
    $('#shpName').attr('value', '');
}

async function test(){
    var data = await (await fetch('http://localhost:8081/kg/searchAllKG')).json();
    console.log(data);
}