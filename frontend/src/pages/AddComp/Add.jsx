import { useState, useEffect } from "react";

const handleAddShape = (tempID, squares, shape, handleUpdateSquares, addItem, setAddItem) => {
    console.log('add shape')
    if(shape === "rectangle"){
        squares.push({
            type: 'shape',
            name: 'rectangle',
            id: Date.now(),
            width: 50,
            height: 50,
            top: 0,
            left: 0,
            z_index: 12,
            rotate: '',
            opacity: 1,
            backgroundColor: 'red',
            borderStyle: 'dashed',
            borderColor: "black",
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
            top: 0,
            left: 0,
            z_index: 11,
            rotate: 'rotate(20deg)',
            opacity: 1,
            backgroundColor: 'red'
        })
    } else if (shape === "circle"){
        squares.push({
            type: 'shape',
            name: 'circle',
            id: Date.now(),
            width: 50,
            height: 50,
            top: 0,
            left: 0,
            z_index: 11,
            rotate: 'rotate(0deg)',
            opacity: 1,
            backgroundColor: 'red',
            borderStyle: 'dashed',
            borderColor: "black",
            borderWidth: 2,
            borderRadius: '50%'
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
            z_index: '12',
            rotate: 'rotate(30deg)',
            opacity: 1,
            borderStyle: 'solid',
            borderColor: 'blue',
            borderWidth: 3,
            borderRadius: 8
        })
        handleUpdateSquares(squares, tempID)
        setAddItem(addItem+1)
    })
}

const handleAddGrid = (tempID, squares, handleUpdateSquares, addItem, setAddItem) => {
    squares.push({
        type: 'grid',
        id: Date.now(),
        width: 80,
        height: 20,
        left: 0,
        top: 0,
        z_index: 11,
        opacity: 1,
        textAlign: "right",
        fontFamily: "Lucida Console, Courier New, monospace",
        fontSize: 30,
        fontColor: "red",
        fontStyle: "normal",
        fontWeight: 'bold',
        textDecoration: "none",
        backgroundColor: 'orange',
        borderStyle: 'dashed',
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 5,
        rows: 3,
        columns: 2,
        spacing: 5,
        content: [['A','B'],['C','D'], ['E', 'F']]
    }), 
    handleUpdateSquares(squares, tempID), 
    setAddItem(addItem + 1)
}

const handleAddText = (tempID, squares, handleUpdateSquares, addItem, setAddItem) => {
    squares.push({
        type: 'text',
        id: Date.now(),
        width: 100,
        height: 30,
        left: 0,
        top: 0,
        z_index: 11,
        rotate: '',
        opacity: 1,
        fontFamily: "Lucida Console, Courier New, monospace",
        fontSize: 30,
        fontColor: "red",
        fontStyle: "normal",
        fontWeight: 'bold',
        textDecoration: "none",
        backgroundColor: 'orange',
        borderStyle: 'dashed',
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 5,
        content: 'Text Here'
    }), 

    handleUpdateSquares(squares, tempID), 
    setAddItem(addItem + 1)
}

const handleAddHabitTracker = async(e, selectHabit, iconTick, iconUntick, addGroup, setAddGroup, addItem, setAddItem) => {
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
            habits = data

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

                    setAddGroup({
                        type: 'habit_initialize',
                        habitID: selectHabit,
                        overall_width: 200,
                        overall_height: 400,
                        width: 100,
                        height: 100,
                        left: 0,
                        top: 0,
                        opacity: 1,
                        fontFamily: "Lucida Console, Courier New, monospace",
                        fontSize: 30,
                        fontColor: "red",
                        fontStyle: "normal",
                        fontWeight: 'bold',
                        textDecoration: "none",
                        backgroundColor: 'orange',
                        borderStyle: 'dashed',
                        borderColor: "black",
                        borderWidth: 2,
                        borderRadius: 5,
                        icon_tick: tick_url,
                        icon_untick: untick_url,
                        icon_width: 50,
                        habits: habits
                    })
                    //setAddGroup(addGroup)
                    setAddItem(addItem + 1)
                })
            })
        })
}

