var selectedGraphId = 0;
var selectedGraphName = "";


$(function(){
    $('#openmap').click(function(){
        $(divSelectStr).removeClass('show');
        $(divSelectStr).addClass('none');
        $('#map').removeClass('none');
        $('#map').addClass('show');
    });
    $('#opengraph').click(function(){
        $('#map').removeClass('show');
        $('#map').addClass('none');
        $(divSelectStr).removeClass('none');
        $(divSelectStr).addClass('show');
    });

    $('#closeFKG').click(function(){
        var TB = document.getElementById("subGraphTB");
        TB.innerHTML = "";
    });

    // var arr = ["新建", "导出文件", "导出图片", "粘贴", "删除"];
    var arr = ["导出文件", "导出图片", "粘贴", "删除"];
    var cloneDiv,selectDiv;
    var ul=$("<ul></ul>").appendTo("body").css({
        listStyle: "none",
        margin: 0,
        padding: 0,
        position: "absolute",
        display: "none",
        zIndex: 999,
    }).mouseleave(function(){
        $(this).css("display","none");
    });
    $.each(arr,function(index,item){
        $("<li></li>").appendTo(ul).css({
            padding: "5px 15px",
            backgroundColor: "skyblue",
            userSelect: "none",
        }).text(item).hover(
            function(){
                $(this).css("backgroundColor", "blue");
            },function(){
                $(this).css("backgroundColor", "skyblue");
            }
        ).click(function(e){
            switch(arr.indexOf($(this).text())){
                // case 0:
                //     var col="#";
                //     for(var i=0;i<6;i++){
                //         col+=Math.floor(Math.random()*16).toString(16);
                //     }
                //     $("<div></div>").appendTo(".layui-side").css({
                //         width: 50,
                //         height: 50,
                //         backgroundColor: "red",
                //         position: "absolute",
                //         left: e.clientX - 25,
                //         top: e.clientY - 25,
                //         zIndex: 99,
                //         // color: "red"
                //     }).click(function(){
                //         selectDiv=$(this);
                //         selectDiv.css("border", "1px solid #000000").mousedown(function(e){
                //             var div=$(this);
                //             e.preventDefault();
                //             $(document).mousemove(function(e1){
                //                 div.css({
                //                     left: e1.clientX - e.offsetX,
                //                     top: e1.clientY - e.offsetY,
                //                 });
                //             }).mouseup(function(){
                //                 $(this).off("mousemove mouseup");
                //             })
                //         }).siblings("div").css("border","none").off("mousedown");
                //     });
                //     console.log(selectDiv);
                //     break;
                case 0:
                    // cloneDiv=selectDiv.clone(true);
                    const filename = selectedGraphName + ".json";
                    const myBlob = new Blob([JSON.stringify(dataArray[selectedGraphId - 1], null, 4)], { type: "application/json" });
                    download(filename, myBlob);
                    break;
                case 1:
                    // cloneDiv=selectDiv.clone(true);
                    // selectDiv.remove();
                    // selectDiv=null;
                    graphArray[selectedGraphId - 1].downloadFullImage(selectedGraphName, 'image/jpeg', {backgroundColor: '#FFF'});
                    break;
                case 2:
                    if(!cloneDiv) return;
                    selectDiv=cloneDiv;
                    selectDiv.appendTo("body").css({
                        left: e.clientX - 25,
                        top: e.clientY - 25,
                    }).siblings("div").css("border","none");
                    cloneDiv=null;
                    break;
                case 3:
                    selectDiv.remove();
                    selectDiv=null;
                    break;
                    }
            ul.css("display","none");
        })
    });

    $(".layui-side").contextmenu(function(e){
        e.preventDefault();
        ul.css({
            display: "block",
            left: e.clientX + 6,
            top: e.clientY + 6, 
        });
        // console.log(e);
        // console.log(e.originalEvent.x);
        // console.log(e.originalEvent.y);

        //获取点击的元素
        selectedElem = document.elementFromPoint(e.originalEvent.x, e.originalEvent.y);

        //元素id
        selectedGraphId = parseInt(selectedElem.id);
        //元素文本内容
        selectedGraphName = selectedElem.innerHTML;

    });





});