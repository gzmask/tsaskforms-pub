(function(){
    var username = document.getElementById('signin_username'),
//passwordText = document.getElementById('passwordText'),
        password = document.getElementById('signin_password'),
        login = document.getElementById('login');
if (username && password && login) {
    username.onfocus = function(){
        if (username.value == 'Username') {
            username.value = '';
            username.style.color = '#000';
        }
    };
    username.onblur = function(){
        if (username.value == ''){
            username.value = 'Username';
            username.style.color = '#999';
        }
    };
    password.onfocus = function(){
        if (password.value == '******') {
            password.value = '';
            password.style.color = '#000';
        }			
    };
    password.onblur = function(){
        if (password.value == ''){
            password.value = '******';
            password.style.color = '#999';
        }
    };
    login.onclick = function() {
        $.getJSON('http://localhost:3000/check?username=' + username.value + '&password=' + password.value + '&jsoncallback=?',
                  function(json) {
                      console.log(json);
                  });
        return false;
    };
    //login.onclick = function() {
    //    $.ajax({type: 'POST',
    //            url: 'http://localhost:3000/check',
    //            crossDomain: true,
    //            data: {username: username.value, password: password.value},
    //            dataType: 'jsonp',
    //            success: function(json) {
    //                alert(json);
    //            },
    //            error: function() {
    //                alert("error");
    //            }});
    //};
    //login.onclick = function() {
    //    var xhr = new XMLHttpRequest() || new ActiveXObject('Microsof.XMLHttp');
    //    xhr.open('POST', 'http://localhost:3000/check', true);
    //    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    //    // receive and save cookiese
    //    var login = false;
    //    xhr.onreadystatechange = function() {
    //        if (xhr.readyState != 4)
    //            return;
    //        alert(xhr.status);
    //        alert(xhr.responseText);
    //        console.log(xhr.responseText);
    //    };
    //    xhr.send('username=' + username.value + '&' + 'password=' + password.value);
    //    return false;
    //};
}
})();
