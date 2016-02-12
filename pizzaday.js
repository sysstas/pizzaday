if (Meteor.isClient) {
  /////////////////////////// Adjustment accounts-ui //////////////////////////////
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_AND_EMAIL"
  });

  //////////////////////////////////////////////  Helpers //////////////////////////
  Template.userlist.helpers({
    user:function(){       
      return  Meteor.users.find();
    },
    usernameGoogle: function(){
            
      return this.services.google.name;
      console.log(this);
    }    
  }); 

  Template.groupeList.helpers({
    groupeNames:function(){      
      return Groups.find({});
    }
  }); 


  //////////////////////////////// Events /////////////////////////////////////
  Template.buttons.events({
    "submit .createGroupe": function(event) {
      event.preventDefault();
      var text = event.target.text.value;
      Groups.insert({
        groupName: text,
        creator: Meteor.userId()
      });
      // Clear form
      event.target.text.value = "";  
    }

  })




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
