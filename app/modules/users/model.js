const md5 = require('md5');
const jwt = require('jsonwebtoken');
const userRes = require("./repository");



const URep = new userRes();

exports.logout = async function (query) {
    return {
        status: true,
        msg: "success",
        code: 0,
        data: []
    };
};
exports.list = async function (query) {
    let list = await URep.getlist(query.userInfo.ref)
    return {
        status: true,
        msg: "success",
        code: 0,
        data: list
    }
};

exports.login = async function (query) {
    //check login
    let checkUser = await URep.check_email(query.phone);
    if (!checkUser) {

        return { status: false, msg: "error", code: 654, data: [] };
    }
    if (checkUser.status == 0) {

        return { status: false, msg: "error", code: 675, data: [] };
    }

    if (md5(query.password) !== checkUser.password) {

        return { status: false, msg: "error", code: 655, data: [] };
    }

    // create jwt token
    let dataCheckUsername = {
        Id: checkUser.id,
        display_name: checkUser.phone,
    };
    let token = await jwt.sign({ dataMain: dataCheckUsername }, config.keyJWT, { expiresIn: '30 days' });


    // return result
    return {
        status: true,
        msg: "success",
        code: 0,
        data: {
            token: token,
            Id: dataCheckUsername.Id
        }
    };
};

exports.register = async (query) => {
    let result = [];
    try {
        //check email
        let checkUsername = await URep.check_email(query.phone);
        if (checkUsername) {
            return { status: false, msg: "error", code: 660, data: [] };
        }


        let dataInsert = {

            password: md5(query.password),
            phone: query.phone,
            status: 1,
            level: 0,
        };

        //create code user
        // return dataInsert;
        result = await URep.insert_user(dataInsert);
        let token = await jwt.sign({ dataMain: result[0] }, config.keyJWT);
        query.result = result;
        query.token = token;
        return {
            status: true, msg: "success", code: 0, data: {
                token: token
            }
        };
    } catch (ex) {
        console.log(ex)
        if (result[0]) {
            await URep.delete(result[0]);
        }
        return { status: false, msg: "fail", code: 700, data: [] };
    }
};
exports.update_profile = async (query) => {
    let profile = await URep.update_profile(query.dataupdate, query.userInfo.id);
    return { status: true, msg: "success", code: 0, data: [profile] };
}

exports.my_profile = async (query) => {

    let profile = await URep.my_profile(query.userInfo.id);
    if (profile && profile.password) {
        delete profile.password
    }
    return { status: true, msg: "success", code: 0, data: [profile] };
};
exports.change_password = async (query) => {
    //check password
    if (md5(query.old_password) !== query.userInfo.password) {
        return { status: false, msg: "error", code: 655, data: [] };
    }
    let dataUpdate = {
        updateAt: format.date(),
        password: md5(query.password)
    };
    await URep.update_user(dataUpdate, query.userInfo.Id);
    return { status: true, msg: "success", code: 0, data: [] };
};

exports.vay = async (query) => {
    let vay = await URep.vay(query, query.userInfo.id);
    return { status: true, msg: "success", code: 0, data: [vay] };
}
