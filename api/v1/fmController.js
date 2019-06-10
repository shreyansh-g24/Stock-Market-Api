// FMCONTROLLER.JS //
let HomeData = require("./../../models/HomeData");

module.exports = {

  // sending home data
  returnHomeData: function(req, res, next){
    HomeData.find({}, (err, docs) =>{
      if(err) return next(err);

      if(docs.length === 0) return res.json({err: "Unable to find the requested data!"});

      return res.json(JSON.parse(docs[0].data));
    });
  },

};
