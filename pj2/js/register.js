function register() {
    if(!checkName()){
        alert("非法用户名或该用户已注册！");
        return false;
    }

    if(!checkMail()){
        alert("邮箱格式错误！\n（注：仅限163、126、qq邮箱可注册）");
        return false;
    }

    if(!checkPassword()){
        alert("密码不一致！");
        return false;
    }

    return true;
}


function checkName() {
    let nameRe = /^[A-Za-z_]+[\w]*/;
    let name = document.getElementById("username").value;
    return nameRe.test(name) && (!userIsRedundant(name));
}

function checkPassword() {
    let pass1 = document.getElementById("password").value;
    let pass2 = document.getElementById("rpassword").value;
    return pass1===pass2;
}

function checkMail() {
    let mailRe = /^[\w-]+@(163.com|qq.com|126.com)$/;
    let mail = document.getElementById("email").value;
    return mailRe.test(mail);
}


function userIsRedundant(name) {
    let result;
    let xml=$.ajax({
        type: "POST",
        url:'../php/isUserExist.php',
        dataType:'json',
        async:false,
        data:{'name':name},

        success:function (ans) {
            result = ans;
            return result;
        }
    } );

    return result;
}
