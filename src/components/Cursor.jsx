import { useEffect, useRef } from 'react'

const HOT = 'a, button, summary, [role="button"], label'

// Yellow dot that sits exactly on the pointer. Position is written straight to the DOM (no state, no easing).
export default function Cursor() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    const mq = matchMedia('(hover: hover) and (pointer: fine)')
    if (!el || !mq.matches) return undefined
    const root = document.documentElement
    const half = el.offsetWidth / 2
    let raf = 0
    let x = 0
    let y = 0
    const frame = () => {
      raf = 0
      el.style.translate = `${x - half}px ${y - half}px`
    }
    const move = (e) => {
      if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return
      x = e.clientX
      y = e.clientY
      if (!raf) raf = requestAnimationFrame(frame)
      if (!el.classList.contains('on')) {
        frame()
        el.classList.add('on')
        root.classList.add('has-cursor')
      }
    }
    const over = (e) => el.classList.toggle('hot', !!e.target.closest?.(HOT))
    const down = () => el.classList.add('down')
    const up = () => el.classList.remove('down')
    const leave = () => el.classList.remove('on')
    document.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerover', over, { passive: true })
    document.addEventListener('pointerdown', down, { passive: true })
    document.addEventListener('pointerup', up, { passive: true })
    document.addEventListener('pointercancel', up, { passive: true })
    root.addEventListener('pointerleave', leave)
    return () => {
      document.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', over)
      document.removeEventListener('pointerdown', down)
      document.removeEventListener('pointerup', up)
      document.removeEventListener('pointercancel', up)
      root.removeEventListener('pointerleave', leave)
      cancelAnimationFrame(raf)
      el.classList.remove('on', 'hot', 'down')
      root.classList.remove('has-cursor')
    }
  }, [])
  return <div ref={ref} className="cursor" aria-hidden="true" />
}
