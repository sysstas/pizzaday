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
      creator: Meteor.userId(),
      eventdate: "",
      eventstatus: "",
      isevent: false
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
  }     
});


Template.dishadd_form.events({
  "click .js-toggle-form":function(event){
    $("#dishadd_form").toggle('slow');
  }, 

  "submit .js-form":function(event){
    event.preventDefault();
    var dishname = event.target.dishname.value;
    var price = event.target.price.value;
         
    Menu.insert({
      dish:dishname, 
      price:price        
    });     
    $("#dishadd_form").toggle('hide');  
    return false;
  }
});


Template.addEvent.events({
  "submit .js-addevent-form":function(event){
    event.preventDefault();
    var eventdate = event.target.eventdate.value;    
    Groups.update({ _id: Session.get("idgroupe") },{ 
      $set: { eventdate: eventdate,
               isevent: true 
             }
    });
    event.target.eventdate.value = "";
  }
});  

Template.menu.events({
 
});  


Template.userlist.events({
  "click .addtogroupe": function (event) {                
    Groups.update({ _id: Session.get("idgroupe") },{ $push: { user: this.id }});      
  }
}); 