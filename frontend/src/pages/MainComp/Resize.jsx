import React from "react"

const Resize = ({select, handleUpdateSquares, squares, x_start, y_start, tempID, changeProp, setChangeProp}) => {
    return (
        <div style={{width: '100%', height: '100%', top:'0px', left: '0px', position: 'absolute'}}>
                                        <div draggable = "true" className="resize nwse-resize" style={{position: 'absolute', top: '0px', left: '0px'}}
                                            onDragStart={(e) => { x_start = e.pageX, y_start = e.pageY}}
                                            onDragEnd={(e) => {
                                                if((select.type==="image") || (select.type==="icon")){
                                                    select.height = select.height/select.width*(Number(select.width) - e.pageX + x_start)
                                                } else {
                                                    select.height = Number(select.height) - e.pageY + y_start
                                                }
                                                select.width = Number(select.width) - e.pageX + x_start
                                                setChangeProp(changeProp + 1)
                                                handleUpdateSquares(squares, tempID)}}></div>

                                        {((select.type!=="image") && (select.type!=="icon")) &&
                                            <div draggable = "true" className="resize ns-resize" style={{position: 'absolute', top: '0px', right: '50%'}}
                                            onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                                            onDragEnd={(e) => {
                                                select.left = select.left - e.pageX + x_start,
                                                select.height = Number(select.height) - e.pageY + y_start,
                                                setChangeProp(changeProp + 1),
                                                handleUpdateSquares(squares, tempID)}}></div>
                                        }
                                        
                                        <div draggable = "true" className="resize nesw-resize" style={{position: 'absolute', top: '0px', right: '0px'}}
                                            onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                                            onDragEnd={(e) => {
                                                select.left = select.left - e.pageX + x_start
                                                if((select.type==="image") || (select.type==="icon")){
                                                    select.height = select.height/select.width*(Number(select.width) + e.pageX - x_start)
                                                } else {
                                                    select.height = Number(select.height) - e.pageY + y_start
                                                }
                                                select.width = Number(select.width) + e.pageX - x_start
                                                setChangeProp(changeProp + 1)
                                                handleUpdateSquares(squares, tempID)}}></div>

                                        {((select.type!=="image") && (select.type!=="icon")) &&
                                            <div draggable = "true" className="resize ew-resize" style={{position: 'absolute', top: '50%', left: '0px'}}
                                                onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                                                onDragEnd={(e) => {
                                                    select.top = select.top - e.pageY + y_start,
                                                    select.width = Number(select.width) - e.pageX + x_start,
                                                    setChangeProp(changeProp + 1),
                                                    handleUpdateSquares(squares, tempID)}}></div>
                                        }
                                        {((select.type!=="image") && (select.type!=="icon")) &&
                                            <div draggable = "true" className="resize ew-resize" style={{position: 'absolute', top: '50%', right: '0px'}}
                                                onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                                                onDragEnd={(e) => {
                                                    select.top = select.top - e.pageY + y_start,
                                                    select.left = select.left - e.pageX + x_start,
                                                    select.width = Number(select.width) + e.pageX - x_start,
                                                    setChangeProp(changeProp + 1),
                                                    handleUpdateSquares(squares, tempID)}}></div>
                                        }
                                        
                                        <div draggable = "true" className="resize nesw-resize" style={{position: 'absolute', bottom: '0px', left: '0px'}}
                                            onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                                            onDragEnd={(e) => {
                                                select.top = select.top - e.pageY + y_start
                                                if((select.type==="image") || (select.type==="icon")){
                                                    select.height = select.height/select.width*(Number(select.width) - e.pageX + x_start)
                                                } else {
                                                    select.height = Number(select.height) + e.pageY - y_start
                                                }
                                                select.width = Number(select.width) - e.pageX + x_start
                                                setChangeProp(changeProp + 1)
                                                handleUpdateSquares(squares, tempID)}}></div>

                                        {((select.type!=="image") && (select.type!=="icon")) &&
                                            <div draggable = "true" className="resize ns-resize" style={{position: 'absolute', bottom: '0px', right: '50%'}}
                                                onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                                                onDragEnd={(e) => {
                                                    select.left = select.left - e.pageX + x_start,
                                                    select.top = select.top - e.pageY + y_start,
                                                    select.height = Number(select.height) + e.pageY - y_start,
                                                    setChangeProp(changeProp + 1),
                                                    handleUpdateSquares(squares, tempID)}}></div>
                                        }

                                        <div draggable = "true" className="resize nwse-resize" style={{position: 'absolute', bottom: '0px', right: '0px'}}
                                            onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                                            onDragEnd={(e) => {
                                                select.left = select.left - e.pageX + x_start
                                                select.top = select.top - e.pageY + y_start
                                                if((select.type==="image") || (select.type==="icon")){
                                                    select.height = select.height/select.width*(Number(select.width) + e.pageX - x_start)
                                                } else {
                                                    select.height = Number(select.height) + e.pageY - y_start
                                                }
                                                select.width = Number(select.width) + e.pageX - x_start,
                                                setChangeProp(changeProp + 1),
                                                handleUpdateSquares(squares, tempID)}}></div>
                                    </div>
    )
}

export default Resize