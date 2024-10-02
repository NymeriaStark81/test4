import { useState } from 'react'
import Resize from './Resize'
import ResizeCrop from './ResizeCrop'
import ResizeInitial from './ResizeInitial'
import { useEffect } from 'react'


const Main = ({tempID, temp_type, main_height, main_width, squares, addGroup, setAddGroup, select, setSelect, changeSelect, setChangeSelect, changeProp, setChangeProp, changePropInput, cropProp, cropChange, setCropChange, cropChangeInput, addItem, handleUpdateSquares, showCrop}) => {
    var drag = (item) => {
        if(select.id === item && (!showCrop)){
            return true
        } else {
            return false
        }
    }

    var x_start, y_start

    return(
        <div className="main-canvas" style={{height : main_height + 'px', width: main_width + 'px'}}>
            {squares.map((square, index) => {
                if((square.type ==='shape') && (square.name !== "triangle")){ 
                    return (
                    <div id={square.id} draggable={drag(square.id)} key={[index, changeProp, changePropInput, addItem]} 
                        style={{width: square.width + 'px', 
                                height: square.height + 'px', 
                                top: square.top + 'px', 
                                left: square.left + 'px',
                                zIndex: square.z_index, 
                                transform: square.rotate,
                                opacity: square.opacity,
                                backgroundColor: square.backgroundColor,
                                borderStyle: square.borderStyle,
                                borderColor: square.borderColor,
                                borderWidth: square.borderWidth + 'px',
                                borderRadius: square.borderRadius + 'px',
                                position: "absolute"}}
                        onClick={() => {setSelect(square), setChangeSelect(changeSelect+1)}}
                        onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                        onDragEnd={(e) => {select.left = select.left + e.pageX - x_start, select.top = select.top + e.pageY - y_start, handleUpdateSquares(squares, tempID), setChangeProp(changeProp + 1)}}
                        className={`item ${square === select ? 'selected move' : ''}`}>
                            {(select.length !== 0) && (select.id == square.id) &&
                                <Resize select={select} handleUpdateSquares={handleUpdateSquares} squares={squares} x_start={x_start} y_start={y_start} tempID={tempID} changeProp={changeProp} setChangeProp={setChangeProp}/>
                            }
                    </div>
                    )
                }

                if(square.name === "triangle"){ 
                    return (
                    <div id={square.id} draggable={drag(square.id)} key={[index, changeProp, changePropInput, addItem]} 
                        style={{width: square.width + 'px', 
                                height: square.height + 'px', 
                                top: square.top + 'px', 
                                left: square.left + 'px',
                                zIndex: square.z_index, 
                                transform: square.rotate,
                                opacity: square.opacity,
                                position: 'relative'}}
                        onClick={() => {setSelect(square), setChangeSelect(changeSelect+1)}}
                        onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                        onDragEnd={(e) => {select.left = select.left + e.pageX - x_start, select.top = select.top + e.pageY - y_start, handleUpdateSquares(squares, tempID), setChangeProp(changeProp + 1)}}
                        className={`item ${square === select ? 'selected move' : ''}`}>
                            <div style={{
                                left: '0px',
                                top: '0px',
                                position: 'absolute',
                                borderLeft: square.width*0.5 + 'px solid transparent',
                                borderRight: square.width*0.5 + 'px solid transparent',
                                borderBottom: square.height + 'px solid ' + square.backgroundColor
                                }}>
                            </div>
                            {(select.length !== 0) && (select.id == square.id) &&
                                <Resize select={select} handleUpdateSquares={handleUpdateSquares} squares={squares} x_start={x_start} y_start={y_start} tempID={tempID} changeProp={changeProp} setChangeProp={setChangeProp}/>
                            }
                    </div>
                    )
                }

                if(square.type =='image'){
                    return (
                            <div id={square.id} draggable={drag(square.id)} key={[index, changeProp, changePropInput, addItem]}
                                    style={{
                                            position: "absolute",
                                            left: square.left + 'px',
                                            top: square.top + 'px',
                                            height: square.height + 'px',
                                            hidth: square.width + 'px', 
                                            zIndex: square.z_index,
                                            transform: square.rotate,
                                            opacity: square.opacity,
                                            borderStyle: square.borderStyle,
                                            borderColor: square.borderColor,
                                            borderWidth: square.borderWidth + 'px',
                                            borderRadius: square.borderRadius + 'px'}}
                                    onClick={(e) => {setSelect(square), setChangeSelect(changeSelect+1)}}
                                    onDragStart={(e) => {if(!showCrop){x_start = e.pageX, y_start = e.pageY}}}
                                    onDragEnd={(e) => {if(!showCrop){select.left = select.left + e.pageX - x_start, select.top = select.top + e.pageY - y_start, handleUpdateSquares(squares, tempID), setChangeProp(changeProp + 1)}}}
                                    className={`item ${square.id === select.id ? 'selected move' : ''}` }>
                        
                                <img
                                    src={square.source}
                                    width = {square.width}
                                    height={square.height}
                                />

                                {showCrop && (select.id === square.id) &&
                                    <div key = {{cropChangeInput, cropChange}} draggable="true" style={{backgroundColor: "gray",
                                                    opacity: "50%",
                                                    position: 'absolute',
                                                    zIndex: '12',
                                                    top: cropProp.top + 'px',
                                                    left: cropProp.left + 'px',
                                                    width: cropProp.width + 'px',
                                                    height: cropProp.height + 'px'
                                                    }}
                                            onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                                            onDragEnd={(e) => {cropProp.left = cropProp.left + e.pageX - x_start, cropProp.top = cropProp.top + e.pageY - y_start, setCropChange(cropChange + 1)}}
                                    >
                                        {
                                            <ResizeCrop cropProp={cropProp} x_start={x_start} y_start={y_start} cropChange={cropChange} setCropChange={setCropChange}/>
                                        }
                                    </div>
                                }
                                {(select.length !== 0) && (select.id === square.id) && (!showCrop) &&
                                    <Resize select={select} handleUpdateSquares={handleUpdateSquares} squares={squares} x_start={x_start} y_start={y_start} tempID={tempID} changeProp={changeProp} setChangeProp={setChangeProp}/>
                                }
                        
                            </div>                        
                    )
                }

                if(square.type == 'text') {
                    return (
                        <div id={square.id} draggable={drag(square.id)} key={[index, changeProp, changePropInput, addItem]} 
                            style={{
                                    width: square.width + 'px',
                                    top: square.top + 'px', 
                                    left: square.left + 'px',
                                    zIndex: square.z_index, 
                                    transform: square.rotate,
                                    opacity: square.opacity,
                                    backgroundColor: square.backgroundColor,
                                    borderStyle: square.borderStyle,
                                    borderColor: square.borderColor,
                                    borderWidth: square.borderWidth + 'px',
                                    borderRadius: square.borderRadius + 'px',
                                    position: "absolute", 
                                }}
                            onClick={() => {setSelect(square), setChangeSelect(changeSelect+1)}}
                            onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                            onDragEnd={(e) => {select.left = select.left + e.pageX - x_start, select.top = select.top + e.pageY - y_start, handleUpdateSquares(squares, tempID), setChangeProp(changeProp + 1)}}
                            className={`item ${square === select ? 'selected move' : ''}`}>
                                <input style={{
                                            width: '100%',
                                            fontFamily: square.fontFamily,
                                            fontSize: square.fontSize + 'px',
                                            color: square.fontColor,
                                            fontStyle: square.fontStyle,
                                            fontWeight: square.fontWeight,
                                            textDecoration: square.textDecoration,
                                            border: 'none transparent', 
                                            outline: 'none', 
                                            backgroundColor: 'transparent'}}
                                    onChange={(e) => {select.content = e.target.value, handleUpdateSquares(squares, tempID)}} defaultValue={square.content}/>
                                {(select.length !== 0) && (select.id == square.id) &&
                                    <Resize select={select} handleUpdateSquares={handleUpdateSquares} squares={squares} x_start={x_start} y_start={y_start} tempID={tempID} changeProp={changeProp} setChangeProp={setChangeProp}/>
                                }
                        </div>
                        )
                }

                if(square.type == 'grid') {
                    return (
                        <div id={square.id} draggable={drag(square.id)} key={[index, changeProp, changePropInput, addItem]} 
                            style={{width: (square.width*square.columns + (square.spacing*(square.columns+1)))/main_width*100 + '%',
                                    minHeight: (square.height*square.rows + (square.spacing*(square.rows+1))) + 'px',
                                    top: square.top + 'px', 
                                    left: square.left + 'px',
                                    position: 'absolute', 
                                    overflow: "hidden"}}
                                    onClick={() => {setSelect(square), setChangeSelect(changeSelect+1)}}
                                    onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                                    onDragEnd={(e) => {select.left = select.left + e.pageX - x_start, select.top = select.top + e.pageY - y_start, handleUpdateSquares(squares, tempID), setChangeProp(changeProp + 1)}}
                                    className={`item ${square === select ? 'selected move' : ''}`}>
                        <table style={{ width: '100%',
                                        height: (square.height*square.rows + (square.spacing*square.rows-1)) + 'px',
                                        display: "table",
                                        tableLayout: "fixed",
                                        zIndex: square.z_index,
                                        opacity: square.opacity + '%',
                                        borderSpacing: square.borderSpacing + 'px'
                                        }}>
                            <tbody>
                                {square.content.map((row, index_row) => {
                                    return (
                                        <tr key={index_row}>
                                            {row.map((cell, index_col) => {
                                                return(
                                                    <td key={index_col} 
                                                        style={{backgroundColor: square.backgroundColor,
                                                                borderStyle: square.borderStyle,
                                                                borderColor: square.borderColor,
                                                                borderWidth: square.borderWidth + 'px',
                                                                borderRadius: square.borderRadius + 'px',
                                                                width: square.width/(square.width*square.columns + (square.spacing*(square.columns+1)))*100 + '%',
                                                                overflow: "hidden"}}>
                                                            <textarea onChange={(e) => {select.content[index_row][index_col] = e.target.value, handleUpdateSquares(squares, tempID)}}
                                                            style={{paddingTop: square.height*0.05 + 'px', 
                                                                    paddingBottom: square.height*0.05 + 'px', 
                                                                    paddingLeft: square.width*0.05 + 'px',
                                                                    paddingRight: square.width*0.05 + 'px',
                                                                    width: '90%', 
                                                                    height: square.height*0.9 + 'px',
                                                                    textAlign: square.textAlign,
                                                                    fontFamily: square.fontFamily,
                                                                    color: square.fontColor,
                                                                    fontSize: square.fontSize + 'px',
                                                                    fontStyle: square.fontSize,
                                                                    fontWeight: square.fontWeight,
                                                                    textDecoration: square.textDecoration,
                                                                    scrollbarWidth: 'none',
                                                                    resize: 'none',
                                                                    border: 'none transparent', 
                                                                    outline: 'none', 
                                                                    backgroundColor: 'transparent'}} 
                                                            defaultValue={cell}/>
                                                    </td>
                                                )
                                            })}
                                        </tr>
                                    )    
                                })}
                            </tbody>
                        </table>
                            {(select.length !== 0) && (select.id == square.id) &&
                                <Resize select={select} handleUpdateSquares={handleUpdateSquares} squares={squares} x_start={x_start} y_start={y_start} tempID={tempID} changeProp={changeProp} setChangeProp={setChangeProp}/>
                            }
                        </div>
                    )
                }

                if(square.type == 'habit') {
                    return (
                        <div id={square.id} draggable={drag(square.id)} key={[index, changeProp, changePropInput, addItem]} 
                            style={{
                                    width: square.width + 'px',
                                    height: square.height + 'px',
                                    top: square.top + 'px', 
                                    left: square.left + 'px',
                                    zIndex: square.z_index, 
                                    transform: square.rotate,
                                    opacity: square.opacity,
                                    fontFamily: square.fontFamily,
                                    fontSize: square.fontSize + 'px',
                                    color: square.fontColor,
                                    fontStyle: square.fontStyle,
                                    fontWeight: square.fontWeight,
                                    textDecoration: square.textDecoration,
                                    backgroundColor: square.backgroundColor,
                                    borderStyle: square.borderStyle,
                                    borderColor: square.borderColor,
                                    borderWidth: square.borderWidth + 'px',
                                    borderRadius: square.borderRadius + 'px',
                                    position: "absolute",
                                    overflow: 'hidden'
                                }}
                            onClick={() => {setSelect(square), setChangeSelect(changeSelect+1)}}
                            onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                            onDragEnd={(e) => {select.left = select.left + e.pageX - x_start, select.top = select.top + e.pageY - y_start, handleUpdateSquares(squares, tempID), setChangeProp(changeProp + 1)}}
                            className={`item ${square === select ? 'selected move' : ''}`}>
                                {square.content}
                                {(select.length !== 0) && (select.id == square.id) &&
                                    <Resize select={select} handleUpdateSquares={handleUpdateSquares} squares={squares} x_start={x_start} y_start={y_start} tempID={tempID} changeProp={changeProp} setChangeProp={setChangeProp}/>
                                }
                        </div>
                        )
                }

                if(square.type =='icon'){
                    return (
                            <div id={square.id} draggable={drag(square.id)} key={[index, changeProp, changePropInput, addItem]}
                                    style={{
                                            position: "absolute",
                                            left: square.left + 'px',
                                            top: square.top + 'px',
                                            height: square.height + 'px',
                                            width: square.width + 'px', 
                                            zIndex: square.z_index,
                                            transform: square.rotate,
                                            opacity: square.opacity,
                                            borderStyle: square.borderStyle,
                                            borderColor: square.borderColor,
                                            borderWidth: square.borderWidth + 'px',
                                            borderRadius: square.borderRadius + 'px'}}
                                    onClick={(e) => {setSelect(square), setChangeSelect(changeSelect+1)}}
                                    onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                                    onDragEnd={(e) => {select.left = select.left + e.pageX - x_start, select.top = select.top + e.pageY - y_start, handleUpdateSquares(squares, tempID), setChangeProp(changeProp + 1)}}
                                    className={`item ${square.id === select.id ? 'selected move' : ''}` }>
                        
                                <img
                                    src={`${square.status === true ? square.icon_tick : square.icon_untick}`}
                                    width = {square.width}
                                    height={square.height}
                                    //onClick={() => {if(square.status === false){square.status = true}else{square.status = false} setChangeProp(changeProp+1)}}
                                />

                                {(select.length !== 0) && (select.id === square.id) &&
                                    <Resize select={select} handleUpdateSquares={handleUpdateSquares} squares={squares} x_start={x_start} y_start={y_start} tempID={tempID} changeProp={changeProp} setChangeProp={setChangeProp}/>
                                }
                        
                            </div>                        
                    )
                }

                
            })}

            {(addGroup.type === 'habit_initialize') &&
                <div key={changeProp} draggable="true"  style={{
                    position: 'absolute',
                    width: addGroup.overall_width + 'px',
                    height: addGroup.overall_height + 'px',
                    backgroundColor: 'green',
                    top: addGroup.top + 'px',
                    left: addGroup.left + 'px'
                }}
                onClick={() => {setSelect(addGroup), setChangeSelect(changeSelect+1)}}
                onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                onDragEnd={(e) => {addGroup.left = addGroup.left + e.pageX - x_start, addGroup.top = addGroup.top + e.pageY - y_start, setChangeProp(changeProp + 1)}}
                className='item selected move'>
                    {addGroup.habits.map((habit, index) => {
                        return (
                            <div key={index} style={{
                                        position: 'absolute',
                                        width: addGroup.overall_width + 'px',
                                        height: addGroup.height + 'px',
                                        border: '2px solid black',
                                        top: (addGroup.height*index + ((addGroup.overall_height - addGroup.height*addGroup.habits.length)/(addGroup.habits.length-1))*(index))/addGroup.overall_height*100 + '%'
                                    }}>
                                <div  style={{
                                        width: addGroup.width + 'px',
                                        height: addGroup.height + 'px',
                                        float: 'left',
                                        overflow: 'hidden',
                                        opacity: addGroup.opacity,
                                        fontFamily: addGroup.fontFamily,
                                        fontSize: addGroup.fontSize + 'px',
                                        color: addGroup.fontColor,
                                        fontStyle: addGroup.fontStyle,
                                        fontWeight: addGroup.fontWeight,
                                        textDecoration: addGroup.textDecoration,
                                        backgroundColor: addGroup.backgroundColor,
                                        borderStyle: addGroup.borderStyle,
                                        borderColor: addGroup.borderColor,
                                        borderWidth: addGroup.borderWidth + 'px',
                                        borderRadius: addGroup.borderRadius + 'px'
                                }}>
                                    {habit}
                                </div>
                                <div style={{
                                        float: 'right',
                                        width: addGroup.icon_width + 'px', 
                                        height: addGroup.icon_width + 'px',
                                        overflow: 'hidden'}}>
                                    <img src={addGroup.icon_tick} width={addGroup.icon_width} height={addGroup.icon_width}></img>
                                </div>
                            </div>
                        )
                    })}
                {
                 <ResizeInitial select={addGroup} x_start={x_start} y_start={y_start} changeProp={changeProp} setChangeProp={setChangeProp}/>
                }
                 </div>
            }
        </div>
    )

}

export default Main