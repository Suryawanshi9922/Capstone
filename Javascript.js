function openAboutWindow() {
    var aboutContent = document.getElementById('about-content').innerHTML;
    var aboutWindow = window.open('', '_blank');
    aboutWindow.document.write('<html><head><title>About Us</title></head><body>' + aboutContent + '</body></html>');
    aboutWindow.document.close();
}