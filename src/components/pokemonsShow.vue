<template>
    <div id="scr-container">
        <section id="pokemons-show"
            v-bind:style="{ gridTemplateColumns: `repeat(${this.pokemonStore.evolutionChain.length}, 1fr)` }">
            <div id="ash" v-bind:style="{ gridArea: `1 / ${pokemonStore.step + 1} / 2 / ${pokemonStore.step + 2}` }">
                <img v-bind:src="`/assets/ash-${this.pokemonStore.facing}${this.pokemonStore.facing === 'right' &&
                this.pokemonStore.step % 2 !== 0 || this.pokemonStore.facing === 'left' && this.pokemonStore.step % 2 !== 0 ? '-1' : ''}.svg`"
                    alt="ash" />
            </div>
            <div v-if="pokemonStore.evolutionChain.length > 0" v-for="pokemon in pokemonStore.evolutionChain" :key="pokemon.name" @id="pokemon.name" class="pokemon"
                v-bind:style="{ gridArea: `2 / ${pokemonStore.evolutionChain.indexOf(pokemon) + 1} / 3 / ${pokemonStore.evolutionChain.indexOf(pokemon) + 2}` }">
                <router-link :to="`/pokemon/${pokemon.name}`">
                    <div>
                        <img :src="pokemon.sprites.front_default" :alt="pokemon.name" id="picture" />
                        <p id="name">
                            {{ pokemon.name }}
                        </p>
                    </div>
                </router-link>
            </div>
        </section>
    </div>

</template>

<script>
import { usePokemonStore } from "../stores/pokemon";

export default {
    name: "ShowPokemons",
    data() {
        const pokemonStore = usePokemonStore();
        return {
            pokemonStore,
        };
    },
};
</script>

<style lang="scss">
@import "./styles/_pokeshow.scss";
</style>
