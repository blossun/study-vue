const storage = {
    fetch() { //속성 메서드
        const arr = [];
        if (localStorage.length > 0) {
            for (let i = 0; i < localStorage.length; i++) {
                if (localStorage.key(i) !== 'loglevel:webpack-dev-server') {
                    arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
                }
            }
        }
        return arr;
    }
};

const state = {
    todoItems: storage.fetch()
};

const getters = {
    storedTodoItems(state) {
        return state.todoItems;
    }
};

const mutations = {
    addOneItem(state, todoItem) {
        const obj = {completed: false, item: todoItem};
        localStorage.setItem(todoItem, JSON.stringify(obj)); //로컬스토리지에 저장 obj -> String
        state.todoItems.push(obj); //mutation에서 state에 접근하는 방법은 첫번쨰 인자로 받은 변수를 이용해서 속성에 접근해야한다.
    },
    removeOneItem(state, payload) {
        localStorage.removeItem(payload.todoItem.item); //로컬스토리지에서 삭제
        state.todoItems.splice(payload.index, 1); //화면에서 삭제. 해당 index에서부터 1개 item 삭제
    },
    
    toggleOneItem(state, payload) {
        state.todoItems[payload.index].completed = !state.todoItems[payload.index].completed;
    
        //로컬스토리지의 데이터를 갱신
        localStorage.setItem(payload.todoItem.item, JSON.stringify(payload.todoItem));
    },
    clearAllItems(state) {
        localStorage.clear();
        state.todoItems = []; //비워줘야함
    }
};

export default {
    state,
    getters,
    mutations
}