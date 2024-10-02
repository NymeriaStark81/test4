import EditImage from './EditImage'

const handleTableResize_Rows = (select, e) => {
    const original_rows = select.content.length;
    if(original_rows > e.target.value){
        for (let i = 0; i < (original_rows - e.target.value); i++) {
            select.content.pop();
        };
    } else if(original_rows < e.target.value){
        for (let i = 0; i < (e.target.value - original_rows); i++) {
            select.content.push(['','']);
        }
    };
};

const handleTableResize_Columns = (select, e) => {
    const original_columns = select.content[0].length;
    for(let i=0; i < select.content.length; i++){
        if(original_columns > e.target.value){
            for (let j = 0; j < (original_columns - e.target.value); j++) {
                select.content[i].pop();
            };
        } else if(original_columns < e.target.value){
            for (let j = 0; j < (e.target.value - original_columns); j++) {
                select.content[i].push(['']);
            }
        };
    };
};

async function cropHandle(e, socket, select, cropProp, setCropProp, squares, changeProp, setChangeProp, tempID, handleUpdateSquares){
    try{
        e.preventDefault()
        if(cropProp.top < 0){
            cropProp.height = cropProp.height+cropProp.top
            cropProp.top = 0
        }

        if(cropProp.height + cropProp.top > select.height){
            cropProp.height = cropProp.height - (cropProp.height - (select.height - cropProp.top))
        }

        if(cropProp.left < 0){
            cropProp.width = Number(cropProp.width)+cropProp.left
            cropProp.left = 0
        }

        if(cropProp.left + Number(cropProp.width) > select.width){
            cropProp.width = Number(cropProp.width) - (Number(cropProp.width) - (select.width - cropProp.left))
        }
        
        var cropTransform = {
            width: parseInt(cropProp.width/select.width*select.original_width),
            height: parseInt(cropProp.height/select.height*select.original_height),
            top: parseInt(cropProp.top/select.height*select.original_height),
            left: parseInt(cropProp.left/select.width*select.original_width)
        }

        const buffer = await requestBuffer(select.source, cropTransform)
        socket.emit('s3_bucket', {buffer: buffer, url: select.source, image_id: select.id})
        
        socket.on('reply', (msg) => {
            if(select.id === msg.image_id){
                if(msg.image_new_props.url !== select.source){
                    var del = true
                    squares.map((square) => {
                        if((square.source === select.source) && (square.id !== select.id)){
                            del = false
                        }
                    })
                    if(del){
                        socket.emit('delete_image', {url: select.source})
                    }
                }
                

                select.source = msg.image_new_props.url 
                select.original_width = msg.image_new_props.width
                select.original_height = msg.image_new_props.height
                select.width = cropProp.width
                select.height = cropProp.height
                handleUpdateSquares(squares, tempID)
                setCropProp(({
                    width: 0,
                    height: 0,
                    top: 0,
                    left: 0
                }))
                setChangeProp(changeProp+1)
            }
        });
    } catch(err) {
        console.log(err)
    }
}

