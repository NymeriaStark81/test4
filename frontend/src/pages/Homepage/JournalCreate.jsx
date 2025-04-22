import { useLocation,useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleXmark, faCaretLeft, faCaretRight, faLayerGroup } from "@fortawesome/free-solid-svg-icons"
import Reference from './Reference'

const JournalCreate = ({setSection}) => {
    const {state} = useLocation()
    const navigate = useNavigate();
    var [stage, setStage] = useState(1)
    var [level, setLevel] = useState(1)
    var [title, setTitle] = useState('')
    var [year, setYear] = useState('')
    var [daily, setDaily] = useState([])
    var [dailyTemp, setDailyTemp] = useState([])
    var [weekTemp, setWeekTemp] = useState([])
    var [weekStartTemp, setWeekStartTemp] = useState([])
    var [weekEndTemp, setWeekEndTemp] = useState([])
    var [monthTemp, setMonthTemp] = useState([])
    var [monthStartTemp, setMonthStartTemp] = useState([])
    var [monthEndTemp, setMonthEndTemp] = useState([])
    var [yearTemp, setYearTemp] = useState([])
    var [yearStartTemp, setYearStartTemp] = useState([])
    var [yearEndTemp, setYearEndTemp] = useState([])
    var [blank, setBlank] = useState([])
    var [blankTemp, setBlankTemp] = useState([])
    var [load, setLoad] = useState(false)
    var [updateYear, setUpdateYear] = useState(0)
    var [updateMonth, setUpdateMonth] = useState(0)
    var [updateWeek, setUpdateWeek] = useState(0)
    var [updateDay, setUpdateDay] = useState(0)
    var [updateBlank, setUpdateBlank] = useState(0)
    const [designs, setDesigns] = useState([])
    
    //move starting templates upwards
    const Up_start = (temp, index) => {
        temp[index][1].order = temp[index][1].order - 1;
        temp[index - 1][1].order = temp[index - 1][1].order + 1;
        [temp[index], temp[index - 1]] = [temp[index - 1], temp[index]];
    }
    //move starting templates downwards
    const Down_start = (temp, index) => {
        temp[index][1].order = temp[index][1].order + 1;
        temp[index + 1][1].order = temp[index + 1][1].order - 1;
        [temp[index], temp[index + 1]] = [temp[index + 1], temp[index]];
    }
    //move reflection templates upwards
    const Up_end = (temp, index) => {
        temp[index][1].order = temp[index][1].order + 1;
        temp[index - 1][1].order = temp[index - 1][1].order - 1;
        [temp[index], temp[index - 1]] = [temp[index - 1], temp[index]];
    }
    //move reflection templates downwards
    const Down_end = (temp, index) => {
        temp[index][1].order = temp[index][1].order - 1;
        temp[index + 1][1].order = temp[index + 1][1].order + 1;
        [temp[index], temp[index + 1]] = [temp[index + 1], temp[index]];
    }

    //create Journal
    const createJournal = () => {
        const export_func = (temp) => {
            for(let i=0; i< temp.length; i++){
                temp[i] = temp[i][1]
            }
        }

        export_func(yearStartTemp)
        export_func(yearEndTemp)
        export_func(monthStartTemp)
        export_func(monthEndTemp)
        export_func(weekStartTemp)
        export_func(weekEndTemp)
        export_func(dailyTemp)
        export_func(blankTemp)


        fetch("http://localhost:3000/produceJournal/", {
            method: 'POST',
            body: JSON.stringify({
                userID: state.userID, 
                journal_title: title, 
                year: year,
                yearStartTemp: yearStartTemp,
                yearEndTemp: yearEndTemp,
                monthStartTemp: monthStartTemp,
                monthEndTemp: monthEndTemp,
                weekStartTemp: weekStartTemp,
                weekEndTemp: weekEndTemp,
                dailyTemp: dailyTemp, 
                blankTemp: blankTemp}),
                headers: {
                'Content-Type': 'application/json'
        }})
            .then((res) => {return res.json()})
            .then((data) => {
                fetch("http://localhost:3000/add_JSON/", {
                    method: 'POST',
                    body: JSON.stringify({data: data.pages}),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then((res) => {return res.json()})
                .then((url) => {
                    fetch("http://localhost:3000/createJournal/", {
                        method: 'POST',
                        body: JSON.stringify({... data, pages: url}),
                        headers: {
                            'Content-Type': 'application/json'
                    }})
                    .then((res) => {return res.json()})
                    .then((dat) => {
                        navigate('/journalView', {
                            state: {
                                userID: state.userID,
                                journalID: dat
                            }
                        })
                })
            })
            })

    }

    //load all templates
    useEffect(()=> {
        fetch("http://localhost:3000/loadTemplate/", {
            method: 'POST',
            body: JSON.stringify({userID: state.userID}),
            headers: {
                'Content-Type': 'application/json'
        }})
            .then((res) => {return res.json()})
            .then((data) => {
                if(daily.length === 0 && weekTemp.length === 0 && monthTemp.length === 0 && yearTemp.length === 0){
                    data.map((temp) => {
                        if(temp.temp_type === "daily"){
                            daily.push([false, temp])
                        } else if (temp.temp_type === "weekly"){
                            weekTemp.push([false, temp])
                        } else if (temp.temp_type === "monthly"){
                            monthTemp.push([false, temp])
                        } else if (temp.temp_type === "yearly"){
                            yearTemp.push([false, temp])
                        } else {
                            blank.push([false, temp])
                        }
                   })
                }
                setLoad(true)
            })
    }, [])


    if(load){
        //choose templates
        if(stage === 1){
            return(
                <div className="home_main">
                    <div className="home_main_header">
                        <div className="home_main_header_title">Create journal: select templates</div>
                        <button className="home_main_header_new" onClick={()=> {setSection('journals')}}>Cancel</button>
                    </div>
                    <div className="home_main_list">
                        <div className="create_form">
                        <h2>Journal Title</h2> <br/>
                        <input className="create_template_input" value={title} onChange={(e) => {setTitle(e.target.value)}}/> <br/>
                        <h2>Year</h2> <br/>
                        <input className="create_template_input" value={year} type="number" onChange={(e) => {year = e.target.value, setYear(year)}}/> <br/>
                        <h2> Year Start Templates </h2> <br/>
                        <div className="home_select_list">
                            {yearStartTemp.map((temp, index) => {
                                return(
                                    <div key={[index, updateYear]} className="home_design selected_temp"
                                    onClick={() => {temp[0] = false, yearTemp.push(temp), yearStartTemp.splice(index, 1), setUpdateYear(updateYear + 1)}}>
                                        <FontAwesomeIcon icon={faCircleXmark} className="temp_x"/>
                                        <div className="thumbnail">
                                        </div>
                                        <div className="home_design_details">
                                            <p>{temp[1].title}</p>
                                            <p>Layout: {temp[1].layout}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        
                            {yearTemp.map((temp, index) => {
                                return(
                                    <div key={[index, updateYear]} className="home_design"
                                    onClick={() => {temp[0] = true, yearStartTemp.push(temp), yearTemp.splice(index, 1), setUpdateYear(updateYear + 1)}}>
                                        <div className="thumbnail">
                                        </div>
                                        <div className="home_design_details">
                                            <p>{temp[1].title}</p>
                                            <p>Layout: {temp[1].layout}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
        
                        <h2> Month Start Templates </h2>
                        <div className="home_select_list">
                            {monthStartTemp.map((temp, index) => {
                                return(
                                    <div key={[index, updateYear]} className="home_design selected_temp"
                                    onClick={() => {temp[0] = false, monthTemp.push(temp), monthStartTemp.splice(index, 1), setUpdateMonth(updateMonth + 1)}}>
                                        <FontAwesomeIcon icon={faCircleXmark} className="temp_x"/>
                                        <div className="thumbnail">
                                        </div>
                                        <div className="home_design_details">
                                            <p>{temp[1].title}</p>
                                            <p>Layout: {temp[1].layout}</p>
                                        </div>
                                    </div>
                                )
                            })}
                            {monthTemp.map((temp, index) => {
                                return(
                                    <div key={[index, updateYear]} className="home_design"
                                    onClick={() => {temp[0] = true, monthStartTemp.push(temp), monthTemp.splice(index, 1), setUpdateMonth(updateMonth + 1)}}>
                                        <div className="thumbnail">
                                        </div>
                                        <div className="home_design_details">
                                            <p>{temp[1].title}</p>
                                            <p>Layout: {temp[1].layout}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        
                        <h2> Week Start Templates </h2>
                        <div className="home_select_list">
                            {weekStartTemp.map((temp, index) => {
                                return(
                                    <div key={[index, updateYear]} className="home_design selected_temp"
                                    onClick={() => {temp[0] = false, weekTemp.push(temp), weekStartTemp.splice(index, 1), setUpdateWeek(updateWeek + 1)}}>
                                        <FontAwesomeIcon icon={faCircleXmark} className="temp_x"/>
                                        <div className="thumbnail">
                                        </div>
                                        <div className="home_design_details">
                                            <p>{temp[1].title}</p>
                                            <p>Layout: {temp[1].layout}</p>
                                        </div>
                                    </div>
                                )
                            })}
                            {weekTemp.map((temp, index) => {
                                return(
                                    <div key={[index, updateYear]} className="home_design"
                                    onClick={() => {temp[0] = true, weekStartTemp.push(temp), weekTemp.splice(index, 1), setUpdateWeek(updateWeek + 1)}}>
                                        <div className="thumbnail">
                                        </div>
                                        <div className="home_design_details">
                                            <p>{temp[1].title}</p>
                                            <p>Layout: {temp[1].layout}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
        
                        <h2> Daily </h2>
                        <div className="home_select_list">
                            {dailyTemp.map((temp, index) => {
                                return(
                                    <div key={[index, updateYear]} className="home_design selected_temp"
                                    onClick={() => {temp[0] = false, daily.push(temp), dailyTemp.splice(index, 1), setUpdateDay(updateDay + 1)}}>
                                        <FontAwesomeIcon icon={faCircleXmark} className="temp_x"/>
                                        <div className="thumbnail">
                                        </div>
                                        <div className="home_design_details">
                                            <p>{temp[1].title}</p>
                                            <p>Layout: {temp[1].layout}</p>
                                        </div>
                                    </div>
                                )
                            })}
                            {daily.map((temp, index) => {
                                return(
                                    <div key={[index, updateYear]} className="home_design"
                                    onClick={() => {temp[0] = true, dailyTemp.push(temp), daily.splice(index, 1), setUpdateDay(updateDay + 1)}}>
                                        <div className="thumbnail">
                                        </div>
                                        <div className="home_design_details">
                                            <p>{temp[1].title}</p>
                                            <p>Layout: {temp[1].layout}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
            
                        <h2> Week End Templates </h2>
                        <div className="home_select_list">
                            {weekEndTemp.map((temp, index) => {
                                return(
                                    <div key={[index, updateYear]} className="home_design selected_temp"
                                    onClick={() => {temp[0] = false, weekTemp.push(temp), weekEndTemp.splice(index, 1), setUpdateWeek(updateWeek + 1)}}>
                                        <FontAwesomeIcon icon={faCircleXmark} className="temp_x"/>
                                        <div className="thumbnail">
                                        </div>
                                        <div className="home_design_details">
                                            <p>{temp[1].title}</p>
                                            <p>Layout: {temp[1].layout}</p>
                                        </div>
                                    </div>
                                )
                            })}
                            {weekTemp.map((temp, index) => {
                                return(
                                    <div key={[index, updateYear]} className="home_design"
                                    onClick={() => {temp[0] = true, weekEndTemp.push(temp), weekTemp.splice(index, 1), setUpdateWeek(updateWeek + 1)}}>
                                        <div className="thumbnail">
                                        </div>
                                        <div className="home_design_details">
                                            <p>{temp[1].title}</p>
                                            <p>Layout: {temp[1].layout}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
            
                        <h2> Month End Templates </h2>
                        <div className="home_select_list">
                            {monthEndTemp.map((temp, index) => {
                                return(
                                    <div key={[index, updateYear]} className="home_design selected_temp"
                                    onClick={() => {temp[0] = false, monthTemp.push(temp), monthEndTemp.splice(index, 1), setUpdateMonth(updateMonth + 1)}}>
                                        <FontAwesomeIcon icon={faCircleXmark} className="temp_x"/>
                                        <div className="thumbnail">
                                        </div>
                                        <div className="home_design_details">
                                            <p>{temp[1].title}</p>
                                            <p>Layout: {temp[1].layout}</p>
                                        </div>
                                    </div>
                                )
                            })}
                            {monthTemp.map((temp, index) => {
                                return(
                                    <div key={[index, updateYear]} className="home_design"
                                    onClick={() => {temp[0] = true, monthEndTemp.push(temp), monthTemp.splice(index, 1), setUpdateMonth(updateMonth + 1)}}>
                                        <div className="thumbnail">
                                        </div>
                                        <div className="home_design_details">
                                            <p>{temp[1].title}</p>
                                            <p>Layout: {temp[1].layout}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
            
                        <h2> Year End Templates </h2>
                        <div className="home_select_list">
                            {yearEndTemp.map((temp, index) => {
                                return(
                                    <div key={[index, updateYear]} className="home_design selected_temp"
                                    onClick={() => {temp[0] = false, yearTemp.push(temp), yearEndTemp.splice(index, 1), setUpdateYear(updateYear + 1)}}>
                                        <FontAwesomeIcon icon={faCircleXmark} className="temp_x"/>
                                        <div className="thumbnail">
                                        </div>
                                        <div className="home_design_details">
                                            <p>{temp[1].title}</p>
                                            <p>Layout: {temp[1].layout}</p>
                                        </div>
                                    </div>
                                )
                            })}
                            {yearTemp.map((temp, index) => {
                                return(
                                    <div key={[index, updateYear]} className="home_design"
                                    onClick={() => {temp[0] = true, yearEndTemp.push(temp), yearTemp.splice(index, 1), setUpdateYear(updateYear + 1)}}>
                                        <div className="thumbnail">
                                        </div>
                                        <div className="home_design_details">
                                            <p>{temp[1].title}</p>
                                            <p>Layout: {temp[1].layout}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
            
                        <h2> Blank </h2>
                        <div className="home_select_list">
                            {blankTemp.map((temp, index) => {
                                return(
                                    <div key={[index, updateYear]} className="home_design selected_temp"
                                    onClick={() => {temp[0] = false, blank.push(temp), blankTemp.splice(index, 1), setUpdateBlank(updateBlank + 1)}}>
                                        <FontAwesomeIcon icon={faCircleXmark} className="temp_x"/>
                                        <div className="thumbnail">
                                        </div>
                                        <div className="home_design_details">
                                            <p>{temp[1].title}</p>
                                            <p>Layout: {temp[1].layout}</p>
                                        </div>
                                    </div>
                                )
                            })}
                            {blank.map((temp, index) => {
                                return(
                                    <div key={[index, updateYear]} className="home_design"
                                    onClick={() => {
                                        if(blankTemp.length === 0){
                                            temp[0] = true, blankTemp.push(temp), blank.splice(index, 1), setUpdateBlank(updateBlank + 1)
                                        }}}>
                                        <div className="thumbnail">
                                        </div>
                                        <div className="home_design_details">
                                            <p>{temp[1].title}</p>
                                            <p>Layout: {temp[1].layout}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        <button style={{backgroundColor: "#F198AF", fontSize: "20px"}}
                        onClick={()=> {
                            if((year !=='') && (title !=='') && (yearStartTemp.length !==0) && (blankTemp.length !==0) &&
                            (dailyTemp.length !== 0 || weekStartTemp.length!==0 || weekEndTemp.length !== 0 || monthStartTemp.length!==0 || monthEndTemp.length!==0) 
                            //&& (blankTemp.length !== 0)
                            ){
                                setStage(2)
                            } else {
                                alert('Year start, a blank page and one of daily, weekly, monthly templates needed')
                            }}}> Name bookmarks </button>
            
                    </div>
                    </div>
                </div>
            )
        }

        //name bookmarks
        if(stage === 2){
            return(
                <div className="home_main">
                    <div className="home_main_header">
                        <div className="home_main_header_title">Create journal: name bookmarks</div>
                        <button className="home_main_header_new" onClick={()=> {setStage(1)}}>Back</button>
                    </div>
                    <div className="home_main_list">
                        <div className="create_form">
                        <h2> Year Start Templates </h2> <br/>
                        <div className="home_select_list">
                            {yearStartTemp.map((temp, index) => {
                                temp[1].tag = 'Auto'
                                return(
                                    <div key={[index, updateYear]}>
                                        <div className="home_temp">
                                            <div className="thumbnail">
                                            </div>
                                            <div className="home_design_details">
                                                <p>{temp[1].title}</p>
                                                <input className="input_tag" onChange={(e) => {temp[1].tag = e.target.value}} defaultValue={'Auto'}/>
                                            </div>                                            
                                        </div>
                                    </div>
                                    
                                )
                            })}
                        </div> <br/>
        
                        <h2> Month Start Templates </h2> <br/>
                        <div className="home_select_list">
                            {monthStartTemp.map((temp, index) => {
                                temp[1].tag = 'Auto'
                                return(
                                    <div key={[index, updateYear]}>
                                            <div className="home_temp">
                                                <div className="thumbnail">
                                                </div>
                                                <div className="home_design_details">
                                                    <p>{temp[1].title}</p>
                                                    <input className="input_tag" onChange={(e) => {temp[1].tag = e.target.value}} defaultValue={'Auto'}/>
                                                </div>                                            
                                            </div>
                                        </div>
                                    
                                )
                            })}
                        </div>
                        
        
                        <h2> Week Start Templates </h2> <br/>
                        <div className="home_select_list">
                            {weekStartTemp.map((temp, index) => {
                                temp[1].tag = 'Auto'
                                return(
                                    <div key={[index, updateYear]}>
                                        <div className="home_temp">
                                            <div className="thumbnail">
                                            </div>
                                            <div className="home_design_details">
                                                <p>{temp[1].title}</p>
                                                <input className="input_tag" onChange={(e) => {temp[1].tag = e.target.value}} defaultValue={'Auto'}/>
                                            </div>                                            
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
        
                        <h2> Daily </h2> <br/>
                        <div className="home_select_list">
                            {dailyTemp.map((temp, index) => {
                                temp[1].tag = 'Auto'
                                return(
                                    <div key={[index, updateYear]}>
                                    <div className="home_temp">
                                        <div className="thumbnail">
                                        </div>
                                        <div className="home_design_details">
                                            <p>{temp[1].title}</p>
                                            <input className="input_tag" onChange={(e) => {temp[1].tag = e.target.value}} defaultValue={'Auto'}/>
                                        </div>                                            
                                    </div>
                                </div>
                                    
                                )
                            })}
                        </div>
            
                        <h2> Week End Templates </h2> <br/>
                        <div className="home_select_list">
                            {weekEndTemp.map((temp, index) => {
                                temp[1].tag = 'Auto'
                                return(
                                    <div key={[index, updateYear]}>
                                            <div className="home_temp">
                                                <div className="thumbnail">
                                                </div>
                                                <div className="home_design_details">
                                                    <p>{temp[1].title}</p>
                                                    <input className="input_tag" onChange={(e) => {temp[1].tag = e.target.value}} defaultValue={'Auto'}/>
                                                </div>                                            
                                            </div>
                                        </div>
                                    
                                )
                            })}
                        </div>
            
                        <h2> Month End Templates </h2> <br/>
                        <div className="home_select_list">
                            {monthEndTemp.map((temp, index) => {
                                temp[1].tag = 'Auto'
                                return(
                                    <div key={[index, updateYear]}>
                                                <div className="home_temp">
                                                    <div className="thumbnail">
                                                    </div>
                                                    <div className="home_design_details">
                                                        <p>{temp[1].title}</p>
                                                        <input className="input_tag" onChange={(e) => {temp[1].tag = e.target.value}} defaultValue={'Auto'}/>
                                                    </div>                                            
                                                </div>
                                            </div>
                                )
                            })}
                        </div>
            
                        <h2> Year End Templates </h2> <br/>
                        <div className="home_select_list">
                            {yearEndTemp.map((temp, index) => {
                                temp[1].tag = 'Auto'
                                return(
                                    <div key={[index, updateYear]}>
                                                <div className="home_temp">
                                                    <div className="thumbnail">
                                                    </div>
                                                    <div className="home_design_details">
                                                        <p>{temp[1].title}</p>
                                                        <input className="input_tag" onChange={(e) => {temp[1].tag = e.target.value}} defaultValue={'Auto'}/>
                                                    </div>                                            
                                                </div>
                                            </div>
                                )
                            })}
                        </div>

                        <button style={{backgroundColor: "#F198AF", fontSize: "20px"}}
                        onClick={()=> {setStage(3)}}> Reorder pages </button>
                    </div>
                    </div>
                </div>
            )
        }

        //reorder templates
        if(stage === 3){
            //year level
            if(level === 1){
                var i = 1
                var j = -1
                yearStartTemp.map((temp, index) => {
                    temp[1].order = i
                    i = i+1
                })
                yearEndTemp.map((temp, index) => {
                    temp[1].order = j
                    j = j-1
                })
                return (
                    <div className="home_main">
                        <div className="home_main_header">
                            <div className="home_main_header_title">Create journal: reoder templates</div>
                            <button className="home_main_header_new" onClick={()=> {setStage(2)}}>Back</button>
                        </div>
                        <div className="home_main_list">
                            <div className="create_form">
                                <h2> Year Start Templates </h2>
                                <div className="home_select_list">
                                    {yearStartTemp.map((temp, index) => {
                                        return(
                                                <div key={[index, updateYear]}>
                                                    <div className="home_temp">
                                                        <div className="thumbnail">
                                                        </div>
                                                        <div className="order"><p>{index + 1}</p></div>
                                                        <div className="home_design_details">
                                                            <p> Title: {temp[1].title} </p>
                                                            <p> Layout: {temp[1].layout}</p>
                                                            <p> Tag: {temp[1].tag}</p>
                                                        </div>
                                                        <FontAwesomeIcon icon={faCaretLeft} className="reorder up" onClick={(e) => {
                                                            if(index - 1 >= 0){
                                                                Up_start(yearStartTemp, index)
                                                                setUpdateYear(updateYear+1)
                                                            }
                                                        }}/>
                                                        <FontAwesomeIcon icon={faCaretRight} className="reorder down" onClick={(e) => {
                                                            if(index + 1 < yearStartTemp.length){
                                                                Down_start(yearStartTemp, index)
                                                                setUpdateYear(updateYear+1)
                                                            }
                                                        }}/>                                        
                                                    </div>
                                                </div>
                                    )})}
                                </div>

                    <hr className="solid"></hr>
                    <br/>
                    <div>
                            <div className="home_temp">
                                <div className="thumbnail_stack" style={{left: '60px', top: '50px'}}>
                                </div>
                                <div className="thumbnail_stack" style={{left: '33px', top: '27px'}}>
                                </div>                                 
                                <div className="thumbnail_stack" style={{left: '6px', top: '4px'}}>
                                    <p style={{fontWeight: '500', fontSize: '25px'}}>Monthly <br/> Templates</p>
                                    <FontAwesomeIcon icon={faLayerGroup} className="enter_stack" onClick={() => {setLevel(2)}}/>
                                </div>
                                <div className="order"><p>{yearStartTemp.length + 1}</p></div>                                                                 
                            </div>
                    </div>
                    <br/>
                    <hr className="solid"></hr>
                    <br/>

                    <h2> Year End Templates </h2>
                    <div className="home_select_list">
                                    {yearEndTemp.map((temp, index) => {
                                        return(
                                                <div key={[index, updateYear]}>
                                                    <div className="home_temp">
                                                        <div className="thumbnail">
                                                        </div>
                                                        <div className="order"><p>{yearStartTemp.length + index + 2}</p></div>
                                                        <div className="home_design_details">
                                                            <p> Title: {temp[1].title} </p>
                                                            <p> Layout: {temp[1].layout}</p>
                                                            <p> Tag: {temp[1].tag}</p>
                                                        </div>
                                                        <FontAwesomeIcon icon={faCaretLeft} className="reorder up" onClick={(e) => {
                                                            if(index - 1 >= 0){
                                                                Up_end(yearEndTemp, index)
                                                                setUpdateYear(updateYear+1)
                                                            }
                                                        }}/>
                                                        <FontAwesomeIcon icon={faCaretRight} className="reorder down" onClick={(e) => {
                                                            if(index + 1 < yearEndTemp.length){
                                                                Down_end(yearEndTemp, index)
                                                                setUpdateYear(updateYear+1)
                                                            }
                                                        }}/>                                        
                                                    </div>
                                                </div>
                                    )})}
                                </div>
                    </div>
                    </div>
                </div>
                )
                
            }

            //month level
            if(level === 2){
                var i = 1
                var j = -1
                monthStartTemp.map((temp, index) => {
                    temp[1].order = i
                    i = i+1
                })
                monthEndTemp.map((temp, index) => {
                    temp[1].order = j
                    j = j-1
                })
                return (
                    <div className="home_main">
                        <div className="home_main_header">
                            <div className="home_main_header_title">Create journal: reoder templates</div>
                            <button className="home_main_header_new" onClick={()=> {setLevel(1)}}>Back</button>
                        </div>
                        <div className="home_main_list">
                            <div className="create_form">
                            <h2> Month Start Templates </h2>
                            <div className="home_select_list">
                                {monthStartTemp.map((temp, index) => {
                                            return(
                                                    <div key={[index, updateYear]}>
                                                        <div className="home_temp">
                                                            <div className="thumbnail">
                                                            </div>
                                                            <div className="order"><p>{index + 1}</p></div>
                                                            <div className="home_design_details">
                                                                <p> Title: {temp[1].title} </p>
                                                                <p> Layout: {temp[1].layout}</p>
                                                                <p> Tag: {temp[1].tag}</p>
                                                            </div>
                                                            <FontAwesomeIcon icon={faCaretLeft} className="reorder up" onClick={(e) => {
                                                                if(index - 1 >= 0){
                                                                    Up_start(monthStartTemp, index)
                                                                    setUpdateMonth(updateMonth+1)
                                                                }
                                                            }}/>
                                                            <FontAwesomeIcon icon={faCaretRight} className="reorder down" onClick={(e) => {
                                                                if(index + 1 < monthStartTemp.length){
                                                                    Down_start(monthStartTemp, index)
                                                                    setUpdateMonth(updateMonth+1)
                                                                }
                                                            }}/>                                        
                                                        </div>
                                                    </div>
                                        )})}
                            </div>

                    <hr className="solid"></hr>
                    <br/>
                    <div>
                            <div className="home_temp">
                                <div className="thumbnail_stack" style={{left: '60px', top: '50px'}}>
                                </div>
                                <div className="thumbnail_stack" style={{left: '33px', top: '27px'}}>
                                </div>                                 
                                <div className="thumbnail_stack" style={{left: '6px', top: '4px'}}>
                                    <p style={{fontWeight: '500', fontSize: '25px'}}>Weekly <br/> Templates</p>
                                    <FontAwesomeIcon icon={faLayerGroup} className="enter_stack" onClick={() => {setLevel(3)}}/>
                                </div>
                                <div className="order"><p>{monthStartTemp.length + 1}</p></div>                                                                 
                            </div>
                    </div>
                    <br/>
                    <hr className="solid"></hr>
                    <br/>

                    <h2> Month End Templates </h2>
                    <div className="home_select_list">
                        {monthEndTemp.map((temp, index) => {
                                            return(
                                                    <div key={[index, updateYear]}>
                                                        <div className="home_temp">
                                                            <div className="thumbnail">
                                                            </div>
                                                            <div className="order"><p>{monthStartTemp.length + index + 2}</p></div>
                                                            <div className="home_design_details">
                                                                <p> Title: {temp[1].title} </p>
                                                                <p> Layout: {temp[1].layout}</p>
                                                                <p> Tag: {temp[1].tag}</p>
                                                            </div>
                                                            <FontAwesomeIcon icon={faCaretLeft} className="reorder up" onClick={(e) => {
                                                                if(index - 1 >= 0){
                                                                    Up_end(monthEndTemp, index)
                                                                    setUpdateMonth(updateMonth+1)
                                                                }
                                                            }}/>
                                                            <FontAwesomeIcon icon={faCaretRight} className="reorder down" onClick={(e) => {
                                                                if(index + 1 < monthEndTemp.length){
                                                                    Down_end(monthEndTemp, index)
                                                                    setUpdateMonth(updateMonth+1)
                                                                }
                                                            }}/>                                        
                                                        </div>
                                                    </div>
                                        )})}
                    </div>
                </div>
                </div>
                </div>
                )
            }

            //week level
            if(level === 3){
                var i = 1
                var j = -1
                weekStartTemp.map((temp, index) => {
                    temp[1].order = i
                    i = i+1
                })
                weekEndTemp.map((temp, index) => {
                    temp[1].order = j
                    j = j-1
                })
                return (
                    <div className="home_main">
                        <div className="home_main_header">
                            <div className="home_main_header_title">Create journal: reoder templates</div>
                            <button className="home_main_header_new" onClick={()=> {setLevel(2)}}>Back</button>
                        </div>
                        <div className="home_main_list">
                            <div className="create_form">
                            <h2> Week Start Templates </h2>
                            <div className="home_select_list">
                                {weekStartTemp.map((temp, index) => {
                                                return(
                                                        <div key={[index, updateYear]}>
                                                            <div className="home_temp">
                                                                <div className="thumbnail">
                                                                </div>
                                                                <div className="order"><p>{index + 1}</p></div>
                                                                <div className="home_design_details">
                                                                    <p> Title: {temp[1].title} </p>
                                                                    <p> Layout: {temp[1].layout}</p>
                                                                    <p> Tag: {temp[1].tag}</p>
                                                                </div>
                                                                <FontAwesomeIcon icon={faCaretLeft} className="reorder up" onClick={(e) => {
                                                                    if(index - 1 >= 0){
                                                                        Up_start(weekStartTemp, index)
                                                                        setUpdateWeek(updateWeek+1)
                                                                    }
                                                                }}/>
                                                                <FontAwesomeIcon icon={faCaretRight} className="reorder down" onClick={(e) => {
                                                                    if(index + 1 < weekStartTemp.length){
                                                                        Down_start(weekStartTemp, index)
                                                                        setUpdateWeek(updateWeek+1)
                                                                    }
                                                                }}/>                                        
                                                            </div>
                                                        </div>
                                            )})}
                            </div>

                            <hr className="solid"></hr>
                            <br/>
                            <div>
                                    <div className="home_temp">
                                        <div className="thumbnail_stack" style={{left: '60px', top: '50px'}}>
                                        </div>
                                        <div className="thumbnail_stack" style={{left: '33px', top: '27px'}}>
                                        </div>                                 
                                        <div className="thumbnail_stack" style={{left: '6px', top: '4px'}}>
                                            <p style={{fontWeight: '500', fontSize: '25px'}}>Daily <br/> Templates</p>
                                            <FontAwesomeIcon icon={faLayerGroup} className="enter_stack" onClick={() => {setLevel(4)}}/>
                                        </div>
                                        <div className="order"><p>{weekStartTemp.length + 1}</p></div>                                                                 
                                    </div>
                            </div>
                            <br/>
                            <hr className="solid"></hr>
                            <br/>

                            <h2> Week End Templates </h2>
                            <div className="home_select_list">
                                {weekEndTemp.map((temp, index) => {
                                                return(
                                                        <div key={[index, updateYear]}>
                                                            <div className="home_temp">
                                                                <div className="thumbnail">
                                                                </div>
                                                                <div className="order"><p>{weekStartTemp.length + index + 2}</p></div>
                                                                <div className="home_design_details">
                                                                    <p> Title: {temp[1].title} </p>
                                                                    <p> Layout: {temp[1].layout}</p>
                                                                    <p> Tag: {temp[1].tag}</p>
                                                                </div>
                                                                <FontAwesomeIcon icon={faCaretLeft} className="reorder up" onClick={(e) => {
                                                                    if(index - 1 >= 0){
                                                                        Up_end(weekEndTemp, index)
                                                                        setUpdateWeek(updateWeek+1)
                                                                    }
                                                                }}/>
                                                                <FontAwesomeIcon icon={faCaretRight} className="reorder down" onClick={(e) => {
                                                                    if(index + 1 < weekEndTemp.length){
                                                                        Down_end(weekEndTemp, index)
                                                                        setUpdateWeek(updateWeek+1)
                                                                    }
                                                                }}/>                                        
                                                            </div>
                                                        </div>
                                            )})}
                            </div>
                    </div>
                    </div>
                    </div>

                )
            }

            //day level
            if(level === 4){
                var i = 1
                dailyTemp.map((temp, index) => {
                    temp[1].order = i
                    i = i+1
                })
                return (
                    <div className="home_main">
                        <div className="home_main_header">
                            <div className="home_main_header_title">Create journal: reoder templates</div>
                            <button className="home_main_header_new" onClick={()=> {setLevel(3)}}>Back</button>
                        </div>
                        <div className="home_main_list">
                            <div className="create_form">
                            <h2> Daily Templates </h2>
                            <div className="home_select_list">
                                {dailyTemp.map((temp, index) => {
                                    return(
                                        <div key={[index, updateYear]}>
                                            <div className="home_temp">
                                                <div className="thumbnail">
                                                </div>
                                                <div className="order"><p>{index + 1}</p></div>
                                                <div className="home_design_details">
                                                    <p> Title: {temp[1].title} </p>
                                                    <p> Layout: {temp[1].layout}</p>
                                                    <p> Tag: {temp[1].tag}</p>
                                                </div>
                                                    <FontAwesomeIcon icon={faCaretLeft} className="reorder up" onClick={(e) => {
                                                        if(index - 1 >= 0){
                                                            Up_start(dailyTemp, index)
                                                            setUpdateDay(updateDay+1)
                                                        }
                                                    }}/>
                                                    <FontAwesomeIcon icon={faCaretRight} className="reorder down" onClick={(e) => {
                                                        if(index + 1 < dailyTemp.length){
                                                            Down_start(dailyTemp, index)
                                                            setUpdateDay(updateDay+1)
                                                    }
                                                    }}/>                                        
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            <button style={{backgroundColor: "#F198AF", fontSize: "20px"}} onClick={() => {setStage(4)}}>Create Journal</button>
                    </div>
                    </div>
                    </div>
                )
            }
        }

        //choosing reference source for analytics
        if(stage === 4){
            return(
                <div className="home_main">
                    <div className="home_main_header">
                        <div className="home_main_header_title">Create journal: Reference</div>
                        <button className="home_main_header_new" onClick={()=> {setSection('journals')}}>Cancel</button>
                    </div>
                    <div className="home_main_list">
                        <div className="create_form">
                            <Reference yearStartTemp={yearStartTemp} yearEndTemp={yearEndTemp} monthStartTemp={monthStartTemp} monthEndTemp={monthEndTemp} weekStartTemp={weekStartTemp} weekEndTemp={weekEndTemp} dailyTemp={dailyTemp} designs={designs}/>
                            <button style={{backgroundColor: "#F198AF", fontSize: "20px"}}
                                onClick={() => {
                                    var error = false
                                    designs.map((design, index) => {
                                        if(design[4] == ''){error = true}
                                    })
                                    if(!error){createJournal()} else {alert("Some refered templates are missing")}
                                }}
                            > Create Journal </button>
                        </div>
                    </div>
                </div>
            )
        }
        
    }

}

export default JournalCreate