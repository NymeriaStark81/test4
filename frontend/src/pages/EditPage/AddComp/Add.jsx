import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTable, faTableCellsLarge} from "@fortawesome/free-solid-svg-icons"

const handleAddShape = (tempID, squares, shape, handleUpdateSquares, addItem, setAddItem) => {
    if(shape === "rectangle"){
        squares.push({
            type: 'shape',
            name: 'rectangle',
            id: Date.now(),
            width: 50,
            height: 50,
            top: 10,
            left: 10,
            z_index: 12,
            rotate: 0,
            skew: 0,
            opacity: 100,
            backgroundColor: '#BDBDBD',
            borderStyle: 'none',
            borderColor: "#FFFFFF",
            borderWidth: 2,
            borderRadius: 5
        })
    } else if (shape === "triangle"){
        squares.push({
            type: 'shape',
            name: 'triangle',
            id: Date.now(),
            width: 50,
            height: 50,
            top: 10,
            left: 10,
            z_index: 11,
            rotate: 0,
            opacity: 100,
            backgroundColor: '#BDBDBD'
        })
    } else if (shape === "circle"){
        squares.push({
            type: 'shape',
            name: 'circle',
            id: Date.now(),
            width: 50,
            height: 50,
            top: 10,
            left: 10,
            z_index: 11,
            rotate: 0,
            opacity: 100,
            backgroundColor: '#BDBDBD',
            borderStyle: 'none',
            borderColor: "#FFFFFF",
            borderWidth: 2,
            borderRadius: 50
        })
    } else if (shape === "parallelogram"){
        squares.push({
            type: 'shape',
            name: 'parallelogram',
            id: Date.now(),
            width: 50,
            height: 50,
            top: 10,
            left: 10,
            z_index: 11,
            rotate: 0,
            skew: -10,
            opacity: 100,
            backgroundColor: '#BDBDBD',
            borderStyle: 'none',
            borderColor: "#FFFFFF",
            borderWidth: 2,
            borderRadius: 0
        })
    } else if (shape == 'line'){
        squares.push({
            type: 'shape',
            name: 'line',
            id: Date.now(),
            width: 100,
            height: 0,
            top: 10,
            left: 10,
            z_index: 12,
            rotate: 0,
            opacity: 100,
            borderStyle: 'solid',
            borderColor: "#BDBDBD",
            borderWidth: 5
        })
    }
    handleUpdateSquares(squares, tempID), 
    setAddItem(addItem + 1)
}

const handleAddImage = (e, file, squares,  tempID, addItem, setAddItem, handleUpdateSquares) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file)
    fetch("http://localhost:3000/add_image/", {
        method: 'POST',
        body: formData,
    })
    .then((res) => {return res.json()})
    .then((data) => {
        squares.push({
            type: 'image',
            id: Date.now(),
            source: data.URL,
            original_width: data.width,
            original_height: data.height,
            width: data.width,
            height: data.height,
            left: '0',
            top: '0',
            z_index: 12,
            rotate: 0,
            opacity: 100,
            borderStyle: 'none',
            borderColor: 'none',
            borderWidth: 3,
            borderRadius: 0
        })
        handleUpdateSquares(squares, tempID)
        setAddItem(addItem+1)
    })
}

const handleAddGridFixed = (tempID, squares, handleUpdateSquares, addItem, setAddItem) => {
    squares.push({
        type: 'grid',
        name: 'fixed',
        id: Date.now(),
        width: 80,
        height: 40,
        left: 0,
        top: 0,
        z_index: 11,
        opacity: 100,
        align: "center",
        fontCategory: "sans-serif",
        fontFamily: "Times New Roman",
        fontSize: 20,
        fontColor: "#FFFFFF",
        fontStyle: "normal",
        fontWeight: '400',
        textDecoration: "none",
        backgroundColor: '#BDBDBD',
        borderStyle: 'dashed',
        borderColor: "#FFFFFF",
        borderWidth: 2,
        borderRadius: 5,
        rows: 2,
        columns: 2,
        spacing: 5,
        content: [['',''],['','']],
        lineHeight: 1.5,
        letterSpacing: 2,
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 2,
        paddingRight: 2
    }), 
    handleUpdateSquares(squares, tempID),
    setAddItem(addItem + 1)
}

const handleAddGridInput = (tempID, squares, handleUpdateSquares, addItem, setAddItem) => {
    squares.push({
        type: 'grid',
        name: 'input',
        id: Date.now(),
        width: 80,
        height: 40,
        left: 0,
        top: 0,
        z_index: 11,
        opacity: 100,
        align: "center",
        fontCategory: "sans-serif",
        fontFamily: "Times New Roman",
        fontSize: 20,
        fontColor: "#FFFFFF",
        fontStyle: "normal",
        fontWeight: '400',
        textDecoration: "none",
        backgroundColor: '#BDBDBD',
        borderStyle: 'dashed',
        borderColor: "#FFFFFF",
        borderWidth: 2,
        borderRadius: 5,
        rows: 2,
        columns: 2,
        spacing: 5,
        content: [['',''],['','']],
        lineHeight: 1.5,
        letterSpacing: 2,
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 2,
        paddingRight: 2
    }), 
    handleUpdateSquares(squares, tempID),
    setAddItem(addItem + 1)
}

const handleAddText = (tempID, squares, handleUpdateSquares, addItem, setAddItem) => {
    squares.push({
        type: 'text',
        id: Date.now(),
        width: 200,
        height: 50,
        left: 0,
        top: 0,
        align: 'right',
        z_index: 11,
        rotate: 0,
        opacity: 100,
        fontFamily: "Times New Roman",
        fontCategory: 'serif',
        fontSize: 30,
        fontColor: "#000000",
        fontStyle: "normal",
        fontWeight: '400',
        textDecoration: "none",
        backgroundColor: '#FFFFFF',
        borderStyle: 'dashed',
        borderColor: "none",
        borderWidth: 2,
        borderRadius: 5,
        content: 'Text Here',
        lineHeight: 1.5,
        letterSpacing: 2,
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 2,
        paddingRight: 2
    }), 

    handleUpdateSquares(squares, tempID), 
    setAddItem(addItem + 1)
}

const handleAddDate = (tempID, temp_type, squares, handleUpdateSquares, addItem, setAddItem) => {
    var order = 1
    squares.map((square, index) => {
        if(square.type == "date"){
            if(square.order >= order){
                order = Number(square.order) + 1
            }
        }
    })

    squares.push({
        type: 'date',
        id: Date.now(),
        order: order,
        width: 300,
        height: 100,
        left: 0,
        top: 0,
        align: 'right',
        z_index: 11,
        rotate: 0,
        opacity: 100,
        fontFamily: "Times New Roman",
        fontCategory: 'serif',
        fontSize: 30,
        fontColor: "#000000",
        fontStyle: "normal",
        fontWeight: '400',
        textDecoration: "none",
        backgroundColor: '#FFFFFF',
        borderStyle: 'dashed',
        borderColor: "none",
        borderWidth: 2,
        borderRadius: 5,
        weekDayFormat: 'MON',
        separate1: ',',
        separate2: '/',
        dayFormat: '2sf',
        monthFormat: 'JAN',
        yearFormat: '4sf',
        content: '',
        lineHeight: 1.5,
        letterSpacing: 2,
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 2,
        paddingRight: 2
    }), 

    handleUpdateSquares(squares, tempID), 
    setAddItem(addItem + 1)
}

const handleAddDiary = (tempID, squares, handleUpdateSquares, addItem, setAddItem) => {
    squares.push({
        type: 'diary',
        id: Date.now(),
        width: 300,
        height: 200,
        left: 0,
        top: 0,
        align: 'right',
        z_index: 11,
        rotate: 0,
        opacity: 100,
        fontFamily: "Times New Roman",
        fontCategory: 'serif',
        fontSize: 20,
        fontColor: "#000000",
        fontStyle: "normal",
        fontWeight: '400',
        textDecoration: "none",
        backgroundColor: '#FFFFFF',
        borderStyle: 'dashed',
        borderColor: "none",
        borderWidth: 2,
        borderRadius: 5,
        content: '',
        lineHeight: 1.5,
        letterSpacing: 2,
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 2,
        paddingRight: 2
    }), 

    handleUpdateSquares(squares, tempID), 
    setAddItem(addItem + 1)
}

const previewHabitTracker = async(e, selectHabit, iconTick, iconUntick, previewGroup, setPreviewGroup, addItem, setAddItem) => {
    e.preventDefault()
    var habits
    fetch("http://localhost:3000/loadHabit/", {
        method: 'POST',
        body: JSON.stringify({habitID: selectHabit}),
        headers: {
            'Content-Type': 'application/json'
    }})
    .then((res) => {return res.json()})
        .then((data) => {
            habits = data.elements

            var tick_url, untick_url, text, icon
            const formData = new FormData();
            formData.append("image", iconTick)
            fetch("http://localhost:3000/add_image/", {
                method: 'POST',
                body: formData,
            })
            .then((res) => {return res.json()})
            .then((data) => {
                tick_url = data.URL

                const formData = new FormData();
                formData.append("image", iconUntick)
                fetch("http://localhost:3000/add_image/", {
                    method: 'POST',
                    body: formData,
                })
                .then((res) => {return res.json()})
                .then((data) => {
                    untick_url = data.URL

                    setPreviewGroup({
                        type: 'previewHabit',
                        habitID: selectHabit,
                        spacingX: 100,
                        spacingY: 100,
                        left: 0,
                        top: 0,
                        opacity: 100,
                        z_index: 11,
                        habits: habits,
                        width: 100,
                        align: 'right',
                        fontFamily: "Times New Roman",
                        fontCategory: 'serif',
                        fontSize: 30,
                        fontColor: "#000000",
                        fontStyle: "normal",
                        fontWeight: '400',
                        textDecoration: "none",
                        backgroundColor: '#FFFFFF',
                        borderStyle: 'dashed',
                        borderColor: "#FFFFFF",
                        borderWidth: 2,
                        borderRadius: 5,
                        lineHeight: 1.5,
                        letterSpacing: 2,
                        paddingTop: 2,
                        paddingBottom: 2,
                        paddingLeft: 2,
                        paddingRight: 2,
                        icon_tick: tick_url,
                        icon_untick: untick_url,
                        icon_width: 50,
                    })

                    setAddItem(addItem + 1)
                })
            })
        })
}

