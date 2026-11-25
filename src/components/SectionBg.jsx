import { Component, Suspense, useEffect, useRef, useState } from 'react'

// Renders nothing if a background throws (no WebGL) or its chunk fails to load.
class Quiet extends Component {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

// Mounts a lazy background once its section is within 300px of the viewport; never unmounts.
export default function SectionBg(all) {
  const { as: Bg, ...props } = all
  const ref = useRef(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true)
          io.disconnect()
        }
      },
      { rootMargin: '300px 0px' },
    )
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} className="sec-bg" aria-hidden="true">
      {on && (
        <Quiet>
          <Suspense fallback={null}>
            <Bg {...props} />
          </Suspense>
        </Quiet>
      )}
    </div>
  )
}
