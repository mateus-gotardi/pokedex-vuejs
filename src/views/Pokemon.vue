<template>
  <main>
    <section v-if="pokemonStore.pokemonDetails.name !== ''">
      <h1>{{ pokemonStore.pokemonDetails.name }}</h1>
      <img :src="pokemonStore.pokemonDetails.sprites.other['official-artwork'].front_default"
        :alt="pokemonStore.pokemonDetails.name" />

      <div>
        <h3>Abilities</h3>
        <span v-for="ability in pokemonStore.pokemonDetails.abilities" :key="ability.ability.name">
          {{ ability.ability.name }}
        </span>
      </div>

      <div>
        <h3>moves</h3>

      </div>

    </section>
    <section v-else>
      <h1>Pokémon não encontrado</h1>
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
