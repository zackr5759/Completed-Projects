//
// Created by Zack on 4/3/2021.
//
// This project was done in multiple phases and some files were created before others
//
// Compile with g++ *.cpp *.hpp and pass in prev_pp.json and curr_pp.json to executable
//

/*
    This program parses specifically styled JSON files using a tokenizer to generate a matrix that describes how students grades changed
    from the given previous semester to the given current semester. The given GPA can be of range 0-4 and is divided into 8 categories 0-7.
    The resulting matrix would have a student's row position decided by their first semester grade and their column position decided by the second.
    Therefore, if a student got a GPA of 0.1 the first semester and then a GPA of 4 the second semester, the student would be in position [0,8]
*/

#include <iostream>
#include "JSONParser.hpp"
#include "GPAMatrix.hpp"

int main(int argc, char *argv[]) {
    if (argc != 3) {
        std::cout << "usage: " << argv[0] << " (earlier_semester).json (latter_semester).json";
        exit(1);
    }
    std::ifstream inputStream;

    inputStream.open(argv[1], std::ios::in);    // open for reading
    if (!inputStream.is_open()) {
        std::cout << "Unable to open " << argv[1] << ". Terminating...";
        exit(2);
    }
    inputStream.close();
    JSONParser prevParser(argv[1]); // The Tokenizer opens and reads from the input file.
    EntitySet prevSet = prevParser.parseJSONEntity();

    int testPhase2 = false;

    if( testPhase2 ) {
        prevSet.print();
    } else {
        inputStream.open(argv[2], std::ios::in);    // open for reading
        if (!inputStream.is_open()) {
            std::cout << "Unable top open " << argv[2] << ". Terminating...";
            exit(2);
        }
        inputStream.close();
        JSONParser curParser(argv[2]); // The Tokenizer opens and reads from the input file.
        EntitySet curSet = curParser.parseJSONEntity();

        GPAMatrix gpaMatrix(prevSet, curSet);
        gpaMatrix.print();
    }
    //Create and print matrix from both sets

}

