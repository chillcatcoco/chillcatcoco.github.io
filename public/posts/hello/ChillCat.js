'use client'

import { useEffect, useRef, useState } from 'react'

export function ChillCat() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const svgRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (svgRef.current) {
        const svgRect = svgRef.current.getBoundingClientRect()
        setMousePosition({
          x: event.clientX - svgRect.left,
          y: event.clientY - svgRect.top
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const calculateEyePosition = (eyeX, eyeY) => {
    const dx = mousePosition.x - eyeX
    const dy = mousePosition.y - eyeY
    const distance = Math.sqrt(dx * dx + dy * dy)
    const maxDistance = 2 // Reduced max distance for smaller eyes
    const scale = Math.min(maxDistance / distance, 1)
    return {
      x: dx * scale,
      y: dy * scale
    }
  }

  const leftEyePosition = calculateEyePosition(22, 24)
  const rightEyePosition = calculateEyePosition(38, 24)

  return (
    <svg
      ref={svgRef}
      width='60'
      height='50'
      viewBox='0 0 60 50'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      {/* Cat face - slightly elongated oval shape */}
      <ellipse cx='30' cy='25' rx='24' ry='21' fill='#FFD700' />

      {/* Ears */}
      <polygon points='14,9 20,18 8,18' fill='#FFD700' />
      <polygon points='46,9 52,18 40,18' fill='#FFD700' />

      {/* Eyes */}
      <ellipse cx='22' cy='24' rx='5' ry='6' fill='white' />
      <circle
        cx={22 + leftEyePosition.x}
        cy={24 + leftEyePosition.y}
        r='2.5'
        fill='black'
      />

      <ellipse cx='38' cy='24' rx='5' ry='6' fill='white' />
      <circle
        cx={38 + rightEyePosition.x}
        cy={24 + rightEyePosition.y}
        r='2.5'
        fill='black'
      />

      {/* Nose */}
      <path d='M30 32 L28 35 H32 Z' fill='#FFA500' />

      {/* Mouth */}
      <path
        d='M26 37 Q30 40 34 37'
        stroke='black'
        strokeWidth='1'
        fill='none'
      />

      {/* Whiskers */}
      <line x1='12' y1='30' x2='2' y2='27' stroke='black' strokeWidth='0.5' />
      <line x1='12' y1='33' x2='2' y2='33' stroke='black' strokeWidth='0.5' />
      <line x1='12' y1='36' x2='2' y2='39' stroke='black' strokeWidth='0.5' />
      <line x1='48' y1='30' x2='58' y2='27' stroke='black' strokeWidth='0.5' />
      <line x1='48' y1='33' x2='58' y2='33' stroke='black' strokeWidth='0.5' />
      <line x1='48' y1='36' x2='58' y2='39' stroke='black' strokeWidth='0.5' />
    </svg>
  )
}
