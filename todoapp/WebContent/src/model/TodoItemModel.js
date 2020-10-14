//ユニークなIDを管理する変数
let todoIdx = 0;

//Todoアイテムモデルクラス
export class TodoItemModel{
	/**
     * @param {string} title Todoアイテムのタイトル
     * @param {boolean} completed Todoアイテムが完了済みならばtrue、そうでない場合はfalse
     */
	constructor({tytle, completed}){
		this.id = todoIdx++;
		this.tytle = tytle;
		this.completed = completed;
	}
}