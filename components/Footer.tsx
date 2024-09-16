import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

const Footer = () => {
  return (
    <>
        <footer className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">CRM Webapp</h3>
              <p className="text-muted-foreground">Empowering your digital content journey.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
                <li><Link href="#features" className="text-muted-foreground hover:text-primary transition-colors">Features</Link></li>
                <li><Link href="#about" className="text-muted-foreground hover:text-primary transition-colors">About</Link></li>
                <li><Link href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
              <p className="text-muted-foreground mb-4">Stay updated with our latest features and news.</p>
              <form className="flex">
                <input type="email" placeholder="Your email" className="rounded-tl-md rounded-bl-md p-1" />
                <Button type="submit" className="rounded-l-none">Subscribe</Button>
              </form>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-muted-foreground/20 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} CRM Webapp. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer