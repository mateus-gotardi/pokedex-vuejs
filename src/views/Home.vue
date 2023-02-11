<template>
    <main id="scr-main" v-bind:style="{ backgroundPositionX: step + '%' }">
      <div id="form-container">
        <form @submit.prevent="onSubmit">
          <label to="poke-input">Pesquise um Pokémon</label>
          <div>
            <input type="text" id="poke-input" v-model="inputValue" />
            <button type="submit"><svg-icon type="mdi" :path="path" size="18"></svg-icon></button>
          </div>
          <h3 v-if="pokemonStore.error !== ''">{{ pokemonStore.error }}</h3>
        </form>
      </div>


      <ShowPokemons />

    </main>

</template>

<script>
import { usePokemonStore } from "../stores/pokemon";
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiMagnify } from '@mdi/js';
import ShowPokemons from "../components/pokemonsShow.vue";

export default {
  name: "Home",
  components: {
    SvgIcon,
    ShowPokemons
  },
  data() {
    const pokemonStore = usePokemonStore();
    return {
      inputValue: "",
      pokemonStore,
      path: mdiMagnify,
      step: pokemonStore.step,
    };
  },
  methods: {

    onSubmit() {
      usePokemonStore().fetchEvolutionChain(this.inputValue.toLowerCase());
    },
    updateBackground() {
      this.backgroundX = window.pageYOffset / 3;
    }

  },
  mounted() {
    usePokemonStore().fetchAllPokemons();
    window.addEventListener("scroll", this.updateBackground);

  },
};
</script>

<style lang="scss">
@import "./styles/_home.scss";
</style>
