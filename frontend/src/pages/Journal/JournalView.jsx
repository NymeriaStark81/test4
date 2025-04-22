import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft, faHouse, faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useCallback } from 'react';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import Navigator from './Navigator';
import LeftPage from './LeftPage';

const JournalView = () => {
    const navigate = useNavigate()
    const {state} = useLocation()
    const [title, setTitle] = useState('')
    const [year, setYear] = useState('')
    const [bmDaily, setBmDaily] = useState([])
    const [bmWeek, setBmWeek] = useState([])
    const [bmMonth, setBmMonth] = useState([])
    const [bmYear, setBmYear] = useState([])
    const [tagMonth, setTagMonth] = useState([])
    const [pages, setPages] = useState([])
    const [mois, setMois] = useState(0)
    const [gauche, setGauche] = useState(1)
    const [droite, setDroite] = useState(2)
    const [mainView, setMainView] = useState(1)
    const [updateMois, setUpdateMois] = useState(0)
    const [updatePage, setUpdatePage] = useState(0)
    const today = new Date()
    const [leftPage, setLeftPage] = useState([])
    const [rightPage, setRightPage] = useState([])
    const [prevURL, setPrevURL] = useState('')
    const [updateTb, setUpdateTb] = useState(false)


    const updateThumbnail = async() => {
        const node = document.getElementById('my-node')
        await htmlToImage
            .toPng(node, { cacheBust: true, })
            .then(async(dataUrl) => {
                console.log('checkpoint 1')

                await fetch("https://test4-nymeria-starks-projects.vercel.app/check_thumbnail_journal/", {
                    method: 'POST',
                    body: JSON.stringify({journalID: state.journalID}),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then ((res) => {return(res.json())})
                .then (async(tblink) => {
                    console.log('checkpoint 2')
                    if(tblink == ''){
                        await fetch("https://test4-nymeria-starks-projects.vercel.app/news3_thumbnail_template/", {
                            method: 'POST',
                            body: JSON.stringify({dataUrl: dataUrl}),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                        .then ((res) => {return(res.json())})
                        .then (async(url) => {
                            fetch("https://test4-nymeria-starks-projects.vercel.app/update_thumbnail_journal/", {
                                method: 'POST',
                                body: JSON.stringify({journalID: state.journalID, thumbnail: url}),
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            })}
                        )

                    } else {
                        await fetch("https://test4-nymeria-starks-projects.vercel.app/updates3_thumbnail_template/", {
                            method: 'POST',
                            body: JSON.stringify({dataUrl: dataUrl, prevURL: tblink}),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                        .then ((res) => {return(res.json())})
                        .then (async(url) => {
                            console.log('checkpoint 3', url)
                            fetch("https://test4-nymeria-starks-projects.vercel.app/update_thumbnail_journal/", {
                                method: 'POST',
                                body: JSON.stringify({journalID: state.journalID, thumbnail: url}),
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            })}
                        )

                    }
                    setUpdateTb(false)
                    navigate('/homepage', {
                        state: {
                            userID: state.userID,
                            recent: state.recent
                        }
                    })

                })
    })    
}

    //initialization
    useEffect(() => {
        fetch("https://test4-nymeria-starks-projects.vercel.app/initialize_journal/", {
            method: 'POST',
            body: JSON.stringify({journalID: state.journalID}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then ((res) => {return(res.json())})
        .then (async(result) => {
            setBmDaily(result.journal.bmDaily)
            setBmWeek(result.journal.bmWeek)
            setBmMonth(result.journal.bmMonth)
            setBmYear(result.journal.bmYear)
            setTitle(result.journal.journal_title)
            setYear(result.journal.year)
            setTagMonth(result.journal.tagMonth)
            setPrevURL(result.prevURL)
            setPages(result.pages)
            if(result.pages[mainView].temp_type == 'yearly'){
                setMois(15)
            }
            
        }
            
        )
    }, [])

    //load fonts
    useEffect(() => {
        fetch("https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyCI8XMjk8he6pkZJp5CyKyScaMaQlUngDw&sort=style&sort=popularity")
        .then ((res) => {return(res.json())})
        .then ((data) => {
            const fontFamilies = [];
            data.items.map((item, index) => {
                Object.entries(item.files).forEach(([key, value]) =>{
                    if(key == '300'){
                        fontFamilies.push({family: item.family, category: item.category, variation: 'Light', weight: '300'})
                    } else if (key == '400' || key == 'regular') {
                        fontFamilies.push({family: item.family, category: item.category, variation: 'Regular', weight: '400'})
                    } else if (key == '500') {
                        fontFamilies.push({family: item.family, category: item.category, variation: 'Medium', weight: '500'})
                    } else if (key == '600') {
                        fontFamilies.push({family: item.family, category: item.category, variation: 'SemiBold', weight: '600'})
                    } else if (key == "700") {
                        fontFamilies.push({family: item.family, category: item.category, variation: 'Bold', weight: '700'})
                    } else if (key == '800') {
                        fontFamilies.push({family: item.family, category: item.category, variation: 'ExtraBold', weight: '800'})
                    }                
                })

                var link = 'https://fonts.googleapis.com/css2?'
                var family = item.family.replace(/ /g, '+')
                link = link + 'family=' + family
                var ital = false
                item.variants.map((variant, index) => {
                    if(variant == 'italic'){
                        ital = true
                    }
                })
                if(ital){
                    link = link + ':ital,' + 'wght@'
                    item.variants.map((variant, index) => {
                        if(variant == '300' || variant == '400' || variant == '500' || variant == '600' || variant == '700' || variant == '800'){
                            link = link + '0,' + variant + ';'
                        } else if(variant == 'regular') {
                            link = link + '0,400;'
                        }
                    })
                    item.variants.map((variant, index) => {
                        if(variant == '300italic' || variant == '400italic' || variant == '500italic' || variant == '600italic' || variant == '700italic' || variant == '800italic'){
                            const wght = variant.substr(0,3)
                            link = link + '1,' + wght + ';'
                        } else if(variant == 'italic'){
                            link = link + '1,400;'
                        }
                    })
                } else {
                    link = link + ':wght@'
                    item.variants.map((variant, index) => {
                        if(variant == '300' || variant == '400' || variant == '500' || variant == '600' || variant == '700' || variant == '800'){
                            link = link + variant + ';'
                        } else if(variant == 'regular') {
                            link = link + '400;'
                        }
                })}

                link = link.replace(/.$/, '&');
                link = link + 'display=swap'

                document.head.insertAdjacentHTML(
                    'beforeend',
                    `<link rel="stylesheet" crossorigin="anonymous" href=${link} type="text/css" />`);

                
            })
        })
    }, []);    

    //update most recent journal
    useEffect(() => {
        fetch("https://test4-nymeria-starks-projects.vercel.app/update_recent/", {
            method: 'POST',
            body: JSON.stringify({userID: state.userID, journalID: state.journalID}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }, [])

    //load content of left and right pages when page number changes
    useEffect(() => {
        for(let i = 0; i<pages.length; i++){
            if(pages[i].page == gauche){
                setLeftPage(pages[i])
            }
            if(pages[i].page == droite){
                setRightPage(pages[i])
                break;
            }
        }
        setUpdatePage(updatePage + 1)

    }, [gauche, droite, pages])

    //update thumbnail before returning to home
    useEffect(() => {

        console.log(droite, gauche, updateTb)
        if(droite == 0 && gauche == -1 && updateTb){
            console.log('entered')
            updateThumbnail()
        }
    }, [updateTb])

    //update bookmarks according to main page
    useEffect(() => {

        if(pages.length != 0){
            if((pages[mainView].temp_type == 'blank') && (mainView%2==1)){
                setMainView(mainView + 1)
            }

            if((pages[mainView].temp_type == 'blank') && (mainView%2==0)){
                if(mainView - 1 > -1){
                    setMainView(mainView - 1)
                }
            }
        }

        for(let i = 0; i < tagMonth.length; i++){
            if(i+1 < tagMonth.length){
                if((tagMonth[i][1] <= mainView) && (mainView <= tagMonth[i+1][1])){
                    setMois(tagMonth[i][0])
                    setUpdateMois(updateMois+1)
                }
            } else if (tagMonth[i][1] <= mainView) {
                setMois(tagMonth[i][0])
                setUpdateMois(updateMois+1)
            }
        }

        if(tagMonth.length != 0){
            if(mainView < tagMonth[0][1]){
                setMois(15)
                setUpdateMois(updateMois+1)
            }
        }

        
        for(let i= 0; i < bmYear.length; i++){
            if(bmYear[i].order < 0){
                if(droite >= bmYear[i].page){
                    setMois(15)
                    setUpdateMois(updateMois+1)
                }
                break;
            }
        }

    }, [mainView])

    
    if((title != '') && (year != '') && (prevURL != '') && (tagMonth.length != 0) && (pages.length != 0) && (leftPage.length != 0) && (rightPage.length != 0)){
        //console.log('pages: ', pages)
        //console.log(bmWeek)
       // console.log(bmMonth)

        return (
        <div className="whole-journal">
            <img
                src='/images/brand_dark.png'
                className="logo-journal"
            />

            {/*LEFT NAVIGATION*/}
            {/*HOME*/}
            <div className="bookmark-left" style={{backgroundColor: '#5756BB', position: 'absolute', top: '105px', left: '43px'}} >
                <FontAwesomeIcon style={{position: 'absolute', top: '8px', left: '15px', fontSize: '20px', color: '#F198AF'}} icon={faHouse} />
                <div className="tag-left" style={{color: '#FFEAE5'}} onClick={async() => {
                    setUpdateTb(true)
                    setDroite(0)
                    setGauche(-1)
                    }}>Home</div>
            </div>
            {/*TODAY*/}
            <div className="bookmark-left"  style={{backgroundColor: '#8572C1', position: 'absolute', top: '141px', left: '43px'}}
                onClick={() => {
                    var found = false

                    for(let i = 0; i < pages.length; i++){
                        if(Object.hasOwn(pages[i], 'date')){
                            if(pages[i].date == today){
                                found = true

                                if(mainView == pages[i].page){
                                    break;
                                }

                                setMainView(pages[i].page)
                                if(pages[i].page%2 == 1){
                                    setGauche(pages[i].page)
                                    setDroite(pages[i].page + 1)
                                } else {
                                    setGauche(pages[i].page - 1)
                                    setDroite(pages[i].page)
                                }
                            }
                        }
                        if(found){
                            break;
                        }
                    }

                    if(!found){
                        for(let i = 0; i < pages.length; i++){
                            if(Object.hasOwn(pages[i], 'week')){
                                if((new Date(pages[i].week_start) <= today) && (today <= new Date(pages[i].week_end))){
                                    found = true

                                    if(mainView == pages[i].page){
                                        break;
                                    }
                                    
                                    setMainView(pages[i].page)
                                    if(pages[i].page%2 == 1){
                                        setGauche(pages[i].page)
                                        setDroite(pages[i].page + 1)
                                    } else {
                                        setGauche(pages[i].page - 1)
                                        setDroite(pages[i].page)
                                    }
                                }
                            }
                            if(found){
                                break;
                            }
                        }
                    }

                    if(!found){
                        for(let i = 0; i < pages.length; i++){
                            if(Object.hasOwn(pages[i], 'month')){
                                if((new Date(pages[i].month_start) <= today) && (today <= new Date(pages[i].month_end))){
                                    found = true
                                    if(mainView == pages[i].page){
                                        break;
                                    }

                                    setMainView(pages[i].page)
                                    if(pages[i].page%2 == 1){
                                        setGauche(pages[i].page)
                                        setDroite(pages[i].page + 1)
                                    } else {
                                        setGauche(pages[i].page - 1)
                                        setDroite(pages[i].page)
                                    }
                                }
                            }
                            if(found){
                                break;
                            }
                        }
                    }

                    if(!found){
                        alert("Day doesn't exist in this calendar year!")
                    } else {
                        setUpdatePage(updatePage + 1)
                    }

                }}>
                <FontAwesomeIcon style={{position: 'absolute', top: '8px', left: '15px', fontSize: '20px', color: '#F198AF'}} icon={faCalendarDay} />
                <div className="tag-left" style={{color: '#FFEAE5'}}>Today</div>
            </div>
            {/*MONTH LIST*/}
            <div key={[tagMonth, updateMois]} className="navigator-left">
                {/*YEAR START BOOKMARKS*/}
                {bmYear.map((y, index) => {
                    if(y.order >= 0){
                        return(
                            <div key={[index, updateMois]} className={(mainView == y.page) ? 'bookmark-left bookmark-selected-left' : 'bookmark-left'} 
                                style={{backgroundColor: '#F198AF'}}
                                onClick={() => {
                                    setMois(15);
                                    setMainView(y.page)
                                    if(y.page%2 == 1){setGauche(y.page), setDroite(y.page+1)} else {setGauche(y.page - 1), setDroite(y.page)};
                                    setUpdateMois(updateMois + 1)}}
                            ><div className="tag-left" style={{color: '#FFEAE5'}}>{y.name}</div></div>
                        )
                    }
                })}

                {/*MONTHLY BOOKMARKS*/}
                {tagMonth.map((m, index) => {
                    var colour
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

                    return(
                        <div key={index} className={m[0] == mois ? 'bookmark-left bookmark-selected-left' : 'bookmark-left'} 
                            style={{backgroundColor: colour}}
                            onClick={() => {
                                setMois(m[0]);
                                setMainView(m[1]);
                                if(m[1]%2 == 1){setGauche(m[1]), setDroite(m[1]+1)} else {setGauche(m[1]-1), setDroite(m[1])};
                                setUpdateMois(updateMois + 1)}}
                        ><div className="tag-left" title={m[1]}>{Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(year, m[0]))}</div></div>
                    )
                })
                }

                {/*YEAR END BOOKMARKS*/}
                {bmYear.map((y, index) => {
                    if(y.order < 0){
                        return(
                            <div key={[index, updateMois]} className={(mainView == y.page) ? 'bookmark-left bookmark-selected-left' : 'bookmark-left'} 
                                style={{backgroundColor: '#F198AF'}}
                                onClick={() => {
                                    setMois(15);
                                    setMainView(y.page)
                                    if(y.page%2 == 1){setGauche(y.page), setDroite(y.page+1)} else {setGauche(y.page - 1), setDroite(y.page)};
                                    setUpdateMois(updateMois + 1)}}
                            ><div className="tag-left" style={{color: '#FFEAE5'}}>{y.name}</div></div>
                        )
                    }
                })}
            </div>
            {/*PREVIOUS PAGE*/}
            {gauche > 0 &&
            <div className="bookmark-left" style={{backgroundColor: '#5756BB', position: 'absolute', top: '989px', left: '43px'}}
                onClick={() => {
                    if(gauche - 2 >= 0){
                        setMainView(mainView - 2), setGauche(gauche - 2), setDroite(droite - 2)
                    } else if (gauche - 2 == -1) {
                        setMainView(0), setGauche(-1), setDroite(0)
                    }
                }}
            >
                <FontAwesomeIcon style={{position: 'absolute', top: '7px', left: '15px', fontSize: '20px'}} icon={faArrowLeft} />
                <div className="tag-left" style={{color: '#FFEAE5'}}>{gauche}</div>
            </div>
            }



            {/*LEFT SIDE*/}
            {(gauche >= 0) && 
            <div className="page-left" key={[gauche, updatePage]}>
                <LeftPage journalID={state.journalID} prevURL={prevURL} pages={pages} leftPage={leftPage}/>
            </div>
            }
            {/*RIGHT SIDE*/}
            {(gauche != pages.length - 1) &&
            <div className="page-right" style={{borderRadius: droite == 0 ? '20px 20px 20px 20px' : ''}} key={[droite, updatePage]}>
                <div style={{transform: 'matrix(-1, 0, 0, 1, 0, 0)'}}>
                    <LeftPage journalID={state.journalID} prevURL={prevURL} pages={pages} leftPage={rightPage} droite={droite}/>
                </div>
            </div>
            }



            {/*RIGHT NAVIGATION*/}
            <div key={mois} className="navigator-right">
                {(mois < 12) &&
                    <Navigator mois={mois} bmDaily={bmDaily} bmWeek={bmWeek} bmMonth={bmMonth} gauche={gauche} setGauche={setGauche} droite={droite} setDroite={setDroite} mainView = {mainView} setMainView={setMainView} updatePage={updatePage} setUpdatePage={setUpdatePage}/>
                }
            </div>
            {/*NEXT PAGE*/}
            {droite < pages.length - 1 &&
            <div className="bookmark-right" style={{backgroundColor: '#5756BB', position: 'absolute', top: '989px', left: '1717px'}}
                onClick={() => {
                    if(droite + 2 < pages.length){
                        setMainView(mainView + 2), setGauche(gauche + 2), setDroite(droite + 2)
                    } else {
                        setMainView(pages.length - 1), setGauche(pages.length - 1), setDroite(droite + 2)
                    }
                }}>
                    
                <FontAwesomeIcon style={{position: 'absolute', top: '7px', right: '15px', fontSize: '20px'}} className='turn' icon={faArrowRight} />
                <div className="tag-right" style={{color: '#FFEAE5'}}>{droite}</div>                
                
            </div>
            }
        </div>
    )
}
}

export default JournalView