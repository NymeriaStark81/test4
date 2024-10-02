const journal = require("../models/journalModel")

class authCreateJournal {

    /*load_template = async (req, res) => {
        
        try{
            const templates=await template.find({userID: req.body.userID})
            if(templates){
                res.json(templates)
            }
        }
        catch(e){
            res.json("fail")
        }
    
    };*/

    create_journal = async (req, res) => {
            try{
                var name

                //populate date array
                var calendar = []
                var start
                var d = new Date(req.body.year, 0, 1)
                if(d.getDay() !== 1){
                    if(d.getDay() === 0){
                        start = -5
                    } else {
                        start = -(d.getDay()-2)
                    }                    
                }

                d = new Date(req.body.year, 0, start)
                for(let i = 1; d.getFullYear() < req.body.year; i++){
                    calendar.push(d)
                    d = new Date(req.body.year, 0, (start + i))
                }
                
                d = new Date(req.body.year, 0, 1)
                for(let i=2; d.getFullYear() == req.body.year; i++){
                    calendar.push(d)
                    d = new Date(req.body.year, 0, i)
                }

                
                
                //declare tracking variables
                var page = 0
                var i = 0
                var week = 1
                var month = 0
                var start_month = false
                var start_week = false
                var bmDaily = []
                var bmWeek = []
                var bmMonth = []
                var bmYear = []
                var tagMonth = []
                var pages = []

                
                const push = (temp) => {
                    if(temp.length !== 0){
                        if(temp[0].temp_type === "daily"){
                            for(let k = 0; k < temp.length; k++){
                                //if page layout is on the wrong side, push a blank fill template
                                if(((temp[k].layout == "right") && (page%2==1)) || ((temp[k].layout == "left") && (page%2 == 0))) {
                                    pages.push({
                                        ...req.body.blankTemp[0],
                                        page: page
                                    })
                                    console.log(pages[pages.length - 1])
                                    page = page + 1
                                }

                                //push template
                                pages.push({
                                    ...temp[k],
                                    page: page,
                                    day: calendar[i].getDay(),
                                    date: calendar[i].getDate(),
                                    week: week,
                                    month: calendar[i].getMonth(),
                                    year: calendar[i].getFullYear()
                                })

                                //if template is the first of the day, add bookmark reference
                                if(temp[k].order == 1){
                                    bmDaily.push({
                                        date: calendar[i].getDate(),
                                        week: week,
                                        month: calendar[i].getMonth(),
                                        year: calendar[i].getFullYear(),
                                        page: page
                                    })

                                    //if template is first of the month, add reference to month tag
                                    if((start_month == false) && (start_week == false)){
                                        tagMonth.push([calendar[i].getMonth(), page])
                                        start_month = true
                                        start_week = true
                                    }
                                }

                                page = page + 1
                            }
                        } else if (temp[0].temp_type === "weekly"){
                            for(let k = 0; k < temp.length; k++){
                                //if page layout is on the wrong side, push a blank fill template
                                if(((temp[k].layout == "right") && (page%2==1)) || ((temp[k].layout == "left") && (page%2 == 0))) {
                                    pages.push({
                                        ...req.body.blankTemp[0],
                                        page: page
                                        
                                    })
                                    page = page + 1
                                }

                                //push template
                                pages.push({
                                    ...temp[k],
                                    page: page,
                                    week: week,
                                    month: month
                                })

                                //generate name tag
                                if(temp[k].tag == 'Auto'){
                                    name = 'Week ' + week
                                } else {
                                    name = temp[k].tag
                                }

                                //add bookmark reference
                                bmWeek.push({
                                    week: week,
                                    month: month,
                                    order: temp[k].order,
                                    name: name,
                                    page: page

                                })

                                //if template is first of the month, add reference to month tag
                                if((start_month == false) && (temp[k].order == 1)){
                                    tagMonth.push([month, page])
                                    start_month = true
                                    start_week = true
                                }

                                page = page + 1
                            }
                            
                        } else if (temp[0].temp_type === "monthly"){
                            for(let k = 0; k < temp.length; k++){
                                //if page layout is on the wrong side, push a blank fill template
                                if(((temp[k].layout == "right") && (page%2==1)) || ((temp[k].layout == "left") && (page%2 == 0))) {
                                    pages.push({
                                        ...req.body.blankTemp[0],
                                        page: page
                                    })
                                    page = page + 1
                                }

                                //push template
                                pages.push({
                                    ...temp[k],
                                    page: page,
                                    month: month
                                })

                                //generate name tag
                                if(temp[k].tag == 'Auto'){
                                    switch (month) {
                                        case 0:
                                            name = 'January'
                                            break;
                                        case 1:
                                            name = "February"
                                            break;
                                        case 2:
                                            name = "March"
                                            break;
                                        case 3:
                                            name = "April"
                                            break;
                                        case 4:
                                            name = "May"
                                            break;
                                        case 5:
                                            name = "June"
                                            break;
                                        case 6:
                                            name = "July"
                                            break;
                                        case 7:
                                            name = "August"
                                            break;
                                        case 8:
                                            name = "September"
                                            break;
                                        case 9:
                                            name = "October"
                                            break;
                                        case 10: 
                                            name = "November"
                                            break;
                                        case 11:
                                            name = "December"
                                            break;
                                    }
                                } else {
                                    name = temp[k].tag
                                }

                                //add bookmark reference
                                bmMonth.push({
                                    month: month,
                                    order: temp[k].order,
                                    name: name,
                                    page: page

                                })

                                //add reference to month tag
                                if(temp[k].order == 1){
                                    tagMonth.push([month, page])
                                    start_month = true
                                }

                                page = page + 1
                            }
                        } else {
                            for(let k = 0; k < temp.length; k++){
                                //if page layout is on the wrong side, push a blank fill template
                                if(((temp[k].layout == "right") && (page%2==1)) || ((temp[k].layout == "left") && (page%2 == 0))) {
                                    pages.push({
                                        ...req.body.blankTemp[0],
                                        page: page
                                    })
                                    page = page + 1
                                }
                                
                                //push template
                                pages.push({
                                    ...temp[k],
                                    page: page
                                })

                                //generate name tag
                                if(temp[k].tag == 'Auto'){
                                    name = calendar[i].getFullYear()
                                } else {
                                    name = temp[k].tag
                                }

                                //add bookmark reference
                                bmYear.push({
                                    order: temp[k].order,
                                    name: name,
                                    page: page

                                })

                                page = page + 1
                            }
                        }
                    }
                }

                
                //POPULATE JOURNAL
                //year
                push(req.body.yearStartTemp)
                do{
                    //Month
                    push(req.body.monthStartTemp)

                    //Week
                    do {
                        push(req.body.weekStartTemp)

                        //Daily
                        do {
                            push(req.body.dailyTemp);
                            i = i + 1;
                        }  while ((i < calendar.length) && (calendar[i].getDay() != 1));

                        push(req.body.weekEndTemp)
                        week = week + 1
                    } while ((i < calendar.length) && (calendar[i].getMonth() <= month));
    
                    push(req.body.monthEndTemp);
                    month = month + 1
                    start_month = false
                    start_week = false
                } while (i < calendar.length);
                push(req.body.yearEndTemp)

                //Append bookmarks & tags
                
            
                console.log(pages)
                console.log('database penetrated ...')
                console.log('user data downloaded ...')


                const result = await journal.create({
                    userID: req.body.userID,
                    journal_title: req.body.journal_title,
                    year: req.body.year,
                    pages: pages,
                    bmDaily: bmDaily,
                    bmWeek: bmWeek,
                    bmMonth: bmMonth,
                    bmYear: bmYear,
                    tagMonth: tagMonth
                });
                res.json(result._id)
            }
            catch(e){
                res.json("fail")
            }
        
        };
       
        
}

module.exports = new authCreateJournal()