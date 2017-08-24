var path = require("path");
var express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");
require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI);

var webpack = require("webpack");
var config = require("./webpack.config.dev");

var app = express();
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 1000, //30 days
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);

var compiler = webpack(config);

app.use(
  require("webpack-dev-middleware")(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  })
);

app.use(require("webpack-hot-middleware")(compiler));

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(3030, "localhost", function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log("Listening at http://localhost:3030");
});
