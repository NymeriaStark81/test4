import { useLocation } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"
import io from 'socket.io-client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan } from "@fortawesome/free-regular-svg-icons"
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons"

const MoodEdit = ({setSection, selectMood}) => {
    const {state} = useLocation()
    var [load, setLoad] = useState(false)
    var [addMood, setAddMood] = useState('')
    var [moodTitle, setMoodTitle] = useState('')
    var [moods, setMoods] = useState([])
    var [delMoods, setDelMoods] = useState([])
    var [oldBlankIcon, setOldBlankIcon] = useState('')
    var [blankIcon, setBlankIcon] = useState ('')
    var [reload, setReload] = useState(0)
    var lock = false

    const socket = io('https://test4-nymeria-starks-projects.vercel.app'); 

    //load mood list
    useEffect(() => {
        fetch("https://test4-nymeria-starks-projects.vercel.app/loadMood/", {
            method: 'POST',
            body: JSON.stringify({moodID: selectMood}),
            headers: {
                'Content-Type': 'application/json'
        }})
            .then((res) => {return res.json()})
            .then((data) => {
                setMoodTitle(data.title)
                setOldBlankIcon(data.blank)
                setMoods(data.elements)
                setLoad(true)
            })
    }, [])

    //delete mood
    const delMood = (index) => {
        delMoods.push(moods[index][1])
        delMoods.push(moods[index][2])
        moods.splice(index, 1)
        setReload(reload + 1)
    }

    
    const handleSubmitMoodList = (e) => {
        e.preventDefault();
        var complete = true
        const formData = new FormData();

        moods.map((mood, index) => {
            if(mood[1] == '' || mood[2] == ''){
                complete = false
            }
        })

        if(complete){
            //delete icons from S3
            delMoods.map((mood, index) => {
                socket.emit('delete_image', {url: mood})
            })
            
            //delete old blank icon if new one is chosen
            if(blankIcon != ''){
                socket.emit('delete_image', {url: oldBlankIcon})
                formData.append("image", blankIcon)
            }

            //generating list of newly chosen icons
            moods.map((mood, index) => {
                if(typeof(mood[1]) !== 'string'){
                    formData.append("image", mood[1])
                }
                if(typeof(mood[2]) !== 'string'){
                    formData.append("image", mood[2])
                }
            })

            //update newly chosen icons to s3
            fetch("https://test4-nymeria-starks-projects.vercel.app/add_icon/", {
                method: 'POST',
                body: formData
            })
            .then((res) => {return res.json()})
            .then((data) => {
                //updating image files to URLS
                let i = 0
                if(blankIcon != ''){
                    blankIcon = data[i]
                    i++
                } else {
                    blankIcon = oldBlankIcon
                }

                moods.map((mood, index) => {
                    if(typeof(mood[1]) !== 'string'){
                        mood[1] = data[i]
                        i++
                    }
                    if(typeof(mood[2]) !== 'string'){
                        mood[2] = data[i]
                        i++
                    }
                })
            })
            .then(() => {
                //update DB
                fetch("https://test4-nymeria-starks-projects.vercel.app/updateMood/", {
                    method: 'POST',
                    body: JSON.stringify({userID: state.userID, id: selectMood, title: moodTitle, blank: blankIcon, moods: moods, lock: lock}),
                    headers: {
                        'Content-Type': 'application/json'
                }})
                    .then((res) => {return res.json()})
                    .then((data) => {
                        setMoodTitle('')
                        setMoods([])
                        setAddMood('')
                        setDelMoods([])
                        setBlankIcon('')
                        setOldBlankIcon('')
                        setLoad(false)
                        setSection('mood_list')
                    })
            })
        } else {
            alert("Select icons for newly added moods")
        }

    }

    if(load){
        return (
            <div className="home_main">
                <div className="home_main_header">
                    <div className="home_main_header_title">Edit Mood List</div>
                    <button className="home_main_header_new" onClick={(e) => {setMoodTitle(''), setMoods([]), setAddMood(''), setSection('mood_list')}}>Cancel</button>
                </div>
                <div className="home_main_list">
                    <div className="create_form">
                        <form onSubmit={(e) => {handleSubmitMoodList(e)}} encType="multipart/form-data">                  
                        <h2>Mood List Name</h2>
                        <input className="create_template_input" onChange={(e) => {setMoodTitle(e.target.value)}} defaultValue={moodTitle}/>
                        <button style={{marginLeft: '95px', backgroundColor: '#F198AF', fontSize: '25px'}} type="submit">Save</button>
                        <button style={{marginLeft: '75px', backgroundColor: '#F198AF', fontSize: '25px'}}
                            onClick={(e) => {lock = true}}
                            type="submit">Lock</button>
                        <h2> Blank icon </h2>
                        Current icon
                        <img src={oldBlankIcon} className="home_list_icons" style={{width: '35px', top: '170px', height: '35px', left: '150px'}}/> <br /><br />
                        Change icon <input type="file" 
                            onChange={(e) => {setBlankIcon(e.target.files[0])}} name="image" accept="image/*" 
                            style={{fontFamily: "Inter", fontSize: '20px', marginBottom: '20px', paddingLeft: '30px'}} />
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
                                        Active icon 
                                        {(mood[1] !== '') &&
                                            <img src={mood[1]} className="home_list_icons" style={{position: 'relative', width: '35px', height: '35px', left: '380px', top: '-5px'}}/>
                                        }
                                        <input type="file" onChange={(e) => {if(mood[1] != ''){delMoods.push(mood[1])} mood[1] = e.target.files[0]}} name="image" accept="image/*"/> <br/>
                                        Inactive icon 
                                        {(mood[2] !== '') &&
                                            <img src={mood[2]} className="home_list_icons" style={{position: 'relative', width: '35px', height: '35px', left: '365px', top: '-5px'}}/>
                                        }
                                        <input type="file" onChange={(e) => {if(mood[2] != ''){delMoods.push(mood[2])} mood[2] = e.target.files[0]}} name="image" accept="image/*"/> <br/>
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

export default MoodEdit