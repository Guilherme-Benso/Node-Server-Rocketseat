import { randomUUID } from 'crypto'
import { sql } from './db.js'

export class DatabasePostgres {

    #videos = new Map()
    // Map é um tipo de estrutura de dados parecido com um objeto
    // async é utilizado junto com o await para aguardar a operaçao assincrona terminar
    async list(search) {
        let videos
        if (search) {
            videos = await sql`select * from videos where title ilike ${'%' + search + '%'}`
        } else {
            videos = await sql`select * from videos`
        }
        return videos
    }



    async create(video) {
        const videoId = randomUUID()
        const { title, description, duration } = video

        await sql`insert into videos (id, title, description, duration) VALUES (${videoId}, ${title}, ${description}, ${duration})`
    }


    async update(id, video) {
        const { title, description, duration } = video

        await sql`update videos set title = ${title}, description = ${description}, duration = ${duration} where id = ${id}`
    }

    async delete(id) {
        await sql`delete from videos where id= ${id}`
    }

}