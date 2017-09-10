import React, { Component } from 'react';
import Draggable from 'react-draggable';

export default class GameBoard extends Component{
    constructor(props){
        super(props)
    }

    drag(ev){
        ev.dataTransfer.setData("text", ev.target.id)
    }
    drop(ev) {
        ev.preventDefault();
        var data = ev.DataTransfer.getData()
        ev.target.appendChild(document.getElementById(data));
    }
    render(){
        return (
            <div className="container">
                <div className="gameBoardDiv" onDrop={props.drop}>
                    <Draggable axis="x" bounds='parent'>
                        <div className="unBlock_startingPiece">
                        </div>
                    </Draggable>
                </div>
                <div className="piecePenDiv">
                    <div className="unBlock_tallPiece" draggable="true" onDragStart={drag(ev)}></div>
                    <div className="unBlock_widePiece"></div>
                </div>
            </div>
        )
    }
}