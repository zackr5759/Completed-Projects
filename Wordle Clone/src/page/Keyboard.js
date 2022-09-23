import React, {Fragment} from 'react';
import Box from '@mui/material/Box';
import {Grid} from "@mui/material";

import {
    keyboardBoxSizes,
    keyboardRowsHGap} from "../utils/sizes";

const KeyboardLetterBox = (props) => {

    const {keyAttributes} = props;

    // console.log(`keyboardBoxSizes ${JSON.stringify(keyAttributes)}`);
    if(keyAttributes.letter === 'Delete'){
        return (
            <Box className = "key" id="image" sx={{
                ...keyboardBoxSizes,
                border: 1,
                ...keyAttributes
            }}>
                
            </Box>
        )
    }
    
    return (
        <Box className = "key" sx={{
            ...keyboardBoxSizes,
            border: 1,
            ...keyAttributes
        }}>
            {keyAttributes.letter}
        </Box>
    )
}

const Keyboard = (props) => {

    const {keyboard, onClickCallback} = props;
    const key1 = keyboard.slice(0, 10);
    const key2 = keyboard.slice(10, 19);
    const key3 = keyboard.slice(19, 28);

    return (
        <Fragment>
            <Grid container columns={key1.length} className="centerSelf bottom1"
                   sx={{
                       width: key1.length * keyboardBoxSizes.width + (key1.length - 1) * keyboardRowsHGap + 200,
                   }}
            >
                {
                    key1.map((keyAttributes, idx) =>
                        <Grid item
                              key={idx}
                              xs={1}
                              sx={{mb: 1}}
                              className="centerText"
                              onClick={() => onClickCallback(keyAttributes)}
                              
                        >
                            <KeyboardLetterBox keyAttributes={keyAttributes}/>
                        </Grid>
                    )
                }
            </Grid>
            <Grid  container columns={key2.length} className="centerSelf bottom2"
                   sx={{
                       width: key2.length * keyboardBoxSizes.width + (key2.length - 1) * keyboardRowsHGap + 200,
                   }}
            >
                {
                    key2.map((keyAttributes, idx) =>
                        <Grid item
                              key={idx}
                              xs={1}
                              sx={{mb: 1}}
                              className="centerText"
                              onClick={() => onClickCallback(keyAttributes)}
                        >
                            <KeyboardLetterBox keyAttributes={keyAttributes}/>
                        </Grid>
                    )
                }
            </Grid>
            <Grid  container columns={key3.length}  className="centerSelf bottom3"
                   sx={{
                       width: key3.length * keyboardBoxSizes.width + (key3.length - 1) * keyboardRowsHGap + 200,
                   }}
            >
                {
                    key3.map((keyAttributes, idx) =>
                        <Grid item
                              key={idx}
                              xs={1}
                              sx={{mb: 1}}
                              className="centerText"
                              onClick={() => onClickCallback(keyAttributes)}
                        >
                            <KeyboardLetterBox keyAttributes={keyAttributes}/>
                        </Grid>
                    )
                }
            </Grid>
        </Fragment>
    )
}

export default Keyboard;