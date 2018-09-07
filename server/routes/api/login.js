const User = require("../../models/User");

module.exports = (router) => {

  // first POST request [http://localhost:8080/api/login]
  router.post("/api/login", (req, res) => {
    console.log("REQUEST BODY: "+req.body);

    const user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;

    console.log(user);

    if (req.body.username == null || req.body.username == ""
      || req.body.password == null || req.body.password == ""
      || req.body.email == null || req.body.email == "")
    {
      console.log("HIT IF statement");
      res.send("Validation Error: Please ensure that all fields have been provided");
      res.json({ success: false, message: "Validation Error: Please ensure that all fields have been provided" })
    } else {
      console.log("HIT ELSE statement");
      user.save((error) => {
        if (error) {
          console.log("HIT ERROR statement"+error);
          res.json({ success: false, message: "The system returned the following error: "+error});
        } else {
          console.log("HIT USER CREATED statement");
          res.json({ success: true, message: "User: "+ user +" successfully created" });
        }
      });
    }
  });

  return router;
};
