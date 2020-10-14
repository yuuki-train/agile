import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { element, render } from "./view/html-util.js";

export class App{
	// 1. TodoListの初期化
	constructor(){
		this.todoListModel = new TodoListModel();
	}

	mount(){
		//ドキュメントの読み込み
		const formElement = document.querySelector("#js-form");
		const inputElement = document.querySelector("#js-form-input");
		const containerElement = document.querySelector("#js-todo-list");
		const todoItemCountElement = document.querySelector("#js-todo-count");

		// 2. TodoListModelの状態が更新されたら表示を更新する
		this.todoListModel.onChange(() => {
			// TodoリストをまとめるList要素
			const todoListElement = element`<ul />`;
			// それぞれのTodoItem要素をtodoListElement以下へ追加する
			const todoItems = this.todoListModel.getTodoItems();
			todoItems.forEach(item =>{
				const todoItemElement = item.completed
				? element`<li><input type="checkbox" class="checkbox" checked>
					<s>${item.title}</s>
					<button class="delete">x</button>
				</li>`
				: element`<li><input type="checkbox" class="checkbox">
					${item.title}
					<button class="delete">x</button>
				</li>`;
				// チェックボックスがトグルしたときのイベントにリスナー関数を登録
				const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
				inputCheckboxElement.addEventListener("change",() =>{
					// 指定したTodoアイテムの完了状態を反転させる
					this.todoListModel.updateTodo({
						id: item.id,
						completed: !item.completed
					});
				});
				// 削除ボタン(x)がクリックされたときにTodoListModelからアイテムを削除する
				const deleteButtonElement = todoItemElement.querySelector(".delete");
				deleteButtonElement.addEventListener("click", ()=>{
					this.todoListModel.deleteTodo({
						id: item.id
					});
				});
				todoListElement.appendChild(todoItemElement);
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
			// 新しいTodoアイテムをTodoListへ追加する
			this.todoListModel.addTodo(new TodoItemModel({
				title: inputElement.value,
				completed: false
			}));
			//入力値を空文字列にしてリセットする
			inputElement.value = "";
		});
	}
}