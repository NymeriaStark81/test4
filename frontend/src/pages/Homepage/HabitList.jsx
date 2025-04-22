import { useLocation } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan, faPenToSquare } from "@fortawesome/free-regular-svg-icons"
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons"

const HabitList = ({setSection, setSelectHabit}) => {
    const {state} = useLocation()
    var [habitTitle, setHabitTitle] = useState('')
    var [addHabit, setAddHabit] = useState('')
    var [habits, setHabits] = useState([])
    var [habitLists, setHabitLists] = useState([])
    var [load, setLoad] = useState(false)
    var [reload, setReload] = useState(0)
    var [stage, setStage] = useState(1)

    //load habit list
    const loadHabit = () => {
        fetch("https://test4-nymeria-starks-projects.vercel.app/loadHabitLists/", {
            method: 'POST',
            body: JSON.stringify({userID: state.userID}),
            headers: {
                'Content-Type': 'application/json'
        }})
            .then((res) => {return res.json()})
            .then((data) => {
                setHabitLists(data);
                setLoad(true)
            })
    }

    //creat new habit list
    const createHabitList = () => {
        fetch("https://test4-nymeria-starks-projects.vercel.app/createHabit/", {
            method: 'POST',
            body: JSON.stringify({userID: state.userID, habitTitle: habitTitle, habits: habits}),
            headers: {
                'Content-Type': 'application/json'
        }})
            .then((res) => {return res.json()})
            .then((data) => {
                setHabitTitle('')
                setHabits([])
                setStage(1)
            })
        
    }

    //delete habit
    const delHabit = (index) => {
        habits.splice(index, 1)
        setReload(reload + 1)
    }

    //delete habit list
    const delHabitList = (id) => {
        fetch("https://test4-nymeria-starks-projects.vercel.app/deleteHabit/", {
            method: 'POST',
            body: JSON.stringify({userID: state.userID, id: id}),
            headers: {
                'Content-Type': 'application/json'
        }})
            .then((res) => {return res.json()})
            .then((data) => {
                setHabitLists(data);
                setReload(reload + 1)
            })
    }
    
    
//see list of all habit lists
if(stage == 1){
    loadHabit()
    return (
        <div className="home_main">
            <div className="home_main_header">
                <div className="home_main_header_title">HABIT LISTS</div>
                <button className="home_main_header_new" onClick={(e) => {setStage(2)}}>Create New Habit List</button>
            </div>
            {load &&
                <div className="home_main_list">
                    {habitLists.map ((list, index) => {
                        return(
                            <div key={index} className="home_list_container">
                                <div className="list_header">
                                    <div className="list_title">{list.title}</div>
                                    {(list.lock == false) &&
                                    <FontAwesomeIcon icon={faPenToSquare} className="home_list_icons" style={{left: '160px'}}
                                        onClick={(e) => {setSection('habit_edit'), setSelectHabit(list._id)}}/>
                                    }
                                    <FontAwesomeIcon icon={faTrashCan} className="home_list_icons" style={{left: '220px'}}
                                        onClick={(e) => {delHabitList(list._id), loadHabit()}}/>
                                </div>
                                <div className="home_list">
                                    {list.elements.map((habit, index) => {
                                        return (
                                            <div key={index} className="home_habit_container">
                                                <div className="home_habit">{habit}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
}

//create new habit list
if(stage == 2){
    return(
        <div className="home_main">
            <div className="home_main_header">
                <div className="home_main_header_title">Create Habit List</div>
                <button className="home_main_header_new" onClick={(e) => {setHabitTitle(''), setHabits([]), setAddHabit(''), setStage(1)}}>Cancel</button>
            </div>
            <div className="home_main_list">
                <div className="create_form">                  
                    <h2>Habit List Name</h2>
                    <input className="create_template_input" onChange={(e) => {setHabitTitle(e.target.value)}} />
                    <button style={{marginLeft: '95px', backgroundColor: '#F198AF', fontSize: '25px'}}
                        onClick={(e) => {if(habits.length != 0 && habitTitle != ''){createHabitList()}else{alert('Enter habit list title and habits!')}}}>Create Habit List</button>
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
                                habits.push(addHabit), setReload(reload + 1)
                            } else {
                                alert('Habit already exists!')
                            }
                        }
                        }} className="add"/>
                    <div key={reload}>
                        {habits.map((habits, index) => {
                            return (
                                <div key={index} className="habit">
                                    {habits}
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

export default HabitList