const createHabitTracker = (squares, tempID, temp_type, previewGroup, handleUpdateSquares, addItem, setAddItem, setPreviewGroup) => {
    var flag = true
    var order = 1
    squares.map((square, index) => {
        if(square.parentType == "habit"){
            if(temp_type == 'daily' || temp_type == "monthly"){
                flag = false
                alert("Template already contained a habit tracker!")
            }
            if(square.order >= order){
                order = Number(square.order) + 1
            }
        }
    })

    if(flag){
        var elements = []
        const parentID = Date.now()
        const daysM = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        if(temp_type == 'daily' || temp_type == "weekly"){
            previewGroup.habits.map((habit, index) => {
                squares.push({
                    type: 'fixed_text',
                    parentType: 'habit',
                    id: Date.now() + index*2,
                    content: habit,
                    tag: [previewGroup.habitID, index, habit],
                    parentID: parentID,
                    width: previewGroup.width,
                    height: previewGroup.icon_width,
                    align: previewGroup.align,
                    fontFamily: previewGroup.fontFamily,
                    fontCategory: previewGroup.fontCategory,
                    fontSize: previewGroup.fontSize,
                    fontColor: previewGroup.fontColor,
                    fontStyle: previewGroup.fontStyle,
                    fontWeight: previewGroup.fontWeight,
                    textDecoration: previewGroup.textDecoration,
                    backgroundColor: previewGroup.backgroundColor,
                    borderStyle: previewGroup.borderStyle,
                    borderColor: previewGroup.borderColor,
                    borderWidth: previewGroup.borderWidth,
                    borderRadius: previewGroup.borderRadius,
                    lineHeight: previewGroup.lineHeight,
                    letterSpacing: previewGroup.letterSpacing,
                    paddingTop: previewGroup.paddingTop,
                    paddingBottom: previewGroup.paddingBottom,
                    paddingLeft: previewGroup.paddingLeft,
                    paddingRight: previewGroup.paddingRight,
                    left: Number(previewGroup.left),
                    top: Number(previewGroup.top) + Number(previewGroup.icon_width*index) + Number(previewGroup.spacingY*index),
                    opacity: previewGroup.opacity,
                    rotate: 0,
                    z_index: previewGroup.z_index
                })
                
                const icon = {
                    type: 'icon',
                    id: Date.now() + index*2 + 1,
                    tag: [previewGroup.habitID, index, habit],
                    status: 0,
                    parentID: parentID,
                    parentType: 'habit',
                    icon_tick: previewGroup.icon_tick,
                    icon_untick: previewGroup.icon_untick,
                    icon_width: previewGroup.icon_width,
                    rotate: 0,
                    left: Number(previewGroup.left) + Number(previewGroup.width) + Number(previewGroup.spacingX),
                    top: Number(previewGroup.top) + Number(previewGroup.icon_width*index) + Number(previewGroup.spacingY*index),
                    opacity: previewGroup.opacity,
                    z_index: previewGroup.z_index
                }
                if(temp_type == 'weekly'){
                    squares.push({
                        ...icon,
                        order: order
                    })
                } else {
                    squares.push({
                        ...icon
                    })
                }
        
            })
        }

        /*if(temp_type =='weekly'){
            var id_start = ''
            daysM.forEach((day, i) => {
                squares.push({
                    type: 'text',
                    id: Date.now() + i + 1,
                    parentID: parentID,
                    ... previewGroup.text,
                    width: previewGroup.icon.icon_width,
                    height: previewGroup.icon.icon_width,
                    left: Number(previewGroup.left) + Number(previewGroup.text.width) + Number(previewGroup.spacingX*(i+1)) + Number(previewGroup.icon.icon_width*i),
                    top: Number(previewGroup.top),
                    align: 'center',
                    opacity: previewGroup.opacity,
                    z_index: previewGroup.z_index,
                    content: day[0]
                })

                if(i == 6){
                    id_start = Date.now() + 8
                }
            })


            previewGroup.habits.map((habit, index) => {
                elements.push({
                    type: 'fixed_text',
                    id: id_start + index*8,
                    content: habit,
                    tag: [previewGroup.habitID, index, habit],
                    parentID: parentID,
                    ... previewGroup.text,
                    left: Number(previewGroup.left),
                    top: Number(previewGroup.top) + Number(previewGroup.text.height*(index+1)) + Number(previewGroup.spacingY*(index+1)),
                    opacity: previewGroup.opacity,
                    z_index: previewGroup.z_index
                })

                daysM.forEach((day, i) => {
                    elements.push({
                        type: 'icon',
                        id: id_start + index*8 + i + 1,
                        tag: [previewGroup.habitID, index, habit, day, ''], //'' is the date which will be filled in when creating a journal
                        status: 0,
                        parentID: parentID,
                        ... previewGroup.icon,
                        left: Number(previewGroup.left) + Number(previewGroup.text.width) + Number(previewGroup.spacingX*(i+1)) + Number(previewGroup.icon.icon_width*i),
                        top: Number(previewGroup.top) + Number(previewGroup.text.height*(index+1)) + Number(previewGroup.spacingY*(index+1)),
                        opacity: previewGroup.opacity,
                        z_index: previewGroup.z_index
                    })
                    
                })
                    
            })

            squares.push({
                type: 'habit',
                name: 'weekly',
                habitID: previewGroup.habitID,
                id: parentID,
                elements: elements
            })
        }*/
        
        if(temp_type =='monthly'){
            var id_start = ''
            previewGroup.habits.map((habit, i) => {
                squares.push({
                    type: 'fixed_text',
                    parentType: 'habit',
                    id: Date.now() + i + 1,
                    content: habit,
                    tag: [previewGroup.habitID, i, habit],
                    //order: order,
                    parentID: parentID,
                    width: previewGroup.width,
                    height: previewGroup.icon_width,
                    align: previewGroup.align,
                    fontFamily: previewGroup.fontFamily,
                    fontCategory: previewGroup.fontCategory,
                    fontSize: previewGroup.fontSize,
                    fontColor: previewGroup.fontColor,
                    fontStyle: previewGroup.fontStyle,
                    fontWeight: previewGroup.fontWeight,
                    textDecoration: previewGroup.textDecoration,
                    backgroundColor: previewGroup.backgroundColor,
                    borderStyle: previewGroup.borderStyle,
                    borderColor: previewGroup.borderColor,
                    borderWidth: previewGroup.borderWidth,
                    borderRadius: previewGroup.borderRadius,
                    lineHeight: previewGroup.lineHeight,
                    letterSpacing: previewGroup.letterSpacing,
                    paddingTop: previewGroup.paddingTop,
                    paddingBottom: previewGroup.paddingBottom,
                    paddingLeft: previewGroup.paddingLeft,
                    paddingRight: previewGroup.paddingRight,
                    top: previewGroup.top + Number(previewGroup.width/2 - previewGroup.icon_width/2),
                    left: Number(previewGroup.left) + Number(previewGroup.icon_width) + Number(previewGroup.spacingX*(i+1)) + Number(previewGroup.icon_width*(i)) - Number(previewGroup.width/2 - previewGroup.icon_width/2),
                    opacity: previewGroup.opacity,
                    rotate: 90,
                    z_index: previewGroup.z_index
                })

                if(i+1 == previewGroup.habits.length){
                    id_start = Date.now() + previewGroup.habits.length + 1
                }
            })


            for(let index=1; index<32; index++){
                squares.push({
                    type: 'text',
                    parentType: 'habit',
                    id: id_start + index*(previewGroup.habits.length + 1),
                    parentID: parentID,
                    day: index,
                    content: index,
                    width: previewGroup.icon_width,
                    height: previewGroup.icon_width,
                    align: previewGroup.align,
                    fontFamily: previewGroup.fontFamily,
                    fontCategory: previewGroup.fontCategory,
                    fontSize: previewGroup.fontSize,
                    fontColor: previewGroup.fontColor,
                    fontStyle: previewGroup.fontStyle,
                    fontWeight: previewGroup.fontWeight,
                    textDecoration: previewGroup.textDecoration,
                    backgroundColor: previewGroup.backgroundColor,
                    borderStyle: previewGroup.borderStyle,
                    borderColor: previewGroup.borderColor,
                    borderWidth: previewGroup.borderWidth,
                    borderRadius: previewGroup.borderRadius,
                    lineHeight: previewGroup.lineHeight,
                    letterSpacing: previewGroup.letterSpacing,
                    paddingTop: previewGroup.paddingTop,
                    paddingBottom: previewGroup.paddingBottom,
                    paddingLeft: previewGroup.paddingLeft,
                    paddingRight: previewGroup.paddingRight,
                    left: Number(previewGroup.left),
                    top: previewGroup.top + Number(previewGroup.width) + previewGroup.spacingY*(index) + previewGroup.icon_width*(index-1),
                    opacity: previewGroup.opacity,
                    rotate: 0,
                    z_index: previewGroup.z_index
                })

                previewGroup.habits.map((habit, i) => {
                    squares.push({
                        type: 'icon',
                        parentType: 'habit',
                        id: id_start + index*(previewGroup.habits.length + 1) + i + 1,
                        tag: [previewGroup.habitID, i, habit], //'' is the date which will be filled in when creating a journal
                        day: index,
                        status: 0,
                        parentID: parentID,
                        icon_tick: previewGroup.icon_tick,
                        icon_untick: previewGroup.icon_untick,
                        icon_width: previewGroup.icon_width,
                        left: Number(previewGroup.left) + Number(previewGroup.icon_width) + Number(previewGroup.spacingX*(i+1)) + Number(previewGroup.icon_width*(i)),
                        top: previewGroup.top + Number(previewGroup.width) + previewGroup.spacingY*(index) + previewGroup.icon_width*(index-1),
                        opacity: previewGroup.opacity,
                        rotate: 0,
                        z_index: previewGroup.z_index
                    })
                    
                })
            }
        }

        if(temp_type == 'yearly'){
            const parentID = Date.now()
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct','Nov', 'Dec']

            for(let index=1; index < 13; index++){
                squares.push({
                    type: 'text',
                    parentType: 'habit',
                    id: parentID + index,
                    parentID: parentID,
                    content: months[index-1][0],
                    width: previewGroup.icon_width,
                    height: previewGroup.icon_width,
                    align: previewGroup.align,
                    rotate: 0,
                    fontFamily: previewGroup.fontFamily,
                    fontCategory: previewGroup.fontCategory,
                    fontSize: previewGroup.fontSize,
                    fontColor: previewGroup.fontColor,
                    fontStyle: previewGroup.fontStyle,
                    fontWeight: previewGroup.fontWeight,
                    textDecoration: previewGroup.textDecoration,
                    backgroundColor: previewGroup.backgroundColor,
                    borderStyle: previewGroup.borderStyle,
                    borderColor: previewGroup.borderColor,
                    borderWidth: previewGroup.borderWidth,
                    borderRadius: previewGroup.borderRadius,
                    lineHeight: previewGroup.lineHeight,
                    letterSpacing: previewGroup.letterSpacing,
                    paddingTop: previewGroup.paddingTop,
                    paddingBottom: previewGroup.paddingBottom,
                    paddingLeft: previewGroup.paddingLeft,
                    paddingRight: previewGroup.paddingRight,
                    left: Number(previewGroup.left) + previewGroup.icon_width*(index) + previewGroup.spacingX*(index),    
                    top: Number(previewGroup.top),
                    opacity: previewGroup.opacity,
                    z_index: previewGroup.z_index
            })}

            for(let index=1; index<32; index++){
                squares.push({
                    type: 'text',
                    parentType: 'habit',
                    id: parentID + 12 + 13*index,
                    parentID: parentID,
                    content: index,
                    width: previewGroup.icon_width,
                    height: previewGroup.icon_width,
                    align: previewGroup.align,
                    rotate: 0,
                    fontFamily: previewGroup.fontFamily,
                    fontCategory: previewGroup.fontCategory,
                    fontSize: previewGroup.fontSize,
                    fontColor: previewGroup.fontColor,
                    fontStyle: previewGroup.fontStyle,
                    fontWeight: previewGroup.fontWeight,
                    textDecoration: previewGroup.textDecoration,
                    backgroundColor: previewGroup.backgroundColor,
                    borderStyle: previewGroup.borderStyle,
                    borderColor: previewGroup.borderColor,
                    borderWidth: previewGroup.borderWidth,
                    borderRadius: previewGroup.borderRadius,
                    lineHeight: previewGroup.lineHeight,
                    letterSpacing: previewGroup.letterSpacing,
                    paddingTop: previewGroup.paddingTop,
                    paddingBottom: previewGroup.paddingBottom,
                    paddingLeft: previewGroup.paddingLeft,
                    paddingRight: previewGroup.paddingRight,
                    left: Number(previewGroup.left),    
                    top: Number(previewGroup.top) + previewGroup.spacingY*(index) + previewGroup.icon_width*(index),
                    opacity: previewGroup.opacity,
                    z_index: previewGroup.z_index
                })

                for(let i = 0; i<12; i++){
                squares.push({
                    type: 'icon',
                    parentType: 'habit',
                    id: parentID + 13 + 13*index + i,
                    tag: [previewGroup.habitID, previewGroup.habit[0], previewGroup.habit[1]], //'' is the date which will be filled in when creating a journal
                    day: index,
                    month: [i, months[i]],
                    status: 0,
                    parentID: parentID,
                    left: Number(previewGroup.left) + Number(previewGroup.icon_width)*(i+1) + Number(previewGroup.spacingX)*(i+1),
                    top: Number(previewGroup.top) +  previewGroup.spacingY*(index) + previewGroup.icon_width*(index),
                    opacity: previewGroup.opacity,
                    z_index: previewGroup.z_index,
                    rotate: 0,
                    icon_width: previewGroup.icon_width,
                    icon_tick: previewGroup.icon_tick,
                    icon_untick: previewGroup.icon_untick
                })
                }
                    
            }}
    }
    

    setPreviewGroup('')
    handleUpdateSquares(squares, tempID), 
    setAddItem(addItem + 1)
}

