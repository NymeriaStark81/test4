import { useLocation } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCopy, faTrashCan } from "@fortawesome/free-regular-svg-icons"

const Templates = ({setSection}) => {
    const {state} = useLocation()
    const navigate = useNavigate();
    var [stage, setStage] = useState(1)
    var [templates, setTemplates] = useState([])
    var [reload, setReload] = useState(0)
    var [load, setLoad] = useState(false)
    var [title, setTitle] = useState('')

    var [duplicate, setDuplicate] = useState('')

    var delet = false
    var dup = false
    //{templates.map((template, index) => {return(<h3 key={index}>{template._id}</h3>)})}

    useEffect(() => {
        fetch("https://test4-nymeria-starks-projects.vercel.app/loadTemplate/", {
            method: 'POST',
            body: JSON.stringify({userID: state.userID}),
            headers: {
                'Content-Type': 'application/json'
        }})
            .then((res) => {return res.json()})
            .then((data) => {
                setTemplates(data)
                setLoad(true)
            })
    }, [])

    const del = (id) => {
        fetch("https://test4-nymeria-starks-projects.vercel.app/deleteTemplate/", {
            method: 'POST',
            body: JSON.stringify({id: id, userID: state.userID}),
            headers: {
                'Content-Type': 'application/json'
        }})
            .then((res) => {return res.json()})
            .then((data) => {
                setTemplates(data)
                setReload(reload+1)
            })
    }

    const copy = () => {
        fetch("https://test4-nymeria-starks-projects.vercel.app/duplicateTemplate/", {
            method: 'POST',
            body: JSON.stringify({duplicate: duplicate, title: title}),
            headers: {
                'Content-Type': 'application/json'
        }})
            .then((res) => {return res.json()})
            .then((data) => {
                setTemplates(data)
                setReload(reload+1)
                setStage(1)
            })
        }

    const editTemplate = (tempID, delet) => {
        if((!delet) && (!dup)){
            navigate('/editTemplate', {
                state: {
                    userID: state.userID,
                    tempID: tempID
                }
            })
        }
    }

if(stage == 1){
    return (
        <div className="home_main">
            <div className="home_main_header">
                <div className="home_main_header_title">
                    TEMPLATES
                </div>
                <button className="home_main_header_new" onClick={() => {setSection('template_create')}}>
                    Create New Template
                </button>
            </div>
            {load && 
                <div className="home_main_list">
                {templates.map((template, index) => {
                    return (
                        <div key={index} className="home_design" onClick={() => {editTemplate(template._id, delet)}}>
                            <div className="thumbnail">
                                {template.thumbnail != '' &&
                                    <img src={template.thumbnail} width='97.5%' height='97.5%' />
                                }
                            </div>
                            <div className="home_design_details">
                                <div className="home_design_icons">
                                    <FontAwesomeIcon icon={faTrashCan} onClick={(e) => {delet = true, del(template._id)}}/>
                                    <FontAwesomeIcon icon={faCopy} onClick={(e) => {dup = true, setDuplicate(template), setStage(2)}}/>
                                </div>
                                <p>Title: {template.title}</p>
                                <p>Type: {template.temp_type} </p>
                                <p>Layout: {template.layout} </p>
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
            <div className="home_main_header_title">
                TEMPLATES: Create duplicate
            </div>
            <button className="home_main_header_new" onClick={() => {setStage(1)}}>
                Back
            </button>
        </div>
        <div className="home_main_list">
            <div className="create_form">
                    <h2>Template Title</h2> <br/>
                    <input className="create_template_input" value={title} onChange={(e) => {setTitle(e.target.value)}}/> <br/>
                    <button onClick={(e) => {copy()}}>Create copy</button>
                </div>
            </div>
        </div>
    )
}
}

export default Templates