import React, {Component} from "react";
import "../Styles.css";

class MovieCard extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="card">
                <img src={this.props.image} className="card-image" />
            </div>
        )
    }
}


export default MovieCard;