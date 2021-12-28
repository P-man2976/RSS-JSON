const express = require('express');
const { parse } = require('rss-to-json')
const http = require('http');

const debugjson = 
{
  "status": "ok",
  "feed": {
    "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCL34fAoFim9oHLbVzMKFavQ",
    "title": "夜見れな/yorumi rena【にじさんじ所属】",
    "link": "https://www.youtube.com/channel/UCL34fAoFim9oHLbVzMKFavQ",
    "author": "夜見れな/yorumi rena【にじさんじ所属】",
    "description": "",
    "image": ""
  },
  "items": [
    {
      "title": "【back4blood】夜見れなとチャイチャイとフレンさんとマオマオのBack 4 Blood　B4B！B4B！B4B！ゾンビ撃つゲームだよ　２【夜見れな/にじさんじ】",
      "pubDate": "2021-12-27 15:26:08",
      "link": "https://www.youtube.com/watch?v=C7A1b9WI8ro",
      "guid": "yt:video:C7A1b9WI8ro",
      "author": "夜見れな/yorumi rena【にじさんじ所属】",
      "thumbnail": "https://i4.ytimg.com/vi/C7A1b9WI8ro/hqdefault.jpg",
      "description": "",
      "content": "",
      "enclosure": {
        "link": "https://www.youtube.com/v/C7A1b9WI8ro?version=3",
        "type": "application/x-shockwave-flash",
        "thumbnail": "https://i4.ytimg.com/vi/C7A1b9WI8ro/hqdefault.jpg"
      },
      "categories": []
    },
    {
      "title": "【作業】スケジュール年末年始作成！！何のゲームしよう…【夜見れな／にじさんじ】",
      "pubDate": "2021-12-27 10:43:49",
      "link": "https://www.youtube.com/watch?v=mAc3EjmNoOo",
      "guid": "yt:video:mAc3EjmNoOo",
      "author": "夜見れな/yorumi rena【にじさんじ所属】",
      "thumbnail": "https://i2.ytimg.com/vi/mAc3EjmNoOo/hqdefault.jpg",
      "description": "",
      "content": "",
      "enclosure": {
        "link": "https://www.youtube.com/v/mAc3EjmNoOo?version=3",
        "type": "application/x-shockwave-flash",
        "thumbnail": "https://i2.ytimg.com/vi/mAc3EjmNoOo/hqdefault.jpg"
      },
      "categories": []
    },
    {
      "title": "【マリオカート８】#マリカにじさんじ杯　本戦Cブロック夜見れな視点【夜見れな/にじさんじ】",
      "pubDate": "2021-12-26 11:00:27",
      "link": "https://www.youtube.com/watch?v=ls6pNQ-Mb8U",
      "guid": "yt:video:ls6pNQ-Mb8U",
      "author": "夜見れな/yorumi rena【にじさんじ所属】",
      "thumbnail": "https://i1.ytimg.com/vi/ls6pNQ-Mb8U/hqdefault.jpg",
      "description": "",
      "content": "",
      "enclosure": {
        "link": "https://www.youtube.com/v/ls6pNQ-Mb8U?version=3",
        "type": "application/x-shockwave-flash",
        "thumbnail": "https://i1.ytimg.com/vi/ls6pNQ-Mb8U/hqdefault.jpg"
      },
      "categories": []
    },
    {
      "title": "【＃夜見調査】リスナーから聞いたクリスマスの楽しい過ごし方やってみた【にじさんじ/夜見れな】",
      "pubDate": "2021-12-25 14:00:13",
      "link": "https://www.youtube.com/watch?v=TyxfyeRGfkw",
      "guid": "yt:video:TyxfyeRGfkw",
      "author": "夜見れな/yorumi rena【にじさんじ所属】",
      "thumbnail": "https://i1.ytimg.com/vi/TyxfyeRGfkw/hqdefault.jpg",
      "description": "",
      "content": "",
      "enclosure": {
        "link": "https://www.youtube.com/v/TyxfyeRGfkw?version=3",
        "type": "application/x-shockwave-flash",
        "thumbnail": "https://i1.ytimg.com/vi/TyxfyeRGfkw/hqdefault.jpg"
      },
      "categories": []
    },
    {
      "title": "【雑談】メリークリスマス　１２月すごーーく目が回った雑談【夜見れな／にじさんじ】",
      "pubDate": "2021-12-24 17:16:33",
      "link": "https://www.youtube.com/watch?v=19N2lSDaQo0",
      "guid": "yt:video:19N2lSDaQo0",
      "author": "夜見れな/yorumi rena【にじさんじ所属】",
      "thumbnail": "https://i2.ytimg.com/vi/19N2lSDaQo0/hqdefault.jpg",
      "description": "",
      "content": "",
      "enclosure": {
        "link": "https://www.youtube.com/v/19N2lSDaQo0?version=3",
        "type": "application/x-shockwave-flash",
        "thumbnail": "https://i2.ytimg.com/vi/19N2lSDaQo0/hqdefault.jpg"
      },
      "categories": []
    },
    {
      "title": "【３D歌ってみた】ebb and flow（Ray）【夜見れな/ 歌ってみた】",
      "pubDate": "2021-12-24 14:00:12",
      "link": "https://www.youtube.com/watch?v=J64qe6P3eO4",
      "guid": "yt:video:J64qe6P3eO4",
      "author": "夜見れな/yorumi rena【にじさんじ所属】",
      "thumbnail": "https://i3.ytimg.com/vi/J64qe6P3eO4/hqdefault.jpg",
      "description": "",
      "content": "",
      "enclosure": {
        "link": "https://www.youtube.com/v/J64qe6P3eO4?version=3",
        "type": "application/x-shockwave-flash",
        "thumbnail": "https://i3.ytimg.com/vi/J64qe6P3eO4/hqdefault.jpg"
      },
      "categories": []
    },
    {
      "title": "【#りりくらクリスマスライブ】３Dライブ🎅めり～くりすま～す🎅【にじさんじ/鷹宮リオン 天宮こころ 夜見れな 椎名唯華 ♔Lilly Crown】",
      "pubDate": "2021-12-23 12:12:38",
      "link": "https://www.youtube.com/watch?v=mLvo55zbTpo",
      "guid": "yt:video:mLvo55zbTpo",
      "author": "夜見れな/yorumi rena【にじさんじ所属】",
      "thumbnail": "https://i2.ytimg.com/vi/mLvo55zbTpo/hqdefault.jpg",
      "description": "",
      "content": "",
      "enclosure": {
        "link": "https://www.youtube.com/v/mLvo55zbTpo?version=3",
        "type": "application/x-shockwave-flash",
        "thumbnail": "https://i2.ytimg.com/vi/mLvo55zbTpo/hqdefault.jpg"
      },
      "categories": []
    },
    {
      "title": "【マリオカート８】練習をする日配信【夜見れな/にじさんじ】",
      "pubDate": "2021-12-22 12:27:05",
      "link": "https://www.youtube.com/watch?v=sLYcOfaXVYk",
      "guid": "yt:video:sLYcOfaXVYk",
      "author": "夜見れな/yorumi rena【にじさんじ所属】",
      "thumbnail": "https://i4.ytimg.com/vi/sLYcOfaXVYk/hqdefault.jpg",
      "description": "",
      "content": "",
      "enclosure": {
        "link": "https://www.youtube.com/v/sLYcOfaXVYk?version=3",
        "type": "application/x-shockwave-flash",
        "thumbnail": "https://i4.ytimg.com/vi/sLYcOfaXVYk/hqdefault.jpg"
      },
      "categories": []
    },
    {
      "title": "【Phasmophobia】皆さんの参加心よりお待ちしております。【夜見れな/にじさんじ】",
      "pubDate": "2021-12-20 08:05:26",
      "link": "https://www.youtube.com/watch?v=OkJ83wQg7G4",
      "guid": "yt:video:OkJ83wQg7G4",
      "author": "夜見れな/yorumi rena【にじさんじ所属】",
      "thumbnail": "https://i4.ytimg.com/vi/OkJ83wQg7G4/hqdefault.jpg",
      "description": "",
      "content": "",
      "enclosure": {
        "link": "https://www.youtube.com/v/OkJ83wQg7G4?version=3",
        "type": "application/x-shockwave-flash",
        "thumbnail": "https://i4.ytimg.com/vi/OkJ83wQg7G4/hqdefault.jpg"
      },
      "categories": []
    },
    {
      "title": "【マリオカート８】#マリカにじさんじ杯　Gブロック夜見れな視点【夜見れな/にじさんじ】",
      "pubDate": "2021-12-19 10:10:11",
      "link": "https://www.youtube.com/watch?v=9IfnECHqfYU",
      "guid": "yt:video:9IfnECHqfYU",
      "author": "夜見れな/yorumi rena【にじさんじ所属】",
      "thumbnail": "https://i2.ytimg.com/vi/9IfnECHqfYU/hqdefault.jpg",
      "description": "",
      "content": "",
      "enclosure": {
        "link": "https://www.youtube.com/v/9IfnECHqfYU?version=3",
        "type": "application/x-shockwave-flash",
        "thumbnail": "https://i2.ytimg.com/vi/9IfnECHqfYU/hqdefault.jpg"
      },
      "categories": []
    }
  ]
};

const app = express();
const server = http.createServer( app );

app.get ('/api/rss-json', async (req, res) => {
	
	console.log("Request received");
	const requestUrl = req.query.req_url;
	
	if(requestUrl) {
		try {
			
			const rss = await parse( requestUrl );
			
			console.log(rss);
			
			res.status(200).send(rss);
			
		} catch(error) {
			console.error(error);
			res.status(500).send()
			throw error;
		}
	} else if(req.query.debug) {
		res.status(200).send(debugjson)
		console.log("Sent debug response")
	} else {
		console.log("Request RSS URL undefined")
		res.status(400).send("Request URL undefined")
	}
})

const port = 19300;

server.listen(port, async () => {
	
	console.log(`Server listening on port ${port}`)
})
