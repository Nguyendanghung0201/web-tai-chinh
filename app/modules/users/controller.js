const model = require('./model');
exports.login = async function (query) {
    let validate = await val.Form(query, {
        phone: "required",
        password: "required"
    });
    if (!validate.status) {
        return {status: false, msg: validate.error, code: 707, data: []};
    }
    return await model.login(query);
};
exports.loginadmin = async function (query) {
    let validate = await val.Form(query, {
        phone: "required",
        password: "required"
    });
    if (!validate.status) {
        return {status: false, msg: validate.error, code: 707, data: []};
    }
    return await model.loginadmin(query);
};

exports.logout = async function (query) {
    return await model.logout(query);
};
exports.register = async function (query) {
    let rules =  {
        password: "required",
        re_password: "required|same:password",
        phone: "required|numeric|maxLength:20",
    };
    let validate = await val.Form(query, rules);
    if (!validate.status) {
        return {status: false, msg: validate.error, code: 707, data: []};
    }
    return await model.register(query);
};
exports.my_profile = async function (query) {
    return await model.my_profile(query);
};
exports.my_profile_admin = async function (query) {
    return await model.my_profile_admin(query);
};
exports.change_password = async function (query) {
    let validate = await val.Form(query, {
        password: "required|hash:md5",
        re_password: "required|same:password",
        old_password: "required|hash:md5"
    });
    if (!validate.status) {
        return {status: false, msg: validate.error, code: 707, data: []};
    }
    return await model.change_password(query);
};
exports.update_profile = async function(query) {
 
    return await model.update_profile(query);
}


exports.list_ref = async function(query){
    return await model.list(query)
}
exports.vay = async function(query){
    let validate = await val.Form(query, {
        khoanvay:"required",
        thoihan:"required",
    });
    if (!validate.status) {
        return {status: false, msg: validate.error, code: 707, data: []};
    }
    return await model.vay(query)
}