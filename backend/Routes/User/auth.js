var express = require("express");
var router = express.Router();
const DBcontroller = require("../../DataBase/DBcontroller");
const bcrypt = require("bcrypt");


router.post("/Register" , async (req, res, next) => {
    try {
      // parameters exists - TODO
      // valid parameters - TODO
      // username exists
  
      const users = await DBcontroller.execQuery("SELECT username FROM users");
  
      if (users.find((x) => x.username === req.body.username))
        throw { status: 409, message: "Username taken" };
  
      // add the new username
      let hash_password = bcrypt.hashSync(
        req.body.password,
        parseInt(process.env.bcrypt_saltRounds)
      );

      let user = {
        username: req.body.username,
        password: hash_password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        profile_image: req.body.profile_image,
        country: req.body.country,
        email: req.body.email
      }
  
      await DBcontroller.execQuery(
        `INSERT INTO users VALUES (default, '${req.body.username}', '${hash_password}','${user.first_name}', '${user.last_name}','${user.profile_image}', '${user.country}', '${user.email}')`
      );
      res.status(201).send({ message: "user created", success: true });
    } catch (error) {
      next(error);
    }
});

router.post("/Login", async (req, res, next) => {
  try {
    // check that username exists
    const users = await DBcontroller.execQuery("SELECT username FROM users");
    if (!users.find((x) => x.username === req.body.username))
      throw { status: 401, message: "Username or Password incorrect" };

    // check that the password is correct
    const user = (
      await DBcontroller.execQuery(
        `SELECT * FROM users WHERE username = '${req.body.username}'`
      )
    )[0];

    if (!bcrypt.compareSync(req.body.password, user.password)) {
      throw { status: 401, message: "Username or Password incorrect" };
    }

    // Set cookie
    req.session.user_id = user.user_id;
    req.session.username = user.username;
    req.session.image = user.profile_image;
    // req.session.save();
    //res.cookie(session_options.cookieName, user.user_id, cookies_options);

    // return cookie
    res.status(200).send({ message: "login succeeded", success: true });
  } catch (error) {
    next(error);
  }
});
  
router.post("/logout", function (req, res) {
  req.session.reset(); // reset the session info --> send cookie when  req.session == undefined!!
  res.send({ success: true, message: "logout succeeded" });
});


module.exports = router;