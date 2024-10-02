import { useLocation,useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"


const journalCreate = () => {
    const {state} = useLocation()
    const navigate = useNavigate();
    var [stage, setStage] = useState(1)
    var [level, setLevel] = useState(1)
    var [title, setTitle] = useState('')
    var [year, setYear] = useState(0)
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

    const Up_start = (temp, index) => {
        temp[index][1].order = temp[index][1].order - 1;
        temp[index - 1][1].order = temp[index - 1][1].order + 1;
        [temp[index], temp[index - 1]] = [temp[index - 1], temp[index]];
    }

    const Down_start = (temp, index) => {
        temp[index][1].order = temp[index][1].order + 1;
        temp[index + 1][1].order = temp[index + 1][1].order - 1;
        [temp[index], temp[index + 1]] = [temp[index + 1], temp[index]];
    }

    const Up_end = (temp, index) => {
        temp[index][1].order = temp[index][1].order + 1;
        temp[index - 1][1].order = temp[index - 1][1].order - 1;
        [temp[index], temp[index - 1]] = [temp[index - 1], temp[index]];
    }

    const Down_end = (temp, index) => {
        temp[index][1].order = temp[index][1].order - 1;
        temp[index + 1][1].order = temp[index + 1][1].order + 1;
        [temp[index], temp[index + 1]] = [temp[index + 1], temp[index]];
    }

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

        console.log(year)

        fetch("http://localhost:3000/createJournal/", {
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
            .then((data) => {console.log(data)})

    }


    useEffect(()=> {
        fetch("http://localhost:3000/loadTemplate/", {
            method: 'POST',
            body: JSON.stringify({userID: state.userID}),
            headers: {
                'Content-Type': 'application/json'
        }})
            .then((res) => {return res.json()})
            .then((data) => {
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
                setLoad(true)
            })
    }, [])


    if(load){
        if(stage === 1){
            return(
                <div>
                    <h2>Journal Title</h2>
                    <input onChange={(e) => {setTitle(e.target.value)}}/>
                    <h2>Year</h2>
                    <input type="number" onChange={(e) => {year = e.target.value, setYear(year), console.log(year)}}/>
                    <h2> Year Start Templates </h2>
                    {yearStartTemp.map((temp, index) => {
                        return(
                            <p key={[index, updateYear]} className="selected_temp"
                            onClick={() => {temp[0] = false, yearTemp.push(temp), yearStartTemp.splice(index, 1), setUpdateYear(updateYear + 1)}}> {temp[1].title} </p>
                        )
                    })}
                    {yearTemp.map((temp, index) => {
                        return(
                            <p key={[index, updateYear]}
                            onClick={() => {temp[0] = true, yearStartTemp.push(temp), yearTemp.splice(index, 1), setUpdateYear(updateYear + 1)}}> {temp[1].title} </p>
                        )
                    })}
    
                    <h2> Month Start Templates </h2>
                    {monthStartTemp.map((temp, index) => {
                        return(
                            <p key={[index, updateMonth]} className="selected_temp"
                            onClick={() => {temp[0] = false, monthTemp.push(temp), monthStartTemp.splice(index, 1), setUpdateMonth(updateMonth + 1)}}> {temp[1].title} </p>
                        )
                    })}
                    {monthTemp.map((temp, index) => {
                        return(
                            <p key={[index, updateMonth]}
                            onClick={() => {temp[0] = true, monthStartTemp.push(temp), monthTemp.splice(index, 1), setUpdateMonth(updateMonth + 1)}}> {temp[1].title} </p>
                        )
                    })}
    
                    <h2> Week Start Templates </h2>
                    {weekStartTemp.map((temp, index) => {
                        return(
                            <p key={[index, updateWeek]} className="selected_temp"
                            onClick={() => {temp[0] = false, weekTemp.push(temp), weekStartTemp.splice(index, 1), setUpdateWeek(updateWeek + 1)}}> {temp[1].title} </p>
                        )
                    })}
                    {weekTemp.map((temp, index) => {
                        return(
                            <p key={[index, updateWeek]}
                            onClick={() => {temp[0] = true, weekStartTemp.push(temp), weekTemp.splice(index, 1), setUpdateWeek(updateWeek + 1)}}> {temp[1].title} </p>
                        )
                    })}
    
                    <h2> Daily </h2>
                    <div>
                    {dailyTemp.map((temp, index) => {
                        return(
                            <p key={[index, updateDay]} className="selected_temp"
                            onClick={() => {temp[0] = false, daily.push(temp), dailyTemp.splice(index, 1), setUpdateDay(updateDay + 1)}}> {temp[1].title} </p>
                        )
                    })}
                    {daily.map((temp, index) => {
                        return(
                            <p key={[index, updateDay]}
                            onClick={() => {temp[0] = true, dailyTemp.push(temp), daily.splice(index, 1), setUpdateDay(updateDay + 1)}}> {temp[1].title} </p>
                        )
                    })}
                    </div>
        
                    <h2> Week End Templates </h2>
                    {weekEndTemp.map((temp, index) => {
                        return(
                            <p key={[index, updateWeek]} className="selected_temp"
                            onClick={() => {temp[0] = false, weekTemp.push(temp), weekEndTemp.splice(index, 1), setUpdateWeek(updateWeek + 1)}}> {temp[1].title} </p>
                        )
                    })}
                    {weekTemp.map((temp, index) => {
                        return(
                            <p key={[index, updateWeek]}
                            onClick={() => {temp[0] = true, weekEndTemp.push(temp), weekTemp.splice(index, 1), setUpdateWeek(updateWeek + 1)}}> {temp[1].title} </p>
                        )
                    })}
        
                    <h2> Month End Templates </h2>
                    {monthEndTemp.map((temp, index) => {
                        return(
                            <p key={[index, updateMonth]} className="selected_temp"
                            onClick={() => {temp[0] = false, monthTemp.push(temp), monthEndTemp.splice(index, 1), setUpdateMonth(updateMonth + 1)}}> {temp[1].title} </p>
                        )
                    })}
                    {monthTemp.map((temp, index) => {
                        return(
                            <p key={[index, updateMonth]}
                            onClick={() => {temp[0] = true, monthEndTemp.push(temp), monthTemp.splice(index, 1), setUpdateMonth(updateMonth + 1)}}> {temp[1].title} </p>
                        )
                    })}
        
                    <h2> Year End Templates </h2>
                    {yearEndTemp.map((temp, index) => {
                        return(
                            <p key={[index, updateYear]} className="selected_temp"
                            onClick={() => {temp[0] = false, yearTemp.push(temp), yearEndTemp.splice(index, 1), setUpdateYear(updateYear + 1)}}> {temp[1].title} </p>
                        )
                    })}
                    {yearTemp.map((temp, index) => {
                        return(
                            <p key={[index, updateYear]}
                            onClick={() => {temp[0] = true, yearEndTemp.push(temp), yearTemp.splice(index, 1), setUpdateYear(updateYear + 1)}}> {temp[1].title} </p>
                        )
                    })}
        
                    <h2> Blank </h2>
                    {blankTemp.map((temp, index) => {
                        return(
                            <p key={[index, updateBlank]} className="selected_temp"
                            onClick={() => {temp[0] = false, blank.push(temp), blankTemp.splice(index, 1), setUpdateBlank(updateBlank + 1)}}> {temp[1].title} </p>
                        )
                    })}
                    {blank.map((temp, index) => {
                        return(
                            <p key={[index, updateBlank]}
                            onClick={() => {
                                if(blankTemp.length === 0){
                                    temp[0] = true, blankTemp.push(temp), blank.splice(index, 1), setUpdateBlank(updateBlank + 1)
                                }}}> {temp[1].title} </p>
                        )
                    })}

                    <button onClick={()=> {
                        if( (yearStartTemp.length !==0) && (blankTemp.length !==0) &&
                        (dailyTemp.length !== 0 || weekStartTemp.length!==0 || weekEndTemp.length !== 0 || monthStartTemp.length!==0 || monthEndTemp.length!==0) 
                        //&& (blankTemp.length !== 0)
                        ){
                            setStage(2)
                        } else {
                            alert('Year start, a blank page and one of daily, weekly, monthly templates needed')
                        }}}> Name bookmarks </button>
        
        
                </div>
            )
        }

        if(stage === 2){
            return(
                <div>
                    <h2> Year Start Templates </h2>
                    {yearStartTemp.map((temp, index) => {
                        temp[1].tag = 'Auto'
                        return(
                            <div key={[index, updateYear]}>
                                <p> {temp[1].title} </p>
                                <input onChange={(e) => {temp[1].tag = e.target.value, console.log(temp)}} defaultValue={'Auto'}/>
                            </div>
                            
                        )
                    })}
    
                    <h2> Month Start Templates </h2>
                    {monthStartTemp.map((temp, index) => {
                        temp[1].tag = 'Auto'
                        return(
                            <div key={[index, updateMonth]}>
                                <p> {temp[1].title} </p>
                                <input onChange={(e) => {temp[1].tag = e.target.value}} defaultValue={'Auto'}/>
                            </div>
                            
                        )
                    })}
    
                    <h2> Week Start Templates </h2>
                    {weekStartTemp.map((temp, index) => {
                        temp[1].tag = 'Auto'
                        return(
                            <div key={[index, updateWeek]}>
                                <p> {temp[1].title} </p>
                                <input onChange={(e) => {temp[1].tag = e.target.value}} defaultValue={'Auto'}/>
                            </div>
                        )
                    })}
    
                    <h2> Daily </h2>
                    {dailyTemp.map((temp, index) => {
                        temp[1].tag = 'Auto'
                        return(
                            <div key={[index, updateDay]}>
                                <p> {temp[1].title} </p>
                                <input onChange={(e) => {temp[1].tag = e.target.value}} defaultValue={'Auto'}/>
                            </div>
                            
                        )
                    })}
        
                    <h2> Week End Templates </h2>
                    {weekEndTemp.map((temp, index) => {
                        temp[1].tag = 'Auto'
                        return(
                            <div key={[index, updateWeek]}>
                                <p> {temp[1].title} </p>
                                <input onChange={(e) => {temp[1].tag = e.target.value}} defaultValue={'Auto'}/>
                            </div>
                            
                        )
                    })}
        
                    <h2> Month End Templates </h2>
                    {monthEndTemp.map((temp, index) => {
                        temp[1].tag = 'Auto'
                        return(
                            <div key={[index, updateMonth]}>
                                <p> {temp[1].title} </p>
                                <input onChange={(e) => {temp[1].tag = e.target.value}} defaultValue={'Auto'}/>
                            </div>
                        )
                    })}
        
                    <h2> Year End Templates </h2>
                    {yearEndTemp.map((temp, index) => {
                        temp[1].tag = 'Auto'
                        return(
                            <div key={[index, updateYear]}>
                                <p> {temp[1].title} </p>
                                <input onChange={(e) => {temp[1].tag = e.target.value}} defaultValue={'Auto'}/>
                            </div>
                        )
                    })}

                    <button onClick={()=> {setStage(3)}}> Reorder pages </button>
        
        
                </div>
            )
        }

        if(stage === 3){
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
                    <div>
                    <h2> Year Start Templates </h2>
                    {yearStartTemp.map((temp, index) => {
                        return(
                            <div key={[index, updateYear]}>
                                <p> {temp[1].tag} </p>
                                <button onClick={(e) => {
                                    if(index - 1 >= 0){
                                        Up_start(yearStartTemp, index)
                                        setUpdateYear(updateYear+1)
                                    }
                                }}>Up</button>
                                <button onClick={(e) => {
                                    if(index + 1 < yearStartTemp.length){
                                        Down_start(yearStartTemp, index)
                                        setUpdateYear(updateYear+1)
                                    }
                                }}>Down</button>
                            </div>
                            
                        )
                    })}

                    <h3 onClick={() => {setLevel(2)}}>Monthly Templates here </h3>

                    <h2> Year End Templates </h2>
                    {yearEndTemp.map((temp, index) => {
                        return(
                            <div key={[index, updateYear]}>
                                <p> {temp[1].tag} </p>
                                <button onClick={(e) => {
                                    if(index - 1 >= 0){
                                        Up_end(yearEndTemp, index)
                                        setUpdateYear(updateYear+1)
                                    }
                                }}>Up</button>
                                <button onClick={(e) => {
                                    if(index + 1 < yearEndTemp.length){
                                        Down_end(yearEndTemp, index)
                                        setUpdateYear(updateYear+1)
                                    }
                                }}>Down</button>
                            </div>
                            
                        )
                    })}
                    </div>
                )
            }

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
                    <div>
                    <h2> Month Start Templates </h2>
                    {monthStartTemp.map((temp, index) => {
                        return(
                            <div key={[index, updateMonth]}>
                                <p> {temp[1].tag} </p>
                                <button onClick={(e) => {
                                    if(index - 1 >= 0){
                                        Up_start(monthStartTemp, index)
                                        setUpdateMonth(updateMonth+1)
                                    }
                                }}>Up</button>
                                <button onClick={(e) => {
                                    if(index + 1 < monthStartTemp.length){
                                        Down_start(monthStartTemp, index)
                                        setUpdateMonth(updateMonth+1)
                                    }
                                }}>Down</button>
                            </div>
                            
                        )
                    })}

                    <h3 onClick={() => {setLevel(3)}}>Weekly Templates here </h3>

                    <h2> Month End Templates </h2>
                    {monthEndTemp.map((temp, index) => {
                        return(
                            <div key={[index, updateMonth]}>
                                <p> {temp[1].tag} </p>
                                <button onClick={(e) => {
                                    if(index - 1 >= 0){
                                        Up_end(monthEndTemp, index)
                                        setUpdateMonth(updateMonth+1)
                                    }
                                }}>Up</button>
                                <button onClick={(e) => {
                                    if(index + 1 < monthEndTemp.length){
                                        Down_end(monthEndTemp, index)
                                        setUpdateMonth(updateMonth+1)
                                    }
                                }}>Down</button>
                            </div>
                            
                        )
                    })}
                    </div>
                )
            }

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
                    <div>
                    <h2> Week Start Templates </h2>
                    {weekStartTemp.map((temp, index) => {
                        return(
                            <div key={[index, updateWeek]}>
                                <p> {temp[1].tag} </p>
                                <button onClick={(e) => {
                                    if(index - 1 >= 0){
                                        Up_start(weekStartTemp, index)
                                        setUpdateWeek(updateWeek+1)
                                    }
                                }}>Up</button>
                                <button onClick={(e) => {
                                    if(index + 1 < weekStartTemp.length){
                                        Down_start(weekStartTemp, index)
                                        setUpdateWeek(updateWeek+1)
                                    }
                                }}>Down</button>
                            </div>
                            
                        )
                    })}

                    <h3 onClick={() => {setLevel(4)}}>Daily Templates here </h3>

                    <h2> Week End Templates </h2>
                    {weekEndTemp.map((temp, index) => {
                        return(
                            <div key={[index, updateWeek]}>
                                <p> {temp[1].tag} </p>
                                <button onClick={(e) => {
                                    if(index - 1 >= 0){
                                        Up_end(weekEndTemp, index)
                                        setUpdateWeek(updateWeek+1)
                                    }
                                }}>Up</button>
                                <button onClick={(e) => {
                                    if(index + 1 < weekEndTemp.length){
                                        Down_end(weekEndTemp, index)
                                        setUpdateWeek(updateWeek+1)
                                    }
                                }}>Down</button>
                            </div>
                            
                        )
                    })}
                    </div>
                )
            }

            if(level === 4){
                var i = 1
                dailyTemp.map((temp, index) => {
                    temp[1].order = i
                    i = i+1
                })
                return (
                    <div>
                    <h2> Daily Templates </h2>
                    {dailyTemp.map((temp, index) => {
                        return(
                            <div key={[index, updateDay]}>
                                <p> {temp[1].tag} </p>
                                <button onClick={(e) => {
                                    if(index - 1 >= 0){
                                        Up_start(dailyTemp, index)
                                        setUpdateDay(updateDay+1)
                                    }
                                }}>Up</button>
                                <button onClick={(e) => {
                                    if(index + 1 < dailyTemp.length){
                                        Down_start(dailyTemp, index)
                                        setUpdateDay(updateDay+1)
                                    }
                                }}>Down</button>
                            </div>
                            
                        )
                    })}

                    <button onClick={createJournal}>Penetrate cloud storage</button>

                    </div>
                )
            }
        }
        
    }

}

export default journalCreate