const previewHabitYear = async(e, selectHabit, selectYearHabit, iconTick, iconUntick, previewGroup, setPreviewGroup, addItem, setAddItem) => {
    e.preventDefault()
    
    var tick_url, untick_url
    const formData = new FormData();
    formData.append("image", iconTick)
    fetch("http://localhost:3000/add_image/", {
        method: 'POST',
        body: formData,
    })
    .then((res) => {return res.json()})
    .then((data) => {
        tick_url = data.URL

        const formData = new FormData();
        formData.append("image", iconUntick)
        fetch("http://localhost:3000/add_image/", {
            method: 'POST',
            body: formData,
        })
        .then((res) => {return res.json()})
        .then((data) => {
            untick_url = data.URL

            setPreviewGroup({
                type: 'previewHabit',
                habitID: selectHabit,
                habit: selectYearHabit.split(','),
                icon_tick: tick_url,
                icon_untick: untick_url,
                icon_width: 50,
                spacingX: 5,
                spacingY: 5,
                left: 0,
                top: 0,
                z_index: 11,
                align: 'center',
                opacity: 100,
                fontFamily: "Inter",
                fontCategory: 'sans-serif',
                fontSize: 20,
                fontColor: "#000000",
                fontStyle: "normal",
                fontWeight: '400',
                textDecoration: "none",
                backgroundColor: '#FFFFFF',
                borderStyle: 'dashed',
                borderColor: "#FFFFFF",
                borderWidth: 2,
                borderRadius: 5,
                lineHeight: 1.5,
                letterSpacing: 2,
                paddingTop: 2,
                paddingBottom: 2,
                paddingLeft: 2,
                paddingRight: 2
            })

            setAddItem(addItem + 1)
        })
    })

}

const previewTodo = async(e, iconTick, iconUntick, addBtn, deleteBtn, previewGroup, setPreviewGroup, addItem, setAddItem) => {
    e.preventDefault()
    
    var tick_url, untick_url, addbtn_url, deletebtn_url, text, icon
    const formData = new FormData();
    formData.append("image", iconTick)
    formData.append("image", iconUntick)
    formData.append("image", addBtn)
    formData.append("image", deleteBtn)

    
    fetch("http://localhost:3000/add_icon/", {
        method: 'POST',
        body: formData
    })
    .then((res) => {return res.json()})
    .then((data) => {
        tick_url = data[0]
        untick_url = data[1]
        addbtn_url = data[2]
        deletebtn_url = data[3]

        setPreviewGroup({
            type: 'previewTodo',
            left: 0,
            top: 0,
            width: 500,
            height: 600,
            el_height: 50,
            spacingY: 50,
            icon_width: 50,
            icon_tick: tick_url,
            icon_untick: untick_url,
            add_btn: addbtn_url,
            delete_btn: deletebtn_url
        })

        setAddItem(addItem + 1)

    })

}

