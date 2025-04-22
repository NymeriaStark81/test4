import { useLocation } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const TemplateCreate = ({setSection}) => {
    const {state} = useLocation()
    const navigate = useNavigate();
    var [tempType, setTempType] = useState('')
    var [layout, setLayout] = useState('')
    var [title, setTitle] = useState('')

    const createTemplate = (e) => {
        e.preventDefault()
        if(tempType !== '' && layout !== '' && title !== ''){
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
        } else {
            alert('Enter details')
        }
    }

    return (
        <div className="home_main">
            <div className="home_main_header">
                <div className="home_main_header_title">
                    Create new template
                </div>
                <button className="home_main_header_new" onClick={() => {setSection('templates')}}>
                    Cancel
                </button>
            </div>
            <div className="home_main_create">
                    <form onSubmit={createTemplate} className="create_form">
                        <h2>Template Title </h2>
                        <input className="create_template_input" onChange={(e) => {setTitle(e.target.value)}} />
                        <h2>Select Template Type </h2>
                        <select className="create_template_input" value={tempType} onChange={(e) => {setTempType(e.target.value)}}>
                            <option value={''}></option>
                            <option value={'daily'}>Daily</option>
                            <option value={'weekly'}>Weekly</option>
                            <option value={'monthly'}>Monthly</option>
                            <option value={'yearly'}>Yearly</option>
                            <option value={'blank'}>Page Fill</option>
                        </select>
                        <h2>Select Template Layout </h2>
                        <select className="create_template_input" value={layout} onChange={(e) => {setLayout(e.target.value)}}>
                            <option value={''}></option>
                            <option value={'left'}>Left</option>
                            <option value={'right'}>Right</option>
                            <option value={'auto'}>Auto</option>
                        </select>
                        <br/>
                        <button type="submit" style={{marginTop: "40px", backgroundColor: "#F198AF", fontSize: "20px"}}>Create Template</button>
                    </form>
            </div>
        </div>
    )
    
    
}

export default TemplateCreate