// API ROUTE HANDLER: API.JS //

// Importing modules
let express = require("express");
let router = express.Router();

// Importing routers
let fmRouter = require("./v1/fm");

/**
 * Redirecting to v1 directory
 *  => /api => 
 *    => /v1/fm/
 */
router.use("/v1/fm/", fmRouter);

// Exporting Router
module.exports = router;
