
//config base
global.config = require('./config');
//permission
global.authMethod = require('./permission');
global.val = require('../helper/validator');
global.db = require('./db');
global.middleware = require('../middlewares/check.js')
global.format = require('../helper/format');
