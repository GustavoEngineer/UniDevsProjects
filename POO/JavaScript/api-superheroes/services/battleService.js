import heroRepository from '../repositories/heroRepository.js'
import villainRepository from '../repositories/villainRepository.js'
import battleRepository from '../repositories/battleRepository.js'

// Función para elegir aleatoriamente entre ataque y defensa
function getRandomAction() {
    return Math.random() < 0.5 ? 'attack' : 'defense';
}

// Función para calcular el resultado de la batalla
function calculateBattleResult(hero, villain, heroAction, villainAction) {
    let result = {
        hero: {
            name: hero.alias,
            action: heroAction,
            power: heroAction === 'attack' ? hero.attack : hero.defense
        },
        villain: {
            name: villain.alias,
            action: villainAction,
            power: villainAction === 'attack' ? villain.attack : villain.defense
        },
        battleType: '',
        winner: '',
        description: ''
    };

    // Determinar tipo de batalla
    if (heroAction === 'attack' && villainAction === 'attack') {
        result.battleType = 'Ataque vs Ataque';
        if (hero.attack > villain.attack) {
            result.winner = 'hero';
            result.description = `${hero.alias} gana con su ataque (${hero.attack}) vs ${villain.alias} (${villain.attack})`;
        } else if (hero.attack < villain.attack) {
            result.winner = 'villain';
            result.description = `${villain.alias} gana con su ataque (${villain.attack}) vs ${hero.alias} (${hero.attack})`;
        } else {
            result.winner = 'tie';
            result.description = `¡Empate! Ambos atacan con la misma fuerza (${hero.attack})`;
        }
    } else if (heroAction === 'attack' && villainAction === 'defense') {
        result.battleType = 'Ataque vs Defensa';
        if (hero.attack > villain.defense) {
            result.winner = 'hero';
            result.description = `${hero.alias} rompe la defensa de ${villain.alias} (${hero.attack} > ${villain.defense})`;
        } else if (hero.attack < villain.defense) {
            result.winner = 'villain';
            result.description = `${villain.alias} bloquea el ataque de ${hero.alias} (${villain.defense} > ${hero.attack})`;
        } else {
            result.winner = 'tie';
            result.description = `¡Empate! El ataque y la defensa son iguales (${hero.attack})`;
        }
    } else if (heroAction === 'defense' && villainAction === 'attack') {
        result.battleType = 'Defensa vs Ataque';
        if (hero.defense > villain.attack) {
            result.winner = 'hero';
            result.description = `${hero.alias} bloquea el ataque de ${villain.alias} (${hero.defense} > ${villain.attack})`;
        } else if (hero.defense < villain.attack) {
            result.winner = 'villain';
            result.description = `${villain.alias} rompe la defensa de ${hero.alias} (${villain.attack} > ${hero.defense})`;
        } else {
            result.winner = 'tie';
            result.description = `¡Empate! El ataque y la defensa son iguales (${villain.attack})`;
        }
    } else {
        result.battleType = 'Defensa vs Defensa';
        result.winner = 'tie';
        result.description = `¡Ambos se defienden! No hay daño causado.`;
    }

    return result;
}

// Batalla: Héroe vs Villano
async function heroVsVillain(heroId, villainId, heroAction) {
    const heroes = await heroRepository.getHeroes();
    const villains = await villainRepository.getVillains();
    
    const hero = heroes.find(h => h.id === parseInt(heroId));
    if (!hero) {
        throw new Error('Héroe no encontrado');
    }
    
    const villain = villains.find(v => v.id === parseInt(villainId));
    if (!villain) {
        throw new Error('Villano no encontrado');
    }

    // Validar acción del héroe
    if (heroAction !== 'attack' && heroAction !== 'defense') {
        throw new Error('La acción del héroe debe ser "attack" o "defense"');
    }

    // Acción aleatoria del villano
    const villainAction = getRandomAction();
    
    const battleResult = calculateBattleResult(hero, villain, heroAction, villainAction);
    // Guardar la batalla en el historial
    await battleRepository.saveBattle(battleResult);
    return {
        message: battleResult.description,
        battle: battleResult
    };
}

// Batalla: Villano vs Héroe
async function villainVsHero(villainId, heroId, villainAction) {
    const heroes = await heroRepository.getHeroes();
    const villains = await villainRepository.getVillains();
    
    const villain = villains.find(v => v.id === parseInt(villainId));
    if (!villain) {
        throw new Error('Villano no encontrado');
    }
    
    const hero = heroes.find(h => h.id === parseInt(heroId));
    if (!hero) {
        throw new Error('Héroe no encontrado');
    }

    // Validar acción del villano
    if (villainAction !== 'attack' && villainAction !== 'defense') {
        throw new Error('La acción del villano debe ser "attack" o "defense"');
    }

    // Acción aleatoria del héroe
    const heroAction = getRandomAction();
    
    const battleResult = calculateBattleResult(hero, villain, heroAction, villainAction);
    // Guardar la batalla en el historial
    await battleRepository.saveBattle(battleResult);
    
    return {
        message: battleResult.description,
        battle: battleResult
    };
}

export default {
    heroVsVillain,
    villainVsHero
}; 