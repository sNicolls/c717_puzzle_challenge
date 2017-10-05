import React, {Component} from 'react';
import SpeckleSpackleCreate from './speckle_spackle_create';
import SpeckleSpackleTestPlay from './speckle_spackle_testplay';
import CreateCheckModal from './create_check_modal';
import SubmitModal from '../common_components/submit_modal';
import Axios from 'axios';
import './speckle_spackle_style.css';

class SpeckleSpackleApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataRequested : false,
            modalInfo : null,
            submitModalInfo : null,
            showModal : "noModal",
            showSubmitModal : "noModal",
            puzzle_name : "Test Puzzle",
            submitted: false,
            createStyle : {
                display : "none"
            },
            testStyle : {
                display : "block"
            },
            gameInfo : {
                color0 : [255, 255, 255],
                color1 : [132,0,0],
                color2 : [0,105,113],
                color3 : [130,137,72],
                numOfColors : 3,
                gridSize : 4,
                gameGrid : []
            }
        }
        this.URL_EXT = '/savepuzzle';
        this.submitPuzzle = this.submitPuzzle.bind(this);
        this.changeVisibility = this.changeVisibility.bind(this);
        this.checkPuzzleValidty = this.checkPuzzleValidty.bind(this);
        this.testPlay = this.testPlay.bind(this)
        this.submitConfirmation = this.submitConfirmation.bind(this);
        this.updatePuzzleName = this.updatePuzzleName.bind(this);
        this.successfulSubmit = this.successfulSubmit.bind(this);
    }

    componentWillMount() {
        this.props.updateCurrentPath("speckle_spackle_create", '', 'create', [this.testPlay, this.changeVisibility, this.submitConfirmation]);
    }

    submitPuzzle(req, res) {
        Axios.post(SERVER_BASE_ADDRESS + this.URL_EXT, {
            puzzle_name : this.state.puzzle_name,
            type : "speckle_spackle",
            size : `${this.state.gameInfo.gridSize}x${this.state.gameInfo.gridSize}`,
            puzzle_object : this.state.gameInfo,
            withCredentials:true
        }).then(this.successfulSubmit).catch(err => {
            console.log("Error Loading Puzzle: ", err);
        });
    }

    successfulSubmit() {
        console.log("Puzzle Submitted!");
        this.setState({
            submitted: true
        })
    }

    updatePuzzleName(responseFromModal) {
        console.log("Receiving New Name:", responseFromModal)
        this.setState({
            puzzle_name : responseFromModal
        })
    }

    submitConfirmation() {
        this.setState({
            showSubmitModal : "showModal",
        })
    }

    testPlay() {
        this.setState({
            dataRequested : true,
        })
    }

    close() {
        this.setState({
            showModal: "noModal",
            showSubmitModal: "noModal"
        })
    }
    
    changeVisibility() {
        if (this.state.testStyle.display === "block") {
            this.props.updateCurrentPath("speckle_spackle_create", '', 'testplay', [this.testPlay, this.changeVisibility, this.submitConfirmation]);
            this.setState({
                createStyle : {display : "block"},
                testStyle : {display : "none"},
                showModal : "noModal"
            })
        } else {
            this.props.updateCurrentPath("speckle_spackle_create", '', 'create', [this.testPlay, this.changeVisibility, this.submitConfirmation]);
            this.setState({
                createStyle : {display : "none"}, 
                testStyle : {display : "block"},
                showModal : "noModal"
            })
        }
    }

    checkPuzzleValidty(newGameInfo) {
        const rowLog = this.isEachColorInEveryRowOnce({...newGameInfo}, ['color1', 'color2', 'color3']);
        const columnLog = this.isEachColorInEveryColumnOnce({...newGameInfo}, ['color1', 'color2', 'color3']);
        this.setState({
            showModal : "showModal",
            modalInfo : [rowLog, columnLog]
        })
    }

    isEachColorInEveryRowOnce(gameInfo, colorArr) {
        let rowLog = [];
        const { gameGrid, gridSize } = gameInfo;
        for (let i = 1; i <= gridSize; i++) {
            let colorArray = [...colorArr];
            for (let k = i * (gridSize + 2) + 1; k <= i * (gridSize + 2) + gridSize; k++) {
                if (gameGrid[k].colorNum !== "color0") {
                    const indexOfColor = colorArray.indexOf(gameGrid[k].colorNum)
                    if (indexOfColor === -1) {
                        rowLog.push(`In Row ${i} there was a duplicate of ${gameGrid[k].colorNum}`)
                    } else {
                        colorArray.splice(indexOfColor, 1);
                    }
                }
            }
            if (colorArray.length > 0) {
                rowLog.push(`In Row ${i}, you are missing ${colorArray.length} color(s)`)
            } 
        }
        return rowLog;
    }
    
    isEachColorInEveryColumnOnce(gameInfo, colorArr) {
        let columnLog = [];
        const { gameGrid, gridSize } = gameInfo;
        const outerGrid = gridSize + 2;
        for (let i = 1; i <= gridSize; i++) {
            let colorArray = [...colorArr]
            for (let k = i + outerGrid; k <= i + (gridSize * outerGrid); k += outerGrid) {
                if (gameGrid[k].colorNum !== "color0") {
                    const indexOfColor = colorArray.indexOf(gameGrid[k].colorNum)
                    if (indexOfColor === -1) {
                        columnLog.push(`In Column ${i} there was a duplicate of ${gameGrid[k].colorNum}`)
                    } else {
                        colorArray.splice(indexOfColor, 1);
                    }
                }
            }
            if (colorArray.length > 0) {
                columnLog.push(`In Column ${i}, you are missing ${colorArray.length} color(s)`)
            } 
        }
        return columnLog;
    }

    gameInfoCallback = (gameInfoFromChild) => {
        this.setState({
            dataRequested : false,
            gameInfo : {...gameInfoFromChild}
        })
        this.checkPuzzleValidty({...gameInfoFromChild});
    }

    render() {
        const { testStyle, createStyle, gameInfo, dataRequested, submitted } = this.state;
        if (createStyle['display'] === "none") {
            return (
                <div>
                    <CreateCheckModal info={this.state.modalInfo} play={() => this.changeVisibility()} showModal={this.state.showModal} closeModal={() => {this.close()}} />
                    <SpeckleSpackleCreate gameInfo={{...gameInfo}} gameInfoCallback={this.gameInfoCallback} dataRequested={dataRequested} />    
                </div>
            )
        } else {
            return (
                <div>
                    <SubmitModal showModal={this.state.showSubmitModal} updatePuzzleName={this.updatePuzzleName} isSubmitted={submitted} submit={this.submitPuzzle} closeModal={() => {this.close()}} />
                    <SpeckleSpackleTestPlay gameInfo={JSON.parse(JSON.stringify(gameInfo))}/>    
                </div>
            )
        }
    }
}

export default SpeckleSpackleApp;