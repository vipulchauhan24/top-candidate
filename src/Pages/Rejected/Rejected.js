import React, { Component } from 'react'
import Candidates from '../../Shared/Candidates/Candidates'

export default class Rejected extends Component {
    render() {
        return (
            <>
                <Candidates candidates={this.props.candidates}/>
            </>
        )
    }
}
