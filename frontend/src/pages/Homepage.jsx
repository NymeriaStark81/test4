import { useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useState } from "react"
import { useEffect } from "react"

const Homepage = () => {
    const {state} = useLocation()
    const navigate = useNavigate();
    var [templates, setTemplates] = useState([])
    var [tempType, setTempType] = useState('')
    var [layout, setLayout] = useState('')
    var [title, setTitle] = useState('')
    var [habitTitle, setHabitTitle] = useState('')

    useEffect(() => {
        fetch("http://localhost:3000/loadTemplate/", {
            method: 'POST',
            body: JSON.stringify({userID: state.userID}),
            headers: {
                'Content-Type': 'application/json'
        }})
            .then((res) => {return res.json()})
            .then((data) => {
                setTemplates(data)
            })
    }, [])

    const createTemplate = (e) => {
        e.preventDefault()
        fetch("http://localhost:3000/createTemplate/", {
            method: 'POST',
            body: JSON.stringify({userID: state.userID, temp_type: tempType, title: title, layout: layout}),
            headers: {
                'Content-Type': 'application/json'
        }})
            .then((res) => {return res.json()})
            .then((data) => {
                navigate('/editTemplate', {
                    state: {
                        userID: data.userID,
                        tempID: data._id
                    }
                })
            })
    }

    const createJournal = () => {
        navigate('/journalCreate', {
            state:{
                userID: state.userID
            }})
    }

    const createHabitList = () => {
        fetch("http://localhost:3000/createHabit/", {
            method: 'POST',
            body: JSON.stringify({userID: state.userID, habitTitle: habitTitle}),
            headers: {
                'Content-Type': 'application/json'
        }})
            .then((res) => {return res.json()})
            .then((data) => {
                navigate('/habit', {
                    state:{
                        userID: state.userID,
                        habitID: data._id
                    }})
            })
        
    }

        return(
            <div>
                {templates.map((template, index) => {return(<h3 key={index}>{template._id}</h3>)})}
                <form>
                    <h1>Template Title </h1>
                    <input onChange={(e) => {setTitle(e.target.value)}} />
                    <h1>Select Template Type </h1>
                    <select value={tempType} onChange={(e) => {setTempType(e.target.value)}}>
                        <option value={'daily'}>Daily</option>
                        <option value={'weekly'}>Weekly</option>
                        <option value={'monthly'}>Monthly</option>
                        <option value={'yearly'}>Yearly</option>
                        <option value={'blank'}>Page Fill</option>
                    </select>
                    <h1>Select Template Layout </h1>
                    <select value={layout} onChange={(e) => {setLayout(e.target.value)}}>
                        <option value={'left'}>Left</option>
                        <option value={'right'}>Right</option>
                        <option value={'auto'}>Auto</option>
                    </select>
                    <button onClick={createTemplate}>Create Weekly Template</button>
                </form>
                <h1>Habit List Name</h1>
                <input onChange={(e) => {setHabitTitle(e.target.value)}} />
                <button onClick={createHabitList}>Create Habit List</button>
                <button onClick={createJournal}>Create Journal</button>
            </div>
        )
}

export default Homepage