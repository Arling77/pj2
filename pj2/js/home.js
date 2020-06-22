window.onload = function () {
    drawUserCenter();
    setImages("hot");
};

//绘制图片
function setImages(getType) {
    let xml=$.ajax({
        type: "POST",
        url:'../php/getImgsByType.php',
        dataType:'json',
        async:false,
        data:{'getType':getType},

        success:function (ans) {
            let pictures = ans;
            let basePath = "../travel-images/square-medium/";
            for (let i=0;i<6;i++){
                let picture = pictures[i];
                let path = basePath+ picture["path"];
                let n = i+1;
                let element = document.getElementById("img"+n);
                let titleE = document.getElementById("title"+n);
                let describeE =document.getElementById("describle"+n);
                element.innerHTML = "<img src=\""+path+"\" alt=\"通用的占位符缩略图\">";
                titleE.innerHTML =picture["title"];
                if(picture["des"]==null){
                    describeE.innerHTML = "暂无简介";
                }else{
                    describeE.innerHTML = picture["des"] ;
                }

                element.onclick = function () {
                    setClickImgId(picture["imageID"]);
                }
            }
        }
    } );
}

