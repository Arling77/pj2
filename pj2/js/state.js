
function clearUser() {
    let user = {};
    user.loginState = false;//用户的登录状态为 未登录
    user.name = null;
    user.userID =-1;
    localStorage.setItem('user',JSON.stringify(user));

}


function setUser(userName,userID) {
    let user = {};
    user.userID = userID;
    user.name = userName;
    user.loginState =true;
    localStorage.setItem('user',JSON.stringify(user));
}


function isUserLogin() {
    let user = JSON.parse(localStorage.getItem('user'));
    if(!user){
        clearUser();//初始化
        return false;
    }else {
        return user.loginState;
    }
}



function getUserID() {
    let user = JSON.parse(localStorage.getItem('user'));
    if(user===undefined){
        return -1;
    }
    if(user.loginState===false){
        return -1;
    }
    return user.userID;
}


function setClickImgId(imgId) {
    console.log("设置当前点击图片的ID="+imgId);//
    localStorage.setItem('imgId',imgId);
}


function getClickImgId() {
    return localStorage.getItem('imgId');
}


function setEditImg(imgID) {
    console.log("设置当前修改图片的ID="+imgID);//
    localStorage.setItem('isEditing',true);
    localStorage.setItem('editImgId',imgID);
}


function getEditImg() {
    let isEditing = localStorage.getItem('isEditing');
    console.log("isEditing="+isEditing);//
    let imgID;
    if(isEditing=='true'){
        console.log("isEditing===true");//
        imgID =localStorage.getItem('editImgId');
    }else {
        console.log("not isEditing===true");//
        imgID=-1;
    }
    return imgID;
}


function cancelEdit() {
    console.log("cancelEdit");//
    localStorage.setItem('isEditing',false);
}

function drawUserCenter() {
    let userCenter = document.getElementById("userCenter");
    let html = "";
    if(isUserLogin()){
        html="<li class=\"divider\"></li>"+
            "<li><a href=\"upload.html\">Upload</a></li>"+
        "<li class=\"divider\"></li>"+
           " <li><a href=\"myPhoto.html\">My Photos</a></li>"+
        "<li class=\"divider\"></li>"+
            "<li><a href=\"favor.html\">My Favorite</a></li>"+
        "<li class=\"divider\"></li>"+
            "<li><a href=\"#\" onclick='quit()'>Log out</a></li>";

    }else {
        html= "<li class=\"divider\"></li>"+
        "<li><a href=\"#\" onclick='loginIn()'>Log in</a></li>";
    }
    userCenter.innerHTML = html;
}

//登出操作
function quit() {
    clearUser();
    window.location.href='home.html';
}

//登录跳转
function loginIn() {
    window.location.href='login.html';
}