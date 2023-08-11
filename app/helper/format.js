const phoneV = require("phone");
const moment = require('moment');
const md5 = require("md5");
const slug = require('slug');
const momentTimezone = require("moment-timezone");
const fs = require("fs");

exports.phone = function (phone) {
    let phoneX = phoneV(phone, 'VNM')[0];
    return phoneX ? phoneX : phone;
};
exports.date = function (date, min = 0) {
    if (date) {
        // let numInt= moment(date).unix();
        return momentTimezone(date).tz("UTC").add(min, 'minutes').format('YYYY-MM-DD HH:mm:ss');
    } else {
        // console.log(min)
        return momentTimezone().tz("UTC").add(min, 'minutes').format('YYYY-MM-DD HH:mm:ss');
    }
};

exports.date_start_end = function (date, type,duration='month') {
    if (date) {
        if (type === 'start') {
            return moment(date).format('YYYY-MM-DD 00:00:00');
        }
        if (type === 'end') {
            return moment(date).format('YYYY-MM-DD 23:59:59');
        }
    } else {
        if (type === 'start') {
            return moment().startOf(duration).format('YYYY-MM-DD 00:00:00');
        }
        if (type === 'end') {
            return moment().endOf(duration).format('YYYY-MM-DD 23:59:59');
        }
    }

};


exports.day = function (date) {

    return moment(date).format('YYYY-MM-DD');
};
exports.time = function (time) {

    return moment(time).format('HH:mm');
};
exports.password = function (str) {
    return md5(str);

};
/**
 * @return {number}
 */
exports.DateToInt = function (date) {
    return Date.parse(date) / 1000;
};
/**
 * @return {string}
 */
exports.IntToDate = function (int) {
    return moment.unix(int).format("YYYY-MM-DD HH:mm:ss");
};

exports.slug_text = (text) => {
    return text ? slug(text.toString(), {lower: true}) : "";
};
exports.readFile = async (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', function (err, data) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
};
exports.roundToTwo = (num) => {
    return +(Math.round(num + "e+2") + "e-2");
};

