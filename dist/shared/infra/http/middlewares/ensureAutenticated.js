"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var auth_1 = __importDefault(require("../../../../config/auth"));
function ensureAutenticated(request, response, next) {
    var authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new Error("O token é necessário");
    }
    var _a = authHeader.split(' '), token = _a[1];
    try {
        var decoded = (0, jsonwebtoken_1.verify)(token, auth_1.default.jwt.secret);
        var sub = decoded.sub;
        request.user = {
            id: sub,
        };
        return next();
    }
    catch (_b) {
        throw new Error("Token inválido");
    }
}
exports.default = ensureAutenticated;
