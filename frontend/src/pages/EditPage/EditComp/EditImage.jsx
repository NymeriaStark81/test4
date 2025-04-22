import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquareCaretUp, faSquareCaretDown } from "@fortawesome/free-regular-svg-icons"


const EditImage = ({select, cropProp, setShowCrop, changeProp, changePropInput, setChangePropInput, handleUpdateSquares, squares, tempID, position, borderComp, ZIndex, rotate, opacity}) => {
    const [changePropWidth, setChangePropWidth] = useState(0)
    const [changePropHeight, setChangePropHeight] = useState(0)
    
    return(
        <div key={[changeProp]}>
                <h2 className="add-edit_title"> Edit Component </h2>
                {position(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                <br />
                <label key={[changePropHeight + 'height']}>
                    Width <div> px </div> <input className='edit-number-input' type="number" onChange={(e) => { if(e.target.value == ''){select.width = 0} else {select.width = e.target.value, select.height = Number(select.width)/Number(select.original_width)*Number(select.original_height)} handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1), setChangePropWidth(changePropWidth+1)}} defaultValue={select.width}/>
                </label> <br />
                <label key={[changePropWidth + 'width']}>
                    Height <div> px </div> <input className='edit-number-input' type="number" onChange={(e) => { if(e.target.value == ''){select.height = 0} else {select.height = e.target.value, select.width = Number(select.height)/Number(select.original_height)*Number(select.original_width)} handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1), setChangePropHeight(changePropHeight+1)}} defaultValue={select.height}/>
                </label> <br /><br />
                {ZIndex(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                {rotate(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                {opacity(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                <br />
                {borderComp(select, handleUpdateSquares, squares, tempID, setChangePropInput, changePropInput)}
                <br />
                <button className="add-comp-btn" onClick={() => {setShowCrop(select.id), cropProp.height = select.height, cropProp.width = select.width}}>Crop</button>
        </div>
    )
}

export default EditImage