import {
  Rocket,
  Target,
  Lightbulb,
  TrendingUp,
  Award,
  Users,
} from "lucide-react";
import Image from "next/image";

export default function JourneySection() {
  const visionItems = [
    {
      year: "Phase 1",
      title: "Launch & Foundation",
      description:
        "Establishing MediMart as a trusted online pharmacy with a focus on customer experience and quality service.",
      image:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop",
      icon: <Rocket className="w-5 h-5 text-white" />,
    },
    {
      year: "Phase 2",
      title: "Digital Innovation",
      description:
        "Developing our mobile app and implementing AI-powered medication management tools to enhance customer experience.",
      image:
        "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=2070&auto=format&fit=crop",
      icon: <Lightbulb className="w-5 h-5 text-white" />,
    },
    {
      year: "Phase 3",
      title: "Market Expansion",
      description:
        "Expanding our services to major cities nationwide, bringing quality healthcare to more communities.",
      image:
        "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=2070&auto=format&fit=crop",
      icon: <TrendingUp className="w-5 h-5 text-white" />,
    },
    {
      year: "Phase 4",
      title: "Healthcare Ecosystem",
      description:
        "Creating an integrated healthcare ecosystem with telemedicine services and personalized health monitoring.",
      image:
        "https://images.unsplash.com/photo-1584982751601-97dcc096659c?q=80&w=2072&auto=format&fit=crop",
      icon: <Users className="w-5 h-5 text-white" />,
    },
    {
      year: "Phase 5",
      title: "Global Presence",
      description:
        "Expanding internationally to bring our innovative healthcare solutions to global markets.",
      image:
        "https://images.unsplash.com/photo-1573883431205-98b5f10aaedb?q=80&w=2070&auto=format&fit=crop",
      icon: <Target className="w-5 h-5 text-white" />,
    },
    {
      year: "Vision",
      title: "Healthcare Reimagined",
      description:
        "Becoming the world's most trusted healthcare partner, making quality healthcare accessible to everyone, everywhere.",
      image:
        "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?q=80&w=2070&auto=format&fit=crop",
      icon: <Award className="w-5 h-5 text-white" />,
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute left-0 top-0 w-full h-full overflow-hidden opacity-5 pointer-events-none">
        <div className="absolute -left-24 -top-24 w-96 h-96 rounded-full border-[30px] border-cyan-500"></div>
        <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full border-[30px] border-cyan-500"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-600 mb-8 shadow-lg">
            <Rocket className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Our Vision & Roadmap
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The journey we are embarking on to revolutionize healthcare
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-cyan-300 to-cyan-600 hidden md:block"></div>

          <div className="space-y-24">
            {visionItems.map((item, index) => (
              <div key={index} className="relative">
                <div
                  className={`md:flex items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-600 border-4 border-white z-10 hidden md:flex items-center justify-center shadow-lg">
                    {item.icon}
                  </div>

                  <div
                    className={`md:w-1/2 ${
                      index % 2 === 0
                        ? "md:text-right md:pr-16"
                        : "md:text-left md:pl-16"
                    } mb-6 md:mb-0`}
                  >
                    <span className="inline-block bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-bold px-6 py-3 rounded-full mb-4 shadow-md">
                      {item.year}
                    </span>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">
                      {item.title}
                    </h3>
                    <p
                      className={`text-gray-600 max-w-md leading-relaxed  ${
                        index % 2 === 0 ? "md:ml-auto" : "md:mr-auto"
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>

                  <div
                    className={`md:w-1/2 ${
                      index % 2 === 0 ? "md:pl-16" : "md:pr-16"
                    }`}
                  >
                    <div className="rounded-2xl overflow-hidden shadow-xl h-64 relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 group-hover:opacity-0 transition-opacity duration-300"></div>
                      <Image
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
