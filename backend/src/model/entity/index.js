const { sequelize } = require('../../db')
const User = require('./user')
const Role = require('./role')
const Permission = require('./permission')

User.belongsToMany(Role, {
  through: 'user_role',
  foreignKey: 'userId'
})

Role.belongsToMany(User, {
  through: 'user_role',
  foreignKey: 'roleId'
})

Role.belongsToMany(Permission, {
  through: 'role_permission',
  foreignKey: 'roleId'
})

Permission.belongsToMany(Role, {
  through: 'role_permission',
  foreignKey: 'permId'
})

sequelize.sync().then(() => {
  // Step One: Create a user
  // User.create({
  // 	email: 'example@example.com'
  // }).then(function (user) {
  // 	// Step Two: Create Todo
  // 	return Todo.create({
  // 		description: 'Learn many-to-many associations'
  // 	}).then(function (todo) {
  // 		// Step Three: Add todo to user
  // 		return user.addTodos([todo])
  // 	});
  // }).then(function () {
  // 	console.log('Everything worked, check the database.');
  // }).catch(function () {
  // 	console.log('Something went wrong. Catch was executed.');
  // });
})

module.exports = {
  User,
  Role,
  Permission
}
