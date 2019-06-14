// FMCONTROLLER.JS //
let HomeData = require("./../../models/HomeData");
const FM_CONFIG = require("./../../modules/financialModellingApi/fm_config");

module.exports = {

  // returns crypto currency data url
  returnCCURL: function(req, res, next){
    if(!req.auth.success) res.json(req.auth);
    else if(req.auth.success) res.json({success: true, ccApiUrl: FM_CONFIG.ccApiURLs});
  },

  // sends home data
  returnHomeData: function(req, res, next){
    HomeData.find({}, (err, docs) =>{
      if(err) return next(err);

      if(docs.length === 0) return res.json({err: "Unable to find the requested data!"});

      return res.json(JSON.parse(docs[0].data));
    });
  },

  // returns nyse data
  returnNYSEData: function(req, res, next){
    HomeData.find({}, (err, docs) => {
      if(err) return next(err);

      if(docs.length === 0) return res.json({err: "Unable to find the requested Data!"});

      // extracts and returns NYSE data
      docs = JSON.parse(docs[0].data);
      let NYSEData = docs.filter((d) => {
        return d.stockExchangeName && !d.head;
      });
      return res.json(NYSEData);
    });
  },

};
