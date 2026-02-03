





export const setTodoToLocal = (todos) => {

  localStorage.setItem('todos', JSON.stringify(todos));

}


export const getTodoFromLocal = () => {
  const todos = localStorage.getItem('todos');
  return todos === null ? [] : JSON.parse(todos);
}