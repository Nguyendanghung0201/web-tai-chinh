
'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');
var http = require('http');
const app = express();

const session = require('express-session');
require('./app/cors/global');
const db = require("./app/cors/db");
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "./app/views");
app.use(express.static('public'));
const path = require('path');
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: "taicinh",
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '/public/uploads'))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + file.originalname
        cb(null, uniqueSuffix)
    }
})

const upload = multer({ storage: storage })
var server = http.createServer(app);

//config update file
/** @namespace global.config */
app.use(cors(global.config.cors));
const cookieParser = require('cookie-parser');
//
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

app.use(function (err, req, res, next) {
    return res.send({ status: false, msg: "error", code: 700, data: err });
});
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
   
    next();
});
const delay = (ms) =>
    new Promise((resolve) => setTimeout(() => resolve(), ms));

app.all('/client/:act', [middleware.verifyToken, middleware.check], async function (request, response) {

    let dataReponse = null;
    let dataError = null;
    try {
        let act = request.params.act.replace(/[^a-z0-9\_\-]/i, '').toLowerCase();
        let mod = (request.mod) ? request.mod : request.query.mod;
        let nameRole = request.body.userInfo ? request.body.userInfo.level : '';
        let authMethod = global.authMethod.check_function(request.method, act, mod, nameRole);
        /** @namespace request.files */

        request.body.files = request.files ? request.files : '';
        if (authMethod) {

            let controller = require('./app/modules/' + act + '/controller');
            if ((controller) && (controller[mod])) {
                let query = request.body;
                query.param = request.query;
                query.clientIp = request.clientIp;
                query.device = request.device;
                try {
                    dataReponse = await controller[mod](query);

                } catch (ex) {
                    console.log(ex);
                    dataReponse = { status: false, msg: "error", code: 700, data: [] };
                }
            } else {
                dataReponse = { status: false, msg: "error", code: 703, data: [] };
            }
        } else {
            dataReponse = { status: false, msg: "error", code: 701, data: [] };
        }
    } catch (sys) {
        console.log(sys)
        dataReponse = { status: false, msg: "error", code: 700, data: sys };
    }
    if(dataReponse.status && dataReponse.token){
        response.cookie('token', dataReponse.token, { maxAge: 3600000, httpOnly: true }); // Set cookie
    }
    response.send(dataReponse)
});
app.post('/api/upload', upload.single('file'), [middleware.verifyToken, middleware.check], async (req, res) => {

    if (req.file && req.body.type && req.body.userInfo) {
        if (req.body.type == 'chan_dung') {
            await db('users').update('chan_dung', req.file.filename).where('id', req.body.userInfo.id)
        }
        if (req.body.type == 'image_sau') {
            await db('users').update('image_sau', req.file.filename).where('id', req.body.userInfo.id)
        }
        if (req.body.type == 'image_truoc') {
            await db('users').update('image_truoc', req.file.filename).where('id', req.body.userInfo.id)
        }
        res.json({
            status: true, msg: "success", code: 0, data: req.file.filename
        })
    } else {
        res.json({
            status: false, msg: "error", code: 400, data: []
        })
    }

})

app.get('/quanly/user',[middleware.verifyToken2, middleware.checkadmin], async (req, res) => {
    let page = req.query.page;
    if(page){
        let user = await db('users').select('*').where('status', 1).andWhere('level',0).paginate({ perPage: 50, isLengthAware: true, currentPage: page })
        console.log(user)
        res.render('admin',{user:user.data})
    }else{
        res.render('notfound')
    }
  
})
app.get('/quanly/hosovay',[middleware.verifyToken2, middleware.checkadmin], async (req, res) => {
    let page = req.query.page;
    if(page){
        let user = await db('hopdongvay').innerJoin('users', 'users.id', 'hopdongvay.userid').select('hopdongvay.*','users.name',"users.phone").where('hopdongvay.status', 1).paginate({ perPage: 50, isLengthAware: true, currentPage: page })
        res.render('adminhoso',{user:user.data})
    }else{
        res.render('notfound')
    }
  
})

app.get('*', async (req, res) => {
   
    res.render('index')
})

server.listen(config.SPort, function () {
    console.log("API Init Completed in Port " + config.SPort);

})
