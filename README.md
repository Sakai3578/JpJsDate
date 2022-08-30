# JpJsDate

【主に日本における業務システム向け、日付・時刻・月度入力HTMLフィールド】

jQueryを利用して、HTML上で

- 直接入力した数値を日付や月に変換するフォーム、
- 上記日付フィールドに時刻選択モーダルを追加した日時入力（日時に加えて日付のみの入力も許容）フォーム

を実装するJavaScriptコード。
例えば業務用システムなど同じ人が繰り返し使用するようなWebアプリにおいて、HTML標準の日付入力フォーム（type="date"で利用可能な日付ピッカー形式）では不便な場合に便利です。

<a href="https://docs.sakai-sc.co.jp/demo/jquery-date-input.html" target="_blank" rel="noopener noreferrer">作成者Webサイトデモページを展示しています</a>


# 使い方 How To Use

jQueryとJpJsDate.jsをインポートした上、HTML上の対象inputタグ（type="text"）に対して以下のclassを付与します。
- class="JpJsDate-datetime"（時刻選択モーダル付き日時入力フィールド）
- class="JpJsDate-date"（日付入力フィールド）
- class="JpJsDate-month"（月入力フィールド）

尚、JpJsDate-datetimeのみ、モーダルからの値受け渡し処理で使用するためid属性が必須です。


# デモ動画 Demo

## JpJsDate-datetime（時刻選択モーダル付き日付または日時入力フィールド）

日付または日時入力フィールドは、日付または日付＋時刻の形式を許容して、その他を空欄にします。

入力された数値やスラッシュを解析してyyyy/MM/ddまたはyyyy/MM/dd hh:mm形式に自動フォーマットします。

また、フォーカス時に時：分の選択モーダルが表示されます。

https://user-images.githubusercontent.com/36692455/187461772-9e10d39b-144c-44b7-926e-8abb25a65300.mp4


## JpJsDate-date（日付入力フィールド）

日付入力は、入力された数値やスラッシュを解析してyyyy/MM/dd形式に自動フォーマットし、形式不正の場合は空欄にします。

https://user-images.githubusercontent.com/36692455/187461699-63feafcb-209d-4313-ba7a-883a5ecdc26b.mp4

## JpJsDate-month（月入力フィールド）

月入力は、入力された数値やスラッシュを解析してyyyy/MM形式に自動フォーマットし、形式不正の場合は空欄にします。

https://user-images.githubusercontent.com/36692455/187461548-6d4d9bea-ee24-4cf1-bab6-468f0415808c.mp4

