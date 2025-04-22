import React from "react"

const ResizeCrop = ({cropProp, x_start, y_start, cropChange, setCropChange}) => {
    return (
        <div style={{width: '100%', height: '100%', top:'0px', left: '0px', position: 'absolute'}}>
                                        <div draggable = "true" className="resize nwse-resize" style={{position: 'absolute', top: '0px', left: '0px'}}
                                            onDragStart={(e) => { x_start = e.pageX, y_start = e.pageY}}
                                            onDragEnd={(e) => {
                                                cropProp.width = Number(cropProp.width) - e.pageX + x_start, 
                                                cropProp.height = Number(cropProp.height) - e.pageY + y_start,
                                                setCropChange(cropChange + 1)
                                                }}></div>
                                        <div draggable = "true" className="resize ns-resize" style={{position: 'absolute', top: '0px', right: '50%'}}
                                            onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                                            onDragEnd={(e) => {
                                                cropProp.left = cropProp.left - e.pageX + x_start,
                                                cropProp.height = Number(cropProp.height) - e.pageY + y_start,
                                                setCropChange(cropChange + 1)
                                                }}></div>
                                        <div draggable = "true" className="resize nesw-resize" style={{position: 'absolute', top: '0px', right: '0px'}}
                                            onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                                            onDragEnd={(e) => {
                                                cropProp.left = cropProp.left - e.pageX + x_start,
                                                cropProp.width = Number(cropProp.width) + e.pageX - x_start,
                                                cropProp.height = Number(cropProp.height) - e.pageY + y_start,
                                                setCropChange(cropChange + 1)
                                                }}></div>
                                        <div draggable = "true" className="resize ew-resize" style={{position: 'absolute', top: '50%', left: '0px'}}
                                            onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                                            onDragEnd={(e) => {
                                                cropProp.top = cropProp.top - e.pageY + y_start,
                                                cropProp.width = Number(cropProp.width) - e.pageX + x_start,
                                                setCropChange(cropChange + 1)
                                                }}></div>
                                        <div draggable = "true" className="resize ew-resize" style={{position: 'absolute', top: '50%', right: '0px'}}
                                            onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                                            onDragEnd={(e) => {
                                                cropProp.top = cropProp.top - e.pageY + y_start,
                                                cropProp.left = cropProp.left - e.pageX + x_start,
                                                cropProp.width = Number(cropProp.width) + e.pageX - x_start,
                                                setCropChange(cropChange + 1)
                                                }}></div>
                                        <div draggable = "true" className="resize nesw-resize" style={{position: 'absolute', bottom: '0px', left: '0px'}}
                                            onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                                            onDragEnd={(e) => {
                                                cropProp.top = cropProp.top - e.pageY + y_start,
                                                cropProp.width = Number(cropProp.width) - e.pageX + x_start,
                                                cropProp.height = Number(cropProp.height) + e.pageY - y_start,
                                                setCropChange(cropChange + 1)
                                                }}></div>
                                        <div draggable = "true" className="resize ns-resize" style={{position: 'absolute', bottom: '0px', right: '50%'}}
                                            onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                                            onDragEnd={(e) => {
                                                cropProp.left = cropProp.left - e.pageX + x_start,
                                                cropProp.top = cropProp.top - e.pageY + y_start,
                                                cropProp.height = Number(cropProp.height) + e.pageY - y_start,
                                                setCropChange(cropChange + 1)
                                                }}></div>
                                        <div draggable = "true" className="resize nwse-resize" style={{position: 'absolute', bottom: '0px', right: '0px'}}
                                            onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                                            onDragEnd={(e) => {
                                                cropProp.left = cropProp.left - e.pageX + x_start,
                                                cropProp.top = cropProp.top - e.pageY + y_start,
                                                cropProp.height = Number(cropProp.height) + e.pageY - y_start,
                                                cropProp.width = Number(cropProp.width) + e.pageX - x_start,
                                                setCropChange(cropChange + 1)
                                                }}></div>
                                    </div>
    )
}

export default ResizeCrop