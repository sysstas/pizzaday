if (Meteor.isClient) {
  /////////////////////////// Adjustment accounts-ui //////////////////////////////
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_AND_EMAIL"
  });

  //////////////////////////////////////////////  Helpers //////////////////////////
  Template.userlist.helpers({
    user:function(){      
      return Meteor.users.find(); 
    }    
  }); 

  //////////////////////////////// Events /////////////////////////////////////
   




}

if (Meteor.isServer) {
  

}
