import React, {Fragment, useState} from 'react';
import Typography from '@mui/material/Typography';
import { CSSTransition } from 'react-transition-group';
import { keyframes } from '@emotion/react';


const MessageCenter = (props) => {
    const {message} = props
    return (
        <Fragment>
            <Typography variant='h5' className="centerText">
                    <div> {message}</div>
            </Typography>
        </Fragment>
    )
}

export default MessageCenter;