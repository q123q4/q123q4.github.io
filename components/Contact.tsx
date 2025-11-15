'use client'

import { useEffect, useRef } from 'react'
import data from '@/content/data.json'

export default function Contact() {
  const contactRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const element = contactRef.current
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
      id="contact"
      ref={contactRef}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white opacity-0"
    >
      <div className="max-w-container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-textColor mb-12">
          联系我
        </h2>
        
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-lg text-textColor/70 mb-8">
            如果你对我的项目感兴趣，或者想要合作，欢迎通过以下方式联系我。
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href={`mailto:${data.contact.email}`}
              className="px-8 py-3 bg-primary text-white rounded-[8px] font-semibold hover:opacity-90 transition-all duration-200 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              发送邮件
            </a>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            {data.contact.socials.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-bgColor rounded-[12px] hover:bg-secondary/20 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-primary hover:shadow-md"
              >
                <span className="font-medium text-textColor group-hover:text-primary transition-colors">
                  {social.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

