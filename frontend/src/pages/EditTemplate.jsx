//import React, { useState } from 'react'
import { useLocation } from "react-router-dom"
import '../App.css'
import { useState} from "react"
import { useEffect } from "react"
import io from 'socket.io-client'
import Main from './MainComp/Main'
import Add from './AddComp/Add'
import Edit from './EditComp/Edit'

/*const squares_db =  [
    {
        type: 'text',
        color: "red",
        z_index: 1,
        content: 'This is text.',
        top: "0",
        left: "0"
    },
    {
        type: 'shape',
        color: "red",
        z_index: 1,
        width: "50",
        height: "50",
        top: "0",
        left: "0"
    },
    {
        type: 'shape',
        color: "blue",
        z_index: 0,
        width: "100",
        height: "150",
        top: "0",
        left: "0"
    }
];*/
const socket = io('http://localhost:3000'); 

const handleUpdateSquares = (squares, tempID) => {
    socket.emit('update_db', {tempID: tempID, squares: squares})

}


const EditTemplate = () => {
    const {state} = useLocation()
    const tempID = state.tempID
    const userID = state.userID
    var main_height = '877'
    var main_width = '620'
    var [select, setSelect] = useState([])
    var [temporary, setTemporary] = useState([])
    var [addGroup, setAddGroup] = useState([])
    var [temp_type, setTempType] = useState([])
    var [squares, setSquares] = useState([])
    var [changeSelect, setChangeSelect] = useState(0)
    var [changeProp, setChangeProp] = useState(0)
    var [changePropInput, setChangePropInput] = useState(0)
    var [addItem, setAddItem] = useState(0)
    var [showCrop, setShowCrop] = useState(false)
    var [cropProp, setCropProp] = useState({
        width: 0,
        height: 0,
        top: 0,
        left: 0
    })
    var [cropChange, setCropChange] = useState(0)
    var [cropChangeInput, setCropChangeInput] = useState(0)
    

    useEffect(() => {
        const keyDown = (e) => {
            if(e.repeat || e.Handled){return}
            const vKey = 86, cKey = 67, delKey = 46
            if(e.keyCode == delKey){
                var i
                squares.map((square, index) => {
                    if(square.id === select.id){
                        i = index
                    } else {
                        return
                    }
                })
                squares.splice(i, 1)
                handleUpdateSquares(squares, tempID)
                setChangeProp(changeProp+1)
            }
            
            if(((e.ctrlKey) || (e.metaKey)) && (e.keyCode == cKey)){
                if(select.length !== 0){
                    setTemporary({
                        ...select,
                        id: Date.now(),
                        top: '0',
                        left: '0'
                    })
                }
                e.Handled = true
            }
            if(((e.ctrlKey) || (e.metaKey)) && (e.keyCode == vKey)){
                if(temporary.length !== 0){
                    squares.push(temp)
                    handleUpdateSquares(squares, tempID)
                    setAddItem(addItem + 1)
                }
                e.Handled = true
                if(temporary.type === "grid"){
                    window.location.reload(true)
                }
            }
        };

        window.addEventListener('keydown', keyDown)

        return() => window.removeEventListener('keydown', keyDown)
    })
    
    
    //run only once
    useEffect(() => {
        fetch("http://localhost:3000/initialization/", {
            method: 'POST',
            body: JSON.stringify({tempID: tempID}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then ((res) => {return(res.json())})
        .then ((data) => {
            setSquares(data.elements);
            setTempType(data.temp_type);
        })
    }, []);    

    

    if(squares.length !== 0){
    return (
        <div className="whole">
            {
                <Add userID={userID} tempID={tempID} temp_type={temp_type} squares={squares} addGroup = {addGroup} setAddGroup = {setAddGroup} addItem={addItem} setAddItem={setAddItem} handleUpdateSquares={handleUpdateSquares}/>
            }

            
            {
                <Main key={addGroup} tempID={tempID} temp_type={temp_type} main_height={main_height} main_width={main_width} squares={squares} addGroup = {addGroup} setAddGroup = {setAddGroup} select={select} setSelect={setSelect} changeSelect={changeSelect} setChangeSelect={setChangeSelect} changeProp={changeProp} setChangeProp={setChangeProp} changePropInput={changePropInput} cropProp={cropProp} cropChange={cropChange} setCropChange={setCropChange} cropChangeInput={cropChangeInput} addItem={addItem} handleUpdateSquares={handleUpdateSquares} showCrop={showCrop}/>
            }
            

            {
                <Edit tempID={tempID} socket={socket} squares={squares} select={select} changeSelect={changeSelect} changeProp={changeProp} setChangeProp={setChangeProp} changePropInput={changePropInput} setChangePropInput={setChangePropInput} cropProp={cropProp} setCropProp={setCropProp} cropChange={cropChange} cropChangeInput={cropChangeInput} setCropChangeInput={setCropChangeInput} showCrop={showCrop} setShowCrop={setShowCrop} handleUpdateSquares={handleUpdateSquares}/>
            }
        </div>
        
    )

    
    }}

export default EditTemplate