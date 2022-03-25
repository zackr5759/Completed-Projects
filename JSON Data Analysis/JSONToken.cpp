//
// Created by Zack on 3/13/2021.
//

#include "JSONToken.hpp"
#include <string>
#include <iostream>
JSONToken::JSONToken():
     _isOpenBracket{false},
     _isCloseBracket{false},
     _isOpenCurly{false},
     _isCloseCurly{false},
     _isComma{false},
     _isColon{false},
     _isTerm{false},
     _isValue{false},
     _eof{false},
     Term{""},
     Value{0} {}

void JSONToken::print(){

    if(isOpenBracket()) {
        std::cout << "[" << std::endl;
    } else if(isCloseBracket() ) {
        std::cout << "]" << std::endl;
    } else if (isOpenCurly()){
        std::cout << "{" << std::endl;
    } else if (isCloseCurly() ){
        std::cout << "}" << std::endl;
    } else if(isComma()){
        std::cout << "," << std::endl;
    }else if (isColon()){
        std::cout << ":" << std::endl;
    }else if (isTerm()){
        std::cout << Term << std::endl;
    }else if (isValue()){
        std::cout << Value << std::endl;
    }else{
        std::cout << "unrecognizable tag" << std::endl;
    }
}