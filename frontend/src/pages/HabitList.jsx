import { useLocation } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"

const HabitList = () => {
    const {state} = useLocation()
    const [newHabit, setNewHabit] = useState('')
    const [habits, setHabits] = useState([])
    const [update, setUpdate] = useState(0)

    useEffect(() => {
        fetch("http://localhost:3000/loadHabit/", {
            method: 'POST',
            body: JSON.stringify({habitID: state.habitID}),
            headers: {
                'Content-Type': 'application/json'
        }})
            .then((res) => {return res.json()})
            .then((data) => {
                setHabits(data)
            })
    }, [])
    

    const handleUpdateHabit = () => {
        habits.push(newHabit)
        setHabits(habits)
        setUpdate(update+1)

        fetch("http://localhost:3000/updateHabit/", {
            method: 'POST',
            body: JSON.stringify({habitID: state.habitID, elements: habits}),
            headers: {
                'Content-Type': 'application/json'
        }})

    }
    
    return(
        <div>
            <h1>{state.habitID}</h1>
            {habits.map((habit, index) => {
                return(
                <p key={index}>{habit}</p>
            )})}
            <input onChange={(e) => {setNewHabit(e.target.value)}} />
            <button onClick={handleUpdateHabit}>Add</button>
        </div>
            
    )
    
}

export default HabitList