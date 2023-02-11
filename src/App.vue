<template>
  <div id="gbc">
    <div id="scr-border">
      <section id="screen">
        <div id="start-menu" v-if="startMenu">
          <button @click="togglePlay"><svg-icon type="mdi" :path="pathVolumeOn" v-if="playing"></svg-icon><svg-icon
              v-else type="mdi" :path="pathVolumeOff"></svg-icon></button>
          <input type="range" min="0" max="1" step="0.01" v-model="volume" @input="changeVolume" />
        </div>
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
        <img src="/assets/pokelogo.svg" alt="poketm" />
      </div>
      <div id="end">
        <div @click="setStart">
          <span></span>
          <p>SELECT</p>
        </div>
        <div @click="setStart">
          <span></span>
          <p>START</p>
        </div>
      </div>
    </div>
  </div>
  <audio ref="audioPlayer">
    <source src="/assets/theme-music.mp3" type="audio/mpeg">
    Your browser does not support the audio element.
  </audio>
  <audio ref="buttonB">
    <source src="/assets/button-b-press.mp3" type="audio/mpeg">
    Your browser does not support the audio element.
  </audio>
  <audio ref="buttonA">
    <source src="/assets/button-a-press.mp3" type="audio/mpeg">
    Your browser does not support the audio element.
  </audio>
</template>

<script>
import { usePokemonStore } from "./stores/pokemon";
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiVolumeSource } from '@mdi/js';
import { mdiVolumeMute } from '@mdi/js';

export default {
  name: "App",
  components: {
    SvgIcon
  },
  data: () => {
    const pokemonStore = usePokemonStore();

    return {
      playing: true,
      pathVolumeOn: mdiVolumeSource,
      pathVolumeOff: mdiVolumeMute,
      volume: 1,
      pokemonStore,
      scrollPosition: 50,
      startMenu: false,
    };
  },
  methods: {
    setStart() {
      this.startMenu = !this.startMenu;
    },
    moveLeft() {
      if (!this.startMenu) {
        this.pokemonStore.removeStep();
        this.pokemonStore.changeFacing('left');
        document.getElementById("scr-main").scrollLeft = this.scrollPosition * this.pokemonStore.step;
      }

    },
    moveRight() {
      if (!this.startMenu) {
        this.pokemonStore.addStep();
        this.pokemonStore.changeFacing('right');
        document.getElementById("scr-main").scrollLeft = this.scrollPosition * this.pokemonStore.step;
      }
    },
    faceTop() {
      if (!this.startMenu) {
        this.pokemonStore.changeFacing('back');
      }
    },
    faceBottom() {
      if (!this.startMenu) {
        this.pokemonStore.changeFacing('front');
      }
    },
    selectPokemon() {
      if (this.pokemonStore.evolutionChain.length > 0 && !this.$route.params.name && !this.startMenu) {
        this.buttonBAudio.play();
        this.$router.push(`/pokemon/${this.pokemonStore.evolutionChain[this.pokemonStore.step].name}`)
      }
    },
    returnHome() {
      if (!this.startMenu) {
        this.buttonAAudio.play();
        this.pokemonStore.step = 0;
        this.pokemonStore.changeFacing('front');
        this.$router.push(`/`)
        document.getElementById("scr-main").scrollLeft = this.scrollPosition * this.pokemonStore.step;
      }

    },
    togglePlay() {
      this.playing ? this.music.pause() : this.music.play();
      this.playing = !this.playing;
    },
    changeVolume() {
      this.music.volume = this.volume;
    }
  },
  mounted() {
    this.music = this.$refs.audioPlayer;
    this.music.autoplay = true;
    this.music.addEventListener('ended', () => {
      this.playing = false;
    });
    this.buttonBAudio = this.$refs.buttonB;
    this.buttonAAudio = this.$refs.buttonA;
  },
};
</script>