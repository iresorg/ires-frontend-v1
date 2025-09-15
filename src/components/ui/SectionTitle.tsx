import Image from 'next/image'

interface SectionTitleProps {
  logo?: string
  logoAlt?: string
  title: string
  subtitle?: string
  className?: string
}

export default function SectionTitle({ 
  logo, 
  logoAlt = "Logo", 
  title, 
  subtitle, 
  className = "" 
}: SectionTitleProps) {
  return (
    <div
      className={`inline-flex items-center gap-1 px-6 py-3 rounded-full border-2 ${className}`}
      style={{
        borderColor: 'var(--accent-secondary-color)',
        background: 'var(--secondary)',
      }}
    >
      {logo && (
        <div className="w-8 h-8 rounded-full flex items-center justify-center mr-1">
          <Image
            src={logo}
            alt={logoAlt}
            width={20}
            height={20}
            className="w-8 h-8"
          />
        </div>
      )}
      
      <div className="flex items-center">
        <span
          className="text-lg font-medium bg-clip-text text-transparent"
          style={{
            backgroundImage: 'linear-gradient(to right, #60a5fa 0%, var(--accent-secondary-color) 100%)',
          }}
        >
          {title}
        </span>
      </div>
    </div>
  )
}
