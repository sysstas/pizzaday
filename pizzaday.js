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

Router.route('/menu', function () {
  this.render('navbar', {
    to:"navbar"
  });
  this.render('menu', {
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

  Template.menu.helpers({
    menu:function(){       
      return  Menu.find();
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

Template.continous_form.events({
  "click .js-toggle-continous-form":function(event){
    $("#continous_form").toggle('slow');
  }, 
  "submit .js-save-continous-form":function(event){

    var titlec = event.target.titlec.value;
    var equationc = event.target.equationc.value;
    var rpc = event.target.rpc.value;
    var optionsc = event.target.optionsc.value;
    var graphc = event.target.graphc.value;
    var rqac = event.target.rqac.value;
    var descriptionc = event.target.descriptionc.value;   
    
      ContinousModel.insert({
        titlec:titlec, 
          equationc:equationc, 
          rpc:rpc, 
          optionsc:optionsc,
              graphc:graphc,
              rqac:rqac,
              descriptionc:descriptionc
          });     
      $("#continous_form").toggle('hide');  
    return false;
  }
});
  Template.menu.events({
   // 'click .js-show-image-form':function(event){
 //     $("#dish_add_form").modal('show');
  //  }, 
    'click .js-show-image-form':function(event){
      $("#image_add_form").modal('show');
    },
    
    "click .order": function () {
      
    },

    "click .adddish": function (event){      
          
    }     
  });  



  Template.userlist.events({
    "click .addtogroupe": function (event) {                
      Groups.update({ _id: Session.get("idgroupe") },{ $push: { user: this.id }});      
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
