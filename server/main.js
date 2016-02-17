
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
    username: options.username
    });
  };
  if (!options.username) {
    Userlist.insert({
    id: user._id,    
    username: user.services.google.name
    });
  };
  
  if (options.profile)
    user.profile = options.profile;
  return user;
}); 
  /*var counter = Meteor.users.find().count();

  if (counter >= Userlist.counter.findOne()){
    if (Meteor.user().profile.name) {
      Userlist.insert({
      userId: Meteor.userId(),
      name: Meteor.user().profile.name 
      });    
    }
    else if (Meteor.user().username){
      Userlist.insert({
      userId: Meteor.userId(),
      name: Meteor.user().username 
      }); 
    }
  } */
    



