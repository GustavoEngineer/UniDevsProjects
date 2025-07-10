import villainRepository from '../repositories/villainRepository.js'

async function getAllVillains(page = 1, limit = 10) {
    const villains = await villainRepository.getVillains();
    const totalVillains = villains.length;
    const totalPages = Math.ceil(totalVillains / limit);
    
    // Validar página
    if (page < 1) page = 1;
    if (page > totalPages && totalPages > 0) page = totalPages;
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedVillains = villains.slice(startIndex, endIndex);
    
    return {
        data: paginatedVillains,
        pagination: {
            currentPage: page,
            totalPages: totalPages,
            totalRecords: totalVillains,
            recordsPerPage: limit,
            recordsInCurrentPage: paginatedVillains.length,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1,
            nextPage: page < totalPages ? page + 1 : null,
            previousPage: page > 1 ? page - 1 : null
        }
    };
}

async function addVillain(villain) {
    if (!villain.name || !villain.alias) {
        throw new Error("El villano debe tener un nombre y un alias.");
    }

    const villains = await villainRepository.getVillains();

    const newId = villains.length > 0 ? Math.max(...villains.map(v => v.id)) + 1 : 1;
    const newVillain = { ...villain, id: newId };

    villains.push(newVillain);
    await villainRepository.saveVillains(villains);

    return newVillain;
}

async function updateVillain(id, updatedVillain) {
    const villains = await villainRepository.getVillains();
    const index = villains.findIndex(villain => villain.id === parseInt(id));

    if (index === -1) {
        throw new Error('Villano no encontrado');
    }

    delete updatedVillain.id;
    villains[index] = { ...villains[index], ...updatedVillain };

    await villainRepository.saveVillains(villains);
    return villains[index];
}

async function deleteVillain(id) {
    const villains = await villainRepository.getVillains();
    const index = villains.findIndex(villain => villain.id === parseInt(id));

    if (index === -1) {
        throw new Error('Villano no encontrado');
    }

    const filteredVillains = villains.filter(villain => villain.id !== parseInt(id));
    await villainRepository.saveVillains(filteredVillains);
    return { message: 'Villano eliminado' };
}

async function findVillainsByCity(city) {
    const villains = await villainRepository.getVillains();
    return villains.filter(villain => villain.city.toLowerCase() === city.toLowerCase());
}

async function faceHero(villainId, hero) {
    const villains = await villainRepository.getVillains();
    const villain = villains.find(villain => villain.id === parseInt(villainId));
    if (!villain) {
        throw new Error('Villano no encontrado');
    }
    return `${villain.alias} se enfrenta a ${hero}`;
}

export default {
    getAllVillains,
    addVillain,
    updateVillain,
    deleteVillain,
    findVillainsByCity,
    faceHero
}; 