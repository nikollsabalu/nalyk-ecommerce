export default function CareGuide() {
    return (
        <section className="px-6 py-16 lg:px-20 bg-white">
            <div className="max-w-[800px] mx-auto">
                {/* Título Principal */}

                <h1 className="font-italiana font-semibold text-xl uppercase r border-b border-[#252525] pb-4 mb-10">
                    Cuidado de las Joyas
                </h1>


                {/* Introducción */}
                <p className=" text-base  text-justify mb-16 ">
                    Todas las piezas de Nalyk están elaboradas con materiales de la mayor calidad
                    y bañadas en oro de 18 quilates. Un buen cuidado hará que su brillo y esencia
                    se mantengan a la perfección durante muchos años.
                </p>

                <div className="space-y-12">
                    {/* Bloque 1 */}
                    <div>
                        <h3 className="font-italiana text-xl font-semibold mb-4">¿Dónde guardo mis joyas?</h3>
                        <p className=" text-base text-justify ">
                            Lo ideal es mantenerlas en un lugar seco y seguro, separadas para evitar que se rayen.
                            Utiliza siempre los sacos de algodón natural que incluimos en tu pedido para guardarlas
                            de forma individual.
                        </p>
                    </div>

                    {/* Bloque 2 */}
                    <div>
                        <h3 className="font-italiana text-xl font-semibold mb-4">¿Qué debo evitar?</h3>
                        <p className=" text-base text-justify  mb-4">
                            Evita el contacto directo con agua salada, productos químicos, perfumes, desodorantes o
                            geles desinfectantes. El cloro y la sal pueden originar manchas permanentes.
                        </p>
                        <p className=" text-base text-justify ">
                            Evita también el impacto sobre superficies duras y la exposición prolongada al sol.
                        </p>
                    </div>

                    {/* Bloque 3 */}
                    <div>
                        <h3 className="font-italiana text-xl font-semibold mb-4">¿Cómo puedo cuidarlas?</h3>
                        <p className=" text-base text-justify ">
                            Limpia tus joyas después de cada uso con la gamuza especial que incluimos. Está diseñada
                            para absorber restos de cremas y aceites. En caso de contacto con agua salada,
                            enjuágalas suavemente con agua dulce y jabón neutro.
                        </p>
                    </div>

                    {/* Bloque 4 */}
                    <div>
                        <h3 className="font-italiana text-xl font-semibold mb-4">¿Puedo mojarlas?</h3>
                        <p className=" text-base text-justify  ">
                            Nuestras piezas son impermeables y resistentes. Sin embargo, para prolongar su brillo
                            durante más tiempo, recomendamos evitar el contacto frecuente con agua salada y perfumes.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}