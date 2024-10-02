import React from "react"

const ResizeInitial = ({select, x_start, y_start, changeProp, setChangeProp}) => {
    return (
        <div style={{width: '100%', height: '100%', top:'0px', left: '0px', position: 'absolute'}}>
                                        <div draggable = "true" className="resize nwse-resize" style={{position: 'absolute', top: '0px', left: '0px'}}
                                            onDragStart={(e) => { x_start = e.pageX, y_start = e.pageY}}
                                            onDragEnd={(e) => {
                                                if(select.type === "image"){
                                                    select.overall_height = select.overall_height/select.overall_width*(Number(select.overall_width) - e.pageX + x_start)
                                                } else {
                                                    select.overall_height = Number(select.overall_height) - e.pageY + y_start
                                                }
                                                select.overall_width = Number(select.overall_width) - e.pageX + x_start
                                                setChangeProp(changeProp + 1)
                                                }}></div>

                                        {(select.type!=="image") &&
                                            <div draggable = "true" className="resize ns-resize" style={{position: 'absolute', top: '0px', right: '50%'}}
                                            onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                                            onDragEnd={(e) => {
                                                select.left = select.left - e.pageX + x_start,
                                                select.overall_height = Number(select.overall_height) - e.pageY + y_start,
                                                setChangeProp(changeProp + 1)
                                                }}></div>
                                        }
                                        
                                        <div draggable = "true" className="resize nesw-resize" style={{position: 'absolute', top: '0px', right: '0px'}}
                                            onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                                            onDragEnd={(e) => {
                                                select.left = select.left - e.pageX + x_start
                                                if(select.type === "image"){
                                                    select.overall_height = select.overall_height/select.overall_width*(Number(select.overall_width) + e.pageX - x_start)
                                                } else {
                                                    select.overall_height = Number(select.overall_height) - e.pageY + y_start
                                                }
                                                select.overall_width = Number(select.overall_width) + e.pageX - x_start
                                                setChangeProp(changeProp + 1)
                                                }}></div>

                                        {(select.type!=="image") &&
                                            <div draggable = "true" className="resize ew-resize" style={{position: 'absolute', top: '50%', left: '0px'}}
                                                onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                                                onDragEnd={(e) => {
                                                    select.top = select.top - e.pageY + y_start,
                                                    select.overall_width = Number(select.overall_width) - e.pageX + x_start,
                                                    setChangeProp(changeProp + 1)
                                                    }}></div>
                                        }
                                        {(select.type!=="image") &&
                                            <div draggable = "true" className="resize ew-resize" style={{position: 'absolute', top: '50%', right: '0px'}}
                                                onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                                                onDragEnd={(e) => {
                                                    select.top = select.top - e.pageY + y_start,
                                                    select.left = select.left - e.pageX + x_start,
                                                    select.overall_width = Number(select.overall_width) + e.pageX - x_start,
                                                    setChangeProp(changeProp + 1)
                                                    }}></div>
                                        }
                                        
                                        <div draggable = "true" className="resize nesw-resize" style={{position: 'absolute', bottom: '0px', left: '0px'}}
                                            onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                                            onDragEnd={(e) => {
                                                select.top = select.top - e.pageY + y_start
                                                if(select.type === "image"){
                                                    select.overall_height = select.overall_height/select.overall_width*(Number(select.overall_width) - e.pageX + x_start)
                                                } else {
                                                    select.overall_height = Number(select.overall_height) + e.pageY - y_start
                                                }
                                                select.overall_width = Number(select.overall_width) - e.pageX + x_start
                                                setChangeProp(changeProp + 1)
                                                }}></div>

                                        {(select.type!=="image") &&
                                            <div draggable = "true" className="resize ns-resize" style={{position: 'absolute', bottom: '0px', right: '50%'}}
                                                onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                                                onDragEnd={(e) => {
                                                    select.left = select.left - e.pageX + x_start,
                                                    select.top = select.top - e.pageY + y_start,
                                                    select.overall_height = Number(select.overall_height) + e.pageY - y_start,
                                                    setChangeProp(changeProp + 1)
                                                    }}></div>
                                        }

                                        <div draggable = "true" className="resize nwse-resize" style={{position: 'absolute', bottom: '0px', right: '0px'}}
                                            onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                                            onDragEnd={(e) => {
                                                select.left = select.left - e.pageX + x_start
                                                select.top = select.top - e.pageY + y_start
                                                if(select.type === "image"){
                                                    select.overall_height = select.overall_height/select.overall_width*(Number(select.overall_width) + e.pageX - x_start)
                                                } else {
                                                    select.overall_height = Number(select.overall_height) + e.pageY - y_start
                                                }
                                                select.overall_width = Number(select.overall_width) + e.pageX - x_start,
                                                setChangeProp(changeProp + 1)
                                                }}></div>
                                    </div>
    )
}

export default ResizeInitial