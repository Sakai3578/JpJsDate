$(function() {
    //日時フォーマット（JpJsDate-datetimeクラスを付与したinputフィールド）
    $(document).on('focus', '.JpJsDate-datetime', function() {
        let modal_class_name = 'JpJsDate-time-input-modal';
        $(`.${modal_class_name}`).remove();

        //現在の入力時刻を取得
        let currentValSplit = $(this).val().split(' ');
        let currentHour = 0;
        let currentMinute = 0;
        if (currentValSplit.length === 2) {
            let timePartSplit = currentValSplit[1].split(':');
            if (timePartSplit.length === 2 && !isNaN(timePartSplit[0]) && !isNaN(timePartSplit[1]) && Number(timePartSplit[0]) <= 23 && Number(timePartSplit[1]) <= 59) {
                currentHour = Number(timePartSplit[0]);
                currentMinute = Number(timePartSplit[1]);
            }
        }

        let position = $(this).position();

        //モーダルをビルド
        let modalHtml = `<div class="${modal_class_name}"
                 style="position: absolute;
                        background-color: #444;
                        align-items: center;
                        color: #fff;
                        border-radius: 1px;
                        padding: 5px;
                        top: ${position["top"] + 18}px;
                        left: ${position["left"]}px;">
                <div style="display: flex">
                    <div>
                        <span>時</span><br>
                        <select name="JpJsDate-hour" style="width: 60px;" size="12">`;
        for (h = 0; h < 24; h++) {
            modalHtml += `<option value="${h}">${h}</option>`;
        }
        modalHtml += '    </select>';
        modalHtml += '</div>';
        modalHtml += '<div>';
        modalHtml += '    <span>分</span><br>';
        modalHtml += '    <select name="JpJsDate-minute" style="width: 60px;" size="12">`;';
        for (m = 0; m < 24; m++) {
            modalHtml += `<option value="${m}">${m}</option>`;
        }
        modalHtml += `</select>
                            </div>
                        </div>
                        <div style="display: flex">
                            <button type="button" onclick="JpJsDate_time_submit('${$(this).attr("id")}', $('[name=JpJsDate-hour]').val(), $('[name=JpJsDate-minute]').val()); $('.${modal_class_name}').remove();">決定</button>
                            <button type="button" onclick="$('.${modal_class_name}').remove();">中止</button>
                        </div>
                    </div>`;

        //モーダルを追加
        $('body').append(modalHtml);

        //selectタグの選択変更処理
        $('[name=JpJsDate-hour]').val(String(currentHour));
        $('[name=JpJsDate-minute]').val(currentMinute);
    });
    $(document).on('keydown', '.JpJsDate-datetime', function(e) {
        if (e.keyCode === 9) {
            //モーダル除去
            $(`.JpJsDate-time-input-modal`).remove();
        }
    });

    //日時フォーマット（JpJsDate-datetimeクラスを付与したinputフィールド）
    $(document).on('change', '.JpJsDate-datetime', function() {
        //モーダル除去
        $(`.JpJsDate-time-input-modal`).remove();

        //入力値を取得
        let val = $(this).val();
        if (val === '') {
            return;
        }

        //入力値を日付テキストに変換
        let valSplit = val.split(' ');
        let dateText = to_datetime_text(valSplit[0]);

        if (typeof dateText === "undefined" || valSplit.length > 2) {
            //第1パートが日付ではないまたはスペース区切りで3パーツ以上ある場合、値を消去
            $(this).val('');
        } else if (valSplit.length === 1) {
            $(this).val(dateText);
        } else if (valSplit.length === 2 && !valSplit[1].match(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/)) {
            //第2パートが時間フォーマットではない場合、値を消去
            $(this).val('');
        } else {
            $(this).val(`${dateText} ${valSplit[1]}`);
        }
    });
    //日付フォーマット（JpJsDate-dateクラスを付与したinputフィールド）
    $(document).on('change', '.JpJsDate-date', function() {
        //入力値を取得
        let val = $(this).val();
        if (val === '') {
            return;
        }
        //入力値を日付テキストに変換
        let text = to_date_text(val);
        if (typeof text === "undefined") {
            $(this).val('');
        } else {
            $(this).val(text);
        }
    });
    //月フォーマット（JpJsDate-monthクラスを付与したinputフィールド）
    $(document).on('change', '.JpJsDate-month', function() {
        //入力値を取得
        let val = $(this).val();
        if (val === '') {
            return;
        }
        //入力値を月テキストに変換
        let text = to_month_text(val);
        if (typeof text === "undefined") {
            $(this).val('');
        } else {
            $(this).val(text);
        }
    });
});
//時刻モーダル選択後処理
function JpJsDate_time_submit(inputFieldId, hour, minute) {
    let currentValue = $(`#${inputFieldId}`).val();
    let hourAsNum = Number(hour);
    let minuteAsNum = Number(minute);
    let timeText = `${hourAsNum > 10 ? '' : '0'}${hourAsNum}:${minuteAsNum < 10 ? '0' : ''}${minuteAsNum}`;

    let currentValueSp = currentValue.split(' ');
    let currentDateText = to_date_text(currentValueSp[0]);
    if (typeof currentDateText === "undefined") {
        let now = new Date();
        $(`#${inputFieldId}`).val(`${now.getFullYear()}/${now.getMonth() + 1 < 10 ? '0' : ''}${now.getMonth() + 1}/${now.getDate() < 10 ? '0' : ''}${now.getDate()} ${timeText}`);
    } else {
        console.log(currentValueSp[0]);
        console.log(timeText);
        $(`#${inputFieldId}`).val(`${currentDateText} ${timeText}`);
    }
}
//時刻省略可能日次の入力後フォーマット処理
function to_datetime_text(text) {
    let sp = text.split(' ')
    if (sp.length === 1) {
        //時刻パートがない場合、日付入力フォーマット処理
        return to_date_text(text);
    } else {
        let sp2IsTimeFormat = text.match(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/);
        if (sp2IsTimeFormat) {
            return `${to_date_text(text)} ${sp[1]}`;
        }
    }    
}
//数値テキストからyyyy/MM/dd形式に変換する関数。変換不能の場合はundefined
function to_date_text(str) {

    //全角数値を半角に変換
    str = str.replace(/[０-９]/g, function(s) {return String.fromCharCode(s.charCodeAt(0) - 0xFEE0)});
    let year = 0;
    let month = 0;
    let day = 0;
    //入力値が意図するymd値を推論する処理
    if (str.indexOf('/') !== -1 || str.indexOf('-') !== -1) {
        //日付形式で入力された場合

        if (str.length >= 6) {
            //入力値が2022/5/1形式のケース
            
            //日付として正しいかの判定
            let date = new Date(str);
            if (!isNaN(date.getDate())) {
                year = date.getFullYear();
                month = date.getMonth() + 1;
                day = date.getDate();
            }
        } else {
            //入力値が5/1形式のケース

            if (str.indexOf('/') !== -1) {
                var sp = str.split('/');
            } else if (str.indexOf('-') !== -1) {
                var sp = str.split('-');
            }
            year = new Date().getFullYear();
            month = sp[0];
            day = sp[1];;
        }

    } else {
        //数値のみで入力された場合

        //数値変換できない値であればフォームを空にして終了
        if (isNaN(str) || str === null || str === '') {
            return;
        }

        //文字列から年月日を推定
        if (str.length === 1 || str.length === 2) {
            //1~2文字の場合、年・月は現在時刻を使用
            year = new Date().getFullYear();
            month = new Date().getMonth() + 1;
            day = parseFloat(str);
        } else if (str.length === 3) {
            //3文字の場合、年は現在時刻を使用
            year = new Date().getFullYear();
            month = parseFloat(str[0]);
            day = parseFloat(str.substr(1, 2));
        } else if (str.length === 4) {
            //4文字の場合、年は現在時刻を使用
            year = new Date().getFullYear();
            month = parseFloat(str.substr(0, 2));
            day = parseFloat(str.substr(2, 2));
        } else if (str.length === 8) {
            //8文字の場合
            year = parseFloat(str.substr(0, 4));
            month = parseFloat(str.substr(4, 2));
            day = parseFloat(str.substr(6, 2));
        }
    }

    //ymd数値が日付として正しいか否かの判定→正しければ、フォーマットして返却
    let date_text = `${year}/${month}/${day}`;
    let date = new Date(date_text);
    if (isNaN(date.getDate())) {
        return;
    } else {
        return `${year}/${month <= 9 ? '0' : ''}${month}/${day <= 9 ? '0' : ''}${day}`;
    }
}
//数値テキストからyyyy/MM（年月）形式に変換する関数。変換不能の場合はundefined
function to_month_text(str) {
    //全角数値を半角に変換
    str = str.replace(/[０-９]/g, function(s) {return String.fromCharCode(s.charCodeAt(0) - 0xFEE0)});
    let year = 0;
    let month = 0;

    //入力値が意図するym値を推論する処理
    if (str.indexOf('/') !== -1 || str.indexOf('-') !== -1) {
        //日付形式で入力された場合

        if (str.length === 5 || str.length === 6) {
            //入力値が2022/9,2022/10形式のケース
            var sp = str.replaceAll('-', '/').split('/')
            if (sp.length === 2 && !isNaN(sp[0]) && !isNaN(sp[1])) {
                year = parseFloat(sp[0]);
                month = parseFloat(sp[1]);
            }
        } else if (str.length === 4 || str.length === 5) {
            //入力値が22/9,22/10形式のケース
            var sp = str.replaceAll('-', '/').split('/')
            if (sp.length === 2 && !isNaN(sp[0]) && !isNaN(sp[1])) {
                year = parseFloat(sp[0]) + 2000;
                month = parseFloat(sp[1]);
            }
        }

    } else {
        //数値のみで入力された場合

        //数値変換できない値であればフォームを空にして終了
        if (isNaN(str) || str === null || str === '') {
            return;
        }

        //文字列から年月日を推定
        if (str.length === 1 || str.length === 2) {
            //1~2文字の場合、月のみ入力と判断→年は現在時刻を使用
            year = new Date().getFullYear();
            month = parseFloat(str);
        } else if (str.length === 3) {
            //3文字の場合、yymで変換
            year = parseFloat(str.substr(0, 2)) + 2000;
            month = parseFloat(str[2]);
        } else if (str.length === 4) {
            //4文字の場合、yymmで変換
            year = parseFloat(str.substr(0, 2)) + 2000;
            month = parseFloat(str.substr(2, 2));
        } else if (str.length === 5) {
            //5文字の場合、yyyymmで変換
            year = parseFloat(str.substr(0, 4));
            month = parseFloat(str[4]);
        } else if (str.length === 6) {
            //6文字の場合、yyyymmで変換
            year = parseFloat(str.substr(0, 4));
            month = parseFloat(str.substr(4, 2));
        }
    }

    //ymd数値が日付として正しいか否かの判定→正しければ、フォーマットして返却
    let date_text = `${year}/${month}/${1}`;
    let date = new Date(date_text);
    if (isNaN(date.getDate())) {
        return;
    } else {
        return `${year}/${month <= 9 ? '0' : ''}${month}`;
    }
} 
