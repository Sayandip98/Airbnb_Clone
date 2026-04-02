const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const cookieParser = require("cookie-parser");

const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

// app.use(cookieParser("secretcode"));

// app.get("/getsignedcookie", (req, res) => {
//   res.cookie("made-in", "India", { signed: true });
//   res.send("Signed cookie send");
// });

// app.get("/verify", (req, res) => {
//   console.log(req.signedCookies);
//   res.send("verified");
// });

// app.get("/getcookies", (req, res) => {
//   res.cookie("greet", "hello");
//   res.send("send you some cookies");
// });

// app.get("/greet", (req, res) => {
//   let { name = "anonymous" } = req.cookies;
//   res.send(`Hi ${name}`);
// });

// // root route
// app.get("/", (req, res) => {
//   console.log(req.cookies);
//   res.send("i am root!");
// });

// // route
// app.use("/users", users);
// app.use("/posts", posts);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const sessionOptions = {
  secret: "mysupersecretstring",
  resave: false,
  saveUninitialized: true,
};

app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next) => {
  req.locals.successMsg = req.flash("success");
  req.locals.errorMsg = req.flash("error");
})

app.get("/register", (req, res) => {
  let { name = "anonymous" } = req.query;
  req.session.name = name;

  if (name === "anonymous"){
    req.flash("erroe", "user not registered !");
  }else {
    req.flash("success", "user registered successfully!");
  }
    
  res.redirect("/hello");
});

app.get("/hello", (req, res) => {
  res.render("page.ejs", {name : req.session.name});
});

// app.get("/reqcount", (req, res) => {
//   if (req.session.count) {
//     req.session.count++;
//   } else {
//     req.session.count = 1;
//   }

//   res.send(`you send a request ${req.session.count} times`);
// });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
