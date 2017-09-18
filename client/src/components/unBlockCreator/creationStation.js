import React, { Component } from 'react';
import CreatePiece from './pieceCreator';
import Draggable from 'react-draggable';
import GameBoard from './gameBoard'
import PlayGame from './play';
import { pieceStack } from './constants'

export default class CreationStation extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.createTallPiece = this.createTallPiece.bind(this);
        this.createLongPiece = this.createLongPiece.bind(this);
        this.instantiateGame = this.instantiateGame.bind(this);
    }

    createTallPiece() {
        pieceStack.push({type: "tall", xPos: 0, yPos: 0})
    }

    createLongPiece() {
        pieceStack.push({type: "long", xPos: 0, yPos: 0})
    }

    instantiateGame(ev) {
        // this.setState({
        //     tallPieceAxis: "y",
        //     longPieceAxis: "x"
        // })

        // const tallPiece = document.getElementsByClassName("unBlock_tallPiece");
        // tallPiece.map(function(item, index){
        //     console.log(item.getBoundingClientRect())
        // })
        //console.log(tallPiece)
        // console.log(tallPiece.getBoundingClientRect());

        this.setState({
            mode: "play",
        })
    }

    render() {

        return (
            <div className="container gameArea">
                <GameBoard pieceStack={pieceStack}/>
                <button className="btn-success" onClick={this.createTallPiece}>TallPiece</button>
                <button className="btn-success" onClick={this.createLongPiece}>LongPiece</button>
                <button className="btn-success" onClick={this.createRoadBlock}>Block</button>
                <button className="btn-success" onClick={this.instantiateGame}>Play</button>
            </div>
        )
    }
}