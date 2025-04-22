import React from "react"
import { useState } from "react"
import io from 'socket.io-client'
import TodoList from './TodoList'

const LeftPage = ({journalID, prevURL, pages, leftPage, droite}) => {
    const daysm = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    const monthsm = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october','november', 'december']

    const [squares, setSquares] = useState(leftPage.elements)
    const [updateView, setUpdateView] = useState(0)

    const date = new Date(leftPage.year, leftPage.month, leftPage.date)

    const socket = io('https://test4-nymeria-starks-projects.vercel.app'); 

    const handleUpdate = () => {
        console.log('1')

        leftPage.elements = squares;
    
        for(let i = 0; i < pages.length; i++){
            if(pages[i].page == leftPage.page){
                pages[i] = leftPage
                break;
            }
        }

        console.log('1.5')

        socket.emit('update_view', {journalID: journalID, prevURL: prevURL, pages: pages})
    }
    
    const ratio = 950/1193
    
    const dropdownTag = (square) => {
        if(leftPage.temp_type == 'yearly'){
            return(`mood: ${square.day} ${square.month[1]}`)
        } else if (leftPage.temp_type == 'monthly'){
            return(`mood: ${square.day}`)
        } else if (leftPage.temp_type == 'weekly') {
            return(`mood: ${square.order}`)
        } else {
            return('')
        }
    }   


    return(
        <div id={droite == 0 ? 'my-node' : ''} key={updateView} style={{width: '772.36px', height: '950px', overflow: 'hidden', position: 'relative', backgroundColor:'white'}}>
            {squares.map((square, index) => {
                if((square.type ==='shape') && (square.name !== "triangle") && (square.name !== "line")){ 
                    return (
                    <div id={square.id} key={index} 
                        style={{width: square.width*ratio + 'px', 
                                height: square.height*ratio + 'px', 
                                top: square.top*ratio + 'px', 
                                left: square.left*ratio + 'px',
                                zIndex: square.z_index, 
                                transform: 'rotate(' + square.rotate + 'deg)' + '' + 'skew(' + square.skew + 'deg)' + '',
                                opacity: square.opacity + '%',
                                backgroundColor: square.backgroundColor,
                                borderStyle: square.borderStyle,
                                borderColor: square.borderColor,
                                borderWidth: square.borderWidth*ratio + 'px',
                                borderRadius: square.borderRadius + '%',
                                position: "absolute"}}>
                    </div>
                    )
                }

                
                if((square.name ==='line')){ 
                    return (
                    <div id={square.id} key={index} 
                        style={{width: square.width*ratio + 'px', 
                                height: square.height*ratio + 'px', 
                                top: square.top*ratio + 'px', 
                                left: square.left*ratio + 'px',
                                zIndex: square.z_index, 
                                transform: 'rotate(' + square.rotate + 'deg)',
                                opacity: square.opacity + '%',
                                backgroundColor: "transparent",
                                borderStyle: square.borderStyle,
                                borderColor: square.borderColor,
                                borderTop: 'none',
                                borderLeft: 'none',
                                borderRight: 'none',
                                borderBottom: square.borderWidth*ratio + 'px ' + square.borderStyle + ' ' + square.borderColor,
                                position: "absolute",
                            }}>
                    </div>
                    )
                }

                
                if(square.name === "triangle"){ 
                    return (
                    <div id={square.id} key={index} 
                        style={{width: square.width*ratio + 'px', 
                                height: square.height*ratio + 'px', 
                                top: square.top*ratio + 'px', 
                                left: square.left*ratio + 'px',
                                zIndex: square.z_index, 
                                transform: 'rotate(' + square.rotate + 'deg)',
                                opacity: square.opacity + '%',
                                position: 'absolute'}}>
                            <div style={{
                                left: '0px',
                                top: '0px',
                                position: 'absolute',
                                borderLeft: square.width*ratio*0.5 + 'px solid transparent',
                                borderRight: square.width*ratio*0.5 + 'px solid transparent',
                                borderBottom: square.height*ratio + 'px solid ' + square.backgroundColor
                                }}>
                            </div>
                    </div>
                    )
                }

                if(square.type =='image'){
                    return (
                            <div id={square.id} key={index}
                                    style={{
                                            position: "absolute",
                                            left: square.left*ratio + 'px',
                                            top: square.top*ratio + 'px',
                                            height: square.height*ratio + 'px',
                                            width: square.width*ratio + 'px', 
                                            zIndex: square.z_index,
                                            transform: 'rotate(' + square.rotate + 'deg)',
                                            opacity: square.opacity + '%',
                                            borderStyle: square.borderStyle,
                                            borderColor: square.borderColor,
                                            borderWidth: square.borderWidth*ratio + 'px',
                                            overflow: "hidden"}}>
                        
                                <img
                                    src={square.source}
                                    width = {square.width*ratio}
                                    height={square.height*ratio}
                                    style={{
                                        borderRadius: square.borderRadius + '%'}}
                                />
                        
                            </div>                        
                    )
                }

                if(square.type == 'text') {
                    return (
                        <div id={square.id} key={index} 
                            style = {{
                                width: square.width*ratio + 'px',
                                height: square.height*ratio + 'px',
                                top: square.top*ratio + 'px', 
                                left: square.left*ratio + 'px',
                                zIndex: square.z_index, 
                                transform: 'rotate(' + square.rotate + 'deg)',
                                opacity: square.opacity + '%',
                                backgroundColor: square.backgroundColor,
                                borderStyle: square.borderStyle,
                                borderColor: square.borderColor,
                                borderWidth: square.borderWidth*ratio + 'px',
                                borderRadius: square.borderRadius + '%',
                                position: "absolute",
                                overflow: 'visible',
                            }}>
                                    <textarea className="focus" style={{
                                        width: (square.width - square.paddingRight - square.paddingLeft)*ratio + 'px',
                                        height: (square.height - square.paddingTop - square.paddingBottom)*ratio + 'px',
                                        textAlign: square.align,
                                        fontFamily: square.fontFamily + ',' + square.fontCategory,
                                        fontSize: square.fontSize*ratio + 'px',
                                        color: square.fontColor,
                                        fontStyle: square.fontStyle,
                                        fontWeight: square.fontWeight,
                                        textDecoration: square.textDecoration,
                                        lineHeight: square.lineHeight*ratio,
                                        letterSpacing: square.letterSpacing*ratio + 'px',
                                        paddingTop: square.paddingTop*ratio + 'px',
                                        paddingBottom: square.paddingBottom*ratio + 'px',
                                        paddingLeft: square.paddingLeft*ratio + 'px',
                                        paddingRight: square.paddingRight*ratio + 'px',
                                        border: 'none transparent', 
                                        outline: 'none', 
                                        backgroundColor: 'transparent',
                                        scrollbarWidth: 'none',
                                        resize: 'none'}}
                                        
                                    defaultValue={square.content}/>
                                
                        </div>
                        )
                }

                if(square.type == 'diary') {
                    return (
                        <div id={square.id} key={index} 
                            style = {{
                                width: (square.width - square.paddingRight - square.paddingLeft)*ratio + 'px',
                                height: (square.height - square.paddingTop - square.paddingBottom)*ratio + 'px',
                                top: square.top*ratio + 'px', 
                                left: square.left*ratio + 'px',
                                zIndex: square.z_index, 
                                transform: 'rotate(' + square.rotate + 'deg)',
                                opacity: square.opacity + '%',
                                backgroundColor: square.backgroundColor,
                                borderStyle: square.borderStyle,
                                borderColor: square.borderColor,
                                borderWidth: square.borderWidth*ratio + 'px',
                                borderRadius: square.borderRadius + '%',
                                position: "absolute", 
                                overflow: 'hidden',
                                textAlign: square.align,
                                fontFamily: square.fontFamily + ',' + square.fontCategory,
                                fontSize: square.fontSize*ratio + 'px',
                                color: square.fontColor,
                                fontStyle: square.fontStyle,
                                fontWeight: square.fontWeight,
                                textDecoration: square.textDecoration,
                                lineHeight: square.lineHeight,
                                letterSpacing: square.letterSpacing*ratio + 'px',
                                paddingTop: square.paddingTop*ratio + 'px',
                                paddingBottom: square.paddingBottom*ratio + 'px',
                                paddingLeft: square.paddingLeft*ratio + 'px',
                                paddingRight: square.paddingRight*ratio + 'px',
                            }}>
                                    
                                <textarea style={{
                                    width: (square.width - square.paddingRight - square.paddingLeft)*ratio + 'px', 
                                    height: (square.height - square.paddingTop - square.paddingBottom)*ratio + 'px', 
                                    backgroundColor: 'transparent', 
                                    textAlign: square.align,
                                    fontFamily: square.fontFamily + ',' + square.fontCategory,
                                    fontSize: square.fontSize*ratio + 'px',
                                    color: square.fontColor,
                                    fontStyle: square.fontStyle,
                                    fontWeight: square.fontWeight,
                                    textDecoration: square.textDecoration,
                                    lineHeight: square.lineHeight,
                                    letterSpacing: square.letterSpacing*ratio + 'px',
                                    resize: 'none', 
                                    border: 'none'}} 
                                onChange={(e) => {square.content = e.target.value; handleUpdate()}} defaultValue={square.content}/>
                                
                        </div>
                        )
                }

                
                if(square.type == 'date') {
                    var jour = new Date(date.getTime()+1000*60*60*24*(square.order - 2));
                    var content = ''
                    if(square.weekDayFormat == 'monday'){
                        content = content + daysm[jour.getDay()]
                    } else if (square.weekDayFormat == 'Monday') {
                        content = content + daysm[jour.getDay()].substring(0,1).toUpperCase() + daysm[jour.getDay()].substring(1,daysm[jour.getDay()].length)
                    } else if (square.weekDayFormat == 'MONDAY') {
                        content = content + daysm[jour.getDay()].toUpperCase()
                    } else if (square.weekDayFormat == 'mon') {
                        content = content + daysm[jour.getDay()].substring(0, 3)
                    } else if (square.weekDayFormat == 'Mon') {
                        content = content + daysm[jour.getDay()].substring(0,1).toUpperCase() + daysm[jour.getDay()].substring(1,3)
                    } else if (square.weekDayFormat == 'MON') {
                        content = content + daysm[jour.getDay()].substring(0, 3).toUpperCase()
                    } else if (square.weekDayFormat == 'm') {
                        content = content + daysm[jour.getDay()].substring(0, 1)
                    } else if (square.weekDayFormat == 'M') {
                        content = content + daysm[jour.getDay()].substring(0, 1).toUpperCase()
                    }

                    if(square.separate1 == ','){
                        content = content + ', '
                    } else {
                        content = content + ' '
                    }
                    
                    if(square.dayFormat == '1sf'){
                        content = content + jour.getDate()
                    } else if (square.dayFormat == '2sf') {
                        if(jour.getDate().toString().length == 1){
                            content = content + '0' + jour.getDate()
                        } else {
                            content = content + jour.getDate()
                        }
                    }
                    

                    if(square.dayFormat != 'none' && (square.monthFormat != 'none' || square.yearFormat != 'none')){
                        content = content + square.separate2
                    }

                    if(square.monthFormat == '1sf'){
                        content = content + (jour.getMonth() + 1)
                    } else if (square.monthFormat == '2sf') {
                        if((jour.getMonth()+1).toString().length == 1){
                            content = content + '0' + (jour.getMonth() + 1)
                        } else {
                            content = content + (jour.getMonth() + 1)
                        }
                    } else if (square.monthFormat == 'january') {
                        content = content + monthsm[jour.getMonth()]
                    } else if (square.monthFormat == 'January') {
                        content = content + monthsm[jour.getMonth()].substring(0,1).toUpperCase() + monthsm[jour.getMonth()].substring(1,monthsm[jour.getMonth()].length)
                    } else if (square.monthFormat == 'JANUARY') {
                        content = content + monthsm[jour.getMonth()].toUpperCase()
                    } else if (square.monthFormat == 'jan') {
                        content = content + monthsm[jour.getMonth()].substring(0, 3)
                    } else if (square.monthFormat == 'Jan') {
                        content = content + monthsm[jour.getMonth()].substring(0,1).toUpperCase() + monthsm[jour.getMonth()].substring(1,3)
                    } else if (square.monthFormat == 'JAN') {
                        content = content + monthsm[jour.getMonth()].substring(0, 3).toUpperCase()
                    } else if (square.monthFormat == 'j') {
                        content = content + monthsm[jour.getMonth()].substring(0, 1)
                    } else if (square.monthFormat == 'J') {
                        content = content + monthsm[jour.getMonth()].substring(0, 1).toUpperCase()
                    }

                    
                    if(square.monthFormat != 'none' && square.yearFormat != 'none'){
                        content = content + square.separate2
                    }


                    if(square.yearFormat == '2sf'){
                        content = content + jour.getFullYear().toString().substring(2,4)
                    } else if (square.yearFormat == '4sf') {
                        content = content + jour.getFullYear()
                    } 

                    return (
                        <div id={square.id} key={index} 
                            style={{
                                    width: (square.width - square.paddingRight - square.paddingLeft)*ratio + 'px',
                                    height: (square.height - square.paddingTop - square.paddingBottom)*ratio + 'px',
                                    top: square.top*ratio + 'px', 
                                    left: square.left*ratio + 'px',
                                    zIndex: square.z_index, 
                                    transform: 'rotate(' + square.rotate + 'deg)',
                                    opacity: square.opacity + '%',
                                    backgroundColor: square.backgroundColor,
                                    borderStyle: square.borderStyle,
                                    borderColor: square.borderColor,
                                    borderWidth: square.borderWidth*ratio + 'px',
                                    borderRadius: square.borderRadius + '%',
                                    position: "absolute",
                                    textAlign: square.align,
                                    fontFamily: square.fontFamily + ',' + square.fontCategory,
                                    fontSize: square.fontSize*ratio + 'px',
                                    color: square.fontColor,
                                    fontStyle: square.fontStyle,
                                    fontWeight: square.fontWeight,
                                    textDecoration: square.textDecoration,
                                    lineHeight: square.lineHeight,
                                    letterSpacing: square.letterSpacing*ratio + 'px',
                                    paddingTop: square.paddingTop*ratio + 'px',
                                    paddingBottom: square.paddingBottom*ratio + 'px',
                                    paddingLeft: square.paddingLeft*ratio + 'px',
                                    paddingRight: square.paddingRight*ratio + 'px',
                                    overflow: 'hidden'
                                }}>
                            {`"${content}"`}
                        </div>
                        )
                }

                if(square.type == 'grid') {
                    return (
                        <div id={square.id} key={index} 
                            style={{width: square.width*ratio + 'px',
                                    height: (square.height + square.spacing)*ratio + 'px',
                                    top: square.top*ratio + 'px', 
                                    left: square.left*ratio + 'px',
                                    position: 'absolute', 
                                    zIndex: square.z_index,
                                    overflow: "hidden"}}>
                        <table style={{ width: '100%',
                                        display: "table",
                                        zIndex: square.z_index,
                                        opacity: square.opacity + '%',
                                        borderSpacing: square.spacing*ratio + 'px'
                                        }}>
                            <tbody>
                                {square.content.map((row, index_row) => {
                                    return (
                                        <tr key={index_row} style={{height: ((square.height - square.spacing*(square.rows))/square.rows)*ratio + 'px', overflow: 'hidden'}}>
                                            {row.map((cell, index_col) => {
                                                return(
                                                    <td key={index_col} 
                                                        style={{backgroundColor: square.backgroundColor,
                                                                borderStyle: square.borderStyle,
                                                                borderColor: square.borderColor,
                                                                borderWidth: square.borderWidth*ratio + 'px',
                                                                borderRadius: square.borderRadius + '%',
                                                                position: 'relative',
                                                                overflow: "hidden"}}>
                                                        {(square.name == 'fixed') &&            
                                                        <div
                                                            style={{width: ((square.width - square.spacing*(square.columns+1))/square.columns - square.paddingRight - square.paddingLeft)*ratio + 'px',
                                                                    height: ((square.height - square.spacing*(square.rows))/square.rows - square.paddingTop - square.paddingBottom)*ratio + 'px',
                                                                    position: 'absolute',
                                                                    top: '0px',
                                                                    textAlign: square.align,
                                                                    fontFamily: square.fontFamily + ',' + square.fontCategory,
                                                                    color: square.fontColor,
                                                                    fontSize: square.fontSize*ratio + 'px',
                                                                    fontStyle: square.fontStyle,
                                                                    fontWeight: square.fontWeight,
                                                                    textDecoration: square.textDecoration,
                                                                    lineHeight: square.lineHeight,
                                                                    letterSpacing: square.letterSpacing*ratio + 'px',
                                                                    paddingTop: square.paddingTop*ratio + 'px',
                                                                    paddingBottom: square.paddingBottom*ratio + 'px',
                                                                    paddingLeft: square.paddingLeft*ratio + 'px',
                                                                    paddingRight: square.paddingRight*ratio + 'px',
                                                                    scrollbarWidth: 'none',
                                                                    resize: 'none',
                                                                    border: 'none transparent', 
                                                                    outline: 'none',
                                                                    backgroundColor: square.backgroundColor}} 
                                                        > {cell} </div>
                                                        }
                                                        {(square.name == 'input') && 
                                                            <textarea style={{width: ((square.width - square.spacing*(square.columns+1))/square.columns - square.paddingRight - square.paddingLeft)*ratio + 'px',
                                                                height: ((square.height - square.spacing*(square.rows))/square.rows - square.paddingTop - square.paddingBottom)*ratio + 'px',
                                                                position: 'absolute',
                                                                top: '0px',
                                                                textAlign: square.align,
                                                                fontFamily: square.fontFamily + ',' + square.fontCategory,
                                                                color: square.fontColor,
                                                                fontSize: square.fontSize*ratio + 'px',
                                                                fontStyle: square.fontStyle,
                                                                fontWeight: square.fontWeight,
                                                                textDecoration: square.textDecoration,
                                                                lineHeight: square.lineHeight,
                                                                letterSpacing: square.letterSpacing*ratio + 'px',
                                                                paddingTop: square.paddingTop*ratio + 'px',
                                                                paddingBottom: square.paddingBottom*ratio + 'px',
                                                                paddingLeft: square.paddingLeft*ratio + 'px',
                                                                paddingRight: square.paddingRight*ratio + 'px',
                                                                backgroundColor: square.backgroundColor,
                                                                resize: 'none'}}
                                                            onChange={(e) => {square.content[index_row][index_col] = e.target.value, handleUpdate()}} defaultValue={cell}/>
                                                        }
                                                        
                                                            
                                                    </td>
                                                )
                                            })}
                                        </tr>
                                    )    
                                })}
                            </tbody>
                        </table>
                        </div>
                    )
                }

                
                if(square.type == 'fixed_text') {
                    return(
                    <div id={square.id} key={index}         
                            style={{
                                    width: square.width*ratio + 'px',
                                    height: square.height*ratio + 'px',
                                    top: square.top*ratio + 'px', 
                                    left: square.left*ratio + 'px',
                                    zIndex: square.z_index, 
                                    transform: 'rotate(' + square.rotate + 'deg)',
                                    opacity: square.opacity,
                                    textAlign: square.align,
                                    fontFamily: square.fontFamily + ', ' + square.fontCategory,
                                    fontSize: square.fontSize*ratio + 'px',
                                    color: square.fontColor,
                                    fontStyle: square.fontStyle,
                                    fontWeight: square.fontWeight,
                                    textDecoration: square.textDecoration,
                                    backgroundColor: square.backgroundColor,
                                    lineHeight: square.lineHeight,
                                    letterSpacing: square.letterSpacing*ratio + 'px',
                                    paddingTop: square.paddingTop*ratio + 'px',
                                    paddingBottom: square.paddingBottom*ratio + 'px',
                                    paddingLeft: square.paddingLeft*ratio + 'px',
                                    paddingRight: square.paddingRight*ratio + 'px',
                                    borderStyle: square.borderStyle,
                                    borderColor: square.borderColor,
                                    borderWidth: square.borderWidth*ratio + 'px',
                                    borderRadius: square.borderRadius + '%',
                                    position: "absolute",
                                    overflow: 'hidden'
                                }}>
                                {square.content}
                        </div>
                )}
                
                
                if(square.type == 'icon'){
                    var title
                    if(leftPage.temp_type == 'daily'){
                        title = square.tag[2]
                    } else if(leftPage.temp_type =='weekly'){
                        title = square.tag[2] + ' _ order: ' + square.order
                    } else if (leftPage.temp_type == 'monthly') {
                        title = square.tag[1] + ' _ day: ' + square.day
                    } else if (leftPage.temp_type == 'yearly'){
                        title = square.tag[1] + ' _ day: ' + square.day + ' ' + square.month[1]
                    }
                    return (
                            <div id={square.id} key={index}
                            className="to-hover"
                            title={title}        
                            style={{
                                            position: "absolute",
                                            left: square.left*ratio + 'px',
                                            top: square.top + 'px',
                                            height: square.icon_width*ratio + 'px',
                                            width: square.icon_width*ratio + 'px', 
                                            zIndex: square.z_index,
                                            transform: 'rotate(' + square.rotate + 'deg)',
                                            opacity: square.opacity + '%'
                                        }}>
                        
                                <img
                                    src={square.status === 0 ? square.icon_untick : square.icon_tick}
                                    width = {square.icon_width*ratio}
                                    height={square.icon_width*ratio}
                                    onClick={() => {if(square.status === 0){square.status = 1}else{square.status = 0}; handleUpdate(), setUpdateView(updateView + 1)}}
                                />

                            </div>                        
                )}

                
                if(square.type == 'todo') {
                    return(
                        <div id={square.id} key={index}
                            title={`order: ${square.order}`}    
                            style={{
                                position: 'absolute',
                                top: square.top*ratio + 'px',
                                left: square.left*ratio + 'px',
                                width: square.width*ratio + 'px',
                                height: square.height*ratio + 'px',
                                opacity: square.opacity + '%',
                                zIndex: square.z_index,
                                overflow: 'scroll',
                                scrollbarWidth: 'none'
                            }}
                        >
                            {square.content.map((task, index) => {
                                return(
                                    <div key={index} style={{
                                                position: 'absolute',
                                                width: (Number(square.width) - square.borderWidth*2)*ratio + 'px',
                                                height: square.el_height*ratio + 'px',
                                                left: '0px',
                                                top: (square.el_height*index + square.spacingY*index)*ratio + 'px',
                                                backgroundColor: square.backgroundColor,
                                                borderStyle: square.borderStyle,
                                                borderColor: square.borderColor,
                                                borderWidth: square.borderWidth*ratio + 'px',
                                                borderRadius: square.borderRadius*ratio + 'px',
                                                overflow: 'hidden'
                                            }}>
                                        <div className="to-hover" 
                                            style={{
                                                position: 'absolute',
                                                float: 'left',
                                                left: toString(10*ratio) + 'px',
                                                top: (square.el_height/2 - square.icon_width/2)*ratio + 'px',
                                                width: square.icon_width*ratio + 'px', 
                                                height: square.icon_width*ratio + 'px',
                                                overflow: 'hidden'}}>
                                            <img src={task[0] == 0 ? square.icon_untick : square.icon_tick} 
                                                width={square.icon_width*ratio} height={square.icon_width*ratio}
                                                onClick={() => {if(task[0] == 0){task[0] = 1} else {task[0] = 0}; handleUpdate(); setUpdateView(updateView + 1)}}
                                            ></img>
                                        </div>
                                        <div  style={{
                                                position: 'absolute',
                                                width: (square.width - 20 - square.borderWidth*2 - square.icon_width*2 - square.paddingLeft)*ratio + 'px',
                                                height: square.el_height*ratio + 'px',
                                                float: 'left',
                                                left: (Number(square.icon_width) + 10)*ratio + 'px',
                                                overflow: 'hidden',
                                                textAlign: square.align,
                                                fontFamily: square.fontFamily + ',' + square.fontCategory,
                                                fontSize: square.fontSize*ratio + 'px',
                                                color: square.fontColor,
                                                fontStyle: square.fontStyle,
                                                fontWeight: square.fontWeight,
                                                textDecoration: square.textDecoration,
                                                lineHeight: square.lineHeight,
                                                letterSpacing: square.letterSpacing*ratio + 'px',
                                                paddingTop: square.paddingTop*ratio + 'px',
                                                paddingBottom: square.paddingBottom*ratio + 'px',
                                                paddingLeft: square.paddingLeft*ratio + 'px',
                                                paddingRight: square.paddingRight*ratio + 'px',
                                        }}>
                                            {task[1]}
                                        </div>
                                        <div className="to-hover" 
                                            style={{
                                                position: 'absolute',
                                                float: 'right',
                                                top: (square.el_height/2 - square.icon_width/2)*ratio + 'px',
                                                right: 10*ratio + 'px',
                                                width: square.icon_width*ratio + 'px', 
                                                height: square.icon_width*ratio + 'px',
                                                overflow: 'hidden'}}>
                                            <img src={square.delete_btn} width={square.icon_width*ratio} height={square.icon_width*ratio}
                                                onClick={() => {square.content.splice(index, 1), handleUpdate(), setUpdateView(updateView + 1)}}
                                            ></img>
                                        </div>
                                    </div>
                                )}
                            )}
                        </div>
                    )}


                if(square.type == 'button' || square.type == 'fixed_icon') {
                    return(
                            <div id={square.id} key={index}
                                    style={{
                                            position: "absolute",
                                            left: square.left*ratio + 'px',
                                            top: square.top*ratio + 'px',
                                            height: square.icon_width*ratio + 'px',
                                            width: square.icon_width*ratio + 'px', 
                                            zIndex: square.z_index,
                                            transform: 'rotate(' + square.rotate + 'deg)',
                                            opacity: square.opacity + '%'
                                        }}
                                    onClick={() => {if(square.type == 'button'){
                                        let new_task = prompt("Please enter new task:", "")
                                        for(let i = 0; i < leftPage.elements.length; i++){
                                            if(Object.hasOwn(leftPage.elements[i], 'parentID')){
                                                if(leftPage.elements[i].parentID == square.parentID && leftPage.elements[i].type == 'todo'){
                                                    leftPage.elements[i].content.push([0, new_task])
                                                    break;
                                                }
                                            }
                                        }
                                        handleUpdate();
                                        setUpdateView(updateView + 1)
                                    }}}
                            >
                        
                                <img
                                    src={square.source}
                                    width = {square.icon_width*ratio}
                                    height={square.icon_width*ratio}
                                    title={square.type=='button' ? `order: ${square.order}` : `mood: ${square.tag[2]}`}
                                />
                        
                            </div>                        
                    )}

                
                if(square.type == 'mood') {
                    return(
                            <div id={square.id} key={index}
                                    className="to-hover"
                                    style={{
                                            position: "absolute",
                                            left: square.left*ratio + 'px',
                                            top: square.top*ratio + 'px',
                                            height: square.icon_width*ratio + 'px',
                                            width: square.icon_width*ratio + 'px', 
                                            zIndex: square.z_index,
                                            transform: 'rotate(' + square.rotate + 'deg)',
                                            opacity: square.opacity + '%'
                                        }}>
                        
                                {square.name == "dropdown" &&
                                <img
                                    src={square.options[square.status][1]}
                                    width = {square.icon_width*ratio}
                                    height={square.icon_width*ratio}
                                    title={dropdownTag(square)}
                                    onClick={() => {if(square.status + 1 < square.options.length){square.status = square.status + 1}else{square.status = 0}; handleUpdate(), setUpdateView(updateView + 1)}}
                                />}
                                {square.name == "multiple" &&
                                <img
                                    src={square.status == 0 ? square.options[1] : square.options[0]}
                                    width = {square.icon_width*ratio}
                                    height={square.icon_width*ratio}
                                    title={leftPage.temp_type == 'weekly' ? `mood: ${square.order}` : ''}
                                    onClick={() => {if(square.status == 0){square.status = 1} else {square.status = 0}; handleUpdate(); setUpdateView(updateView + 1)}}
                                />}

                            </div>                        
                    )}
                
                
                
                if(square.type == 'analys') {
                    var total = 0
                    var done = 0
                    if(square.parentType == 'task_analys'){
                       if(leftPage.temp_type == 'weekly'){
                            pages.map((page, index) => {
                                if(square.reference == page._id){
                                    if(leftPage.week_start == page.week_start && leftPage.week_end == page.week_end){
                                        page.elements.map((el, i) => {
                                            if(el.type == 'todo'){
                                                el.content.map((todo, x) => {
                                                    total = total + 1
                                                    done = done + todo[0]
                                                })
                                            }
                                        })
                                    }
                                }
                            })
                       }
                       if(leftPage.temp_type == 'monthly'){
                            pages.map((page, index) => {
                                if(square.reference == page._id){
                                    if(leftPage.month_start == page.month_start && leftPage.month_end == page.month_end){
                                        page.elements.map((el, i) => {
                                            if(el.type == 'todo'){
                                                el.content.map((todo, x) => {
                                                    total = total + 1
                                                    done = done + todo[0]
                                                })
                                            }
                                        })
                                    }
                                }
                            })
                       }
                       if(leftPage.temp_type == 'yearly'){
                            pages.map((page, index) => {
                                if(square.reference == page._id){
                                        page.elements.map((el, i) => {
                                            if(el.type == 'todo'){
                                                el.content.map((todo, x) => {
                                                    total = total + 1
                                                    done = done + todo[0]
                                                })
                                            }
                                        })
                                }
                            })
                       }
                    }

                    if(square.parentType == 'habit_analys'){
                        if(leftPage.temp_type == 'weekly'){
                            pages.map((page, index) => {
                                if(square.reference == page._id){
                                    if(leftPage.week_start == page.week_start && leftPage.week_end == page.week_end){
                                        page.elements.map((el, i) => {
                                            if(el.type == 'icon' && el.parentType == 'habit' && el.tag[0] == square.tag[0] && el.tag[1] == square.tag[1]){
                                                    total = total + 1
                                                    done = done + el.status
                                            }
                                        })
                                    }
                                }
                            })
                        }
                        if(leftPage.temp_type == 'monthly'){
                            pages.map((page, index) => {
                                if(square.reference == page._id){
                                    if(leftPage.month_start == page.month_start && leftPage.month_end == page.month_end){
                                        page.elements.map((el, i) => {
                                            if(el.type == 'icon' && el.parentType == 'habit' && el.tag[0] == square.tag[0] && el.tag[1] == square.tag[1]){
                                                    total = total + 1
                                                    done = done + el.status
                                            }
                                        })
                                    }
                                }
                            })
                        }
                        if(leftPage.temp_type == 'yearly'){
                            pages.map((page, index) => {
                                if(square.reference == page._id){
                                        page.elements.map((el, i) => {
                                            if(el.type == 'icon' && el.parentType == 'habit'  && el.tag[0] == square.tag[0] && el.tag[1] == square.tag[1]){
                                                    total = total + 1
                                                    done = done + el.status
                                            }
                                        })
                                }
                            })
                        }
                    }

                    if(square.parentType == 'mood_analys'){
                        if(leftPage.temp_type == 'weekly'){
                            pages.map((page, index) => {
                                if(square.reference == page._id){
                                    if(leftPage.week_start == page.week_start && leftPage.week_end == page.week_end){
                                        page.elements.map((el, i) => {
                                            if(el.type == 'mood'){
                                                if(el.name == 'dropdown'){
                                                    if(el.status == square.tag[1]){
                                                        done = done + 1
                                                    }
                                                        total = total + 1
                                                        
                                                }
                                                if(el.name == 'multiple'){
                                                    if(el.tag[1] == square.tag[2]){
                                                        //console.log(el.status)
                                                        done = done + el.status
                                                        total = total + 1
                                                    }
                                                }
                                            }
                                        })
                                    }
                                }
                            })
                        }
                        if(leftPage.temp_type == 'monthly'){
                            pages.map((page, index) => {
                                if(square.reference == page._id){
                                    if(leftPage.month_start == page.month_start && leftPage.month_end == page.month_end){
                                        //console.log('start')
                                        page.elements.map((el, i) => {
                                            if(el.type == 'mood'){
                                                if(el.name == 'dropdown'){
                                                    if(el.status == square.tag[1]){
                                                        //console.log(el.status, square.tag[1])
                                                        done = done + 1
                                                    }
                                                        total = total + 1
                                                        
                                                }
                                                if(el.name == 'multiple'){
                                                    if(el.tag[1] == square.tag[2]){
                                                        done = done + el.status
                                                        total = total + 1
                                                    }
                                                        
                                                }
                                            }
                                        })
                                    }
                                }
                            })
                        }
                        if(leftPage.temp_type == 'yearly'){
                            pages.map((page, index) => {
                                if(square.reference == page._id){
                                        page.elements.map((el, i) => {
                                            if(el.type == 'mood'){
                                                if(el.name == 'dropdown'){
                                                    if(el.status == square.tag[1]){
                                                        done = done + 1
                                                    }
                                                        total = total + 1
                                                        
                                                }
                                                if(el.name == 'multiple'){
                                                    if(el.tag[1] == square.tag[2]){
                                                        done = done + el.status
                                                        total = total + 1
                                                    }                                                        
                                                }
                                            }
                                        })
                                }
                            })
                        }
                    }


                    return (
                        <div id={square.id} key={[index, updateView]}
                            title={square.parentType == 'task_analys' ? `Task Analytics - ${square.ref_type}` : `${square.tag[2]} - ${square.ref_type}`} 
                            style = {{
                                width: (square.width  - square.paddingLeft - square.paddingRight)*ratio + 'px',
                                height: (square.height - square.paddingTop - square.paddingBottom)*ratio + 'px',
                                top: square.top*ratio + 'px', 
                                left: square.left*ratio + 'px',
                                zIndex: square.z_index, 
                                transform: 'rotate(' + square.rotate + 'deg)',
                                opacity: square.opacity + '%',
                                backgroundColor: square.backgroundColor,
                                borderStyle: square.borderStyle,
                                borderColor: square.borderColor,
                                borderWidth: square.borderWidth*ratio + 'px',
                                borderRadius: square.borderRadius + '%',
                                textAlign: square.align,
                                fontFamily: square.fontFamily + ',' + square.fontCategory,
                                fontSize: square.fontSize*ratio + 'px',
                                color: square.fontColor,
                                fontStyle: square.fontStyle,
                                fontWeight: square.fontWeight,
                                textDecoration: square.textDecoration,
                                lineHeight: square.lineHeight,
                                letterSpacing: square.letterSpacing*ratio + 'px',
                                paddingTop: square.paddingTop*ratio + 'px',
                                paddingBottom: square.paddingBottom*ratio + 'px',
                                paddingLeft: square.paddingLeft*ratio + 'px',
                                paddingRight: square.paddingRight*ratio + 'px',
                                position: "absolute",
                                overflow: 'visible',
                            }}>
                                {(square.name == '%') && <div> {done == 0 ? '0' : Math.round(done/total*100)}% </div>}
                                {(square.name == '#') && <div> {done}/{total} </div>}
                        </div>
                        )
                }

                
                if(square.type == 'calendar') {
                    const m_start = new Date(leftPage.month_start)
                    const display = new Date(m_start.getFullYear(), m_start.getMonth(), m_start.getDate() - m_start.getDay() + Number(square.order)).getDate()
                    return (
                        <div id={square.id} key={index} 
                            title = {'order: ' + square.order + ', day: ' + square.day}
                            style = {{
                                width: square.width*ratio + 'px',
                                height: square.height*ratio + 'px',
                                top: square.top*ratio + 'px', 
                                left: square.left*ratio + 'px',
                                zIndex: square.z_index, 
                                transform: 'rotate(' + square.rotate + 'deg)',
                                opacity: square.opacity + '%',
                                backgroundColor: square.backgroundColor,
                                borderStyle: square.borderStyle,
                                borderColor: square.borderColor,
                                borderWidth: square.borderWidth*ratio + 'px',
                                borderRadius: square.borderRadius + '%',
                                position: "absolute", 
                                overflow: 'hidden',
                                textAlign: square.align,
                                fontFamily: square.fontFamily + ',' + square.fontCategory,
                                fontSize: square.fontSize*ratio + 'px',
                                color: square.fontColor,
                                fontStyle: square.fontStyle,
                                fontWeight: square.fontWeight,
                                textDecoration: square.textDecoration,
                                lineHeight: square.lineHeight,
                                letterSpacing: square.letterSpacing*ratio + 'px',
                                paddingTop: square.paddingTop*ratio + 'px',
                                paddingBottom: square.paddingBottom*ratio + 'px',
                                paddingLeft: square.paddingLeft*ratio + 'px',
                                paddingRight: square.paddingRight*ratio + 'px',
                            }}>
                                <div style = {{
                                    position: 'absolute',
                                    top: '0px',
                                    left: '0px',
                                    width: square.width*ratio + 'px',
                                    height: square.date_format.height*ratio + 'px',
                                    textAlign: square.date_format.align,
                                    fontFamily: square.date_format.fontFamily + ',' + square.date_format.fontCategory,
                                    fontSize: square.date_format.fontSize*ratio + 'px',
                                    color: square.date_format.fontColor,
                                    fontStyle: square.date_format.fontStyle,
                                    fontWeight: square.date_format.fontWeight,
                                    textDecoration: square.date_format.textDecoration,
                                    lineHeight: square.date_format.lineHeight,
                                    letterSpacing: square.date_format.letterSpacing*ratio + 'px',
                                    paddingTop: square.date_format.paddingTop*ratio + 'px',
                                    paddingBottom: square.date_format.paddingBottom*ratio + 'px',
                                    paddingLeft: square.date_format.paddingLeft*ratio + 'px',
                                    paddingRight: square.date_format.paddingRight*ratio + 'px'
                                }}>
                                    {display}
                                </div>
                                <div style = {{
                                    position: 'absolute',
                                    top: square.date_format.height*ratio + 'px',
                                    left: '0px',
                                    width: square.width*ratio + 'px',
                                    height: Number(square.height - square.date_format.height)*ratio + 'px',
                                    color: square.entry.fontColor,
                                    paddingTop: square.entry.paddingTop*ratio + 'px',
                                    paddingBottom: square.entry.paddingBottom*ratio + 'px',
                                    paddingLeft: square.entry.paddingLeft*ratio + 'px',
                                    paddingRight: square.entry.paddingRight*ratio + 'px'
                                }}>
                                    <textarea style={{
                                        width: '100%', 
                                        height: '100%', 
                                        backgroundColor: 'transparent', 
                                        textAlign: square.entry.align,
                                        fontFamily: square.entry.fontFamily + ',' + square.entry.fontCategory,
                                        fontSize: square.entry.fontSize*ratio + 'px',
                                        color: square.entry.fontColor,
                                        fontStyle: square.entry.fontStyle,
                                        fontWeight: square.entry.fontWeight,
                                        textDecoration: square.entry.textDecoration,
                                        lineHeight: square.entry.lineHeight,
                                        letterSpacing: square.entry.letterSpacing*ratio + 'px',
                                        resize: 'none', 
                                        border: 'none'}} 
                                    onChange={(e) => {square.content = e.target.value; handleUpdate()}} defaultValue={square.content}/>
                                
                                </div>
                        </div>
                        )
                }

            })}

        </div>
    )

}

export default LeftPage