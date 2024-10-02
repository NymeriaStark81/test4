import React from 'react'


const EditImage = ({select, cropProp, setShowCrop, changeProp, changePropInput, setChangePropInput, handleUpdateSquares, squares, id}) => {
    return(
        <div key={[changeProp]}>
            <h1> Edit </h1>
            <label>
                Width: <input type="number" onChange={(e) => { select.height = Number(select.height)/Number(select.width)*Number(e.target.value), select.width = e.target.value, handleUpdateSquares(squares, id), setChangePropInput(changePropInput+1)}} defaultValue={select.width}/>
            </label>
            <label>
                Height: <input type="number" onChange={(e) => { select.width = Number(select.width)/Number(select.height)*Number(e.target.value), select.height = e.target.value, handleUpdateSquares(squares, id), setChangePropInput(changePropInput+1)}} defaultValue={select.height}/>
            </label>
            <label>
                Position X: <input type="number" onChange={(e) => { select.left = e.target.value, handleUpdateSquares(squares, id), setChangePropInput(changePropInput+1)}} defaultValue={select.left}/>
            </label>
            <label>
                Position Y: <input type="number" onChange={(e) => { select.top = e.target.value, handleUpdateSquares(squares, id), setChangePropInput(changePropInput+1)}} defaultValue={select.top}/>
            </label>
            <button onClick={() => {setShowCrop(true), cropProp.height = select.height, cropProp.width = select.width}}>Crop</button>
        </div>
    )
}

export default EditImage