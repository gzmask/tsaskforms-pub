var pathname = window.location.pathname;
var tab = document.getElementById(window.location.hash.substring(1)) ||
          document.getElementById(pathname.substring(pathname.lastIndexOf('/') + 1));
if (tab) tab.className += '_on';
