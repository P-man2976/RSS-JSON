const express = require("express");
const { XMLParser, XMLBuilder, XMLValidator } = require("fast-xml-parser");
const fetch = require("cross-fetch");
const http = require("http");
const https = require("https");
const fs = require("fs");

const parseOptions = {
	ignoreAttributes: false,
};

const https_options = {
	cert: fs.readFileSync("/etc/letsencrypt/live/pman2976.f5.si/fullchain.pem"),
	key: fs.readFileSync("/etc/letsencrypt/live/pman2976.f5.si/privkey.pem"),
};

const app = express();
const parser = new XMLParser(parseOptions);
const server = http.createServer(app);
const secure = https.createServer(app);

let counter = {
	success: 0,
	fail: 0,
	error: 0,
};

// RSSからJSONへの変換URLへのリクエスト
app.get("/api/rss-json", async (req, res) => {
	console.log("Request received");
	const start = new Date();
	const requestUrl = req.query.req_url;

	// XMLを取得するURLのパラメータがあるか
	if (requestUrl) {
		try {
			// XML(RSS)を取得、JSONへパース
			const rss = await fetch(requestUrl);
			const rssData = await rss.text();

			const rssJson = await parser.parse(rssData);

			// ステータス200でレスポンスを送信
			res.status(200).send(rssJson);
			const end = new Date();
			console.log(`Request processed in ${end - start}ms`);
			counter.success++;
			console.log(`Access count : ${counter.success}`);
		} catch (error) {
			console.error(error);
			res.status(500).send();
			counter.fail++;
			throw error;
		}
	} else {
		// XML(RSS)を取得するURLのパラメータが指定されていない場合
		console.log("Request RSS URL undefined");
		// ステータス400でレスポンスを送信
		res.status(400).send("Request URL undefined");
		const end = new Date();
		console.log(`Request processed in ${end - start}ms`);
		counter.error++;
	}
});

// APIアクセスカウンターのリセットURLへのリクエスト
app.delete("/api/reset", async (req, res) => {
	try {
		if (req.query.scope) {
			const queryScope = {
				success: req.query.scope.indexOf("success"),
				fail: req.query.scope.indexOf("fail"),
				error: req.query.scope.indexOf("error"),
			};

			if (queryScope.success !== -1) {
				counter.success = 0;
				console.log("Reset success counter");
			}
			if (queryScope.fail !== -1) {
				counter.fail = 0;
				console.log("Reset fail counter");
			}
			if (queryScope.error !== -1) {
				counter.error = 0;
				console.log("Reset error counter");
			}
			res.status(200).send();
		} else {
			res.status(400).send("Reset scope undefined");
		}
	} catch (error) {
		console.error(error);
		res.status(500).send();
	}
});

const port = 19310;
const httpsPort = 19311;

server.listen(port, async () => {
	console.log(`Server listening on port ${port}`);
});

secure.listen(httpsPort, async () => {
	console.log(`HTTPS server listening on port ${httpsPort}`);
});