const createTodo = (squares, tempID, temp_type, previewGroup, handleUpdateSquares, addItem, setAddItem, setPreviewGroup) => {
    var flag = true
    var order = 1
    squares.map((square, index) => {
        if(square.type == "todo"){
            if(temp_type == 'daily'){
                flag = false
                alert("Template already contained a todo list!")
            }
            if(square.order >= order){
                order = Number(square.order) + 1
            }
        }
    })
    
    if(flag){
        const parentID = Date.now()
    
        squares.push({
            type: 'text',
            id: parentID + 1,
            width: previewGroup.width,
            height: previewGroup.el_height,
            left: previewGroup.left,
            top: previewGroup.top,
            align: 'left',
            z_index: 11,
            rotate: 0,
            opacity: 100,
            fontFamily: "Inter",
            fontCategory: 'sans-serif',
            fontSize: previewGroup.el_height/5*3,
            fontColor: "#000000",
            fontStyle: "bold",
            fontWeight: '700',
            textDecoration: "none",
            backgroundColor: '#FFFFFF',
            borderStyle: 'dashed',
            borderColor: "none",
            borderWidth: 2,
            borderRadius: 5,
            content: 'Todo List',
            lineHeight: 1.5,
            letterSpacing: 2,
            paddingTop: 2,
            paddingBottom: 2,
            paddingLeft: 2,
            paddingRight: 2
        })

        squares.push({
            type: 'button',
            source: previewGroup.add_btn,
            //tag: [''],
            order: order,
            id: parentID + 2,
            parentID: parentID,
            icon_width: previewGroup.icon_width,
            top: previewGroup.top,
            left: previewGroup.left + previewGroup.width - previewGroup.icon_width,
            rotate: 0,
            opacity: 100,
            z_index: 11
        })

        squares.push({
            type: 'todo',
            name: temp_type,
            //tag: [''],
            order: order,
            id: parentID + 3,
            parentID: parentID,
            width: previewGroup.width,
            height: previewGroup.height,
            left: previewGroup.left,
            top: previewGroup.top + previewGroup.el_height + previewGroup.spacingY,
            el_height: previewGroup.el_height,
            spacingY: previewGroup.spacingY,
            icon_width: previewGroup.icon_width,
            icon_tick: previewGroup.icon_tick,
            icon_untick: previewGroup.icon_untick,
            delete_btn: previewGroup.delete_btn,
            align: 'left',
            z_index: 11,
            rotate: 0,
            opacity: 100,
            fontFamily: "Times New Roman",
            fontCategory: 'serif',
            fontSize: previewGroup.el_height/5*2,
            fontColor: "#000000",
            fontStyle: "normal",
            fontWeight: '400',
            textDecoration: "none",
            backgroundColor: '#FFFFFF',
            borderStyle: 'dashed',
            borderColor: "none",
            borderWidth: 2,
            borderRadius: 10,
            content: [],
            lineHeight: 1.5,
            letterSpacing: 2,
            paddingTop: 2,
            paddingBottom: 2,
            paddingLeft: 2,
            paddingRight: 2

        })
    }
    

    /*if(temp_type =='weekly'){
        var id_start = ''
        daysM.forEach((day, i) => {
            squares.push({
                type: 'text',
                id: Date.now() + i + 1,
                parentID: parentID,
                ... previewGroup.text,
                width: previewGroup.icon.icon_width,
                height: previewGroup.icon.icon_width,
                left: Number(previewGroup.left) + Number(previewGroup.text.width) + Number(previewGroup.spacingX*(i+1)) + Number(previewGroup.icon.icon_width*i),
                top: Number(previewGroup.top),
                align: 'center',
                opacity: previewGroup.opacity,
                z_index: previewGroup.z_index,
                content: day[0]
            })

            if(i == 6){
                id_start = Date.now() + 8
            }
        })


        previewGroup.habits.map((habit, index) => {
            elements.push({
                type: 'fixed_text',
                id: id_start + index*8,
                content: habit,
                tag: [previewGroup.habitID, index, habit],
                parentID: parentID,
                ... previewGroup.text,
                left: Number(previewGroup.left),
                top: Number(previewGroup.top) + Number(previewGroup.text.height*(index+1)) + Number(previewGroup.spacingY*(index+1)),
                opacity: previewGroup.opacity,
                z_index: previewGroup.z_index
            })

            daysM.forEach((day, i) => {
                elements.push({
                    type: 'icon',
                    id: id_start + index*8 + i + 1,
                    tag: [previewGroup.habitID, index, habit, day, ''], //'' is the date which will be filled in when creating a journal
                    status: 0,
                    parentID: parentID,
                    ... previewGroup.icon,
                    left: Number(previewGroup.left) + Number(previewGroup.text.width) + Number(previewGroup.spacingX*(i+1)) + Number(previewGroup.icon.icon_width*i),
                    top: Number(previewGroup.top) + Number(previewGroup.text.height*(index+1)) + Number(previewGroup.spacingY*(index+1)),
                    opacity: previewGroup.opacity,
                    z_index: previewGroup.z_index
                })
                
            })
                
        })

        squares.push({
            type: 'habit',
            name: 'weekly',
            habitID: previewGroup.habitID,
            id: parentID,
            elements: elements
        })
    }
    
    if(temp_type =='monthly'){
        var id_start = ''
        previewGroup.habits.map((habit, i) => {
            elements.push({
                type: 'fixed_text',
                id: Date.now() + i + 1,
                tag: [previewGroup.habitID, i, habit],
                parentID: parentID,
                ... previewGroup.text,
                width: previewGroup.text.width,
                height: previewGroup.icon.icon_width,
                top: Number(previewGroup.text.width/2 - previewGroup.icon.icon_width/2),
                left: Number(previewGroup.left) + Number(previewGroup.spacingX*(i+1)) + Number(previewGroup.icon.icon_width*(i+1)) - Number(previewGroup.text.width/2 - previewGroup.icon.icon_width/2),
                rotate: 90,
                opacity: previewGroup.opacity,
                z_index: previewGroup.z_index,
                content: habit
            })

            if(i+1 == previewGroup.habits.length){
                id_start = Date.now() + previewGroup.habits.length + 1
            }
        })


        for(let index=1; index<32; index++){
            squares.push({
                type: 'text',
                id: id_start + index*(previewGroup.habits.length + 1),
                parentID: parentID,
                content: index,
                ... previewGroup.text,
                width: previewGroup.icon.icon_width,
                left: Number(previewGroup.left),
                top: Number(previewGroup.text.width) + previewGroup.spacingY*(index) + previewGroup.icon.icon_width*(index-1),
                opacity: previewGroup.opacity,
                z_index: previewGroup.z_index
            })

            previewGroup.habits.map((habit, i) => {
                elements.push({
                    type: 'icon',
                    id: id_start + index*(previewGroup.habits.length + 1) + i + 1,
                    tag: [previewGroup.habitID, i, habit, index, ''], //'' is the date which will be filled in when creating a journal
                    status: 0,
                    parentID: parentID,
                    ... previewGroup.icon,
                    left: Number(previewGroup.left) + Number(previewGroup.spacingX*(i+1)) + Number(previewGroup.icon.icon_width*(i+1)),
                    top: Number(previewGroup.text.width) + previewGroup.spacingY*(index) + previewGroup.icon.icon_width*(index-1),
                    opacity: previewGroup.opacity,
                    z_index: previewGroup.z_index
                })
                
            })
                
        }

        squares.push({
            type: 'habit',
            name: 'monthly',
            numDays: '31',
            habitID: previewGroup.habitID,
            id: parentID,
            elements: elements
        })
    }*/

    setPreviewGroup('')
    handleUpdateSquares(squares, tempID), 
    setAddItem(addItem + 1)
}

const previewMoodTracker = async(e, selectMood, moodType, previewGroup, setPreviewGroup, addItem, setAddItem) => {
    e.preventDefault()
    
    fetch("http://localhost:3000/loadMood/", {
        method: 'POST',
        body: JSON.stringify({moodID: selectMood}),
        headers: {
            'Content-Type': 'application/json'
    }})
        .then((res) => {return res.json()})
        .then((data) => {

            const moods = [['blank', data.blank]]
            data.elements.map((el, i) => {
                moods.push(el)
            })
            
            setPreviewGroup({
                type: 'previewMood',
                name: moodType,
                moodID: selectMood,
                spacingX: 5,
                spacingY: 5,
                left: 0,
                top: 0,
                z_index: 11,
                icon_width: 30,
                width: 200,
                moods: moods,
                align: 'center',
                rotate: 0,
                opacity: 100,
                fontFamily: "Inter",
                fontCategory: 'sans-serif',
                fontSize: 20,
                fontColor: "#000000",
                fontStyle: "normal",
                fontWeight: '400',
                textDecoration: "none",
                backgroundColor: '#FFFFFF',
                borderStyle: 'dashed',
                borderColor: "#FFFFFF",
                borderWidth: 2,
                borderRadius: 5,
                lineHeight: 1.5,
                letterSpacing: 2,
                paddingTop: 2,
                paddingBottom: 2,
                paddingLeft: 2,
                paddingRight: 2
            })
        
            setAddItem(addItem + 1)
        })
}

