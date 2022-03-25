//
// Created by Zack on 4/3/2021.
//

#include "EntitySet.hpp"
#include <iostream>

void EntitySet::print() {
    std::cout << "[" << std::endl;
    for (int i = 0; i < instances.size();i++){
        instances.at(i).print(i < instances.size()-1);
    }
    std::cout << "]" << std::endl;

}

EntitySet::EntitySet() = default;
