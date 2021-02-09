import React from "react";
import Playlist from "../Playlist";
import SearchBar from ".//SearchBar/Searchbar";
import SearchResults from "../SearchResults/SearchResults";
import spotify from "../util/Spotify";
import './App.css';



class App extends React.Component{
  constructor(props) {
    super(props);
  
    this.state = {
      SearchResults: [],
      playlistNma: "New playlist",
      playlistTracks: []

       
    };
    this.Search=this.search.bind(this);
    this.addTrack=this.addTrack.bind(this);
    this.removeTrack=this.removeTrack.bind(this);
    this.updatePlaylistName=this.updatePlaylistName.bind(this);
    this.savePlaylist=this.savePlaylist.bind(this);
    this.removeTrackSearch=this.removeTrackSearch.bind(this);
    this.doThese=this.doThese.bind(this);
  }


  search(term){
    spotify.search(term).then(SearchResults => {
      this.setState({SearchResults:SearchResults});
    });
  }
  addTrack(track){
    let tracks=this.state.playlistTracks;
    if(track.find(savedTrack => savedTrack.id === track.id)){
      return;
    }
    track.push(track);
    this.setState({playlistTracks:tracks});
  }
  removeTrack(track){
    let tracks = this.state.playlistTracks;
    let trackSearch=this.state.SearchResults;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    trackSearch.unshift(track);
    this.setState({playlistTracks: tracks});
  }
  removeTrackSearch(track){
    let tracks = this.state.SearchResults;
    tracks=tracks.filter(currentTrack => currentTrack.id!==track.id);
    this.setState({SearchResults:tracks});
  }
}


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
