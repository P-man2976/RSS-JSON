# RSS-JSON

パラメータに指定されたURLのRSS (XML) をjsonオブジェクトに変換しレスポンスを返すシンプルなAPIサーバです。

## How to use

### 起動

```
node index.js
```

### XML→JSON変換

```
GET /api/rss-json?req_url=[RSS Feed URL]
```

### カウンターリセット

```
DELETE /api/reset?scope=[success/fail/error(カンマ区切りで複数指定)]
```

## 使用ライブラリ

`fast-xml-parser`
`express`
`cross-fetch`
`moment-timezone`
`dotenv`
