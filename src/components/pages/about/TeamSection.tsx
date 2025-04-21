import { LinkedinIcon, TwitterIcon, MailIcon } from "lucide-react"
import Image from "next/image"

export default function TeamSection() {
  const teamMembers = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Medical Officer",
      bio: "With extensive experience in pharmaceutical care, Dr. Johnson ensures all our products meet the highest medical standards.",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop",
    },
    {
      name: "Michael Chen",
      role: "Chief Executive Officer",
      bio: "Michael founded MediMart with a vision to make healthcare accessible to everyone through technology and innovation.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Customer Experience",
      bio: "Emily is dedicated to creating seamless and personalized experiences for all MediMart customers.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2076&auto=format&fit=crop",
    },
    {
      name: "Dr. James Wilson",
      role: "Head Pharmacist",
      bio: "Dr. Wilson oversees our pharmacy operations, ensuring accurate dispensing and expert medication advice.",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop",
    },
  ]

  return (
    <section id="team" className="py-24 bg-gradient-to-b from-cyan-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-cyan-100/50 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Meet Our Team</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The dedicated professionals behind MediMart is vision
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col"
            >
              <div className="relative h-60 overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={300}
                  height={350}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <div className="flex gap-3">
                    <a
                      href="#"
                      className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-cyan-600 hover:bg-cyan-50 transition-colors duration-300"
                    >
                      <LinkedinIcon className="w-4 h-4" />
                    </a>
                    <a
                      href="#"
                      className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-cyan-600 hover:bg-cyan-50 transition-colors duration-300"
                    >
                      <TwitterIcon className="w-4 h-4" />
                    </a>
                    <a
                      href="#"
                      className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-cyan-600 hover:bg-cyan-50 transition-colors duration-300"
                    >
                      <MailIcon className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1 text-gray-900">{member.name}</h3>
                <p className="text-cyan-600 font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
