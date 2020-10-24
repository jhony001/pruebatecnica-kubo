import React, { Component } from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MovieCard from "./MovieCard";
import {Link} from "react-router-dom";

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
          movies: []
        }
    
        this.handleSelectSearch = this.handleSelectSearch.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
      }
    
      componentDidMount(){
        fetch("http://localhost:3000/movies")
        .then(response => response.json())
        .then(json => {
          this.setState({movies: json.data});
          console.log(this.state.movies);
        })
      }
    
      handleSelectSearch(e){
        let value = e.target.value;
        value = value === "All" ? "":value;
        fetch(`http://localhost:3000/movies/${value}`)
        .then(response => response.json())
        .then(json => {
          this.setState({movies: []});
          this.setState({movies: json.data});
          console.log(this.state.movies);
        })
      }


      handleSearch(){
          let data = {
              title: document.getElementById("search-input").value
          }
          fetch("http://localhost:3000/movies/search", {
              method: 'post',
              body: JSON.stringify(data),
              headers: {
                  "Content-Type":"application/json"
              }
          })
          .then(response => response.json())
          .then(json => {
              this.setState({movies: json.data});
          })
      }
    render() {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <span className="title">Kubo Movies</span>
                        <select onChange={this.handleSelectSearch} className="search-control">
                            <option value="All">Todas</option>
                            <option value="Accion">Accion</option>
                            <option value="Terror">Terror</option>
                            <option value="Drama">Drama</option>
                            <option value="Biograficas">Biograficas</option>
                            <option value="Ciencia Ficcion">Ciencia Ficcion</option>
                            <option value="Comedia">Comedia</option>
                            <option value="Romance">Romance</option>
                        </select>
                        <input id="search-input" placeholder="Buscar pelicula" type="search" className="search-control"></input>
                        <button onClick={this.handleSearch} style={{cursor: "pointer"}} className="search-control">Buscar</button>
                    </Toolbar>
                </AppBar>
                <div className="movies-container">
                    {this.state.movies.map(function (movie) {
                        return <Link to={`/movie/${movie.title}`} key={`1${movie.id}`}>
                            <MovieCard title={movie.title} image={movie.url_caratula} key={movie.id} />
                        </Link>
                    })}
                </div>
            </div>
        )
    }
}

export default Home;