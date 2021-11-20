import React, { Component } from 'react';
import Candidates from '../../Shared/Candidates/Candidates'

export default class Home extends Component {

    
    render() {
        return (
            <>
                <Candidates candidates={this.props.candidates} setCandidate={this.props.setCandidate}/>
            </>
        )
    }
}
