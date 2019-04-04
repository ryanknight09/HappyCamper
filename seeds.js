var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Bacon ipsum dolor amet corned beef picanha pork chop tenderloin. Prosciutto andouille jowl cupim, meatball pig meatloaf burgdoggen t-bone kielbasa pancetta landjaeger beef. Venison kevin doner short ribs fatback cow pig picanha pork chop chicken. Tongue andouille beef ribs swine t-bone short loin ham hock doner boudin pork strip steak flank shoulder jerky.blah blah blah"
    },
    {
        name: "Desert Mesa", 
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description: "Bacon ipsum dolor amet corned beef picanha pork chop tenderloin. Prosciutto andouille jowl cupim, meatball pig meatloaf burgdoggen t-bone kielbasa pancetta landjaeger beef. Venison kevin doner short ribs fatback cow pig picanha pork chop chicken. Tongue andouille beef ribs swine t-bone short loin ham hock doner boudin pork strip steak flank shoulder jerky."
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Bacon ipsum dolor amet corned beef picanha pork chop tenderloin. Prosciutto andouille jowl cupim, meatball pig meatloaf burgdoggen t-bone kielbasa pancetta landjaeger beef. Venison kevin doner short ribs fatback cow pig picanha pork chop chicken. Tongue andouille beef ribs swine t-bone short loin ham hock doner boudin pork strip steak flank shoulder jerky."
    }
]

function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
         //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a campground");
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    }); 
    //add a few comments
}

module.exports = seedDB;