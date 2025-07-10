import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Superhéroes y Villanos',
            version: '1.0.0',
            description: 'API REST para gestionar superhéroes y villanos con funcionalidades de enfrentamientos',
            contact: {
                name: 'API Support',
                email: 'support@superheroes-api.com'
            }
        },
        servers: [
            {
                url: 'http://localhost:3001',
                description: 'Servidor de desarrollo'
            }
        ],
        components: {
            schemas: {
                Hero: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'ID único del héroe'
                        },
                        name: {
                            type: 'string',
                            description: 'Nombre real del héroe'
                        },
                        alias: {
                            type: 'string',
                            description: 'Alias o nombre de superhéroe'
                        },
                        city: {
                            type: 'string',
                            description: 'Ciudad donde opera el héroe'
                        },
                        team: {
                            type: 'string',
                            description: 'Equipo al que pertenece'
                        },
                        attack: {
                            type: 'integer',
                            description: 'Poder de ataque del héroe (0-100)'
                        },
                        defense: {
                            type: 'integer',
                            description: 'Poder de defensa del héroe (0-100)'
                        }
                    },
                    required: ['name', 'alias']
                },
                Villain: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'ID único del villano'
                        },
                        name: {
                            type: 'string',
                            description: 'Nombre real del villano'
                        },
                        alias: {
                            type: 'string',
                            description: 'Alias o nombre de villano'
                        },
                        city: {
                            type: 'string',
                            description: 'Ciudad donde opera el villano'
                        },
                        team: {
                            type: 'string',
                            description: 'Equipo al que pertenece'
                        },
                        attack: {
                            type: 'integer',
                            description: 'Poder de ataque del villano (0-100)'
                        },
                        defense: {
                            type: 'integer',
                            description: 'Poder de defensa del villano (0-100)'
                        }
                    },
                    required: ['name', 'alias']
                }
            }
        }
    },
    apis: ['./controllers/*.js']
};

export const specs = swaggerJsdoc(options); 