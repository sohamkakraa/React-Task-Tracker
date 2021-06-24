import Header from './Components/Header'
import Tasks from './Components/Tasks'
import AddTask from './Components/AddTask'
import Footer from './Components/Footer'
import About from './Components/About'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useState, useEffect  } from 'react'

const App = () =>  { 
  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([]) 

  useEffect(() => {
    const getTasks = async () => {
      const taksFromServer = await fetchTasks()
      setTasks(taksFromServer)
    }

    getTasks()
  }, [])

  //Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:8080/api/tasks/')
    const data = await res.json()
    console.log(data)
    return data
  }

  //Fetch Task 
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:8080/api/tasks/${id}`)
    const data = await res.json()

    return data
  }

  //Add Task
  const addTask = async(task) => {
    const res = await fetch('http://localhost:8080/api/tasks/', {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(task)
    })
     
    const data = await res.json()

    setTasks([...tasks, data])
  }

  //Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:8080/api/tasks/${id}`, { 
      method : 'DELETE'
    })

    setTasks(tasks.filter((task) => task.id !==id))
  }

  //Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:8080/api/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    )
  }

  return (
    <Router>
    <div className="container">
      <Header onAdd = {() => setShowAddTask(!showAddTask)} showAdd = {showAddTask} />
      <Route path = '/' exact render = {(props) => (
        <>
        {showAddTask && <AddTask onAdd = {addTask} />}
        {tasks.length > 0 ? (<Tasks tasks = {tasks} onDelete = {deleteTask} onDoubleClick = {toggleReminder} />) : ('No Tasks Available')}
        </>
      )}  />
      <Route path = '/about' component = {About} />
      <Footer />
    </div>
    </Router>
  );
}

export default App;
