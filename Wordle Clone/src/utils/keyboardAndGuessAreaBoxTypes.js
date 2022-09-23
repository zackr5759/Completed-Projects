import {green, grey, orange} from '@mui/material/colors';

const boxStyleVariants = {
    exactMatch: {
        backgroundColor: green[400],
        color: grey[50],
        borderColor: green[400]
    },

    partialMatch: {
        backgroundColor: orange[200],
        color: grey[50],
        borderColor: orange[200]

    },

    noMatch: {
        backgroundColor: grey[500],
        color: grey[50],
        borderColor: grey[500]
    },

    blankBox: {
        backgroundColor: grey[50],
        color: grey[900],
        borderColor: grey[400]
    },

    notEvaluated: {
        backgroundColor: grey[50],
        color: grey[900],
        borderColor: grey[400]
    },

    greenBox: {
        backgroundColor: "#6ca965",
        color: "white",
        borderColor: grey[400]
    },

    yellowBox: {
        backgroundColor: "#c8b653",
        color: "white",
        borderColor: grey[400]
    },

    greyBox: {
        backgroundColor: "#787c7f",
        color: "white",
        borderColor: grey[400]
    },

    keyboardUnusedKey: {
        width: 43,
        height: 58,
        backgroundColor: '#d3d6da;',
        color: '#000000',
        borderColor: grey['A100'],
    }
};

export default boxStyleVariants;