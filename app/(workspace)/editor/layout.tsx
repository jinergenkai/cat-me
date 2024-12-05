import Link from "next/link"

import { marketingConfig } from "@/config/marketing"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import { title } from "process"
import { Viewport } from "next/dist/lib/metadata/types/extra-types"

interface MarketingLayoutProps {
  children: React.ReactNode
}

export const metadata = {
  viewport: "width=device-width, initial-scale=1.0, viewport-fit=cover",
  title: "Sáng tạo",
}
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav items={marketingConfig.mainNav} />
          {/* <nav>
            <Link href="/login" className={cn( buttonVariants({ variant: "secondary", size: "sm" }), "px-4")} >
              Login
            </Link>
          </nav> */}
        </div>
      </header>
      <main className="flex-1">{children}</main>
      {/* <SiteFooter /> */}
    </div>
  )
}
