'use client'

import { useEffect, useRef } from 'react'
import data from '@/content/data.json'

export default function About() {
  const aboutRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const element = aboutRef.current
    if (!element) return

    // 检查元素是否已经在视口内
    const rect = element.getBoundingClientRect()
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0
    
    if (isVisible) {
      element.classList.remove('opacity-0')
      element.classList.add('animate-fade-in')
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0')
            entry.target.classList.add('animate-fade-in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [])

  return (
    <section
      id="about"
      ref={aboutRef}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white opacity-0"
    >
      <div className="max-w-container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-textColor mb-12">
          关于我
        </h2>
        
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-textColor/80 leading-relaxed mb-8">
            {data.about.bio}
          </p>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-textColor">技能</h3>
            <div className="flex flex-wrap gap-2">
              {data.about.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-secondary/20 text-textColor rounded-full text-sm font-medium hover:bg-secondary/30 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

