const router = require("express").Router();
const CelebrityModel = require("../models/Celebrity.model");

router.get("/celebrities/create", (req, res, next) => {
   res.render("../views/celebrities/new-celebrity.hbs")
})


router.post("/celebrities/create", async (req, res, next) => {
    try {
    const newCelebrity = req.body;
    await CelebrityModel.create(newCelebrity);
    res.redirect("/celebrities");
    }
    catch {
        res.render("../views/celebrities/new-celebrity.hbs")
    }
 })

router.get("/celebrities", async (req, res, next) => {
     try {
        const celebrities = await CelebrityModel.find();
        res.render("../views/celebrities/celebrities.hbs", {celebrities})
     }
     catch (err) {
       console.error(err)
     }
 })


 router.get("/celebrities/:id/delete", async (req, res, next) => {
     try {
     const celebrities = await CelebrityModel.find();
     id = req.params.id;
     res.render("../views/celebrities/celebrities.hbs", {celebrities});
     console.log("Ok this should work");
     }
     catch (err) {
     next(err);
     }
 })

 router.post("/celebrities/:id/delete", async (req, res, next) => {
     try {
     id = req.params.id;
     const {deletedCount} = await CelebrityModel.findByIdAndDelete(id);
     console.log("ok deleted");
     res.redirect("/celebrities")
     }
     catch(err) {
     next(err)
     }
 })

 router.get("/celebrities/:id", async (req, res, next) => {
    try {
        id = req.params.id;
       const celebrityOnDisplay = await CelebrityModel.findById(id);
       res.render("../views/celebrities/celebrity-details.hbs", {celebrityOnDisplay})
    }
    catch (err) {
      console.error(err)
    }
})

router.get("/celebrities/:id/edit", async (req, res, next) => {
    try {
    id = req.params.id;
    const celebrityOnDisplay = await CelebrityModel.findById(id);
    res.render("../views/celebrities/edit-celebrity.hbs", {celebrityOnDisplay});
    }
    catch (err){
    console.error(err);
    }
})

router.post("/celebrities/:id/edit", async (req, res, next) => {
    try {
    id = req.params.id;
    console.log(req.body);
    console.log("all fine now");
    const updatedCelebrity = await CelebrityModel.findByIdAndUpdate(id, req.body, {new: true});
    res.redirect("/celebrities/" + id);
    }
    catch (err) {
        next(err)
    }
})


 module.exports = router;



