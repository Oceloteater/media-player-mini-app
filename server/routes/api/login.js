const User = require("../../models/User");
const UserSession = require("../../models/UserSession");

module.exports = (router) => {

  // SIGN UP POST request [http://localhost:8080/api/signup]
  router.post("/api/signup", (req, res) => {

    const user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;

    console.log("Creating user : "+user);

    if (req.body.username == null || req.body.username == ""
      || req.body.password == null || req.body.password == ""
      || req.body.email == null || req.body.email == "")
    {
      //res.send("Validation Error: Please ensure that all fields have been provided");
      res.json({ success: false, message: "Validation Error: Please ensure that all fields have been provided" });
    } else {
      user.save((error) => {
        if (error) {
          console.log("HIT ERROR statement" + error);
          res.json({ success: false, message: "The system returned the following error: " + error});
        } else {
          console.log("HIT USER CREATED statement");
          res.json({ success: true, message: "User: "+ user +" successfully created" });
        }
      });
    }
  });

  // LOGIN POST request [http://localhost:8080/api/login]
  router.post("/api/login", (req, res) => {

    console.log("Attempting to login user : " + req.body.username);

    if (req.body.username == null || req.body.username == "") {
      //res.send("Validation Error: Username cannot be blank");
      res.json({ success: false, message: "Validation Error: Username cannot be blank" });
    }
    if (req.body.password == null || req.body.password == "") {
      //res.send("Validation Error: Password cannot be blank");
      res.json({ success: false, message: "Validation Error: Password cannot be blank" });
    }

    User.find({
      username: req.body.username
    }, (error, users) => {
      if (error) {
        //res.send("Cannot found user");
        res.json({ success: false, message: "Cannot find user" + error});
      }
      console.log("Users length: " + users.length);
      console.log("Returned users: " + users);
      if (users.length != 1) {
        //res.send("Duplicate user");
        res.json({ success: false, message: "Duplicate user : " + users});
      }

      const user = users[0];
      //if (!user.validPassword(req.body.password)) {
      if (user.password != req.body.password) {

        console.log("PASSWORD IN BODY : " + req.body.password);
        console.log("PASSWORD IN MONGO : " + user.password);

        //res.send("Password invalid");
        res.json({ success: false, message: "Password invalid" });
      } else {
        const userSession = new UserSession();

        userSession.userId = user._id;
        userSession.save((error, doc) => {
          if (error) {
            res.send("Cannot save user");
            res.json({ success: false, message: "Cannot save user" + error});
          } else {
            return res.send({
              success: true,
              message: "Valid sign in",
              token: doc._id
            });
          }
        });
      }
    });

  });

  // VERIFY GET request [http://localhost:8080/api/verify]
  router.get("/api/verify", (req, res) => {

    const token = req.query.token;

    UserSession.find({
      _id: token,
      isDeleted: false
    }, (error, sessions) => {
      if (error) {
        //res.send("Cannot find user");
        res.json({success: false, message: "Cannot find session : " + error});
      }
      console.log("Users length: " + sessions.length);
      console.log("Returned users: " + sessions);
      if (sessions.length != 1) {
        //res.send("Duplicate session");
        res.json({ success: false, message: "Duplicate session : " + sessions});
      } else {
        //res.send("Duplicate user");
        res.json({ success: true, message: "User session validated : " + sessions});
      }
    });

  });

  // LOGOUT GET request [http://localhost:8080/api/verify]
  router.get("/api/logout", (req, res) => {

    const token = req.query.token;

    UserSession.findOneAndUpdate({
      _id: token,
      isDeleted: false
    }, {
      $set: { isDeleted: true }
    }, null, (error, sessions) => {
      if (error) {
        //res.send("Cannot find user");
        res.json({success: false, message: "Cannot find session : " + error});
      }
      console.log("Returned users: " + sessions);
      if (!sessions) {
        //res.send("Duplicate session");
        res.json({ success: false, message: "Duplicate session cannot logout : " + sessions});
      } else {
        //res.send("Duplicate user");
        res.json({ success: true, message: "User successfully logged out : " + sessions});
      }
    });
  });

  return router;
};
