import React, { Component } from 'react';
import Draggable from 'react-draggable';

export default (props) => {
    const { tallPieceCount, longPieceCount, tallPieceAxis, longPieceAxis } = props;
    const tallPieceArr = [];
    const longPieceArr = [];

    for(var i = 0; i < tallPieceCount; i++){
        tallPieceArr.push(
            <Draggable bounds="parent" axis={tallPieceAxis}>
                <div className="unBlock_tallPiece">

                </div>
            </Draggable>
        )
    }

    for(var i = 0; i < longPieceCount; i++){
        longPieceArr.push(
            <Draggable bounds="parent" axis={longPieceAxis}>
                <div className="unBlock_longPiece">

                </div>
            </Draggable>
        )
    }

    return (
        <div className="pieceDiv">
            {tallPieceArr}
            {longPieceArr}
        </div>
    )

}
