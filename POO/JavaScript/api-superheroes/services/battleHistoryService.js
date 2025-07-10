import battleRepository from '../repositories/battleRepository.js'

async function getAllBattles(page = 1, limit = 10) {
    const battles = await battleRepository.getBattles();
    const totalBattles = battles.length;
    const totalPages = Math.ceil(totalBattles / limit);
    
    // Validar página
    if (page < 1) page = 1;
    if (page > totalPages && totalPages > 0) page = totalPages;
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedBattles = battles.slice(startIndex, endIndex);
    
    return {
        data: paginatedBattles,
        pagination: {
            currentPage: page,
            totalPages: totalPages,
            totalRecords: totalBattles,
            recordsPerPage: limit,
            recordsInCurrentPage: paginatedBattles.length,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1,
            nextPage: page < totalPages ? page + 1 : null,
            previousPage: page > 1 ? page - 1 : null
        }
    };
}

export default {
    getAllBattles
}; 