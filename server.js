const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const passport = require("passport");
const users = require("./routes/api/users");
const routes = require("./routes");
// Bodyparser middleware

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);
app.use(routes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
  });

// DB Config
//const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI ||"mongodb://localhost/mortgageOptionsDev",
    { useNewUrlParser: true,
      useUnifiedTopology: true
     }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));
const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));