import React, { Component } from 'react';
import Draggable from 'react-draggable'
export default class PiecePen extends Component {
    constructor(props){
        super(props)
    }
    drag(event){
        ev.dataTransfer.setData("text", ev.target.id)
}
    render(){
        return (
            <div className="piecePenDiv">
                <div className="unBlock_tallPiece" draggable="true" onDragStart={drag(ev)}></div>
                <div className="unBlock_widePiece"></div>
            </div>
        )
    }
}