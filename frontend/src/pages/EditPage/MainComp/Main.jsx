import { useState } from 'react'
import Resize from './Resize'
import ResizeCrop from './ResizeCrop'
import ResizeInitial from './ResizeInitial'
import ResizeLine from './ResizeLine'
import { useEffect } from 'react'
import PreviewTodo from './PreviewTodoList'
import TodoList from './TodoList'


const Main = ({tempID, temp_type, main_height, main_width, squares, previewGroup, setPreviewGroup, select, setSelect, changeSelect, setChangeSelect, changeProp, setChangeProp, changePropInput, cropProp, cropChange, setCropChange, cropChangeInput, addItem, handleUpdateSquares, showCrop}) => {
    const daysM = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const days = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10','11', '12', '13', '14', '15', '16', '17', '18', '19', '20','21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct','Nov', 'Dec']

    var drag = (item) => {
        if(select.id === item && (showCrop == '')){
            return true
        } else {
            return false
        }
    }

    useEffect(() => {
        if(previewGroup!=''){
            setSelect(previewGroup)
        }
    }, [previewGroup])


    const dropdownTag = (square) => {
        if(temp_type == 'yearly'){
            return(`mood: ${square.day} ${square.month[1]}`)
        } else if (temp_type == 'monthly'){
            return(`mood: ${square.day}`)
        } else if (temp_type == 'weekly') {
            return(`mood: ${square.order}`)
        } else {
            return('')
        }
    }


    var x_start, y_start


    return(
        <div className='main-canvas'>
        <div id="my-node" className="canvas" style={{height : main_height + 'px', width: main_width + 'px'}}>
            {squares.map((square, index) => {
                if((square.type ==='shape') && (square.name !== "triangle") && (square.name !== "line")){ 
                    return (
                    <div id={square.id} draggable={drag(square.id)} key={[index, changeProp, changePropInput, addItem]} 
                        style={{width: square.width + 'px', 
                                height: square.height + 'px', 
                                top: square.top + 'px', 
                                left: square.left + 'px',
                                zIndex: square.z_index, 
                                transform: 'rotate(' + square.rotate + 'deg)' + '' + 'skew(' + square.skew + 'deg)' + '',
                                opacity: square.opacity + '%',
                                backgroundColor: square.backgroundColor,
                                borderStyle: square.borderStyle,
                                borderColor: square.borderColor,
                                borderWidth: square.borderWidth + 'px',
                                borderRadius: square.borderRadius + '%',
                                position: "absolute"}}
                        onClick={() => {setSelect(square), setPreviewGroup(''), setChangeSelect(changeSelect+1)}}
                        onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                        onDragEnd={(e) => {select.left = Number(select.left) + e.pageX - x_start, select.top = Number(select.top) + e.pageY - y_start, handleUpdateSquares(squares, tempID), setChangeProp(changeProp + 1)}}
                        className={`item ${square === select ? 'selected move' : ''}`}>
                            {(select.length !== 0) && (select.id == square.id) &&
                                <Resize select={select} handleUpdateSquares={handleUpdateSquares} squares={squares} x_start={x_start} y_start={y_start} tempID={tempID} changeProp={changeProp} setChangeProp={setChangeProp}/>
                            }
                    </div>
                    )
                }

                if((square.name ==='line')){ 
                    return (
                    <div id={square.id} draggable={drag(square.id)} key={[index, changeProp, changePropInput, addItem]} 
                        style={{width: square.width + 'px', 
                                height: square.height + 'px', 
                                top: square.top + 'px', 
                                left: square.left + 'px',
                                zIndex: square.z_index, 
                                transform: 'rotate(' + square.rotate + 'deg)',
                                opacity: square.opacity + '%',
                                backgroundColor: "transparent",
                                borderStyle: square.borderStyle,
                                borderColor: square.borderColor,
                                borderTop: 'none',
                                borderLeft: 'none',
                                borderRight: 'none',
                                borderBottom: square.borderWidth + 'px ' + square.borderStyle + ' ' + square.borderColor,
                                position: "absolute",
                            }}
                        onClick={() => {setSelect(square), setPreviewGroup(''), setChangeSelect(changeSelect+1)}}
                        onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                        onDragEnd={(e) => {select.left = Number(select.left) + e.pageX - x_start, select.top = Number(select.top) + e.pageY - y_start, handleUpdateSquares(squares, tempID), setChangeProp(changeProp + 1)}}
                        className={`item ${square === select ? 'move' : ''}`}>
                            {(select.length !== 0) && (select.id == square.id) &&
                                <ResizeLine select={select} handleUpdateSquares={handleUpdateSquares} squares={squares} x_start={x_start} y_start={y_start} tempID={tempID} changeProp={changeProp} setChangeProp={setChangeProp}/>
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
                                transform: 'rotate(' + square.rotate + 'deg)',
                                opacity: square.opacity + '%',
                                position: 'absolute'}}
                        onClick={() => {setSelect(square), setPreviewGroup(''), setChangeSelect(changeSelect+1)}}
                        onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                        onDragEnd={(e) => {select.left = Number(select.left) + e.pageX - x_start, select.top = Number(select.top) + e.pageY - y_start, handleUpdateSquares(squares, tempID), setChangeProp(changeProp + 1)}}
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
                    var rotate = square.rotate
                    var borderRadius = square.borderRadius
                    if(showCrop == square.id){
                        rotate = 0
                        borderRadius = 0
                    }
                    return (
                            <div id={square.id} draggable={drag(square.id)} key={[index, changeProp, changePropInput, addItem, showCrop]}
                                    style={{
                                            position: "absolute",
                                            left: square.left + 'px',
                                            top: square.top + 'px',
                                            height: square.height + 'px',
                                            width: square.width + 'px', 
                                            zIndex: square.z_index,
                                            transform: 'rotate(' + rotate + 'deg)',
                                            opacity: square.opacity + '%',
                                            borderStyle: square.borderStyle,
                                            borderColor: square.borderColor,
                                            borderWidth: square.borderWidth + 'px',
                                            overflow: "hidden"}}
                                    onClick={(e) => {setSelect(square), setPreviewGroup(''), setChangeSelect(changeSelect+1)}}
                                    onDragStart={(e) => {if(showCrop == ''){x_start = e.pageX, y_start = e.pageY}}}
                                    onDragEnd={(e) => {if(showCrop == ''){select.left = Number(select.left) + e.pageX - x_start, select.top = Number(select.top) + e.pageY - y_start, handleUpdateSquares(squares, tempID), setChangeProp(changeProp + 1)}}}
                                    className={`item ${square.id === select.id ? 'selected move' : ''}` }>
                        
                                <img
                                    src={square.source}
                                    width = {square.width}
                                    height={square.height}
                                    style={{
                                        borderRadius: borderRadius + 'px'}}
                                />

                                {(showCrop != '') && (select.id === square.id) &&
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
                                            onDragEnd={(e) => {cropProp.left = Number(cropProp.left) + e.pageX - x_start, cropProp.top = Number(cropProp.top) + e.pageY - y_start, setCropChange(cropChange + 1)}}
                                    >
                                        {
                                            <ResizeCrop cropProp={cropProp} x_start={x_start} y_start={y_start} cropChange={cropChange} setCropChange={setCropChange}/>
                                        }
                                    </div>
                                }
                                {(select.length !== 0) && (select.id === square.id) && (showCrop == '') &&
                                    <Resize select={select} handleUpdateSquares={handleUpdateSquares} squares={squares} x_start={x_start} y_start={y_start} tempID={tempID} changeProp={changeProp} setChangeProp={setChangeProp}/>
                                }
                        
                            </div>                        
                    )
                }

                if(square.type == 'text') {
                    return (
                        <div id={square.id} draggable={drag(square.id)} key={[index, changeProp, changePropInput, addItem]} 
                            style = {{
                                width: square.width + 'px',
                                height: square.height + 'px',
                                top: square.top + 'px', 
                                left: square.left + 'px',
                                zIndex: square.z_index, 
                                transform: 'rotate(' + square.rotate + 'deg)',
                                opacity: square.opacity + '%',
                                backgroundColor: square.backgroundColor,
                                borderStyle: square.borderStyle,
                                borderColor: square.borderColor,
                                borderWidth: square.borderWidth + 'px',
                                borderRadius: square.borderRadius + 'px',
                                position: "absolute",
                                overflow: 'visible',
                            }}
                            onClick={() => {setSelect(square), setPreviewGroup(''), setChangeSelect(changeSelect+1)}}
                            onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                            onDragEnd={(e) => {select.left = Number(select.left) + e.pageX - x_start, select.top = Number(select.top) + e.pageY - y_start, handleUpdateSquares(squares, tempID), setChangeProp(changeProp + 1)}}
                            className={`item ${square === select ? 'selected move' : ''}`}>
                                    <textarea className="focus" style={{
                                        width: square.width - square.paddingRight - square.paddingLeft + 'px',
                                        height: square.height - square.paddingTop - square.paddingBottom + 'px',
                                        textAlign: square.align,
                                        fontFamily: square.fontFamily + ',' + square.fontCategory,
                                        fontSize: square.fontSize + 'px',
                                        color: square.fontColor,
                                        fontStyle: square.fontStyle,
                                        fontWeight: square.fontWeight,
                                        textDecoration: square.textDecoration,
                                        lineHeight: square.lineHeight,
                                        letterSpacing: square.letterSpacing + 'px',
                                        paddingTop: square.paddingTop + 'px',
                                        paddingBottom: square.paddingBottom + 'px',
                                        paddingLeft: square.paddingLeft + 'px',
                                        paddingRight: square.paddingRight + 'px',
                                        border: 'none transparent', 
                                        outline: 'none', 
                                        backgroundColor: 'transparent',
                                        scrollbarWidth: 'none',
                                        resize: 'none'}}
                                    onChange={(e) => {select.content = e.target.value, handleUpdateSquares(squares, tempID)}} defaultValue={square.content}/>
                                
                                {(select.length !== 0) && (select.id == square.id) &&
                                    <Resize select={select} handleUpdateSquares={handleUpdateSquares} squares={squares} x_start={x_start} y_start={y_start} tempID={tempID} changeProp={changeProp} setChangeProp={setChangeProp}/>
                                }
                        </div>
                        )
                }

                if(square.type == 'diary') {
                    return (
                        <div id={square.id} draggable={drag(square.id)} key={[index, changeProp, changePropInput, addItem]} 
                            style = {{
                                width: square.width - square.paddingRight - square.paddingLeft + 'px',
                                height: square.height - square.paddingTop - square.paddingBottom + 'px',
                                top: square.top + 'px', 
                                left: square.left + 'px',
                                zIndex: square.z_index, 
                                transform: 'rotate(' + square.rotate + 'deg)',
                                opacity: square.opacity + '%',
                                backgroundColor: square.backgroundColor,
                                borderStyle: square.borderStyle,
                                borderColor: square.borderColor,
                                borderWidth: square.borderWidth + 'px',
                                borderRadius: square.borderRadius + 'px',
                                position: "absolute", 
                                overflow: 'hidden',
                                textAlign: square.align,
                                fontFamily: square.fontFamily + ',' + square.fontCategory,
                                fontSize: square.fontSize + 'px',
                                color: square.fontColor,
                                fontStyle: square.fontStyle,
                                fontWeight: square.fontWeight,
                                textDecoration: square.textDecoration,
                                lineHeight: square.lineHeight,
                                letterSpacing: square.letterSpacing + 'px',
                                paddingTop: square.paddingTop + 'px',
                                paddingBottom: square.paddingBottom + 'px',
                                paddingLeft: square.paddingLeft + 'px',
                                paddingRight: square.paddingRight + 'px',
                            }}
                            onClick={() => {setSelect(square), setPreviewGroup(''), setChangeSelect(changeSelect+1)}}
                            onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                            onDragEnd={(e) => {select.left = Number(select.left) + e.pageX - x_start, select.top = Number(select.top) + e.pageY - y_start, handleUpdateSquares(squares, tempID), setChangeProp(changeProp + 1)}}
                            className={`item ${square === select ? 'selected move' : ''}`}>
                                    
                                <div>{"This is a demo text. Paragraphs of diary input will appear here. These text will be replaced with real diary content, but will retain the same formating"}</div>
                                
                                {(select.length !== 0) && (select.id == square.id) &&
                                    <Resize select={select} handleUpdateSquares={handleUpdateSquares} squares={squares} x_start={x_start} y_start={y_start} tempID={tempID} changeProp={changeProp} setChangeProp={setChangeProp}/>
                                }
                        </div>
                        )
                }

                if(square.type == 'date') {
                    var content = ''
                    if(square.weekDayFormat == 'monday'){
                        content = content + 'monday'
                    } else if (square.weekDayFormat == 'Monday') {
                        content = content + 'Monday'
                    } else if (square.weekDayFormat == 'MONDAY') {
                        content = content + 'MONDAY'
                    } else if (square.weekDayFormat == 'mon') {
                        content = content + 'mon'
                    } else if (square.weekDayFormat == 'Mon') {
                        content = content + 'Mon'
                    } else if (square.weekDayFormat == 'MON') {
                        content = content + 'MON'
                    } else if (square.weekDayFormat == 'm') {
                        content = content + 'm'
                    } else if (square.weekDayFormat == 'M') {
                        content = content + 'M'
                    }

                    if(square.separate1 == ','){
                        content = content + ', '
                    } else {
                        content = content + ' '
                    }
                    
                    if(temp_type == 'daily') {
                        if(square.dayFormat == '1sf'){
                            content = content + '#'
                        } else if (square.dayFormat == '2sf') {
                            content = content + '##'
                        } 
                    } else {
                        if(square.dayFormat == '1sf'){
                            content = content + square.order
                        } else if (square.dayFormat == '2sf') {
                            if(square.order.toString().length == 1){
                                content = content + '0' + square.order
                            } else {
                                content = content + square.order
                            }
                        } 
                    }
                    

                    if(square.dayFormat != 'none' && (square.monthFormat != 'none' || square.yearFormat != 'none')){
                        content = content + square.separate2
                    }

                    if(square.monthFormat == '1sf'){
                        content = content + '#'
                    } else if (square.monthFormat == '2sf') {
                        content = content + '##'
                    } else if (square.monthFormat == 'january') {
                        content = content + 'january'
                    } else if (square.monthFormat == 'January') {
                        content = content + 'January'
                    } else if (square.monthFormat == 'JANUARY') {
                        content = content + 'JANUARY'
                    } else if (square.monthFormat == 'jan') {
                        content = content + 'jan'
                    } else if (square.monthFormat == 'Jan') {
                        content = content + 'Jan'
                    } else if (square.monthFormat == 'JAN') {
                        content = content + 'JAN'
                    } else if (square.monthFormat == 'j') {
                        content = content + 'j'
                    } else if (square.monthFormat == 'J') {
                        content = content + 'J'
                    }

                    if(square.monthFormat != 'none' && square.yearFormat != 'none'){
                        content = content + square.separate2
                    }

                    if(square.yearFormat == '2sf'){
                        content = content + 'YY'
                    } else if (square.yearFormat == '4sf') {
                        content = content + 'YYYY'
                    } 

                    return (
                        <div id={square.id} draggable={drag(square.id)} key={[index, changeProp, changePropInput, addItem]} 
                            style={{
                                    width: square.width - square.paddingRight - square.paddingLeft + 'px',
                                    height: square.height - square.paddingTop - square.paddingBottom + 'px',
                                    top: square.top + 'px', 
                                    left: square.left + 'px',
                                    zIndex: square.z_index, 
                                    transform: 'rotate(' + square.rotate + 'deg)',
                                    opacity: square.opacity + '%',
                                    backgroundColor: square.backgroundColor,
                                    borderStyle: square.borderStyle,
                                    borderColor: square.borderColor,
                                    borderWidth: square.borderWidth + 'px',
                                    borderRadius: square.borderRadius + 'px',
                                    position: "absolute",
                                    textAlign: square.align,
                                    fontFamily: square.fontFamily + ',' + square.fontCategory,
                                    fontSize: square.fontSize + 'px',
                                    color: square.fontColor,
                                    fontStyle: square.fontStyle,
                                    fontWeight: square.fontWeight,
                                    textDecoration: square.textDecoration,
                                    lineHeight: square.lineHeight,
                                    letterSpacing: square.letterSpacing + 'px',
                                    paddingTop: square.paddingTop + 'px',
                                    paddingBottom: square.paddingBottom + 'px',
                                    paddingLeft: square.paddingLeft + 'px',
                                    paddingRight: square.paddingRight + 'px',
                                    overflow: 'hidden'
                                }}
                            onClick={() => {setSelect(square), setPreviewGroup(''), setChangeSelect(changeSelect+1)}}
                            onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                            onDragEnd={(e) => {select.left = Number(select.left) + e.pageX - x_start, select.top = Number(select.top) + e.pageY - y_start, handleUpdateSquares(squares, tempID), setChangeProp(changeProp + 1)}}
                            className={`item ${square === select ? 'selected move' : ''}`}>
                            {`"${content}"`}
                            {(select.length !== 0) && (select.id == square.id) &&
                                <Resize select={select} handleUpdateSquares={handleUpdateSquares} squares={squares} x_start={x_start} y_start={y_start} tempID={tempID} changeProp={changeProp} setChangeProp={setChangeProp}/>
                            }
                        </div>
                        )
                }

                if(square.type == 'grid') {
                    return (
                        <div id={square.id} draggable={drag(square.id)} key={[index, changeProp, changePropInput, addItem]} 
                            style={{width: square.width + 'px',
                                    height: square.height + square.spacing + 'px',
                                    top: square.top + 'px', 
                                    left: square.left + 'px',
                                    position: 'absolute', 
                                    zIndex: square.z_index,
                                    overflow: "hidden"}}
                                    onClick={() => {setSelect(square), setPreviewGroup(''), setChangeSelect(changeSelect+1)}}
                                    onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                                    onDragEnd={(e) => {select.left = Number(select.left) + e.pageX - x_start, select.top = Number(select.top) + e.pageY - y_start, handleUpdateSquares(squares, tempID), setChangeProp(changeProp + 1)}}
                                    className={`item ${square === select ? 'selected move' : ''}`}>
                        <table style={{ width: '100%',
                                        display: "table",
                                        zIndex: square.z_index,
                                        opacity: square.opacity + '%',
                                        borderSpacing: square.spacing + 'px'
                                        }}>
                            <tbody>
                                {square.content.map((row, index_row) => {
                                    return (
                                        <tr key={index_row} style={{height: (square.height - square.spacing*(square.rows))/square.rows + 'px', overflow: 'hidden'}}>
                                            {row.map((cell, index_col) => {
                                                return(
                                                    <td key={index_col} 
                                                        style={{backgroundColor: square.backgroundColor,
                                                                borderStyle: square.borderStyle,
                                                                borderColor: square.borderColor,
                                                                borderWidth: square.borderWidth + 'px',
                                                                borderRadius: square.borderRadius + 'px',
                                                                position: 'relative',
                                                                overflow: "hidden"}}>
                                                        {(square.name == 'fixed') &&            
                                                        <textarea onChange={(e) => {select.content[index_row][index_col] = e.target.value, handleUpdateSquares(squares, tempID)}}
                                                            style={{width: (square.width - square.spacing*(square.columns+1))/square.columns - square.paddingRight - square.paddingLeft + 'px',
                                                                    height: (square.height - square.spacing*(square.rows))/square.rows - square.paddingTop - square.paddingBottom + 'px',
                                                                    position: 'absolute',
                                                                    top: '0px',
                                                                    textAlign: square.align,
                                                                    fontFamily: square.fontFamily + ',' + square.fontCategory,
                                                                    color: square.fontColor,
                                                                    fontSize: square.fontSize + 'px',
                                                                    fontStyle: square.fontStyle,
                                                                    fontWeight: square.fontWeight,
                                                                    textDecoration: square.textDecoration,
                                                                    lineHeight: square.lineHeight,
                                                                    letterSpacing: square.letterSpacing + 'px',
                                                                    paddingTop: square.paddingTop + 'px',
                                                                    paddingBottom: square.paddingBottom + 'px',
                                                                    paddingLeft: square.paddingLeft + 'px',
                                                                    paddingRight: square.paddingRight + 'px',
                                                                    scrollbarWidth: 'none',
                                                                    resize: 'none',
                                                                    border: 'none transparent', 
                                                                    outline: 'none',
                                                                    backgroundColor: square.backgroundColor}} 
                                                            defaultValue={cell}/>
                                                        }
                                                        {(square.name == 'input') && 
                                                            <div style={{width: (square.width - square.spacing*(square.columns+1))/square.columns - square.paddingRight - square.paddingLeft + 'px',
                                                                height: (square.height - square.spacing*(square.rows))/square.rows - square.paddingTop - square.paddingBottom + 'px',
                                                                position: 'absolute',
                                                                top: '0px',
                                                                textAlign: square.align,
                                                                fontFamily: square.fontFamily + ',' + square.fontCategory,
                                                                color: square.fontColor,
                                                                fontSize: square.fontSize + 'px',
                                                                fontStyle: square.fontStyle,
                                                                fontWeight: square.fontWeight,
                                                                textDecoration: square.textDecoration,
                                                                lineHeight: square.lineHeight,
                                                                letterSpacing: square.letterSpacing + 'px',
                                                                paddingTop: square.paddingTop + 'px',
                                                                paddingBottom: square.paddingBottom + 'px',
                                                                paddingLeft: square.paddingLeft + 'px',
                                                                paddingRight: square.paddingRight + 'px',
                                                                backgroundColor: square.backgroundColor}}>
                                                                    {`"The input content from journal view will appear here"`}
                                                            </div>
                                                        }
                                                        
                                                            
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

                if(square.type == 'fixed_text') {
                    return(
                    <div id={square.id} draggable={drag(square.id)} key={[index, changeProp, changePropInput, addItem]}         
                            style={{
                                    width: square.width + 'px',
                                    height: square.height + 'px',
                                    top: square.top + 'px', 
                                    left: square.left + 'px',
                                    zIndex: square.z_index, 
                                    transform: 'rotate(' + square.rotate + 'deg)',
                                    opacity: square.opacity,
                                    textAlign: square.align,
                                    fontFamily: square.fontFamily + ', ' + square.fontCategory,
                                    fontSize: square.fontSize + 'px',
                                    color: square.fontColor,
                                    fontStyle: square.fontStyle,
                                    fontWeight: square.fontWeight,
                                    textDecoration: square.textDecoration,
                                    backgroundColor: square.backgroundColor,
                                    lineHeight: square.lineHeight,
                                    letterSpacing: square.letterSpacing + 'px',
                                    paddingTop: square.paddingTop + 'px',
                                    paddingBottom: square.paddingBottom + 'px',
                                    paddingLeft: square.paddingLeft + 'px',
                                    paddingRight: square.paddingRight + 'px',
                                    borderStyle: square.borderStyle,
                                    borderColor: square.borderColor,
                                    borderWidth: square.borderWidth + 'px',
                                    borderRadius: square.borderRadius + 'px',
                                    position: "absolute",
                                    overflow: 'hidden'
                                }}
                            onClick={() => {setSelect(square), setPreviewGroup(''), setChangeSelect(changeSelect+1)}}
                            onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                            onDragEnd={(e) => {select.left = Number(select.left) + e.pageX - x_start, select.top = Number(select.top) + e.pageY - y_start, handleUpdateSquares(squares, tempID), setChangeProp(changeProp + 1)}}
                            className={`item ${square === select ? 'selected move' : ''}`}>
                                {square.content}
                                {(select.length !== 0) && (select.id == square.id) &&
                                    <Resize select={select} handleUpdateSquares={handleUpdateSquares} squares={squares} x_start={x_start} y_start={y_start} tempID={tempID} changeProp={changeProp} setChangeProp={setChangeProp}/>
                                }
                        </div>
                )}

                if(square.type == 'icon'){
                    var title
                    if(temp_type == 'daily'){
                        title = square.tag[2]
                    } else if(temp_type =='weekly'){
                        title = square.tag[2] + ' _ order: ' + square.order
                    } else if (temp_type == 'monthly') {
                        title = square.tag[1] + ' _ day: ' + square.day
                    } else if (temp_type == 'yearly'){
                        title = square.tag[1] + ' _ day: ' + square.day + ' ' + square.month[1]
                    }
                    return (
                            <div id={square.id} draggable={drag(square.id)} key={[index, changeProp, changePropInput, addItem]}
                            title={title}        
                            style={{
                                            position: "absolute",
                                            left: square.left + 'px',
                                            top: square.top + 'px',
                                            height: square.icon_width + 'px',
                                            width: square.icon_width + 'px', 
                                            zIndex: square.z_index,
                                            transform: 'rotate(' + square.rotate + 'deg)',
                                            opacity: square.opacity + '%'
                                        }}
                                    onClick={(e) => {setSelect(square), setPreviewGroup(''), setChangeSelect(changeSelect+1)}}
                                    onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                                    onDragEnd={(e) => {select.left = Number(select.left) + e.pageX - x_start, select.top = Number(select.top) + e.pageY - y_start, handleUpdateSquares(squares, tempID), setChangeProp(changeProp + 1)}}
                                    className={`item ${square.id === select.id ? 'selected move' : ''}` }>
                        
                                <img
                                    src={`${square.status === 0 ? square.icon_untick : square.icon_tick}`}
                                    width = {square.icon_width}
                                    height={square.icon_width}
                                    //onClick={() => {if(square.status === false){square.status = true}else{square.status = false} setChangeProp(changeProp+1)}}
                                />

                                {(select.length !== 0) && (select.id === square.id) &&
                                    <Resize select={select} handleUpdateSquares={handleUpdateSquares} squares={squares} x_start={x_start} y_start={y_start} tempID={tempID} changeProp={changeProp} setChangeProp={setChangeProp}/>
                                }
                        
                            </div>                        
                )}

                if(square.type == 'todo') {
                    return(
                        <div id={square.id} draggable={drag(square.id)} key={[index, changeProp, changePropInput, addItem]}
                            title={`order: ${square.order}`}    
                            style={{
                                position: 'absolute',
                                top: square.top + 'px',
                                left: square.left + 'px',
                                width: square.width + 'px',
                                height: square.height + 'px',
                                opacity: square.opacity + '%',
                                zIndex: square.z_index,
                                overflow: 'scroll',
                                scrollbarWidth: 'none'
                            }}
                            onClick={() => {setSelect(square), setPreviewGroup(''), setChangeSelect(changeSelect+1)}}
                            onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                            onDragEnd={(e) => {select.left = Number(select.left) + e.pageX - x_start, select.top = Number(select.top) + e.pageY - y_start, handleUpdateSquares(squares, tempID), setChangeProp(changeProp + 1)}}
                            className={`item ${square === select ? 'selected move' : ''}`}
                        >
                            <TodoList square={square}/>
                            {(select.length !== 0) && (select.id == square.id) &&
                                <Resize select={select} handleUpdateSquares={handleUpdateSquares} squares={squares} x_start={x_start} y_start={y_start} tempID={tempID} changeProp={changeProp} setChangeProp={setChangeProp}/>
                            }
                        </div>
                    )}

                if(square.type == 'button' || square.type == 'fixed_icon') {
                    return(
                            <div id={square.id} draggable={drag(square.id)} key={[index, changeProp, changePropInput, addItem]}
                                    style={{
                                            position: "absolute",
                                            left: square.left + 'px',
                                            top: square.top + 'px',
                                            height: square.icon_width + 'px',
                                            width: square.icon_width + 'px', 
                                            zIndex: square.z_index,
                                            transform: 'rotate(' + square.rotate + 'deg)',
                                            opacity: square.opacity + '%'
                                        }}
                                    onClick={(e) => {setSelect(square), setPreviewGroup(''), setChangeSelect(changeSelect+1)}}
                                    onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                                    onDragEnd={(e) => {select.left = Number(select.left) + e.pageX - x_start, select.top = Number(select.top) + e.pageY - y_start, handleUpdateSquares(squares, tempID), setChangeProp(changeProp + 1)}}
                                    className={`item ${square.id === select.id ? 'selected move' : ''}` }>
                        
                                <img
                                    src={square.source}
                                    width = {square.icon_width}
                                    height={square.icon_width}
                                    title={square.type=='button' ? `order: ${square.order}` : `mood: ${square.tag[2]}`}
                                />

                                {(select.length !== 0) && (select.id === square.id) &&
                                    <Resize select={select} handleUpdateSquares={handleUpdateSquares} squares={squares} x_start={x_start} y_start={y_start} tempID={tempID} changeProp={changeProp} setChangeProp={setChangeProp}/>
                                }
                        
                            </div>                        
                    )}

                if(square.type == 'mood') {
                    return(
                            <div id={square.id} draggable={drag(square.id)} key={[index, changeProp, changePropInput, addItem]}
                                    style={{
                                            position: "absolute",
                                            left: square.left + 'px',
                                            top: square.top + 'px',
                                            height: square.icon_width + 'px',
                                            width: square.icon_width + 'px', 
                                            zIndex: square.z_index,
                                            transform: 'rotate(' + square.rotate + 'deg)',
                                            opacity: square.opacity + '%'
                                        }}
                                    onClick={(e) => {setSelect(square), setPreviewGroup(''), setChangeSelect(changeSelect+1)}}
                                    onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                                    onDragEnd={(e) => {select.left = Number(select.left) + e.pageX - x_start, select.top = Number(select.top) + e.pageY - y_start, handleUpdateSquares(squares, tempID), setChangeProp(changeProp + 1)}}
                                    className={`item ${square.id === select.id ? 'selected move' : ''}` }>
                        
                                {square.name == "dropdown" &&
                                <img
                                    src={square.options[square.status][1]}
                                    width = {square.icon_width}
                                    height={square.icon_width}
                                    title={dropdownTag(square)}
                                />}
                                {square.name == "multiple" &&
                                <img
                                    src={square.options[1]}
                                    width = {square.icon_width}
                                    height={square.icon_width}
                                    title={temp_type == 'weekly' ? `mood: ${square.order}` : ''}
                                />}

                                {(select.length !== 0) && (select.id === square.id) &&
                                    <Resize select={select} handleUpdateSquares={handleUpdateSquares} squares={squares} x_start={x_start} y_start={y_start} tempID={tempID} changeProp={changeProp} setChangeProp={setChangeProp}/>
                                }
                        
                            </div>                        
                    )}

                if(square.type == 'analys') {
                    return (
                        <div id={square.id} draggable={drag(square.id)} key={[index, changeProp, changePropInput, addItem]}
                            title={square.parentType == 'task_analys' ? `Task Analytics - ${square.ref_type}` : `${square.tag[2]} - ${square.ref_type}`} 
                            style = {{
                                width: square.width  - square.paddingLeft - square.paddingRight + 'px',
                                height: square.height - square.paddingTop - square.paddingBottom + 'px',
                                top: square.top + 'px', 
                                left: square.left + 'px',
                                zIndex: square.z_index, 
                                transform: 'rotate(' + square.rotate + 'deg)',
                                opacity: square.opacity + '%',
                                backgroundColor: square.backgroundColor,
                                borderStyle: square.borderStyle,
                                borderColor: square.borderColor,
                                borderWidth: square.borderWidth + 'px',
                                borderRadius: square.borderRadius + 'px',
                                textAlign: square.align,
                                fontFamily: square.fontFamily + ',' + square.fontCategory,
                                fontSize: square.fontSize + 'px',
                                color: square.fontColor,
                                fontStyle: square.fontStyle,
                                fontWeight: square.fontWeight,
                                textDecoration: square.textDecoration,
                                lineHeight: square.lineHeight,
                                letterSpacing: square.letterSpacing + 'px',
                                paddingTop: square.paddingTop + 'px',
                                paddingBottom: square.paddingBottom + 'px',
                                paddingLeft: square.paddingLeft + 'px',
                                paddingRight: square.paddingRight + 'px',
                                position: "absolute",
                                overflow: 'visible',
                            }}
                            onClick={() => {setSelect(square), setPreviewGroup(''), setChangeSelect(changeSelect+1)}}
                            onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                            onDragEnd={(e) => {select.left = Number(select.left) + e.pageX - x_start, select.top = Number(select.top) + e.pageY - y_start, handleUpdateSquares(squares, tempID), setChangeProp(changeProp + 1)}}
                            className={`item ${square === select ? 'selected move' : ''}`}>
                                {(square.name == '%') && <div> ##% </div>}
                                {(square.name == '#') && <div> ##/## </div>}
                                {(select.length !== 0) && (select.id == square.id) &&
                                    <Resize select={select} handleUpdateSquares={handleUpdateSquares} squares={squares} x_start={x_start} y_start={y_start} tempID={tempID} changeProp={changeProp} setChangeProp={setChangeProp}/>
                                }
                        </div>
                        )
                }

                if(square.type == 'calendar') {
                    return (
                        <div id={square.id} draggable={drag(square.id)} key={[index, changeProp, changePropInput, addItem]} 
                            title = {'order: ' + square.order + ', day: ' + square.day}
                            style = {{
                                width: square.width + 'px',
                                height: square.height + 'px',
                                top: square.top + 'px', 
                                left: square.left + 'px',
                                zIndex: square.z_index, 
                                transform: 'rotate(' + square.rotate + 'deg)',
                                opacity: square.opacity + '%',
                                backgroundColor: square.backgroundColor,
                                borderStyle: square.borderStyle,
                                borderColor: square.borderColor,
                                borderWidth: square.borderWidth + 'px',
                                borderRadius: square.borderRadius + 'px',
                                position: "absolute", 
                                overflow: 'hidden',
                                textAlign: square.align,
                                fontFamily: square.fontFamily + ',' + square.fontCategory,
                                fontSize: square.fontSize + 'px',
                                color: square.fontColor,
                                fontStyle: square.fontStyle,
                                fontWeight: square.fontWeight,
                                textDecoration: square.textDecoration,
                                lineHeight: square.lineHeight,
                                letterSpacing: square.letterSpacing + 'px',
                                paddingTop: square.paddingTop + 'px',
                                paddingBottom: square.paddingBottom + 'px',
                                paddingLeft: square.paddingLeft + 'px',
                                paddingRight: square.paddingRight + 'px',
                            }}
                            onClick={() => {setSelect(square), setPreviewGroup(''), setChangeSelect(changeSelect+1)}}
                            onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                            onDragEnd={(e) => {select.left = Number(select.left) + e.pageX - x_start, select.top = Number(select.top) + e.pageY - y_start, handleUpdateSquares(squares, tempID), setChangeProp(changeProp + 1)}}
                            className={`item ${square === select ? 'selected move' : ''}`}>
                                <div style = {{
                                    position: 'absolute',
                                    top: '0px',
                                    left: '0px',
                                    width: square.width + 'px',
                                    height: square.date_format.height + 'px',
                                    textAlign: square.date_format.align,
                                    fontFamily: square.date_format.fontFamily + ',' + square.date_format.fontCategory,
                                    fontSize: square.date_format.fontSize + 'px',
                                    color: square.date_format.fontColor,
                                    fontStyle: square.date_format.fontStyle,
                                    fontWeight: square.date_format.fontWeight,
                                    textDecoration: square.date_format.textDecoration,
                                    lineHeight: square.date_format.lineHeight,
                                    letterSpacing: square.date_format.letterSpacing + 'px',
                                    paddingTop: square.date_format.paddingTop + 'px',
                                    paddingBottom: square.date_format.paddingBottom + 'px',
                                    paddingLeft: square.date_format.paddingLeft + 'px',
                                    paddingRight: square.date_format.paddingRight + 'px'
                                }}>
                                    {square.date_format.content}
                                </div>
                                <div style = {{
                                    position: 'absolute',
                                    top: square.date_format.height + 'px',
                                    left: '0px',
                                    width: square.width + 'px',
                                    height: Number(square.height - square.date_format.height) + 'px',
                                    textAlign: square.entry.align,
                                    fontFamily: square.entry.fontFamily + ',' + square.entry.fontCategory,
                                    fontSize: square.entry.fontSize + 'px',
                                    color: square.entry.fontColor,
                                    fontStyle: square.entry.fontStyle,
                                    fontWeight: square.entry.fontWeight,
                                    textDecoration: square.entry.textDecoration,
                                    lineHeight: square.entry.lineHeight,
                                    letterSpacing: square.entry.letterSpacing + 'px',
                                    paddingTop: square.entry.paddingTop + 'px',
                                    paddingBottom: square.entry.paddingBottom + 'px',
                                    paddingLeft: square.entry.paddingLeft + 'px',
                                    paddingRight: square.entry.paddingRight + 'px'
                                }}>
                                    {square.entry.content}
                                </div>
                                {(select.length !== 0) && (select.id == square.id) &&
                                    <Resize select={select} handleUpdateSquares={handleUpdateSquares} squares={squares} x_start={x_start} y_start={y_start} tempID={tempID} changeProp={changeProp} setChangeProp={setChangeProp}/>
                                }
                        </div>
                        )
                }

            })}


            
            {(previewGroup.type === 'previewTodo') &&
                <div key={[changeProp, changePropInput]} draggable="true" style={{
                    position: 'absolute',
                    width: previewGroup.width + 'px',
                    height: previewGroup.height + previewGroup.el_height + previewGroup.spacingY + 'px',
                    top: previewGroup.top + 'px',
                    left: previewGroup.left + 'px'
                }}
                onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                onDragEnd={(e) => {select.left = Number(select.left) + e.pageX - x_start, select.top = Number(select.top) + e.pageY - y_start, setChangeProp(changeProp + 1)}}
                className='item selected move'>
                    <div style={{
                                position: 'absolute',
                                float: 'left',
                                top: '0px',
                                left: '0px',
                                width: previewGroup.width - previewGroup.icon_width + 'px',
                                height: previewGroup.el_height + 'px',
                                fontFamily: "Inter, sans-serif",
                                fontSize: previewGroup.el_height/5*3 + 'px',
                                color: 'black',
                                fontWeight: '700'
                    }}> Todo List </div>
                    <div style={{
                                position: 'absolute',
                                right: '0px',
                                top: '0px',
                                float: 'right',
                                width: previewGroup.icon_width + 'px', 
                                height: previewGroup.icon_width + 'px'}}>
                            <img src={previewGroup.add_btn} width={previewGroup.icon_width} height={previewGroup.icon_width}></img>
                    </div>
                    
                            <PreviewTodo previewGroup={previewGroup}/>
                 </div>
            }
            
            {(previewGroup.type === 'previewMood') && (previewGroup.name === "dropdown") && 
                <div key={[changeProp, changePropInput]} draggable="true" style={{
                    position: 'absolute',
                    width: previewGroup.width + 'px',
                    height: previewGroup.icon_width + 'px',
                    top: previewGroup.top + 'px',
                    left: previewGroup.left + 'px'
                }}
                onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                onDragEnd={(e) => {select.left = Number(select.left) + e.pageX - x_start, select.top = Number(select.top) + e.pageY - y_start, setChangeProp(changeProp + 1)}}
                className='item selected move'>
                    <div style={{
                                position: 'absolute',
                                float: 'left',
                                top: '0px',
                                left: '0px',
                                width: previewGroup.width - previewGroup.icon_width + 'px',
                                height: previewGroup.icon_width + 'px',
                                fontFamily: "Inter, sans-serif",
                                fontSize: previewGroup.icon_width/5*3 + 'px',
                                color: 'black',
                                fontWeight: '700'
                    }}> Mood </div>
                    <div style={{
                                position: 'absolute',
                                float: 'right',
                                right: '0px',
                                top: '0px',
                                width: previewGroup.icon_width + 'px', 
                                height: previewGroup.icon_width + 'px'}}>
                            <img src={previewGroup.moods[0][1]} width={previewGroup.icon_width} height={previewGroup.icon_width}></img>
                    </div>
                 </div>
            }

            {(previewGroup.type === 'previewMood') && (previewGroup.name === "multiple") &&
                <div key={[changeProp, changePropInput]} draggable="true" style={{
                    position: 'absolute',
                    width: Number(previewGroup.width) + (Number(previewGroup.spacingX)+Number(previewGroup.icon_width))*Number(previewGroup.moods.length) + 'px',
                    height: previewGroup.icon_width + 'px',
                    top: previewGroup.top + 'px',
                    left: previewGroup.left + 'px'
                }}
                onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                onDragEnd={(e) => {select.left = Number(select.left) + e.pageX - x_start, select.top = Number(select.top) + e.pageY - y_start, setChangeProp(changeProp + 1)}}
                className='item selected move'>
                    <div style={{
                                position: 'absolute',
                                top: '0px',
                                left: '0px',
                                width: Number(previewGroup.width) + 'px',
                                height: previewGroup.icon_width + 'px',
                                fontFamily: "Inter, sans-serif",
                                fontSize: previewGroup.icon_width/5*3 + 'px',
                                color: 'black',
                                fontWeight: '700'
                    }}> Mood </div>
                    {previewGroup.moods.map((mood, index) => {
                        if(index != 0 ){
                            return(
                                <div key={index} style={{
                                    position: 'absolute',
                                    float: 'left',
                                    left: Number(previewGroup.width) + Number(previewGroup.spacingX)*(index + 1) + Number(previewGroup.icon_width)*index + 'px',
                                    top: '0px',
                                    width: previewGroup.icon_width + 'px', 
                                    height: previewGroup.icon_width + 'px'}}>
                                <img src={mood[2]} width={previewGroup.icon_width} height={previewGroup.icon_width}></img>
                                </div>
                            )
                        }
                    })}
                    
                 </div>
            }

            {(previewGroup.type === 'previewMood') && (previewGroup.name == 'monthly') &&
                <div key={[changeProp, changePropInput]} draggable="true"  style={{
                    position: 'absolute',
                    width: previewGroup.width + 'px',
                    height: previewGroup.spacingY*31 + previewGroup.icon_width*31 + 'px',
                    top: previewGroup.top + 'px',
                    left: previewGroup.left + 'px'
                }}
                onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                onDragEnd={(e) => {select.left = Number(select.left) + e.pageX - x_start, select.top = Number(select.top) + e.pageY - y_start, setChangeProp(changeProp + 1)}}
                className='item selected move'>
                    {days.map((day, index) => {
                        return (
                            <div key={index} style={{
                                        position: 'absolute',
                                        width: previewGroup.width + 'px',
                                        height: previewGroup.icon_width + 'px',
                                        top: previewGroup.spacingY*(index) + previewGroup.icon_width*(index) + 'px',
                                        opacity: previewGroup.opacity + '%',
                                        zIndex: previewGroup.z_index
                                    }}>
                                    <div style={{
                                        width: previewGroup.icon_width + 'px',
                                        height: previewGroup.icon_width + 'px',
                                        position: 'absolute',
                                        top: '0px',
                                        left: '0px',
                                        overflow: 'hidden',
                                        textAlign: previewGroup.align,
                                        fontFamily: previewGroup.fontFamily + ', ' + previewGroup.fontCategory,
                                        fontSize: previewGroup.fontSize + 'px',
                                        color: previewGroup.fontColor,
                                        fontStyle: previewGroup.fontStyle,
                                        fontWeight: previewGroup.fontWeight,
                                        textDecoration: previewGroup.textDecoration,
                                        lineHeight: previewGroup.lineHeight,
                                        letterSpacing: previewGroup.letterSpacing + 'px',
                                        paddingTop: previewGroup.paddingTop + 'px',
                                        paddingBottom: previewGroup.paddingBottom + 'px',
                                        paddingLeft: previewGroup.paddingLeft + 'px',
                                        paddingRight: previewGroup.paddingRight + 'px',
                                        backgroundColor: previewGroup.backgroundColor,
                                        borderStyle:  previewGroup.borderStyle,
                                        borderColor: previewGroup.borderColor,
                                        borderWidth: previewGroup.borderWidth + 'px',
                                        borderRadius: previewGroup.borderRadius + 'px'
                                    }}>{day}</div>
                                
                                    <div title={'mood_' + index}
                                                style={{
                                                    position: 'absolute',
                                                    width: previewGroup.icon_width + 'px', 
                                                    height: previewGroup.icon_width + 'px',
                                                    float: 'left',
                                                    left: Number(previewGroup.width) - Number(previewGroup.icon_width) + 'px',
                                                    overflow: 'hidden'}}>
                                        <img src={previewGroup.moods[0][1]} width={previewGroup.icon_width} height={previewGroup.icon_width}></img>
                                    </div>
                            </div>
                        )
                    })}

                 </div>
            }

            {(((previewGroup.type === 'previewMood') || (previewGroup.type === 'previewHabit')) && (temp_type == 'yearly')) &&
                <div key={[changeProp, changePropInput]} draggable="true"  style={{
                    position: 'absolute',
                    width: previewGroup.icon_width*13 + previewGroup.spacingX*12 + 'px',
                    height: previewGroup.spacingY*31 + previewGroup.icon_width*31 + 'px',
                    top: previewGroup.top + 'px',
                    left: previewGroup.left + 'px',
                    opacity: previewGroup.opacity + '%',
                    zIndex: previewGroup.z_index
                }}
                onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                onDragEnd={(e) => {select.left = Number(select.left) + e.pageX - x_start, select.top = Number(select.top) + e.pageY - y_start, setChangeProp(changeProp + 1)}}
                className='item selected move'>
                    {months.map((month, i) => {
                        return(
                            <div key={i} style={{
                                width: previewGroup.icon_width + 'px',
                                height: previewGroup.icon_width + 'px',
                                position: 'absolute',
                                top: '0px',
                                left: previewGroup.icon_width*(i+1) + previewGroup.spacingX*(i+1) + 'px',
                                overflow: 'hidden',
                                textAlign: previewGroup.align,
                                fontFamily: previewGroup.fontFamily + ', ' + previewGroup.fontCategory,
                                fontSize: previewGroup.fontSize + 'px',
                                color: previewGroup.fontColor,
                                fontStyle: previewGroup.fontStyle,
                                fontWeight: previewGroup.fontWeight,
                                textDecoration: previewGroup.textDecoration,
                                lineHeight: previewGroup.lineHeight,
                                letterSpacing: previewGroup.letterSpacing + 'px',
                                paddingTop: previewGroup.paddingTop + 'px',
                                paddingBottom: previewGroup.paddingBottom + 'px',
                                paddingLeft: previewGroup.paddingLeft + 'px',
                                paddingRight: previewGroup.paddingRight + 'px',
                                backgroundColor: previewGroup.backgroundColor,
                                borderStyle:  previewGroup.borderStyle,
                                borderColor: previewGroup.borderColor,
                                borderWidth: previewGroup.borderWidth + 'px',
                                borderRadius: previewGroup.borderRadius + 'px'
                            }}>{month[0]}</div>
                        )
                    })}
                    {days.map((day, index) => {
                        return (
                            <div key={index} style={{
                                        position: 'absolute',
                                        width: previewGroup.icon_width*13 + previewGroup.spacingX*12 + 'px',
                                        height: previewGroup.icon_width + 'px',
                                        top: previewGroup.spacingY*(index+1) + previewGroup.icon_width*(index+1) + 'px'
                                    }}>
                                    <div style={{
                                        width: previewGroup.icon_width + 'px',
                                        height: previewGroup.icon_width + 'px',
                                        position: 'absolute',
                                        top: '0px',
                                        left: '0px',
                                        overflow: 'hidden',
                                        textAlign: previewGroup.align,
                                        fontFamily: previewGroup.fontFamily + ', ' + previewGroup.fontCategory,
                                        fontSize: previewGroup.fontSize + 'px',
                                        color: previewGroup.fontColor,
                                        fontStyle: previewGroup.fontStyle,
                                        fontWeight: previewGroup.fontWeight,
                                        textDecoration: previewGroup.textDecoration,
                                        lineHeight: previewGroup.lineHeight,
                                        letterSpacing: previewGroup.letterSpacing + 'px',
                                        paddingTop: previewGroup.paddingTop + 'px',
                                        paddingBottom: previewGroup.paddingBottom + 'px',
                                        paddingLeft: previewGroup.paddingLeft + 'px',
                                        paddingRight: previewGroup.paddingRight + 'px',
                                        backgroundColor: previewGroup.backgroundColor,
                                        borderStyle:  previewGroup.borderStyle,
                                        borderColor: previewGroup.borderColor,
                                        borderWidth: previewGroup.borderWidth + 'px',
                                        borderRadius: previewGroup.borderRadius + 'px'
                                    }}>{day}</div>

                                    {months.map((month, i) => {
                                        return(
                                        <div key={i} title={ previewGroup.type == 'previewMood' ? `mood: ${index} ${month}` : `${previewGroup.habit}: ${index} ${month}`}
                                                    style={{
                                                        position: 'absolute',
                                                        width: previewGroup.icon_width + 'px', 
                                                        height: previewGroup.icon_width + 'px',
                                                        float: 'left',
                                                        left: Number(previewGroup.icon_width)*(i+1) + Number(previewGroup.spacingX)*(i+1) + 'px',
                                                        overflow: 'hidden'}}>
                                            <img src={previewGroup.type == 'previewMood' ? previewGroup.moods[0][1] : previewGroup.icon_untick} width={previewGroup.icon_width} height={previewGroup.icon_width}></img>
                                        </div>
                                    )
                                    })}
                            </div>
                        )
                    })}

                </div>
            }
            

            {(previewGroup.type === 'previewHabit') && ((temp_type == 'daily') || (temp_type == 'weekly')) &&
                <div key={[changeProp, changePropInput]} draggable="true"  style={{
                    position: 'absolute',
                    width: Number(previewGroup.width) + Number(previewGroup.spacingX) + Number(previewGroup.icon_width) + 'px',
                    height: previewGroup.icon_width*previewGroup.habits.length + previewGroup.spacingY*(previewGroup.habits.length - 1) + 'px',
                    top: previewGroup.top + 'px',
                    left: previewGroup.left + 'px'
                }}
                onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                onDragEnd={(e) => {select.left = Number(select.left) + e.pageX - x_start, select.top = Number(select.top) + e.pageY - y_start, setChangeProp(changeProp + 1)}}
                className='item selected move'>
                    {previewGroup.habits.map((habit, index) => {
                        return (
                            <div key={index} style={{
                                        position: 'absolute',
                                        width: Number(previewGroup.width) + Number(previewGroup.spacingX) + Number(previewGroup.icon_width) + 'px',
                                        height: 'fit-content',
                                        top: previewGroup.icon_width*index + previewGroup.spacingY*index + 'px',
                                        opacity: previewGroup.opacity + '%',
                                        zIndex: previewGroup.z_index
                                    }}>
                                <div  style={{
                                        width: previewGroup.width + 'px',
                                        height: previewGroup.icon_width + 'px',
                                        float: 'left',
                                        overflow: 'hidden',
                                        textAlign: previewGroup.align,
                                        fontFamily: previewGroup.fontFamily + ' , ' + previewGroup.fontCategory,
                                        fontSize: previewGroup.fontSize + 'px',
                                        color: previewGroup.fontColor,
                                        fontStyle: previewGroup.fontStyle,
                                        fontWeight: previewGroup.fontWeight,
                                        textDecoration: previewGroup.textDecoration,
                                        lineHeight: previewGroup.lineHeight,
                                        letterSpacing: previewGroup.letterSpacing + 'px',
                                        paddingTop: previewGroup.paddingTop + 'px',
                                        paddingBottom: previewGroup.paddingBottom + 'px',
                                        paddingLeft: previewGroup.paddingLeft + 'px',
                                        paddingRight: previewGroup.paddingRight + 'px',
                                        backgroundColor: previewGroup.backgroundColor,
                                        borderStyle: previewGroup.borderStyle,
                                        borderColor: previewGroup.borderColor,
                                        borderWidth: previewGroup.borderWidth + 'px',
                                        borderRadius: previewGroup.borderRadius + 'px'
                                }}>
                                    {habit}
                                </div>
                                <div style={{
                                        float: 'right',
                                        width: previewGroup.icon_width + 'px', 
                                        height: previewGroup.icon_width + 'px',
                                        overflow: 'hidden'}}>
                                    <img src={previewGroup.icon_tick} width={previewGroup.icon_width} height={previewGroup.icon_width}></img>
                                </div>
                            </div>
                        )
                    })}

                 </div>
            }

            
            {(previewGroup.type === 'previewHabit') && (temp_type == 'monthly') &&
                <div key={[changeProp, changePropInput]} draggable="true"  style={{
                    position: 'absolute',
                    width: Number(previewGroup.width) + Number(previewGroup.spacingX)*previewGroup.habits.length + Number(previewGroup.icon_width)*(previewGroup.habits.length) + 'px',
                    height: Number(previewGroup.width) + Number(previewGroup.spacingY)*31 + Number(previewGroup.icon_width)*31 + 'px',
                    top: previewGroup.top + 'px',
                    left: previewGroup.left + 'px'
                }}
                onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                onDragEnd={(e) => {select.left = Number(select.left) + e.pageX - x_start, select.top = Number(select.top) + e.pageY - y_start, setChangeProp(changeProp + 1)}}
                className='item selected move'>
                    <div style={{
                        position: 'absolute',
                        width: Number(previewGroup.icon_width) + Number(previewGroup.spacingX)*previewGroup.habits.length + Number(previewGroup.icon_width)*(previewGroup.habits.length) + 'px',
                        height: previewGroup.icon_width + 'px',
                        top: '0px',
                        left: '0px',
                        opacity: previewGroup.opacity + '%',
                        zIndex: previewGroup.z_index
                    }}>
                        {previewGroup.habits.map((habit, index) => {
                            return (
                                <div key={index} style={{
                                        position: 'absolute',
                                        width: previewGroup.width + 'px',
                                        height: previewGroup.icon_width + 'px',
                                        top: Number(previewGroup.width)/2 - Number(previewGroup.icon_width)/2 + 'px',
                                        left: Number(previewGroup.icon_width) + Number(previewGroup.spacingX)*(index+1) + Number(previewGroup.icon_width)*(index) - (Number(previewGroup.width)/2 - Number(previewGroup.icon_width)/2) + 'px',
                                        overflow: 'hidden',
                                        transform: 'rotate(90deg)',
                                        textAlign: previewGroup.align,
                                        fontFamily: previewGroup.fontFamily + ' , ' + previewGroup.fontCategory,
                                        fontSize: previewGroup.fontSize + 'px',
                                        color: previewGroup.fontColor,
                                        fontStyle: previewGroup.fontStyle,
                                        fontWeight: previewGroup.fontWeight,
                                        textDecoration: previewGroup.textDecoration,
                                        lineHeight: previewGroup.lineHeight,
                                        letterSpacing: previewGroup.letterSpacing + 'px',
                                        paddingTop: previewGroup.paddingTop + 'px',
                                        paddingBottom: previewGroup.paddingBottom + 'px',
                                        paddingLeft: previewGroup.paddingLeft + 'px',
                                        paddingRight: previewGroup.paddingRight + 'px',
                                        backgroundColor: previewGroup.backgroundColor,
                                        borderStyle: previewGroup.borderStyle,
                                        borderColor: previewGroup.borderColor,
                                        borderWidth: previewGroup.borderWidth + 'px',
                                        borderRadius: previewGroup.borderRadius + 'px'
                                    }}>
                                            {habit}
                                </div>
                        )})}
                    </div>
                    {days.map((day, index) => {
                        return (
                            <div key={index} style={{
                                        position: 'absolute',
                                        width: Number(previewGroup.icon_width) + Number(previewGroup.spacingX)*previewGroup.habits.length + Number(previewGroup.icon_width)*(previewGroup.habits.length) + 'px',
                                        height: previewGroup.icon_width + 'px',
                                        top: Number(previewGroup.width) + Number(previewGroup.spacingY)*(index+1) + Number(previewGroup.icon_width)*(index) + 'px',
                                        opacity: previewGroup.opacity + '%',
                                        zIndex: previewGroup.z_index
                                    }}>
                                    <div style={{
                                        width: previewGroup.icon_width + 'px',
                                        height: previewGroup.icon_width + 'px',
                                        position: 'absolute',
                                        top: '0px',
                                        left: '0px',
                                        overflow: 'hidden',
                                        textAlign: previewGroup.align,
                                        fontFamily: previewGroup.fontFamily + ' , ' + previewGroup.fontCategory,
                                        fontSize: previewGroup.fontSize + 'px',
                                        color: previewGroup.fontColor,
                                        fontStyle: previewGroup.fontStyle,
                                        fontWeight: previewGroup.fontWeight,
                                        textDecoration: previewGroup.textDecoration,
                                        lineHeight: previewGroup.lineHeight,
                                        letterSpacing: previewGroup.letterSpacing + 'px',
                                        paddingTop: previewGroup.paddingTop + 'px',
                                        paddingBottom: previewGroup.paddingBottom + 'px',
                                        paddingLeft: previewGroup.paddingLeft + 'px',
                                        paddingRight: previewGroup.paddingRight + 'px',
                                        backgroundColor: previewGroup.backgroundColor,
                                        borderStyle: previewGroup.borderStyle,
                                        borderColor: previewGroup.borderColor,
                                        borderWidth: previewGroup.borderWidth + 'px',
                                        borderRadius: previewGroup.borderRadius + 'px'
                                    }}>{day}</div>
                                
                                    {previewGroup.habits.map((habit,i) => {
                                        return(
                                            <div key={i} title={habit + '_' + day}
                                                style={{
                                                    position: 'absolute',
                                                    width: previewGroup.icon_width + 'px', 
                                                    height: previewGroup.icon_width + 'px',
                                                    left: Number(previewGroup.icon_width) + Number(previewGroup.spacingX)*(i+1) + Number(previewGroup.icon_width)*(i) + 'px',
                                                    overflow: 'hidden'}}>
                                                <img src={previewGroup.icon_tick} width={previewGroup.icon_width} height={previewGroup.icon_width}></img>
                                            </div>
                                        )
                                    })
                                    }
                            </div>
                        )
                    })}

                 </div>
            }

            {(previewGroup.type === 'previewHabitAnalys') &&
                <div key={[changeProp, changePropInput]} draggable="true"  style={{
                    position: 'absolute',
                    width: Number(previewGroup.text.width) + Number(previewGroup.spacingX) + Number(previewGroup.percent.width) + 'px',
                    height: previewGroup.height*previewGroup.habits.length + previewGroup.spacingY*(previewGroup.habits.length - 1) + 'px',
                    top: previewGroup.top + 'px',
                    left: previewGroup.left + 'px'
                }}
                onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                onDragEnd={(e) => {select.left = Number(select.left) + e.pageX - x_start, select.top = Number(select.top) + e.pageY - y_start, setChangeProp(changeProp + 1)}}
                className='item selected move'>
                    {previewGroup.habits.map((habit, index) => {
                        return (
                            <div key={index} style={{
                                        position: 'absolute',
                                        width: Number(previewGroup.text.width) + Number(previewGroup.spacingX) + Number(previewGroup.percent.width) + 'px',
                                        height: previewGroup.height + 'px',
                                        top: previewGroup.height*index + previewGroup.spacingY*index + 'px',
                                        opacity: previewGroup.opacity + '%',
                                        zIndex: previewGroup.z_index
                                    }}>
                                <div  style={{
                                        width: Number(previewGroup.text.width) - previewGroup.text.paddingLeft - previewGroup.text.paddingRight + 'px',
                                        height: Number(previewGroup.height) - previewGroup.text.paddingTop - previewGroup.text.paddingBottom + 'px',
                                        float: 'left',
                                        overflow: 'hidden',
                                        textAlign: previewGroup.text.align,
                                        fontFamily: previewGroup.text.fontFamily + ' , ' + previewGroup.text.fontCategory,
                                        fontSize: previewGroup.text.fontSize + 'px',
                                        color: previewGroup.text.fontColor,
                                        fontStyle: previewGroup.text.fontStyle,
                                        fontWeight: previewGroup.text.fontWeight,
                                        textDecoration: previewGroup.text.textDecoration,
                                        lineHeight: previewGroup.text.lineHeight,
                                        letterSpacing: previewGroup.text.letterSpacing + 'px',
                                        paddingTop: previewGroup.text.paddingTop + 'px',
                                        paddingBottom: previewGroup.text.paddingBottom + 'px',
                                        paddingLeft: previewGroup.text.paddingLeft + 'px',
                                        paddingRight: previewGroup.text.paddingRight + 'px',
                                        backgroundColor: previewGroup.text.backgroundColor,
                                        borderStyle: previewGroup.text.borderStyle,
                                        borderColor: previewGroup.text.borderColor,
                                        borderWidth: previewGroup.text.borderWidth + 'px',
                                        borderRadius: previewGroup.text.borderRadius + 'px'
                                }}>
                                    {habit}
                                </div>
                                <div style={{
                                        position: 'absolute',
                                        left: Number(previewGroup.text.width) + Number(previewGroup.spacingX) + 'px',
                                        width: Number(previewGroup.percent.width) - previewGroup.percent.paddingLeft - previewGroup.percent.paddingRight + 'px',
                                        height: Number(previewGroup.height) - previewGroup.percent.paddingTop - previewGroup.percent.paddingBottom + 'px',
                                        overflow: 'hidden',
                                        textAlign: previewGroup.percent.align,
                                        fontFamily: previewGroup.percent.fontFamily + ' , ' + previewGroup.percent.fontCategory,
                                        fontSize: previewGroup.percent.fontSize + 'px',
                                        color: previewGroup.percent.fontColor,
                                        fontStyle: previewGroup.percent.fontStyle,
                                        fontWeight: previewGroup.percent.fontWeight,
                                        textDecoration: previewGroup.percent.textDecoration,
                                        lineHeight: previewGroup.percent.lineHeight,
                                        letterSpacing: previewGroup.percent.letterSpacing + 'px',
                                        paddingTop: previewGroup.percent.paddingTop + 'px',
                                        paddingBottom: previewGroup.percent.paddingBottom + 'px',
                                        paddingLeft: previewGroup.percent.paddingLeft + 'px',
                                        paddingRight: previewGroup.percent.paddingRight + 'px',
                                        backgroundColor: previewGroup.percent.backgroundColor,
                                        borderStyle: previewGroup.percent.borderStyle,
                                        borderColor: previewGroup.percent.borderColor,
                                        borderWidth: previewGroup.percent.borderWidth + 'px',
                                        borderRadius: previewGroup.percent.borderRadius + 'px'
                                    }}>
                                    {previewGroup.name == '%' ? '##%' : ''}
                                    {previewGroup.name == '#' ? '##/##' : ''}
                                </div>
                            </div>
                        )
                    })}

                 </div>
            }

            {(previewGroup.type === 'previewMoodAnalys') &&
                <div key={[changeProp, changePropInput]} draggable="true"  style={{
                    position: 'absolute',
                    width: Number(previewGroup.icon_width) + Number(previewGroup.spacingX) + Number(previewGroup.percent.width) + 'px',
                    height: previewGroup.icon_width*previewGroup.moods.length + previewGroup.spacingY*(previewGroup.moods.length - 1) + 'px',
                    top: previewGroup.top + 'px',
                    left: previewGroup.left + 'px'
                }}
                onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                onDragEnd={(e) => {select.left = Number(select.left) + e.pageX - x_start, select.top = Number(select.top) + e.pageY - y_start, setChangeProp(changeProp + 1)}}
                className='item selected move'>
                    {previewGroup.moods.map((mood, index) => {
                        return (
                            <div key={index} style={{
                                        position: 'absolute',
                                        width: Number(previewGroup.icon_width) + Number(previewGroup.spacingX) + Number(previewGroup.percent.width) + 'px',
                                        height: previewGroup.icon_width + 'px',
                                        top: previewGroup.icon_width*index + previewGroup.spacingY*index + 'px',
                                        opacity: previewGroup.opacity + '%',
                                        zIndex: previewGroup.z_index
                                    }}>
                                <div title={mood[0]}
                                        style={{
                                            position: 'absolute',
                                            width: previewGroup.icon_width + 'px', 
                                            height: previewGroup.icon_width + 'px',
                                            float: 'left',
                                            left: '0px',
                                            overflow: 'hidden'}}>
                                    <img src={mood[1]} width={previewGroup.icon_width} height={previewGroup.icon_width}></img>
                                </div>
                                <div style={{
                                        position: 'absolute',
                                        left: Number(previewGroup.icon_width) + Number(previewGroup.spacingX) + 'px',
                                        width: Number(previewGroup.percent.width) - previewGroup.percent.paddingLeft - previewGroup.percent.paddingRight + 'px',
                                        height: Number(previewGroup.icon_width) - previewGroup.percent.paddingTop - previewGroup.percent.paddingBottom + 'px',
                                        overflow: 'hidden',
                                        textAlign: previewGroup.percent.align,
                                        fontFamily: previewGroup.percent.fontFamily + ' , ' + previewGroup.percent.fontCategory,
                                        fontSize: previewGroup.percent.fontSize + 'px',
                                        color: previewGroup.percent.fontColor,
                                        fontStyle: previewGroup.percent.fontStyle,
                                        fontWeight: previewGroup.percent.fontWeight,
                                        textDecoration: previewGroup.percent.textDecoration,
                                        lineHeight: previewGroup.percent.lineHeight,
                                        letterSpacing: previewGroup.percent.letterSpacing + 'px',
                                        paddingTop: previewGroup.percent.paddingTop + 'px',
                                        paddingBottom: previewGroup.percent.paddingBottom + 'px',
                                        paddingLeft: previewGroup.percent.paddingLeft + 'px',
                                        paddingRight: previewGroup.percent.paddingRight + 'px',
                                        backgroundColor: previewGroup.percent.backgroundColor,
                                        borderStyle: previewGroup.percent.borderStyle,
                                        borderColor: previewGroup.percent.borderColor,
                                        borderWidth: previewGroup.percent.borderWidth + 'px',
                                        borderRadius: previewGroup.percent.borderRadius + 'px'
                                    }}>
                                    {previewGroup.name == '%' ? '##%' : ''}
                                    {previewGroup.name == '#' ? '##/##' : ''}
                                </div>
                            </div>
                        )
                    })}

                 </div>
            }

        </div>
        </div>
    )

}

export default Main