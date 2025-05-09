import { HeartIcon, ShieldCheckIcon, TruckIcon } from "lucide-react";

export default function MissionSection() {
  return (
    <section id="mission" className="relative bg-white py-24 overflow-hidden">

      <div className="absolute right-0 top-0 h-96 w-96 -translate-y-1/2 translate-x-1/2 rounded-full bg-cyan-50" />
      <div className="absolute bottom-0 left-0 h-96 w-96 translate-y-1/2 -translate-x-1/2 rounded-full bg-cyan-50" />

      <div className="container relative z-10 mx-auto">
        
        <header className="mb-10 text-center">
          <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-cyan-600 shadow-lg">
            <HeartIcon className="h-10 w-10 text-white" />
          </div>

          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Our Mission
          </h2>

          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600">
            At Pharma Nest, our mission is to revolutionize healthcare delivery by
            providing easy access to quality medications and healthcare
            products. We believe that everyone deserves convenient, reliable,
            and affordable healthcare solutions.
          </p>
        </header>

        <div className="grid gap-5 lg:gap-10 md:grid-cols-3">
          <div className="group border border-gray-100 rounded-2xl">
            <div className="relative overflow-hidden h-full rounded-2xl border border-gray-100 bg-white p-5 lg:p-10 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
              <div className="absolute right-0 top-0 h-32 w-32 -translate-y-1/2 translate-x-1/2 rounded-full bg-cyan-50 transition-colors duration-500 group-hover:bg-cyan-100" />

              <div className="relative">
                <div className="mb-8 md:mx-auto lg:mx-0 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-cyan-600 shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                  <ShieldCheckIcon className="h-8 w-8 text-white" />
                </div>

                <h3 className="mb-4 text-2xl font-bold text-gray-900">
                  Accessibility
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Making healthcare accessible to everyone, everywhere through
                  our online platform and fast delivery service. We are breaking
                  down barriers to quality healthcare.
                </p>
              </div>
            </div>
          </div>

          <div className="group border border-gray-100 rounded-2xl">
            <div className="relative overflow-hidden h-full rounded-2xl border border-gray-100 bg-white p-5 lg:p-10 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
              <div className="absolute right-0 top-0 h-32 w-32 -translate-y-1/2 translate-x-1/2 rounded-full bg-cyan-50 transition-colors duration-500 group-hover:bg-cyan-100" />

              <div className="relative">
                <div className="mb-8 md:mx-auto lg:mx-0 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-cyan-600 shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                  <HeartIcon className="h-8 w-8 text-white" />
                </div>

                <h3 className="mb-4 text-2xl font-bold text-gray-900">
                  Quality
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Ensuring all products meet the highest quality standards
                  through rigorous verification and partnerships with trusted
                  manufacturers. Your health deserves nothing less.
                </p>
              </div>
            </div>
          </div>

          <div className="group border border-gray-100 rounded-2xl">
            <div className="relative overflow-hidden h-full rounded-2xl border border-gray-100 bg-white p-5 lg:p-10 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
              <div className="absolute right-0 top-0 h-32 w-32 -translate-y-1/2 translate-x-1/2 rounded-full bg-cyan-50 transition-colors duration-500 group-hover:bg-cyan-100" />

              <div className="relative">
                <div className="mb-8 md:mx-auto lg:mx-0 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-cyan-600 shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                  <TruckIcon className="h-8 w-8 text-white" />
                </div>

                <h3 className="mb-4 text-2xl font-bold text-gray-900">
                  Convenience
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Simplifying healthcare with doorstep delivery, easy ordering,
                  and personalized medication management. Healthcare should fit
                  into your life, not the other way around.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
