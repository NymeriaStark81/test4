import EditImage from './EditImage'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquareCaretUp, faSquareCaretDown } from "@fortawesome/free-regular-svg-icons"
import { faBold, faItalic, faUnderline, faStrikethrough, faAlignLeft, faAlignCenter, faAlignRight, faAlignJustify, faSlash } from "@fortawesome/free-solid-svg-icons"
import { useState } from 'react';

const handleTableResize_Rows = (select, e) => {
    const original_rows = select.content.length;
    var content_type = ''
    if(select.name == 'input'){
        content_type = 'The content input from journal view will appear here';
    };

    if(original_rows > e.target.value){
        for (let i = 0; i < (original_rows - e.target.value); i++) {
            select.content.pop();
        };
    } else if(original_rows < e.target.value){
        for (let i = 0; i < (e.target.value - original_rows); i++) {
            select.content.push([]);
            while (select.content[select.content.length - 1].length < select.columns){
                select.content[select.content.length - 1].push([content_type]);
            }
    };
}
};

const handleTableResize_Columns = (select, e) => {
    const original_columns = select.content[0].length;
    var content_type = ''
    if(select.name == 'input'){
        content_type = 'The content input from journal view will appear here';
    };

    for(let i=0; i < select.content.length; i++){
        if(original_columns > e.target.value){
            while (select.content[i].length > e.target.value) {
                select.content[i].pop();
            }
        } else if(original_columns < e.target.value){
            while (select.content[i].length < e.target.value) {
                select.content[i].push([content_type]);
            }
        };
    };
};

const handleUpdatePreview = (a, b) => {
    return null
}

async function cropHandle(e, socket, select, cropProp, setCropProp, squares, changeProp, setChangeProp, tempID, handleUpdateSquares){
    try{
        e.preventDefault()
        if(cropProp.top < 0){
            cropProp.height = cropProp.height+cropProp.top
            cropProp.top = 0
        }

        if(cropProp.height + cropProp.top > select.height){
            cropProp.height = cropProp.height - (cropProp.height - (select.height - cropProp.top))
        }

        if(cropProp.left < 0){
            cropProp.width = Number(cropProp.width)+cropProp.left
            cropProp.left = 0
        }

        if(cropProp.left + Number(cropProp.width) > select.width){
            cropProp.width = Number(cropProp.width) - (Number(cropProp.width) - (select.width - cropProp.left))
        }
        
        var cropTransform = {
            width: parseInt(cropProp.width/select.width*select.original_width),
            height: parseInt(cropProp.height/select.height*select.original_height),
            top: parseInt(cropProp.top/select.height*select.original_height),
            left: parseInt(cropProp.left/select.width*select.original_width)
        }


        const buffer = await requestBuffer(select.source, cropTransform)
        socket.emit('s3_bucket', {buffer: buffer, url: select.source, image_id: select.id})
        

        socket.on('reply', (msg) => {
            if(select.id === msg.image_id){
                if(msg.image_new_props.url !== select.source){
                    var del = true
                    squares.map((square) => {
                        if((square.source === select.source) && (square.id !== select.id)){
                            del = false
                        }
                    })
                    if(del){
                        socket.emit('delete_image', {url: select.source})
                    }
                }
                
                select.source = msg.image_new_props.url.split('?')[0]
                select.original_width = msg.image_new_props.width
                select.original_height = msg.image_new_props.height
                select.width = cropProp.width
                select.height = cropProp.height
                handleUpdateSquares(squares, tempID)
                setCropProp(({
                    width: 0,
                    height: 0,
                    top: 0,
                    left: 0
                }))
                setChangeProp(changeProp+1)
            }
        });
    } catch(err) {
        console.log(err)
    }
}

