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

## 仕様

### キャッシュ

RSS→JSON変換時、取得したRSS(XML)を10分間キャッシュ  
初めてアクセスするURL、前回取得してから10分を過ぎたURLはRSS(XML)リクエストを送信  
前回取得してから10分以内にリクエストされたURLはキャッシュを返却  

## 使用ライブラリ

- `fast-xml-parser` : RSS(XML)のパースに使用
- `express` : APIサーバの構築に使用
- `cross-fetch` : RSS(XML)の取得に使用
- `moment-timezone` : ログ記録時の時刻文字列生成に使用
- `dotenv` : 環境変数の読み取り(.envファイルの読み取り)に使用
