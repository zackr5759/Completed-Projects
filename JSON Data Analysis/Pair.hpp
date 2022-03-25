//
// Created by Zack on 4/3/2021.
//

#ifndef JSONTOKENIZER_PAIR_HPP
#define JSONTOKENIZER_PAIR_HPP
#include <string>

class Pair {
public:
    // use the first constructor if the value of the pair is a string
    // and use the second one if it is a double value.
    Pair(std::string attributeName, std::string attributeValue);
    Pair(std::string attributeName, double numValue);
    bool &isDouble(){return _isNumber;}      // is the datatype of the value of this attribute a double?
    double &numberValue(){return _attributeNumberValue;}
    std::string &stringValue(){return _attributeStringValue;}
    std::string &attributeName(){return _attributeName;}

    void print(int numSpaces, bool addComma);

private:
    std::string _attributeName, _attributeStringValue;
    double _attributeNumberValue;
    bool _isNumber;
};



#endif //JSONTOKENIZER_PAIR_HPP
