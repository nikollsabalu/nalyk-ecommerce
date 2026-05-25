import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaPinterest, FaTiktok } from "react-icons/fa";

export const Footer = () => {

  const currentYear = new Date().getFullYear();

  const iconMap = {
    Instagram: FaInstagram,
    Pinterest: FaPinterest,
    Tiktok: FaTiktok,

  };

  const network = [

    {
      name: "Instagram",
      url: ""
    },
    {
      name: "Tiktok",
      url: ""
    },
    {
      name: "Pinterest",
      url: ""
    },
  ]


  return (

    <footer className="border-t border-white/10 mt-auto py-14  text-sm text-black bg-[#F5F5F5]">
      <div className="grid md:grid-cols-3 max-sm:flex max-sm:flex-col max-sm:flex-col-reverse max-sm:items-center gap-10 items-center px-40 divide-x divide-white/10 max-sm:px-5 max-sm:divide-x-0">


        <div className="flex gap-2">
          <div className="pr-8 flex flex-col gap-2 items-start ">
            <h4 className="mb-4 uppercase font-semibold">SOBRE NALYK</h4>
            <p className=" ">Quienes somos</p>
            <p className=" ">Proceso de diseño</p>
          </div>
          <div className="pr-8 flex flex-col gap-2 items-start ">
            <h4 className="mb-4 uppercase font-semibold">INFORMACIÓN</h4>
            <Link href="/envios" className=" ">Envíos y Devoluciones</Link>
            <p className=" ">Política de Privacidad</p>
          </div>
          <div className="pr-8 flex flex-col gap-2 items-start ">
            <h4 className="mb-4 uppercase font-semibold">INTERESES</h4>
            <Link href="/cuidados-joyas" className=" ">Cuidados de las joyas</Link>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center px-8">
          <Link href={"/"}>
            <Image
              src="/logo.svg"
              alt="Logo"
              width={100} // Aumenta el ancho/alto para que sea visible
              height={100}
              className="h-5 w-auto"
            />
          </Link>
          <div suppressHydrationWarning className="  pt-5 text-center text-xs " style={{ fontFamily: 'var(--font-italiana)' }}>
            {currentYear} &copy; Todos los derechos reservados
          </div>
        </div>

        <div className="md:text-right text-xs  pl-8 max-sm:hidden flex flex-col items-end ">
          <p className="">Siguenos en:</p>
          <div className="flex gap-2 justify-center">
            {network.map((net, i) => {
              const Icon = iconMap[net.name];
              if (!Icon) return null;
              return (
                <a key={i} href={net.url} target="_blank" rel="noopener noreferrer">

                  <div key={i} className="w-6 h-6 flex items-center justify-center transition-all duration-500 ease-out cursor-pointer">
                    <Icon size={20} />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>

  )
}
