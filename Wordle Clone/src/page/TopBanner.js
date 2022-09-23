import React, {Fragment} from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { textAlign } from '@mui/system';
import './components.css';

const TopBanner = (props) => {

    return (
        <Fragment>
            <Box sx={{mt: 2, mb: 10}} >
            <div className="header">
                Wordle
            </div>
            </Box>
        </Fragment>
    )
}

export default TopBanner;