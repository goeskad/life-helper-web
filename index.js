const express = require("express");
const app = express();
const axios = require("axios");

aiHost = process.env.AI_HOST;
aiToken = process.env.AI_TOKEN;

header = {
    'Authorization': `Bearer ${aiToken}`
}

let baseKey = "";
const apiKeyMiddleware = function(req, res, next) {
    // 从查询字符串或请求头中获取 API Key
    const theKey = req.query.base_key || req.get('base_key');
    if (theKey) {
        console.log("find base key", theKey);
        baseKey = theKey;
    }
    next();
};
app.use(apiKeyMiddleware);

app.set("view engine", "ejs");
// app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/getKbsQuestions", async (req, res) => {
    const userInput = req.body.input;
    try {
        console.log('get user input', req.body);
        const response = await axios.post(aiHost + "/getKbsQuestions", {text: userInput},
            {headers: header});
        res.send(response.data);
    } catch (error) {
        console.error(error.text);
        res.status(500).send("Error occurred");
    }
});

app.post("/chat", async (req, res) => {
    const userInput = req.body.input;
    const kbsQueries = req.body.kbsQueries;
    try {
        const response = await axios.post(aiHost + "/chat", 
            {text: userInput, kbsQueries: kbsQueries, kbsToken: baseKey},
            {headers: header});
        res.send(response.data);
    } catch (error) {
        console.error(error.text);
        res.status(500).send("Error occurred");
    }
});

app.listen(8080, () => console.log("Server started on port 3000"));
