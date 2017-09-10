import React, { Component } from 'react';
import Draggable from 'react-draggable';

export default class CreationStation extends Component{
    constructor(props){
        super(props);
        this.state = {
            tallPieces: [
                <Draggable>
                    <div className="unBlock_longPiece"></div>
                </Draggable>,
            ]
        }
    }

    createLongPiece(){
        this.setState({
            tallPieces: (
                <Draggable>
                    <div className="unBlock_longPiece"></div>
                 </Draggable>
            )
        })
    }


    render(){
        return (
            <div className="container gameArea">
                <div className="gameBoardDiv">
                    <Draggable axis="x" bounds='parent'>
                        <div className="unBlock_startingPiece">
                        </div>
                    </Draggable>
                </div>
                <div className="piecePenDiv">
                    {this.state.tallPieces.map(function(item, index){
                        return item
                    })}
                    {/*{this.state.longPieceCount}*/}
                    {/*{this.state.blockPieceCount}*/}
                </div>
                <button className="btn-success" onClick={this.createTallPiece}>TallPiece</button>
                <button className="btn-success" onClick={this.createLongPiece}>LongPiece</button>
                <button className="btn-success" onClick={this.createRoadBlock}>Block</button>
                {/*<div className="unBlock_tallPiece"></div>*/}
                {/*<div className="unBlock_widePiece"></div>*/}
            </div>
        )
    }
}