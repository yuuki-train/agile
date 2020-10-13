//markedモジュールをインポートする。
const marked = require("marked");
//MarkdownファイルをHTML文字列に変換する。
module.exports = (markdown, cliOptions) =>{
	return marked(markdown,{
		gfm:cliOptions.gfm,
	});
};