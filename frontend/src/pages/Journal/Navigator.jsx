import React from "react"

const Navigator = ({mois, bmDaily, bmWeek, bmMonth, gauche, setGauche, droite, setDroite, mainView, setMainView, updatePage, setUpdatePage}) => {
    var entered_m_start = false
    var entered_m_end = false
    var d = 0
    var entered_d = false
    var preweek = 0
    var current_bmWeek = 0
    const display = []

    //APPENDING BOOKMARKS IN THE RIGHT ORDER
    for(let m = 0; m < bmMonth.length; m++){
        if (bmMonth[m].order > 0 && bmMonth[m].month == mois){
            display.push(bmMonth[m])
            entered_m_start = true
        }
        if((entered_m_start) && (bmMonth[m].order < 0)){
            break;
        }
    }

    for(current_bmWeek; current_bmWeek < bmWeek.length; current_bmWeek++){
        if(bmWeek[current_bmWeek].month != mois){
            continue;
        } else {
            break;
        }
    }

    if(bmWeek.length != 0){
        do {
            if(bmWeek[current_bmWeek].week != preweek){
                preweek = bmWeek[current_bmWeek].week
            }
            
            for(current_bmWeek; current_bmWeek < bmWeek.length ; current_bmWeek++){
                if(bmWeek[current_bmWeek].order > 0 && bmWeek[current_bmWeek].week == preweek && bmWeek[current_bmWeek].month == mois){
                    display.push(bmWeek[current_bmWeek])
                } else {
                    break;
                }
                
            }

            for(d; d< bmDaily.length; d++){
                if(bmDaily[d].week == preweek){
                    display.push(bmDaily[d])
                    entered_d = true
                }
                if((entered_d) && bmDaily[d].week != preweek){
                    break;
                }
            }
            
            for(current_bmWeek; current_bmWeek < bmWeek.length; current_bmWeek++){
                if(bmWeek[current_bmWeek].week == preweek){
                    display.push(bmWeek[current_bmWeek])
                } else {
                    break;
                }
            }

            if(current_bmWeek >= bmWeek.length){
                break;
            }

        } while (bmWeek[current_bmWeek].month == mois)
    } else {
        for(d; d< bmDaily.length; d++){
            if(bmDaily[d].month == mois){
                display.push(bmDaily[d])
            }
        }
    }

    for(let m = 0; m < bmMonth.length; m++){
        if (bmMonth[m].order < 0 && bmMonth[m].month == mois){
            display.push(bmMonth[m])
            entered_m_end = true
        }

        if((entered_m_end) && (bmMonth[m].order > 0)){
            break;
        }
    }


    return (
        <div>
            {display.map((i, index) => {
                    var colour

                    //colour of bookmark
                    switch(index%4) {
                        case 0:
                            colour = '#C2C3F3'
                            break;
                        case 1:
                            colour = '#F8C3AF'
                            break;
                        case 2:
                            colour = '#FBD1D3'
                            break;
                        case 3:
                            colour = '#FFEAE5'
                            break;
                          
                    }
                    
                    //determine if this bookmark is selected
                    var select
                    if((index + 1 < display.length) && (i.page <= mainView) && (mainView < display[index+1].page)){
                        select = true
                    } else if ((index + 1 >= display.length) && (i.page <= mainView)) {
                        select = true
                    } else {
                        select = false
                    }

                    return(
                        <div key={[index, updatePage]} className={(select==true) ? "bookmark-right bookmark-selected" : "bookmark-right"}
                            title={i.page}
                            style={{backgroundColor: colour}}
                            onClick = {() => {
                                //change page when bookmark selected
                                if((gauche != i.page) && (droite != i.page)){
                                    if(i.page%2 == 1){
                                        setMainView(i.page), setGauche(i.page), setDroite(i.page + 1)
                                    } else {
                                        setMainView(i.page), setGauche(i.page-1), setDroite(i.page)
                                    }
                                } else {
                                    setMainView(i.page)
                                    setUpdatePage(updatePage + 1)
                                }
                            }}
                        >
                            <div className="tag-right">{Object.hasOwn(i, 'name') ? i.name : i.date}</div>
                        </div>
                    )
                })

                }

        </div>
    )
}

export default Navigator