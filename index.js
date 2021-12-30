const express = require("express");
const { XMLParser } = require("fast-xml-parser");
const moment = require("moment-timezone");
const fetch = require("cross-fetch");
const http = require("http");
const dotenv = require("dotenv");
dotenv.config();

const parseOptions = {
	ignoreAttributes: false,
};

const app = express();
const parser = new XMLParser(parseOptions);
const server = http.createServer(app);
const port = process.env.PORT;

let counter = {
	success: 0,
	fail: 0,
	error: 0,
};

// 仮キャッシュ
// 10分間データを保持、10分経ったデータは再読み込み
let requestCache = [];

// RSSからJSONへの変換URLへのリクエスト
app.get("/api/rss-json", async (req, res) => {
	console.log(`[${makeISOTimeString()}] Request received`);
	const start = new Date();
	const requestUrl = req.query.req_url;

	// XMLを取得する
	async function fetchXml(requestUrl) {
		const rss = await fetch(requestUrl);
		const rssData = await rss.text();
		return await parser.parse(rssData);
	}

	// XMLを取得するURLのパラメータがあるか
	if (requestUrl) {
		try {
			// キャッシュ検索
			const cacheIndex = requestCache.findIndex((item) => {
				item.requestUrl === requestUrl;
			});

			// キャッシュが存在した場合
			if (cacheIndex !== -1) {

				// キャッシュの有効期限が切れていた場合
				if ((start - requestCache[cacheIndex].requestTime) > 600000 ) {
					
					const rssJson = await fetchXml(requestUrl);
					requestCache[cacheIndex].requestTime = start;
					requestCache[cacheIndex].data = rssJson;

					res.status(200).send(rssJson);
					console.log(`cache refreshed`)
				} else {
					res.status(200).send(requestCache[cacheIndex].data);
					console.log(`response cache`)
				}
				
			} else {
				// キャッシュが存在しない場合
				const rssJson = await fetchXml(requestUrl);
				requestCache.push({
					requestUrl: requestUrl,
					requestTime: start,
					data: rssJson
				});
				res.status(200).send(rssJson);
				console.log(`data fetched`)
			}

			const end = new Date();
			console.log(`[${makeISOTimeString()}] Request processed in ${end - start}ms`);
			counter.success++;
			console.log(`[${makeISOTimeString()}] Access count : ${counter.success}`);
		} catch (error) {
			console.error(error);
			res.status(500).send();
			counter.fail++;
			throw error;
		}
	} else {
		// XML(RSS)を取得するURLのパラメータが指定されていない場合
		console.log(`[${makeISOTimeString()}] Request URL undefined`);
		// ステータス400でレスポンスを送信
		res.status(400).send("Request URL undefined");
		const end = new Date();
		console.log(`[${makeISOTimeString()}] Request processed in ${end - start}ms`);
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
				console.log(`[${makeISOTimeString()}] Reset success counter`);
			}
			if (queryScope.fail !== -1) {
				counter.fail = 0;
				console.log(`[${makeISOTimeString()}] Reset fail counter`);
			}
			if (queryScope.error !== -1) {
				counter.error = 0;
				console.log(`[${makeISOTimeString()}] Reset error counter`);
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

server.listen(port, async () => {
	console.log(`[${makeISOTimeString()}] Server listening on port ${port}`);
});

const makeISOTimeString = () => {
	return moment().tz("Asia/Tokyo").format();
};