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


//Home Buttons
onEvent("vaultHome", "click", function(){
  setScreen("homeScreen");
});

onEvent("checkerHome", "click", function(){
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
//Generate Screen






