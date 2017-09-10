import React from 'react';
import GameBoard from './gameBoard'
import PiecePen from './piecePen'

export default() => {
    return(
        <div className="container">
            <GameBoard/>
            <PiecePen/>
        </div>
    )
}