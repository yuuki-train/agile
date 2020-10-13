//テストコード

//モジュールインストール
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const md2html = require("../md2html");

//GFM無しの場合
it("converts Markdown to HTML (GFM=false)", () => {
    // fs.readFileSyncは同期的にファイルを読み込むメソッド
    const sample = fs.readFileSync(path.resolve(__dirname, "./fixtures/sample.md"), { encoding: "utf8" });
    const expected = fs.readFileSync(path.resolve(__dirname, "./fixtures/expected.html"), { encoding: "utf8" });
    // 末尾の改行の有無の違いを無視するため、変換後のHTMLのスペースをtrimメソッドで削除してから比較しています
    assert.strictEqual(md2html(sample, { gfm: false }).trimEnd(), expected.trimEnd());
});

//GFMありの場合
it("converts Markdown to HTML (GFM=true)", () => {
    const sample = fs.readFileSync(path.resolve(__dirname, "./fixtures/sample.md"), { encoding: "utf8" });
    const expected = fs.readFileSync(path.resolve(__dirname, "./fixtures/expected-gfm.html"), { encoding: "utf8" });
    // 末尾の改行の有無の違いを無視するため、変換後のHTMLのスペースをtrimメソッドで削除してから比較しています
    assert.strictEqual(md2html(sample, { gfm: true }).trimEnd(), expected.trimEnd());
});
