import { fastify } from 'fastify';
import { DatabasePostgres } from './database-postgres.js';


const server = fastify();
// const database = new DatabaseMemory()
const database = new DatabasePostgres


//POST create
server.post('/videos', async(request, reply) => {
    //desestruturando os dados que vem do "body" criado dentro de routes.http
    const { title , description , duration } = request.body

    await database.create({
        title: title,
        description: description,
        duration: duration
    })
    console.log(database.list())
    return reply.status(201).send()
})


//GET 
server.get('/videos', async(request) => {
    const search = request.query.search
    const videos = await database.list(search);
    return videos;
})



server.put('/videos/:id', async(request, reply) => {
    const videoId = request.params.id;

    const video = await database.update(videoId, {
        title: title,
        description: description,
        duration: duration
    })
    return reply.status(204).send();
})

server.delete('/videos/:id', async(request, reply) => {
    const videoId = request.params.id;

    await database.delete(videoId);
    return reply.status(204).send()
})

server.listen({
    port: process.env.PORT ?? 3333,
})