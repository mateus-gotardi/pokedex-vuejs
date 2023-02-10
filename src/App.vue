<template>
  <div id="gbc">
    <div id="scr-border">
      <section id="screen">
        <router-view />
      </section>
      <div id="logo">
        <h1>GAME BOY <span id="r">C</span><span id="p">O</span><span id="g">L</span><span id="y">O</span><span
            id="b">R</span></h1>
      </div>
    </div>
    <div id="bottom">
      <div id="start">
        <h3 id="watermark">Nintendo</h3>
      </div>
      <div id="mid">
        <div id="dpad">
          <div id="center"></div>
          <div id="up" @click="faceTop"></div>
          <div id="down" @click="faceBottom"></div>
          <div id="left" @click="moveLeft"></div>
          <div id="right" @click="moveRight"></div>

        </div>
        <div id="buttons">
          <div id="b" @click="selectPokemon">B</div>
          <div id="a" @click="returnHome">A</div>
        </div>
      </div>
      <div id="poketm">
        <h1>Pokémon</h1>
      </div>
      <div id="end">


        <div>

          <span></span>
          <p>SELECT</p>
        </div>
        <div>

          <span></span>
          <p>START</p>
        </div>
      </div>

    </div>



  </div>


</template>

<script>
import { usePokemonStore } from "./stores/pokemon";

export default {

  name: "App",
  data: () => {
    const pokemonStore = usePokemonStore();
    return {
      pokemonStore,
      posicaoScroll: 50,

    };
  },
  methods: {
    moveLeft() {
      this.pokemonStore.removeStep();
      this.pokemonStore.changeFacing('left');
      document.getElementById("scr-main").scrollLeft = this.posicaoScroll * this.pokemonStore.step;
    },
    moveRight() {
      this.pokemonStore.addStep();
      this.pokemonStore.changeFacing('right');
      document.getElementById("scr-main").scrollLeft = this.posicaoScroll * this.pokemonStore.step;
    },
    faceTop() {
      this.pokemonStore.changeFacing('back');
    },
    faceBottom() {
      this.pokemonStore.changeFacing('front');
    },
    selectPokemon() {
      if (this.pokemonStore.evolutionChain.length > 0 && !this.$route.params.name) {
        this.$router.push(`/pokemon/${this.pokemonStore.evolutionChain[this.pokemonStore.step].name}`)
      }
    },
    returnHome() {
      this.pokemonStore.step = 0;
      this.pokemonStore.changeFacing('front');
      this.$router.push(`/`)
      document.getElementById("scr-main").scrollLeft = this.posicaoScroll * this.pokemonStore.step;
    }
  },
};
</script>