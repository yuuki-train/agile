//メイン処理
async function main(){
	try{
		//1. リクエストを取得する
		const userId = getUserId();
		const userInfo = await fetchUserInfo(userId);
		//2. リクエストをHTMLで組み立てる
		const view = createView(userInfo);
		//3. HTML文を置き換える
		displayView(view);
		//エラーキャッチ
	}catch(error) {
		console.error(`エラーが発生しました(${error})`);
	}

}

//以下詳細処理
//1. リクエストを取得する
function fetchUserInfo(userId){
	return fetch(`https://api.github.com/users/${encodeURIComponent(userId)}`)
		.then(response => {
			//エラーレスポンスの検知
			if(!response.ok){
				//エラーレスポンスからRejectedなPromiseを作成する。
				return Promise.reject(new Error(`${response.status}: ${response.statusText}`));
			}else{
				return response.json();
			}

		});
}

//ユーザIDを取得する
function getUserId() {
    return document.getElementById("userId").value;
}

//2. リクエストをHTML文で組み立てる
function createView(userInfo){
	return escapeHTML`
	<h4>${userInfo.name}(@${userInfo.login})<h4>
	<img src="${userInfo.avatar_url}" alt="${userInfo.login}" height="100">

	<dl>
	<dt>Location</dt>
	<dd>${userInfo.location}</dd>
	<dt>Repositories</dt>
	<dd>${userInfo.public_repos}</dd>
	</dl>
	`;
}

//3. HTML文を置き換える
function displayView(view){
	const result = document.getElementById("result");
	result.innerHTML = view;
}

//以下補助処理
//1.1 特殊文字をエスケープする
function escapeSpecialChars(str){
	return str
		.replace(/&/g,"&amp;")
		.replace(/</g,"&lt;")
		.replace(/>/g,"&gt;")
		.replace(/"/g,"&quot;")
		.replace(/'/g,"&#039;");
}

//1.2 タグ関数で文字列型をエスケープする。
function escapeHTML(strings, ...values){
	return strings.reduce((result, str, i) => {
		const value = values[i - 1];
		if(typeof value === "string"){
			return result + escapeSpecialChars(value) + str;
		}else{
			return result + String(value) + str;
		}
	});
}