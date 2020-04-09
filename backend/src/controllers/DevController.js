const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const {findConnections, sendMessage} = require('../websocket');

module.exports = {

    async index(request, response){
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store(request, response){
        const {github_username, techs, latitude, longitude} = request.body;

        let dev = await Dev.findOne({github_username});

        if (!dev){
            const apiResponse = await axios.get(`http://api.github.com/users/${github_username}`);
    
            const {name = login, avatar_url, bio} = apiResponse.data;
        
            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            })

            //Filtrar as conexões que estão há no máx 10km de distância
            //e que o novo dev tenha pelo menos 1 das techs filtradas
            const sendSocketMEssageTo = findConnections(
                {latitude, longitude},
                techsArray
            )

            sendMessage(sendSocketMEssageTo, 'new-dev', dev);

        }

        return response.json(dev);
    },

    async update(request, response){
        //Aguardando implementação
    },

    async destroy(request, response){
        const { github_username } = request.query;

        const dev = await Dev.findOne({github_username});
           
        if (!dev){
            return response.send('Usuário não encontrado');
        } else {
            dev.remove();
        }     

        const message = {
            message: 'Usuário deletado com sucesso'
        }

        return response.status(200).send(message);

    }
};