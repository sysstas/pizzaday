
/////////////////////////////////////////////////////////////////////////////////
//////////////////////        Adjustment accounts-ui      ///////////////////////
/////////////////////////////////////////////////////////////////////////////////
Accounts.ui.config({
  passwordSignupFields: "USERNAME_AND_EMAIL"
});

/////////////////////////////////////////////////////////////////////////////////
//////////////////////               Routing              ///////////////////////
/////////////////////////////////////////////////////////////////////////////////

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

/////////////////////////////////////////////////////////////////////////////////
//////////////////////               Helpers              ///////////////////////
/////////////////////////////////////////////////////////////////////////////////
Template.userlist.helpers({
  user:function(){       
    return  Userlist.find();
  }
});


Template.Pizzaday.helpers({
  menu:function(){       
    return  Groups.findOne({ _id: Session.get("idgroupe") }).menu; 
  },
  orders:function(){
    return Userlist.findOne({id: Meteor.userId()}).order; 
  }, 
  total:function(){
    var arr = Userlist.findOne({id: Meteor.userId()}).price
    var count = 0;
    for(var i = 0; i < arr.length; i++){
        count = count + parseFloat(arr[i]);
    };
    return count;
  },
  confirm: function(){    
    return Userlist.findOne({id: Meteor.userId()}).confirm;    
  },  
  complete: function(){    
    return Userlist.findOne({id: Meteor.userId()}).complete;    
  },
  statusbuying: function(){
    return  Groups.findOne({ _id: Session.get("idgroupe") }).statusbuying;
  }

});    


Template.groupeList.helpers({
  groupeNames:function(){      
    return Groups.find({});
  },
  myGroupe:function(){
    var isInGroupe = false;
   if ( Meteor.userId() == this.creator ) {
      return true;
    }
    else{
      for (var i = this.user.length - 1; i >= 0; i--) 
              {
                 if (this.user[i] == Meteor.userId()) {
                  return true;
                 }
                 else 
                  return false;   
              };
    }
  },
  isAdmin:function(){    
    if ( Meteor.userId() == this.creator ) {
      return true;
    }
    else return false;
  } 
});


