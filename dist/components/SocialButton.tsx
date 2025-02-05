'use client'

import { type LucideIcon } from 'lucide-react'
import React from 'react'

interface SocialButtonProps {
  icon: LucideIcon
  name: string
  href: string
  color: string
}

export default function SocialButton({ icon: Icon, name, href, color }: SocialButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center space-x-2 py-2 px-4 bg-gray-100 rounded-lg transition-all duration-300 hover:bg-purple-500 hover:text-white hover:scale-105"
      style={{backgroundColor: color, color: "white"}}
    >
      <Icon size={20} />
      <span>{name}</span>
    </a>
  )
}