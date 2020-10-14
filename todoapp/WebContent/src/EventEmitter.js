// EventEmmiterクラスの作成
export class EventEmitter{
	//登録する｛イベント名, Set(リスナー関数)｝をMapで管理する。
	constructor(){
		this._listeners = new Map();
	}

	/**
 	 *指定したイベントが呼び出された時に呼び出される、リスナー関数を登録する。
 	 *@param{string} type イベント名
 	 *@param{function} listener イベントリスナー
 	 */
	addEventListener(type, listener){
		//イベント名が登録されていない場合→
		//イベント名typeとSet（リスナー関数を呼び出す）をMapに新規登録
		if(!this._listeners.has(type)){
			this._listeners.set(type, new Set());
		}
	//イベント名をlistenerSetに登録する
	const listenerSet = this._listeners.get(type);
	listenerSet.add(listener);
	}

	/**
     * 指定したイベントをディスパッチする
     * @param {string} type イベント名
     */
	emit(type){
		//指定したイベントに対するSetを取り出し、全てのコールバック関数を呼び出す。
		//イベント名の読み込み
		const listenerSet = this._listeners.get(type);
		//引数のイベント名と異なれば何も返さない
		if(!listenerSet){
			return;
		}
		//引数のイベント名と一致すれば、Setに登録した全てのコールバック関数を呼び出す。
		listenerSet.forEach(listener=>{
			listener.call(this);
		});
	}

   /**
     * 指定したイベントのイベントリスナーを解除する
     * @param {string} type イベント名
     * @param {Function} listener イベントリスナー
     */
	removeEventListener(type, listener){
		//イベント名の読み込み
		const listenerSet = this._listeners.get(type);
				//引数のイベント名と異なれば何も返さない
		if(!listenerSet){
			return;
		}
		//引数のイベント名と一致すれば、該当するリスナー関数を削除する。
		listenerSet,forEach(ownListener=>{
			if(ownListener === listener){
				listenerSet.delete(listener);
			}
		});

	}

}
