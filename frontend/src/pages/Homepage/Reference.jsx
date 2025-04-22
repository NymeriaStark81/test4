import React, { useState, useEffect } from "react"

const Reference = ({yearStartTemp, yearEndTemp, monthStartTemp, monthEndTemp, weekStartTemp, weekEndTemp, dailyTemp, designs}) => { 
    const sets = [yearStartTemp, yearEndTemp, monthStartTemp, monthEndTemp, weekStartTemp, weekEndTemp]
    const linked = []
    var [update, setUpdate] = useState(0)
    var [flag, setFlag] = useState(false)
    


    const updateRef = (temp, design) => {
        if(design[4] == temp._id){
            design[4] = ''
        } else {
            design[4] = temp._id}

        const link = (tempSet, design, add) => {
            for(let i = 0; i < tempSet.length; i++){
                if(design[0]._id == tempSet[i][1]._id){
                    tempSet[i][1].elements.map((el, j) => {
                        if(el.type == 'analys'){
                            if(design[5] != undefined){
                                if ((el.parentType != 'task_analys') && (el.parentType == design[1] + '_analys') && (el.tag[0] == design[5]) && el.ref_type == design[3][0].temp_type){
                                    el.reference = design[4]
                                    add = false
                                }
                            } else {
                                if(el.parentType == 'task_analys' && design[1] == 'task' && el.ref_type == design[3][0].temp_type){
                                    el.reference = design[4]
                                    add = false
                                }
                            }
                        }
                    })
                }
                if(!add){
                    break;
                }
            }
        }

        const linking = (tempSet0, tempSet1, design, add, link) => {

            link(tempSet0, design, add)

            if(add){
                link(tempSet1, design, add)
            }

        }

        var add = true
        if(design[0].temp_type == 'yearly'){
            linking(yearStartTemp, yearEndTemp, design, add, link)

        } else if (design[0].temp_type == 'monthly'){
            linking(monthStartTemp, monthEndTemp, design, add, link)

        } else if (design[0].temp_type == 'weekly'){
            linking(weekStartTemp, weekEndTemp, design, add, link)

        } else if (design[0].temp_type == 'daily'){
            link(dailyTemp, design, add)
        }
        
    }

    useEffect(() => {
        sets.map((set, a) => {
            set.map((template, b) => {
                
                for(let c=0; c<template[1].elements.length; c++){
                    if(template[1].elements[c].type == 'analys'){
                        var references = []
                        const sources = []
    
                        var add = true
                        var elID
                        if(template[1].elements[c].parentID == undefined){
                            elID = template[1].elements[c].id
                        } else {
                            elID = template[1].elements[c].parentID
                        }
                        linked.map((link, d) => {
                            if((link[0] == template[1]._id)&&(link[1] == elID)){
                                add = false
                            }
                        })
    
                        if(add){
                            linked.push([template[1]._id, template[1].elements[c].parentID])
    
                            var analysType
                            if(template[1].elements[c].parentType == 'mood_analys' || template[1].elements[c].parentType == 'task_analys'){
                                analysType = template[1].elements[c].parentType.substring(0,4)
                            } else {
                                analysType = 'habit'
                            }
    
                            if(template[1].elements[c].ref_type == 'daily'){
                                references = dailyTemp
                            } else if (template[1].elements[c].ref_type == 'weekly'){
                                references = [...weekStartTemp, ...weekEndTemp]
                            } else if (template[1].elements[c].ref_type == 'monthly'){
                                references = [...monthStartTemp, ...monthEndTemp]
                            } else if (template[1].elements[c].ref_type == 'yearly'){
                                references = [...yearStartTemp, ...yearEndTemp]
                            }
    
                            references.map((ref, e) => {
                                var push = false
    
                                for(let f = 0; f<ref[1].elements.length; f++){
                                    if((template[1].elements[c].parentType == 'mood_analys' && ref[1].elements[f].type == 'mood') || (template[1].elements[c].parentType == 'habit_analys' && ref[1].elements[f].type == 'icon')){
                                        if(ref[1].elements[f].tag[0] == template[1].elements[c].tag[0]){
                                            push = true
                                        }
                                    } else if ((template[1].elements[c].parentType == 'task_analys' && ref[1].elements[f].type == 'todo')){
                                        push = true
                                    }
                                }
    
                                if(push){
                                    sources.push(ref[1])
                                }
    
                            })
    
                            if(template[1].elements[c].parentType != 'task_analys'){
                                designs.push([template[1], analysType, template[1].elements[c].ref_type, sources, '', template[1].elements[c].tag[0]])
                            } else {
                                designs.push([template[1], analysType, template[1].elements[c].ref_type, sources, ''])
                            }
                            
    
                        }
                    }
                }
            })
        })
        setFlag(true)
    }, [])
    
    
    if(flag){
    return(
        designs.map((design, index) => {
            return(
                <div key={index}>
                    <h2> Reflecting template </h2>
                    <div className="home_select_list">
                        <div>
                        <div className="home_temp">
                            <div className="thumbnail">
                            </div>
                            <div className="home_design_details">
                                <p> Title: {design[0].title} </p>
                                <p> Analytic type: {design[1]}</p>
                                <p> Reference type: {design[2]}</p>
                            </div>                                  
                        </div>
                        </div>
                    </div>

                    <h2> Source templates </h2>
                    <div className="home_select_list">
                    {design[3].map((temp, i) => {
                        return(
                            <div key={[i, update]} className={temp._id === design[4] ? 'home_design selected_temp' : 'home_design'}
                                onClick={() => {updateRef(temp, design); setUpdate(update + 1)}
                                }
                            >
                                <div className="thumbnail">
                                </div>
                                <div className="home_design_details">
                                    <p> Title: {temp.title} </p>
                                </div>                                  
                            </div>
                        )
                    })}
                    </div>
                </div>
            )
        })
    )
    }
    
}

export default Reference