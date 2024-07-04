import {useState, useEffect} from 'react'
import { MdDeleteForever, MdEdit } from "react-icons/md";
import {TaskName} from './styledComponent'
import './style.css'

const Todos = props => {
    const savedLocalStorage = JSON.parse(localStorage.getItem("checkboxStatus"))
    const {todo, onClickDeleteIcon} = props
    const {id, task} = todo
    const [isChecked, updateCheckbox] = useState(savedLocalStorage)

    useEffect(() => {
        localStorage.setItem("checkboxStatus", JSON.stringify(isChecked))
    })

    const onClickCheckbox = () => {
        updateCheckbox(!isChecked)
    }

    return(
        <li className="task-container">
            <div className="dup-task-container">
                <input type="checkbox" className="checkbox-input" onClick={onClickCheckbox} checked={isChecked} />
                <TaskName isChecked={isChecked}>{task}</TaskName>
            </div>
            <div>
                <MdEdit className="icon" />
                <MdDeleteForever className="icon" onClick={() => onClickDeleteIcon(id)} />
            </div>
        </li>
    )
}

export default Todos