const createMoodTracker = (squares, tempID, temp_type, previewGroup, handleUpdateSquares, addItem, setAddItem, setPreviewGroup) => {
    var flag = true
    var order = 1
    squares.map((square, index) => {
        if(square.type == "mood"){
            if(temp_type == 'daily' || temp_type == "monthly"){
                flag = false
                alert("Template already contained a mood tracker!")
            }
            if(square.order >= order){
                order = Number(square.order) + 1
            }
        }
    })
    
    if(flag){
        const parentID = Date.now()
        var addMood
        
        if(temp_type == 'daily' || temp_type == "weekly"){
            squares.push({
                type: 'text',
                id: parentID + 1,
                parentID: parentID,
                parentType: 'mood',
                width: previewGroup.width,
                height: previewGroup.icon_width,
                left: previewGroup.left,
                top: previewGroup.top,
                align: 'left',
                z_index: previewGroup.z_index,
                rotate: 0,
                opacity: 100,
                fontFamily: "Inter",
                fontCategory: 'sans-serif',
                fontSize: previewGroup.icon_width/5*3,
                fontColor: "#000000",
                fontStyle: "bold",
                fontWeight: '700',
                textDecoration: "none",
                backgroundColor: '#FFFFFF',
                borderStyle: 'dashed',
                borderColor: "none",
                borderWidth: 2,
                borderRadius: 5,
                content: 'Mood',
                lineHeight: 1.5,
                letterSpacing: 2,
                paddingTop: 2,
                paddingBottom: 2,
                paddingLeft: 2,
                paddingRight: 2
            })
            
            if(previewGroup.name == "dropdown"){
                addMood = {
                    type: 'mood',
                    name: 'dropdown',
                    id: parentID + 2,
                    tag: [previewGroup.moodID],
                    status: 0,
                    parentID: parentID,
                    parentType: 'mood',
                    left: Number(previewGroup.left) + Number(previewGroup.width) - Number(previewGroup.icon_width),
                    top: Number(previewGroup.top),
                    opacity: 100,
                    z_index: previewGroup.z_index,
                    rotate: 0,
                    icon_width: previewGroup.icon_width,
                    options: previewGroup.moods,
                }
                if(temp_type == 'daily'){
                    squares.push(addMood)
                } else {
                    squares.push({
                        ...addMood,
                        order: order
                    })
                }
            } else {
                previewGroup.moods.map((mood, index) => {
                    if(index != 0){
                        addMood = {
                            type: 'mood',
                            name: 'multiple',
                            id: parentID + 2 + index,
                            tag: [previewGroup.moodID, mood[0]],
                            status: 0,
                            parentID: parentID,
                            parentType: 'mood',
                            left: Number(previewGroup.left) + Number(previewGroup.width) + Number(previewGroup.spacingX)*(index + 1) + Number(previewGroup.icon_width)*index,
                            top: Number(previewGroup.top),
                            opacity: 100,
                            z_index: previewGroup.z_index,
                            rotate: 0,
                            icon_width: previewGroup.icon_width,
                            options: [mood[1], mood[2]],
                        }
                        if(temp_type == 'daily'){
                            squares.push(addMood)
                        } else {
                            squares.push({
                                ...addMood,
                                order: order
                            })
                        }
                    }
                })
            }
    
        }

        if(temp_type == 'monthly'){
            const parentID = Date.now()

            for(let index=1; index<32; index++){
                squares.push({
                    type: 'text',
                    id: parentID + 2*index,
                    parentID: parentID,
                    parentType: 'mood',
                    day: index,
                    content: index,
                    width: previewGroup.icon_width,
                    height: previewGroup.icon_width,
                    align: previewGroup.align,
                    rotate: 0,
                    fontFamily: previewGroup.fontFamily,
                    fontCategory: previewGroup.fontCategory,
                    fontSize: previewGroup.fontSize,
                    fontColor: previewGroup.fontColor,
                    fontStyle: previewGroup.fontStyle,
                    fontWeight: previewGroup.fontWeight,
                    textDecoration: previewGroup.textDecoration,
                    backgroundColor: previewGroup.backgroundColor,
                    borderStyle: previewGroup.borderStyle,
                    borderColor: previewGroup.borderColor,
                    borderWidth: previewGroup.borderWidth,
                    borderRadius: previewGroup.borderRadius,
                    lineHeight: previewGroup.lineHeight,
                    letterSpacing: previewGroup.letterSpacing,
                    paddingTop: previewGroup.paddingTop,
                    paddingBottom: previewGroup.paddingBottom,
                    paddingLeft: previewGroup.paddingLeft,
                    paddingRight: previewGroup.paddingRight,
                    left: Number(previewGroup.left),    
                    top: Number(previewGroup.top) + previewGroup.spacingY*(index - 1) + previewGroup.icon_width*(index-1),
                    opacity: previewGroup.opacity,
                    z_index: previewGroup.z_index
                })

                squares.push({
                    type: 'mood',
                    name: 'dropdown',
                    id: parentID + 2*index + 1,
                    parentID: parentID,
                    parentType: 'mood',
                    tag: [previewGroup.moodID],
                    day: index,
                    status: 0,
                    left: Number(previewGroup.left) + Number(previewGroup.width) - Number(previewGroup.icon_width),
                    top: Number(previewGroup.top) +  previewGroup.spacingY*(index - 1) + previewGroup.icon_width*(index-1),
                    opacity: 100,
                    z_index: previewGroup.z_index,
                    rotate: 0,
                    icon_width: previewGroup.icon_width,
                    options: previewGroup.moods
                })
                    
            }}

        if(temp_type == 'yearly'){
            const parentID = Date.now()
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct','Nov', 'Dec']

            for(let index=1; index < 13; index++){
                squares.push({
                    type: 'text',
                    id: parentID + index,
                    parentID: parentID,
                    parentType: 'mood',
                    content: months[index-1][0],
                    width: previewGroup.icon_width,
                    height: previewGroup.icon_width,
                    align: previewGroup.align,
                    rotate: 0,
                    fontFamily: previewGroup.fontFamily,
                    fontCategory: previewGroup.fontCategory,
                    fontSize: previewGroup.fontSize,
                    fontColor: previewGroup.fontColor,
                    fontStyle: previewGroup.fontStyle,
                    fontWeight: previewGroup.fontWeight,
                    textDecoration: previewGroup.textDecoration,
                    backgroundColor: previewGroup.backgroundColor,
                    borderStyle: previewGroup.borderStyle,
                    borderColor: previewGroup.borderColor,
                    borderWidth: previewGroup.borderWidth,
                    borderRadius: previewGroup.borderRadius,
                    lineHeight: previewGroup.lineHeight,
                    letterSpacing: previewGroup.letterSpacing,
                    paddingTop: previewGroup.paddingTop,
                    paddingBottom: previewGroup.paddingBottom,
                    paddingLeft: previewGroup.paddingLeft,
                    paddingRight: previewGroup.paddingRight,
                    left: Number(previewGroup.left) + previewGroup.icon_width*(index) + previewGroup.spacingX*(index),    
                    top: Number(previewGroup.top),
                    opacity: previewGroup.opacity,
                    z_index: previewGroup.z_index
            })}

            for(let index=1; index<32; index++){
                squares.push({
                    type: 'text',
                    id: parentID + 12 + 13*index,
                    parentID: parentID,
                    parentType: 'mood',
                    content: index,
                    width: previewGroup.icon_width,
                    height: previewGroup.icon_width,
                    align: previewGroup.align,
                    rotate: 0,
                    fontFamily: previewGroup.fontFamily,
                    fontCategory: previewGroup.fontCategory,
                    fontSize: previewGroup.fontSize,
                    fontColor: previewGroup.fontColor,
                    fontStyle: previewGroup.fontStyle,
                    fontWeight: previewGroup.fontWeight,
                    textDecoration: previewGroup.textDecoration,
                    backgroundColor: previewGroup.backgroundColor,
                    borderStyle: previewGroup.borderStyle,
                    borderColor: previewGroup.borderColor,
                    borderWidth: previewGroup.borderWidth,
                    borderRadius: previewGroup.borderRadius,
                    lineHeight: previewGroup.lineHeight,
                    letterSpacing: previewGroup.letterSpacing,
                    paddingTop: previewGroup.paddingTop,
                    paddingBottom: previewGroup.paddingBottom,
                    paddingLeft: previewGroup.paddingLeft,
                    paddingRight: previewGroup.paddingRight,
                    left: Number(previewGroup.left),    
                    top: Number(previewGroup.top) + previewGroup.spacingY*(index) + previewGroup.icon_width*(index),
                    opacity: previewGroup.opacity,
                    z_index: previewGroup.z_index
                })

                for(let i = 0; i<12; i++){
                squares.push({
                    type: 'mood',
                    name: 'dropdown',
                    id: parentID + 13 + 13*index + i,
                    parentID: parentID,
                    parentType: 'mood',
                    tag: [previewGroup.moodID],
                    day: index,
                    month: [i, months[i]],
                    status: 0,
                    left: Number(previewGroup.left) + Number(previewGroup.icon_width)*(i+1) + Number(previewGroup.spacingX)*(i+1),
                    top: Number(previewGroup.top) +  previewGroup.spacingY*(index) + previewGroup.icon_width*(index),
                    opacity: 100,
                    z_index: previewGroup.z_index,
                    rotate: 0,
                    icon_width: previewGroup.icon_width,
                    options: previewGroup.moods
                })
                }
                    
            }}

        
    }
    

    /*if(temp_type =='weekly'){
        var id_start = ''
        daysM.forEach((day, i) => {
            squares.push({
                type: 'text',
                id: Date.now() + i + 1,
                parentID: parentID,
                ... previewGroup.text,
                width: previewGroup.icon.icon_width,
                height: previewGroup.icon.icon_width,
                left: Number(previewGroup.left) + Number(previewGroup.text.width) + Number(previewGroup.spacingX*(i+1)) + Number(previewGroup.icon.icon_width*i),
                top: Number(previewGroup.top),
                align: 'center',
                opacity: previewGroup.opacity,
                z_index: previewGroup.z_index,
                content: day[0]
            })

            if(i == 6){
                id_start = Date.now() + 8
            }
        })


        previewGroup.habits.map((habit, index) => {
            elements.push({
                type: 'fixed_text',
                id: id_start + index*8,
                content: habit,
                tag: [previewGroup.habitID, index, habit],
                parentID: parentID,
                ... previewGroup.text,
                left: Number(previewGroup.left),
                top: Number(previewGroup.top) + Number(previewGroup.text.height*(index+1)) + Number(previewGroup.spacingY*(index+1)),
                opacity: previewGroup.opacity,
                z_index: previewGroup.z_index
            })

            daysM.forEach((day, i) => {
                elements.push({
                    type: 'icon',
                    id: id_start + index*8 + i + 1,
                    tag: [previewGroup.habitID, index, habit, day, ''], //'' is the date which will be filled in when creating a journal
                    status: 0,
                    parentID: parentID,
                    ... previewGroup.icon,
                    left: Number(previewGroup.left) + Number(previewGroup.text.width) + Number(previewGroup.spacingX*(i+1)) + Number(previewGroup.icon.icon_width*i),
                    top: Number(previewGroup.top) + Number(previewGroup.text.height*(index+1)) + Number(previewGroup.spacingY*(index+1)),
                    opacity: previewGroup.opacity,
                    z_index: previewGroup.z_index
                })
                
            })
                
        })

        squares.push({
            type: 'habit',
            name: 'weekly',
            habitID: previewGroup.habitID,
            id: parentID,
            elements: elements
        })
    }
    
    if(temp_type =='monthly'){
        var id_start = ''
        previewGroup.habits.map((habit, i) => {
            elements.push({
                type: 'fixed_text',
                id: Date.now() + i + 1,
                tag: [previewGroup.habitID, i, habit],
                parentID: parentID,
                ... previewGroup.text,
                width: previewGroup.text.width,
                height: previewGroup.icon.icon_width,
                top: Number(previewGroup.text.width/2 - previewGroup.icon.icon_width/2),
                left: Number(previewGroup.left) + Number(previewGroup.spacingX*(i+1)) + Number(previewGroup.icon.icon_width*(i+1)) - Number(previewGroup.text.width/2 - previewGroup.icon.icon_width/2),
                rotate: 90,
                opacity: previewGroup.opacity,
                z_index: previewGroup.z_index,
                content: habit
            })

            if(i+1 == previewGroup.habits.length){
                id_start = Date.now() + previewGroup.habits.length + 1
            }
        })


        for(let index=1; index<32; index++){
            squares.push({
                type: 'text',
                id: id_start + index*(previewGroup.habits.length + 1),
                parentID: parentID,
                content: index,
                ... previewGroup.text,
                width: previewGroup.icon.icon_width,
                left: Number(previewGroup.left),
                top: Number(previewGroup.text.width) + previewGroup.spacingY*(index) + previewGroup.icon.icon_width*(index-1),
                opacity: previewGroup.opacity,
                z_index: previewGroup.z_index
            })

            previewGroup.habits.map((habit, i) => {
                elements.push({
                    type: 'icon',
                    id: id_start + index*(previewGroup.habits.length + 1) + i + 1,
                    tag: [previewGroup.habitID, i, habit, index, ''], //'' is the date which will be filled in when creating a journal
                    status: 0,
                    parentID: parentID,
                    ... previewGroup.icon,
                    left: Number(previewGroup.left) + Number(previewGroup.spacingX*(i+1)) + Number(previewGroup.icon.icon_width*(i+1)),
                    top: Number(previewGroup.text.width) + previewGroup.spacingY*(index) + previewGroup.icon.icon_width*(index-1),
                    opacity: previewGroup.opacity,
                    z_index: previewGroup.z_index
                })
                
            })
                
        }

        squares.push({
            type: 'habit',
            name: 'monthly',
            numDays: '31',
            habitID: previewGroup.habitID,
            id: parentID,
            elements: elements
        })
    }*/

    setPreviewGroup('')
    handleUpdateSquares(squares, tempID), 
    setAddItem(addItem + 1)
}

