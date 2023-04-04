<template>
  <div
    class="slide"
    ref="slide"
    :class="{ active: active }"
  >
    <div class="header">
      <div class="header__title"> {{ props.data.en.title }} </div>
      <div class="header__subtitle"> {{ props.data.en.subtitle }} </div>  
    </div>
    <div class="body">
      <div class="body__description"> {{ props.data.en.description }} </div>
      <button
        class="body__btn"
        :class="{ active: active }"
      >
        <div v-if="active && (index == 0)" class="body__btn-text" src="~/assets/icons/Arrow.svg">
          Анимация
        </div>
        <img v-else-if="!active && (index != 0)" class="body__btn-img" src="~/assets/icons/Arrow.svg">
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
        subtitle?: string,
        description?: string,
      }
    }
    color: string
  }
  const props = withDefaults(defineProps<slideProp>(), {
    index: 0,
    active: false,
  })

  let w: number
  const goldenRatio = 0.6180339887 // Примерное значение золотого сечения
  let transformPos: { x: number; y: number; }
  
  const slide = ref()

  onMounted(() => {
    setSettings()
    setTransform()
    window.addEventListener('resize', setSettings)
  })
  watch(props, () => {
      const settings = slide.value
      settings.style.backgroundColor = props.color
    }
  )

  function setSettings() {
    const settings = slide.value
    w = window.innerWidth
    transformPos = calcTransformPosition()
    // Size
    settings.style.height = `${w * goldenRatio}px`
    settings.style.width = `${w * goldenRatio}px`
    // Transform-origin
    settings.style.transformOrigin = `${transformPos.x}px ${transformPos.y}px`
  }

  function setTransform() {
    console.log('settings')
    const settings = slide.value
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
    align-items: self-start
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
    width: 80%
    height: 50%
    &__title
      width: 100%
      font-size: 40px
      white-space: pre-wrap
    &__subtitle
      width: 100%
      margin: 16px 0
      font-size: 24px
      white-space: pre-wrap
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
      white-space: pre-wrap
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
    &__btn-img
      width: 80%
      height: 80%

</style>