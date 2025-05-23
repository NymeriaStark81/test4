import React from "react"

const ResizeLine = ({select, handleUpdateSquares, squares, x_start, y_start, tempID, changeProp, setChangeProp}) => {
    return (
        <div style={{width: '100%', height: '100%', top:'0px', left: '0px', position: 'absolute'}}>
                                            <div draggable = "true" className="resize ew-resize" style={{position: 'absolute', top: '50%', left: '0px'}}
                                                onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                                                onDragEnd={(e) => {
                                                    select.top = select.top - e.pageY + y_start;
                                                    select.width = Number(select.width) - e.pageX + x_start;
                                                    if(select.width < 0) {select.width = 0};
                                                    setChangeProp(changeProp + 1);
                                                    handleUpdateSquares(squares, tempID)}}></div>
                                            <div draggable = "true" className="resize ew-resize" style={{position: 'absolute', top: '50%', right: '0px'}}
                                                onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                                                onDragEnd={(e) => {
                                                    select.top = select.top - e.pageY + y_start;
                                                    select.left = select.left - e.pageX + x_start;
                                                    select.width = Number(select.width) + e.pageX - x_start;
                                                    if(select.width < 0) {select.width = 0};
                                                    setChangeProp(changeProp + 1);
                                                    handleUpdateSquares(squares, tempID)}}></div>
                                        
        </div>
    )
}

export default ResizeLine