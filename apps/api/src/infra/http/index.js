"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var node_server_1 = require("@hono/node-server");
var app_1 = require("@infra/http/app");
(0, node_server_1.serve)({
    fetch: app_1.app.fetch,
    port: process.env.PORT,
}, function (info) {
    console.log("Server is running on http://localhost:".concat(info.port));
});