const handleCreateDailyTracker = (squares, tempID, addGroup, handleUpdateSquares, addItem, setAddItem, setAddGroup) => {
    addGroup.habits.map((habit, index) => {
        squares.push({
            type: 'habit',
            id: Date.now() + index,
            content: habit,
            width: addGroup.width,
            height: addGroup.height,
            left: addGroup.left,
            top: addGroup.top + (addGroup.height*index + ((addGroup.overall_height - addGroup.height*addGroup.habits.length)/(addGroup.habits.length-1))*(index)),
            z_index: 15,
            rotate: '',
            opacity: 1,
            fontFamily: addGroup.fontFamily,
            fontSize: addGroup.fontSize,
            fontColor: addGroup.fontColor,
            fontStyle: addGroup.fontStyle,
            fontWeight: addGroup.fontWeight,
            textDecoration: addGroup.textDecoration,
            backgroundColor: addGroup.backgroundColor,
            borderStyle: addGroup.borderStyle,
            borderColor: addGroup.borderColor,
            borderWidth: addGroup.borderWidth,
            borderRadius: addGroup.borderRadius,
        }, 
        {
            type: 'icon',
            id: Date.now() + index + 100,
            title: habit,
            order: index,
            width: addGroup.icon_width,
            height: addGroup.icon_width,
            left: addGroup.left + addGroup.overall_width - addGroup.icon_width,
            top: addGroup.top + (addGroup.height*index + ((addGroup.overall_height - addGroup.height*addGroup.habits.length)/(addGroup.habits.length-1))*(index)),
            z_index: 15,
            rotate: '',
            opacity: 1,
            icon_tick: addGroup.icon_tick,
            icon_untick: addGroup.icon_untick,
            status: false
        })
    })
    setAddGroup('')
    handleUpdateSquares(squares, tempID), 
    setAddItem(addItem + 1)
}


const Add = ({userID, tempID, temp_type, squares, addGroup, setAddGroup, addItem, setAddItem, handleUpdateSquares}) => {
    var [file, setFile] = useState('')
    var [iconTick, setIconTick] = useState('')
    var [iconUntick, setIconUntick] = useState('')
    var [selectHabit, setSelectHabit] = useState('')
    var [shape, setShape] = useState(null)
    const [habits, setHabits] = useState([])

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
    }, [])

    return(
        <div className="add-canvas">
                <button onClick={() => {setShape('rectangle')}}>Rectangle</button>
                <button onClick={() => {setShape('triangle')}}>Triangle</button>
                <button onClick={() => {setShape('circle')}}>Circle</button>
                <button onClick={(e) => {if(shape){handleAddShape(tempID, squares, shape, handleUpdateSquares, addItem, setAddItem)}}}>Add Shape</button>

                <form onSubmit={(e) => {handleAddImage(e, file, squares, tempID, addItem, setAddItem, handleUpdateSquares)}} encType="multipart/form-data">
                    <input onChange={(e) => {setFile(e.target.files[0])}} type="file" name="image" accept="image/*" />
                    <button type="submit">Submit</button>
                </form>

                <div onClick={(e) => {handleAddGrid(tempID, squares, handleUpdateSquares, addItem, setAddItem)}}>Add Grid</div>
                <div onClick={(e) => {handleAddText(tempID, squares, handleUpdateSquares, addItem, setAddItem)}}>Add Text</div>

                {(temp_type === "daily") &&
                    <div> <h2> Habit Tracker </h2>
                        <form onSubmit={(e) => {handleAddHabitTracker(e, selectHabit, iconTick, iconUntick, addGroup, setAddGroup, addItem, setAddItem)}}>
                            <select value={selectHabit} onChange={(e) => {setSelectHabit(e.target.value)}}>
                                {habits.map((habit, index) => {
                                return(
                                <option key={index} value={habit._id}>{habit.title}</option>
                                )})}
                            </select>

                            Icon ticked
                            <input onChange={(e) => {setIconTick(e.target.files[0])}} type="file" name="image" accept="image/*" />

                            Icon unticked
                            <input onChange={(e) => {setIconUntick(e.target.files[0])}} type="file" name="image" accept="image/*" />

                            <button type="submit">Add Daily Habit Tracker</button>
                        </form>

                        <button onClick={(e) => {handleCreateDailyTracker(squares, tempID, addGroup, handleUpdateSquares, addItem, setAddItem, setAddGroup)}}>Create Daily Habit Tracker</button>
                    </div>
                }
        </div>
    )
}

export default Add