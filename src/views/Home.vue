<template>
  <main>
    <form @submit.prevent="onSubmit">
      <label to="poke-input">Pesquise seu Pokemon</label>
      <input type="text" id="poke-input" v-model="inputValue" />
      <input type="submit" value="Pesquisar" />
    </form>
    <h3 v-if="pokemonStore.error !== ''">{{ pokemonStore.error }}</h3>
    <section v-if="pokemonStore.evolutionChain.length > 0">
      <div v-for="pokemon in pokemonStore.evolutionChain" :key="pokemon.name">
        <router-link
          :to="`/pokemon/${pokemon.name}`"
        >
          <div>
            <p>
              {{ pokemon.name }}
            </p>
            <img
              :src="pokemon.sprites.other['official-artwork'].front_default"
              :alt="pokemon.name"
            />
          </div>
        </router-link>
      </div>
    </section>
  </main>
</template>

<script>
import { usePokemonStore } from "../stores/pokemon";

export default {
  name: "MyComponent",
  data() {
    const pokemonStore = usePokemonStore();
    return {
      inputValue: "",
      pokemonStore,
    };
  },
  methods: {
    onSubmit() {
      usePokemonStore().fetchEvolutionChain(this.inputValue.toLowerCase());
    },
  },
  mounted() {
    usePokemonStore().fetchAllPokemons();
  },
};
</script>

<style lang="scss">
@import "./styles/_home.scss";
</style>
