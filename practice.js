// 学習用にコメントをつけています

// strictモードで本コードを実行する
'use strict';

// 入力された郵便番号を郵便番号検索APIにリクエストし、該当するJSONデータを取得するための関数
// window.onloadイベント使う事で、HTMLを最後まで読み込んでからこの関数が実行されるようにする
window.onload = function() {

    // ボタン要素を取得し、変数btnに格納する
    const btn = document.getElementById('btn');

    // addEventListenerメソッドを使い、ボタン要素がクリック（'onclick'）されたら下記関数の実行が開始されるようにする
    btn.addEventListener('click', function(){

        // クロスドメイン制約を回避するために、script要素を生成する
        const script = document.createElement('script');

        // 郵便番号欄（id = 'zipcode'）に入力された値（value）を、変数zipcodeに格納する
        const zipcode = document.getElementById('zipcode').value;

        // setAttributeメソッドを使い、script要素のscr属性にリクエストURLを設定する
        script.setAttribute('src', `https://zip-cloud.appspot.com/api/search?zipcode=${zipcode}&callback=callback`);

        // 生成したscropt要素をbody要素の最後の部分（= </body>の直前）に追加し、データを読み込んだ後は不要なので削除する
        document.body.appendChild(script);
        document.body.removeChild(script);

    // addEventListenerメソッドの第３引数を省略した場合、初期値のfalseで処理される
});
};


// レスポンスされたJSONデータ（data）を引数とし、その内容を表示するための関数
function callback(data) {

    // if else関数を使い、JSONデータが存在すれば各項目欄にその内容を表示し、存在しない場合（= 入力された郵便番号が存在しない）はalertを返すようにする
    if(data.results) {

        // レスポンスされたJSONデータはオブジェクトを配列形式に並べたものなので、インデックス番号'0'の要素（オブジェクト）を変数resultに格納する
        const result = data.results[0];

        // 変数resultに格納されたオブジェクトの、address1の値を都道府県欄（id = 'prefecture'）の値（value）に代入することで、都道府県の欄に都道府県名を表示する（以下、２つも同様）
        document.getElementById('prefecture').value = result.address1;

        // 市区町村欄に市区町村名を表示する
        document.getElementById('city').value = result.address2;

        // 住所欄に地域名を表示する
        document.getElementById('address').value = result.address3;
    }
    else {

        //alertで表示される文字を記述する
        alert('該当するデータが見つかりませんでした');
    };
};
