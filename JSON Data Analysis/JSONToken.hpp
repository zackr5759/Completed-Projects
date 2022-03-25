//
// Created by Zack on 3/13/2021.
//

#ifndef JSONTOKENIZER_JSONTOKEN_HPP
#define JSONTOKENIZER_JSONTOKEN_HPP

#include <string>


class JSONToken {
public:
    JSONToken();
    bool &isOpenBracket(){return _isOpenBracket;}
    bool &isCloseBracket(){return _isCloseBracket;}

    bool &isOpenCurly(){return _isOpenCurly;}
    bool &isCloseCurly(){return _isCloseCurly;}

    bool &isComma(){return _isComma;}
    bool &isColon(){return _isColon;}

    bool &isTerm(){return _isTerm;}
    bool &isValue(){return _isValue;}

    bool &endOfFile(){return _eof;}

    std::string &getTerm() { return Term; }

    double &getValue() { return Value; }

    void print();

private:
    bool _isOpenBracket, _isCloseBracket, _isOpenCurly, _isCloseCurly,
    _isComma, _isColon, _isTerm, _isValue, _eof;

    std::string Term;
    double  Value;


};
#endif //JSONTOKENIZER_JSONTOKEN_HPP
