"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TaskSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'Please add some text']
    },
    date: {
        type: String,
        required: [true, 'Please add a date']
    },
    reminder: {
        type: Boolean,
        required: true
    }
});
exports.default = mongoose_1.default.model('Task', TaskSchema);
