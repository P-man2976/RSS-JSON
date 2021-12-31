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

### リセット（カウンター / キャッシュ）

```
DELETE /api/reset?scope=[success/fail/error/cache(カンマ区切りで複数指定)]
```

## 仕様

### キャッシュ

#### キャッシュの取得

RSS→JSON変換時、取得したRSS(XML)を10分間キャッシュ  
初めてアクセスするURL、前回取得してから10分を過ぎたURLはRSS(XML)リクエストを送信  
前回取得してから10分以内にリクエストされたURLはキャッシュを返却  

#### キャッシュの削除

setInterval関数によって10分ごとにキャッシュを巡回
前回取得から30分以上経過しているキャッシュは削除

### カウンター

- リクエストに対し正常にjsonを返却できた場合は`counter.success`の値に1加算
- リクエストが不正（パラメータ未指定など）の場合は`counter.fail`の値に1加算
- サーバの処理で問題が発生した場合は`counter.error`の値に1加算

## 使用ライブラリ

- `fast-xml-parser` : RSS(XML)のパースに使用
- `express` : APIサーバの構築に使用
- `cross-fetch` : RSS(XML)の取得に使用
- `moment-timezone` : ログ記録時の時刻文字列生成に使用
- `dotenv` : 環境変数の読み取り(.envファイルの読み取り)に使用
