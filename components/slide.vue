<template>
  <div
    class="slide"
    ref="slide"
    :class="{ active: active }"
  >
    <div class="header">
      <div class="header__title"> {{ props.data.en.title }} </div>
    </div>
    <div class="body">
      <div class="body__description"> {{ props.data.en.description }} </div>
      <button
        class="body__btn"
        :class="{ active: active }"
      >
        <img v-if="!active" src="~/assets/icons/Arrow.svg">
        <div v-else class="body__btn-text" src="~/assets/icons/Arrow.svg">
          View
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  interface slideProp {
    index: number,
    active: boolean
    data: {
      ru: {
        icon?: string,
        title?: string,
        description?: string,
      }
      en: {
        icon?: string,
        title?: string,
        description?: string,
      }
    }
    color?: string
  }
  const props = withDefaults(defineProps<slideProp>(), {
    index: 0,
    active: false,
    color: 'var(--grey)',
  })

  let w: number
  const goldenRatio = 0.6180339887 // Примерное значение золотого сечения
  let transformPos: { x: number; y: number; }
  
  const slide = ref()

  onMounted(() => {
    w = window.innerWidth
    transformPos = calcTransformPosition()

    setSettings()
    window.addEventListener('resize', setSettings)
  })

  function setSettings() {
    const settings = slide.value
    //console.log(settings)
    // Size
    settings.style.height = `${w * goldenRatio}px`
    settings.style.width = `${w * goldenRatio}px`
    // Transform-origin
    settings.style.transformOrigin = `${transformPos.x}px ${transformPos.y}px`
    // Transform
    const scaleFactor = (goldenRatio ** props.index)
    settings.style.transform = `scale(${scaleFactor})`
    const gradus = 90*props.index
    settings.style.transform += ` rotate(${gradus}deg)`
    settings.style.backgroundColor = props.color
  }
</script>

<style lang="sass">
  .slide
    position: absolute
    display: flex
    flex-direction: column
    align-items: center
    border: 1px solid var(--black)
    padding: 48px
    transition: 0.3s border-radius ease-out
    &:hover
      border-radius: 8%
    &:hover.active
      border-radius: 0
    &:hover .body__btn
        border-radius: 48px
    &:hover .body__btn.active
        border-radius: 5px

  .header
    width: 100%
    height: 50%
    &__title
      width: 100%
      font-size: 32px
      white-space: pre
  .body
    width: 100%
    height: 50%
    display: grid
    grid-template-columns: 80% 20% 
    align-items: center
    justify-items: center
    &__description
      width: 100%
      height: 40%
      font-size: 40px
      font-weight: 700
      text-transform: uppercase
      white-space: pre
      color: #f8173e
    &__btn
      width: 30%
      height: 40%
      border-radius: 5px
      justify-content: center
      background-color: var(--black)
      transition: 0.3s all ease-out
    &__btn.active
      width: 70%
    &__btn-text
      color: #fff

</style>