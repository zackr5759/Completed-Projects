
import { randomizer } from "./Components/randomizer";

let blankUnit = {name: "unitName", lvl:0, strength:0, defense:0, currHP: 0, maxHP: 0}

function createInitialState() {
    let units = Array(3).fill({name: "unitName", lvl:0, strength:0, defense:0, currHP: 0, maxHP: 0});
    return {
        mode: 'start',
        units:units,
        members:0,
        stage:1,
        enemies:1,
        gold:300,
        currFighter:units[0],
        currFighterSlot:-1,
        enemy:randomizer(1, 0, true),
        fightText:[],
        stageMap:"battle1",
        items:[]

    };
}

function addMember(state, unit){
    let units = state.units
    let members = state.members
    if(members < 3){
        for(let i = 0; i < 3; i++){
            if(units[i].name === "unitName"){
                units[i] = unit
                members += 1
                i = 3
            }
        }
    }
    return {
        ...state,
        units:units,
        members:members
    };
}

function advanceEnemy(state){
    let enemy = randomizer(state.stage, 0, true)

    let percent = (Math.random() * .50) + .90
    let loot = Math.floor(state.enemy.lvl * 50 * percent)

    if(state.enemies === 5)
        return advanceStage({...state,
                            gold:state.gold+loot})
    return {
        ...state,
        enemies:state.enemies+1,
        enemy:enemy,
        fightText:["Stage advanced, next battle commencing"],
        currFighter:blankUnit,
        gold:state.gold+loot
    }
}

function advanceStage(state){
    let enemy = randomizer(state.stage+1, 0, true)
    let old = "battle" + state.stage
    let next = "battle" + (state.stage+1)
    document.getElementById(old).id = next; 
    return {
        ...state,
        mode:"shop",
        enemies:1,
        stage:state.stage+1,
        enemy:enemy,
        fightText:["Stage advanced, next battle commencing"],
        currFighter:blankUnit
    }
}

function fighterDeath(state){
    if(state.members === 1)
        return createInitialState()
    state.units[state.currFighterSlot] = blankUnit
    return {
        ...state,
        currFighter:blankUnit,
        members:state.members-1
    }
}

function attack(state){
    let currFighter = state.currFighter
    if(currFighter.name === "unitName")
        return state
    let enemy = state.enemy
    if(enemy.name === "unitName")
        return state
    let d1 = currFighter.strength - enemy.defense
    let d2 = enemy.strength - currFighter.defense

    state.fightText.push(`${currFighter.name} attacks!`)
    enemy.currHP -= d1
    state.fightText.push(`Enemy ${state.enemy.name} takes ${d1} damage!`)
    if(enemy.currHP > 0){
        state.fightText.push(`Enemy ${enemy.name} attacks!`)
        currFighter.currHP -= d2
        state.fightText.push(`${state.currFighter.name} takes ${d2} damage!`)
    }

    if (currFighter.currHP <= 0){
        return state = fighterDeath(state)
    }
    if(enemy.currHP <= 0){
        return state = advanceEnemy(state)
    }
    else return {
        ...state,
        currFighter:currFighter,
        enemy:enemy,
        fightText:state.fightText
    }

}

function defend(state){
    let currFighter = state.currFighter
    if(currFighter.name === "unitName")
        return state
    let enemy = state.enemy
    if(enemy.name === "unitName")
        return state
    state.fightText.push(`${currFighter.name} defends!`)
    let d1 = enemy.strength - (Math.floor(currFighter.defense * 1.5) + 1)

    state.fightText.push(`Enemy ${enemy.name} attacks!`)
    currFighter.currHP -= d1
    state.fightText.push(`${state.currFighter.name} takes ${d1} damage!`)

    if (currFighter.currHP <= 0){
        return state = fighterDeath(state)
    }
    if(enemy.currHP <= 0){
        return state = advanceStage(state)
    }else return {
        ...state,
        currFighter:currFighter,
        enemy:enemy,
        fightText:state.fightText
    }
}

function setFighter(state, action){
    let log = []
    log.push(`${state.units[action.num].name} has joined the battle`)
    log.push(`Enemy ${state.enemy.name} has joined the battle`)
    log.push(`Begin!`)
    return {
        ...state,
        currFighter:state.units[action.num],
        currFighterSlot:action.num,
        fightText:log
    }
}

function reducers(state, action) {
    if( state === undefined )
        return state;

    if( action.type === 'START' ) {
        return createInitialState()
    }

    if(action.type === "BATTLE"){
        return {
            ...state,
            mode:'battle'
        }
    }

    if(action.type === "ATTACK"){
        return attack(state)
    }

    if(action.type === "DEFEND"){
        return defend(state)
    }

    if( action.type === "SHOP") {
        return {
            ...state,
            mode:'shop'
        }
    }

    if(action.type === "SET_F"){
        return setFighter(state, action)
    }

    if(action.type === "PURCHASE"){
        return addMember(state, action.unit)
    }
}

export {
    reducers,
    createInitialState,
}