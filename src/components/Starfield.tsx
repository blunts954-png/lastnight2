'use client'

import { useEffect, useRef } from 'react'

type Star = {
    x: number
    y: number
    size: number
    alpha: number
    twinkle: number
    color: string
    speed: number
}

type ShootingStar = {
    x: number
    y: number
    length: number
    speed: number
    vx: number
    vy: number
    life: number
    maxLife: number
    cooldown: number
    active: boolean
    color: string
}

type Nebula = {
    x: number
    y: number
    radius: number
    hue: number
    alpha: number
    pulse: number
    pulseSpeed: number
    driftX: number
    driftY: number
}

const STAR_COLORS = ['#ffffff', '#00f0ff', '#b026ff', '#ff3333']

export default function Starfield() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let animationFrameId = 0
        let width = 0
        let height = 0
        let pixelRatio = 1

        let stars: Star[] = []
        let shootingStars: ShootingStar[] = []
        let nebulas: Nebula[] = []

        const isMobile = window.matchMedia('(max-width: 767px)').matches

        const random = (min: number, max: number) => Math.random() * (max - min) + min

        const resetCanvas = () => {
            pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5)
            width = window.innerWidth
            height = window.innerHeight

            canvas.width = Math.floor(width * pixelRatio)
            canvas.height = Math.floor(height * pixelRatio)
            canvas.style.width = `${width}px`
            canvas.style.height = `${height}px`

            ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
        }

        const createStars = () => {
            const density = isMobile ? 0.00018 : 0.00025
            const count = Math.max(160, Math.floor(width * height * density))
            stars = Array.from({ length: count }, () => ({
                x: random(0, width),
                y: random(0, height),
                size: random(0.5, isMobile ? 1.8 : 2.2),
                alpha: random(0.25, 1),
                twinkle: random(0.01, 0.04),
                color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
                speed: random(0.02, 0.2)
            }))
        }

        const createNebulas = () => {
            const count = isMobile ? 4 : 6
            nebulas = Array.from({ length: count }, () => ({
                x: random(width * 0.05, width * 0.95),
                y: random(height * 0.05, height * 0.95),
                radius: random(isMobile ? 140 : 220, isMobile ? 280 : 430),
                hue: random(180, 330),
                alpha: random(0.04, 0.12),
                pulse: random(0, Math.PI * 2),
                pulseSpeed: random(0.003, 0.01),
                driftX: random(-0.08, 0.08),
                driftY: random(-0.05, 0.05)
            }))
        }

        const createShootingStars = () => {
            const count = isMobile ? 2 : 4
            shootingStars = Array.from({ length: count }, () => ({
                x: random(-200, width),
                y: random(-150, height * 0.2),
                length: random(80, 200),
                speed: random(10, 18),
                vx: random(0.9, 1.3),
                vy: random(0.5, 0.9),
                life: 0,
                maxLife: random(18, 38),
                cooldown: random(20, 220),
                active: false,
                color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)]
            }))
        }

        const initScene = () => {
            resetCanvas()
            createStars()
            createNebulas()
            createShootingStars()
        }

        const drawNebulas = () => {
            for (const nebula of nebulas) {
                nebula.pulse += nebula.pulseSpeed
                nebula.x += nebula.driftX
                nebula.y += nebula.driftY

                if (nebula.x < -nebula.radius) nebula.x = width + nebula.radius
                if (nebula.x > width + nebula.radius) nebula.x = -nebula.radius
                if (nebula.y < -nebula.radius) nebula.y = height + nebula.radius
                if (nebula.y > height + nebula.radius) nebula.y = -nebula.radius

                const dynamicAlpha = Math.max(0.01, nebula.alpha + Math.sin(nebula.pulse) * 0.02)
                const gradient = ctx.createRadialGradient(nebula.x, nebula.y, 0, nebula.x, nebula.y, nebula.radius)
                gradient.addColorStop(0, `hsla(${nebula.hue}, 95%, 65%, ${dynamicAlpha})`)
                gradient.addColorStop(0.45, `hsla(${nebula.hue + 18}, 90%, 58%, ${dynamicAlpha * 0.35})`)
                gradient.addColorStop(1, `hsla(${nebula.hue + 42}, 90%, 40%, 0)`)

                ctx.fillStyle = gradient
                ctx.beginPath()
                ctx.arc(nebula.x, nebula.y, nebula.radius, 0, Math.PI * 2)
                ctx.fill()
            }
        }

        const drawStars = () => {
            for (const star of stars) {
                star.y -= star.speed
                if (star.y < -2) {
                    star.y = height + 2
                    star.x = random(0, width)
                }

                const twinkleAlpha = Math.max(0.1, Math.min(1, star.alpha + Math.sin(performance.now() * star.twinkle) * 0.25))
                ctx.globalAlpha = twinkleAlpha
                ctx.fillStyle = star.color
                ctx.beginPath()
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
                ctx.fill()
            }
            ctx.globalAlpha = 1
        }

        const drawShootingStars = () => {
            for (const s of shootingStars) {
                if (!s.active) {
                    s.cooldown -= 1
                    if (s.cooldown <= 0) {
                        s.active = true
                        s.x = random(-120, width * 0.7)
                        s.y = random(-100, height * 0.25)
                        s.life = 0
                        s.maxLife = random(18, 40)
                        s.length = random(95, isMobile ? 140 : 210)
                        s.speed = random(10, 18)
                        s.vx = random(0.95, 1.35)
                        s.vy = random(0.5, 0.9)
                        s.color = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)]
                    }
                    continue
                }

                s.life += 1
                s.x += s.speed * s.vx
                s.y += s.speed * s.vy

                const tailX = s.x - s.length * s.vx
                const tailY = s.y - s.length * s.vy

                const gradient = ctx.createLinearGradient(s.x, s.y, tailX, tailY)
                gradient.addColorStop(0, 'rgba(255,255,255,0.95)')
                gradient.addColorStop(0.25, `${s.color}cc`)
                gradient.addColorStop(1, 'rgba(255,255,255,0)')

                ctx.strokeStyle = gradient
                ctx.lineWidth = isMobile ? 1.5 : 2.2
                ctx.beginPath()
                ctx.moveTo(s.x, s.y)
                ctx.lineTo(tailX, tailY)
                ctx.stroke()

                if (s.life > s.maxLife || s.x > width + 200 || s.y > height + 200) {
                    s.active = false
                    s.cooldown = random(40, 260)
                }
            }
        }

        const animate = () => {
            ctx.clearRect(0, 0, width, height)
            drawNebulas()
            drawStars()
            drawShootingStars()
            animationFrameId = window.requestAnimationFrame(animate)
        }

        initScene()
        animate()

        const handleResize = () => {
            initScene()
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            id="starfield-canvas"
            className="fixed inset-0 pointer-events-none z-0 mix-blend-screen"
        />
    )
}
