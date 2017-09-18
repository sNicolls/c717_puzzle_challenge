import React, { Component } from 'react';
import Draggable from 'react-draggable';

export default class extends Component {
    constructor(props){
        super(props);
        this.handleDrag = this.handleDrag.bind(this);
    }

    handleDrag(ev){
        console.log(ev.target.getBoundingClientRect())
        //console.log(document.getElementsByClassName("unBlock_startingPiece")[0].getBoundingClientRect());
        if(document.getElementsByClassName("unBlock_startingPiece")["0"].style.transform.match(/\d+/g)[0] === "205"){
            console.log("WIN")
        }

    }
render() {
    const pieceArr = [];

        this.props.pieceStack.map((piece, index)=>{
            pieceArr.push(
                <Draggable axis={piece.axis} bounds='parent' onDrag={this.handleDrag}>
                    <div style={{gridColumn: piece.xPos, gridRow: piece.yPos, backgroundColor: "red", border: "solid", boxSizing: "border-box"}}></div>
                </Draggable>)
        })


        return (
            <div className="gameBoardDiv">
                <Draggable axis="x" bounds='parent' onDrag={this.handleDrag}>
                    <div className="unBlock_startingPiece" style={{border: "solid", boxSizing: "border-box"}}></div>
                </Draggable>
                {pieceArr}
            </div>
        )
    }
}


