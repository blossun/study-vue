const addOneItem = (state, todoItem) => {
    const obj = {completed: false, item: todoItem};
    localStorage.setItem(todoItem, JSON.stringify(obj)); //로컬스토리지에 저장 obj -> String
    state.todoItems.push(obj); //mutation에서 state에 접근하는 방법은 첫번쨰 인자로 받은 변수를 이용해서 속성에 접근해야한다.
}

const removeOneItem = (state, payload) => {
    localStorage.removeItem(payload.todoItem.item); //로컬스토리지에서 삭제
    state.todoItems.splice(payload.index, 1); //화면에서 삭제. 해당 index에서부터 1개 item 삭제
}

const toggleOneItem = (state, payload) => {
    state.todoItems[payload.index].completed = !state.todoItems[payload.index].completed;

    //로컬스토리지의 데이터를 갱신
    localStorage.setItem(payload.todoItem.item, JSON.stringify(payload.todoItem));
}

const clearAllItems = (state) => {
    localStorage.clear();
    state.todoItems = []; //비워줘야함
}

export { addOneItem, removeOneItem, toggleOneItem, clearAllItems }