const handleAddTaskAnalys = (e, tempID, refType, squares, handleUpdateSquares, addItem, setAddItem) => {
    e.preventDefault()
    
    squares.push({
        type: 'analys',
        parentType: 'task_analys',
        name: '%',
        id: Date.now(),
        //reference: '',
        ref_type: refType,
        width: 300,
        height: 100,
        left: 0,
        top: 0,
        align: 'right',
        z_index: 11,
        rotate: 0,
        opacity: 100,
        fontFamily: "Times New Roman",
        fontCategory: 'serif',
        fontSize: 30,
        fontColor: "#000000",
        fontStyle: "normal",
        fontWeight: '400',
        textDecoration: "none",
        backgroundColor: '#FFFFFF',
        borderStyle: 'dashed',
        borderColor: "none",
        borderWidth: 2,
        borderRadius: 5,
        content: '',
        lineHeight: 1.5,
        letterSpacing: 2,
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 2,
        paddingRight: 2
    }), 

    handleUpdateSquares(squares, tempID), 
    setAddItem(addItem + 1)
}

const previewHabitAnalys = async(e, selectHabit, refType, previewGroup, setPreviewGroup, addItem, setAddItem) => {
    e.preventDefault()
    fetch("http://localhost:3000/loadHabit/", {
        method: 'POST',
        body: JSON.stringify({habitID: selectHabit}),
        headers: {
            'Content-Type': 'application/json'
    }})
    .then((res) => {return res.json()})
        .then((data) => {

            setPreviewGroup({
                type: 'previewHabitAnalys',
                name: '%',
                habitID: selectHabit,
                habits: data.elements,
                ref_type: refType,
                spacingX: 50,
                spacingY: 50,
                left: 0,
                top: 0,
                z_index: 11,
                opacity: 100,
                height: 50,
                text: {
                    width: 100,
                    align: 'center',
                    fontFamily: "Inter",
                    fontCategory: 'sans-serif',
                    fontSize: 30,
                    fontColor: "#000000",
                    fontStyle: "normal",
                    fontWeight: '400',
                    textDecoration: "none",
                    backgroundColor: '#FFFFFF',
                    borderStyle: 'dashed',
                    borderColor: "#FFFFFF",
                    borderWidth: 2,
                    borderRadius: 5,
                    lineHeight: 1.5,
                    letterSpacing: 2,
                    paddingTop: 2,
                    paddingBottom: 2,
                    paddingLeft: 2,
                    paddingRight: 2
                },
                percent: {
                    width: 100,
                    align: 'center',
                    fontFamily: "Inter",
                    fontCategory: 'sans-serif',
                    fontSize: 20,
                    fontColor: "#000000",
                    fontStyle: "normal",
                    fontWeight: '400',
                    textDecoration: "none",
                    backgroundColor: '#FFFFFF',
                    borderStyle: 'dashed',
                    borderColor: "#FFFFFF",
                    borderWidth: 2,
                    borderRadius: 5,
                    lineHeight: 1.5,
                    letterSpacing: 2,
                    paddingTop: 2,
                    paddingBottom: 2,
                    paddingLeft: 2,
                    paddingRight: 2
                }

            })
        
            setAddItem(addItem + 1)
        })
}

const handleAddHabitAnalys = (squares, tempID, temp_type, previewGroup, setSelect, handleUpdateSquares, addItem, setAddItem, setPreviewGroup) => {

    const parentID = Date.now()
    previewGroup.habits.map((habit, index) => {
        squares.push({
            type: 'text',
            id: Date.now() + index*2,
            content: habit,
            tag: [previewGroup.habitID, index, habit],
            //reference: '',
            ref_type: previewGroup.ref_type,
            parentID: parentID,
            ... previewGroup.text,
            left: Number(previewGroup.left),
            top: Number(previewGroup.top) + Number(previewGroup.height*index) + Number(previewGroup.spacingY*index),
            opacity: previewGroup.opacity,
            z_index: previewGroup.z_index,
            height: previewGroup.height
        }, 
        {
            type: 'analys',
            name: previewGroup.name,
            parentType: 'habit_analys',
            id: Date.now() + index*2 + 1,
            tag: [previewGroup.habitID, index, habit],
            //reference: '',
            ref_type: previewGroup.ref_type,
            content: 0,
            parentID: parentID,
            ... previewGroup.percent,
            left: Number(previewGroup.left) + Number(previewGroup.text.width) + Number(previewGroup.spacingX),
            top: Number(previewGroup.top) + Number(previewGroup.height*index) + Number(previewGroup.spacingY*index),
            opacity: previewGroup.opacity,
            z_index: previewGroup.z_index,
            height: previewGroup.height
        })  
        
    })
    
    setSelect('')
    setPreviewGroup('')
    handleUpdateSquares(squares, tempID), 
    setAddItem(addItem + 1)
}

const previewMoodAnalys = async(e, selectMood, refType, previewGroup, setPreviewGroup, addItem, setAddItem) => {
    e.preventDefault()
    fetch("http://localhost:3000/loadMood/", {
        method: 'POST',
        body: JSON.stringify({moodID: selectMood}),
        headers: {
            'Content-Type': 'application/json'
    }})
    .then((res) => {return res.json()})
        .then((data) => {

            setPreviewGroup({
                type: 'previewMoodAnalys',
                name: '%',
                moodID: selectMood,
                moods: data.elements,
                ref_type: refType,
                spacingX: 50,
                spacingY: 50,
                left: 0,
                top: 0,
                z_index: 11,
                opacity: 100,
                icon_width: 50,
                percent: {
                    width: 100,
                    rotate: 0,
                    align: 'center',
                    fontFamily: "Inter",
                    fontCategory: 'sans-serif',
                    fontSize: 20,
                    fontColor: "#000000",
                    fontStyle: "normal",
                    fontWeight: '400',
                    textDecoration: "none",
                    backgroundColor: '#FFFFFF',
                    borderStyle: 'dashed',
                    borderColor: "#FFFFFF",
                    borderWidth: 2,
                    borderRadius: 5,
                    lineHeight: 1.5,
                    letterSpacing: 2,
                    paddingTop: 2,
                    paddingBottom: 2,
                    paddingLeft: 2,
                    paddingRight: 2
                }

            })
        
            setAddItem(addItem + 1)
        })
}

const handleAddMoodAnalys = (squares, tempID, temp_type, previewGroup, setSelect, handleUpdateSquares, addItem, setAddItem, setPreviewGroup) => {

    const parentID = Date.now()
    previewGroup.moods.map((mood, index) => {
        squares.push({
            type: 'fixed_icon',
            id: Date.now() + index*2,
            tag: [previewGroup.moodID, index + 1, mood[0]],
            source: mood[1],
            //reference: '',
            ref_type: previewGroup.ref_type,
            parentID: parentID,
            icon_width: previewGroup.icon_width,
            left: Number(previewGroup.left),
            top: Number(previewGroup.top) + Number(previewGroup.icon_width*index) + Number(previewGroup.spacingY*index),
            opacity: previewGroup.opacity,
            rotate: 0,
            z_index: previewGroup.z_index
        }, 
        {
            type: 'analys',
            name: previewGroup.name,
            parentType: 'mood_analys',
            id: Date.now() + index*2 + 1,
            tag: [previewGroup.moodID, index + 1, mood[0]],
            //reference: '',
            ref_type: previewGroup.ref_type,
            content: 0,
            parentID: parentID,
            ... previewGroup.percent,
            left: Number(previewGroup.left) + Number(previewGroup.icon_width) + Number(previewGroup.spacingX),
            top: Number(previewGroup.top) + Number(previewGroup.icon_width*index) + Number(previewGroup.spacingY*index),
            opacity: previewGroup.opacity,
            z_index: previewGroup.z_index,
            height: previewGroup.icon_width
        })  
        
    })
    
    setSelect('')
    setPreviewGroup('')
    handleUpdateSquares(squares, tempID), 
    setAddItem(addItem + 1)
}

