
'use client'
import Avatar from '../components/Avatar'
import SocialButton from '../components/SocialButton'
import { socialLinks, myInfo } from '../lib/constants'

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 to-indigo-600 bg-cover bg-center relative" style={{backgroundImage: 'url(images/bg.gif)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <div className="absolute inset-0 bg-black opacity-0"></div>
      <div className="p-8 rounded-lg shadow-lg max-w-md w-full backdrop-filter backdrop-blur-lg bg-opacity-10 bg-white relative m-3 border-1 border-gray-500">
      <Avatar />
      <h1 className="text-3xl font-bold mb-2">{myInfo.name}</h1>
      <p className="text-gray-600 mb-4">{myInfo.city}</p>
      
      <div className="mb-6">
        <p className="text-gray-800">
        {myInfo.bio}
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {Array.isArray(socialLinks) && socialLinks.map((link) => (
        <SocialButton key={link.name} {...link} />
        ))}
      </div>
      </div>
    </main>
    )
}