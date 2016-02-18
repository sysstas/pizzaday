
  // first, remove configuration entry in case service is already configured
ServiceConfiguration.configurations.remove({
  service: "google"
});
ServiceConfiguration.configurations.insert({
  service: "google",
  clientId: "416436598179-50lvops42dpr7ojef8og2i0du3ghkq7t.apps.googleusercontent.com",
  loginStyle: "popup",
  secret: "IF3NUy0rlZTc_R2yjp7aN4Nn"
}); 

Accounts.onCreateUser(function(options, user) {
  // Here I fix difference between acconts-google and accounts-ui ways of saving username.
  if (options.username) {      
    Userlist.insert({
    id: user._id,    
    username: options.username,
    groups: []
    });
  };
  if (!options.username) {
    Userlist.insert({
    id: user._id,    
    username: user.services.google.name,
    groups: []
    });
  };
  
  if (options.profile)
    user.profile = options.profile;
  return user;
}); 
  
    



