class Hero {
    constructor(id, name, alias, city, team, attack = 50, defense = 50) {
        this.id = id
        this.name = name
        this.alias = alias
        this.city = city
        this.team = team
        this.attack = attack
        this.defense = defense
    }
}

export default Hero