import cron from "node-cron";
import UsuarioTemporal from "../models/UsuarioTemporal.js";
import {Op} from "sequelize";

// Elimina registros expirados cada 60 minutos
cron.schedule("*/60 * * * *", async () => {
  try {
    console.log("Limpieza de registros temporales expirados");
    const now = new Date();

    // Eliminar registros cuya fecha de expiración haya pasado
    const registrosEliminados = await UsuarioTemporal.destroy({
      where: {
        expiracion: { [Op.lt]: now }, // Eliminar registros donde expiracion < now
      },
    });

    console.log(`Registros eliminados: ${registrosEliminados}`);
  } catch (error) {
    console.error("Error al eliminar registros temporales:", error);
  }
});

export default cron;