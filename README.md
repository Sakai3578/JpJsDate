# これは何？

jQueryを利用して、HTML上で

- 直接入力した数値を日付や月に変換するフォーム、
- 上記日付フィールドに時刻選択モーダルを追加した日時入力フォーム

の２点を実装するJavaScriptコード。
例えば業務用システムなど同じ人が繰り返し使用するようなWebアプリにおいて、HTML標準の日付入力フォーム（Dateピッカー形式）では不便な場合に便利です。

# 使い方

JpJsDate.jsをインポートした上、HTML上の対象inputタグに対して以下のclassを付与します。
- class="JpJsDate-datetime"（時刻選択モーダル付き日時入力フィールド）
- class="JpJsDate-date"（日付入力フィールド）
- class="JpJsDate-month"（月入力フィールド）

尚、JpJsDate-datetimeのみ、モーダルからの値受け渡し処理で使用するためid属性が必須です。

# デモ動画

## JpJsDate-datetime（時刻選択モーダル付き日時入力フィールド）

https://user-images.githubusercontent.com/36692455/187461772-9e10d39b-144c-44b7-926e-8abb25a65300.mp4


## JpJsDate-date（日付入力フィールド）

https://user-images.githubusercontent.com/36692455/187461699-63feafcb-209d-4313-ba7a-883a5ecdc26b.mp4


## JpJsDate-month（月入力フィールド）

https://user-images.githubusercontent.com/36692455/187461548-6d4d9bea-ee24-4cf1-bab6-468f0415808c.mp4