const requestBuffer = async (url, cropTransform) => {
    try {
        var buffer;
        await fetch("https://test4-nymeria-starks-projects.vercel.app/requestBuffer/", {
            method: 'POST',
            body: JSON.stringify({url: url, cropTransform: cropTransform}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {return res.json()})
        .then((data)=> {
            buffer = data
        });
        return buffer       
    } catch(err) {
        console.log(err)
    }
}

const Edit = ({tempID, temp_type, socket, squares, fonts, select, changeSelect, changeProp, setChangeProp, changePropInput, setChangePropInput, cropProp, setCropProp, cropChange, cropChangeInput, setCropChangeInput, showCrop, setShowCrop, handleUpdateSquares, previewGroup}) => {
    
    const borderComp = (select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput) => {
        return (
            <div>
                <label>
                    Border Style 
                    <select key={changePropInput} className="edit-select-input" onChange={(e) => { select.borderStyle = e.target.value; if(e.target.value == "none"){select.borderColor = "none"} else {select.borderColor = "#000000"}; handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}} defaultValue={select.borderStyle}>
                        <option value='dashed'>dashed</option>
                        <option value='solid'>solid</option>
                        <option value='dotted'>dotted</option>
                        <option value='double'>double</option>
                        <option value='none'>none</option>
                    </select>
                </label> <br />
                <label>
                    Border Color
                    <div>
                        <span key={changePropInput} className={select.borderColor=='none' ? 'material-symbols-outlined no-color' : 'material-symbols-outlined show-color'} onClick={() => {if(select.borderColor !== 'none'){select.borderColor = "none", select.borderStyle = 'none' } else {select.borderColor = "#000000"}; setChangePropInput(changePropInput+1)}}>
                            hide_source
                        </span>
                    </div>
                    {select.borderColor !== "none" &&
                        <input className="edit-color-input" type="color" onChange={(e) => { select.borderColor = e.target.value, handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}} defaultValue={select.borderColor}/>
                    }
                </label> <br />
                <label>
                    Border Width <div> px </div> <input className="edit-number-input" type="number" onChange={(e) => { if(e.target.value < 0) {e.target.value = 0} select.borderWidth = e.target.value, handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}} defaultValue={select.borderWidth}/>
                </label> <br />
                <label>
                    Border Radius <div> px </div> <input className="edit-number-input" type="number" onChange={(e) => { if(e.target.value < 0) {e.target.value = 0} select.borderRadius = e.target.value, handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}} defaultValue={select.borderRadius}/>
                </label> <br />
            </div>
        )
    }

    const lineComp = (select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput) => {
        return (
            <div>
                <label>
                    Line Style 
                    <select key={changePropInput} className="edit-select-input" onChange={(e) => { select.borderStyle = e.target.value; if(e.target.value == "none"){select.borderColor = "none"} else {select.borderColor = "#000000"}; handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}} defaultValue={select.borderStyle}>
                        <option value='dashed'>dashed</option>
                        <option value='solid'>solid</option>
                        <option value='dotted'>dotted</option>
                        <option value='double'>double</option>
                    </select>
                </label> <br />
                <label>
                    Line Color <div>  </div>
                    <input className="edit-color-input" type="color" onChange={(e) => { select.borderColor = e.target.value, handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}} defaultValue={select.borderColor}/>
                </label> <br />
                <label>
                    Line Width <div> px </div> <input className="edit-number-input" type="number" onChange={(e) => { if(e.target.value < 0) {e.target.value = 0} select.borderWidth = e.target.value, handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}} defaultValue={select.borderWidth}/>
                </label> <br />
            </div>
        )
    }

    const position = (select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput) => {
        return (
            <div>
                <label>
                    Position X <div> px </div> <input className="edit-number-input" type="number" onChange={(e) => { select.left = e.target.value, handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}} defaultValue={select.left}/>
                </label> <br />
                <label>
                    Position Y <div> px </div> <input className="edit-number-input" type="number" onChange={(e) => { select.top = e.target.value, handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}} defaultValue={select.top}/>
                </label> <br />
            </div>
        )
    }

    const size = (select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput) => {
        return (
            <div>
                <label>
                    Width <div> px </div> <input className="edit-number-input" type="number" onChange={(e) => { if(e.target.value < 0) {e.target.value = 0} select.width = e.target.value, handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}} defaultValue={select.width}/>
                </label> <br />
                <label>
                    Height <div> px </div> <input className="edit-number-input" type="number" onChange={(e) => { if(e.target.value < 0) {e.target.value = 0} select.height = e.target.value, handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}} defaultValue={select.height}/>
                </label> <br />
            </div>
        )
    }

    const sizeLine = (select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput) => {
        return (
            <div>
                <label>
                    Width <div> px </div> <input className="edit-number-input" type="number" onChange={(e) => { if(e.target.value < 0) {e.target.value = 0} select.width = e.target.value, handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}} defaultValue={select.width}/>
                </label> <br />
            </div>
        )
    }

    const opacity = (select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput) => {
        return (
            <div>
                <label>
                    Opacity <div> % </div> <input className="edit-number-input" type="number" onChange={(e) => { if(e.target.value < 0) {e.target.value = 0} if(e.target.value > 100) {e.target.value = 100} select.opacity = e.target.value, handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}} defaultValue={select.opacity}/>
                </label> <br />
            </div>
        )
    }

    const ZIndex = (select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput) => {
        return (
            <div>
                <label>
                    Bring forward 
                    <FontAwesomeIcon className="bring" icon={faSquareCaretDown} onClick={(e) => { select.z_index = select.z_index - 1, handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}} defaultValue={select.z_index}/> 
                    <FontAwesomeIcon className="bring" icon={faSquareCaretUp} onClick={(e) => { select.z_index = select.z_index + 1, handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}} defaultValue={select.z_index}/>
                </label> <br />
            </div>
        )
    }

    const rotate = (select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput) => {
        return (
            <div>
                <label>
                    Rotate <div> ° </div> <input className="edit-number-input" type="number" onChange={(e) => {if(e.target.value < 0) {e.target.value = 0} if(e.target.value > 360) {e.target.value = 360} select.rotate = e.target.value, handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}} defaultValue={select.rotate}/>
                </label> <br />
            </div>
        )
    }

    const backgroundColor = (select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput) => {
        return (
            <div>
                <label>
                    Background Color
                    <div>
                        <span key={changePropInput} className={select.backgroundColor=='none' ? 'material-symbols-outlined no-color' : 'material-symbols-outlined show-color'} onClick={() => {if(select.backgroundColor !== 'none'){select.backgroundColor = "none" } else {select.backgroundColor = "#BDBDBD"}; setChangePropInput(changePropInput+1)}}>
                            hide_source
                        </span>
                    </div>
                    {select.backgroundColor !== "none" &&
                        <input className="edit-color-input" type="color" onChange={(e) => { select.backgroundColor = e.target.value, handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}} defaultValue={select.backgroundColor}/>
                    }
                </label> <br />
            </div>
        )
    }

    const fontComp = (select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput) => {
        return (
            <div>
                <label>
                    Font size <div> px </div> <input className="edit-number-input" type="number" onChange={(e) => { if(e.target.value < 0) {e.target.value = 0} select.fontSize = e.target.value, handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}} defaultValue={select.fontSize}/>
                </label> <br />
                <label style={{marginTop: '15px', marginBottom: '20px', marginLeft: '5px', display: 'flex', flexDirection: "row", gap: '25px'}}>
                    <FontAwesomeIcon className={select.fontStyle == "italic" ? 'text-style-current' : 'text-style'} icon={faItalic} onClick={() => {
                        if(select.fontStyle == "italic") {select.fontStyle = 'normal'} else {select.fontStyle = 'italic'} 
                        handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}}/>
                    <FontAwesomeIcon className={select.textDecoration == "underline" ? 'text-style-current' : 'text-style'} icon={faUnderline} onClick={() => { 
                        if(select.textDecoration == "underline") {select.textDecoration = 'none'} else { select.textDecoration = 'underline'}
                        handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}}/>
                    <FontAwesomeIcon className={select.textDecoration == "line-through" ? 'text-style-current' : 'text-style'} icon={faStrikethrough} style={{marginRight: '70px'}} onClick={() => {
                        if(select.textDecoration == "line-through") {select.textDecoration = 'none'} else {select.textDecoration = 'line-through'}
                        handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}}/>
                    <FontAwesomeIcon className={select.align == "left" ? 'text-style-current' : 'text-style'} icon={faAlignLeft} onClick={() => {select.align = 'left', handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}}/>
                    <FontAwesomeIcon className={select.align == "center" ? 'text-style-current' : 'text-style'} icon={faAlignCenter} onClick={() => { select.align = 'center', handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}}/>
                    <FontAwesomeIcon className={select.align == "right" ? 'text-style-current' : 'text-style'} icon={faAlignRight} onClick={() => { select.align = 'right', handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}}/>
                    <FontAwesomeIcon className={select.align == "justify" ? 'text-style-current' : 'text-style'} icon={faAlignJustify} onClick={() => { select.align = 'justify', handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}}/>
                </label>
                <label>
                    Font color <input className="edit-font-color-input" type="color" onChange={(e) => { select.fontColor = e.target.value, handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}} defaultValue={select.fontColor}/>
                </label> <br />
                <label>
                    Font Family
                    <select className="font-picker" onChange={(e) => {
                            const fontarr = e.target.value.split(',')
                            select.fontFamily = fontarr[0],
                            select.fontCategory = fontarr[1],
                            select.fontWeight = fontarr[2],
                            handleUpdateSquares(squares, tempID), 
                            setChangePropInput(changePropInput+1)
                        }} defaultValue={select.fontFamily + ',' + select.fontCategory + ',' + select.fontWeight}>
                            {fonts.map((font, index) => {
                                return(
                                    <option key={index} value={font.family + ',' + font.category + ',' + font.weight} >{font.family + ' ' + font.variation}</option>
                                )
                            })}
                    </select>
                </label> <br />
                <label>
                    Line spacing <div> </div> <input className="edit-number-input" type="number" onChange={(e) => {select.lineHeight = e.target.value, handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}} defaultValue={select.lineHeight}/>
                </label> <br />
                <label>
                    Letter spacing <div> px </div> <input className="edit-number-input" type="number" onChange={(e) => { if(e.target.value < 0) {e.target.value = 0} select.letterSpacing = e.target.value, handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}} defaultValue={select.letterSpacing}/>
                </label>
            </div>
        )
    }

    const date = (select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput) => {
        return (
            <div>
                <label>
                    Week day format
                    <select key={changePropInput} className="edit-select-input" onChange={(e) => { select.weekDayFormat = e.target.value; handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}} defaultValue={select.weekDayFormat}>
                        <option value='none'>none</option>
                        <option value='monday'>monday, tuesday, ...</option>
                        <option value='Monday'>Monday, Tuesday, ...</option>
                        <option value='MONDAY'>MONDAY, TUESDAY, ...</option>
                        <option value='mon'>mon, tue, ...</option>
                        <option value='Mon'>Mon, Tue, ...</option>
                        <option value='MON'>MON, TUE, ...</option>
                        <option value='m'>m, t, ...</option>
                        <option value='M'>M, T, ...</option>
                    </select>
                </label> <br />
                <label>
                    Separate week day
                    <select key={changePropInput} className="edit-select-input" onChange={(e) => { select.separate1 = e.target.value; handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}} defaultValue={select.separate1}>
                        <option value='none'>none</option>
                        <option value=','>,</option>
                    </select>
                </label> <br />
                <label>
                    Separate date
                    <select key={changePropInput} className="edit-select-input" onChange={(e) => { select.separate2 = e.target.value; handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}} defaultValue={select.separate2}>
                        <option value='.'>.</option>
                        <option value='/'>/</option>
                        <option value='-'>-</option>
                    </select>
                </label> <br />
                <label>
                    Day format
                    <select key={changePropInput} className="edit-select-input" onChange={(e) => { select.dayFormat = e.target.value; handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}} defaultValue={select.dayFormat}>
                        <option value='none'>none</option>
                        <option value='1sf'>1, 2, ..., 31</option>
                        <option value='2sf'>01, 02, ..., 31</option>
                    </select>
                </label> <br />
                <label>
                    Month format
                    <select key={changePropInput} className="edit-select-input" onChange={(e) => { select.monthFormat = e.target.value; handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}} defaultValue={select.monthFormat}>
                        <option value='none'>none</option>
                        <option value='january'>january, february, ...</option>
                        <option value='January'>January, February, ...</option>
                        <option value='JANUARY'>JANUARY, FEBRUARY, ...</option>
                        <option value='jan'>jan, feb, ...</option>
                        <option value='Jan'>Jan, Feb, ...</option>
                        <option value='JAN'>JAN, FEB, ...</option>
                        <option value='j'>j, f, ...</option>
                        <option value='J'>J, F, ...</option>
                    </select>
                </label> <br />
                <label>
                    Year format
                    <select key={changePropInput} className="edit-select-input" onChange={(e) => { select.yearFormat = e.target.value; handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}} defaultValue={select.yearFormat}>
                        <option value='none'>none</option>
                        <option value='2sf'>YY</option>
                        <option value='4sf'>YYYY</option>
                    </select>
                </label> <br /> <br />
            </div>
        )
    }

    const padding = (select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput) => {
        return (
            <div>
                <label>
                    Padding Top <div> px </div> <input className="edit-number-input" type="number" onChange={(e) => {select.paddingTop = e.target.value, handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}} defaultValue={select.paddingTop}/>
                </label> <br />
                <label>
                    Padding Bottom <div> px </div> <input className="edit-number-input" type="number" onChange={(e) => {select.paddingBottom = e.target.value, handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}} defaultValue={select.paddingBottom}/>
                </label> <br />
                <label>
                    Padding Left <div> px </div> <input className="edit-number-input" type="number" onChange={(e) => {select.paddingLeft = e.target.value, handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}} defaultValue={select.paddingLeft}/>
                </label> <br />
                <label>
                    Padding Right <div> px </div> <input className="edit-number-input" type="number" onChange={(e) => {select.paddingRight = e.target.value, handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}} defaultValue={select.paddingRight}/>
                </label>
            </div>
        )
    }

    const groupSpacing = (previewGroup, setChangePropInput, changePropInput) => {
        return (
            <div>
                <label>
                    SpacingX <div> px </div> <input className="edit-number-input" type="number" onChange={(e) => {previewGroup.spacingX = e.target.value, setChangePropInput(changePropInput+1)}} defaultValue={previewGroup.spacingX}/>
                </label> <br />
                <label>
                    SpacingY <div> px </div> <input className="edit-number-input" type="number" onChange={(e) => {previewGroup.spacingY = e.target.value, setChangePropInput(changePropInput+1)}} defaultValue={previewGroup.spacingY}/>
                </label> <br />
            </div>
        )
    }

    const icon = (select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput) => {
        return (
            <div>
                <label>
                    Icon Width <div> px </div> <input className="edit-number-input" type="number" onChange={(e) => { if(e.target.value < 0) {e.target.value = 0} select.icon_width = e.target.value, handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}} defaultValue={select.icon_width}/>
                </label> <br /><br/>
                Icons
                {(select.type != "mood") && (select.name != "dropdown") &&
                    <div>
                    Finished icon
                    <img
                        style={{marginTop:'-5px', marginRight: '30px', float: 'right'}}
                        src={select.icon_tick}
                        width='50px'
                        height='50px'
                    /> <br/><br/>
                    Todo icon
                    <img
                        style={{marginTop:'-5px', marginRight: '30px', float: 'right'}}
                        src={select.icon_untick}
                        width='50px'
                        height='50px'
                    /><br/><br/>
                    </div>
                }
                {(select.type =="mood") && (select.name =="dropdown") && select.options.map((icon, index) => {
                    return(
                        <div key={index}>
                            {icon[0]}
                            <img
                                style={{marginTop:'-5px', marginRight: '10px', float: 'right'}}
                                src={icon[1]}
                                width='50px'
                                height='50px'
                            />
                            <img
                                style={{marginTop:'-5px', marginRight: '70px', float: 'right'}}
                                src={icon[2]}
                                width='50px'
                                height='50px'
                            /><br/><br/>
                        </div>
                    )
                })}
                {(select.type =="mood") && (select.name =="multiple") &&
                    <div>
                        Finished icon
                        <img
                            style={{marginTop:'-5px', marginRight: '30px', float: 'right'}}
                            src={select.options[0]}
                            width='50px'
                            height='50px'
                        /> <br/><br/>
                        Todo icon
                        <img
                            style={{marginTop:'-5px', marginRight: '30px', float: 'right'}}
                            src={select.options[1]}
                            width='50px'
                            height='50px'
                        /><br/><br/>
                    </div>
                }
                {(select.type == 'previewTodo') &&
                <div>
                    Add Button
                    <img
                        style={{marginTop:'-5px', marginRight: '30px', float: 'right'}}
                        src={select.add_btn}
                        width='50px'
                        height='50px'
                    /> <br/><br/>
                    Delete Button
                    <img
                        style={{marginTop:'-5px', marginRight: '30px', float: 'right'}}
                        src={select.delete_btn}
                        width='50px'
                        height='50px'
                    />
                </div>
                }
            </div>
        )
    }

    const order = (select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput) => {
        return (
            <div>
                <label>
                        Order <div>  </div> <input className="edit-number-input" type="number" onChange={(e) => {
                            var flag = true
                            squares.map((square, index) => {
                                if((square.type == select.type) && (Number(square.order) == Number(e.target.value))){
                                    flag = false
                                    alert('Order used. Enter a different order or delete the existing list with the target order.')
                                }
                            })
                            if(flag){
                                if(select.type == 'calendar'){
                                    select.order = e.target.value
                                    if(e.target.value%7== 2){
                                        select.day = 'Tuesday'
                                    } else if(e.target.value%7== 3){
                                        select.day = 'Wednesday'
                                    } else if(e.target.value%7== 4){
                                        select.day = 'Thursday'
                                    } else if(e.target.value%7== 5){
                                        select.day = 'Friday'
                                    } else if(e.target.value%7== 6){
                                        select.day = 'Saturday'
                                    } else if(e.target.value%7== 0){
                                        select.day = 'Sunday'
                                    } else {
                                        select.day = 'Monday'
                                    }
                                } else if (select.type == 'date'){
                                        select.order = Number(e.target.value)
                                } else {
                                    squares.map((square, index) => {
                                        if(square.parentID == select.parentID){
                                            square.order = Number(e.target.value)
                                        }
                                    })
                                }
                                handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)
                            }}} defaultValue={select.order}/>
                </label> <br /> <br />
            </div>
        )
    }

    const analytic = (select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput) => {
        return (
        <div>
            <label>
                Source type
                <select key={changePropInput} className="edit-select-input" onChange={(e) => {
                    if(previewGroup == ''){
                        squares.map((square, index) => {
                            if(square.parentID == select.parentID && square.type != 'text'){
                                square.ref_type = e.target.value
                            }
                    })} else {select.ref_type = e.target.value}
                    handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}} defaultValue={select.ref_type}>
                    <option value='daily'>Daily</option>
                    <option value='weekly'>Weekly</option>
                    <option value='monthly'>Monthly</option>
                    <option value='yearly'>Yearly</option>
                </select>
            </label> <br />
            <label>
                Analytic format
                <select key={changePropInput} className="edit-select-input" onChange={(e) => {
                    if(previewGroup == ''){
                        squares.map((square, index) => {
                        if(square.parentID == select.parentID && square.type != 'text'){
                            square.name = e.target.value
                    }})} else {select.name = e.target.value}
                    handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}} defaultValue={select.name}>
                    <option value='%'>percentage</option>
                    <option value='#'>number of tasks completed per total number of tasks</option>
                </select>
            </label> <br /><br/>
        </div>
        )
    }

    
    return(
        <div key={[changeSelect, changeProp, cropChange]} className="edit-canvas">
                    {(select.type == 'shape' && select.name != 'line') &&
                        <div>
                            <h2 className="add-edit_title"> Edit Component </h2>
                            {position(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            <br />
                            {size(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            <br />
                            {ZIndex(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            {rotate(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            {(select.name === "parallelogram") &&
                                <label>
                                    Skewness <div> ° </div> <input className="edit-number-input" type="number" onChange={(e) => { select.skew = e.target.value, handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}} defaultValue={select.skew}/> <br />
                                </label>
                            }
                            {opacity(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            {backgroundColor(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            <br />
                            {borderComp(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                        </div>
                    }
                    {(select.type == 'shape' && select.name == 'line') &&
                        <div>
                            <h2 className="add-edit_title"> Edit Component </h2>
                            {position(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            <br />
                            {sizeLine(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            <br />
                            {ZIndex(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            {rotate(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            {opacity(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            <br />
                            {lineComp(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                        </div>
                    }

                    {((select.type == 'text') || (select.type == 'fixed_text') || (select.type == 'date') || (select.type == 'diary') || (select.type == 'analys')) &&
                        <div>
                            <h2 className="add-edit_title"> Edit Component </h2>
                            {(select.type == 'date') && (temp_type != 'daily') && order(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            {position(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            <br />
                            {size(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            <br />
                            {(select.type == 'analys') && 
                            analytic(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)
                            }
                            {fontComp(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            <br />
                            {padding(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            <br />
                            {(select.type == 'date') && 
                                date(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)
                            }
                            {ZIndex(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            {rotate(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            {opacity(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            {backgroundColor(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            <br />
                            {borderComp(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            
                        </div>
                    }
                    {(select.type === 'image') && (showCrop == '') &&
                        <EditImage select={select} cropProp={cropProp} setShowCrop={setShowCrop} changeProp={changeProp} changePropInput={changePropInput} setChangePropInput={setChangePropInput} handleUpdateSquares={handleUpdateSquares} squares={squares} tempID={tempID} position={position} borderComp={borderComp} ZIndex={ZIndex} rotate={rotate} opacity={opacity}/>
                    }
                    {(showCrop != '') &&
                        <div>
                            <h2 className="add-edit_title"> Edit Component </h2>
                            <label>
                                Position X <div> px </div> <input className="edit-number-input" type="number" onChange={(e) => { cropProp.left = Number(e.target.value), setCropChangeInput(cropChangeInput+1)}} defaultValue={cropProp.left}/>
                            </label> <br />
                            <label>
                                Position Y <div> px </div> <input className="edit-number-input" type="number" onChange={(e) => { cropProp.top = Number(e.target.value), setCropChangeInput(cropChangeInput+1)}} defaultValue={cropProp.top}/>
                            </label> <br /><br />
                            <label>
                                Width <div> px </div> <input className="edit-number-input" type="number" onChange={(e) => { cropProp.width = Number(e.target.value), setCropChangeInput(cropChangeInput+1)}} defaultValue={cropProp.width}/>
                            </label> <br />
                            <label>
                                Height <div> px </div> <input className="edit-number-input" type="number" onChange={(e) => { cropProp.height = Number(e.target.value), setCropChangeInput(cropChangeInput+1)}} defaultValue={cropProp.height}/>
                            </label> <br /> <br />
                            <button onClick={(e) => {
                                    if((cropProp.top + cropProp.height <= 0) || (cropProp.top >= select.height) || (cropProp.left + Number(cropProp.width) < 0) || (cropProp.left >= Number(select.width))){
                                        alert('Must crop within image')
                                    } else {
                                        setShowCrop('')
                                        cropHandle(e, socket, select, cropProp, setCropProp, squares, changeProp, setChangeProp, tempID, handleUpdateSquares)
                                    }
                                }}>Finish Crop</button> <br /> <br />
                            <button onClick={() => {setShowCrop('')}}>Cancel</button>
                        </div>
                    }
                    {(select.type == 'grid') &&
                        <div>
                            <h2 className="add-edit_title"> Edit Component </h2>
                            <label>
                                Columns <div></div><input className="edit-number-input" type="number" onBlur={(e) => {  if(e.target.value < 0) {e.target.value = 0}
                                                                                select.columns = e.target.value, 
                                                                                handleTableResize_Columns(select,e),
                                                                                handleUpdateSquares(squares, tempID), 
                                                                                setChangePropInput(changePropInput+1)}} defaultValue={select.columns}/>
                            </label> <br />
                            <label>
                                Rows <div></div><input className="edit-number-input" type="number" onBlur={(e) => { if(e.target.value < 0) {e.target.value = 0}
                                                                            select.rows = e.target.value, 
                                                                            handleTableResize_Rows(select, e),
                                                                            handleUpdateSquares(squares, tempID), 
                                                                            setChangePropInput(changePropInput+1)}} defaultValue={select.rows}/>
                            </label> <br />
                            <label>
                                Spacing <div> px </div> <input className="edit-number-input" type="number" onChange={(e) => { if(e.target.value < 0) {e.target.value = 0} select.spacing = e.target.value, handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}} defaultValue={select.spacing}/> <br />
                            </label><br />
                            {position(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            <br />
                            {size(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            <br />
                            {fontComp(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            <br />
                            {padding(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            <br />
                            {ZIndex(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            {opacity(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            {backgroundColor(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            <br />
                            {borderComp(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            
                        </div>
                    }
                    {(select.type == 'icon') &&
                        <div>
                            <h2 className="add-edit_title"> Edit Component </h2>
                            {(temp_type == 'weekly') && 
                            order(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)
                            }
                            {position(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            <br />
                            {icon(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            <br />
                            {ZIndex(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            {rotate(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            {opacity(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            <br />
                    </div>
                    }
                    {(select.type == 'button' || select.type == 'fixed_icon') &&
                        <div>
                            <h2 className="add-edit_title"> Edit Component </h2>
                            <label>
                                Icon Width <div> px </div> <input className="edit-number-input" type="number" onChange={(e) => { if(e.target.value < 0) {e.target.value = 0} select.icon_width = e.target.value, handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}} defaultValue={select.icon_width}/>
                            </label> <br /><br/>
                            {position(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            <br />
                            {ZIndex(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            {rotate(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            {opacity(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            <br />
                            {(select.type == 'button') && order(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            <br />
                    </div>
                    }
                    {(select.type == 'todo') &&
                        <div>
                            <h2 className="add-edit_title"> Edit Group </h2>
                            {order(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            <br />
                            {position(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            <br />
                            {size(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            <br />
                            <label>
                                SpacingY <div> px </div> <input className="edit-number-input" type="number" onChange={(e) => {select.spacingY = e.target.value, handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}} defaultValue={select.spacingY}/>
                            </label> <br />
                            <br />
                            <label>
                                Task height <div> px </div> <input className="edit-number-input" type="number" onChange={(e) => {select.el_height = e.target.value, handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}} defaultValue={select.el_height}/>
                            </label> <br />
                            <br />
                            {fontComp(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            <br />
                            {padding(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            <br />
                            {(select.type == 'date') && 
                                date(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)
                            }
                            {ZIndex(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            {opacity(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            {backgroundColor(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            <br />
                            {borderComp(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            <br />
                            {icon(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            <br />
                            
                        </div>
                    }
                    {(select.type == 'mood') &&
                        <div>
                            <h2 className="add-edit_title"> Edit Component </h2>
                            {order(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            <br />
                            {position(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            <br />
                            {icon(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            <br />
                            {ZIndex(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            {rotate(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            {opacity(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            <br />
                    </div>
                    }
                    {(select.type == 'calendar') &&
                        <div>
                            <h2 className="add-edit_title"> Edit Group </h2>
                            {position(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            <br />
                            {size(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            <br />
                            <label>
                                Day
                                <div key={changePropInput} style={{marginTop:'-5px', marginRight: '120px', float: 'right'}}> {select.day} </div>
                            </label> <br />
                            {order(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            {ZIndex(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            {rotate(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            {opacity(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            <br />
                            {backgroundColor(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            <br />
                            {borderComp(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            <br /> <br />
                            <h2 className="add-edit_title"> Date format </h2>
                            <label>
                                Height <div> px </div> <input className="edit-number-input" type="number" onChange={(e) => { if(e.target.value < 0) {e.target.value = 0} select.date_format.height = e.target.value, handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}} defaultValue={select.date_format.height}/>
                            </label> <br /> <br />
                            {fontComp(select.date_format, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            <br />
                            {padding(select.date_format, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            <br /><br />
                            
                            <h2 className="add-edit_title"> Entry format </h2>
                            {fontComp(select.entry, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            <br />
                            {padding(select.entry, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                            <br /><br />
                            
                            
                        </div>
                    }
                    

                    {(previewGroup.type === 'previewHabit') && 
                        <div>
                            <h2 className='add-edit_title'> Edit Group </h2>
                            {position(previewGroup, handleUpdatePreview, previewGroup, tempID, setChangePropInput, changePropInput)}
                            <br />
                            {(temp_type != 'yearly') &&
                                <label>
                                    Width <div> px </div> <input className="edit-number-input" type="number" onChange={(e) => { if(e.target.value < 0) {e.target.value = 0} select.width = e.target.value, handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}} defaultValue={select.width}/>
                                    <br /><br />
                                </label>
                            }
                            {groupSpacing(previewGroup, setChangePropInput, changePropInput)}
                            <br />
                            {icon(previewGroup, handleUpdatePreview, previewGroup, tempID, setChangePropInput, changePropInput)}
                            <br />
                            {ZIndex(previewGroup, handleUpdatePreview, previewGroup, tempID, setChangePropInput, changePropInput)}
                            {opacity(previewGroup, handleUpdatePreview, previewGroup, tempID, setChangePropInput, changePropInput)}
                            <br />
                            {fontComp(previewGroup, handleUpdatePreview, previewGroup, tempID, setChangePropInput, changePropInput)}
                            <br />
                            {padding(previewGroup, handleUpdatePreview, previewGroup, tempID, setChangePropInput, changePropInput)}
                            <br />
                            {backgroundColor(previewGroup, handleUpdatePreview, previewGroup, tempID, setChangePropInput, changePropInput)}
                            <br />
                            {borderComp(previewGroup, handleUpdatePreview, previewGroup, tempID, setChangePropInput, changePropInput)}
                        </div>
                    }
                    {(previewGroup.type === 'previewTodo') && 
                        <div>
                            <h2 className='add-edit_title'> Edit Group </h2>
                            {position(previewGroup, handleUpdatePreview, previewGroup, tempID, setChangePropInput, changePropInput)}
                            <br />
                            {size(previewGroup, handleUpdatePreview, previewGroup, tempID, setChangePropInput, changePropInput)}
                            <br />
                            <label>
                                SpacingY <div> px </div> <input className="edit-number-input" type="number" onChange={(e) => {previewGroup.spacingY = e.target.value, handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}} defaultValue={previewGroup.spacingY}/>
                            </label> <br />
                            <br />
                            <label>
                                Task height <div> px </div> <input className="edit-number-input" type="number" onChange={(e) => {previewGroup.el_height = e.target.value, handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}} defaultValue={previewGroup.el_height}/>
                            </label> <br />
                            <br />
                            {icon(previewGroup, handleUpdatePreview, previewGroup, tempID, setChangePropInput, changePropInput)}
                            <br />
                        </div>
                    }
                    {(previewGroup.type === 'previewMood') && (previewGroup.name == "dropdown") &&
                        <div>
                            <h2 className='add-edit_title'> Edit Group </h2>
                            {position(previewGroup, handleUpdatePreview, previewGroup, tempID, setChangePropInput, changePropInput)}
                            <br />
                            <label>
                                Overall Width <div> px </div> <input className="edit-number-input" type="number" onChange={(e) => { if(e.target.value < 0) {e.target.value = 0} select.width = e.target.value, setChangePropInput(changePropInput+1)}} defaultValue={select.width}/>
                            </label> <br />
                            <label>
                                Icon Width <div> px </div> <input className="edit-number-input" type="number" onChange={(e) => { if(e.target.value < 0) {e.target.value = 0} select.icon_width = e.target.value, setChangePropInput(changePropInput+1)}} defaultValue={select.icon_width}/>
                            </label> <br />
                        </div>
                    }
                    {(((previewGroup.type === 'previewMood') && (previewGroup.name == "monthly" || previewGroup.name == 'yearly')) || ((previewGroup.type === 'previewHabit') && (previewGroup.name == 'yearly'))) &&
                        <div>
                            <h2 className='add-edit_title'> Edit Group </h2>
                            {position(previewGroup, handleUpdatePreview, previewGroup, tempID, setChangePropInput, changePropInput)}
                            <br />
                            {(previewGroup.name == 'monthly') &&
                            <label>
                                SpacingY <div> px </div> <input className="edit-number-input" type="number" onChange={(e) => {previewGroup.spacingY = e.target.value, setChangePropInput(changePropInput+1)}} defaultValue={previewGroup.spacingY}/>
                            </label>
                            }
                            {(previewGroup.name == 'yearly') &&
                                groupSpacing(previewGroup, setChangePropInput, changePropInput)
                            }
                            <br />
                            {ZIndex(previewGroup, handleUpdatePreview, previewGroup, tempID, setChangePropInput, changePropInput)}
                            {opacity(previewGroup, handleUpdatePreview, previewGroup, tempID, setChangePropInput, changePropInput)}
                            <label>
                                Icon Width <div> px </div> <input className="edit-number-input" type="number" onChange={(e) => { if(e.target.value < 0) {e.target.value = 0} select.icon_width = e.target.value, handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}} defaultValue={select.icon_width}/>
                            </label> <br /><br/>
                            {fontComp(previewGroup, handleUpdatePreview, previewGroup, tempID, setChangePropInput, changePropInput)}
                            <br />
                            {padding(previewGroup, handleUpdatePreview, previewGroup, tempID, setChangePropInput, changePropInput)}
                            <br />
                            {backgroundColor(previewGroup, handleUpdatePreview, previewGroup, tempID, setChangePropInput, changePropInput)}
                            <br />
                            {borderComp(previewGroup, handleUpdatePreview, previewGroup, tempID, setChangePropInput, changePropInput)}
                        </div>
                    }
                    {(previewGroup.type === 'previewMood') && (previewGroup.name === 'multiple') &&
                        <div>
                            <h2 className='add-edit_title'> Edit Group </h2>
                            {position(previewGroup, handleUpdatePreview, previewGroup, tempID, setChangePropInput, changePropInput)}
                            <br />
                            <label>
                                Width <div> px </div> <input className="edit-number-input" type="number" onChange={(e) => { if(e.target.value < 0) {e.target.value = 0} select.width = e.target.value, setChangePropInput(changePropInput+1)}} defaultValue={select.width}/>
                            </label> <br />
                            <label>
                                Icon Width <div> px </div> <input className="edit-number-input" type="number" onChange={(e) => { if(e.target.value < 0) {e.target.value = 0} select.icon_width = e.target.value, setChangePropInput(changePropInput+1)}} defaultValue={select.icon_width}/>
                            </label> <br />
                            <label>
                                SpacingX <div> px </div> <input className="edit-number-input" type="number" onChange={(e) => { if(e.target.value < 0) {e.target.value = 0} select.spacingX = e.target.value, setChangePropInput(changePropInput+1)}} defaultValue={select.spacingX}/>
                            </label> <br />
                        </div>
                    }
                    {((select.type == 'previewHabitAnalys')||(select.type == 'previewMoodAnalys')) &&
                        <div>
                            <h2 className="add-edit_title"> Edit Group </h2>
                            {position(previewGroup, handleUpdatePreview, previewGroup, tempID, setChangePropInput, changePropInput)}
                            <br />
                            {(select.type == 'previewHabitAnalys') &&
                            <label>
                                Height <div> px </div> <input className="edit-number-input" type="number" onChange={(e) => { if(e.target.value < 0) {e.target.value = 0} select.height = e.target.value, handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}} defaultValue={select.height}/>
                            </label> 
                            }
                            {(select.type == 'previewMoodAnalys') &&
                            <label>
                                Icon Width <div> px </div> <input className="edit-number-input" type="number" onChange={(e) => { if(e.target.value < 0) {e.target.value = 0} select.icon_width = e.target.value, handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}} defaultValue={select.icon_width}/>
                            </label>
                            }
                            <br />
                            {groupSpacing(previewGroup, setChangePropInput, changePropInput)}
                            <br />
                            {ZIndex(previewGroup, handleUpdatePreview, previewGroup, tempID, setChangePropInput, changePropInput)}
                            {opacity(previewGroup, handleUpdatePreview, previewGroup, tempID, setChangePropInput, changePropInput)}
                            <br />

                            {(select.type == 'previewHabitAnalys') &&
                            <div>
                                <h2 className="add-edit_title"> Edit Habit Name </h2>
                                <label>
                                    Width <div> px </div> <input className="edit-number-input" type="number" onChange={(e) => { if(e.target.value < 0) {e.target.value = 0} select.text.width = e.target.value, handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}} defaultValue={select.text.width}/>
                                </label> <br />
                                {fontComp(previewGroup.text, handleUpdatePreview, previewGroup, tempID, setChangePropInput, changePropInput)}
                                <br />
                                {padding(previewGroup.text, handleUpdatePreview, previewGroup, tempID, setChangePropInput, changePropInput)}
                                <br />
                                {backgroundColor(previewGroup.text, handleUpdatePreview, previewGroup, tempID, setChangePropInput, changePropInput)}
                                <br />
                                {borderComp(previewGroup.text, handleUpdatePreview, previewGroup, tempID, setChangePropInput, changePropInput)}
                                <br />
                            </div> 
                            }
                            
                            <h2 className="add-edit_title"> Edit Percentage Indicator </h2>
                            <label>
                                Width <div> px </div> <input className="edit-number-input" type="number" onChange={(e) => { if(e.target.value < 0) {e.target.value = 0} select.percent.width = e.target.value, handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}} defaultValue={select.percent.width}/>
                            </label> <br /> <br />
                            {analytic(previewGroup, handleUpdatePreview, previewGroup, tempID, setChangePropInput, changePropInput)}
                            {fontComp(previewGroup.percent, handleUpdatePreview, previewGroup, tempID, setChangePropInput, changePropInput)}
                            <br />
                            {padding(previewGroup.percent, handleUpdatePreview, previewGroup, tempID, setChangePropInput, changePropInput)}
                            <br />
                            {backgroundColor(previewGroup.percent, handleUpdatePreview, previewGroup, tempID, setChangePropInput, changePropInput)}
                            <br />
                            {borderComp(previewGroup.percent, handleUpdatePreview, previewGroup, tempID, setChangePropInput, changePropInput)}
                            
                        </div>
                    }
        </div>
    )
}

export default Edit