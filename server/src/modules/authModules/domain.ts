import { ENUM, STRING, UUID, UUIDV4 } from "sequelize"
const db = require('../../databases/db')
const bcrypt = require('bcryptjs')

export const User = db.sequelize.define('User', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  email: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    allowNull: false,
    type: STRING,
  },


}, {
  tableName: 'users',
})

User.addHook('beforeCreate', async (user: any, options: any) => {
  const salt = await bcrypt.genSaltSync(12)
  user.password = bcrypt.hashSync(user.password, salt)
})


User.sync({ alter: false })

