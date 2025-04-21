import { ShieldCheckIcon, HeartIcon, UsersIcon, LightbulbIcon } from "lucide-react"

export default function ValuesSection() {
  const values = [
    {
      icon: <ShieldCheckIcon className="w-7 h-7" />,
      title: "Safety First",
      description: "We prioritize patient safety in everything we do, from product selection to delivery.",
    },
    {
      icon: <HeartIcon className="w-7 h-7" />,
      title: "Patient-Centered Care",
      description: "Our services are designed around patient needs, ensuring a personalized healthcare experience.",
    },
    {
      icon: <UsersIcon className="w-7 h-7" />,
      title: "Integrity & Trust",
      description: "We operate with complete transparency and honesty to earn and maintain your trust.",
    },
    {
      icon: <LightbulbIcon className="w-7 h-7" />,
      title: "Innovation",
      description: "We continuously improve our services to provide the best healthcare solutions.",
    },
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-white to-cyan-50 relative overflow-hidden">
    
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="2" fill="#0891b2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Our Core Values</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            These principles guide our decisions and actions every day
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {values.map((value, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 p-8 flex justify-center">
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                  <div className="text-cyan-600">{value.icon}</div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
