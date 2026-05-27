import Link from "next/link";

const Hero = () => {

  return (
    <section
      className="relative h-screen bg-cover bg-center "
      style={{
        backgroundImage: `
        linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
        url('/hero.png')
      `,
        backgroundPosition: "center 35%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <div className="leading-none">
          <h1 className="text-xl md:text-4xl font-bold  text-white font-messiri">Inspirado en la elegancia contemporánea. </h1>
          <p className="mt-3 text-xs md:text-xl text-white font-messiri">
            Piezas con carácter, volumen y una sofisticación atemporal.
          </p>
        </div>

        <Link href="/collections/new-in" className="font-elms bg-white font-semibold rounded-full text-black flex items-center mt-14 border border-white/40 px-8 py-3 text-md hover:bg-white hover:text-black transition-colors">
          <span>  Nueva colección </span>
        </Link>
      </div>
    </section>

  );
};

export default Hero;
