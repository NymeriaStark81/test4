const journal = require("../models/journalModel")

class authJournal {

    load_journal = async (req, res) => {
        
        try{
            const journals=await journal.find({userID: req.body.userID})
            if(journals){
                res.json(journals)
            }
        }
        catch(e){
            res.json("fail")
        }
    
    };

    delete_journal = async(req, res) => {
        try{
            const update=await journal.deleteOne({_id: req.body.id})
            const journals=await journal.find({userID: req.body.userID})
            if(journals){
                res.json(journals)
            }
        }
        catch(e){
            res.json("fail")
        }
    }

    produce_journal = async (req, res) => {
            try{
                var name

                //populate date array
                var calendar = []
                var start = 1
                var d = new Date(req.body.year, 0, 1)
                if((req.body.weekStartTemp.length != 0) && (req.body.weekEndTemp.length !=0)){
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
                }
                
                
                d = new Date(req.body.year, 0, 1)
                for(let i=2; d.getFullYear() == req.body.year; i++){
                    calendar.push(d)
                    d = new Date(req.body.year, 0, i)
                }
                //console.log('calendar:', calendar) 

                
                
                //declare tracking variables
                var page = 0
                var i = 0
                var week = 1
                var month = 0
                var start_month = false
                var start_week = false
                var month_start
                var month_end
                var week_start
                var week_end
                var bmDaily = []
                var bmWeek = []
                var bmMonth = []
                var bmYear = []
                var tagMonth = []
                var pages = []
                
                const push = (temp) => {
                    if(temp.length !== 0){
                        if(temp[0].temp_type === "daily"){
                            console.log('daily')
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
                                    day: calendar[i].getDay(),
                                    date: calendar[i].getDate(),
                                    week: week,
                                    month: calendar[i].getMonth(),
                                    year: calendar[i].getFullYear(),
                                    week_start: week_start,
                                    week_end: week_end,
                                    month_start: month_start,
                                    month_end: month_end
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
                                        if(calendar[i].getFullYear() == req.body.year){
                                            tagMonth.push([calendar[i].getMonth(), page])
                                        } else {
                                            tagMonth.push([0, page])
                                        }
                                        start_month = true
                                        start_week = true
                                    }
                                }
                                page = page + 1
                            }
                        } else if (temp[0].temp_type === "weekly"){
                            console.log('weekly')
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
                                    month: month,
                                    week_start: week_start,
                                    week_end: week_end,
                                    month_start: month_start,
                                    month_end: month_end
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
                                var tagged = false
                                if((start_month == false) /*&& (temp[k].order == 1)*/){
                                    tagMonth.map((m, index) => {
                                        if(m[0] == month){
                                            tagged = true
                                        }
                                    })
                                    if(!tagged){
                                        tagMonth.push([month, page])
                                        start_month = true
                                        start_week = true
                                    }
                                }

                                page = page + 1
                            }
                            
                        } else if (temp[0].temp_type === "monthly"){
                            console.log('monthly')
                            for(let k = 0; k < temp.length; k++){
                                //if page layout is on the wrong side, push a blank fill template
                                if(((temp[k].layout == "right") && (page%2==1)) || ((temp[k].layout == "left") && (page%2 == 0))) {
                                    pages.push({
                                        ...req.body.blankTemp[0],
                                        page: page
                                    })
                                    page = page + 1
                                }

                                //delete 29, 30, 31
                                var limit = month_end.getDate()
                                var toDelete = []
                                for(let a = 0; a<temp.length; a++){
                                    temp[a].elements.map((el, index) => {
                                        if((el.parentType == 'habit' || el.parentType == 'mood') && (el.day > limit)){
                                            toDelete.unshift(index)
                                        } else if ((el.type == 'calendar' || el.type == 'date' || el.type == 'todo' || el.type == 'button') && (el.order > limit)){
                                            toDelete.unshift(index)
                                        }
                                    })
                                    toDelete.map((del, i) => {
                                        temp[a].elements.splice(del, 1)
                                    })
                                }

                                //push template
                                pages.push({
                                    ...temp[k],
                                    page: page,
                                    month: month,
                                    month_start: month_start,
                                    month_end: month_end
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
                                /*if(temp[k].order == 1){
                                    tagMonth.push([month, page])
                                    start_month = true
                                }*/
                                var tagged = false
                                tagMonth.map((m, index) => {
                                    if(m[0] == month){
                                        tagged = true
                                    }
                                })
                                if(!tagged){
                                    tagMonth.push([month, page])
                                    start_month = true
                                }


                                page = page + 1
                            }
                        } else {
                            console.log('yearly')
                            for(let k = 0; k < temp.length; k++){
                                //if page layout is on the wrong side, push a blank fill template
                                console.log('a')
                                if(((temp[k].layout == "right") && (page%2==1)) || ((temp[k].layout == "left") && (page%2 == 0))) {
                                    pages.push({
                                        ...req.body.blankTemp[0],
                                        page: page
                                    })
                                    page = page + 1
                                }
                                
                                console.log('b')
                                //Delete 29, 30, 31
                                var limit
                                var toDelete = []
                                var end
                                for(let mois = 0; mois < 12; mois ++){
                                    toDelete = []
                                    end = new Date(req.body.year, mois + 1, 0)
                                    limit = end.getDate()
                                    console.log('c')
                                    for(let b = 0; b < temp.length; b++){
                                        console.log('d')
                                        try{
                                            temp[b].elements.map((el, c) => {
                                                    if((el.type == 'icon') && (el.month[0] == mois) && (el.day > limit)){
                                                        toDelete.unshift(c)
                                                    }
                                                })
                                            toDelete.map((del, d) => {
                                                template.elements.splice(del, 1)
                                            })
                                        } catch(error){
                                            console.log(error)
                                        }
                                        
                                    }
                                    

                                }

                                
                                //push template
                                pages.push({
                                    ...temp[k],
                                    page: page
                                })

                                //generate name tag
                                if(temp[k].tag == 'Auto'){  
                                    /*if(i === calendar.length){
                                        name = calendar[i - 1].getFullYear()
                                    } else {
                                        name = calendar[i].getFullYear()
                                    }*/
                                    name = req.body.year
                                    
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
                console.log('1')
                if((req.body.weekStartTemp.length == 0) && (req.body.weekEndTemp.length ==0)){
                    //NO WEEKLY TEMPLATES

                    console.log('2')
                    push(req.body.yearStartTemp)
                    do{
                        //Month
                        month_start = new Date(req.body.year, calendar[i].getMonth(), calendar[i].getDate())
                        month_end = new Date(req.body.year, calendar[i].getMonth() + 1, 0)
                        push(req.body.monthStartTemp)
                        console.log('3')

                        //Daily
                        do {
                            console.log('4')
                            push(req.body.dailyTemp);
                            i = i + 1;
                        }  while ((i < calendar.length) && (calendar[i].getMonth() == month));
                            
                        console.log('5')
                        push(req.body.monthEndTemp);
                        month = month + 1
                        start_month = false
                        start_week = false
                    } while (i < calendar.length);
                    push(req.body.yearEndTemp)
                    console.log('6')
                } else {
                    //WITH WEEKLY TEMPLATES

                    console.log('7')
                    push(req.body.yearStartTemp)
                    do{
                        //Month
                        console.log('8')
                        month_start = new Date(req.body.year, calendar[i].getMonth(), calendar[i].getDate())
                        month_end = new Date(req.body.year, calendar[i].getMonth() + 1, 0)
                        push(req.body.monthStartTemp)

                        //Week
                        do {
                            console.log('9')
                            week_start = new Date(req.body.year, calendar[i].getMonth(), calendar[i].getDate())
                            week_end = new Date(req.body.year, calendar[i].getMonth(), calendar[i].getDate() + 6)
                            push(req.body.weekStartTemp)

                            //Daily
                            do {
                                console.log('10')
                                push(req.body.dailyTemp);
                                i = i + 1;
                            }  while ((i < calendar.length) && (calendar[i].getDay() != 1));
                            
                            console.log('11')
                            push(req.body.weekEndTemp)
                            week = week + 1
                        } while ((i < calendar.length) && (calendar[i].getMonth() <= month));
                        
                        console.log('12')
                        push(req.body.monthEndTemp);
                        month = month + 1
                        start_month = false
                        start_week = false
                    } while (i < calendar.length);
                    push(req.body.yearEndTemp)
                }
                console.log('13')

                const obj = {
                    userID: req.body.userID,
                    journal_title: req.body.journal_title,
                    year: req.body.year,
                    pages: pages,
                    bmDaily: bmDaily,
                    bmWeek: bmWeek,
                    bmMonth: bmMonth,
                    bmYear: bmYear,
                    tagMonth: tagMonth
                }
                console.log('14')

                /*const roughObjSize = JSON.stringify(obj).length;
                console.log(roughObjSize)*/

                res.json(obj)
            }
            catch(e){
                res.json("fail")
            }
        
        };

    create_journal = async (req, res) => {
        try{
            
            const result = await journal.create({
                userID: req.body.userID,
                journal_title: req.body.journal_title,
                year: req.body.year,
                pages: req.body.pages,
                bmDaily: req.body.bmDaily,
                bmWeek: req.body.bmWeek,
                bmMonth: req.body.bmMonth,
                bmYear: req.body.bmYear,
                tagMonth: req.body.tagMonth,
                thumbnail: ''
            });
            res.json(result)
        }
        catch(e){
            res.json("fail")
        }
    
    };

    

       
        
}

module.exports = new authJournal()