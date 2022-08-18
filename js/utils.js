function redirectToHTTPS(){
    var urlHTTP = "http://";
    var urlCurrent = location.href;
    if (urlCurrent.includes(urlHTTP)) {
        location.href = urlCurrent.replace("http", "https");
    }
}