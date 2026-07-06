# manaba-download-router-firefox

Manabaからダウンロードするファイルを自動でフォルダ分けする拡張機能のFirefox版

## これは何？

manabaからファイルをダウンロードする際に、`manaba-downloads/[コース名(科目名)]`に自動でフォルダ分けする拡張機能。 [manaba-download-router](https://github.com/otofu7741/manaba-download-router)の非公式Firefox版。

例：科目名 "線形代数総論A" のコースページで、ファイル "演習1.pdf" をダウンロードした場合、 `manaba-downloads/線形代数総論A/演習1.pdf` に保存されます。

## 開発方法

### 開発用ビルド

`.output/firefox-mv3`が生成される。

```sh
npm run build:firefox 
```

### リリースビルド

`.output/manaba-download-router-[version]-firefox.zip`が生成される。

```sh
npm run compile
npm run zip:firefox
```
