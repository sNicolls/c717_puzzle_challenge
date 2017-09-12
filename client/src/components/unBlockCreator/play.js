import React from 'react';

export default (props) => {
    const {longPieces, tallPieces} = props;
    console.log("This is our longPieces ", longPieces);
    console.log("These are the this.refs.playGame ", this.refs);
    const varrr = longPieces.map((piece) =>{
        {piece}
    });
    console.log(varrr);
    return(
        <div>{varrr}</div>
    )
}