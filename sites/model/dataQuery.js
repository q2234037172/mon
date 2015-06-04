var mongoose = require('mongoose');
var os = require("os");

// 本地 mongodb链接地址
var mongodbUri = 'mongodb://127.0.0.1:27017/ngGather';

try {
    // coding mongodb链接地址
    mongodbUri = JSON.parse(process.env.VCAP_SERVICES).mongodb[0].credentials.uri;
} catch (e) {
    // console.log(e);
}

try {
    // 链接格式:    mongodb://user:pass@localhost:port/database   
    // DaoCloud链接地址
    mongodbUri = 'mongodb://' + process.env.MONGODB_USERNAME + ":" + process.env.MONGODB_PASSWORD + "@" +
        process.env.MONGODB_PORT_27017_TCP_ADDR + ":" + process.env.MONGODB_PORT_27017_TCP_PORT + '/' + process.env.MONGODB_INSTANCE_NAME;
} catch (e) {}

console.log(mongodbUri)

var db = mongoose.connect(mongodbUri);

var gatherSchema = new mongoose.Schema({
    img: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        default: ''
    },
    href: {
        type: String
    },
    time: {
        type: Number,
        default: Date.now
    },
    intro: {
        type: String
    },
    site: {
        type: String
    },
    gatherTime: {
        type: Number,
        default: Date.now
    }
});

var gatherModel = db.model('gather', gatherSchema);

function add(siteObj) {
    return gatherModel.create(siteObj, function(err, doc) {
        //console.log(doc);
    });
}

function addArr(siteArr, cb) {
    return gatherModel.collection.insert(siteArr, function(err, doc) {
        if (err) {
            console.log(err);
        }
        cb && cb();
    });
}

function searchAll() {
    return gatherModel.find({}, {
        _id: 0
    }, {
        sort: {
            gatherTime: -1
        }
    });
}

function searchSite(site) {
    return gatherModel.find({
        site: site
    }, {
        _id: 0
    }).exec();
}

function search(conditions, fields, options) {
    return gatherModel.find(conditions || {}, fields, options).exec();
}

function searchOne(conditions) {
    return gatherModel.findOne(conditions || {}).exec();
}

function update(siteObj) {
    return gatherModel.update({
        href: siteObj.href
    }, siteObj);
}

exports.searchSite = searchSite;
exports.searchOne = searchOne;
exports.add = add;
exports.addArr = addArr;
exports.update = update;
exports.searchAll = searchAll;
