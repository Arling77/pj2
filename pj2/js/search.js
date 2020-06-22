var searchState={};

window.onload = function () {
    searchState.imgs=[];
    searchState.pageI = 1;//当前页面
    drawUserCenter();
    draw();
};

//搜索按钮按下后
function searchTD() {
    let imgPaths,imgIds,imgTitles,imgDes;
    let titleE = document.getElementById("titleType");
    if(titleE.checked){
        //标题搜索
        let title = document.getElementsByName("titleInput")[0].value;
        console.log("title="+title);
        if(title==null||title==""){
            searchState.imgs =[];
            searchState.pageI = 1;//当前页面
            draw();
        }else {//后台获取
            let xml=$.ajax({
                type: "POST",
                url:'../php/searchImgs.php',
                dataType:'json',
                async:true,
                data:{'searchType':'title','value':title},

                success:function (ans) {
                    // let result = ans;
                    searchState.imgs =ans;
                    searchState.pageI = 1;//当前页面
                    draw();
                }
            } );
        }
    }else {
        //描述搜索
        let describe = document.getElementsByName("descriptInput")[0].value;
        console.log("describe="+describe);
        //后台
        let xml=$.ajax({
            type: "POST",
            url:'../php/searchImgs.php',
            dataType:'json',
            async:true,
            data:{'searchType':'des','value':describe},

            success:function (ans) {
                // let result = ans;
                searchState.imgs =ans;
                searchState.pageI = 1;//当前页面
                draw();
            }
        } );
    }
}

//绘制
function draw() {
    //每页共六个
    let basePath = "../travel-images/square-medium/";
    for(let i=0;i<6;i++){

        let imgDiv =  document.getElementById("imgDiv");
        let index = (searchState.pageI-1)*6+i;
        if(index<searchState.imgs.length){
            let img = searchState.imgs[index];
            let path = basePath+img.path;
            let html = '';
            html+='<div class="row">';
            html+='<div class="col-sm-8 col-md-5">'
            html+='<div class="thumbnail">';
            html+=' <a href="details.html">'
            html+='<img src="/'+path+'onclick=\'setClickImgId(" +img.ID+")\''+'>'+'</a>';
            html+='<div class="caption">'+'<h3 >'+img.title</h3>' ;
            html+='<p >'+img.des+'</p>'+'</div>'+' </div>'+ ' </div>'+' </div>';
            imgDiv.innerHTML=html;
        }else {
            imgDiv.innerHTML ="";

        }

    }
    showPageBtns();
}

//更新页码显示
function showPageBtns() {
    let pageN =Math.ceil(searchState.imgs.length/6) ;//总页数 每页6个
    if(pageN===0){pageN =1;}//如果为空，则显示一页空
    if(pageN>5){pageN=5;}//只显示前五页
    let element =document.getElementById("pageBtns");
    let html = "<button onclick=\"changePage(" +1+")\"><i class=\"fa fa-angle-double-left\" aria-hidden=\"true\"></i></button>\n";
    for(let pageI=1;pageI<pageN+1;pageI++){
        if(searchState.pageN===pageI){
            html+="<button onclick=\"changePage(" +pageI+")\" class=\"highlight\">" +pageI+"</button>\n" ;
        }else {
            html+="<button onclick=\"changePage(" +pageI+")\">" +pageI+"</button>\n" ;
        }

    }
    html+="<button onclick=\"changePage(" +pageN+")\"><i class=\"fa fa-angle-double-right\" aria-hidden=\"true\"></i></button>";
    element.innerHTML=html;
}

//跳转页面 从1开始 pageN可能是字符串
function changePage(pageN) {
    if(pageN==1){
        searchState.pageI = 1;
    }else if(pageN==2){
        searchState.pageI = 2;
    }else if(pageN==3){
        searchState.pageI = 3;
    }else if(pageN==4){
        searchState.pageI = 4;
    }else if(pageN==5){
        searchState.pageI = 5;
    }
    draw();
}