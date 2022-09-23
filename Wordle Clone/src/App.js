import React, {Fragment, useState} from 'react';
import Box from '@mui/material/Box';
import {green} from '@mui/material/colors';


import GuessArea from "./page/GuessArea";
import Keyboard from "./page/Keyboard";
import MessageCenter from "./page/MessageCenter";
import TopBanner from "./page/TopBanner";

import {
    numGuessAreaRows,
    numGuessAreaColumns} from "./utils/sizes";
import boxStyleVariants from './utils/keyboardAndGuessAreaBoxTypes';

const wordList = require('./fiveLetterWords.json')
let random = Math.floor(Math.random() * 10119)
let answer = wordList.words[(random)]
let green1 = "#6ca965";
let yellow1 = "#c8b653";
let grey1 = "#787c7f";

function App() {


    const demoKeys = 'QWERTYUIOPASDFGHJKLZXCVBNM', demoNumKeys = demoKeys.length;

    const initialKeyBoard = () => {
        let keys = demoKeys.split("").map(letter => ({...boxStyleVariants.keyboardUnusedKey, letter: letter}))
        const backspaceKey = {
            ...boxStyleVariants.keyboardUnusedKey,
            width: 100,
            letter: 'Delete',
            isBackspaceKey: true
        }
        const enterKey = {
            ...boxStyleVariants.keyboardUnusedKey,
            width: 150,
            letter: 'ENTER',
            isEnterKey: true
        }
        keys.splice(19, 0, enterKey);
        keys.splice(27, 0, backspaceKey);

        return keys;
    }


    const [activeRow, setActiveRow] = useState(new Array(numGuessAreaColumns).fill(boxStyleVariants.blankBox));
    const [activeRowIdx, setActiveRowIdx] = useState(0);  // the index of the first letter that gets added to the active row.
    const [keyboard, setKeyboard] = useState(initialKeyBoard);

    const [completedRows, setcompletedRows] = useState(new Array(0));
    const [remainingRows, setremainingRows] = useState(new Array((numGuessAreaRows - 1) * numGuessAreaColumns).fill(boxStyleVariants.blankBox));
    const [message, setmessage] = useState("");
    const allBoxes = [...completedRows, ...activeRow, ...remainingRows]

    const correctCheck = () =>{ //check if the last entry was correct
        if(completedRows.length === 0)
            return false
        for(let i = completedRows.length-1; i > completedRows.length - 6; i--){
            if(completedRows[i].backgroundColor !== green1){
                return false 
            }
        }
        return true
    }

    const keyboardKeyPressedCallBack = (attrsOfKeyThatUserClicked) => {
        if(activeRowIdx === 0 && attrsOfKeyThatUserClicked.isBackspaceKey) {
            return; // activeRow is empty as such, there are no letters to erase.
        }
        if(attrsOfKeyThatUserClicked.isBackspaceKey && !correctCheck()) {
            setmessage("")
            const newActiveRow = activeRow.slice();
            newActiveRow[activeRowIdx - 1] = boxStyleVariants.blankBox;
            setActiveRow(newActiveRow);
            setActiveRowIdx(activeRowIdx - 1);
            return;
        }
        if(activeRowIdx === numGuessAreaColumns && attrsOfKeyThatUserClicked.isEnterKey) {
            let check = "";
            for(let i of activeRow)
                check += i.letter.toLowerCase();
            if(wordList.words.includes(check)){ //check if input word is valid
                const newActiveRow = activeRow.slice();
                let count = 0;
                for (let i of activeRow){
                    if(i.letter === answer[count].toUpperCase()){   //check if i is the correct letter
                        for(let j of keyboard){
                            if(j.letter === i.letter)
                                j.backgroundColor = green1;
                        }
                        newActiveRow[count] = {
                            ...boxStyleVariants.greenBox,
                            letter: i.letter
                        }
                        count++;
                        
                    }
                    else{   //Check if target letter is anywhere in the answer
                        let flag = false;
                        for(let j of answer){
                            if(i.letter === j.toUpperCase() && !flag){ //is i anywhere in j
                                for(let j of keyboard){
                                    if(j.letter === i.letter && j.backgroundColor !== green1)
                                        j.backgroundColor = yellow1;
                                }
                                newActiveRow[count] = {
                                    ...boxStyleVariants.yellowBox,
                                    letter: i.letter
                                }
                                flag = true;
                                count++
                            }
                        }
                        if (!flag){ //Target was not in the answer at all
                            for(let j of keyboard){
                                if(j.letter === i.letter){
                                    j.backgroundColor = grey1;
                                    j.color = "#000000"
                                }
                            }
                            newActiveRow[count] ={
                                ...boxStyleVariants.greyBox,
                                letter: i.letter
                            }
                            count++;
                        }
                    }
                }
                for (let i of newActiveRow)
                    completedRows.push(i)
                setcompletedRows(completedRows)
                setActiveRow(remainingRows.splice(0,5));
                setremainingRows(remainingRows)
                setActiveRowIdx(0);

                let correctFlag = true;
                for(let i of newActiveRow){
                    if(i.backgroundColor != green1){
                        correctFlag = false
                    }
                }
                if(correctFlag){
                    setmessage("Game Over! You guessed the answer correctly")
                    setActiveRowIdx(5)
                }
                else if(completedRows.length === 30)
                    setmessage("Game Over! You failed to guess: " + answer)
                
                return;
            }
            else{
                setmessage("Not in word list");
            }
            // evaluate user's work that is now in activeRow. The feedback boxes get
            // stored in a 5-element array and get pushed into the completedRows.
            // the activeRow gets reset to 5 blank boxes.
            // the number of elements in remainingRows gets reduced by 5.
            // if the remainingRows is empty, game is over. Display a message in the
            // message center.
        }
        if(attrsOfKeyThatUserClicked.isEnterKey) {
            // ignore the enter key as there are not enough letters in activeRow
            return;
        }

        if(activeRowIdx === numGuessAreaColumns) {
            // activeRow is already full.
            return;
        }

        if(completedRows.length !== 30 && !attrsOfKeyThatUserClicked.isBackspaceKey){
            setmessage("")
            const newActiveRow = activeRow.slice();
            newActiveRow[activeRowIdx] = { ...boxStyleVariants.notEvaluated, letter: attrsOfKeyThatUserClicked.letter};
            setActiveRow(newActiveRow);
            setActiveRowIdx(activeRowIdx + 1);
        }
    }



    return (
      <Fragment>
          <Box margin='auto'
            sx={{
                height: 600,
                width: 500,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-top ',
            }}
          >
              <TopBanner />
              <GuessArea  guessAreaBoxes={allBoxes} />
              <MessageCenter message={message}/>
        
              <Keyboard keyboard={keyboard} demoNumKeys={demoNumKeys} onClickCallback={keyboardKeyPressedCallBack} />
          </Box>
      </Fragment>
  );
}

export default App;
