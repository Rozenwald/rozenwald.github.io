<template>
  <div class="intro-section">
    <div class="intro-section__wrap">
      <div class="intro-section__rect">
        <img class="intro-section__img" src="~/assets/lifes.jpg"/>
      </div>
    </div>
  </div>
  <div>
    <i class="confetti confetti--0"></i>
    <i class="confetti confetti--1"></i>
    <i class="confetti confetti--2"></i>
    <i class="confetti confetti--3"></i>
    <i class="confetti confetti--4"></i>
    <i class="confetti confetti--5"></i>
    <i class="confetti confetti--6"></i>
    <i class="confetti confetti--7"></i>
    <i class="confetti confetti--8"></i>
    <i class="confetti confetti--9"></i>
  </div>
  <div class="title-section">
    <p> #ямыфронтэнд </p>
    <h1
      class="title-section__title"
    > &nbsp;ДоброеРезюме ДоброеРезюме ДоброеРезюме 
    </h1>
  </div>
  <div class="bio-section">
    <div>
      <h1 class="bio-section__title"> Привет, </h1>
      <h1 class="bio-section__title"> я -- Лауре Розенвальд </h1>
      <h2 class="bio-section__subtitle"> Frontend developer, from Russia with love</h2>
      <img v-for="icon in icons" class="bio-section__icon" :src="generatePath(icon)">
    </div>
    <img class="bio-section__avatar" src="~/assets/avatar.jpg"/>
  </div>
    <slot />
</template>

<script setup lang="ts">

  const icons = [
    "nuxt", "vue", "vite", "pinia",
    "ts", "js", "html", "css", "sass",
    "figma", "github",
  ]

  function generatePath(name:string) {
    const str = `/icons/${name}.svg`
    return str
  }

</script>

<style lang="sass">
  .bio-section
    display: grid
    grid-template-columns: repeat(2, 1fr)
    margin: 48px 10%
    justify-content: space-around
    &>h1
      text-align: center
    &__icon
      width: 64px
      height: 64px
    &__title
      font-size: 48px
      font-weight: 900
      margin: 0
    &__avatar
      width: 450px
      height: 450px
      border-radius: 25px
      place-self: center
      box-shadow: 0px 5px 20px 5px #00000050
  .confetti
    position: absolute
    pointer-events: none
    z-index: 0
    &--0
      top: 400px
      left: -20px
      width: 50px
      height: 50px
      transform: rotate(60deg)
      background-color: var(--ice)
      clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)
    &--1
      top: 275px
      left: 220px
      width: 20px
      height: 20px
      border-radius: 50%
      background-color: var(--yellow)
    &--2
      top: 20px
      left: 15px
      width: 25px
      height: 75px
      background-color: var(--black)
      transform: rotate(125deg)
    &--3
      top: 150px
      left: 364px
      width: 50px
      height: 50px
      background-color: var(--pink)
      transform: rotate(54deg)
    &--4
      top: 250px
      left: 800px
      width: 25px
      height: 50px
      background-color: var(--blue)
      transform: rotate(54deg)
    &--5
      top: 250px
      right: 200px
      width: 50px
      height: 50px
      border-radius: 50%
      background-color: var(--pink)
    &--6
      top: 350px
      right: 450px
      width: 50px
      height: 50px
      clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)
      background-color: var(--yellow)
    &--7
      top: 0px
      right: 600px
      width: 75px
      height: 50px
      background-color: var(--ice)
      transform: rotate(132deg)
    &--8
      top: 64px
      right: 35px
      width: 50px
      height: 50px
      background-color: var(--black)
      transform: rotate(132deg)
    &--9
      top: 250px
      right: 200px
      width: 50px
      height: 50px
      border-radius: 50%
      background-color: var(--pink)

  .title-section
    position: relative
    overflow: hidden
    padding-top: 400px
    font-size: 40px
    width: 100%
    z-index: 2
    &>p
      display: flex
      justify-content: flex-end
      margin: 0
      padding: 0 10%
      font-size: 24px
    &>h1
      display: inline-block
      text-align: center
      white-space: nowrap
      will-change: transform
      font-size: 100px
      animation: title-running 15s linear infinite
      &::after
        content: "ДоброеРезюме ДоброеРезюме ДоброеРезюме "

    @keyframes title-running
      0%
        transform: translateX(0)
      100%
        transform: translateX(-50%)

  .intro-section
    position: absolute
    height: 700px
    width: 100%
    overflow: hidden
    &__wrap
      position: relative
      width: 100%
      height: 100%
      display: inline-block
    &__rect
      position: absolute
      top: 0
      left: 0
      z-index: 1
      height: 500px
      width: 165px
      transform-origin: left top
      transform: translateX(calc(100vw - 200px)) translateY(50px) rotate(30deg)
      background-color: #fff
      overflow: hidden
      animation: knock-the-wall 15s cubic-bezier(0, .2, 1, .8) infinite alternate
    &__img
      position: absolute
      top: 0
      left: 0
      width: 100vw
      transform-origin: left top
      transform: rotate(-30deg) translateX(calc(-100vw + 200px)) translateY(-50px)
      animation: keep-place 15s cubic-bezier(0, .2, 1, .8) infinite alternate
    @keyframes knock-the-wall
      0%
        transform: translateX(calc(100vw - 200px)) translateY(50px) rotate(30deg)
      100%
        transform: translateX(100px) translateY(105px) rotate(-30deg)

    @keyframes keep-place
      0%
        transform: rotate(-30deg) translateX(calc(-100vw + 200px)) translateY(-50px)
      100%  
        transform: rotate(30deg) translateX(-100px) translateY(-105px)
</style>