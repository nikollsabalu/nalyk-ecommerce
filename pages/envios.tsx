export default function EnviosPage() {
  return (
    <section className="px-6 py-14 lg:px-16 bg-white text-[#252525]">
      <div className="mx-auto max-w-[800px]">
        <h1 className="font-italiana font-semibold text-xl uppercase r border-b border-[#252525] pb-4 mb-10">
          Envíos y devoluciones
        </h1>

        <p className=" text-base leading-relaxed mb-8 text-justify">
          Todos los pedidos realizados a través de la web de Nalyk se envían el siguiente día laboral 
          y son distribuidos mediante compañías de envíos tercerizadas, tanto para Lima como para provincias.
        </p>

        <div className="space-y-8 ">
          <div>
            <h3 className="font-bold uppercase  text-sm mb-2">Tarifas de envío</h3>
            <p className="text-zinc-600 text-justify ">La tarifa de envío se calcula según la ubicación de entrega, la distancia y la tarifa vigente de la empresa de envíos.</p>
          </div>

          <div>
            <h3 className="font-bold uppercase  text-sm mb-2">Plazo de entrega</h3>
            <ul className="text-zinc-600 list-none space-y-1">
              <li><span className="font-bold text-[#252525]">Lima Metropolitana y Callao:</span> El despacho a domicilio del pedido toma normalmente de 1 a 3 días hábiles.</li>
              <li><span className="font-bold text-[#252525]">Provincia:</span> El despacho a domicilio del pedido toma de 2 a 7 días hábiles.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold uppercase  text-sm mb-2">Variación en los plazos de entrega</h3>
            <p className="text-zinc-600 ">
              Se debe tener en cuenta que durante épocas de alta demanda como navidad, rebajas o días festivos nacionales 
              podríamos tardar entre uno o dos días en procesar su pedido. Por ello recomendamos que durante estas fechas realice su pedido con antelación.
            </p>
          </div>

          <div>
            <h3 className="font-bold uppercase  text-sm mb-2">Ausencia en el domicilio de entrega</h3>
            <p className="text-zinc-600 mb-2 text-justify">
              La empresa de envío realiza 2 intentos de entrega a domicilio. En caso de que el destinatario no se encuentre en casa en ninguno de esos intentos, el paquete es devuelto a las oficinas de Nalyk. 
              La empresa no se hará responsable de todos aquellos pedidos que sean devueltos por imposibilidad de entrega.
            </p>
            <p className="text-zinc-600 italic text-justify">
              En el caso de que esto suceda y que el cliente quiera que se le reenvíe el pedido, este deberá hacerse cargo de los nuevos gastos de envío.
            </p>
          </div>

          <div>
            <h3 className="font-bold uppercase  text-sm mb-2">Información de despacho</h3>
            <p className="text-zinc-600 text-justify">
              El cliente es responsable de la información brindada para el correcto registro y despacho de su pedido. 
              Nalyk no se hace responsable por los pedidos que no puedan ser despachados de manera efectiva, generando demoras por errores en la información registrada.
            </p>
          </div>
        </div>

        {/* Caja de aviso importante */}
        <div className="mt-12 bg-zinc-50 border border-zinc-200 p-6 rounded-lg text-justify">
          <p className=" text-sm text-[#252525]">
            <strong>Importante:</strong> Al momento de registrar tus datos es MUY IMPORTANTE que dejes un NÚMERO DE TELÉFONO al que podamos contactarte en caso exista algún inconveniente con la entrega de tu pedido.
          </p>
        </div>
      </div>
    </section>
  );
} 