import React, { Component } from 'react'
import Candidate from './Candidate/Candidate'

export default class Candidates extends Component {

    render() {
        return (
            <>
                <div className="d__flex align__items__center justify__content__center flex__wrap cards">
                    {
                        this.props.candidates.map(candidate => {
                            return <Candidate setCandidate={this.props.setCandidate} key={candidate.id} details={candidate} />
                        })
                    }
                </div>
            </>
        )
    }
}
