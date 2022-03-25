//
// Created by Zack on 4/3/2021.
//

#include "EntityInstance.hpp"
#include <iostream>
#include <iomanip>

std::vector<std::string> EntityInstance::attributeNames(){
    std::vector<std::string> temp;
    for(auto & entityPair : entityPairs){
        temp.push_back(entityPair.attributeName());
    }
    return temp;

}

void EntityInstance::print(bool comma){
    std::cout << std::setw(4) << "{" << std::endl;

    for(int i = 0; i < entityPairs.size(); i++){
        entityPairs.at(i).print(7, i < entityPairs.size()-1);
    }

    std::cout << std::setw(4) << "}";
    if(comma)
        std::cout << ",";
    std::cout << std::endl;
}

double EntityInstance::gpa(){
    for(auto & entityPair : entityPairs){
        if(entityPair.attributeName() == "gpa"){
            return entityPair.numberValue();
        }
    }
    std::cout << "gpa not found, terminating" << std::endl;
    exit(1);
}

std::string EntityInstance::id(){
    for(auto & entityPair : entityPairs){
        if(entityPair.attributeName() == "id"){
            return entityPair.stringValue();
        }
    }
    std::cout << "id not found, terminating" << std::endl;
    exit(1);
}


