import { randomUUID } from 'crypto'

export class DatabaseMemory {

    #videos = new Map()
    // Map é um tipo de estrutura de dados parecido com um objeto
    list(search) {
        // Array.from converte uma outra estrutura de dados em array
        return Array.from(this.#videos.entries())
            .map((videoArray) => {
                const id = videoArray[0];
                const data = videoArray[1];

                return {
                    id,
                    ...data,
                }

            }).filter(video =>{
                if(search){
                    return video.title.includes(search);
                }
                return true
            })

    }


    create(video) {
        const videoId = randomUUID()
        this.#videos.set(videoId, video);
    }


    update(id, video) {
        this.#videos.set(id, video);
    }
    delete(id) {
        this.#videos.delete(id);
    }
}