import React, { Component } from 'react';
import GameBoard from './gameBoard'
import { playableStack } from './constants'


export default class extends Component{
    render(){
        return(
            <GameBoard pieceStack={playableStack}/>
        )
    }
}




