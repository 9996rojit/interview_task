import { BOOLEAN, STRING, UUID, UUIDV4 } from "sequelize"
import { Vaccine } from "./domain"
const db = require('../../databases/db')

export const Vaccine_allergies = db.sequelize.define('Vaccine_allergies', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  vaccine_id: {
    type: UUID,
    references: {
      model: "vaccine",
      key: "id"
    },
    allowNull: false
  },
  vaccine_allergies: {
    type: STRING,
    allowNull: true
  }

}, {
  tableName: 'vaccine_allergies',
  timeStamp: true
})

Vaccine_allergies.sync({ alter: false })

Vaccine_allergies.belongsTo(Vaccine, { foreignKey: "vaccine_id" })
Vaccine.hasMany(Vaccine_allergies, { foreignKey: "vaccine_id" })