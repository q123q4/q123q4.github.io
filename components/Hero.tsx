'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import data from '@/content/data.json'

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const contentDiv = entry.target.querySelector('.hero-content')
            if (contentDiv) {
              contentDiv.classList.remove('opacity-0')
              contentDiv.classList.add('animate-fade-in')
            }
          }
        })
      },
      { threshold: 0.1 }
    )

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current)
      }
    }
  }, [])

  return (
    <section
      id="hero"
      ref={heroRef}
      className="min-h-screen flex items-center justify-center pt-16 md:pt-20 px-4 sm:px-6 lg:px-8 bg-bgColor"
    >
      <div className="max-w-container mx-auto text-center hero-content opacity-0">
        <div className="mb-8 animate-slide-up">
          <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-primary/20 shadow-lg">
            <Image
              src={data.hero.avatar || '/avatar.jpg'}
              alt={data.hero.name}
              width={160}
              height={160}
              className="object-cover"
              priority
            />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-textColor mb-4 animate-slide-up [animation-delay:0.1s]">
          {data.hero.name}
        </h1>
        
        <p className="text-xl md:text-2xl text-primary mb-6 font-medium animate-slide-up [animation-delay:0.2s]">
          {data.hero.tagline}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up [animation-delay:0.3s]">
          <a
            href={data.hero.ctaLink}
            className="px-8 py-3 bg-primary text-white rounded-[8px] font-semibold hover:opacity-90 transition-all duration-200 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            {data.hero.ctaText}
          </a>
          <a
            href="#projects"
            className="px-8 py-3 border-2 border-primary text-primary rounded-[8px] font-semibold hover:bg-primary/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            查看项目
          </a>
        </div>
      </div>
    </section>
  )
}

