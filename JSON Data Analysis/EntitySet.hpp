//
// Created by Zack on 4/3/2021.
//

#ifndef JSONTOKENIZER_ENTITYSET_HPP
#define JSONTOKENIZER_ENTITYSET_HPP
#include"EntityInstance.hpp"
#include <vector>
#include <string>
class EntitySet {
public:
    EntitySet();

    void addEntity(EntityInstance &input){instances.push_back(input);}
    int getSize(){return instances.size();}
    EntityInstance at(int index){return instances.at(index);}
    void print();    // prints all instances of this Entity.

private:
    std::vector<EntityInstance> instances;
};


#endif //JSONTOKENIZER_ENTITYSET_HPP
