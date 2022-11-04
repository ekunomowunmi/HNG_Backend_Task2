"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const Operation_Type_enum_1 = require("./Operation-Type.enum");
const app = (0, express_1.default)();
// Set the network port
const port = 3004;
let user = {
    slackUsername: "Omowunmi Ekun",
    backend: true,
    age: 25,
    bio: "I love to learn"
};
app.use((0, cors_1.default)());
// Use the body parser middleware for post requests
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
// Root Endpoint
// Displays a simple message to the user
app.get("/", (req, res) => {
    res.json(user);
});
app.post("/perform-operation", (req, res) => {
    let body = req.body;
    let result = 0;
    if (body) {
        if (typeof (body.x) !== 'number' || typeof (body.y) !== 'number') {
            return res.status(400).json({ error: 'Invalid Numbers' });
        }
        if (!Number.isInteger(body.x) || !Number.isInteger(body.y)) {
            {
                return res.status(400).json({ error: 'Invalid : Must be an Integer' });
            }
        }
        switch (body.operation_type) {
            case Operation_Type_enum_1.OperationType.addition:
                result = body.x + body.y;
                break;
            case Operation_Type_enum_1.OperationType.subtraction:
                result = body.x - body.y;
                break;
            case Operation_Type_enum_1.OperationType.multiplication:
                result = body.x * body.y;
                break;
            default:
                return res.status(500).json({ error: 'Invalid Operation Type' });
        }
        // { “slackUsername”: String, “result”: Integer, “operation_type”: Enum.value }
        return res.status(200).json({ "slackUsername": 'Omowunmi Ekun', "result": result, "operation_type": body.operation_type });
    }
});
// Start the Server
app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
});
