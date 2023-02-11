<template>
  <Loading v-if="pokemonStore.loading" />
  <main id="pokedex" v-else>
    <h1 id="poke-name">{{ pokemonStore.pokemonDetails.name.toUpperCase() }}</h1>
    <section v-if="pokemonStore.pokemonDetails.name !== ''" id="details">
      <div id="top-container">
        <div id="top-left">
          <img :src="pokemonStore.pokemonDetails.sprites.other['official-artwork'].front_default"
            :alt="pokemonStore.pokemonDetails.name" />
          <h2><span>No.</span>{{ pokemonStore.pokemonDetails.id }}</h2>
        </div>
        <div id="top-right">
          <div id="poke-type">
            <span v-for="t in pokemonStore.pokemonDetails.types" :key="t.type.name" :id="t.type.name">
              {{ t.type.name }}
            </span>
          </div>
          <h3 class="info">HP:{{ pokemonStore.pokemonDetails.stats.hp }}</h3>
          <h3 class="info">HEIGHT:{{ pokemonStore.pokemonDetails.height }}</h3>
          <h3 class="info">WEIGHT:{{ pokemonStore.pokemonDetails.weight }}</h3>
        </div>
      </div>
      <div id="bottom-container">
        <div id="bottom-left">
          <div>
            <h3>ATTACK</h3>
            <h2>{{ pokemonStore.pokemonDetails.stats.attack }}</h2>
          </div>
          <div>
            <h3>DEFENSE</h3>
            <h2>{{ pokemonStore.pokemonDetails.stats.defense }}</h2>
          </div>
          <div>
            <h3>SPEED</h3>
            <h2>{{ pokemonStore.pokemonDetails.stats.speed }}</h2>
          </div>
          <div>
            <h3>SPECIAL</h3>
            <h2>{{ pokemonStore.pokemonDetails.stats.special_attack }}</h2>
          </div>

        </div>
        <div id="bottom-right">
          <div id="abilities">
            <h3>Abilities</h3>
            <div>
              <span v-for="ability in pokemonStore.pokemonDetails.abilities" :key="ability.ability.name">
                {{ ability.ability.name }}
              </span>
            </div>

          </div>


        </div>
      </div>
    </section>
    <section v-else>
      <h1 id="error">Pokémon não encontrado</h1>
    </section>
  </main>
</template>
<script>
import { usePokemonStore } from "../stores/pokemon";
import Loading from "../components/loading.vue";

export default {
  name: "Pokemon",
  components: {
    Loading,
  },
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
