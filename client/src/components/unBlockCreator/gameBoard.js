import React, { Component } from 'react';
import Draggable from 'react-draggable';

export default class extends Component {
    constructor(props){
        super(props);

    }
    createLongPiece(){
        pieceArray.push(<div className="unBlock_longPiece"></div>)
    }
    createTallPiece(){
        pieceArray.push(<div className="unBlock_tallPiece"></div>)
    }


render() {
        const { tallPieceCount, longPieceCount } = this.props;

        const pieceArray = [];
        return (
            <div className="gameBoardDiv">
                <Draggable axis="x" bounds='parent'>
                    <div className="unBlock_startingPiece"></div>
                </Draggable>
                {longPieceCount}
            </div>
        )
    }
}










