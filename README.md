# NicoMaterialRetriever

---

## is何

AEのプロジェクト内に読み込んだニコニコ関連のファイルのID(sm9等)を抽出して一覧で出力するjsx

## How to Install/Uninstall

`(AEのあるディレクトリ)/Support Files/Scripts/ScriptUI Panels`にNicoMaterialRetriever.jsxを入れたのち、ウインドウメニューから表示してください。いらなくなったら消すだけでOKです

## Usage

* Export material id
    * IDのみをテキストとして出力します
* Export material id with info
    * IDとタイトル、作成者を取得し、csvとして出力します
* Add credit text layer
    * ボタン上部のフォーマットに従い、取得した情報を元にテキストレイヤーを作成します。フォーマットは以下のキーワードを取得した情報に置き換えます
        * %title%: タイトル
        * %user%: 作成者
        * %url%: 実際の動画・画像等へのURL
        * %id%: 抽出したID

## How to Build

```
npm install -g yarn gulp
yarn install
gulp build
```

## Limitation

* 情報をニコニコから取ってくる&ファイルを出力するため、AEの環境設定 > 一般設定から、「スクリプトによるファイルへの書き込みとネットワークへのアクセスを許可」を有効にする必要があります
* プロジェクトと同じディレクトリに出力する関係上、プロジェクト自体がどこかに保存されている必要があります
* 対応するファイル名のフォーマットは、行頭にID、もしくは区切り文字(\_、空白、/)の後ろからIDが始まっている必要があります
    * ex: sm9hoge.flx, test_sm9.flv等
* 対応するIDはsm、im、nc、lv、td、gmから始まるIDになります
* 取得する情報はgmのみ非対応になります
* ExtendScriptのSocket自体が微妙に不安定なため、たまに情報を取り損ねます

## License

MIT
一部[こちらの記事](http://qiita.com/matsurai25/items/0682ea179c9f1239712b)のコードを参考にしている部分(entry.js)はそちらのライセンスに従います
