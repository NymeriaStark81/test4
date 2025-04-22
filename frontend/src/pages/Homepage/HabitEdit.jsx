import { useLocation } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan } from "@fortawesome/free-regular-svg-icons"
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons"

const HabitEdit = ({setSection, selectHabit}) => {
    const {state} = useLocation()
    const [addHabit, setAddHabit] = useState('')
    const [habitTitle, setHabitTitle] = useState('')
    const [habits, setHabits] = useState([])
    const [update, setUpdate] = useState(0) //rerender
    const [load, setLoad] = useState(false)

    //load habits when first enter list
    useEffect(() => {
        fetch("http://localhost:3000/loadHabit/", {
            method: 'POST',
            body: JSON.stringify({habitID: selectHabit}),
            headers: {
                'Content-Type': 'application/json'
        }})
            .then((res) => {return res.json()})
            .then((data) => {
                setHabitTitle(data.title)
                setHabits(data.elements)
                setLoad(true)
            })
    }, [])
    
    //add habit to list
    const handleUpdateHabit = (lock) => {
        fetch("http://localhost:3000/updateHabit/", {
            method: 'POST',
            body: JSON.stringify({habitID: selectHabit, elements: habits, title: habitTitle, lock: lock}),
            headers: {
                'Content-Type': 'application/json'
        }})
        setHabitTitle('')
        setHabits([])
        setSection('habit_list')
    }

    //delete habit
    const delHabit = (index) => {
        habits.splice(index, 1)
        setUpdate(update + 1)
    }


if(load) {
    return(
        <div className="home_main">
            <div className="home_main_header">
                <div className="home_main_header_title">Edit Habit List</div>
                <button className="home_main_header_new" onClick={(e) => {setSection('habit_list')}}>Cancel</button>
            </div>
            <div className="home_main_list">
                <div className="create_form">                  
                    <h2>Habit List Name</h2>
                    <input className="create_template_input" onChange={(e) => {setHabitTitle(e.target.value)}} defaultValue={habitTitle}/>
                    <button style={{marginLeft: '95px', backgroundColor: '#F198AF', fontSize: '25px'}}
                        onClick={(e) => {if(habits.length != 0 && habitTitle != ''){handleUpdateHabit(false)}else{alert('Enter habit list title and habits!')}}}>Save</button>
                    <button style={{marginLeft: '75px', backgroundColor: '#F198AF', fontSize: '25px'}}
                        onClick={(e) => {handleUpdateHabit(true)}}>Lock</button>                    
                    <h2>Add habit</h2>
                    <input className="create_template_input" onChange={(e) => {setAddHabit(e.target.value)}} />
                    <FontAwesomeIcon icon={faCirclePlus} onClick={() => {
                        if(addHabit!=''){
                            var duplicate = false
                            habits.map((habit, index) => {
                                if(habit == addHabit){
                                    duplicate = true
                                }
                            })
                            if(!duplicate){
                                habits.push(addHabit), setUpdate(update + 1)
                            } else {
                                alert('Habit already exists!')
                            }
                        }}} className="add"/>
                    <div key={update}>
                        {habits.map((habit, index) => {
                            return (
                                <div key={index} className="habit">
                                    {habit}
                                    <div style={{float: 'right'}} onClick={(e) => {delHabit(index)}}><FontAwesomeIcon icon={faTrashCan}/></div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
            
    )
}
    
}

export default HabitEdit