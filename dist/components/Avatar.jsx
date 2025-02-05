import Image from 'next/image'

export default function Avatar() {
  return (
    <div className="mb-6 relative">
      <Image
        src="/images/avatar.jpg"
        width={150}
        height={150}
        alt="Avatar"
        className="rounded-full mx-auto border-4 border-blue-500 transition-transform duration-300 hover:scale-105"
      />
    </div>
  )
}