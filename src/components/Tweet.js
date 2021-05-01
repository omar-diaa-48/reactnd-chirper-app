import React from 'react';
import { connect } from "react-redux";
import { formatTweet, formatDate } from "../utils/helpers";
import {TiArrowBackOutline,TiHeartOutline, TiHeartFullOutline } from 'react-icons/ti';
import { handleToggleTweet } from "../actions/tweets";
import { Link, withRouter } from "react-router-dom";

const Tweet = (props) => {
    const toParentTweet = (e, id) => {
        e.preventDefault();
        props.history.push(`/tweet/${id}`)
    } 

    const handleLike = (e) => {
        e.preventDefault();
        const {dispatch ,tweet, authedUser} = props
        dispatch(handleToggleTweet({
            id : tweet.id,
            hasLiked : tweet.hasLiked,
            authedUser
        }))
    }

    const {tweet} = props

    if(tweet === null) 
        return <p>Tweet doesn't exist</p>
    
    console.log(tweet);

    const {name, id, timestamp, text, avatar, hasLiked, likes, replies, parent} = tweet

    return(
        <Link to={`/tweet/${id}`} className='tweet'>
            <img className='avatar'
                alt={`Avatar of ${name}`}
                src={avatar}/>
            <div className='tweet-info'>
                <div>
                    <span>{name}</span>
                    <div>{formatDate(timestamp)}</div>
                    {parent && <button className='replying-to' onClick={(e) => toParentTweet(e,parent.id)}>
                        Replying to @{parent.author}
                        </button>}
                    <p>{text}</p>
                </div>
                <div className='tweet-icons'>
                    <TiArrowBackOutline className='tweet-icon'/>
                    <span>{replies!==0 && replies}</span>
                    <button className='heart-button' onClick={handleLike}>
                        {hasLiked === true
                        ? <TiHeartFullOutline color='#e0245e' className='tweet-icon' />
                        : <TiHeartOutline className='tweet-icon' />}
                    </button>
                    <span>{likes!==0 && likes}</span>
                </div>
            </div>
        </Link>
    )
}

function mapStateToProps({authedUser, users, tweets}, {id}) {
    const tweet = tweets[id]
    const parentTweet = tweet ? tweets[tweet.replyingTo] : null

    return{
        authedUser,
        tweet : tweet ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
                    : null
    }
}

export default withRouter(connect(mapStateToProps)(Tweet))