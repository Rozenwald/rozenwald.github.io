const calcTransformPosition = () => {

  const goldenRatio = 0.618033 // Примерное значение золотого сечения
  const w: number = window.innerWidth // window width
  let x: number = 0
  let y: number = 0

  // Высчитываем точка по x
  let index = 1
  while (w*(goldenRatio**index) > 1) {
    x += w*(goldenRatio**index)
    index += 4
  }

  // Высчитываем точка по y
  index = 2
  while (w*(goldenRatio**index) > 1) {
    y += w*(goldenRatio**index)
    index += 4
  }

  // x = Math.round(x)
  // y = Math.round(y)
  const transformPos = {
    x,
    y
  }
  return transformPos
}

export default calcTransformPosition