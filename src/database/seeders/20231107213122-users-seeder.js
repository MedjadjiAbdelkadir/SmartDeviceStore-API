const uuid = require('uuid');

module.exports = {
	async up (queryInterface, Sequelize) { 
		await queryInterface.bulkInsert('users', [
            {
                id : uuid.v4(),
                first_name: 'Admin',
                last_name: 'Admin',
                email: 'admin1@gmail.com',
                phone : '0775805470',
                role : 'admin',
                password: '$2b$10$ewiqbOrkWQ2L889PQs2lQ.D6hqMFLBWMfTbQpB.NXL0bWy0b8oswa',
                profile_picture : 'user-profile.png',
            },
            {
                id : uuid.v4(),
                first_name: 'User',
                last_name: 'User',
                email: 'user1@gmail.com',
                phone : '0775805471',
                role : 'user',
                password: '$2b$10$ewiqbOrkWQ2L889PQs2lQ.D6hqMFLBWMfTbQpB.NXL0bWy0b8oswa',
                profile_picture : 'user-profile.png',
            },
        ],{});
	},

	async down (queryInterface, Sequelize) {
	    await queryInterface.bulkDelete('users', null, {});
	}
};