const requestBuffer = async (url, cropTransform) => {
    try {
        var buffer;
        await fetch("http://localhost:3000/requestBuffer/", {
            method: 'POST',
            body: JSON.stringify({url: url, cropTransform: cropTransform}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {return res.json()})
        .then((data)=> {
            buffer = data
        });
        return buffer       
    } catch(err) {
        console.log(err)
    }
}

const Edit = ({tempID, socket, squares, select, changeSelect, changeProp, setChangeProp, changePropInput, setChangePropInput, cropProp, setCropProp, cropChange, cropChangeInput, setCropChangeInput, showCrop, setShowCrop, handleUpdateSquares}) => {
    return(
        <div key={[changeSelect, changeProp, cropChange]} className="edit-canvas">
                    {(select.type == 'shape') &&
                        <div>
                            <h1> Edit </h1>
                            <label>
                                Width: <input type="text" onChange={(e) => { select.width = e.target.value, handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}} defaultValue={select.width}/>
                            </label>
                            <label>
                                Height: <input type="text" onChange={(e) => { select.height = e.target.value, handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}} defaultValue={select.height}/>
                            </label>
                            <label>
                                Position X: <input type="text" onChange={(e) => { select.left = e.target.value, handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}} defaultValue={select.left}/>
                            </label>
                            <label>
                                Position Y: <input type="text" onChange={(e) => { select.top = e.target.value, handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}} defaultValue={select.top}/>
                            </label>
                        </div>
                    }
                    {(select.type == 'text') &&
                        <div>
                            <h1> Edit </h1>
                            <label>
                                Position X: <input type="text" onChange={(e) => { select.left = e.target.value, handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}} defaultValue={select.left}/>
                            </label>
                            <label>
                                Position Y: <input type="text" onChange={(e) => { select.top = e.target.value, handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}} defaultValue={select.top}/>
                            </label>
                        </div>
                    }
                    {(select.type === 'image') &&
                        <EditImage select={select} cropProp={cropProp} setShowCrop={setShowCrop} changeProp={changeProp} changePropInput={changePropInput} setChangePropInput={setChangePropInput} handleUpdateSquares={handleUpdateSquares} squares={squares} tempID={tempID} />
                    }
                    {showCrop &&
                        <div>
                            <h1> Crop </h1>
                            <label>
                                Width: <input type="number" onChange={(e) => { cropProp.width = Number(e.target.value), setCropChangeInput(cropChangeInput+1)}} defaultValue={cropProp.width}/>
                            </label>
                            <label>
                                Height: <input type="number" onChange={(e) => { cropProp.height = Number(e.target.value), setCropChangeInput(cropChangeInput+1)}} defaultValue={cropProp.height}/>
                            </label>
                            <label>
                                Position X: <input type="number" onChange={(e) => { cropProp.left = Number(e.target.value), setCropChangeInput(cropChangeInput+1)}} defaultValue={cropProp.left}/>
                            </label>
                            <label>
                                Position Y: <input type="number" onChange={(e) => { cropProp.top = Number(e.target.value), setCropChangeInput(cropChangeInput+1)}} defaultValue={cropProp.top}/>
                            </label>
                            <button onClick={(e) => {
                                    if((cropProp.top + cropProp.height <= 0) || (cropProp.top >= select.height) || (cropProp.left + Number(cropProp.width) < 0) || (cropProp.left >= Number(select.width))){
                                        alert('Must crop within image')
                                    } else {
                                        setShowCrop(false),
                                        cropHandle(e, socket, select, cropProp, setCropProp, squares, changeProp, setChangeProp, tempID, handleUpdateSquares)
                                    }
                                }}>Finish Crop</button>
                            <button onClick={() => {setShowCrop(false)}}>Cancel</button>
                        </div>
                    }
                    {(select.type == 'grid') &&
                        <div>
                            <h1> Edit </h1>
                            <label>
                                Position X: <input type="text" onChange={(e) => { select.left = e.target.value, handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}} defaultValue={select.left}/>
                            </label>
                            <label>
                                Position Y: <input type="text" onChange={(e) => { select.top = e.target.value, handleUpdateSquares(squares, tempID), setChangePropInput(changePropInput+1)}} defaultValue={select.top}/>
                            </label>
                            <label>
                                Columns: <input type="text" onBlur={(e) => {  select.columns = e.target.value, 
                                                                                handleTableResize_Columns(select,e),
                                                                                handleUpdateSquares(squares, tempID), 
                                                                                setChangePropInput(changePropInput+1)}} defaultValue={select.columns}/>
                            </label>
                            <label>
                                Rows: <input type="text" onBlur={(e) => { select.rows = e.target.value, 
                                                                            handleTableResize_Rows(select, e),
                                                                            handleUpdateSquares(squares, tempID), 
                                                                            setChangePropInput(changePropInput+1)}} defaultValue={select.rows}/>
                            </label>
                        </div>
                    }
        </div>
    )
}

export default Edit