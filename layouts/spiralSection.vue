<template>
<div class="spiral">
  <slide
    @click="chooseSlide(index)"
    v-for="(slide, index) in slides"
    :index="index"
    :data="slide.data"
    :color="color"
    :active="(activeSlide == index) ? true : false"
  />
  <intro/>
</div>
<div class="pattern"></div>
</template>

<script setup lang="ts">
  import space from '../assets/space.svg'
  import wave from '../assets/wave.svg'

  const icons = [
    "nuxt", "vue", "vite", "pinia",
    "ts", "js", "html", "css", "sass",
    "figma", "github",
  ]

  let w: number // window width
  const goldenRatio = 0.618033 // Примерное значение золотого сечения
  let transformPos: { x: number; y: number; }

  let color = '#fff'
  const slides = reactive([
    {
      data: {
        ru: {
          title: `Привет, меня зовут Кирилл Кузнецов. Я Frontend developer. И это мой сайт портфолио `,
          description: '',
        },
        en: {
          title: `Hi, my name is Laure.\nI am Frontend developer.`,
          subtitle: `Turning Vision Into Reality With Code And Design.`,
          description: 'Idea\nCode\nArchitecture',
          icon: 'Rose'
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
        title: '',
        description: '',
        }
      },
    },
    {
      data: {
        ru: {
          title: `Turning Vision Into Reality With Code And Design.`,
          description: '',
        },
        en: {
          title: '',
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
          title: '',
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
          title: '',
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
          title: '',
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
          title: '',
          description: '',
        }
      }
    },
  ])
  const height = ref(0)
  const width = ref(0)
  
  let activeSlide = ref(0)
  let scaleFactor = 1
  let gradus = 0
  let timeout: any 

  onMounted(() => {
    setSettings()
    setBackground()

    window.addEventListener('keydown', keyHandler)
    window.addEventListener('wheel', scrollHandler)
    window.addEventListener('resize', setSettings)
    // window.addEventListener('pointermove', scrollChanges)
  })
  onUnmounted(() => {
    window.removeEventListener('keydown', keyHandler)
    window.removeEventListener('whell', () => scrollHandler)
    window.removeEventListener('resize', setSettings)
  })

  watch(activeSlide, () => {
    const slides = document.querySelector('.spiral') as HTMLElement
    console.log(activeSlide.value)
    switch (activeSlide.value) {
      case 0:
        slides.style.backgroundColor = '#0b0b0B'
        color = '#fff'
        console.log(slides.style.backgroundColor)
        break;
      case 1:
        slides.style.backgroundColor = '#0b0b0B'
        color = '#fff'
        console.log(slides.style.backgroundColor) 
        break;
      case 2:
        slides.style.backgroundColor = '#0B0B0B'
        color = '#ffda44'
        console.log(slides.style.backgroundColor)
        break;
      case 3:
        slides.style.backgroundColor = '#E52127'
        color = '#2f3436'
        console.log(slides.style.backgroundColor)
        break;
      case 4:
        slides.style.backgroundColor = '#356a85'
        color = '#6ad4ff'
        console.log(slides.style.backgroundColor)
        break;
      case 5:
        slides.style.backgroundColor = '#52beac'
        color = '#2c2435'
        console.log(slides.style.backgroundColor)
        break;
      case 6:
        slides.style.backgroundColor = '#fb6247'
        color = '#271325'
        console.log(slides.style.backgroundColor)
        break;
      case 7:
        slides.style.backgroundColor = '#dbd1b7'
        color = '#151a1e'
        console.log(slides.style.backgroundColor)
        break;
      case 8:
        slides.style.backgroundColor = '#0b0b0b'
        color = '#fff'
        break;
      default: '#000'
        break;
    }
  })

  function setSettings() {
    const slides = document.querySelector('.spiral') as HTMLElement
    w = window.innerWidth
    transformPos = calcTransformPosition()

    slides.style.transition = 'all 0.5s linear 0s'
    slides.style.transformOrigin = `${transformPos.x}px ${transformPos.y}px`
  }
  function setBackground() {
    const background = document.querySelector('.pattern') as HTMLElement
    const random = Math.round(Math.random())
    if (random == 1) {
      console.log("space")
      background.style.backgroundImage = `url(${space})`
    } else {
      console.log("background")
      background.style.backgroundImage = `url(${wave})`
    }
  }

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
    opacity: 0.1
    overflow: hidden
    pointer-events: none
  
  .spiral
    position: absolute
    width: 100vw
    height: 100vh
    pointer-events: auto
    background-color: #000

</style>