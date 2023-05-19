const fetch = require('node-fetch');

const express = require("express");
const app = express();
const axios = require("axios");

const aiHost = process.env.AI_HOST;
const aiToken = process.env.AI_TOKEN;

const header = {
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

app.post("/chat", async (req, res) => {
    const userInput = req.body.input;
    const kbsQueries = req.body.kbsQueries;
    try {
        const response = fetch("https://api.openai.com/v1/chat/completions", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": "{\"max_tokens\":1000,\"model\":\"gpt-3.5-turbo\",\"temperature\":0.8,\"top_p\":1,\"presence_penalty\":1,\"messages\":[{\"role\":\"system\",\"content\":\"You are ChatGPT, a large language model trained by OpenAI. Follow the user's instructions carefully. Respond using markdown.\"},{\"role\":\"user\",\"content\":\"df\"}],\"stream\":true}",
        }
        );
        console.log("get response", response);
        res.send(response.data);
    } catch (error) {
        console.error(error.text);
        res.status(500).send("Error occurred");
    }
});

app.listen(8080, () => console.log("Server started on port 3000"));
