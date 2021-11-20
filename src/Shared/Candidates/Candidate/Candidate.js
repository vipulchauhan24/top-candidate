import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Candidate extends Component {
    render() {
        const {Image, name, id} = this.props.details;
        return (
            <>
            
                <Link to={"/details/"+id} onClick={()=>{this.props.setCandidate(id)}}>
                    <div className="card">
                        <div className="card__image" style={{background: `url(${Image})`}}>
                            {/* <img src={Image} alt=""/> */}
                        </div>
                        <div className="card__details">
                            <h2>{name}</h2>
                            <p>{id}</p>
                        </div>
                    </div>
                </Link>
            </>
        )
    }
}
