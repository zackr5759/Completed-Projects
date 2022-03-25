//
// Created by Zack on 4/5/2021.
//

#ifndef JSONTOKENIZER_JSONPARSER_HPP
#define JSONTOKENIZER_JSONPARSER_HPP
#include "JSONTokenizer.hpp"
#include "EntitySet.hpp"

class JSONParser {
public:
    JSONParser(std::string nameOfInputFile);

    Pair parseAPair();                  //parses a JSON pair with a colon separating the name and value
    EntityInstance parseJSONObject();   //parses between two curly braces
    EntitySet parseJSONEntity();        //parses between two square brackets

private:
    JSONTokenizer tokenizer; // the input file name is used to create an instance of JSONTOkenizer
    // please note that there is not an ampersand in front of "tokenizer"
};


#endif //JSONTOKENIZER_JSONPARSER_HPP
