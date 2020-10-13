//モジュールをインポートする。
const program = require("commander");
const fs = require("fs");
const md2html = require("./md2html");

//GFMオプションを定義する。
program.option("--gfm", "GFMを有効にする")
//コマンドライン引数をパースする。
program.parse(process.argv);
//ファイルパスをprogram.args配列から取り出す。
const filePath = program.args[0];

//コマンドライン引数のオプションを取得し、デフォルト（gfm:false）を上書きする
const cliOptions = {
	gfm: false,
	...program.opts(),
};

//ファイルを非同期で読み込む。
fs.readFile(filePath,{encoding:"utf8"},(err, file) => {
	//エラー処理
	if(err){
		console.error(err.message);
		//終了ステータス1でプロセス終了
		process.exit(1);
		return;
	}
	//md2htmlモジュールを用いてHTML文字列に変換する。
	const html = md2html(file,cliOptions);
	console.log(html);
});