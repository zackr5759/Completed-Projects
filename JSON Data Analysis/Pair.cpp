//
// Created by Zack on 4/3/2021.
//

#include "Pair.hpp"
#include <iostream>
#include <iomanip>
Pair::Pair(std::string attributeName, std::string attributeValue):
        _isNumber{false},
        _attributeName{attributeName},
        _attributeStringValue{attributeValue},
        _attributeNumberValue{-1} {}

Pair::Pair(std::string attributeName, double numValue):
        _isNumber{true},
        _attributeName{attributeName},
        _attributeStringValue{""},
        _attributeNumberValue{numValue} {}

void Pair::print(int numSpaces, bool addComma){

    if(_attributeName == "gpa")
        std::cout << std::setw(numSpaces) << " \"" << _attributeName << "\" : " << _attributeNumberValue;
    else
        std::cout << std::setw(numSpaces) << " \"" << _attributeName << "\" : \"" << _attributeStringValue << "\"";

    if(addComma)
        std::cout << ",";

    std::cout << std::endl;
}