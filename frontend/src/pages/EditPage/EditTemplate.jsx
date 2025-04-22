//import React, { useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom"
import '../../../src/App.css'
import { useState} from "react"
import { useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShapes, faHeading, faTableCellsLarge, faParagraph, faDumbbell, faListCheck, faChartPie, faMagnifyingGlassChart, faCalendarDays} from "@fortawesome/free-solid-svg-icons"
import { faImage, faCalendarCheck, faCircleCheck, faFaceLaughWink } from "@fortawesome/free-regular-svg-icons"
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
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
const socket = io('https://test4-nymeria-starks-projects.vercel.app/'); 

const handleUpdateSquares = (squares, tempID) => {
    socket.emit('update_db', {tempID: tempID, squares: squares})

}


const EditTemplate = () => {
    const navigate = useNavigate()

    const {state} = useLocation()
    const tempID = state.tempID
    const userID = state.userID
    var main_height = '1193'
    var main_width = '970'
    var [select, setSelect] = useState([])
    var [temporary, setTemporary] = useState([])
    var [previewGroup, setPreviewGroup] = useState([])
    var [temp_type, setTempType] = useState([])
    var [squares, setSquares] = useState([])
    var [tempDetails, setTempDetails] = useState([])
    var [changeSelect, setChangeSelect] = useState(0)
    var [changeProp, setChangeProp] = useState(0)
    var [changePropInput, setChangePropInput] = useState(0)
    var [addItem, setAddItem] = useState(0)
    var [showCrop, setShowCrop] = useState('')
    var [cropProp, setCropProp] = useState({
        width: 0,
        height: 0,
        top: 0,
        left: 0
    })
    var [cropChange, setCropChange] = useState(0)
    var [cropChangeInput, setCropChangeInput] = useState(0)
    var [newComp, setNewComp] = useState('')
    
    const [fonts, setFonts] = useState([]);

    useEffect(() => {

        const keyDown = (e) => {
            const vKey = 86, cKey = 67, delKey = 46, leftKey = 37, upKey = 38, rightKey = 39, downKey = 40
            if((e.repeat || e.Handled)&&!(e.keyCode == vKey || cKey || delKey)){return}
            if(e.keyCode == delKey){
                if(select.parentID){
                    for(let index=0; index < squares.length; index++){
                        if((squares[index].parentID == select.parentID) || (squares[index].id == select.parentID)){
                            squares.splice(index, 1)
                            index=-1
                        }
                        if(index + 1 == squares.length){
                            handleUpdateSquares(squares, tempID)
                            setChangeProp(changeProp+1)
                            break;
                        }
                    }
                } else {
                    squares.map((square, index) => {
                        if(square.id === select.id){
                            squares.splice(index, 1)
                            handleUpdateSquares(squares, tempID)
                            setChangeProp(changeProp+1)
                        } else {
                            return
                        }
                    })
                }
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
                    squares.push(temporary)
                    handleUpdateSquares(squares, tempID)
                    setAddItem(addItem + 1)
                }
                e.Handled = true
                if(temporary.type === "grid"){
                    window.location.reload(true)
                }
            }

            if(e.keyCode == upKey){
                    e.preventDefault()
                    select.top = select.top - 1 
                    setChangeProp(changeProp + 1)
                    handleUpdateSquares(squares, tempID)
            }

            if(e.keyCode == downKey){
                e.preventDefault()
                select.top = select.top + 1 
                setChangeProp(changeProp + 1)
                handleUpdateSquares(squares, tempID)
            }

            if(e.keyCode == leftKey){
                e.preventDefault()
                select.left = select.left - 1 
                setChangeProp(changeProp + 1)
                handleUpdateSquares(squares, tempID)
            }

            if(e.keyCode == rightKey){
                e.preventDefault()
                select.left = select.left + 1 
                setChangeProp(changeProp + 1)
                handleUpdateSquares(squares, tempID)
            }
        };
        
        window.addEventListener('keydown', keyDown)
       

        return() => window.removeEventListener('keydown', keyDown)
    })
    
    
    //run only once
    useEffect(() => {
        fetch("https://test4-nymeria-starks-projects.vercel.app/initialization/", {
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
            setTempDetails({title: data.title, layout: data.layout, temp_type: data.temp_type})
        })

        fetch("https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyCI8XMjk8he6pkZJp5CyKyScaMaQlUngDw&sort=style&sort=popularity")
        .then ((res) => {return(res.json())})
        .then ((data) => {
            const fontFamilies = [];
            data.items.map((item, index) => {
                Object.entries(item.files).forEach(([key, value]) =>{
                    if(key == '300'){
                        fontFamilies.push({family: item.family, category: item.category, variation: 'Light', weight: '300'})
                    } else if (key == '400' || key == 'regular') {
                        fontFamilies.push({family: item.family, category: item.category, variation: 'Regular', weight: '400'})
                    } else if (key == '500') {
                        fontFamilies.push({family: item.family, category: item.category, variation: 'Medium', weight: '500'})
                    } else if (key == '600') {
                        fontFamilies.push({family: item.family, category: item.category, variation: 'SemiBold', weight: '600'})
                    } else if (key == "700") {
                        fontFamilies.push({family: item.family, category: item.category, variation: 'Bold', weight: '700'})
                    } else if (key == '800') {
                        fontFamilies.push({family: item.family, category: item.category, variation: 'ExtraBold', weight: '800'})
                    }                
                })

                var link = 'https://fonts.googleapis.com/css2?'
                var family = item.family.replace(/ /g, '+')
                link = link + 'family=' + family
                var ital = false
                item.variants.map((variant, index) => {
                    if(variant == 'italic'){
                        ital = true
                    }
                })
                if(ital){
                    link = link + ':ital,' + 'wght@'
                    item.variants.map((variant, index) => {
                        if(variant == '300' || variant == '400' || variant == '500' || variant == '600' || variant == '700' || variant == '800'){
                            link = link + '0,' + variant + ';'
                        } else if(variant == 'regular') {
                            link = link + '0,400;'
                        }
                    })
                    item.variants.map((variant, index) => {
                        if(variant == '300italic' || variant == '400italic' || variant == '500italic' || variant == '600italic' || variant == '700italic' || variant == '800italic'){
                            const wght = variant.substr(0,3)
                            link = link + '1,' + wght + ';'
                        } else if(variant == 'italic'){
                            link = link + '1,400;'
                        }
                    })
                } else {
                    link = link + ':wght@'
                    item.variants.map((variant, index) => {
                        if(variant == '300' || variant == '400' || variant == '500' || variant == '600' || variant == '700' || variant == '800'){
                            link = link + variant + ';'
                        } else if(variant == 'regular') {
                            link = link + '400;'
                        }
                })}

                link = link.replace(/.$/, '&');
                link = link + 'display=swap'

                document.head.insertAdjacentHTML(
                    'beforeend',
                    `<link rel="stylesheet" crossorigin="anonymous" href=${link} type="text/css" />`);

                
            })
            

            /*var link = 'https://fonts.googleapis.com/css2?'
            data.items.map((item, index) => {
                var family = item.family.replace(/ /g, '+')
                link = link + 'family=' + family + '&'
            })
            link = link + 'display=swap'
            console.log(link)
            document.head.insertAdjacentHTML(
                'beforeend',
                `<link rel="stylesheet" href=${link} />`);*/

            /*data.items.map((item, index) => {
                console.log(item.files)
                Object.entries(item.files).map((file, index) => {
                    document.head.insertAdjacentHTML(
                        'beforeend',
                        `<link rel="stylesheet" href=${file[1]} />`);
                })
            })*/
            setFonts(fontFamilies);
        })
    }, []);    


    const updateThumbnail = async() => {
        const node = document.getElementById('my-node')
        await htmlToImage
            .toPng(node, { cacheBust: true, })
            .then(async(dataUrl) => {
                console.log('checkpoint 1', dataUrl)

                await fetch("https://test4-nymeria-starks-projects.vercel.app/check_thumbnail_template/", {
                    method: 'POST',
                    body: JSON.stringify({tempID: tempID}),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then ((res) => {return(res.json())})
                .then (async(tblink) => {
                    console.log('checkpoint 2')
                    if(tblink == ''){
                        await fetch("https://test4-nymeria-starks-projects.vercel.app/news3_thumbnail_template/", {
                            method: 'POST',
                            body: JSON.stringify({dataUrl: dataUrl}),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                        .then ((res) => {return(res.json())})
                        .then (async(url) => {
                            fetch("https://test4-nymeria-starks-projects.vercel.app/update_thumbnail_template/", {
                                method: 'POST',
                                body: JSON.stringify({tempID: tempID, thumbnail: url}),
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            })}
                        )

                    } else {
                        await fetch("https://test4-nymeria-starks-projects.vercel.app/updates3_thumbnail_template/", {
                            method: 'POST',
                            body: JSON.stringify({dataUrl: dataUrl, prevURL: tblink}),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                        .then ((res) => {return(res.json())})
                        .then (async(url) => {
                            console.log('checkpoint 3', url)
                            fetch("https://test4-nymeria-starks-projects.vercel.app/update_thumbnail_template/", {
                                method: 'POST',
                                body: JSON.stringify({tempID: tempID, thumbnail: url}),
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            })}
                        )

                    }

                })
    })    
    }

    if(fonts.length !== 0){
    return (
        <div className="whole">
            <div className="edit_header">
                <img src="./images/brand_light.png" className="edit_logo" onClick={async() => {
                    await updateThumbnail(),
                    navigate('/homepage', {
                            state: {
                                userID: userID
                            }
                        })}}/>
                <div className="edit_tempTitle">{tempDetails.title}</div>
                <div className="edit_tempTitle" style={{marginLeft:'700px'}}>{tempDetails.temp_type}</div>
                
                <div className="edit_signout" onClick={async() => {await updateThumbnail(), navigate('/')}}>Sign out</div> 
            </div>
            <div className="edit_main">
            <div className="ribbon">
                <div className={newComp=='shapes' ? "new_comp_add" : "new_comp"} onClick={() => {setNewComp('shapes')}} title="Shapes">
                    <FontAwesomeIcon icon={faShapes} />
                </div>
                <div className={newComp=='text' ? "new_comp_add" : "new_comp"} onClick={() => {setNewComp('text')}} title="Text">
                    <FontAwesomeIcon icon={faHeading} />
                </div>
                <div className={newComp=='image' ? "new_comp_add" : "new_comp"} onClick={() => {setNewComp('image')}} title="Image">
                    <FontAwesomeIcon icon={faImage} />
                </div>
                <div className={newComp=='grid' ? "new_comp_add" : "new_comp"} onClick={() => {setNewComp('grid')}} title="Grid">
                    <FontAwesomeIcon icon={faTableCellsLarge} />
                </div>
                <div className={newComp=='date' ? "new_comp_add" : "new_comp"} onClick={() => {setNewComp('date')}} title="Auto Update Date">
                    <FontAwesomeIcon icon={faCalendarCheck} />
                </div>
                <div className={newComp=='diary' ? "new_comp_add" : "new_comp"} onClick={() => {setNewComp('diary')}} title="Diary Input">
                    <FontAwesomeIcon icon={faParagraph} />
                </div>
                <div className={newComp=='todo' ? "new_comp_add" : "new_comp"} onClick={() => {setNewComp('todo')}} title="To-do List">
                    <FontAwesomeIcon icon={faCircleCheck} />
                </div>
                <div className={newComp=='mood-track' ? "new_comp_add" : "new_comp"} onClick={() => {setNewComp('mood-track')}} title="Mood Tracker">
                    <FontAwesomeIcon icon={faFaceLaughWink} />
                </div>
                <div className={newComp=='habit-track' ? "new_comp_add" : "new_comp"} onClick={() => {setNewComp('habit-track')}} title="Habit Tracker">
                    <FontAwesomeIcon icon={faDumbbell} />
                </div>

                {(temp_type != 'daily') &&
                <div>
                    <div className={newComp=='task-analys' ? "new_comp_add" : "new_comp"} onClick={() => {setNewComp('task-analys')}} title="Task Analysis">
                        <FontAwesomeIcon icon={faListCheck} />
                    </div>
                    <div className={newComp=='mood-analys' ? "new_comp_add" : "new_comp"} onClick={() => {setNewComp('mood-analys')}} title="Mood Analysis">
                        <FontAwesomeIcon icon={faChartPie} />
                    </div>
                    <div className={newComp=='habit-analys' ? "new_comp_add" : "new_comp"} onClick={() => {setNewComp('habit-analys')}} title="Habit Analysis">
                        <FontAwesomeIcon icon={faMagnifyingGlassChart} />
                    </div>
                </div>
                }

                {(temp_type == 'monthly') &&
                <div className={newComp=='calendar' ? "new_comp_add" : "new_comp"} onClick={() => {setNewComp('calendar')}} title="Monthly Calendar">
                    <FontAwesomeIcon icon={faCalendarDays} />
                </div>
                }
            </div>
            {
                <Add userID={userID} tempID={tempID} temp_type={temp_type} newComp={newComp} squares={squares} previewGroup = {previewGroup} setPreviewGroup = {setPreviewGroup} addItem={addItem} setAddItem={setAddItem} setSelect={setSelect} handleUpdateSquares={handleUpdateSquares}/>
            }

            
            {
                <Main key={previewGroup} tempID={tempID} temp_type={temp_type} main_height={main_height} main_width={main_width} squares={squares} previewGroup = {previewGroup} setPreviewGroup = {setPreviewGroup} select={select} setSelect={setSelect} changeSelect={changeSelect} setChangeSelect={setChangeSelect} changeProp={changeProp} setChangeProp={setChangeProp} changePropInput={changePropInput} cropProp={cropProp} cropChange={cropChange} setCropChange={setCropChange} cropChangeInput={cropChangeInput} addItem={addItem} handleUpdateSquares={handleUpdateSquares} showCrop={showCrop}/>
            }
            

            {
                <Edit tempID={tempID} temp_type={temp_type} socket={socket} squares={squares} fonts={fonts} select={select} changeSelect={changeSelect} changeProp={changeProp} setChangeProp={setChangeProp} changePropInput={changePropInput} setChangePropInput={setChangePropInput} cropProp={cropProp} setCropProp={setCropProp} cropChange={cropChange} cropChangeInput={cropChangeInput} setCropChangeInput={setCropChangeInput} showCrop={showCrop} setShowCrop={setShowCrop} handleUpdateSquares={handleUpdateSquares} previewGroup={previewGroup}/>
            }
            </div>
        </div>
        
    )}

    
    }

export default EditTemplate