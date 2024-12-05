import Image from "next/image"

interface LogoProps {
  className?: string 
  size?: number      
}

const Logo: React.FC<LogoProps> = ({ className = "", size = 75 }) => {
  return (
    <Image
      src="/images/banner/logo.png"
      alt="Logo"
      width={size}
      height={size}
      className={`object-contain ${className}`}
    />
  )
}

export default Logo
