import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="relative h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
        
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=2069&auto=format&fit=crop"
          alt="about banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/90 via-cyan-800/85 to-cyan-700/80"></div>
      </div>

      <div className="absolute inset-0 z-[1] opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-white blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-cyan-200 blur-3xl"></div>
      </div>

      <div className="container relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="inline-block mb-6 bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full border border-white/20">
          <span className="text-white font-medium tracking-wide">Your Trustworthy</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-tight">
          About <span className="text-cyan-300">MediMart</span>
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
          The next generation healthcare partner committed to making healthcare accessible, affordable, and convenient
          for everyone.
        </p>
        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <a
            href="#mission"
            className="px-8 py-4 bg-white text-cyan-600 rounded-full font-medium hover:bg-cyan-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2 group"
          >
            Our Mission
          </a>
          <a
            href="#team"
            className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-medium hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            Meet Our Team
          </a>
        </div>
      </div>

    </section>
  )
}
