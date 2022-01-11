//  Add your code here
const { Schema, model } = require("mongoose");

const movieSchema = new Schema(

    {
        title: String,
        genre: String,
        plot: String,
        cast: [{ type: Schema.Types.ObjectId, ref: "celebrity" }]
    }
)

const movieModel = model("movies", movieSchema);

module.exports = movieModel;
