const express = require("express");

const Course = require("./Course");
const { request } = require("express");

var router = express.Router();

// Home page route.
router.get("/", async function (req, res, next) {
  let data = await Course.find({}).sort({ createdAt: "desc" });
  res.render("index", {
    contexts: data,
    updated: false,
    message: "",
  });
});

async function validatedata(req, res, next) {
  if (
    req.body.Course_name != "" &&
    req.body.Course_ID != "" &&
    req.body.Course_Fee != "" &&
    req.body.Course_Duration != ""
  ) {
    next();
  } else {
    let data = await Course.find({}).sort({ createdAt: "desc" });
    
    data = data;
    let message = "Please fill all the field ";
    if (req.url == "/add") {
      res.render("index", { message: message, contexts: data, updated: false });
    } else {
      res.render("index", {
        message: message,
        contexts: req.body,
        updated: true,
      });
    }
  }
}

router.post("/add", validatedata, async function (req, res, next) {
 
  let course = new Course({
    Course_Name: req.body.Course_Name,
    Course_ID: req.body.Course_ID,
    Course_Fee: req.body.Course_Fee,
    Course_Duration: req.body.Course_Duration,
  });
  course
    .save()
    .then((doc) => {
      res.redirect("/");
      

    })
    .catch((err) => {
      console.error(err);
    });
});

router.post("/delete/:id", async function (req, res, next) {
  Course.deleteOne({ _id: req.params.id })
    .then((doc) => {
     
      res.redirect("/");
    })
    .catch((err) => {
      console.error(err);
    });
});
router.post("/edit/", validatedata, async function (req, res, next) {
 
  Course.updateOne(
    { _id: req.body.id },
    {
      Course_Name: req.body.Course_Name,
      Course_ID: req.body.Course_ID,
      Course_Fee: req.body.Course_Fee,
      Course_Duration: req.body.Course_Duration,
    }
  )
    .then((doc) => {
     
      res.redirect("/");
    })
    .catch((err) => {
      console.error(err);
    });
});

router.get("/edit/:id", function (req, res, next) {
  Course.findById({ _id: req.params.id })
    .then((data) => {
      
      res.render("index", { contexts: data, message: "", updated: true });
    })
    .catch((err) => {
      console.error(err);
    });
});

// About page route.

module.exports = router;
