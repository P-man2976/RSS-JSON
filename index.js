const express = require("express");
const { XMLParser, XMLBuilder, XMLValidator} = require('fast-xml-parser');
const fetch = require('cross-fetch');
const http = require("http");

const app = express();
const parser = new XMLParser();
const server = http.createServer(app);

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
			console.log(`Access count : ${counter.success}`)
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
		const query = req.query.scope;

		const queryScope = {
			success: query.includes("success"),
			fail: query.includes("fail"),
			error: query.includes("error"),
		};

		if (queryScope.success === true) {
			counter.success = 0;
		}
		if (queryScope.fail === true) {
			counter.fail = 0;
		}
		if (queryScope.error === true) {
			counter.error = 0;
		}
		res.status(200).send()
	} catch (error) {
		console.error(error);
		res.status(500).send()
	}
});

const port = 19310;

server.listen(port, async () => {
	console.log(`Server listening on port ${port}`);
});
