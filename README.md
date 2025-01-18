# 大学入学共通テスト試験場MAP
大学入学共通テスト試験場MAPサイトのソースコードです。

## サイトの基本情報
- サイト名: 大学入学共通テスト試験場MAP
- URL: https://tochirinuru.com/maps/ueeh/

![ueeh_site_capture](https://github.com/user-attachments/assets/3d449ff6-7886-47ae-a560-1b1556067197)

## サイトの概要および詳細
- 大学共通テストの試験場を地図上にマッピングして表示するサイトです。
- 詳細については下記ページを参照してください。
- URL: https://tochirinuru.com/maps/ueeh/overview.html

## ディレクトリ・ファイル構成
- /（root）
  - `index.html`: Web地図の表示
  - `main.js`: スクリプトファイル
  - `overview.html`: サイトの説明
  - `style.css`: CSSの定義
- geofiles/
  - 試験場情報を記載したGeoJSONファイルの格納
- img/
  - アイコン画像ファイルの格納

## ライブラリ
- MapLibre GL JS
  - URL: https://maplibre.org/projects/maplibre-gl-js/

## ソース
### レイヤ
- 国土地理院（地理院タイル）
  - 標準地図、淡色地図、白地図
    - URL: https://maps.gsi.go.jp/development/ichiran.html
  - 空中写真
    - URL: https://maps.gsi.go.jp/development/ichiran.html#seamlessphoto
- OpenStreetMap
  - URL: https://www.openstreetmap.org/copyright/ja

## 更新履歴
- 2025-01-18（Ver.1.0.0）: サイト公開
