import { defineStore } from 'pinia'

export const usePokemonStore = defineStore('pokemons', {
    state: () => ({
        allPokemons: [],
        evolutionChain: [],
        pokemonDetails: {
            abilities: [],
            height: 0,
            id: 0,
            moves: [],
            name: '',
            sprites: {},
            stats: {
                hp: 0,
                attack: 0,
                defense: 0,
                special_attack: 0,
                special_defense: 0,
                speed: 0,
            },
        },
        error: '',
    }),
    actions: {
        async fetchAllPokemons() {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
            const data = await response.json()
            this.allPokemons = data.results
        },

        async fetchPokemonDetails(pokemonName) {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            const data = await response.json()
            this.pokemonDetails = {
                abilities: data.abilities,
                height: data.height,
                id: data.id,
                moves: data.moves,
                name: data.name,
                sprites: data.sprites,
                stats: {
                    hp: data.stats[0].base_stat,
                    attack: data.stats[1].base_stat,
                    defense: data.stats[2].base_stat,
                    special_attack: data.stats[3].base_stat,
                    special_defense: data.stats[4].base_stat,
                    speed: data.stats[5].base_stat,
                },
            }
        },
        async fetchEvolutionChain(pokemonName) {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`).then(async (response) => {
                this.error = ''
                const data = await response.json()
                const evolutionChainUrl = data.evolution_chain.url
                const evolutionChainResponse = await fetch(evolutionChainUrl)
                const evolutionChainData = await evolutionChainResponse.json()
                this.evolutionChain = []
                // get sprites for each pokemon in the evolution chain
                let pokeResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
                let pokeData = await pokeResponse.json()
                let poke = { name: evolutionChainData.chain.species.name, sprites: pokeData.sprites }
                this.evolutionChain.push(poke)
                evolutionChainData.chain.evolves_to.forEach(async (evolution) => {
                    let pokeResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolution.species.name}`)
                    let pokeData = await pokeResponse.json()
                    let poke = { name: evolution.species.name, sprites: pokeData.sprites }
                    this.evolutionChain.push(poke)
                    evolution.evolves_to.forEach(async (evolution) => {
                        let pokeResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolution.species.name}`)
                        let pokeData = await pokeResponse.json()
                        let poke = { name: evolution.species.name, sprites: pokeData.sprites }
                        this.evolutionChain.push(poke)
                    })
                })
                return response
            }).catch((error) => {
                this.evolutionChain = []
                this.error = 'Pokémon não encontrado'
            })

        }
    },

})