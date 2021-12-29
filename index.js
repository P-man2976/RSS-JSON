const express = require("express");
const { XMLParser, XMLBuilder, XMLValidator} = require('fast-xml-parser');
const fetch = require('cross-fetch');
const http = require("http");
const https = require("https");
const fs = require("fs")

const parseOptions = {
	ignoreAttributes: false
}

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
secure.get("/api/rss-json", async (req, res) => {
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
secure.delete("/api/reset", async (req, res) => {
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

server.get('/api/rss-json', async (req, res) => {
	res.redirect('https://pman2976.f5.si:19311/api/rss-json');
})

const port = 19310;
const httpsPort = 19311;

server.listen(port, async () => {
	console.log(`Server listening on port ${port}`);
});

secure.listen(httpsPort, async () => {
	console.log(`HTTPS server listening on port ${httpsPort}`)
})
