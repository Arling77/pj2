var favorState = {};

window.onload = function () {
    drawUserCenter();
    favorState.imgs=[];
    favorState.pageI = 1;//当前页面 从1开始
    getAndShowFavor();//后台获得我的收藏并显示
};

//后台获得我的收藏并显示
function getAndShowFavor() {
    let userID = getUserID();
    let xml1 = $.ajax({
        type: "POST",
        url: '../php/getMyFavor.php',
        dataType: 'json',
        async: false,
        data: {'userID': userID},

        success: function (ans) {
            //imgs[]= Imgae{ImageID,imagePathe,title,des}
            favorState.imgs = ans;
            //是否有图片？
            if (favorState.imgs.length > 0) {
                //有：将所有图片进行渲染
                //  1.图片，页码信息进行设置
                favorState.pageI = 1;
                //  2.页码单页渲染
                drawCurrentPage();
            } else {
                //无：显示一句话
                let imgDivE = document.getElementById("imgsArea");
                imgDivE.innerHTML = "您还没有收藏照片，赶紧收藏一张喜爱的照片吧！";
                let pageBtns = document.getElementById("pageBtns");
                pageBtns.innerHTML = "<br><br>\n";
            }
        }
    });
}

//页码单页渲染(imgs有值)
function drawCurrentPage(){
    let startIndex = (favorState.pageI-1)*8;//八个一页
    let img = favorState.imgs[startIndex];
    let html = getOneImgHtml(img,true);
    console.log("startIndex="+startIndex+";photoState.imgs.length="+favorState.imgs.length);//
    for(let i=startIndex+1;i<favorState.imgs.length&& i<startIndex+8;i++){
        img = favorState.imgs[i];
        html+=getOneImgHtml(img,false);
    }
    let imgDivE = document.getElementById("imgsArea");
    imgDivE.innerHTML =html;

    //页码显示
    showPageBtns();
}

//更新页码显示
function showPageBtns(){
    let pageN =Math.ceil(favorState.imgs.length/8) ;//总页数 每页8个
    if(pageN===0){pageN =1;}//如果为空，则显示一页空
    if(pageN>5){pageN=5;}//只显示前五页
    let element =document.getElementById("pageBtns");
    let html = "<br><br>\n" +
        "                <label>" +
        "<button onclick=\"changePage(" +1+")\"><i class=\"fa fa-angle-double-left\" aria-hidden=\"true\"></i></button>\n";
    for(let pageI=1;pageI<pageN+1;pageI++){
        if(favorState.pageI===pageI){
            html+="<button onclick=\"changePage(" +pageI+")\" class=\"highlight\">" +pageI+"</button>\n" ;
        }else {
            html+="<button onclick=\"changePage(" +pageI+")\">" +pageI+"</button>\n" ;
        }

    }
    html+="<button onclick=\"changePage(" +pageN+")\"><i class=\"fa fa-angle-double-right\" aria-hidden=\"true\"></i></button>" +
        "</label>";
    element.innerHTML=html;
}

//拼凑单个图片的html
function getOneImgHtml(img,isFirst) {
    let basePath = "../travel-images/square-medium/";
    let path = basePath+img.path;
    let html;
    if(isFirst){
        html = "<div>\n" ;
    }else {
        html="<div class=\"secondsgroup\">\n";
    }
    console.log("imgID="+img.imgID);//
    html+="                    <!--图片-->\n" +
        "                    <div class=\"leftPart\">\n" +
        "                        <a href=\"./details.html\" onclick='setClickImgId(" +img.imgID+")'>\n" +
        "                            <img src=\"" +path+"\" alt = \"缩略图\">\n" +
        "                        </a>\n" +
        "                    </div>\n" +
        "                    <!--右边信息-->\n" +
        "                    <div class=\"rightPart\">\n" +
        "                        <h4>" +img.title+"</h4>\n" +
        "                        <p>\n" +img.des+
        "                        </p>\n" +
        "                        <button onclick=\"cancelFavor(" +img.imgID+")\"><i class=\"fa fa-trash\" aria-hidden=\"true\" ></i> 取消收藏</button>" +
        "                    </div>\n" +
        "                    <div class=\"clear\"></div>\n" +
        "                </div>";


    return html;
}

//----------按钮处理事件-------------------
//取消收藏
function cancelFavor(imgID) {
    let userID = getUserID();
    let xml1=$.ajax({
        type: "POST",
        url:'../php/unfavored.php',
        dataType:'json',
        async:true,
        data:{'imgID':imgID,'userID':userID},

        success:function (ans) {
            console.log("删除完毕");//
            getAndShowFavor();//重新显示
        }
    });
}

//页码点击 跳转页面 从1开始 pageN可能是字符串
function changePage(pageI){
    if(pageI==1){
        favorState.pageI = 1;
    }else if(pageI==2){
        favorState.pageI = 2;
    }else if(pageI==3){
        favorState.pageI = 3;
    }else if(pageI==4){
        favorState.pageI = 4;
    }else if(pageI==5){
        favorState.pageI = 5;
    }
    drawCurrentPage();
}