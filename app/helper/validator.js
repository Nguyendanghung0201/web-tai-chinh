const moment = require('moment');
const {Validator} = require('node-input-validator');
exports.isTime = function (time) {
    let a = time.split(':');
    return 0 < parseInt(a[0]) <= 24 && 0 <= parseInt(a[1]) <= 60;
};
exports.day = function (day) {
    return moment().format('YYYY-MM-DD') <= moment(day).format('YYYY-MM-DD');
};
exports.isJson = function(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
exports.Form = async function (data, requires) {
    let validator = new Validator(data, requires);
    let matched = await validator.check();
    if (!matched) {
        return {status: false, error: validator.errors}
    } else {
        return {status: true}
    }
};
exports.getTypeFile = function (ext) {
    ext=ext.toLowerCase();
    if (config.listFileImage.indexOf(ext) !== -1) {
        return config.constant.MEDIA.MediaType.image;
    }
    if (config.listFileVideo.indexOf(ext) !== -1) {
        return config.constant.MEDIA.MediaType.video;
    }
    if (config.listFileOther.indexOf(ext) !== -1) {
        return config.constant.MEDIA.MediaType.other;
    }
    return config.constant.MEDIA.MediaType.other;
};

exports.validateEmail = (email) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

exports.check_permission_user = async (UID, withUID) => {
    // console.log({UID, withUID})
    let permissionUID = await db("Users").leftJoin("Groups", "Groups.groupId", "Users.groupId")
        .select("groupPermission").where("UID", UID).first();
    // console.log(permissionUID)
    let GroupWithUID = await db("Users").select("groupId").where("UID", withUID).first();
    // console.log({GroupWithUID})
    if (!permissionUID || !GroupWithUID) {
        return false;
    }
    permissionUID.groupPermission = permissionUID.groupPermission === "all" ? permissionUID.groupPermission :
        JSON.parse(permissionUID.groupPermission)[config.constant.PERMISSION.SEE];
    if (permissionUID.groupPermission === 'all') {
        return true;
    }
    let perArray = permissionUID.groupPermission.split(",").map(Number);
    return perArray.indexOf(GroupWithUID.groupId) !== -1;
};
