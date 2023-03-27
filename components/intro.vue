<template>
  <div class="intro">
  </div>
</template>

<script setup lang="ts">
  interface rectAttrs {
    x: string
    y: string
    width: string
    height: string
    fill: string
    stroke: string
    'stroke-width': string
  }
  interface pathAttrs {
    viewBox: string
    d: string
    fill: string
    stroke: string
    'stroke-width': string
    'stroke-dasharray': string
    'stroke-dashoffset': string
  }

  let svgIntro: Element
  let transformPos: { x: number; y: number; }
  let w: number // window width
  const goldenRatio = 0.618033 // Примерное значение золотого сечения
  
  defineProps()

  onMounted(() => {
    // nuxt - это ssr, он не знает о существовании window до монтажа компонента
    // Поэтому значения получаем в хуке
    w = window.innerWidth 
    transformPos = calcTransformPosition()

    startIntro()

    const path = document.querySelector('.path') as SVGRectElement
    path!.style.transition = 'all 3s linear 0s'
    path!.style.strokeDashoffset = '0px'
    const svg = document.querySelector('.intro') as SVGElement
    svg.style.transition = 'all 3s linear 0s'
    // svg!.style.opacity = '0'
  })

  function startIntro() {
    // Создаем svg
    svgIntro = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgIntro.setAttribute('width', '100%')
    svgIntro.setAttribute('height', '100%')
    const main = document.querySelector('.intro')
    main?.appendChild(svgIntro)
  
    // Создаем квадраты
    createSquares()
    // Рисуем линию
    createLine()
  }

  function createSquares() {
    let index = 0
    let gradus = 0
    let rect: SVGRectElement
    let scaleFactor: number

    while ( index < 7 ) {
      rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      const attributes: rectAttrs = {
        x: '0' ,
        y: '0',
        width: `${w * goldenRatio}`,
        height: `${w * goldenRatio}`,
        fill: 'none',
        stroke: '#fff',
        'stroke-width': '5px',
      }
      for (let attr in attributes) {
        rect.setAttribute(attr,  attributes[attr as keyof rectAttrs])
      }
  
      rect.style.transformOrigin = `${transformPos.x}px ${transformPos.y}px`
      scaleFactor = (goldenRatio ** index)
      rect.style.transform = `scale(${scaleFactor})`
      rect.style.transform += `rotate(${gradus}deg)`
      gradus = gradus + 90

      const replaceRect = document.querySelector(`.rect--${index}`) as SVGRectElement
      rect.classList.add(`rect--${index}`)
      if (rect.attributes.getNamedItem('width')?.value != replaceRect?.attributes.getNamedItem('width')?.value) {
        if (replaceRect) {
          svgIntro.replaceChild(rect , replaceRect)
        } else {
          svgIntro.appendChild(rect)
        }
      }
      index += 1
    }
  }

  function createLine() {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const attributes: pathAttrs = {
      viewBox: `0 0 ${w} ${w * goldenRatio}`,
      d: `M 0, ${w * goldenRatio},
        a ${w * goldenRatio}, ${w * goldenRatio}, 0, 0, 1, ${w * goldenRatio}, -${w * goldenRatio},
        a ${w*goldenRatio**2}, ${w*goldenRatio**2}, 0, 0, 1, ${w * goldenRatio**2}, ${w * goldenRatio**2}
        a ${w*goldenRatio**3}, ${w*goldenRatio**3}, 0, 0, 1, -${w * goldenRatio**3}, ${w * goldenRatio**3}
        a ${w*goldenRatio**4}, ${w*goldenRatio**4}, 0, 0, 1, -${w * goldenRatio**4}, -${w * goldenRatio**4}
        a ${w*goldenRatio**5}, ${w*goldenRatio**5}, 0, 0, 1, ${w * goldenRatio**5}, -${w * goldenRatio**5}
        a ${w*goldenRatio**6}, ${w*goldenRatio**6}, 0, 0, 1, ${w * goldenRatio**6}, ${w * goldenRatio**6}
        a ${w*goldenRatio**7}, ${w*goldenRatio**7}, 0, 0, 1, -${w * goldenRatio**7}, ${w * goldenRatio**7}`,
      fill: 'none',
      stroke: '#fff',
      'stroke-width': '5px',
      'stroke-dasharray': '5000',
      'stroke-dashoffset': '5000',
    }
    for (let attr in attributes) {
      path.setAttribute(attr,  attributes[attr as keyof pathAttrs])
    }
  
    const replacePath = document.querySelector('.path')
    path.classList.add('path')

    if (path.attributes.getNamedItem('viewBox')?.value != replacePath?.attributes.getNamedItem('viewBox')?.value) {
      if (replacePath) {
        svgIntro.replaceChild(path , replacePath)
      } else {
        svgIntro.appendChild(path)
      }
    }
    path.style.strokeDashoffset = '5000px'
  }

</script>

<style lang="sass">

  .intro
    display: none
    width: 100%
    height: 100%
    opacity: 1
    position: absolute
    top: 0
    left: 0
    z-index: 9999
    background-color: var(--pink)

</style>