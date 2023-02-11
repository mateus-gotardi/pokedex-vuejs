<template>
  <div id="gbc">
    <div id="scr-border">
      <section id="screen">
        <div id="start-menu" v-if="startMenu">
          <div id="help" v-if="help">

            <h2><button @click="() => help = !help"><svg-icon type="mdi"
                  :path="pathArrowLeft"></svg-icon></button>Comandos</h2>
            <ul>
              <li>Setas - Movimentar</li>
              <li>A - Voltar para a lista</li>
              <li>B - Selecionar Pokemon</li>
              <li>Start - Menu de opções</li>
              <li>Select - Créditos</li>
            </ul>
          </div>
          <div id="options" v-else>
            <div id="mute-info">
              <button @click="togglePlay"><svg-icon type="mdi" :path="pathVolumeOn" v-if="playing"></svg-icon><svg-icon
                  v-else type="mdi" :path="pathVolumeOff"></svg-icon></button>
              <button @click="() => help = !help"><svg-icon type="mdi" :path="pathHelp"></svg-icon></button>
            </div>

            <input type="range" min="0" max="1" step="0.01" v-model="volume" @input="changeVolume" />
            <div id="skip-song"><button @click="previousSong"><svg-icon type="mdi"
                  :path="pathSkipPrevious"></svg-icon></button><button @click="nextSong"><svg-icon type="mdi"
                  :path="pathSkipNext"></svg-icon></button>
            </div>
          </div>


        </div>
        <div id="select-menu" v-if="selectModal">
          <h2>Autor<br />Mateus Gotardi</h2>
          <a href="https://mateusgotardi.vercel.app/" target="_blank"><img src="/assets/qrcode.svg"
              alt="qr code to https://mateusgotardi.vercel.app/" /></a>
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
        <div @click="() => selectModal = !selectModal">
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
    <source :src="musicSrc" type="audio/mpeg">
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
import { mdiVolumeSource, mdiSkipNextOutline, mdiVolumeMute, mdiSkipPreviousOutline, mdiHelp, mdiArrowLeft } from '@mdi/js';

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
      pathSkipNext: mdiSkipNextOutline,
      pathSkipPrevious: mdiSkipPreviousOutline,
      pathHelp: mdiHelp,
      pathArrowLeft: mdiArrowLeft,
      help: false,
      volume: 1,
      pokemonStore,
      scrollPosition: 50,
      startMenu: false,
      selectModal: false,
      musicChooser: 1,
      musicSrc: `/assets/music1.mp3`,
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
    },
    previousSong() {
      if (this.musicChooser > 1) {
        this.musicChooser--;
      } else {
        this.musicChooser = 3;
      }
      this.musicSrc = `/assets/music${this.musicChooser}.mp3`;
      this.music.load();
      this.playMusic()
      if (!this.playing) {
        this.playing = true;
      }
    },
    nextSong() {
      if (this.musicChooser < 3) {
        this.musicChooser++;
      } else {
        this.musicChooser = 1;
      }
      this.musicSrc = `/assets/music${this.musicChooser}.mp3`;
      this.music.load();
      this.playMusic()
      if (!this.playing) {
        this.playing = true;
      }
    },
    playMusic() {
      if (this.music.paused) {
        this.music.play().catch(() => {
          setTimeout(() => {
            this.playMusic();
          }, 500);
        });
      }
    }
  },
  mounted() {
    this.music = this.$refs.audioPlayer;
    this.music.volume = this.volume;
    this.pokemonStore.loading = true;
    this.music.load()
    this.playMusic();
    setTimeout(() => {
      this.pokemonStore.loading = false;
    }, 2000);
    this.music.addEventListener('ended', () => {
      this.playing = false;
    });
    this.buttonBAudio = this.$refs.buttonB;
    this.buttonAAudio = this.$refs.buttonA;
  },
};
</script>