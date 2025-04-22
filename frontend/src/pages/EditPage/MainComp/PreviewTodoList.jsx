import React from "react"

const PreviewTodo = ({previewGroup}) => {
    var start = 0
    var i = 0
    var arr = [0]

    do{
        start = start + Number(previewGroup.el_height) + Number(previewGroup.spacingY)
        i = i+1
        arr.push(i)

    } while (start < previewGroup.height)

    return(
        <div style={{
            position: 'absolute',
            top: Number(previewGroup.el_height) + Number(previewGroup.spacingY) + 'px',
            left: '0px',
            width: Number(previewGroup.width) + 'px',
            height: Number(previewGroup.height) + 'px',
            overflow: 'scroll',
            scrollbarWidth: 'none'
        }}>
            {arr.map((index) => {
                return(
                <div key={index} style={{
                            position: 'absolute',
                            width: Number(previewGroup.width) + 'px',
                            height: previewGroup.el_height + 'px',
                            left: '0px',
                            top: previewGroup.el_height*index + previewGroup.spacingY*index + 'px',
                            backgroundColor: 'gray',
                            borderRadius: '10px',
                            overflow: 'visible'
                        }}>
                    <div style={{
                            position: 'absolute',
                            float: 'left',
                            left: '0px',
                            top: previewGroup.el_height/2 - previewGroup.icon_width/2 + 'px',
                            width: previewGroup.icon_width + 'px', 
                            height: previewGroup.icon_width + 'px',
                            overflow: 'hidden'}}>
                        <img src={previewGroup.icon_tick} width={previewGroup.icon_width} height={previewGroup.icon_width}></img>
                    </div>
                    <div  style={{
                            position: 'absolute',
                            width: previewGroup.width - previewGroup.icon_width*2 + 'px',
                            height: previewGroup.el_height + 'px',
                            float: 'left',
                            left: previewGroup.icon_width + 'px',
                            overflow: 'hidden',
                            textAlign: 'left',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '20px',
                            color: 'black',
                            fontWeight: 'normal'
                    }}>
                        Your tasks will appear here
                    </div>
                    <div style={{
                            position: 'absolute',
                            float: 'right',
                            top: previewGroup.el_height/2 - previewGroup.icon_width/2 + 'px',
                            left: previewGroup.width - previewGroup.icon_width + 'px',
                            width: previewGroup.icon_width + 'px', 
                            height: previewGroup.icon_width + 'px',
                            overflow: 'hidden'}}>
                        <img src={previewGroup.delete_btn} width={previewGroup.icon_width} height={previewGroup.icon_width}></img>
                    </div>
                </div>
                )
            })}
        </div>
    )

}

export default PreviewTodo