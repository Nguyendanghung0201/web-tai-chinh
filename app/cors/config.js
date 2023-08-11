
exports.cors = {
    origin: "*"
};
exports.environment = "local";//local, product
exports.SPort = this.environment === "local" ? "3000" : "3000";//local, product

exports.configDB = {
    mysql: {
        client: 'mysql',
        connection: {
            host: this.environment === 'local' ? '127.0.0.1' : "127.0.0.1",
            user: this.environment === 'local' ? 'root' : "root",
            password: this.environment === 'local' ? '123123' : "123123",
            database: this.environment === 'local' ? 'taichinh' : "taichinh",
            charset: 'utf8mb4',
            port: this.environment === 'local' ? 3306 : 3306,
            options: {
                cryptoCredentialsDetails: {
                    minVersion: 'TLSv1'
                },
                "enableArithAbort": true
            }
        },
        migrations: {
            directory: './migrations',
        },
        seeds: {
            directory: './seeds',
        },
    },
};

exports.keyJWT = "NhUNg_CoN_NgUAa!@#~";
