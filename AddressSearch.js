//文章で各項目に説明を記述しました
//デバッグ用にconsole.logを記述しています

//strictモードで、当コードを実行する （strictモードでなくても、当コードなら挙動は変わらない）
'use strict';

//htmlのボタン要素（id = "btn"）をdocument.getElementByIdで取得しつつ、ボタン要素がクリック（'click'）されるとaddEventLIstenerメソッドにより関数C"request()"が実行されるようにする
document.getElementById('btn').addEventListener('click', request, false);

let  showPrefecture = document.getElementById(`prefecture`),
     showCity = document.getElementById('city'),
     showAddress = document.getElementById('address');

/*関数A    役割・・取得したJSONデータを画面に表示する*/
//if else文を使い、data.resultsがある場合はその結果を各項目欄に表示し、data.resultsが無い場合（=入力された郵便番号に該当する住所が存在しない場合）はalertを返す
//郵便番号検索APIからのレスポンスデータは配列（要素はオブジェクト）になっているので、JSON.parseメソッドを用いてレスポンスデータの中身(=data.results[0].'レスポンスデータ内のオブジェクトのkey')を値にしたブジェクトを作成し、変数showResultsに格納する
function getJSON(data) { 
    if (data.results) {
        let results = `{"都道府県" : "${data.results[0].address1}", "市区町村" : "${data.results[0].address2}", "住所" : "${data.results[0].address3}"}`;
        console.log(results);
        let showResults = JSON.parse(results);
        console.log(showResults.都道府県);
        document.dummy.text1.value = "showResults.都道府県";
     } else {alert('該当するデータが見つかりませんでした');};
};

console.log()
/*関数B    役割・・クロスサイト制約を回避するために、スクリプト要素を生成、追加、削除する*/
//まずはdocument.createElementメソッドでスクリプト要素を生成し、変数scに格納する
//次に、スクリプト要素（変数sc）でjavascriptが実行できるようにする（HTML5以降なら不要らしい）
//そして、スクリプトのソース（src属性）にリクエストURL（変数requestURL）を指定する
//生成したスクリプト要素を、document.appendChildメソッドでbody要素の末尾に追加する
//JSONデータが取得された後はスクリプト要素が不要となるので、document.removeChildメソッドで削除する
function tagForJSONP(requestURL) {
    let sc = document.createElement('script');
    sc.type = 'text/javascript';
    sc.src = requestURL;
    document.body.appendChild(sc);
    document.body.removeChild(sc);
};

/*関数C    役割・・入力された郵便番号を郵便番号検索APIに送信し、該当するデータを要求する */
//htmlの郵便番号欄（id = "zipcode"）の値（value）を取得し、変数zipcodeValueに格納する
//callbackに指定した関数（getJSON）を、変数getJSONFunctionに格納する
//リクエストURLを、変数requestURLに格納する
//変数requestURLを引数とし、関数B"tagForJSONP()"を実行する
function request() {
    let zipcodeValue = document.getElementById('zipcode').value;
    let getJSONFunction = 'getJSON';
    let requestURL = `https://zip-cloud.appspot.com/api/search?zipcode=${zipcodeValue}&callback=${getJSONFunction}`;
    tagForJSONP(requestURL);
    console.log(zipcodeValue);
};
