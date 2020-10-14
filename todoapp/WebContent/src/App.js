import { render } from "./view/html-util.js";
import { TodoListView } from "./view/TodoListView.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { TodoListModel } from "./model/TodoListModel.js";

export class App{
	// 1. TodoListの初期化
	constructor(){
		this.todoListView = new TodoListView();
		this.todoListModel = new TodoListModel([]);
	}

	/**
     * Todoを追加するときに呼ばれるリスナー関数
     * @param {string} title
     */
	handleAdd(title){
		this.todoListModel.addTodo(new TodoItemModel({title, completed: false }));
	}

	  /**
     * Todoの状態を更新したときに呼ばれるリスナー関数
     * @param {{ id:number, completed: boolean }}
     */
	handleUpdate({id, completed}){
		this.todoListModel.updateTodo({id, completed});
	}

	  /**
     * Todoを削除したときに呼ばれるリスナー関数
     * @param {{ id: number }}
     */
	handleDelete({id}){
		this.todoListModel.deleteTodo({id});
	}

	mount(){
		//ドキュメントの読み込み
		const formElement = document.querySelector("#js-form");
		const inputElement = document.querySelector("#js-form-input");
		const todoItemCountElement = document.querySelector("#js-todo-count");
		const containerElement = document.querySelector("#js-todo-list");

		// 2. TodoListModelの状態が更新されたら表示を更新する
		this.todoListModel.onChange(() => {
			// それぞれのTodoItem要素をtodoListElement以下へ追加する
			const todoItems = this.todoListModel.getTodoItems();
			 // todoItemsに対応するTodoListViewを作成する
			const todoListElement = this.todoListView.createElement(todoItems, {
				// Appに定義したリスナー関数を呼び出す
				onUpdateTodo:({id, completed}) =>{
					this.handleUpdate({id,completed});
				},
				onDeleteTodo:({id}) =>{
					this.handleDelete({id});
				}
			});

			// containerElementの中身をtodoListElementで上書きする
			render(todoListElement, containerElement);
			// アイテム数の表示を更新する
			todoItemCountElement.textContent = `Todoアイテム数 : ${this.todoListModel.getTotalCount()}`;
		});

	 	// 3. フォームを送信したら、新しいTodoItemModelを追加する
		//submitイベントをキャッチする
		formElement.addEventListener("submit", (event) =>{
			//submitイベント本来の動作を止める
			event.preventDefault();
			// Appに定義したリスナー関数を呼び出す
			this.handleAdd(inputElement.value);
			//入力値を空文字列にしてリセットする
			inputElement.value = "";
		});
	}
}