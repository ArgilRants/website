function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('Mobi') !== -1);
}

window.onload = function() {
    if (isMobileDevice()) {
        alert("This page was designed for desktop. It will NOT work on your phone, please return");
    }
}