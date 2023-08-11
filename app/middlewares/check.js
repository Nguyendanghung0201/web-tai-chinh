const jwt = require('jsonwebtoken');
const userRes = require("../modules/users/repository");
const URes = new userRes();

exports.check = async function (req, res, next) {
    // kiểm tra user đó có tồn tại hay không -> gán req.body.userInfo = info user đó
    if (!req.uid) {
        if (authMethod.check_ignore(req.mod) === true) {
            next();
        }
    } else {
        let userInfo = await URes.my_profile(req.uid);
        if (!userInfo) {
            return res.send({ status: false, msg: 'error', code: 654, data: [] });
        }
        if (userInfo && userInfo.status === 0) {
            return res.send({ status: false, msg: 'error', code: 664, data: [] });
        }
        req.body.userInfo = userInfo;
        next();
    }
};
exports.checkadmin = async function (req, res, next) {
    // kiểm tra user đó có tồn tại hay không -> gán req.body.userInfo = info user đó
    if (!req.uid) {
        if (authMethod.check_ignore(req.mod) === true) {
            next();
        }
    } else {
        let userInfo = await URes.my_profile(req.uid);
        if (!userInfo) {
            return res.send({ status: false, msg: 'error', code: 654, data: [] });
        }
        if (userInfo && userInfo.status === 0) {
            return res.send({ status: false, msg: 'error', code: 664, data: [] });
        }
        if (userInfo && userInfo.level == 0) {
            return res.send({ status: false, msg: 'error', code: 6647, data: [] });
        }

        req.body.userInfo = userInfo;
        next();
    }
};
exports.verifyToken = async function (req, res, next) {
    // Giải mã token -> gán req.uid = ID người dùng giải mã ra được từ token
    //check function have need token
    let mod = req.method === 'POST' || req.method === 'PUT'
        ? (req.body.mod ? req.body.mod.replace(/[^a-z0-9\_\-]/i, '').toLowerCase() : '')
        : req.query.mod ? req.query.mod.replace(/[^a-z0-9\_\-]/i, '').toLowerCase() : '';
    req.mod = mod;
    let bearerHeader = req.session.token ? req.session.token : req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        if (authMethod.check_ignore(mod) === true) {
            return next();
        } 
        let bearerToken = bearerHeader.split(' ')[1];
        let status = false;
        // let done = false;
        let authData = null;
        try {
            authData = await jwt.verify(bearerToken, config.keyJWT);
        } catch (e) {
            return res.status(200).send({ status: false, msg: 'error', code: 702, data: [] });
        }
        if (authData) {
            status = true;
            req.uid = authData.dataMain.Id;
        }
        if (status === true) {
            return next();
        } else {
            return res.status(200).send({ status: false, msg: 'error', code: 702, data: [] });
        }
    } else {
        if (authMethod.check_ignore(mod) === true) {
            return next();
        } else {
            return res.json({
                status: false,
                data: [],
                msg: 'error', code: 664
            });
        }
    }
}
exports.verifyToken2 = async function (req, res, next) {
    // Giải mã token -> gán req.uid = ID người dùng giải mã ra được từ token
    //check function have need token
    let mod = req.method === 'POST' || req.method === 'PUT'
        ? (req.body.mod ? req.body.mod.replace(/[^a-z0-9\_\-]/i, '').toLowerCase() : '')
        : req.query.mod ? req.query.mod.replace(/[^a-z0-9\_\-]/i, '').toLowerCase() : '';
    req.mod = mod;
    let bearerHeader = req.session.token ? req.session.token : req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        if (authMethod.check_ignore(mod) === true) {
            return next();
        } 
        let bearerToken = bearerHeader.split(' ')[1];
        let status = false;
        // let done = false;
        let authData = null;
        try {
            authData = await jwt.verify(bearerToken, config.keyJWT);
        } catch (e) {
            return res.status(200).send({ status: false, msg: 'error', code: 702, data: [] });
        }
        if (authData) {
            status = true;
            req.uid = authData.dataMain.Id;
        }
        if (status === true) {
            return next();
        } else {
            return res.status(200).send({ status: false, msg: 'error', code: 702, data: [] });
        }
    } else {
        if (authMethod.check_ignore(mod) === true) {
            return next();
        } else {
            return res.json({
                status: false,
                data: [],
                msg: 'error', code: 6644
            });
        }
    }
}
exports.checkIP = async function (req, res, next) {
    // if (req.clientIp && req.clientIp === "::1") {
    //     return next();
    // }
    // return res.send({ status: false, msg: "error", code: 703, data:[]});
    return next();
}