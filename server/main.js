
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
    groups: [],
    order: [],
    price: [],
    confirm: false,
    complete: false,
    email: options.emails[0].address
    });
  };
  if (!options.username) {
    Userlist.insert({
    id: user._id,    
    username: user.services.google.name,
    groups: [],
    order: [],
    price: [],
    confirm: false,
    complete: false,
    email: user.services.google.email
    });
  };
  
  if (options.profile)
    user.profile = options.profile;
  return user;
}); 
  
Meteor.methods({
  sendEmail: function (to, from, subject, text) {
    check([to, from, subject, text], [String]);

    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();

    Email.send({
      to: to,
      from: from,
      subject: subject,
      text: text
    });
  }
});
    



