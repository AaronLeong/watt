/**
 * Created by ciaosu on 2014/8/3.
 */
var mongoose = require("mongoose");
var schema = require("./schema");
var dburl = require("../config").db;

mongoose.connect(dburl);

for (key in schema){
    if (typeof schema[key] !== "function"){
        mongoose.model(key, schema[key]);
        exports[key] = mongoose.model(key);
    }
}
