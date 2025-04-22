import React from "react"

const TodoList = ({square}) => {
    var start = 0
    var i = 0
    var arr = [0]

    do{
        start = start + Number(square.el_height) + Number(square.spacingY)
        i = i+1
        arr.push(i)

    } while (start < square.height)

    return(
            arr.map((index) => {
                return(
                <div key={index} style={{
                            position: 'absolute',
                            width: Number(square.width) - square.borderWidth*2 + 'px',
                            height: square.el_height + 'px',
                            left: '0px',
                            top: square.el_height*index + square.spacingY*index + 'px',
                            backgroundColor: square.backgroundColor,
                            borderStyle: square.borderStyle,
                            borderColor: square.borderColor,
                            borderWidth: square.borderWidth + 'px',
                            borderRadius: square.borderRadius + 'px',
                            overflow: 'hidden'
                        }}>
                    <div style={{
                            position: 'absolute',
                            float: 'left',
                            left: '10px',
                            top: square.el_height/2 - square.icon_width/2 + 'px',
                            width: square.icon_width + 'px', 
                            height: square.icon_width + 'px',
                            overflow: 'hidden'}}>
                        <img src={square.icon_tick} width={square.icon_width} height={square.icon_width}></img>
                    </div>
                    <div  style={{
                            position: 'absolute',
                            width: square.width - 20 - square.borderWidth*2 - square.icon_width*2 - square.paddingLeft + 'px',
                            height: square.el_height + 'px',
                            float: 'left',
                            left: Number(square.icon_width) + 10 + 'px',
                            overflow: 'hidden',
                            textAlign: square.align,
                            fontFamily: square.fontFamily + ',' + square.fontCategory,
                            fontSize: square.fontSize + 'px',
                            color: square.fontColor,
                            fontStyle: square.fontStyle,
                            fontWeight: square.fontWeight,
                            textDecoration: square.textDecoration,
                            lineHeight: square.lineHeight,
                            letterSpacing: square.letterSpacing + 'px',
                            paddingTop: square.paddingTop + 'px',
                            paddingBottom: square.paddingBottom + 'px',
                            paddingLeft: square.paddingLeft + 'px',
                            paddingRight: square.paddingRight + 'px',
                    }}>
                        Your tasks will appear here
                    </div>
                    <div style={{
                            position: 'absolute',
                            float: 'right',
                            top: square.el_height/2 - square.icon_width/2 + 'px',
                            right: '10px',
                            width: square.icon_width + 'px', 
                            height: square.icon_width + 'px',
                            overflow: 'hidden'}}>
                        <img src={square.delete_btn} width={square.icon_width} height={square.icon_width}></img>
                    </div>
                </div>
                )
            })
    )

}

export default TodoList