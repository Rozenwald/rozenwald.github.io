<template>
<div class="spiral">
  <slide
    @click="chooseSlide(index)"
    v-for="(slide, index) in slides"
    :index="index"
    :data="slide.data"
    :active="(activeSlide == index) ? true : false"
  />
  <intro/>
</div>
<div class="pattern"></div>
</template>

<script setup lang="ts">

  const icons = [
    "nuxt", "vue", "vite", "pinia",
    "ts", "js", "html", "css", "sass",
    "figma", "github",
  ]

  let w: number // window width
  const goldenRatio = 0.618033 // Примерное значение золотого сечения
  let transformPos: { x: number; y: number; }

  let color = ''
  const slides = [
    {
      data: {
        ru: {
          title: `Привет, меня зовут Кирилл Кузнецов. Я Frontend developer. И это мой сайт портфолио `,
          description: '',
        },
        en: {
          title: `Hi, my name is Laure.\nI'am Frontend developer.\nFrom Russia with love`,
          description: 'Code\nPrototype\nArchitecture',
        }
      }
    },
    {
      data: {
        ru: {
        title: 'Ответственный, Самостоятельный, Легкообучаемый',
        description: '',
        },
        en: {
        title: 'Ответственный, Самостоятельный, Легкообучаемый',
        description: '',
        }
      }
    },
    {
      data: {
        ru: {
          title: `Привет, меня зовут Кирилл Кузнецов. Я Frontend developer. И это мой сайт портфолио `,
          description: '',
        },
        en: {
          title: `Welcome, my name is Laure. I'am Frontend developer. And this is my history `,
          description: '',
        }
      }
    },
    {
      data: {
        ru: {
          title: `Привет, меня зовут Кирилл Кузнецов. Я Frontend developer. И это мой сайт портфолио `,
          description: '',
        },
        en: {
          title: `Welcome, my name is Laure. I'am Frontend developer. And this is my history `,
          description: '',
        }
      }
    },
    {
      data: {
        ru: {
          title: `Привет, меня зовут Кирилл Кузнецов. Я Frontend developer. И это мой сайт портфолио `,
          description: '',
        },
        en: {
          title: `Welcome, my name is Laure. I'am Frontend developer. And this is my history `,
          description: '',
        }
      }
    },
    {
      data: {
        ru: {
          title: `Привет, меня зовут Кирилл Кузнецов. Я Frontend developer. И это мой сайт портфолио `,
          description: '',
        },
        en: {
          title: `Welcome, my name is Laure. I'am Frontend developer. And this is my history `,
          description: '',
        }
      }
    },
    {
      data: {
        ru: {
          title: `Привет, меня зовут Кирилл Кузнецов. Я Frontend developer. И это мой сайт портфолио `,
          description: '',
        },
        en: {
          title: `Welcome, my name is Laure. I'am Frontend developer. And this is my history `,
          description: '',
        }
      }
    },
  ]
  const activeSlide = ref(0)
  const height = ref(0)
  const width = ref(0)
  
  let scaleFactor = 1
  let gradus = 0
  let timeout: any 

  onMounted(() => {
    w = window.innerWidth
    transformPos = calcTransformPosition()
    const slides = document.querySelector('.spiral') as HTMLElement
    slides.style.transition = 'all 0.5s linear 0s'
    slides.style.transformOrigin = `${transformPos.x}px ${transformPos.y}px`

    window.addEventListener('keydown', keyHandler)
    window.addEventListener('wheel', scrollHandler)
    // window.addEventListener('pointermove', scrollChanges)
  })
  onUnmounted(() => {
    window.removeEventListener('keydown', keyHandler)
    window.removeEventListener('whell', () => scrollHandler)
  })

  function keyHandler(event: KeyboardEvent) {
    if ((event.key == 'ArrowUp') || (event.key == 'ArrowLeft')) {
      gradus += 90
      scaleFactor *= goldenRatio
      const slides = document.querySelector('.spiral') as HTMLElement
      slides.style.transform = `scale(${scaleFactor})`
      slides.style.transform += `rotate(${gradus}deg)`
      activeSlide.value -= 1
    }
    if ((event.key == 'ArrowDown') || (event.key == 'ArrowRight')) {
      gradus -= 90
      scaleFactor /= goldenRatio  
      const slides = document.querySelector('.spiral') as HTMLElement
      slides.style.transform = `scale(${scaleFactor})`
      slides.style.transform += `rotate(${gradus}deg)`
      activeSlide.value += 1
    }
  }

  function chooseSlide(index: number) {
    console.log(index)
    scaleFactor = 1
    gradus = -90*index
    scaleFactor /= goldenRatio**index
    activeSlide.value = index
    const slides = document.querySelector('.spiral') as HTMLElement
    slides.style.transform = `scale(${scaleFactor}) rotate(${gradus}deg)`
  }

  function scrollHandler(event: WheelEvent) {
    const slice = goldenRatio**(1/9) // slice**9 == goldenratio
    const step = 10 // step*9 = 90deg

    const slides = document.querySelector('.spiral') as HTMLElement
    if (event.deltaY > 0) {
      gradus -= 10
      scaleFactor /= slice
      slides.style.transform = `scale(${scaleFactor})`
      slides.style.transform += `rotate(${gradus}deg)`
    } else {
      gradus += 10
      scaleFactor *= slice
      slides.style.transform = `scale(${scaleFactor})`
      slides.style.transform += `rotate(${gradus}deg)`
    }
    return function() {
      clearTimeout(timeout)
      timeout = setTimeout(
        () => {
          let multuplier = Math.round(gradus/90)
          gradus = multuplier*90
          gradus = gradus + (90*2) - (90*2)
          scaleFactor = goldenRatio**multuplier
          slides.style.transform = `scale(${scaleFactor})`
          slides.style.transform += `rotate(${gradus}deg)`
          activeSlide.value = -multuplier
        },
        300)
    }()
  }

</script>

<style lang="sass">

  .pattern
    --goldenRatio: 0.618033
    position: fixed
    width: 100vw
    height: 100vh
    z-index: 99
    opacity: 0.3
    overflow: hidden
    background-image: url(./assets/background.svg)
    background-size: 25vw
    pointer-events: none
    background-color: #000
  
  .spiral
    position: absolute
    width: 100vw
    height: 100vh
    pointer-events: auto
    &--1
      background-color: var(--blue)
    &--2
      background-color: var(--yellow)
    &--3
      background-color: var(--ice)
    &--4
      background-color: var(--yellow)
    &--5
      background-color: var(--pink)

</style>