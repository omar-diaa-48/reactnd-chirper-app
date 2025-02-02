import React, { useEffect } from 'react';
import { connect } from "react-redux";
import Tweet from './Tweet';


const Dashboard = (props) => {
    useEffect(() => {

    })
    return(
        <div>
            <h3 className='center'>Your Timeline</h3>
            <ul>
                {props.tweetsIds.map(id => (
                    <li key={id}>
                        <Tweet id={id}/>
                    </li>
                ))}
            </ul>  
        </div>
    )
}

function mapStateToProps({tweets}) {
    return{
        tweetsIds : Object.keys(tweets)
            .sort((a,b) => tweets[b].timestamp - tweets[a].timestamp)
    }
}

export default connect(mapStateToProps)(Dashboard)