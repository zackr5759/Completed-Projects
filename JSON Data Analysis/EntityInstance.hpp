//
// Created by Zack on 4/3/2021.
//

#ifndef JSONTOKENIZER_ENTITYINSTANCE_HPP
#define JSONTOKENIZER_ENTITYINSTANCE_HPP
#include <vector>
#include <string>
#include "Pair.hpp"

class EntityInstance {
public:
    void addPair(Pair pair){entityPairs.push_back(pair);}
    int numAttributes(){return entityPairs.size();}  // how many pairs are in this instance?
    std::vector<std::string> attributeNames();
    void print(bool comma);   // prints this object (not used in final phase)

    double gpa();       //returns the GPA of the entity
    std::string id();   //returns the ID of the entity

private:
    std::vector<Pair> entityPairs;


};


#endif //JSONTOKENIZER_ENTITYINSTANCE_HPP
