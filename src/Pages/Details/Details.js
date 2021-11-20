import React from 'react'
import { useNavigate } from "react-router-dom";
export default function Details(props) {
    let navigate = useNavigate();
    const {id, name, Image} = props.details.id ? props.details : JSON.parse(sessionStorage.getItem('details'));
    return (
        <> 
            <div className="details d__flex align__items__center flex__column pt2">
                <img style={{width:'15em'}} src={Image} alt=""/>
                <div > 
                    <ul>
                        <li>
                            <strong>Name: </strong> {name}
                        </li>
                        <li>
                            <strong>Candidate id: </strong> {id}
                        </li>
                    </ul>
                    <div className="d__flex align__items__center col__gap2 pt2">
                        <button
                         onClick={()=>{props.shortListCandidate(id);navigate("/", { replace: true });}} 
                         className="btn btn__success"
                         >Shortlist
                         </button>
                        <button 
                         onClick={()=>{props.rejectCandidate(id);navigate("/", { replace: true });}} 
                         className="btn btn_error"
                         >Reject
                         </button>
                    </div>
                </div>
            </div> 
        </>
    )
}
