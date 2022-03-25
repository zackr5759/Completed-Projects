//
// Created by Zack on 3/13/2021.
//

#include "JSONTokenizer.hpp"
#include <iostream>

JSONTokenizer::JSONTokenizer(const std::string &name):inputFileName{name} {
    inputStream.open(inputFileName, std::ios::in);  // open the input file. We will make sure that it is open in getToken.
}

JSONToken JSONTokenizer::getToken() {
    char c;

    if (!inputStream.is_open()) {
        std::cout << "JSONTokenizer::getToken() called with a stream that is not open." << std::endl;
        std::cout << "Make sure that " << inputFileName << " exists and is readable. Terminating.";
        exit(2);
    }
    JSONToken token;
    inputStream >> c;

    if (inputStream.eof()) {
        token.endOfFile();
    } else if (c == '[') {
        token.isOpenBracket() = true;
    } else if (c == ']') {
        token.isCloseBracket() = true;
    } else if (c == '{') {
        token.isOpenCurly() = true;
    } else if (c == '}') {
        token.isCloseCurly() = true;
    } else if (c == ',') {
        token.isComma() = true;
    } else if (c == ':') {
        token.isColon() = true;
    } else if (c == '"') {
        return makeTermToken();
    } else if (isdigit(c)) {
        return makeValueToken(c);
    }else{

    }
    return token;
}

JSONToken JSONTokenizer::makeTermToken(){
    char c;
    JSONToken token;
    token.isTerm() = true;
    while (inputStream.get(c)){
        if(c == '"')
            return token;
        else
            token.getTerm() += c;
    }
    return token;
}

JSONToken JSONTokenizer::makeValueToken(const char &inChar){
    char c;
    inputStream.putback(inChar);
    JSONToken token;
    double value;
    inputStream >> value;
    token.isValue() = true;
    token.getValue() = value;
    return token;
}
