// ROUTE HANDLER: FM.JS //
// Financial Modelling Api //

// Importing modules
let express = require("express");
let router = express.Router();

// requiring controller
let fmCont = require("./fmController");

/**
 * Handled Routes:
 *  => /api/v1/fm
 *    => /home :- GET: Returning basic data: major indexes, gainer loser active stocks, forex, sectors, NYSE
 *    => /nyse :- GET: Returning nyse data only
 */
router.get("/home", fmCont.returnHomeData);
router.get("/nyse", fmCont.returnNYSEData);

// Exporting router
module.exports = router;
