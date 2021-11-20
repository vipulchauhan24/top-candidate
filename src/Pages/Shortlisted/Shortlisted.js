import React, { Component } from 'react'
import Candidates from '../../Shared/Candidates/Candidates'

export default class Shortlisted extends Component {
    render() {
        return (
            <>
                <Candidates candidates={this.props.candidates}/>
            </>
        )
    }
}