Template.groupe.helpers({
  isAdmin:function(){    
    if ( Meteor.userId() == this.creator ) {
      return true;
    }
    else return false;
  },
  statusBuying:function(){
    if (this.eventstatus == "Buying food...") {
      return true;
    }
    else return false;
  },
  Admin:function(){  
    var admin = Userlist.findOne({id: this.creator}).username;
    return admin;
  }, 
  usersInGroupe:function(){  
    var Users = new Array();
    if (this.user) {
      for (var i = this.user.length - 1; i >= 0; i--) {
      Users[i] = Userlist.findOne({id: this.user[i]}).username;
      };
    };    
    return Users;
  },
  userConfirmed:function(){  
    var Users = new Array();
    if (this.user) {
      for (var i = this.user.length - 1; i >= 0; i--) {
        if (Userlist.findOne({id: this.user[i]}).confirm == true) {
          Users[i] = Userlist.findOne({id: this.user[i]}).username;
        };      
      };
    };    
    return Users;
  },
  userOrdered:function(){  
    var Users = new Array();
    if (this.user) {
      for (var i = this.user.length - 1; i >= 0; i--) {
        if (Userlist.findOne({id: this.user[i]}).complete == true) {
          Users[i] = Userlist.findOne({id: this.user[i]}).username;
        };      
      };
    };    
    return Users;
  },
  totalMoney:function(){
    var totalArray = Groups.findOne({_id:Session.get("idgroupe")}).totalOrder,
        totalmoney = 0;
    for (var i = totalArray.length - 1; i >= 0; i--) {
             totalmoney +=  parseFloat(totalArray[i].totalprice);
    };
    return  totalmoney;
  },
  totalDishes:function(){ //// Generating Order list /////
    
     return Groups.findOne({_id:Session.get("idgroupe")}).totalDISHES;
  }
});  
/////////////////////////////////////////////////////////////////////////////////
//////////////////////               Events               ///////////////////////
/////////////////////////////////////////////////////////////////////////////////
Template.buttons.events({
  "submit .createGroupe": function(event) {
    event.preventDefault();
    var text = event.target.text.value;
    
      Groups.insert({
      groupName: text,
      creator: Meteor.userId(),
      eventdate: "",
      isevent: false,
      eventstatus: "wating for event...",
      user: new Array(),
      menu: new Array(),
      totalOrder: new Array(),
      totalDISHES: new Array(),
      statusbuying: false
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
         
     Groups.update({ _id: Session.get("idgroupe") },{
      $push:{
              menu:{
                dish:dishname, 
                price:price  
                }
      }
      
            
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
              isevent: true,
              eventstatus: "Event announced"
            }
    });
    event.target.eventdate.value = "";
  }
});  




Template.userlist.events({
  "click .addtogroupe": function (event) {
    isUser = false;
    for (var i = Groups.findOne({ _id: Session.get("idgroupe")}).user.length - 1; i >= 0; i--) {
      if (Groups.findOne({ _id: Session.get("idgroupe")}).user[i] == this.id){
        isUser = true;
      }
    };
    if (!isUser) {
      Groups.update({ _id: Session.get("idgroupe")},{ 
        $push: { user: this.id }});
      Userlist.update({_id: this._id},{   
        $push: {groups: Session.get("idgroupe")}  
      });  
    };    
    
  }
}); 


Template.groupe.events({
  "click .statusBuying": function (event) {                
    Groups.update({ _id: Session.get("idgroupe") },{ 
      $set: { 
              eventstatus: "Buying food...",
              statusbuying: true
            }
    });
    var totalArray = Groups.findOne({_id:Session.get("idgroupe")}).totalOrder;
    var array_elements = new Array();
    for (var i = totalArray.length - 1; i >= 0; i--) {
      array_elements[i] = totalArray[i].totalorder
    };
    
    array_elements.sort();
    var current = null;
    var cnt = 0;
    for (var i = array_elements.length -1 ;  i >= 0; i--) {
      if (array_elements[i] != current) {
        if (cnt > 0) {
          Groups.update({ _id: Session.get("idgroupe") },{ 
            $push: { totalDISHES: current + ' comes --> ' + cnt + ' times<br>'}
          });
        }
        current = array_elements[i];
        cnt = 1;
      } else {
        cnt++;
      }
    }
    if (cnt > 0) {
      Groups.update({ _id: Session.get("idgroupe") },{ 
        $push: { totalDISHES: current + ' comes --> ' + cnt + ' times<br>'}
        
      });
    }
  },
  "click .endEvent": function (event) {//// End of event ////              
    Groups.update({ _id: Session.get("idgroupe") },{ 
      $set: { 
              eventstatus: "wating for event...",
              isevent: false,
              totalOrder: [],
              totalDISHES: [],
              statusbuying: false
            }
    });
    var Users = Groups.findOne({ _id: Session.get("idgroupe") }).user;               
    for (var i = Users.length - 1; i >= 0; i--) {
      var id =Userlist.findOne({id: Users[i]})._id;
      
      Userlist.update({_id: id},{   //// Set Event stats to empty ////   
        $set: { 
              confirm: false, 
              complete: false,
              order: [],
              price: []
            }
      });
    };
    
  }
}); 

Template.Pizzaday.events({
  "click .order": function (event) { 
    var thisUser = Userlist.findOne({id: Meteor.userId()});               
    Userlist.update({_id: thisUser._id},{ 
      $push:{
              order: this.dish,
              price: this.price
            }
    });
    Groups.update({ _id: Session.get("idgroupe") },{ 
      $push:{
              totalOrder: {
                            totalorder: this.dish,
                            totalprice: this.price
                          }
            }
    });
  },
  "click .confirm": function (event){
    var thisUser = Userlist.findOne({id: Meteor.userId()});               
    Userlist.update({_id: thisUser._id},{ 
      $set: { confirm: true }
    });
  },
  "click .complete": function (event){
    var thisUser = Userlist.findOne({id: Meteor.userId()});
    var AdminId = Groups.findOne({_id:Session.get("idgroupe")}).creator;
    var AdminEmail = Userlist.findOne({id: AdminId }).email;
    var UserEmail = Userlist.findOne({id: Meteor.userId()}).email;

    Userlist.update({_id: thisUser._id},{ 
      $set: { complete: true }
    });

    Meteor.call('sendEmail',
            AdminEmail,
            UserEmail,
            'Hello from Meteor!',
            'This is a test of Email.send.');
  }
}); 


