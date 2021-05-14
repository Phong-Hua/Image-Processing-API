"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var routes = express_1.default.Router();
routes.get('/', function (req, res) {
    var imageLocation = path_1.default.join(__dirname, '../../../images/', 'fjord.jpg');
    res.sendFile(imageLocation);
    // res.send('Main api');
});
exports.default = routes;
