import { BIGINT, STRING, UUID, UUIDV4 } from "sequelize"
const db = require('../../databases/db')


export const UserToken = db.sequelize.define('UserToken', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  userId: {
    type: UUID,
    allowNull: true,
    unique: true,
    references: {
      model: "users",
      key: "id"
    }
  },
  refreshToken: {
    allowNull: true,
    type: STRING,
  },

}, {
  tableName: 'users_token'
})


UserToken.sync({ alter: true })


