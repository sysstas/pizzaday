if (Meteor.isClient) {
  /////////////////////////// Adjustment accounts-ui //////////////////////////////
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_AND_EMAIL"
  });

  //////////////////////////////////////////////  Helpers //////////////////////////
  Template.userlist.helpers({
    user:function(){ 
      var correct = Meteor.users.find();
      console.log("user sais: "+correct);
      if(correct != ""){
        return correct;
      }
      return  ;
    },
    usernameGoogle: function(){
      var correct = this.services.google.name;
      console.log("Google sais: "+correct);      
      if(correct != ""){
        return correct;
      }      
      return;
    }    
  }); 

  //////////////////////////////// Events /////////////////////////////////////
   




}

if (Meteor.isServer) {
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

}