const handleAddCalendar = (tempID, squares, handleUpdateSquares, addItem, setAddItem) => {
    var order = 1
    var day = 'Monday'
    squares.map((square, index) => {
        if(square.type == "calendar"){
            if(square.order >= order){
                order = Number(square.order) + 1
                if(order%7== 2){
                    day = 'Tuesday'
                } else if(order%7== 3){
                    day = 'Wednesday'
                } else if(order%7== 4){
                    day = 'Thursday'
                } else if(order%7== 5){
                    day = 'Friday'
                } else if(order%7== 6){
                    day = 'Saturday'
                } else if(order%7== 0){
                    day = 'Sunday'
                }
            }
        }
    })
    
    squares.push({
        type: 'calendar',
        id: Date.now(),
        order: order,
        day: day,
        width: 300,
        height: 300,
        left: 0,
        top: 0,
        z_index: 11,
        rotate: 0,
        opacity: 100,
        backgroundColor: '#FFFFFF',
        borderStyle: 'solid',
        borderColor: "#000000",
        borderWidth: 2,
        borderRadius: 5,
        date_format: {
            height: 50,
            align: 'left',
            fontFamily: "Times New Roman",
            fontCategory: 'serif',
            fontSize: 20,
            fontColor: "#000000",
            fontStyle: "normal",
            fontWeight: '400',
            textDecoration: "none",
            content: '##',
            lineHeight: 1.5,
            letterSpacing: 2,
            paddingTop: 2,
            paddingBottom: 2,
            paddingLeft: 2,
            paddingRight: 2
        },
        entry: {
            align: 'left',
            fontFamily: "Times New Roman",
            fontCategory: 'serif',
            fontSize: 20,
            fontColor: "#000000",
            fontStyle: "normal",
            fontWeight: '400',
            textDecoration: "none",
            content: 'Content will appear here',
            lineHeight: 1.5,
            letterSpacing: 2,
            paddingTop: 2,
            paddingBottom: 2,
            paddingLeft: 2,
            paddingRight: 2
        }
    }), 

    handleUpdateSquares(squares, tempID), 
    setAddItem(addItem + 1)
}


