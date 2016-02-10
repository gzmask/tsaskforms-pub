function validateForm() {  
  if($('input[name=username]').val() == "") {
    alert("Username cannot be empty.");
    return false;
  }
  if($('input[name=password]').val() == $('input[name=password_again').val()) {
    return true;
  }
  else {
    alert("Passwords are not the same.");
    return false;
  }
}
