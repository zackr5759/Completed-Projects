//
// Created by Zack on 4/10/2021.
//

#ifndef JSONTOKENIZER_GPAMATRIX_HPP
#define JSONTOKENIZER_GPAMATRIX_HPP
#include <map>
#include "EntitySet.hpp"

class GPAMatrix {
public:
    GPAMatrix(EntitySet &prevSet, EntitySet &curSet);   //constructor that populates the gpaMap
    int gpaCategory(double gpa);                        //simply returns 0-7 based on the given double
    void print();                                       //Print the matrix based on the values in the gpaMap

private:
    std::map<std::string, std::vector<double>> gpaMap;
};

#endif //JSONTOKENIZER_GPAMATRIX_HPP
