
'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');
var http = require('http');
const app = express();
var randomstring = require("randomstring");
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
app.use(cors());
const cookieParser = require('cookie-parser');
//
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

app.use(function (err, req, res, next) {
    return res.send({ status: false, msg: "error", code: 700, data: err });
});
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    next();
});

// app.all('/client/:act', [middleware.verifyToken, middleware.check], async function (request, response) {

//     let dataReponse = null;
//     let dataError = null;
//     try {
//         let act = request.params.act.replace(/[^a-z0-9\_\-]/i, '').toLowerCase();
//         let mod = (request.mod) ? request.mod : request.query.mod;
//         let nameRole = request.body.userInfo ? request.body.userInfo.level : '';
//         let authMethod = global.authMethod.check_function(request.method, act, mod, nameRole);
//         /** @namespace request.files */

//         request.body.files = request.files ? request.files : '';
//         if (authMethod) {
//             console.log('call api ', act)
//             let controller = require('./app/modules/' + act + '/controller');
//             if ((controller) && (controller[mod])) {
//                 let query = request.body;
//                 query.param = request.query;
//                 query.clientIp = request.clientIp;
//                 query.device = request.device;
//                 try {
//                     dataReponse = await controller[mod](query);

//                 } catch (ex) {
//                     console.log(ex);
//                     dataReponse = { status: false, msg: "error", code: 700, data: [] };
//                 }
//             } else {
//                 dataReponse = { status: false, msg: "error", code: 703, data: [] };
//             }
//         } else {
//             dataReponse = { status: false, msg: "error", code: 701, data: [] };
//         }
//     } catch (sys) {
//         console.log(sys)
//         dataReponse = { status: false, msg: "error", code: 700, data: sys };
//     }

//     response.send(dataReponse)
// });
app.get("/addkey", async (req, res) => {
    let type = req.query.type
    let key = randomstring.generate(10)
    await db('makey').insert({
        'key_ban': key,
        type: Number(type)
    })
    res.json({
        ok: 'ok'
    })
})
app.get('/add', async (req, res) => {
    let id = req.query.id;// mã máy
    let ma = req.query.ma;
    let check_key = await db('makey').select('*').where({
        'key_ban': ma,
        status: 1
    }).first()
    if (check_key) {

        const currentDate = new Date();
        // Thêm 1 ngày vào ngày hiện tại để có giá trị ngày mai
        const tomorrow = new Date(currentDate);
        tomorrow.setDate(currentDate.getDate() + check_key.type);
        const formattedDate = tomorrow.toISOString().slice(0, 19).replace('T', ' ');
        await db('khoadulieu').update({
            "han_dung": formattedDate
        }).where('may_id', id)
        await db('makey').update('status', 0).where('id', check_key.id)
        res.json({
            status: true
        })
    } else {
        res.json({
            status: false
        })
    }
})
app.get('/list_key',async(req,res)=>{
    let data = await db('check_key').select('*')
    res.json({
        data
    })
})
app.get('/list_may',async(req,res)=>{
    let data = await db('khoadulieu').select('*')
    res.json({
        data
    })
})
app.get('/check', async (req, res) => {
    let id = req.query.id;
    if (id) {
        let data = await db('khoadulieu').select('*').where('may_id', id).first()
        if (data) {
            let han_dung = new Date(data.han_dung);
            const currentDate = new Date();
            if (han_dung > currentDate) {
                res.json({
                    status: true
                })
            } else {
                res.json({
                    status: false,
                    msg: "hết hạn dùng"
                })
            }

        } else {
            const currentDate = new Date();
            // Thêm 1 ngày vào ngày hiện tại để có giá trị ngày mai
            const tomorrow = new Date(currentDate);
            tomorrow.setDate(currentDate.getDate() + 2);
            const formattedDate = tomorrow.toISOString().slice(0, 19).replace('T', ' ');
            await db('khoadulieu').insert({
                "may_id": id,
                status: 1,
                "han_dung": formattedDate
            })

            res.json({
                status: true
            })
        }
    } else {
        res.json({
            status: false,
            msg: "lỗi hệ thống"
        })
    }
})


server.listen(3001, function () {
    console.log("API Init Completed in Port " + config.SPort);

})
