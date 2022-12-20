import { ARRAY, BOOLEAN, STRING, UUID, UUIDV4 } from "sequelize"
const db = require('../../databases/db')

export const Vaccine = db.sequelize.define('Vaccine', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  vaccine_image: {
    type: STRING,
    allowNull: true
  },
  vaccine_name: {
    type: STRING,
    allowNull: false,
    unique: true,

  },
  vaccine_dose: {
    allowNull: false,
    type: STRING,
  },
  vaccine_desc: {
    type: STRING,
    allowNull: false
  },
  vaccine_available: {
    type: STRING,
    allowNull: false
  },
  isMandatory: {
    type: BOOLEAN,
    defaultValue: false
  },
  isDeleted: {
    type: BOOLEAN,
    defaultValue: false
  }

}, {
  tableName: 'vaccine',
  timeStamp: true
})

Vaccine.sync({ alter: true })

