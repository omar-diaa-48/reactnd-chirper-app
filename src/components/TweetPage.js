import React from 'react';
import { connect } from 'react-redux';
import Tweet from './Tweet';
import NewTweet from './NewTweet';

const TweetPage = (props) => {
    const id = props.id
    return(
        <div>
            <Tweet id={id} />
            <NewTweet id={id} />
            {props.replies.length !== 0 && (
               <div>
                    <h3 className='center'>Replies</h3>
                    <ul>
                        {props.replies.map(replyId => <li key={replyId}><Tweet id={replyId}/></li>)}
                    </ul>
               </div>
            )}
        </div>
    )
}

function mapStateToProps({authedUser, users, tweets}, props) {
    const {id} = props.match.params
    return {
        id,
        replies : !tweets[id]
        ? []
        : tweets[id].replies.sort((a,b) => tweets[b].timestamp - tweets[a].timestamp)
    }
}

export default connect(mapStateToProps)(TweetPage)