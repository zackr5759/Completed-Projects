//
// Created by Zack on 4/5/2021.
//

#include "JSONParser.hpp"
#include <iostream>

JSONParser::JSONParser(std::string nameOfInputFile):tokenizer{nameOfInputFile} {}

EntitySet JSONParser::parseJSONEntity() {
    JSONToken token = tokenizer.getToken();
    if( ! token.isOpenBracket() ) {
        std::cout << "Error: JSONParser::parseJSONEntity: Expected an open bracket, but found" << std::endl;
        token.print();
        std::cout << "Terminating..." << std::endl;
        exit(1);
    }
    EntitySet set;
    do{
        EntityInstance instance = parseJSONObject();
        set.addEntity(instance);
        token = tokenizer.getToken();
    }while (token.isComma());

    if( ! token.isCloseBracket() ) {
        std::cout << "Error: JSONParser::parseJSONEntity: Expected an close bracket, but found" << std::endl;
        token.print();
        std::cout << "Terminating..." << std::endl;
        exit(1);
    }
    return set;
}

EntityInstance JSONParser::parseJSONObject() {
    // parseJSONObject is responsible for parsing a JSON object. As such,
    // the first token is expected to be an open brace.
    JSONToken token = tokenizer.getToken();
    if( ! token.isOpenCurly() ) {
        std::cout << "Error: JSONParser::parseJSONObject: Expected an opening brace, but found" << std::endl;
        token.print();
        std::cout << "Terminating..." << std::endl;
        exit(1);
    }
    EntityInstance instance;
    do {
        Pair pair = parseAPair();
        instance.addPair(pair);
        token = tokenizer.getToken();
    } while( token.isComma() );  // after having read a pair, we expect a comma
    // So, the above loop terminates when we did find a comma.
    // that means we have parsed an entire object. In that case, token must contain
    // the close brace of that object.
    if( ! token.isCloseCurly() ) {
        std::cout << "Error: JSONParser::parseJSONObject: Expected a closing brace, but found" << std::endl;
        token.print();
        std::cout << "Terminating..." << std::endl;
        exit(1);
    }
    return instance;
}

Pair JSONParser::parseAPair() {
    JSONToken term = tokenizer.getToken();
    if( ! term.isTerm() ) {
        std::cout << "Error: JSONParser::parseAPair: Expected a term starting with a \", but found" << std::endl;
        term.print();
        std::cout << "Terminating..." << std::endl;
        exit(1);
    }
    JSONToken value = tokenizer.getToken(); // This is going to be the colon
    value = tokenizer.getToken();           // This is the actual value

    if( ! (term.isTerm() || term.isValue())) {
        std::cout << "Error: JSONParser::parseAPair: Expected a term or value, but found" << std::endl;
        term.print();
        std::cout << "Terminating..." << std::endl;
        exit(1);
    }
    if(value.isTerm()) { //if this returns true value is either the ID or term, if it doesnt, value is the gpa
        if (isalpha(value.getTerm().at(0))) { //if this returns true, value is the ID, if it doesnt, value is the term
            Pair pair(term.getTerm(), value.getTerm());
            return pair;    //return ID
        }
        Pair pair(term.getTerm(), value.getTerm());
        return pair;    //return term
    }else {
        Pair pair(term.getTerm(), value.getValue());
        return pair;    //return gpa
    }

}