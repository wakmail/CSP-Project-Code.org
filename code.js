var user;
var usernames = [];
var passwords = [];
var websites = [];

//Screens
//Login Screen
onEvent("loginButton", "click", function(){
  user = getText("usernameInput");
  if(user==""){setProperty("usernameInput","placeholder","Please Enter Username")}
  else{
  playAnim("Remove-Background-GIF.gif", 2120);
  //TODO: Figure out how to do this WITHOUT a setTimeout here. Make only the function use the timeout.
  setTimeout(function(){setScreen("homeScreen");}, 2120);
  setText("welcomeLabel", "Welcome, " + user + "!");
  }
});

//Home Screen
onEvent("vaultButton", "click", function(){
  setScreen("vaultScreen");
});

onEvent("checkerButton", "click", function(){
  setScreen("checkerScreen");
});

onEvent("generateButton", "click", function(){
  setScreen("generateScreen");
});
onEvent("generateScreen2", "click", function(){
  setScreen("generateScreen");
});

//Home Buttons
onEvent("vaultHome", "click", function(){
  setScreen("homeScreen");
});

onEvent("generateHome2", "click", function(){
  setScreen("homeScreen");
});

onEvent("generateHome", "click", function(){
  setScreen("homeScreen");
});


//Functions
function playAnim(url, ms){
  setImageURL("image1", url);
  //For some reason, it sometimes doesn't play the gif from the beginning, so this is a workaround to kinda reset it
  //It doesn't work without the timeout below, but I just figured out that it doesn't actually
  //wait for 100ms, so idk why this fixes it but it does.
  setTimeout(void(0), 100); //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void
  setImageURL("image1", url);
  showElement("image1");
  setTimeout(function(){hideElement("image1");}, ms); //after a set # of ms, stop the animation
}




//Vault Screen
onEvent("addPassword", "click", function(){
  appendItem(usernames,getText("newUsernameInput"));
  appendItem(passwords,getText("newPasswordInput"));
  appendItem(websites,getText("newWebsiteInput"));
  updateVault();
});
onEvent("removePassword", "click", function(){
  var removingIndex = getText("removingIndex")-1;
  if(removingIndex>=0){
  removeItem(usernames,removingIndex);
  removeItem(passwords,removingIndex);
  removeItem(websites,removingIndex);
  updateVault();
  }
});
onEvent("editPassword", "click", function(){
  var removingIndex = getText("removingIndex")-1;
  usernames[removingIndex] = getText("newUsernameInput");
  passwords[removingIndex] = getText("newPasswordInput");
  websites[removingIndex] = getText("newWebsiteInput");
  updateVault();
});
function updateVault(){
  var temp = "";
  var i;
  for (i = 1; i<=passwords.length;i++){temp = temp + i+"\n"+"Website/App: "+websites[i-1]+"\n"+"Username: "+usernames[i-1]+"\n"+"Password: "+passwords[i-1]+"\n" }
  setText("VaultList", temp);
  setProperty("newPasswordInput","text","");
  setProperty("newWebsiteInput","text","");
  setProperty("newUsernameInput","text","");
}
//Checker Screen
onEvent("checkStrength","click", function(){
  setText("checkerOutput", "");
  var password = getText("checkerInput");
  var compromisedPasswords = getColumn("Passwords", "password");
  var strength = checkPasswordStrength(password, compromisedPasswords);
  setText("checkerOutput", strength);
});

function checkPasswordStrength(password, compromisedList) {
  // Check if password is empty
  password = password.toLowerCase();
  if (password === "") {
    return "Please enter a password to check";
  }
  
  // Check if password is in compromised list
  if (compromisedList.indexOf(password) !== -1) {
    return "WARNING: This password has been compromised! Please choose a different password.";
  }
  
  // Initialize score
  var score = 0;
  
  // Check length
  if (password.length < 8) {
    return "Very Weak - Password should be at least 8 characters";
  }
  
  // Check for different character types
  if (/[A-Z]/.test(password)) {
    score += 1; // Has uppercase
  }
  if (/[a-z]/.test(password)) {
    score += 1; // Has lowercase
  }
  if (/[0-9]/.test(password)) {
    score += 1; // Has numbers
  }
  if (/[^A-Za-z0-9]/.test(password)) {
    score += 1; // Has special characters
  }
  
  // Return strength based on score
  switch(score) {
    case 0:
    case 1:
      return "Weak - Try adding uppercase letters, numbers, and special characters";
    case 2:
      return "Medium - Could be stronger with more character variety (Ex: abc, 123, !@#))";
    case 3:
      return "Strong - Good password!";
    case 4:
      return "Very Strong - Excellent password!";
  }
}
//Generate Screen






