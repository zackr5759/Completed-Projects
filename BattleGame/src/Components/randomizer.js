export const randomizer = (level, range, enemy) => {

    let names = ['Human', 'Hobbit', 'Elf']
    let enemyNames = ['Goblin','Mushroom', 'Skeleton', 'Eye Bat', 'Demon']
    let name
    let strength 
    let defense 
    let HP
    let accuracy 
    let lvl
    if(!enemy){
        let idx = Math.floor(Math.random() * 3)
        name = names[idx]

        let lRange = Math.floor(Math.random()*(range+1))
        lRange *= Math.round(Math.random()) ? 1 : -1

        lvl = level + lRange
        if(name === "Human"){
            strength = Math.ceil(Math.random() * (lvl)) + Math.floor(lvl/2)
            defense = Math.ceil(Math.random() * (lvl))
            HP = Math.round(Math.random() * (lvl*2)) + Math.round(6*(lvl*0.75))
            accuracy = 80
        }
        if(name === "Hobbit"){
            strength = Math.round(Math.random() * (lvl-1)) + 1 + Math.floor(lvl/2)
            defense = Math.round(Math.random() * (lvl-1))
            HP = Math.round(Math.random() * (lvl*2)) + Math.round(5*(lvl*0.75))
            accuracy = 100
        }
        if(name === "Elf"){
            strength = Math.ceil(Math.random() * (lvl+1)) + 1 + Math.floor(lvl/2)
            defense = Math.round(Math.random() * (lvl-1))
            HP = Math.round(Math.random() * (lvl*2)) + Math.round(5*(lvl*0.75))
            accuracy = 90
        }
    }
    else{
        let idx = Math.floor(Math.random() * 5)
        name = enemyNames[idx]

        let lRange = Math.floor(Math.random()*(range+1))
        lRange *= Math.round(Math.random()) ? 1 : -1

        lvl = level + lRange

        strength = Math.floor(Math.random() * 3) + 1
        defense = Math.floor(Math.random() * 1)
        HP = Math.floor(Math.random() * (lvl*2)) + Math.floor(5*(lvl*0.75))
        accuracy = 85
    }
    return {
        name: name, 
        lvl:lvl, 
        strength:strength, 
        defense:defense, 
        currHP: HP,
        maxHP: HP,
        accuracy:accuracy
    }
}