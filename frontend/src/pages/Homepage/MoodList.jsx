import { useLocation } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"
import io from 'socket.io-client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan, faPenToSquare } from "@fortawesome/free-regular-svg-icons"
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons"

const MoodList = ({setSection, setSelectMood}) => {
    const {state} = useLocation()
    var [stage, setStage] = useState(1)
    var [load, setLoad] = useState(false)
    var [moodLists, setMoodLists] = useState([])
    var [addMood, setAddMood] = useState('')
    var [moodTitle, setMoodTitle] = useState('')
    var [moods, setMoods] = useState([])
    var [blankIcon, setBlankIcon] = useState ('')
    var [reload, setReload] = useState(0)

    const socket = io('http://localhost:3000');

    useEffect(() => {
        fetch("http://localhost:3000/loadMoodLists/", {
            method: 'POST',
            body: JSON.stringify({userID: state.userID}),
            headers: {
                'Content-Type': 'application/json'
        }})
            .then((res) => {return res.json()})
            .then((data) => {
                setMoodLists(data);
                setLoad(true)
            })
    }, [])

    const handleSubmitMoodList = (e) => {
        e.preventDefault();
        var complete = true
        moods.map((mood, index) => {
            if(mood[1] == '' || mood[2] == ''){
                complete = false
            }
        })
        if(moods.length != 0 && moodTitle != '' && blankIcon !='' && complete === true){
            createMoodList()
        }else{
            alert('Insufficient information entered')
        }
    }

    const createMoodList = () => {
        const newMoods = []
        var blank = ''
        const formData = new FormData();
        formData.append("image", blankIcon)
        moods.map(async(mood, index) => {
            formData.append("image", mood[1])
            formData.append("image", mood[2])
        })
        fetch("http://localhost:3000/add_icon/", {
            method: 'POST',
            body: formData
        })
        .then((res) => {return res.json()})
        .then(async(data) => {
            blank = data[0]
            let i = 1
            for(let j = 0; j<moods.length; j++){
                    newMoods.push([moods[j][0], data[i], data[i+1]])
                    i = i+2;
            }
        })
        .then(() => {
            fetch("http://localhost:3000/createMood/", {
                method: 'POST',
                body: JSON.stringify({userID: state.userID, title: moodTitle, blank: blank, moods: newMoods, lock: false}),
                headers: {
                    'Content-Type': 'application/json'
            }})
                .then((res) => {return res.json()})
                .then((data) => {
                    setMoodTitle('')
                    setMoods([])
                    setStage(1)
                    setMoodLists(data);
                    setReload(reload + 1)
                })
        })        
    }

    const delMood = (index) => {
        moods.splice(index, 1)
        setReload(reload + 1)
    }

    const delMoodList = (list) => {
        socket.emit('delete_image', {url: list.blank})
        list.elements.map((mood) => {
            socket.emit('delete_image', {url: mood[1]})
            socket.emit('delete_image', {url: mood[2]})
        })
        fetch("http://localhost:3000/deleteMood/", {
            method: 'POST',
            body: JSON.stringify({userID: state.userID, id: list._id}),
            headers: {
                'Content-Type': 'application/json'
        }})
            .then((res) => {return res.json()})
            .then((data) => {
                setMoodLists(data);
                setReload(reload + 1)
            })
    }


if(stage == 1){ 
    return (
        <div className="home_main">
            <div className="home_main_header">
                <div className="home_main_header_title">MOOD LISTS</div>
                <button className="home_main_header_new" onClick={(e) => {setStage(2)}}>Create New Mood List</button>
            </div>
            {load &&
            <div className="home_main_list">
                    {moodLists.map ((list, index) => {
                        return(
                            <div key={index} className="home_list_container">
                                <div className="list_header">
                                    <div className="list_title">{list.title}</div>
                                    {(list.lock == false) &&
                                    <FontAwesomeIcon icon={faPenToSquare} className="home_list_icons" style={{left: '160px'}}
                                        onClick={(e) => {setSection('mood_edit'), setSelectMood(list._id)}}/>
                                    }
                                    <FontAwesomeIcon icon={faTrashCan} className="home_list_icons" style={{left: '220px'}}
                                        onClick={(e) => {delMoodList(list)}}/>
                                </div>
                                <div className="home_list">
                                    <div key = {index} className="home_habit_container">
                                        <div className="home_habit">Blank Icon</div>
                                        <img src={list.blank} className="home_list_icons" style={{width: '35px', height: '35px', left: '220px'}}/>
                                    </div>
                                    {list.elements.map((mood, index) => {
                                        return(
                                            <div key = {index} className="home_habit_container">
                                                <div className="home_habit">{mood[0]}</div>
                                                <img src={mood[1]} className="home_list_icons" style={{width: '35px', height: '35px', left: '170px'}}/>
                                                <img src={mood[2]} className="home_list_icons" style={{width: '35px', height: '35px', left: '220px'}}/>
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

if(stage == 2){
    return (
        <div className="home_main">
            <div className="home_main_header">
                <div className="home_main_header_title">Create Mood List</div>
                <button className="home_main_header_new" onClick={(e) => {setMoodTitle(''), setMoods([]), setAddMood(''), setStage(1)}}>Cancel</button>
            </div>
            <div className="home_main_list">
                <div className="create_form">
                    <form onSubmit={(e) => {handleSubmitMoodList(e)}} encType="multipart/form-data">                  
                    <h2>Mood List Name</h2>
                    <input className="create_template_input" onChange={(e) => {setMoodTitle(e.target.value)}} />
                    <button style={{marginLeft: '95px', backgroundColor: '#F198AF', fontSize: '25px'}} type="submit">Create Mood List</button>
                    <h2> Blank icon </h2>
                    <input type="file" 
                        onChange={(e) => {setBlankIcon(e.target.files[0])}} name="image" accept="image/*" 
                        style={{fontFamily: "Inter", fontSize: '20px', marginBottom: '20px'}} />
                    <h2>Add mood</h2>
                    <input className="create_template_input" onChange={(e) => {setAddMood(e.target.value)}} />
                    <FontAwesomeIcon icon={faCirclePlus} onClick={() => {if(addMood!=''){moods.push([addMood, '', '']), setReload(reload + 1)}}} className="add"/>
                    <div>
                        {moods.map((mood, index) => {
                            return (
                                <div key={index} className="mood">
                                    {mood[0]} 
                                    <div style={{float: 'right'}} onClick={(e) => {delMood(index)}}><FontAwesomeIcon icon={faTrashCan}/></div>
                                    <br/>
                                    Active icon <input type="file" onChange={(e) => {mood[1] = e.target.files[0]}} name="image" accept="image/*"/> <br/>
                                    Inactive icon <input type="file" onChange={(e) => {mood[2] = e.target.files[0]}} name="image" accept="image/*"/> <br/>
                                </div>
                            )
                        })}
                    </div>
                    </form>
                </div>
            </div>
        </div>
    )
}


}

export default MoodList