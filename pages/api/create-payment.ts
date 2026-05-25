import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

export default async function handler(req, res) {
  try {
    const preference = new Preference(client);

    const response = await preference.create({
      body: {
        items: [
          {
            id: "joya-001", // 👈 ESTE ES EL ID
            title: "Joyas Nalyk",
            quantity: 1,
            unit_price: 100,
            currency_id: "PEN",
          },
        ],

        back_urls: {
          success: "https://tu-web.com/success",
          failure: "https://tu-web.com/failure",
          pending: "https://tu-web.com/pending",
        },

        auto_return: "approved",
      },
    });

    res.status(200).json({
      url: response.init_point,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error creando preferencia" });
  }
}