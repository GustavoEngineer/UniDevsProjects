import heroRepository from '../repositories/heroRepository.js'

async function getAllHeroes(page = 1, limit = 10) {
    const heroes = await heroRepository.getHeroes();
    const totalHeroes = heroes.length;
    const totalPages = Math.ceil(totalHeroes / limit);
    
    // Validar página
    if (page < 1) page = 1;
    if (page > totalPages && totalPages > 0) page = totalPages;
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedHeroes = heroes.slice(startIndex, endIndex);
    
    return {
        data: paginatedHeroes,
        pagination: {
            currentPage: page,
            totalPages: totalPages,
            totalRecords: totalHeroes,
            recordsPerPage: limit,
            recordsInCurrentPage: paginatedHeroes.length,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1,
            nextPage: page < totalPages ? page + 1 : null,
            previousPage: page > 1 ? page - 1 : null
        }
    };
}

async function addHero(hero) {
    if (!hero.name || !hero.alias) {
        throw new Error("El héroe debe tener un nombre y un alias.");
    }

    const heroes = await heroRepository.getHeroes();

    const newId = heroes.length > 0 ? Math.max(...heroes.map(h => h.id)) + 1 : 1;
    const newHero = { ...hero, id: newId };

    heroes.push(newHero);
    await heroRepository.saveHeroes(heroes);

    return newHero;
}

async function updateHero(id, updatedHero) {
    const heroes = await heroRepository.getHeroes();
    const index = heroes.findIndex(hero => hero.id === parseInt(id));

    if (index === -1) {
        throw new Error('Héroe no encontrado');
    }

    delete updatedHero.id;
    heroes[index] = { ...heroes[index], ...updatedHero };

    await heroRepository.saveHeroes(heroes);
    return heroes[index];
}


async function deleteHero(id) {
    const heroes = await heroRepository.getHeroes();
    const index = heroes.findIndex(hero => hero.id === parseInt(id));

    if (index === -1) {
        throw new Error('Héroe no encontrado');
    }

    const filteredHeroes = heroes.filter(hero => hero.id !== parseInt(id));
    await heroRepository.saveHeroes(filteredHeroes);
    return { message: 'Héroe eliminado' };
    }

    async function findHeroesByCity(city) {
        const heroes = await heroRepository.getHeroes();
        return heroes.filter(hero => hero.city.toLowerCase() === city.toLowerCase());
    }

    async function faceVillain(heroId, villain) {
        const heroes = await heroRepository.getHeroes();
        const hero = heroes.find(hero => hero.id === parseInt(heroId));
        if (!hero) {
        throw new Error('Héroe no encontrado');
        }
        return `${hero.alias} enfrenta a ${villain}`;
    }  
export default {
    getAllHeroes,
    addHero,
    updateHero,
    deleteHero,
    findHeroesByCity,
    faceVillain
};