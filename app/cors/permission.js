const permission = require("../../permission");
const json = permission.all;
const ignore = permission.ignore;
const list_page = permission.list_page;
exports.check_function = function (method, controller, fun, role) {
    console.log(method, controller, fun, role )
    if (json[method.toLowerCase()][controller] && json[method.toLowerCase()][controller][fun]) {
        if (json[method.toLowerCase()][controller][fun] === 'all') {
            return true;
        } else {
            return json[method.toLowerCase()][controller][fun].indexOf(role) !== -1;
        }
    }
    else 
    {
        return false;
    }
};
exports.check_ignore = function (fun) {
    return ignore.indexOf(fun) !== -1;
};
exports.check_view = function(page) {
    return list_page.indexOf(page) !== -1;
}
