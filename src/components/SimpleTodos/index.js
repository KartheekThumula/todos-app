import {Component} from 'react'
import TodoItem from '../TodoItem'
import './index.css'

const initialTodosList = [
  {
    id: 1,
    title: 'Book the ticket for today evening',
  },
  {
    id: 2,
    title: 'Rent the movie for tomorrow movie night',
  },
  {
    id: 3,
    title: 'Confirm the slot for the yoga session tomorrow morning',
  },
  {
    id: 4,
    title: 'Drop the parcel at box office',
  },
  {
    id: 5,
    title: 'Order fruits on Bigbasket',
  },
  {
    id: 6,
    title: 'Fix the production issue',
  },
  {
    id: 7,
    title: 'Confirm my presence for attending the wedding that event',
  },
  {
    id: 8,
    title: 'Hire tech writers for the new project',
  },
]

class SimpleTodos extends Component {
  state = {
    todosList: initialTodosList.map(eachTodo => ({
      ...eachTodo,
      isCompleted: false,
    })),
    searchInput: '',
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onAddTodo = () => {
    const {searchInput} = this.state
    const trimmedInput = searchInput.trim()

    if (trimmedInput === '') {
      return
    }

    const words = trimmedInput.split(' ')
    const lastWord = words[words.length - 1]
    const count = parseInt(lastWord)

    let title = trimmedInput
    let numberOfTodos = 1

    if (!Number.isNaN(count) && count > 0 && words.length > 1) {
      numberOfTodos = count
      title = words.slice(0, words.length - 1).join(' ')
    }

    const newTodos = []
    const baseId = Date.now()
    for (let i = 0; i < numberOfTodos; i += 1) {
      newTodos.push({
        id: baseId + i,
        title,
        isCompleted: false,
      })
    }

    this.setState(prevState => ({
      todosList: [...prevState.todosList, ...newTodos],
      searchInput: '',
    }))
  }

  deleteTodo = id => {
    this.setState(prevState => ({
      todosList: prevState.todosList.filter(eachTodo => eachTodo.id !== id),
    }))
  }

  saveTodoTitle = (id, updatedTitle) => {
    this.setState(prevState => ({
      todosList: prevState.todosList.map(eachTodo => {
        if (eachTodo.id === id) {
          return {...eachTodo, title: updatedTitle}
        }
        return eachTodo
      }),
    }))
  }

  toggleIsCompleted = id => {
    this.setState(prevState => ({
      todosList: prevState.todosList.map(eachTodo => {
        if (eachTodo.id === id) {
          return {...eachTodo, isCompleted: !eachTodo.isCompleted}
        }
        return eachTodo
      }),
    }))
  }

  render() {
    const {todosList, searchInput} = this.state

    return (
      <div className="simple-todos-bg-container">
        <div className="simple-todos-card">
          <h1 className="main-heading">Simple Todos</h1>

          <div className="add-todo-bar">
            <input
              type="text"
              className="add-input"
              placeholder="Enter todo title (e.g. Read Book 3)"
              value={searchInput}
              onChange={this.onChangeSearchInput}
            />
            <button
              type="button"
              className="add-button"
              onClick={this.onAddTodo}
            >
              Add
            </button>
          </div>

          <ul className="todos-list-container">
            {todosList.map(eachTodo => (
              <TodoItem
                key={eachTodo.id}
                todoDetails={eachTodo}
                deleteTodo={this.deleteTodo}
                saveTodoTitle={this.saveTodoTitle}
                toggleIsCompleted={this.toggleIsCompleted}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SimpleTodos
