'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import data from '@/content/data.json'

export default function Projects() {
  const projectsRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const element = projectsRef.current
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
      id="projects"
      ref={projectsRef}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-bgColor opacity-0"
    >
      <div className="max-w-container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-textColor mb-12">
          项目作品
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {data.projects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-[12px] overflow-hidden shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-1 group"
            >
              <div className="relative h-48 bg-bgColor">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-textColor/40">
                    <svg
                      className="w-16 h-16"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-textColor mb-2">
                  {project.title}
                </h3>
                <p className="text-textColor/70 mb-4">{project.desc}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-secondary/20 text-textColor text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:opacity-80 font-medium transition-all duration-200 hover:translate-x-1 focus:outline-none focus:ring-2 focus:ring-primary rounded inline-flex items-center gap-1"
                >
                  查看项目
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

