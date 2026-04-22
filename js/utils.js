function redirectToHTTPS() {
    var currentUrl = window.location.href;
    var isHttp = currentUrl.indexOf("http://") === 0;

    if (isHttp && !isLocalHost(currentUrl)) {
        window.location.href = currentUrl.replace("http://", "https://");
    }
}

function isLocalHost(url) {
    return /\d/.test(url) || url.indexOf("local") !== -1;
}

function appendCurrentYear() {
    var footer = document.getElementById("p-footer-desc");

    if (!footer) {
        return;
    }

    footer.append(new Date().getFullYear());
}
