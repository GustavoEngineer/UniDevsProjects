import fs from 'fs-extra'

const filePath = './data/battles.json'

async function getBattles() {
    try {
        const data = await fs.readJson(filePath)
        return data
    } catch (error) {
        console.error(error)
        return []
    }
}

async function saveBattle(battle) {
    try {
        const battles = await getBattles()
        const newBattle = {
            id: battles.length > 0 ? Math.max(...battles.map(b => b.id)) + 1 : 1,
            ...battle,
            timestamp: new Date().toISOString()
        }
        battles.push(newBattle)
        await fs.writeJson(filePath, battles)
        return newBattle
    } catch (error) {
        console.error(error)
        throw new Error('Error al guardar la batalla')
    }
}

export default {
    getBattles,
    saveBattle
} 