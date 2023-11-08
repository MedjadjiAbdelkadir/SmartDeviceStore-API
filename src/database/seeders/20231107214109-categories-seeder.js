
module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.bulkInsert('categories', [
            {
                id   : '6daeaae4-1e00-4108-bc23-96a106d4c1a8', 
                name : 'Phones and Accessories',
                slug : 'phones-and-accessories'
            },
            {
                id   : '9d98ad73-fc01-4ade-ba79-4093708be05c', 
                name : 'Tablets and Accessories',
                slug : 'tablets-and-accessories'
            },
            {
                id   : 'ef7c4c67-e11c-42cc-90a2-a842170cf448', 
                name : 'Computers and Accessories',
                slug : 'computers-and-accessories'
            }
        ],{});
	},

	async down (queryInterface, Sequelize) {
	    await queryInterface.bulkDelete('categories', null, {});
	}
};