import React, {Component} from 'react';
import PageTitle from './page_title';
import './profile_style.css';
import axios from 'axios';


export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: props.user_id,
            data: null,
            pData: [],
        }

        this.URL_EXT = '/getSolvedPuzzles';
        this.QUERY_KEY = 'retrieve';
        this.QUERY_VAL = 'getSolvedPuzzles';
        this.handleData = this.handleData.bind(this);

        this.URL_EXT_B = '/getPuzzleFromId';
        this.QUERY_VAL_B = 'getPuzzleFromId'
        this.handlePuzzleData = this.handlePuzzleData.bind(this);
    }

    componentWillMount() {
        this.getData();
    }

    getData() {
        axios.get(this.URL_EXT + '?' + this.QUERY_KEY + '=' + this.QUERY_VAL + '&' + 'user_id' + '=' + this.state.user_id).then(this.handleData).catch(err => {
            console.log("Error getting created puzzles: ", err);
        });
    }

    handleData(response) {
        var fetchedData = response.data.data;
        this.setState({
            data: fetchedData
        });

        fetchedData.map((item, index)=>{
            axios.get(this.URL_EXT_B + '?' + this.QUERY_KEY + '=' + this.QUERY_VAL_B + '&' + 'p_id' + '=' + item.puzzle_id).then(this.handlePuzzleData).catch(err => {
                console.log("Error getting created puzzles: ", err);
            });
        })
    }
    handlePuzzleData(response){
        var holder = this.state.pData;
        holder.push(response.data.data)
        this.setState({
            pData: holder
        })
    }

    render() {

        const {data, pData} = this.state;

        if (data === null || pData < data.length) {
            return <h1>Loading...</h1>
        } else {
            const list = data.map((item, index) => {
                console.log(pData[index][0])
                return (
                    <tr key={index} onClick={() => {
                        this.callModal(item)
                    }}>
                        <td>{pData[index][0].puzzle_name}</td>
                        <td className="text-center">{pData[index][0].type}</td>
                        <td className="text-center">{pData[index][0].size}</td>
                        <td>{item.completionTime}</td>
                    </tr>
                )
            })

            return (
                <div>
                    <PageTitle backgroundImg="cityscape" color="white" text="SOLVED"/>
                    <table className="table table-inverse table-striped table-hover">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Size</th>
                            <th>Time</th>
                        </tr>
                        </thead>
                        <tbody>
                         {list}
                        </tbody>
                    </table>
                </div>
            )
        }
    }
}