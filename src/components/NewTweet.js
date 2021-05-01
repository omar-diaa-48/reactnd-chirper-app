import React, { useState } from 'react';
import {handleAddTweet} from '../actions/tweets';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";

const NewTweet = (props) => {
    const [text, setText] = useState('')
    const[toHome, setToHome] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault();
        const {dispatch, id} = props;
        dispatch(handleAddTweet(text, id))

        setText('')

        id ? setToHome(false) : setToHome(true) 
    }
    const handleChange = (e) => {
        setText(e.target.value)
    } 

    if(toHome)
        return <Redirect to='/' />

    return(
        <div>
            <h3 className='center'>Componse New Tweet</h3>
            <form className='new-tweet' onSubmit={handleSubmit}>
                <textarea
                    placeholder='Whats happening?'
                    value={text}
                    className='textarea'
                    onChange={handleChange}
                    maxLength={280}
                    />
            <button className='btn'
                    type='submit'
                    disabled={text === ''}>
                Submit
            </button>
            </form>
        </div>
    )
}

export default connect()(NewTweet)