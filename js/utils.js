function redirectToHTTPS(){
    var urlHTTP = "http://";
    var urlCurrent = location.href;
    if (urlCurrent.includes(urlHTTP) && !(isLocalHost(urlCurrent))) {
        location.href = urlCurrent.replace("http", "https");
    }
}

function isLocalHost(str){
    return ((/\d/.test(str)) || (str.includes("local")))
}