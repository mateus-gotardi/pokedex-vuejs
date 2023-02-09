import { defineStore } from 'pinia'

export const usePokemonStore = defineStore('pokemons', {
    state: () => ({
        allPokemons: [],
        evolutionChain: [],
        pokemonDetails: {
            abilities: [],
            height: 0,
            id: 0,
            evolvesFromSpecies: null,
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
        searchedPokemon: '',
    }),
    getters: {
        pokemonDetails: (state) => state.pokemonDetails,
        evolutionChain: (state) => state.evolutionChain,
        allPokemons: (state) => state.allPokemons,
    },
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
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`)
            const data = await response.json()
            const evolutionChainUrl = data.evolution_chain.url
            const evolutionChainResponse = await fetch(evolutionChainUrl)
            const evolutionChainData = await evolutionChainResponse.json()
            this.evolutionChain = []
            this.evolutionChain.push(evolutionChainData.chain.species.name)
            evolutionChainData.chain.evolves_to.forEach((evolution) => {
                this.evolutionChain.push(evolution.species.name)
                evolution.evolves_to.forEach((evolution) => {
                    this.evolutionChain.push(evolution.species.name)
                    if (evolution.evolves_to.length > 0) {
                        evolution.evolves_to.forEach((evolution) => {
                            this.evolutionChain.push(evolution.species.name)
                        })
                    }
                })
            })
        }
    },

})