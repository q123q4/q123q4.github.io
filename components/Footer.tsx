import data from '@/content/data.json'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-textColor text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-container mx-auto text-center">
        <div className="flex justify-center gap-6 mb-6">
          {data.contact.socials.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded"
              aria-label={social.name}
            >
              {social.name}
            </a>
          ))}
          <a
            href={`mailto:${data.contact.email}`}
            className="text-white/80 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded"
            aria-label="邮箱"
          >
            邮箱
          </a>
        </div>
        <p className="mb-2">
          © {currentYear} {data.hero.name}. All rights reserved.
        </p>
        <p className="text-sm text-white/60">
          Built with Next.js & Tailwind CSS
        </p>
      </div>
    </footer>
  )
}

