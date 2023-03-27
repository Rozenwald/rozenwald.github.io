<template>
  <div id="app">
    <NuxtLayout :name="spiral">
      <NuxtPage>
      </NuxtPage>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
  const animation = 'animation-section'
  const spiral = 'spiral-section'
</script>

<style lang="sass">
  @font-face
    font-family: TTTravels
    src: url('./assets/fonts/TTTravels-Regular.ttf')
  @font-face
    font-family: Geometria
    src: url('./assets/fonts/Geometria-Medium.ttf')

  :root
    --black: #282828
    --blue: #5AA9E6
    --ice: #7FC8F8
    --grey: #F9F9F9
    --yellow: #FFE45E
    --pink: #FF6392

  *
    font-family: Geometria
    box-sizing: border-box

  body
    margin: 0 !important
    min-height: 100vh
    overflow: hidden
    background-color: var(--black)
    // background: url(./assets/back.jpg), 100% 100%, no-repeat

  #app
    position: fixed
    overflow: hidden
    width: 100vw
    height: 100vh
</style>