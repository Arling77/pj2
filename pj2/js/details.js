var detailState = {};

window.onload = function () {
    drawUserCenter();
    detailState.img={};


    let imgID = getClickImgId();

    let xml1 = $.ajax({
        type: "POST",
        url: '../php/getImgData.php',
        dataType: 'json',
        async: true,
        data: {'imgID': imgID},

        success: function (ans) {
            detailState.img = ans;

            draw();
        }
    });
};


function draw() {

    let titleE = document.getElementById("title");
    titleE.innerHTML = detailState.img.title;
    let ownerE = document.getElementById("owner");
    ownerE.innerHTML = detailState.img.ownerName;
    let imgE =document.getElementById("imgPicture");
    imgE.src = "../travel-images/square-medium/"+detailState.img.path;//...

    drawFavorIcon();


    let themeE = document.getElementById("theme");
    themeE.innerHTML = "Theme:"+detailState.img.theme;
    let countryE = document.getElementById("country");
    countryE.innerHTML = "Country:"+detailState.img.countryName;
    let cityE = document.getElementById("city");
    cityE.innerHTML = "City:"+detailState.img.cityName;
    let desE = document.getElementById("des");
    desE.innerHTML = detailState.img.des;
}


function drawFavorIcon() {
    let favorBtnE = document.getElementById("favorBtn");
    let favorNumE = document.getElementById("favorNum");
    favorNumE.innerHTML = "Like Number:"+detailState.img.favorNum;

    if(isUserLogin()){

        detailState.userID = getUserID();
        console.log("后台获得是否收藏过的数据...");
        let xml1 = $.ajax({
            type: "POST",
            url: '../php/isFavored.php',
            dataType: 'json',
            async: false,
            data: {'userID': detailState.userID,'imgID':detailState.img.imgID},

            success: function (ans) {
                showFavor(ans);
            }
        });
    }else {
        //未登录
        favorBtnE.onclick = function () {
            alert("您未登录，请登录后再操作！");
        };
        favorBtnE.innerHTML = "<i class=\"fa fa-heart-o\" aria-hidden=\"true\"></i>Favored";
    }
}


function showFavor(isFavor) {
    let favorBtnE = document.getElementById("favorBtn");
    let favorNumE = document.getElementById("favorNum");
    favorNumE.innerHTML =  "Like Number:"+detailState.img.favorNum;
    if(isFavor){
        favorBtnE.onclick = function(){
            cancelFavor();
        };
        favorBtnE.innerHTML = "<i class=\"fa fa-heart\" aria-hidden=\"true\"></i> Unfavored";
    }else {
        favorBtnE.onclick = function(){
            addFavor();
        };
        favorBtnE.innerHTML = "<i class=\"fa fa-heart-o\" aria-hidden=\"true\"></i> Favored";
    }
}


function addFavor() {
    detailState.img.favorNum++;

    let xml1 = $.ajax({
        type: "POST",
        url: '../php/addFavored.php',
        dataType: 'json',
        async: false,
        data: {'userID': detailState.userID,'imgID':detailState.img.imgID},

        success: function (ans) {
            showFavor(true);
        }
    });
}


function cancelFavor() {
    detailState.img.favorNum--;

    let xml1 = $.ajax({
        type: "POST",
        url: '../php/cancelFavored.php',
        dataType: 'json',
        async: false,
        data: {'userID': detailState.userID,'imgID':detailState.img.imgID},

        success: function (ans) {
            showFavor(false);
        }
    });
}