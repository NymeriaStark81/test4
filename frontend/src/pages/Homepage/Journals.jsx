import { useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCopy, faTrashCan } from "@fortawesome/free-regular-svg-icons"

const Journals = ({setSection}) => {
    const navigate = useNavigate()
    const {state} = useLocation()
    var [load, setLoad] = useState(false)
    var [reload, setReload] = useState(0)
    var [journals, setJournals] = useState([])

    var delet = false

    //navigate to edit Journal page
    const editJournal = (journalID, delet) => {
        if(!delet){
            navigate('/journalView', {
                state: {
                    userID: state.userID,
                    journalID: journalID
                }
            })
        }
    }

    //load all journals
    useEffect(()=> {
        fetch("https://test4-nymeria-starks-projects.vercel.app/loadJournal/", {
            method: 'POST',
            body: JSON.stringify({userID: state.userID}),
            headers: {
                'Content-Type': 'application/json'
        }})
            .then((res) => {return res.json()})
            .then((data) => {
                setJournals(data);
                setLoad(true)
            })
    }, [])

    //delete journal
    const del = (id) => {
        fetch("https://test4-nymeria-starks-projects.vercel.app/deleteJournal/", {
            method: 'POST',
            body: JSON.stringify({id: id, userID: state.userID}),
            headers: {
                'Content-Type': 'application/json'
        }})
            .then((res) => {return res.json()})
            .then((data) => {
                setJournals(data)
                setReload(reload+1)
            })
    }

        return(
            <div className="home_main">
            <div className="home_main_header">
                <div className="home_main_header_title">
                    JOURNALS
                </div>
                <button className="home_main_header_new" onClick={() => {setSection('journal_create')}}>
                    Create New Journal
                </button>
            </div>
            {load && 
                <div className="home_main_list" key={reload}>
                {journals.map((journal, index) => {
                    return (
                        <div key={index} className="home_design" onClick={() => {editJournal(journal._id, delet)}}>
                            <div className="thumbnail">
                                {journal.thumbnail != '' &&
                                    <img src={journal.thumbnail} width='95%' height='95%' style={{borderRadius: '10px', marginLeft: '6px', marginTop: '6px'}}/>
                                }
                            </div>
                            <div className="home_design_details">
                                <div className="home_design_icons">
                                    <FontAwesomeIcon icon={faTrashCan} onClick={(e) => {delet = true; del(journal._id)}}/>
                                </div>
                                <p>Title: {journal.journal_title}</p>
                                <p> Year: {journal.year} </p>
                            </div>
                        </div>
                    )
                })}
                </div>
            }
            </div>
        )
}

export default Journals