//
// Created by Zack on 4/10/2021.
//

#include "GPAMatrix.hpp"
#include <iostream>
#include <iomanip>

GPAMatrix::GPAMatrix(EntitySet &prevSet, EntitySet &curSet) {
    for(int i = 0; i < prevSet.getSize(); i++) {
        if(gpaMap.find(prevSet.at(i).id()) == gpaMap.end())
            gpaMap[prevSet.at(i).id()] = std::vector<double>();
        gpaMap[prevSet.at(i).id()].push_back(prevSet.at(i).gpa());
    }

    for(int i = 0; i < curSet.getSize(); i++) {
        if(gpaMap.find(curSet.at(i).id()) == gpaMap.end())
            gpaMap[curSet.at(i).id()] = std::vector<double>();
        gpaMap[curSet.at(i).id()].push_back(curSet.at(i).gpa());
    }
}

void GPAMatrix::print() {
    std::vector<std::vector<double>> printMatrix;
    printMatrix.resize(8);
    for (int i = 0; i < 8; i++)
        printMatrix[i].resize(8);

    for(auto & mapIter : gpaMap) {
        if(mapIter.second.size() == 2) {
            int row, column;
           row = gpaCategory(mapIter.second.at(0));
           column = gpaCategory(mapIter.second.at(1));
           printMatrix.at(column).at(row) += 1;
        }
    }
    std::cout << "[\n";
    for (int i = 0; i < printMatrix.size(); i++) {
        std::cout << "  [";
        for (int j = 0; j < printMatrix.at(i).size(); j++) {
            std::cout << std::setw(4) << printMatrix.at(i).at(j);
            if (j < printMatrix.at(i).size() - 1)
                std::cout << ", ";
        }
        std::cout << "]";
        if (i < printMatrix.size() - 1)
            std::cout << ",";
        std::cout << std::endl;
    }
    std::cout << "]\n";
}

int GPAMatrix::gpaCategory(double gpa) {
    if (gpa <= 1.67)return 7;
    else if (gpa<= 2.0)return 6;
    else if (gpa <= 2.3)return 5;
    else if (gpa <= 2.67)return 4;
    else if (gpa <= 3.0)return 3;
    else if (gpa <= 3.3)return 2;
    else if (gpa <= 3.67) return 1;
    else if (gpa <= 4.0) return 0;
    else {
        std::cout << "invalid gpa: " << gpa << std::endl;
        exit(1);
    }
}
