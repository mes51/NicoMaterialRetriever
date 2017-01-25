# NicoMaterialRetriever

---

## is何

AEのプロジェクト内に読み込んだニコニコ関連のファイルのID(sm9等)を抽出して一覧で出力するjsx

## How to Use

ファイル > スクリプト > スクリプトを実行 > NicoMaterialRetriever.jsxを選択

## How to Build

```
npm install -g yarn gulp
yarn install
gulp build
```

## Limitation

* ファイルを出力するため、AEの環境設定 > 一般設定から、「スクリプトによるファイルへの書き込みとネットワークへのアクセスを許可」を有効にする必要があります
* プロジェクトと同じディレクトリに出力する関係上、プロジェクト自体がどこかに保存されている必要があります
* 対応するファイル名のフォーマットは、行頭にID、もしくは区切り文字(\_、空白、/)の後ろからIDが始まっている必要があります
    * ex: sm9hoge.flx, test_sm9.flv等
* 対応するIDはsm、im、nc、lv、td、gmから始まるIDになります

## License

MIT
一部[こちらの記事](http://qiita.com/matsurai25/items/0682ea179c9f1239712b)のコードを参考にしている部分(entry.js)はそちらのライセンスに従います
