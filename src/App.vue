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
          <div id="up"></div>
          <div id="down"></div>
          <div id="left"></div>
          <div id="right"></div>
          <div id="center"></div>
        </div>
        <div id="buttons">
          <div id="b">B</div>
          <div id="a">A</div>
        </div>
      </div>
      <div id="poketm">
        <h1>Pokémon</h1>
      </div>
      <div id="end">


        <div id="select">

          <span></span>
          <p>SELECT</p>
        </div>
        <div id="start">

          <span></span>
          <p>START</p>
        </div>
      </div>

    </div>



  </div>


</template>

<script>
export default {
  name: "App",
  data: () => ({
    //
  }),
};
</script>