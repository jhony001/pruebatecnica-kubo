import React, { Component } from "react";
import Rating from '@material-ui/lab/Rating';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Switch from '@material-ui/core/Switch';
import "../Styles.css";

class Movie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: {},
            ratingValue: 1,
            snackBarOpen: false,
            snackmessage: "",
            viewedChecked: false
        }
        this.handleRateChange = this.handleRateChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleViewChange = this.handleViewChange.bind(this);
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        console.log(params.title);
        let data = {
            title: params.title
        }
        fetch("http://localhost:3000/movies/search", {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(json => {
                this.setState({ movie: json.data[0] })
                this.setState({ratingValue: json.data[0].calificacion});
                if(json.data[0].vista != null){
                    if(json.data[0].vista.data[0] === 1){
                        this.setState({viewedChecked: true});
                    } else {
                        this.setState({viewedChecked: false});
                    }
                }
            })
    }

    handleRateChange(event, newValue){
        this.setState({ratingValue: newValue});
        let data = {
            calificacion: newValue,
            id: this.state.movie.id
        }
        fetch("http://localhost:3000/movies/ratemovie", {
            method: 'post',
            body:JSON.stringify(data),
            headers: {
                "Content-Type":"application/json"
            }
        })
        .then(response => response.json())
        .then(json => {
            if(json.status === 1){
                this.setState({snackBarOpen: true, snackmessage: "Calificacion guardada correctamente"});
            } else {
                console.log(json.message);
            }
        })
    }

    handleClose(event, reason){
        if(reason === "clickaway"){
            return;
        }
        this.setState({snackBarOpen: false, snackmessage: ""});
    }

    handleViewChange(event){
        console.log(event.target.checked);
        this.setState({viewedChecked: event.target.checked});
        let data = {
            id: this.state.movie.id
        }
        if(event.target.checked){
            fetch("http://localhost:3000/movies/checkasviewed", {
                method: 'post',
                body: JSON.stringify(data),
                headers: {
                    "Content-Type":"application/json"
                }
            })
            .then(response => response.json())
            .then(json => {
                if(json.status === 1){
                    this.setState({snackBarOpen: true, snackmessage: "Esta pelicula se ha marcado como vista"});
                }
            })
        } else {
            fetch("http://localhost:3000/movies/checkasnotviewed", {
                method: 'post',
                body: JSON.stringify(data),
                headers: {
                    "Content-Type":"application/json"
                }
            });
        }
    }

    render() {
        return (
            <div>
                <div className="movie-header">
                    <img src={this.state.movie.url_caratula} />
                    <div className="movie-info">
                        <h2><b>Titulo: </b>{this.state.movie.title}</h2>
                        <h3><b>Fecha de estreno: </b>{this.state.movie.fecha_estreno ? this.state.movie.fecha_estreno.substring(0, 10) : "desconocida"}</h3>
                        <h3><b>Duracion: </b>{this.state.movie.duracion}</h3>
                        <h3><b>Sinopsis: </b></h3>
                        <p>{this.state.movie.descripcion}</p>

                        <h3><b>Califica esta pelicula:</b></h3>
                        <Rating
                            name={`Calificacion de ${this.state.movie.title}`}
                            value={this.state.ratingValue}
                            precision={1}
                            onChange={this.handleRateChange}
                        />
                        <h3><b>Marcar como vista: </b> <Switch checked={this.state.viewedChecked} onChange={this.handleViewChange} /></h3>
                    </div>
                </div>
                <div>
                    <h2>Trailer</h2>
                    <iframe width="860" height="515" src={this.state.movie.url_trailer} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <Snackbar open={this.state.snackBarOpen} autoHideDuration={2000} onClose={this.handleClose}>
                    <MuiAlert onClose={this.handleClose}>
                        {this.state.snackmessage}
                    </MuiAlert>
                </Snackbar>
            </div>
        )
    }
}

export default Movie;