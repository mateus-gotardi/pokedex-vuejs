<template>
  <main id="pokedex">
    <h1 id="poke-name">{{ pokemonStore.pokemonDetails.name.toUpperCase() }}</h1>
    <section v-if="pokemonStore.pokemonDetails.name !== ''" id="details">
      <div id="top-left">
        <img :src="pokemonStore.pokemonDetails.sprites.other['official-artwork'].front_default" :alt="pokemonStore.pokemonDetails.name" />
        <h2><span>No.</span> {{ pokemonStore.pokemonDetails.id }}</h2>
      </div>
      <div id="top-right">
        <div id="poke-type">
          <span v-for="t in pokemonStore.pokemonDetails.types" :key="t.type.name" :id="t.type.name">
            {{ t.type.name }}
          </span>
        </div>
        <h3 id="hp">HP:<span id="life-bar"></span></h3>
        <h3>{{ pokemonStore.pokemonDetails.stats.hp }}/ {{ pokemonStore.pokemonDetails.stats.hp }}</h3>
      </div>
      <div id="bottom-left">
        <h3>ATTACK: {{ pokemonStore.pokemonDetails.stats.attack }}</h3>
        <h3>DEFENSE: {{ pokemonStore.pokemonDetails.stats.defense }}</h3>
        <h3>SPEED: {{ pokemonStore.pokemonDetails.stats.speed }}</h3>
        <h3>SPECIAL-ATTACK: {{ pokemonStore.pokemonDetails.stats.special_attack }}</h3>
        <h3>SPECIAL-DEFENSE: {{ pokemonStore.pokemonDetails.stats.special_defense }}</h3>
      </div>
      <div id="bottom-right">
        <div id="abilities">
          <h3>Abilities</h3>
          <span v-for="ability in pokemonStore.pokemonDetails.abilities" :key="ability.ability.name">
            {{ ability.ability.name }}
          </span>
        </div>
        <div id="sizes">
          <h3>HEIGHT: {{ pokemonStore.pokemonDetails.height }}</h3>
          <h3>WEIGHT: {{ pokemonStore.pokemonDetails.weight }}</h3>
        </div>

      </div>

      <div>
        <h3>moves</h3>

      </div>

    </section>
    <section v-else>
      <h1 id="error">Pokémon não encontrado</h1>
    </section>
  </main>
</template>
<script>
import { usePokemonStore } from "../stores/pokemon";

export default {
  name: "Pokemon",
  data() {
    const pokemonStore = usePokemonStore();

    return {
      pokemonStore,
      step: 0,
    };
  },
  methods: {
    getUrl() {
      return this.$route.params.name;
    },
  },


  beforeMount() {
    usePokemonStore().fetchPokemonDetails(this.getUrl());
  },
};
</script>
<style lang="scss">
@import "./styles/_pokemon.scss";
</style>
