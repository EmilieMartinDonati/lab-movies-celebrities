const router = require("express").Router();
const MovieModel = require("../models/Movie.model");
const CelebrityModel = require("../models/Celebrity.model");

router.get("/movies/create", async (req, res, next) => {
    try {
    const celebrities = await CelebrityModel.find();
   res.render("../views/movies/new-movie.hbs", {celebrities})
    }
    catch (err){
        next(err);
    }
})
module.exports = router;

router.post("/movies/create", async (req, res, next) => {
    try {
    const newMovie = req.body;
    await MovieModel.create(newMovie);
    res.redirect("/movies");
    }
    catch {
        res.render("../views/movies/new-movie.hbs")
    }
 })

router.get("/movies", async (req, res, next) => {
     try {
        const movies = await MovieModel.find();
        res.render("../views/movies/movies.hbs", {movies})
     }
     catch (err) {
       console.error(err)
     }
 })

 router.get("/movies/:id", async (req, res, next) => {
    try {
        id = req.params.id;
       const movieOnDisplay = await MovieModel.findById(id).populate("cast");
       res.render("../views/movies/movie-details.hbs", {movieOnDisplay})
    }
    catch (err) {
      console.error(err)
    }
})

router.get("/movies/:id/edit", async (req, res, next) => {
    try {
    id = req.params.id;
    const movieOnDisplay = await MovieModel.findById(id);
    const celebrities  = await CelebrityModel.find();
    res.render("../views/movies/edit-movie.hbs", {movieOnDisplay, celebrities});
    }
    catch (err){
    console.error(err);
    }
})

router.post("/movies/:id/edit", async (req, res, next) => {
    try {
    id = req.params.id;
    console.log(req.body);
    const updatedMovie = await MovieModel.findByIdAndUpdate(id, req.body, {new: true});
    res.redirect("/movies/" + id);
    }
    catch (err) {
        next(err)
    }
})

router.get("/movies/:id/delete", async (req, res, next) => {
    try {
   id = req.params.id;
   res.render("../views/movies/movie-details.hbs");
    }
    catch (err) {
        next(err)
    }
})

router.post("/movies/:id/delete", async (req, res, next) => {
    try {
    id = req.params.id
    const {deletedCount} = await MovieModel.findByIdAndDelete(id);
    res.redirect("/movies");
    }
    catch (err) {
        next(err)
    }
})