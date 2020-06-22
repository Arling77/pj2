var uploadState ={};

window.onload = function () {
    //进入页面时是什么状态
    uploadState.imgId = getEditImg();
    if(uploadState.imgId===-1){//新增状态
        uploadState.state = "add";
    }else {//修改状态
        uploadState.state = "edit";
    }
    console.log("uploadState.state="+uploadState.state);

    drawUserCenter();

    initialize();
    //若是修改状态，则恢复图片信息
    if(uploadState.state=="edit"){
        recoverDraw();
    }
    let select= document.getElementById("selCountry");

    select.onclick=function () {
        console.log("选择国家响应函数:（"+select.value+")");//
        let index=-1;
        index=uploadState.ccMap.get(select.value);//快速查找
        console.log("index="+index);//
        let citiesHtmlS;
        let cities = document.getElementById("selCity");
        console.log("getElementID。");//
        if(index>=0){
            citiesHtmlS = "<option selected value='notSelected'>Select by City</option>";
            console.log("开始for循环(城市数组长度"+uploadState.ccs[index].cities.length+")...");//
            for(let i=0;i<uploadState.ccs[index].cities.length;i++){
                // console.log("citiesCode="+jsonData[index].citiesCode[i]+"("+jsonData[index].cities[i]);
                citiesHtmlS +="<option value='"+uploadState.ccs[index].citiesCode[i]+"'>"+uploadState.ccs[index].cities[i]+"</option>";
            }
            console.log("结束for循环");//
        }else {
            citiesHtmlS = "<option selected value='notSelected'>Select by City</option>";
        }
        cities.innerHTML = citiesHtmlS;
        console.log("响应结束。");///
    }
};

//选择图片文件路径后
function renderImg() {
    var fileDom = document.getElementById("file");
    var previewDom = document.getElementById("preview");
    fileDom.addEventListener("change", e=>{
        var file = fileDom.files[0];
        // check if input contains a valid image file
        if (!file || file.type.indexOf("image/") < 0) {
            fileDom.value = "";
            previewDom.src = "";
            return;
        }

        // use FileReader to load image and show preview of the image
        var fileReader = new FileReader();
        fileReader.onload = e=>{
            previewDom.src = e.target.result;
        };
        fileReader.readAsDataURL(file);
    });

}

//恢复图片信息 未测试
function recoverDraw() {
    //imgID
    let xml=$.ajax({
        type: "GET",
        url:'../php/getImgMes.php',
        dataType:'json',
        async:true,
        data:{'imgID':uploadState.imgId},

        success:function (ans) {
            // let result = ans;
            uploadState.img=ans;
            showImgMes();
        }
    } );
}

//加载图片已有信息
function showImgMes() {
    let titleE = document.getElementById("titleName");
    let desE = document.getElementById("imgDes");
    let imgE=document.getElementById("showingImageDiv");
    titleE.value = uploadState.img.title;
    desE.value = uploadState.img.des;
    let path = "../travel-images/square-medium/" + uploadState.img.path;
    imgE.innerHTML=" <img id=\"showingImage\" php=\""+path+"\" alt=\"图片未加载成功\">";
    let nofileE = document.getElementById("noFilePath");
    nofileE.value = uploadState.img.path;

    //多选项载入
    selectTheme(uploadState.img.theme);
    let index=selectCountry(uploadState.img.countryISO);
    selectCity(uploadState.img.cityCode,index);

    //按钮名称变
    let btn = document.getElementById("submitBtm");
    btn.innerHTML = "<input type=\"submit\" value=\"修改\" >";
}

function selectTheme(selectedTheme) {
    let themeE = document.getElementById("selTheme");
    let themes = ["Scenery","City","People","Animal","Building","Wonder","Other"];
    let html = "<option value=\"notSelected\">Select by Theme</option> ";
    for(let i=0;i<themes.length;i++){
        let theme = themes[i];
        let themeValue = theme.toLowerCase();
        if(themeValue==selectedTheme){
            html+="<option selected value=\"" +themeValue+ "\">" +theme+ "</option>";
        }else {
            html+="<option value=\"" +themeValue+ "\">" +theme+ "</option>";
        }
    }
    themeE.innerHTML = html;
}

