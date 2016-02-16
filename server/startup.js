Meteor.startup(function(){
	if (Menu.find().count() == 0){
		
			Menu.insert(
				{
					dish:"Margarita",
					price:"3" 
				}
			);

			Menu.insert(
				{
					dish:"Italiano",
					price:"4" 
				}
			);

			Menu.insert(
				{
					dish:"Sushi",
					price:"2" 
				}
			);

			Menu.insert(
				{
					dish:"Pizza stuff",
					price:"3" 
				}
			);

		}
		console.log("startup.js says: "+Menu.find().count());
	
});