const Add = ({userID, tempID, temp_type, newComp, squares, previewGroup, setPreviewGroup, addItem, setAddItem, setSelect, handleUpdateSquares}) => {
    var [file, setFile] = useState('')
    var [iconTick, setIconTick] = useState('')
    var [iconUntick, setIconUntick] = useState('')
    var [addBtn, setAddBtn] = useState('')
    var [deleteBtn, setDeleteBtn] = useState('')
    var [selectHabit, setSelectHabit] = useState('')
    var [yearHabits, setYearHabits] = useState('')
    var [selectYearHabit, setSelectYearHabit] = useState('')
    var [todoType, setTodoType] = useState('goal')
    const [habits, setHabits] = useState([])
    const [moods, setMoods] = useState([])
    var [selectMood, setSelectMood] = useState('')
    var [moodType, setMoodType] = useState('')
    var [refType, setRefType] = useState('')

    useEffect(() => {
        fetch("http://localhost:3000/loadHabitLists/", {
            method: 'POST',
            body: JSON.stringify({userID: userID}),
            headers: {
                'Content-Type': 'application/json'
        }})
            .then((res) => {return res.json()})
            .then((data) => {
                setHabits(data)
            })

        fetch("http://localhost:3000/loadMoodLists/", {
            method: 'POST',
            body: JSON.stringify({userID: userID}),
            headers: {
                'Content-Type': 'application/json'
        }})
            .then((res) => {return res.json()})
            .then((data) => {
                setMoods(data)
            })

    }, [])

    useEffect(() => {
        if(temp_type == 'monthly'){
            setMoodType('monthly')
        }
        if(temp_type == 'yearly'){
            setMoodType('yearly')
        }

    }, [temp_type])


    useEffect(() => {
        if(selectHabit != ''){
            fetch("http://localhost:3000/loadHabit/", {
                method: 'POST',
                body: JSON.stringify({habitID: selectHabit}),
                headers: {
                    'Content-Type': 'application/json'
            }})
                .then((res) => {return res.json()})
                .then((data) => {
                    setYearHabits(data.elements)
                })
        }

    }, [selectHabit])

    return(
        <div className="add-canvas">
            {newComp=="shapes" &&
            <div> <h2 className="add-edit_title"> Shapes </h2>
                <div style={{display: 'flex', flexWrap: 'wrap', gap: '50px'}}>
                    <div className="add-shape" onClick={(e) => {handleAddShape(tempID, squares, 'rectangle', handleUpdateSquares, addItem, setAddItem)}}
                        style={{width: '150px', 
                            height: '150px', 
                            top: '5px', 
                            left: '5px',
                            backgroundColor: '#5756BB',
                            position: "relative"}}>
                    </div>
                    <div className="add-shape" onClick={(e) => {handleAddShape(tempID, squares, 'triangle', handleUpdateSquares, addItem, setAddItem)}}
                        style={{width: '0',
                            height: '0',
                            borderLeft: '75px solid transparent',
                            borderRight: '75px solid transparent',
                            borderBottom: '150px solid #5756BB',
                            position: "relative"}}>
                    </div>
                    <div className="add-shape" onClick={(e) => {handleAddShape(tempID, squares, 'circle', handleUpdateSquares, addItem, setAddItem)}}
                        style={{width: '150px', 
                            height: '150px', 
                            top: '5px', 
                            left: '5px',
                            backgroundColor: '#5756BB',
                            borderRadius: '50%',
                            position: "relative"}}>
                    </div>
                    <div className="add-shape" onClick={(e) => {handleAddShape(tempID, squares, 'parallelogram', handleUpdateSquares, addItem, setAddItem)}}
                        style={{
                            width: '150px', 
                            height: '150px',
                            backgroundColor: '#5756BB',
                            position: "relative",
                            transform: 'skew(10deg)'}}>
                    </div>
                    <div className="add-shape" onClick={(e) => {handleAddShape(tempID, squares, 'line', handleUpdateSquares, addItem, setAddItem)}}
                        style={{width: '175px', 
                            height: '0px', 
                            top: '75px', 
                            left: '5px',
                            borderBottom: '3px solid #5756BB',
                            backgroundColor: 'transparent',
                            transform: 'rotate(45deg)',
                            position: "relative"}}>
                    </div>
                </div>
            </div>
            }
            {newComp=="text" &&
            <div> <h2 className="add-edit_title"> Text </h2>
                <div>
                    <button onClick={(e) => {handleAddText(tempID, squares, handleUpdateSquares, addItem, setAddItem)}}>Add Text</button>
                </div>
            </div>
            }
            {newComp=="image" &&
            <div> <h2 className="add-edit_title"> Image </h2>
                <div>
                    <form onSubmit={(e) => {handleAddImage(e, file, squares, tempID, addItem, setAddItem, handleUpdateSquares)}} encType="multipart/form-data">
                        <input className="file-upload" onChange={(e) => {setFile(e.target.files[0])}} type="file" name="image" accept="image/*" />
                        <button type="submit">Add Image</button>
                    </form>
                </div>
            </div>
            }
            {newComp=="grid" &&
            <div> <h2 className="add-edit_title"> Grid </h2>
                <div style={{display: 'flex', flexWrap: 'wrap'}}>
                    <FontAwesomeIcon icon={faTable} style={{marginLeft: '40px', fontSize: '80px'}}/>
                    <FontAwesomeIcon icon={faTableCellsLarge} style={{marginLeft: '120px', fontSize: '80px'}}/>
                    <button style={{marginTop: '20px', fontSize: '18px'}} onClick={(e) => {handleAddGridFixed(tempID, squares, handleUpdateSquares, addItem, setAddItem)}}> Fixed Content </button>
                    <button style={{marginTop: '20px', marginLeft:'32px', fontSize: '18px'}} onClick={(e) => {handleAddGridInput(tempID, squares, handleUpdateSquares, addItem, setAddItem)}}> Input Content </button>
                </div>
            </div>
            }
            {newComp=="date" &&
            <div> <h2 className="add-edit_title"> Automatic Date </h2>
                <div>
                    <button onClick={(e) => {handleAddDate(tempID, temp_type, squares, handleUpdateSquares, addItem, setAddItem)}}>Add Automatic Date</button>
                </div>
            </div>
            }
            {newComp=="diary" &&
            <div> <h2 className="add-edit_title"> Diary </h2>
                <div>
                    <button onClick={(e) => {handleAddDiary(tempID, squares, handleUpdateSquares, addItem, setAddItem)}}>Add Diary Input</button>
                </div>
            </div>
            }

            {newComp=="todo" &&
                <div className="add_initialize"> <h2 className="add-edit_title"> Todo List </h2>
                    <form onSubmit={(e) => {previewTodo(e, iconTick, iconUntick, addBtn, deleteBtn, previewGroup, setPreviewGroup, addItem, setAddItem)}}>

                        Add button
                        <input required className="file-upload" onChange={(e) => {setAddBtn(e.target.files[0])}} type="file" name="image" accept="image/*" />
                        
                        Delete button
                        <input required className="file-upload" onChange={(e) => {setDeleteBtn(e.target.files[0])}} type="file" name="image" accept="image/*" />

                        Finished icon
                        <input required className="file-upload" onChange={(e) => {setIconTick(e.target.files[0])}} type="file" name="image" accept="image/*" />

                        Todo icon
                        <input required className="file-upload" onChange={(e) => {setIconUntick(e.target.files[0])}} type="file" name="image" accept="image/*" /> <br/> <br/>

                        <button type="submit">Preview</button>
                    </form>
                    <br/>
                    <button onClick={(e) => {if(previewGroup==''){alert("Preview component group first!")}else{createTodo(squares, tempID, temp_type, previewGroup, handleUpdateSquares, addItem, setAddItem, setPreviewGroup)}}}>Create</button> <br/><br/>

                    <button style={{backgroundColor: "#8572C1"}} onClick={(e) => {setPreviewGroup('')}}>Cancel</button> <br/><br/>
                </div>
            }

            {newComp=="habit-track" &&
                <div className="add_initialize"> <h2 className="add-edit_title"> Habit Tracker </h2>
                    {(temp_type != 'yearly') &&
                    <form onSubmit={(e) => {previewHabitTracker(e, selectHabit, iconTick, iconUntick, previewGroup, setPreviewGroup, addItem, setAddItem)}}>
                        Habit List
                        <br/>
                        <select required className="select_add" value={selectHabit} onChange={(e) => {setSelectHabit(e.target.value)}}>
                            <option value=''></option>
                            {habits.map((habit, index) => {
                                if(habit.lock == true){
                                    return(
                                        <option key={index} value={habit._id}>{habit.title}</option>
                                    )
                                }
                            })}
                        </select> <br/>

                        Finished icon
                        <input required className="file-upload" onChange={(e) => {setIconTick(e.target.files[0])}} type="file" name="image" accept="image/*" />

                        Todo icon
                        <input required className="file-upload" onChange={(e) => {setIconUntick(e.target.files[0])}} type="file" name="image" accept="image/*" /> <br/> <br/>

                        <button type="submit">Preview</button>
                    </form>
                    }
                    {(temp_type == 'yearly') &&
                    <form onSubmit={(e) => {previewHabitYear(e, selectHabit, selectYearHabit, iconTick, iconUntick, previewGroup, setPreviewGroup, addItem, setAddItem)}}>
                        Habit List
                        <br/>
                        <select required className="select_add" value={selectHabit} onChange={(e) => {setSelectHabit(e.target.value)}}>
                            <option value=''></option>
                            {habits.map((habit, index) => {
                                if(habit.lock == true){
                                    return(
                                        <option key={index} value={habit._id}>{habit.title}</option>
                                    )
                                }
                            })}
                        </select> <br/>
                        
                        Habit <br />
                        <select required className="select_add" value={selectYearHabit} onChange={(e) => {setSelectYearHabit(e.target.value)}}>
                            <option value=''></option>
                            {(yearHabits != '') && yearHabits.map((habit, index) => {
                                return(
                                    <option key={index} value={[index, habit]}>{habit}</option>
                                )
                            })}
                        </select> <br/>

                        Finished icon
                        <input required className="file-upload" onChange={(e) => {setIconTick(e.target.files[0])}} type="file" name="image" accept="image/*" />

                        Todo icon
                        <input required className="file-upload" onChange={(e) => {setIconUntick(e.target.files[0])}} type="file" name="image" accept="image/*" /> <br/> <br/>

                        <button type="submit">Preview</button>
                    </form>
                    }
                    <br/>
                    <button onClick={(e) => {if(previewGroup==''){alert("Preview component group first!")}else{createHabitTracker(squares, tempID, temp_type, previewGroup, handleUpdateSquares, addItem, setAddItem, setPreviewGroup)}}}>Create</button> <br/><br/>

                    <button style={{backgroundColor: "#8572C1"}} onClick={(e) => {setPreviewGroup('')}}>Cancel</button> <br/><br/>
                </div>
            }

            {newComp=="mood-track" &&
                <div className="add_initialize"> <h2 className="add-edit_title"> {temp_type == 'yearly' ? `A Year in Pixels Mood Tracker` : 'Mood Tracker'}  </h2>
                    <form onSubmit={(e) => {previewMoodTracker(e, selectMood, moodType, previewGroup, setPreviewGroup, addItem, setAddItem)}}>
                        Mood List
                        <br/>
                        <select required className="select_add" value={selectMood} onChange={(e) => {setSelectMood(e.target.value)}}>
                            <option value=''></option>
                            {moods.map((mood, index) => {
                                if(mood.lock == true){
                                    return(
                                        <option key={index} value={mood._id}>{mood.title}</option>
                                    )
                                }
                            })}
                        </select> <br/>
                        {(temp_type == "daily" || temp_type == 'weekly') &&
                        <div>
                            Tracker Type
                            <br/>
                            <select required className="select_add" value={moodType} onChange={(e) => {setMoodType(e.target.value)}}>
                                <option value=''></option>
                                <option value='dropdown'>Dropdown</option>
                                <option value='multiple'>Multiple Choice</option>
                            </select>
                            <br />
                        </div>
                        }
                        <br />
                        <button type="submit">Preview</button>
                    </form>
                    <br/>
                    <button onClick={(e) => {if(previewGroup==''){alert("Preview component group first!")}else{createMoodTracker(squares, tempID, temp_type, previewGroup, handleUpdateSquares, addItem, setAddItem, setPreviewGroup)}}}>Create</button> <br/><br/>

                    <button style={{backgroundColor: "#8572C1"}} onClick={(e) => {setPreviewGroup('')}}>Cancel</button> <br/><br/>
                </div>
            }

            {newComp=="task-analys" &&
            <div className="add_initialize"> <h2 className="add-edit_title"> Task Analytics </h2>
                <form onSubmit={(e) => {if(refType != ''){handleAddTaskAnalys(e, tempID, refType, squares, handleUpdateSquares, addItem, setAddItem)}; setRefType('')}}>
                    Source template type
                    <br/>
                    <select required className="select_add" value={refType} onChange={(e) => {setRefType(e.target.value)}}>
                        <option value=''></option>
                        <option value='daily'> Daily </option>
                        <option value='weekly'> Weekly </option>
                        <option value='monthly'> Monthly </option>
                        <option value='yearly'> Yearly </option>
                    </select> <br/>
                    <button type="submit">Add Task Analytics</button>
                </form>
            </div>
            }

            {newComp=="mood-analys" &&
                <div className="add_initialize"> <h2 className="add-edit_title"> Mood Analytics </h2>
                    <form onSubmit={(e) => {previewMoodAnalys(e, selectMood, refType, previewGroup, setPreviewGroup, addItem, setAddItem)}}>
                        Mood List
                        <br/>
                        <select required className="select_add" value={selectMood} onChange={(e) => {setSelectMood(e.target.value)}}>
                            <option value=''></option>
                            {moods.map((mood, index) => {
                                if(mood.lock == true){
                                    return(
                                        <option key={index} value={mood._id}>{mood.title}</option>
                                    )
                                }
                            })}
                        </select> <br/>
                        Source template type
                        <br/>
                        <select required className="select_add" value={refType} onChange={(e) => {setRefType(e.target.value)}}>
                            <option value=''></option>
                            <option value='daily'> Daily </option>
                            <option value='weekly'> Weekly </option>
                            <option value='monthly'> Monthly </option>
                            <option value='yearly'> Yearly </option>
                        </select> <br/>
                        <button type="submit">Preview</button>
                    </form>
                    <br/>
                    <button onClick={(e) => {if(previewGroup==''){alert("Preview component group first!")}else{handleAddMoodAnalys(squares, tempID, temp_type, previewGroup, setSelect, handleUpdateSquares, addItem, setAddItem, setPreviewGroup)}}}>Create</button> <br/><br/>

                    <button style={{backgroundColor: "#8572C1"}} onClick={(e) => {setPreviewGroup(''), setSelect('')}}>Cancel</button> <br/><br/>
                </div>
            }

            {newComp=="habit-analys" &&
                <div className="add_initialize"> <h2 className="add-edit_title"> Habit Analytics </h2>
                    <form onSubmit={(e) => {previewHabitAnalys(e, selectHabit, refType, previewGroup, setPreviewGroup, addItem, setAddItem)}}>
                        Habit List
                        <br/>
                        <select required className="select_add" value={selectHabit} onChange={(e) => {setSelectHabit(e.target.value)}}>
                            <option value=''></option>
                            {habits.map((habit, index) => {
                                if(habit.lock == true){
                                    return(
                                        <option key={index} value={habit._id}>{habit.title}</option>
                                    )
                                }
                            })}
                        </select> <br/>
                        Source template type
                        <br/>
                        <select required className="select_add" value={refType} onChange={(e) => {setRefType(e.target.value)}}>
                            <option value=''></option>
                            <option value='daily'> Daily </option>
                            <option value='weekly'> Weekly </option>
                            <option value='monthly'> Monthly </option>
                            <option value='yearly'> Yearly </option>
                        </select> <br/>
                        <button type="submit">Preview</button>
                    </form>
                    <br/>
                    <button onClick={(e) => {if(previewGroup==''){alert("Preview component group first!")}else{handleAddHabitAnalys(squares, tempID, temp_type, previewGroup, setSelect, handleUpdateSquares, addItem, setAddItem, setPreviewGroup)}}}>Create</button> <br/><br/>

                    <button style={{backgroundColor: "#8572C1"}} onClick={(e) => {setPreviewGroup(''), setSelect('')}}>Cancel</button> <br/><br/>
                </div>
            }

            {newComp=="calendar" &&
            <div> <h2 className="add-edit_title"> Calendar </h2>
                <div>
                    <button onClick={(e) => {handleAddCalendar(tempID, squares, handleUpdateSquares, addItem, setAddItem)}}>Add Day</button>
                </div>
            </div>
            }
        </div>
    )
}

export default Add