// ROUTE HANDLER: FM.JS //
// Financial Modelling Api //

// Importing modules
let express = require("express");
let router = express.Router();

// requiring controller
let fmCont = require("./fmController");
let userCont = require("./../../controllers/userController");

/**
 * Handled Routes:
 *  => /api/v1/fm
 *    => /home :- GET: Returns basic data: major indexes, gainer loser active stocks, forex, sectors, NYSE
 *    => /nyse :- GET: Returns nyse data only
 *    => /cc :- GET: Returns crypto currency data urls after authentication JWT 
 */
router.get("/home", fmCont.returnHomeData);
router.get("/nyse", fmCont.returnNYSEData);
router.get("/cc", userCont.authenticateJWT, fmCont.returnCCURL);

// Exporting router
module.exports = router;
