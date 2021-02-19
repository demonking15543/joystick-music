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
  doThese(track){
    this.addTrack(track);
    this.removeTrackSearch(track);
  }
  updatePlaylistName(name){
    this.setState({updatePlaylistName: name});
  }
  savePlaylist(){
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    spotify.savePlaylist(this.state.playlistNma, trackUris).then (() => {
      this.setState({
        updatePlaylistName: "New Playlist",
        playlistTracks: []
      });
    });
  }
}


function App() {
  return (
   <div>
    <h1>
      <a href="http://localhost:3000">MusicSpelsh</a>
    </h1>
    <div className="App">
      <SearchBar onSearch={this.search}/>
      <div className="App-playlist">
        <SearchResults SearchResults = {this.state.SearchResults} onAdd={this.doThese} />
        <Playlist playlistTracks={this.state.playlistTracks} 
        onName={this.updatePlaylistName} 
        onRemove={this.removeTrack} onSave={this.savePlaylist}/>
      </div>
    </div>
   </div>
  );
  }
export default App;
