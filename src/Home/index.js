import {useState, useEffect} from 'react'
import {v4 as uuidv4} from 'uuid'
import Todos from '../Todos'
import './style.css'

const Home = () => {
    const updatedSearch = JSON.parse(localStorage.getItem("searchText"))
    const [todoList, updateTodoList] = useState([])
    const [taskInput, updateTaskInput] = useState("")
    const [searchInput, updateSeachInput] = useState(updatedSearch)

    useEffect(() => {
        const savedTodoList = JSON.parse(localStorage.getItem("todoItem"))
        if (savedTodoList){
            updateTodoList(savedTodoList)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("searchText", JSON.stringify(searchInput))
    })

    const onChangeInput = event => {
        updateTaskInput(event.target.value)
    }

    const updateSetLocalStorage = updatedTodo => {
        localStorage.setItem("todoItem", JSON.stringify(updatedTodo))
    }

    const onClickAddButton = () => {
        const newTodo = {
            id: uuidv4(),
            task: taskInput,
        }
        if (taskInput !== ""){
            const updatedTodo = [...todoList, newTodo]
            updateTodoList(updatedTodo)
            updateSetLocalStorage(updatedTodo)
            updateTaskInput("")
        }
    }

    const onClickDeleteIcon = todoId => {
        const updatedList = todoList.filter(eachTodo => eachTodo.id !== todoId)
        updateTodoList(updatedList);
        updateSetLocalStorage(updatedList)
    }

    const onChangeSearch = event => {
        const updatedSearchText = event.target.value
        updateSeachInput(updatedSearchText)
    }

    const filteredTodoList = searchInput === "" ? todoList : (todoList.filter(eachTodo => eachTodo.task.toLowerCase().includes(searchInput.toLowerCase())))

    return(
        <div className="main-container">
            <h1 className="main-heading">Todo List</h1>
            <p className="description">Stay Organized, Achieve More: Your Ultimate Todo List Companion!</p>
            <div className="todo-input-container">
                <input type="text" className="task-input" placeholder="Add your Task" value={taskInput} onChange={onChangeInput} />
                <button className="add-button" onClick={onClickAddButton}>Add</button>
            </div>
            <div className="saved-tasks-container">
                <div className="saved-tasks-header">
                    <h1 className="saved-tasks-heading">Saved Tasks</h1>
                    <input type="search" placeholder="Search for Todos" className="search-input" value={searchInput} onChange={onChangeSearch} />
                </div>
                {filteredTodoList.length === 0 ? (
                    <div className="no-todo-container">
                        <img src="https://res.cloudinary.com/dawgqpgxs/image/upload/v1720006243/ycjdhzypgrarmddq46rm.png" className="no-todo-image" alt="no-todo" />
                        <h1 className="no-todo-text">Add your Task to display here</h1>
                    </div>
                ) : (
                    <ul className="todoList-container">
                        {filteredTodoList.map(eachTodo => (
                            <Todos todo={eachTodo} key={eachTodo.id} onClickDeleteIcon={onClickDeleteIcon} />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default Home