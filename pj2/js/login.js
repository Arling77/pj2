
function login() {
    let nameElement = document.getElementById('username');
    let passwordE = document.getElementById('password');
    let name = nameElement.value;
    let password = passwordE.value;

    console.log("name:"+name);
    console.log("password:"+password);

    let result;
    //和后台交互 获得result，userId信息
    let xml=$.ajax({
        type: "POST",
        url:'../php/login.php',
        dataType:'json',
        async:false,
        data:{'name':name,'password':password},

        success:function (ans) {
            result = ans.isSuccessful;
            let userId = ans.userID;
            if(result){
                setUser(name,userId);
                console.log("成功登录");
                window.location.href = 'home.html';
                return true;
            }else {
                console.log("登录失败");
                alert("用户名和密码错误，请重试");
                return false;
            }
        }
    } );

    // console.log("不应该到达的地方");
    return result;

}