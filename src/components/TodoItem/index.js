import {useState} from 'react'
import './index.css'

const TodoItem = props => {
  const {todoDetails, deleteTodo, saveTodoTitle, toggleIsCompleted} = props
  const {id, title, isCompleted} = todoDetails

  const [isEditing, setIsEditing] = useState(false)
  const [todoTitle, setTodoTitle] = useState(title)

  const onChangeTitle = event => {
    setTodoTitle(event.target.value)
  }

  const onClickEditOrSave = () => {
    if (isEditing) {
      saveTodoTitle(id, todoTitle)
    } else {
      setTodoTitle(title)
    }
    setIsEditing(prev => !prev)
  }

  const onChangeCheckbox = () => {
    toggleIsCompleted(id)
  }

  const onDeleteTodo = () => {
    deleteTodo(id)
  }

  return (
    <li className="todo-item">
      <div className="todo-text-container">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={onChangeCheckbox}
          className="todo-checkbox"
        />
        {isEditing ? (
          <input
            type="text"
            className="edit-todo-input"
            value={todoTitle}
            onChange={onChangeTitle}
          />
        ) : (
          <p className={`title ${isCompleted ? 'strike-through' : ''}`}>
            {title}
          </p>
        )}
      </div>

      <div className="todo-buttons-container">
        <button
          type="button"
          className="action-button edit-button"
          onClick={onClickEditOrSave}
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
        <button
          type="button"
          className="action-button delete-button"
          onClick={onDeleteTodo}
        >
          Delete
        </button>
      </div>
    </li>
  )
}

export default TodoItem
