import { useState } from 'react'
import DateTimePicker from 'react-datetime-picker'

const AddTask = ({ onAdd }) => {

    const [task, setTask] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()

        if(!task) {
            alert('Please add a task')
            return
        }
        
        onAdd({ task, day, reminder })

        setTask('')
        setDay('')
        setReminder(false)
    }

    return (
        <form  className = 'add-form' onSubmit = {onSubmit}>
            <div className = 'form-control'>
                <label>Task</label>
                <input type = 'text' placeholder = 'Add Task' value = {task} onChange = {(e) => setTask(e.target.value)} />
            </div>
            <div className = 'form-control '>
                <label>Date</label>
                <DateTimePicker onChange = {setDay} value = {day} />
            </div>
            <div className = 'form-control form-control-check'>
                <label>Set Reminder</label>
                <input type = 'checkbox' checked = {reminder} value = {reminder} onChange = {(e) => setReminder (e.currentTarget.checked)} />
            </div>
            <input type = 'submit' value = 'Save Task' className = 'btn btn-block' />
        </form>
    )
}

export default AddTask
