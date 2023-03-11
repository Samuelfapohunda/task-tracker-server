"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const Task_1 = __importDefault(require("../models/Task"));
const app = (0, express_1.default)();
//Configure middleware
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
dotenv_1.default.config({ path: path_1.default.resolve('./config/config.env') });
mongoose_1.default.connect(process.env.MONGO_URI || '', {});
const db = mongoose_1.default.connection;
db.once("open", () => {
    console.log("connected to database");
});
const PORT = process.env.PORT || 2500;
//Define routes
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield Task_1.default.find();
    res.json(tasks);
}));
app.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, date, reminder } = req.body;
    const task = new Task_1.default({ name, date, reminder });
    yield task.save();
    res.json(task);
}));
app.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = req.params.id;
    try {
        const task = yield Task_1.default.findByIdAndDelete(taskId);
        if (!task) {
            return res.status(404).send('Task Not Found');
        }
        else {
            res.json({ msg: 'Task Deleted' });
        }
    }
    catch (err) {
        console.error('error');
        res.status(500).send('Server error');
    }
}));
const server = app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
