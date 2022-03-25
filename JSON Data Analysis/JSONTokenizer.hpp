//
// Created by Zack on 3/13/2021.
//

#ifndef JSONTOKENIZER_JSONTOKENIZER_HPP
#define JSONTOKENIZER_JSONTOKENIZER_HPP

#include <string>
#include <fstream>
#include "JSONToken.hpp"

class JSONTokenizer {

public:
    JSONTokenizer(const std::string &name);
    JSONToken getToken();                           //returns next the next token from the inputStream

    JSONToken makeTermToken();                      //used by getToken to return a term token
    JSONToken makeValueToken(const char &inChar);   //used by getToken to return a value token

private:
    std::string inputFileName;
    std::ifstream inputStream;

};


#endif //JSONTOKENIZER_JSONTOKENIZER_HPP
