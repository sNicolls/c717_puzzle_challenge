import React, { Component } from 'react';
import Draggable from 'react-draggable';

export default () => {
    return (
        <div className="gameBoardDiv">
            <Draggable axis="x" bounds='parent'>
                <div className="unBlock_startingPiece">
                </div>
            </Draggable>
        </div>
    )
}