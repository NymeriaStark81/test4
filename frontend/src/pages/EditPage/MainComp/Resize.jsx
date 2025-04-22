import React from "react"

const Resize = ({select, handleUpdateSquares, squares, x_start, y_start, tempID, changeProp, setChangeProp}) => {
    var width, height
    var corners = false
    if((select.type == 'image') || (select.type == 'icon') || (select.type == "button") || (select.type == "mood") || (select.type == 'fixed_icon')){
        corners = true
    }
    if(corners){
        width = select.icon_width
        height = select.icon_width
    } else {
        width = select.width
        height = select.height
    }

    const updateWH = () => {
        if(corners){
            select.icon_width = width
        } else {
            select.width = width
            select.height = height
        }
    }

    return (
        <div style={{width: '100%', height: '100%', top:'0px', left: '0px', position: 'absolute'}}>
                                        <div draggable = "true" className="resize nwse-resize" style={{position: 'absolute', top: '0px', left: '0px'}}
                                            onDragStart={(e) => { x_start = e.pageX, y_start = e.pageY}}
                                            onDragEnd={(e) => {
                                                if(corners){
                                                    height = height/width*(Number(width) - e.pageX + x_start)
                                                } else {
                                                    height = Number(height) - e.pageY + y_start
                                                }
                                                width = Number(width) - e.pageX + x_start
                                                if(height < 0) {height = 0}
                                                if(width < 0) {width = 0}
                                                updateWH()
                                                setChangeProp(changeProp + 1)
                                                handleUpdateSquares(squares, tempID)}}></div>

                                        {(!corners) &&
                                            <div draggable = "true" className="resize ns-resize" style={{position: 'absolute', top: '0px', right: '50%'}}
                                            onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                                            onDragEnd={(e) => {
                                                select.left = select.left - e.pageX + x_start;
                                                height = Number(height) - e.pageY + y_start;
                                                if(height < 0) {height = 0};
                                                updateWH()
                                                setChangeProp(changeProp + 1);
                                                handleUpdateSquares(squares, tempID)}}></div>
                                        }
                                        
                                        <div draggable = "true" className="resize nesw-resize" style={{position: 'absolute', top: '0px', right: '0px'}}
                                            onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                                            onDragEnd={(e) => {
                                                select.left = select.left - e.pageX + x_start
                                                if(corners){
                                                    height = height/width*(Number(width) + e.pageX - x_start)
                                                } else {
                                                    height = Number(height) - e.pageY + y_start
                                                }
                                                width = Number(width) + e.pageX - x_start
                                                if(height < 0) {height = 0}
                                                if(width < 0) {width = 0}
                                                updateWH()
                                                setChangeProp(changeProp + 1)
                                                handleUpdateSquares(squares, tempID)}}></div>

                                        {(!corners) &&
                                            <div draggable = "true" className="resize ew-resize" style={{position: 'absolute', top: '50%', left: '0px'}}
                                                onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                                                onDragEnd={(e) => {
                                                    select.top = select.top - e.pageY + y_start;
                                                    width = Number(width) - e.pageX + x_start;
                                                    if(width < 0) {width = 0};
                                                    updateWH()
                                                    setChangeProp(changeProp + 1);
                                                    handleUpdateSquares(squares, tempID)}}></div>
                                        }
                                        {(!corners) &&
                                            <div draggable = "true" className="resize ew-resize" style={{position: 'absolute', top: '50%', right: '0px'}}
                                                onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                                                onDragEnd={(e) => {
                                                    select.top = select.top - e.pageY + y_start;
                                                    select.left = select.left - e.pageX + x_start;
                                                    width = Number(width) + e.pageX - x_start;
                                                    if(width < 0) {width = 0};
                                                    updateWH()
                                                    setChangeProp(changeProp + 1);
                                                    handleUpdateSquares(squares, tempID)}}></div>
                                        }
                                        
                                        <div draggable = "true" className="resize nesw-resize" style={{position: 'absolute', bottom: '0px', left: '0px'}}
                                            onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                                            onDragEnd={(e) => {
                                                select.top = select.top - e.pageY + y_start
                                                if(corners){
                                                    height = height/width*(Number(width) - e.pageX + x_start)
                                                } else {
                                                    height = Number(height) + e.pageY - y_start
                                                }
                                                width = Number(width) - e.pageX + x_start
                                                if(height < 0) {height = 0}
                                                if(width < 0) {width = 0}
                                                updateWH()
                                                setChangeProp(changeProp + 1)
                                                handleUpdateSquares(squares, tempID)}}></div>

                                        {(!corners) &&
                                            <div draggable = "true" className="resize ns-resize" style={{position: 'absolute', bottom: '0px', right: '50%'}}
                                                onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                                                onDragEnd={(e) => {
                                                    select.left = select.left - e.pageX + x_start;
                                                    select.top = select.top - e.pageY + y_start;
                                                    height = Number(height) + e.pageY - y_start;
                                                    if(height < 0) {height = 0};
                                                    updateWH()
                                                    setChangeProp(changeProp + 1);
                                                    handleUpdateSquares(squares, tempID)}}></div>
                                        }

                                        <div draggable = "true" className="resize nwse-resize" style={{position: 'absolute', bottom: '0px', right: '0px'}}
                                            onDragStart={(e) => {x_start = e.pageX, y_start = e.pageY}}
                                            onDragEnd={(e) => {
                                                select.left = select.left - e.pageX + x_start
                                                select.top = select.top - e.pageY + y_start
                                                if(corners){
                                                    height = height/width*(Number(width) + e.pageX - x_start)
                                                } else {
                                                    height = Number(height) + e.pageY - y_start
                                                }
                                                width = Number(width) + e.pageX - x_start
                                                if(height < 0) {height = 0}
                                                if(width < 0) {width = 0}
                                                updateWH()
                                                setChangeProp(changeProp + 1),
                                                handleUpdateSquares(squares, tempID)}}></div>
                                    </div>
    )
}

export default Resize