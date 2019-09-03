let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let GoogleUserSchema = new Schema({
    googleId: {
        type: String,
        require: true
    }
});

let User = mongoose.model("User", GoogleUserSchema);

// Export the Note model
module.exports = User;