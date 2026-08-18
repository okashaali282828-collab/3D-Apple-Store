import Navbar from '@/components/Navbar';
import EarbudsCanvas from '@/components/EarbudsCanvas';

export default function Home() {
  return (
    <main className="scroll-container bg-black text-white min-h-screen relative selection:bg-white selection:text-black">
      {/* Navbar */}
      <Navbar />

      {/* Fixed 3D Canvas Background */}
      <EarbudsCanvas />

      {/* Scroll Sections */}
      <div className="relative z-20">
        
        {/* HERO SECTION (Page 1) */}
        <section className="h-screen relative overflow-hidden flex items-center px-10 md:px-24">
          <div className="max-w-xl">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#86868b] uppercase block mb-3">
              EARPODS PRO
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-4 leading-tight">
              Silence, elevated.
            </h1>
            <p className="text-[#86868b] text-lg md:text-xl font-normal leading-relaxed mb-8 max-w-md">
              Adaptive Audio. Immersive sound. Made to disappear — until it matters.
            </p>
            <div className="flex items-center gap-4">
              <button className="bg-white text-black font-medium text-sm rounded-full px-6 py-2.5 hover:bg-gray-200 transition-all cursor-pointer">
                Buy Now
              </button>
              <button className="border border-[#424245] text-white text-sm font-medium rounded-full px-6 py-2.5 hover:bg-[#1d1d1f] transition-all cursor-pointer">
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* ACOUSTICS SECTION (Page 2 - Front Facing 3D Model View) */}
        <section className="h-screen relative overflow-hidden flex items-center justify-end px-10 md:px-24 text-right">
          <div className="max-w-xl">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#86868b] uppercase block mb-3">
              ACOUSTICS
            </span>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
              Personalized Spatial Sound.
            </h2>
            <p className="text-[#86868b] text-lg font-normal leading-relaxed">
              Dynamic head tracking places sound all around you to create a three-dimensional listening experience.
            </p>
          </div>
        </section>

        {/* NOISE CONTROL SECTION (Page 3 - Soundwave Image Background) */}
        <section className="relative h-screen w-full flex items-end justify-end px-10 md:px-24 pb-16 text-right overflow-hidden bg-black">
          <div className="absolute inset-0 z-0 flex items-center justify-center">
            <img
              src="/anc-bg.webp"
              alt="Up to 2x more ANC"
              className="w-full h-full object-contain scale-90 md:scale-95 brightness-110 contrast-125 saturate-125 transition-all duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10" />
          </div>

          <div className="max-w-md relative z-20 space-y-2">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#86868b] uppercase block">
              NOISE CONTROL
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
              Up to 2x more ANC.
            </h2>
            <p className="text-[#86868b] text-sm md:text-base font-normal leading-relaxed">
              A custom-built driver and amplifier work to minimize distortion during playback.
            </p>
          </div>
        </section>

        {/* COMPONENTS SECTION (Page 4 - Exploded View Background Image) */}
        <section
          id="components"
          className="relative h-screen w-full flex items-end justify-start px-10 md:px-24 pb-16 text-left overflow-hidden bg-black"
        >
          <div className="absolute inset-0 z-0 flex items-center justify-center">
            <img
              src="/components-bg.jpg"
              alt="Earbuds Exploded View"
              className="w-full h-full object-contain scale-90 md:scale-95 brightness-110 contrast-125 saturate-125 transition-all duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
          </div>

          <div className="max-w-md relative z-20 space-y-2">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#86868b] uppercase block">
              PRECISION ENGINEERING
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
              Anatomy of Pure Sound.
            </h2>
            <p className="text-[#86868b] text-sm md:text-base font-normal leading-relaxed">
              Over 40 micro-components floating in perfect balance — engineered for low-distortion clarity and active pressure equalization.
            </p>
          </div>
        </section>

      </div>
    </main>
  );
}