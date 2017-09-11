import React, { Component } from 'react';
import CreatePiece from './pieceCreator';
import Draggable from 'react-draggable';

export default class CreationStation extends Component{
    constructor(props){
        super(props);
        this.state = {
            tallPieceCount: 0,
            longPieceCount: 0,
            tallPieceAxis: "both",
            longPieceAxis: "both"
        };
        this.createTallPiece = this.createTallPiece.bind(this);
        this.createLongPiece = this.createLongPiece.bind(this);
        this.instantiateGame = this.instantiateGame.bind(this);
    }

    createTallPiece(){
        this.setState({
            tallPieceCount: this.state.tallPieceCount + 1
        });
    }

    createLongPiece(){
        this.setState({
            longPieceCount: this.state.longPieceCount + 1
        });
    }

    instantiateGame(ev){
        // this.setState({
        //     tallPieceAxis: "y",
        //     longPieceAxis: "x"
        // })

        const tallPiece = document.getElementsByClassName("unBlock_tallPiece");
        tallPiece.map(function(item, index){
            console.log(item.getBoundingClientRect())
        })
        console.log(tallPiece)
       // console.log(tallPiece.getBoundingClientRect());
    }

    render(){
        return (
            <div className="container gameArea">
                <div className="gameBoardDiv">
                    <Draggable axis="x" bounds='parent'>
                        <div className="unBlock_startingPiece">
                        </div>
                    </Draggable>
                    <CreatePiece tallPieceCount={this.state.tallPieceCount} longPieceCount={this.state.longPieceCount} tallPieceAxis={this.state.tallPieceAxis} longPieceAxis={this.state.longPieceAxis}/>
                </div>

                <button className="btn-success" onClick={this.createTallPiece}>TallPiece</button>
                <button className="btn-success" onClick={this.createLongPiece}>LongPiece</button>
                <button className="btn-success" onClick={this.createRoadBlock}>Block</button>
                <button className="btn-success" onClick={this.instantiateGame}>Play</button>
            </div>
        )
    }
}