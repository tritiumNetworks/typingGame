/* global Hangul, ProgressBar, alert */

window.addEventListener('load', () => {
  const type = document.getElementsByClassName('type')[0]
  let target = Math.floor(Math.random() * 0x2BAF) + 0xAC00
  let log = ''
  let score = 0
  let plus = 0
  let started = false

  const bar = new ProgressBar.Circle('.timer', {
    strokeWidth: 6,
    color: '#FFEA82',
    trailColor: '#eee',
    trailWidth: 1,
    svgStyle: null,
    step: (_, s) => {
      if (s.value() === 1) {
        let v = 0
        log.split('').forEach((c) => {
          v += c.charCodeAt(0)
        })
        alert('끝!\n스코어: ' + score + '점\n글자들: ' + log + '\nR스코어: ' + v + '점')
        window.location.reload()
      }
    }
  })

  type.placeholder = String.fromCharCode(target)
  plus = Hangul.disassemble(String.fromCharCode(target)).length

  document.getElementsByClassName('plus')[0].innerHTML = '+' + plus
  document.getElementsByClassName('current')[0].innerHTML = score

  type.addEventListener('input', () => {
    console.log(5000 + (score * -50))
    if (!started) bar.animate(1, { duration: 5000 + (score * -50) })
    started = true

    if (type.value.charCodeAt(0) !== target) return
    log += String.fromCharCode(target)

    bar.set(0)
    started = false
    type.value = ''
    target = Math.floor(Math.random() * 0x2BAF) + 0xAC00
    type.placeholder = String.fromCharCode(target)

    score += plus
    plus = Hangul.disassemble(String.fromCharCode(target)).length

    document.getElementsByClassName('plus')[0].innerHTML = '+' + plus
    document.getElementsByClassName('current')[0].innerHTML = score
  })
})
