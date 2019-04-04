var express     = require("express");
var router      = express.Router();
var Campground  = require("../models/campground");
var Comment     = require("../models/comment");
var middleware  = require("../middleware");

// COMMENTS NEW
router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn, function(req, res){
    //find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

//COMMENTS CREATE
router.post("/campgrounds/:id/comments", middleware.isLoggedIn, function(req, res){
   //look up campground using id
   Campground.findById(req.params.id, function(err, campground){
      if (err){
          console.long(err);
      } else {
          Comment.create(req.body.comment, function(err, comment){
             if(err){
                 req.flash("error", "Hmm, something went wrong...");
                 console.log(err);
             } else {
                 
                 //add username and id to comment
                 comment.author.id = req.user._id;
                 comment.author.username = req.user.username;
                 
                 //save the comment
                 comment.save();
                 campground.comments.push(comment);
                 campground.save();
                 req.flash("success", "Comment created!");
                 res.redirect("/campgrounds/" + campground._id);
             } 
          });
      }
   });
});

// Comments edit route
router.get("/campgrounds/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
       if(err){
           res.render("back");
       } else {
          res.render("comments/edit", {campground_id: req.params.id, comment: foundComment}); 
       }
    });
});

// Comments update route
router.put("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
      if(err){
          res.redirect("back");
      } else {
          res.redirect("/campgrounds/" + req.params.id );
      }
   });
});

// Detroy routes

router.delete("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       } else {
           req.flash("success", "Comment deleted");
           res.redirect("/campgrounds/" + req.params.id);
       }
    });
});


module.exports = router;