import React, { Component } from 'react';
import Draggable from 'react-draggable';

export default class extends Component {
    constructor(props){
        super(props);
        this.handleDrag = this.handleDrag.bind(this);
        this.handleEnd = this.handleEnd.bind(this);
        this.state = {
            gameBoardWidth: null,
            oneBoardUnit: null,

            tallPieceWidth: null,
            tallPieceHeight: null,
            longPieceHeight: null,
            longPieceWidth: null,

            piecePos: null,
            holderX: 0,
            mainX: 0,
            mainY: 0,
            needsReset: false,
            posToResetTo: 0,
        }
    }
    //WHEN THE COMPONENT MOUNTS, SET BOARD WIDTH
    componentDidMount(){
        const gameBoardWidth = document.getElementsByClassName("gameBoardDiv")[0].clientHeight;
        const oneBoardUnit = document.getElementsByClassName("gameBoardDiv")[0].clientHeight/6;

        this.setState({
            gameBoardWidth: gameBoardWidth,
            oneBoardUnit: oneBoardUnit,
            mainY: oneBoardUnit*2,
            tallPieceHeight: oneBoardUnit*2,
            tallPieceWidth: oneBoardUnit,
            longPieceHeight: oneBoardUnit,
            longPieceWidth: oneBoardUnit*2
        })
    }

    handleDrag(ev){

        var thisPiecePos = ev.target.getBoundingClientRect();
        var thisPieceIndex = ev.target.id;

        var pieces = document.getElementsByClassName("gamePiece");
        var starterPiecePos = document.getElementsByClassName("starterPiece")[0].getBoundingClientRect();
        var piecePosArr = [];


        for (var i = 0; i < pieces.length; i++) {
            piecePosArr.push(pieces[i].getBoundingClientRect())
        }

        piecePosArr.map((piecePos, index)=>{

             if(index == thisPieceIndex){

             } else if (thisPiecePos.right - piecePos.left > 1){
                 this.setState({
                     needsReset: true,
                     posToResetTo: piecePos.left,
                 })
            }
        });


        if(this.state.needsReset === false && starterPiecePos.right + starterPiecePos.width > 408){
            console.log("WIN")
        }
        //WIN CONDITION!!!!!!
        // if(starterPiecePos.left){
        //     console.log("WIN")
        // }
    }



    handleEnd(ev){

        if(this.state.needsReset === true){
            console.log("RESETTING")
            this.setState({
                mainX: this.state.posToResetTo - ev.target.getBoundingClientRect().right,
                needsReset: false,
            })

        }
        // this.setState({
        //
        // })
        //
        // console.log(this.state.holderX)
    }
render() {
    const pieceArr = [];

        this.props.pieceStack.map((piece, index)=>{
            const pieceType = piece.type
            var pieceHeight = null;

            if(piece.type === "unBlock_tallPiece"){
                var yPos = this.state.oneBoardUnit*piece.yPos;
                var xPos = this.state.oneBoardUnit*piece.xPos;

                pieceArr.push(
                    <Draggable axis={piece.axis} bounds='parent' onDrag={this.handleDrag}>
                        <div id={index + 1} className={pieceType + ' gamePiece'} style={
                            {
                                width: this.state.tallPieceWidth,
                                height: this.state.tallPieceHeight,
                                top: yPos,
                                left: xPos,
                            }
                        }
                        >
                        </div>
                    </Draggable>
                )
            } else if(piece.type === "unBlock_longPiece"){
                var yPos = this.state.oneBoardUnit*piece.yPos;
                var xPos = this.state.oneBoardUnit*piece.xPos;

                    pieceArr.push(
                        <Draggable axis={piece.axis} bounds='parent' onDrag={this.handleDrag}>
                            <div id={index + 1} className={pieceType + ' gamePiece'} style={
                                {
                                    width: this.state.longPieceWidth,
                                    height: this.state.longPieceHeight,
                                    top: yPos,
                                    left: xPos,
                                }
                            }
                            >
                            </div>
                        </Draggable>
                    )
            }

        });

        return (
            <div className="gameBoardDiv">
                <Draggable axis="x" bounds="parent"  onDrag={this.handleDrag} onStop={this.handleEnd}>
                    <div
                        id={0} className="starterPiece gamePiece" style={
                            {
                                top: this.state.oneBoardUnit*2,
                                left: this.state.mainX,
                                width: this.state.oneBoardUnit*2,
                                height: this.state.oneBoardUnit
                            }
                        }
                    >
                    </div>
                </Draggable>
                {pieceArr}
            </div>
        )
    }
}
//position={{x: this.state.mainX, y: this.state.mainY}
//${event.target.style.transform.match(/\d+/g)[0] - 1}