const User = require("../../models/User");
const UserSession = require("../../models/UserSession");

module.exports = (router) => {

  // SIGN UP POST request [http://localhost:8080/api/signup]
  router.post("/api/account/signup", (req, res) => {

    const user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;

    console.log("Creating user : "+user);

    if (req.body.username == null || req.body.username === ""
      || req.body.password == null || req.body.password === ""
      || req.body.email == null || req.body.email === "")
    {
      console.log("Validation Error: Please ensure that all fields have been provided");
      res.json({ success: false, message: "Validation Error: Please ensure that all fields have been provided" });
    } else {
      user.save((error) => {
        if (error) {
          console.log("The system returned the following error:" + error);
          return res.json({ success: false, message: "The system returned the following error: " + error});
        } else {
          console.log("User: "+ user +" successfully created");
          return res.json({ success: true, message: "User: "+ user +" successfully created" });
        }
      });
    }
  });

  // LOGIN POST request [http://localhost:8080/api/login]
  router.post("/api/account/login", (req, res) => {

    console.log("Attempting to login user : " + req.body.username);

    if (req.body.username == null || req.body.username === "") {
      console.log("Validation Error: Username cannot be blank");
      res.json({ success: false, message: "Validation Error: Username cannot be blank" });
    }
    if (req.body.password == null || req.body.password === "") {
      console.log("Validation Error: Password cannot be blank");
      res.json({ success: false, message: "Validation Error: Password cannot be blank" });
    }

    User.find({
      username: req.body.username
    }, (error, users) => {
      if (error) {
        console.log("Cannot find user : " + error);
        res.json({ success: false, message: "Cannot find user" + error});
      }
      if (users.length !== 1) {
        console.log("Duplicate user" + users);
        res.json({ success: false, message: "Duplicate user : " + users});
      }
      const user = users[0];

      //if (!user.validPassword(req.body.password)) {
      if (user.password !== req.body.password) {
        console.log("Invalid password");
        res.json({ success: false, message: "Invalid password" });
      } else {
        const userSession = new UserSession();

        userSession.userId = user._id;
        userSession.save((error, doc) => {
          if (error) {
            res.send("Cannot save user : " + error);
            res.json({ success: false, message: "Cannot save user : " + error});
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
  router.get("/api/account/verify", (req, res) => {

    const token = req.query.token;

    UserSession.find({
      _id: token,
      isDeleted: false
    }, (error, sessions) => {
      if (error) {
        console.log("Cannot find user : " + error);
        res.json({success: false, message: "Cannot find session : " + error});
      }
      if (sessions.length !== 1 || sessions.length === 0) {
        console.log("Duplicate session : " + sessions);
        res.json({ success: false, message: "Duplicate session : " + sessions});
      } else {
        console.log("User session validated : " + sessions);
        res.json({ success: true, message: sessions[0]});
      }
    });

  });

  //GET USER GET request [http://localhost:8080/api/getUser]
  router.get("/api/account/getUser", (req, res) => {

    const userId = req.query.userId;

      User.find({
        _id: userId
      }, (error, users) => {
        if (error) {
          console.log("Cannot find user : " + error);
          res.json({success: false, message: "Cannot find user : " + error});
        }
        if (users.length !== 1 || users.length === 0) {
          console.log("Cannot find user : " + users);
          res.json({ success: false, message: "Cannot find user : " + users});
        } else {
          console.log("User found : " + users);
          res.json({ success: true, message: users[0]});
        }
      });
  });

  // LOGOUT GET request [http://localhost:8080/api/logout]
  router.get("/api/account/logout", (req, res) => {

    const token = req.query.token;

    UserSession.findOneAndUpdate({
      _id: token,
      isDeleted: false
    }, {
      $set: { isDeleted: true }
    }, null, (error, sessions) => {
      if (error) {
        console.log("Cannot find user");
        res.json({success: false, message: "Cannot find session : " + error});
      }

      if (!sessions) {
        console.log("Duplicate session");
        res.json({ success: false, message: "Duplicate session cannot logout : " + sessions});
      } else {
        console.log("User successfully logged out : " + sessions);
        res.json({ success: true, message: "User successfully logged out : " + sessions});
      }
    });
  });

  return router;
};
