var photoState={};

window.onload = function () {
    drawUserCenter();
    photoState.imgs=[];
    photoState.pageI = 1;
    getPhotosAndShow();
};

function getPhotosAndShow() {
    let userID = getUserID();
    let xml1 = $.ajax({
        type: "POST",
        url: '../php/getMyPhotos.php',
        dataType: 'json',
        async: false,
        data: {'userID': userID},

        success: function (ans) {

            photoState.imgs = ans;
            console.log("ans.length="+ans.length);//

            if (photoState.imgs.length > 0) {

                photoState.pageI = 1;

                drawCurrentPage();
            } else {

                let imgDivE = document.getElementById("imgsArea");
                imgDivE.innerHTML = "您还没有上传照片，赶紧点击个人中心的上传按钮增加一张吧！";
                let pageBtns = document.getElementById("pageBtns");
                pageBtns.innerHTML = "<br><br>\n";
            }
        }
    });
}


function drawCurrentPage() {
    let startIndex = (photoState.pageI-1)*6;
    let img = photoState.imgs[startIndex];
    let html = getOneImgHtml(img,true);
    console.log("startIndex="+startIndex+";photoState.imgs.length="+photoState.imgs.length);//
    for(let i=startIndex+1;i<photoState.imgs.length&& i<startIndex+8;i++){
        img = photoState.imgs[i];
        html+=getOneImgHtml(img,false);
    }
    let imgDivE = document.getElementById("imgsArea");
    imgDivE.innerHTML =html;


    showPageBtns();
}


function showPageBtns() {
    let pageN =Math.ceil(photoState.imgs.length/6) ;
    if(pageN===0){pageN =1;}//如果为空，则显示一页空
    if(pageN>5){pageN=5;}//只显示前五页
    let element =document.getElementById("pageBtns");
    let html = "<br><br>\n" +
        "                <label>" +
        "<button onclick=\"changePage(" +1+")\"><i class=\"fa fa-angle-double-left\" aria-hidden=\"true\"></i></button>\n";
    for(let pageI=1;pageI<pageN+1;pageI++){
        if(photoState.pageI===pageI){
            html+="<button onclick=\"changePage(" +pageI+")\" class=\"highlight\">" +pageI+"</button>\n" ;
        }else {
            html+="<button onclick=\"changePage(" +pageI+")\">" +pageI+"</button>\n" ;
        }

    }
    html+="<button onclick=\"changePage(" +pageN+")\"><i class=\"fa fa-angle-double-right\" aria-hidden=\"true\"></i></button>" +
        "</label>";
    element.innerHTML=html;
}


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
        "                        <button onclick=\"modifyImg(" +img.imgID+")\"><i class=\"fa fa-pencil\" aria-hidden=\"true\" ></i> 修改</button>\n" +
        "                        <button onclick=\"deleteImg(" +img.imgID+")\"><i class=\"fa fa-trash\" aria-hidden=\"true\" ></i> 删除</button>\n" +
        "                    </div>\n" +
        "                    <div class=\"clear\"></div>\n" +
        "                </div>";

    return html;
}


function modifyImg(imgID) {
    setEditImg(imgID);
    window.location.href='./upload.html';
}

//删除按钮
function deleteImg(imgID) {
    let xml1=$.ajax({
        type: "POST",
        url:'../php/deleteMyphotos.php',
        dataType:'json',
        async:true,
        data:{'imgID':imgID},

        success:function (ans) {
            console.log("DELETE FINISHED");//
            getPhotosAndShow();
        }
    });
}


function changePage(pageI) {
    if(pageI==1){
        photoState.pageI = 1;
    }else if(pageI==2){
        photoState.pageI = 2;
    }else if(pageI==3){
        photoState.pageI = 3;
    }else if(pageI==4){
        photoState.pageI = 4;
    }else if(pageI==5){
        photoState.pageI = 5;
    }
    drawCurrentPage();
}
