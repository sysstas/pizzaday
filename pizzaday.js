if (Meteor.isClient) {
  /////////////////////////// Adjustment accounts-ui //////////////////////////////
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_AND_EMAIL"
  });


/////////////////////////////////////// routing ////////////////////////////

Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
  this.render('welcome', {
    to:"main"
  });
});

Router.route('/landing', function () {
  this.render('navbar', {
    to:"navbar"
  });
  this.render('landing', {
    to:"main"
  });
});

Router.route('/groups/:_id', function () {
  this.render('navbar', {
    to:"navbar"
  });
  this.render('groupe', {
    to:"main", 
    data:function(){
      return Groups.findOne({_id:this.params._id});
    }
  });
});


  //////////////////////////////////////////////  Helpers //////////////////////////
  Template.userlist.helpers({
    user:function(){       
      return  Userlist.find();
    }
  }); 


  Template.groupeList.helpers({
    groupeNames:function(){      
      return Groups.find({});
    }
  });


  Template.groupe.helpers({
    function(){      
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
  });

  Template.groupeList.events({
    "click .delete": function () {
      Groups.remove(this._id);
      },

     "click .idadd": function (event){
      
      Session.set("idgroupe", this._id);
        console.log(Session.get("idgroupe"));
      
     }     
  }); 



  Template.userlist.events({
    "click .addtogroupe": function (event) {
      var temp = Groups.findOne({_id: Session.get("idgroupe")});
          
          console.log(this._id);
         // temp.insert({
        //    user: 
        //  })       
            
    }
  }); 

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
    


}
