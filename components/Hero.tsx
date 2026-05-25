const Hero = () => {

  return (
    <section
      className="relative h-screen bg-cover bg-center "
      style={{
        backgroundImage:
          "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0.25)), url('/hero.png')",
        backgroundPosition: "center 35%",
        // backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <div className="leading-none">
          <h1 className="text-xl md:text-4xl font-bold  text-white font-elms">Inspirado en la elegancia contemporánea. </h1>
          <p className="mt-3 text-xs md:text-xl text-white">
            Piezas con carácter, volumen y una sofisticación atemporal.
          </p>
        </div>

        <a href="#proyectos" className="bg-white font-semibold rounded-full text-black flex items-center mt-14 border border-white/40 px-8 py-3 text-md hover:bg-white hover:text-black transition-colors">
          <span>  Nueva colección </span>   
        </a>
      </div>
    </section>

  );
};

export default Hero;
