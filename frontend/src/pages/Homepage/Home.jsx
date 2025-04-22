import { useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useState } from "react"
import { useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faObjectGroup, faSpa } from "@fortawesome/free-solid-svg-icons";
import { faFaceGrinWink } from "@fortawesome/free-regular-svg-icons";
import Journals from "./Journals";
import JournalCreate from "./JournalCreate";
import Templates from "./Templates";
import TemplateCreate from "./TemplateCreate";
import HabitList from "./HabitList";
import HabitEdit from "./HabitEdit";
import MoodList from "./MoodList";
import MoodEdit from "./MoodEdit";

const Homepage = () => {
    const {state} = useLocation()
    const [userName, setUserName] = useState('')
    const [recent, setRecent] = useState('')
    const navigate = useNavigate();
    var [section, setSection] = useState('journals')
    var [selectHabit, setSelectHabit] = useState('')
    var [selectMood, setSelectMood] = useState('')

    //load username and most recent journal
    useEffect(() => {
        fetch("http://localhost:3000/load_user/", {
            method: 'POST',
            body: JSON.stringify({userID: state.userID}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {return res.json()})
            .then((data) => {
                setUserName(data.userName)
                setRecent(data.recent)
            })
    }, [])


        return(
            <div className="screen">
                <div className="home_header">
                    <img className="home_logo" src="/images/brand_light.png"></img>
                    <div className="home_signout" onClick={() => {navigate('/')}}>
                        Sign out
                    </div>
                    <div className="home_welcome">
                        Welcome {userName}
                    </div>
                    {recent != '' &&
                    <button className="recent_journal" 
                        onClick={() => {
                            if(recent != ''){
                                fetch("http://localhost:3000/find_recent/", {
                                    method: 'POST',
                                    body: JSON.stringify({journalID: recent}),
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                })
                                    .then((res) => {return res.json()})
                                    .then((data) => {
                                        if(data == 'found'){
                                            navigate('/journalView', {
                                                state: {
                                                    userID: state.userID,
                                                    journalID: recent
                                                }
                                            })
                                        } else {
                                            alert('Recent journal not found!')
                                        }
                                    })
                                
                            } else {
                                alert('No recent journal accessed!')
                            }
                        }}>
                            Recent Journal
                    </button>
                    }
                </div>
                

                <div className="home_below">
                    <div className="home_left_panel">
                        <div className="dashboard_section" style={{backgroundColor: `${(section=='journals' || section=='journal_create') ? 'white' : ''}`}}
                        onClick={() => {setSection('journals')}}>
                            <span className="section_icon material-symbols-outlined" style={{fontWeight: 'bold'}}>
                                auto_stories
                            </span>
                            <div className="section_title">
                                Your Journals
                            </div>
                        </div>
                        <div className="dashboard_section" style={{backgroundColor: `${(section=='templates' || section=='template_create') ? 'white' : ''}`}}
                        onClick={() => {setSection('templates')}}>
                            <FontAwesomeIcon icon={faObjectGroup} className="section_icon"/>
                            <div className="section_title">
                                Your Templates
                            </div>
                        </div>
                        <div className="dashboard_section" style={{backgroundColor: `${(section=='habit_list' || section=='habit_edit') ? 'white' : ''}`}}
                        onClick={() => {setSection('habit_list')}}>
                            <FontAwesomeIcon icon={faSpa} className="section_icon" />
                            <div className="section_title">
                                Your Habit Lists
                            </div>                        
                        </div>
                        <div className="dashboard_section" style={{backgroundColor: `${(section=='mood_list' || section=='mood_edit') ? 'white' : ''}`}}
                        onClick={() => {setSection('mood_list')}}>
                            <FontAwesomeIcon icon={faFaceGrinWink} className="section_icon" />
                            <div className="section_title">
                                Your Mood Lists
                            </div>                        
                        </div>
                    </div>
                    
                        {section == 'journals' &&
                            <Journals setSection={setSection}/>
                        }
                        {section == 'templates' &&
                            <Templates setSection={setSection}/>
                        }
                        {section == 'journal_create' &&
                            <JournalCreate setSection={setSection}/>
                        }
                        {section == 'template_create' &&
                            <TemplateCreate setSection={setSection} />
                        }
                        {section == 'habit_list' &&
                            <HabitList setSection={setSection} setSelectHabit={setSelectHabit}/>
                        }
                        {section == 'mood_list' &&
                            <MoodList setSection={setSection} setSelectMood={setSelectMood}/>
                        }
                        {section == 'habit_edit' &&
                            <HabitEdit setSection={setSection} selectHabit={selectHabit}/>
                        }
                        {section == 'mood_edit' &&
                            <MoodEdit setSection={setSection} selectMood={selectMood}/>
                        }
                    
                </div>
            </div>
        )
}

export default Homepage