function selectCountry(selectCountryISO) {
    let countries = document.getElementById("selCountry");
    let countriesHtmlS="<option value='notSelected'>Select by Country</option>";
    let index =0;
    for(let i=0;i<uploadState.ccs.length;i++){
        if(selectCountryISO==uploadState.ccs[i].iso){
            countriesHtmlS+="<option selected value='"+uploadState.ccs[i].iso+"'>"+uploadState.ccs[i].country+"</option>";
            index=i;
        }else {
            countriesHtmlS+="<option value='"+uploadState.ccs[i].iso+"'>"+uploadState.ccs[i].country+"</option>";
        }
    }
    countries.innerHTML = countriesHtmlS;
    return index;
}

function selectCity(selectCityCode,index) {
    let cities = document.getElementById("selCity");
    let citiesHtmlS = "<option value='notSelected'>Select by City</option>";
    for(let i=0;i<uploadState.ccs[index].cities.length;i++){
        if(selectCityCode==uploadState.ccs[index].citiesCode[i]){
            citiesHtmlS +="<option selected value='"+uploadState.ccs[index].citiesCode[i]+"'>"+uploadState.ccs[index].cities[i]+"</option>";
        }else {
            citiesHtmlS +="<option value='"+uploadState.ccs[index].citiesCode[i]+"'>"+uploadState.ccs[index].cities[i]+"</option>";
        }
    }
    cities.innerHTML = citiesHtmlS;
}

//上传判断
function check_submit() {
    let isFilled=true;
    let errorS ="信息不完整，无法提交！请填写以下信息：\n"
    let titleName = document.getElementById("titleName").value;
    let des = document.getElementById("imgDes").value;
    let themeE = document.getElementById("selTheme");
    let countryE = document.getElementById("selCountry");
    let cityE = document.getElementById("selCity");

    //图片是否上传
    if(uploadState.state=="edit"){
        //跳过检查
    }else {
        let file =  document.getElementById('chooseImage').files[0];
        if(file==null||typeof(file) === undefined){
            isFilled=false;
            errorS+="--选择上传图片文件\n";
            console.log("图片未上传");
        }
    }

    //是否有标题
    if(titleName==null ||titleName==""){
        isFilled =false;
        errorS+="--图片标题\n";
    }
    //是否有描述
    if(des==null||des==""){
        isFilled =false;
        errorS+="--图片描述\n";
    }
    //是否选择主题
    if(themeE.value=="notSelected"){
        isFilled =false;
        errorS +="--选择主题\n";
    }
    //是否选择国家
    if(countryE.value =="notSelected"){
        isFilled =false;
        errorS +="--选择国家\n";
    }
    //是否选择城市
    if(cityE.value =="notSelected"){
        isFilled =false;
        errorS +="--选择城市\n";
    }

    if(isFilled===false){
        alert(errorS);
    }
    return isFilled;//提交后台跳转
}

function initialize() {
    let userE = document.getElementById("userID");
    let imgE = document.getElementById("imgID");
    imgE.value =uploadState.imgId;
    console.log("imgE.value="+imgE.value);
    userE.value = getUserID();

    let xml1=$.ajax({
        type: "POST",
        url:'../php/getCountryAndCity.php',
        dataType:'json',
        async:false,
        data:{'getType':"getCountriesCities"},

        success:function (ans) {
            uploadState.ccs = ans;
            showInitCCs();
        }
    } );
}

function showInitCCs(){

    let ccMap = new Map();//设置map，看能不能加速
    let countries = document.getElementById("selCountry");
    let countriesHtmlS="<option selected value='notSelected'>Select by Country</option>";
    for(let i=0;i<uploadState.ccs.length;i++){
        ccMap.set(uploadState.ccs[i].iso,i);
        countriesHtmlS+="<option value='"+uploadState.ccs[i].iso+"'>"+uploadState.ccs[i].country+"</option>";
    }
    uploadState.ccMap = ccMap;
    countries.innerHTML = countriesHtmlS;
}