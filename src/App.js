import { Component } from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import './App.css';
import { API_URL } from "./Constants/Constant";
import Details from "./Pages/Details/Details";
import Home from './Pages/Home/Home';
import Rejected from "./Pages/Rejected/Rejected";
import Shortlisted from "./Pages/Shortlisted/Shortlisted";
import Header from './Shared/Header/Header';

export default class App extends Component {
  loadCandidates = () => {
    const url = API_URL;
    fetch(url,{
        method : 'GET'
    }).then(response => response.json()).then(data => {
        this.setState({
            candidates : data
        })
        sessionStorage.setItem('candidates',JSON.stringify(data));
    })
    
  }

  setCandidate(id){
    let details = {};
    this.state.candidates.forEach(candidate => {
      if(candidate.id === id){
        details = candidate;
      }
    });
    sessionStorage.setItem('details',JSON.stringify(details))
    this.setState({
      details : details
    });
  }

  searchCandidate(ev){
    this.setState({
      searchField : ev.target.value
    })
  }

  shortListCandidate(id){
    let selectedCandidate = {};
    let otherCandidates = [];
    this.state.candidates.forEach(candidate => {
      if(candidate.id === id){
        selectedCandidate = candidate;
      } else {
        otherCandidates.push(candidate);
      }
    });
    var listOfCandidates = JSON.parse(sessionStorage.getItem('shortListedCandidate'));
    listOfCandidates.push(selectedCandidate);
    sessionStorage.setItem('shortListedCandidate',JSON.stringify(listOfCandidates));
    sessionStorage.setItem('candidates',JSON.stringify(otherCandidates));
    this.setState({
      shortListed : listOfCandidates,
      candidates : otherCandidates
    });
  }
  rejectCandidate(id){
    let RejectedCandidate = {};
    let otherCandidates = [];
    this.state.candidates.forEach(candidate => {
      if(candidate.id === id){
        RejectedCandidate = candidate;
      } else {
        otherCandidates.push(candidate);
      }
    });
    var listOfCandidates = JSON.parse(sessionStorage.getItem('RejectedCandidate'));
    listOfCandidates.push(RejectedCandidate);
    sessionStorage.setItem('candidates',JSON.stringify(otherCandidates));
    sessionStorage.setItem('RejectedCandidate',JSON.stringify(listOfCandidates));
    this.setState({
      rejected : listOfCandidates,
      candidates : otherCandidates
    });
  }
  constructor(props){
    super(props);
    this.state = {
      candidates : [],
      details  : {},
      searchField : "",
      shortListed : [],
      rejected: []
    }
    this.loadCandidates = this.loadCandidates.bind(this);
    this.setCandidate = this.setCandidate.bind(this);
    this.searchCandidate = this.searchCandidate.bind(this);
    this.shortListCandidate = this.shortListCandidate.bind(this);
    this.rejectCandidate = this.rejectCandidate.bind(this);
  }

  componentDidMount(){
    // api only called when no session storage empty
    if(!sessionStorage.getItem('candidates')){
      this.loadCandidates();
      sessionStorage.setItem('RejectedCandidate',JSON.stringify([]));
      sessionStorage.setItem('shortListedCandidate',JSON.stringify([]));
    } else {
      this.setState({
        candidates : JSON.parse(sessionStorage.getItem('candidates')),
        shortListed : JSON.parse(sessionStorage.getItem('shortListedCandidate')),
        rejected: JSON.parse(sessionStorage.getItem('RejectedCandidate'))
      })
    }
  }

  render(){
    const { candidates, searchField, shortListed, rejected } = this.state;
    const filteredCandidates = candidates.filter(candidate =>{
      return candidate.name.toLowerCase().includes(searchField.toLowerCase());
    })
    const filteredShorlistedCandidates = shortListed.filter(candidate =>{
      return candidate.name.toLowerCase().includes(searchField.toLowerCase());
    })
    const filteredRejectedCandidates = rejected.filter(candidate =>{
      return candidate.name.toLowerCase().includes(searchField.toLowerCase());
    })
    return !candidates.length ?
    <h1>Loading</h1> :
    (
      <>
        <BrowserRouter>
          <Header searchCandidate={this.searchCandidate}/>
          <Routes>
            <Route path="/" element={<Home candidates={filteredCandidates} setCandidate={this.setCandidate}/>} />
            <Route path="details/:id" element={<Details rejectCandidate={this.rejectCandidate} shortListCandidate={this.shortListCandidate} details={this.state.details} />} />
            <Route path="/shortlisted" element={<Shortlisted candidates={filteredShorlistedCandidates}/>} />
            <Route path="/rejected" element={<Rejected candidates={filteredRejectedCandidates}/>} />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}

