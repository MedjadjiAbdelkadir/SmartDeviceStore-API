
module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.bulkInsert('subcategories', [
            {
                id   : '6c883a95-8cee-4a60-acb9-ebc2bd1d24c1',
                name : 'Computers Laptop',
                slug : 'computers-laptop',
                category_id : 'ef7c4c67-e11c-42cc-90a2-a842170cf448',
                image : 'subcategories-a2b96b3d-7ba2-44ac-98ad-6deb51e1a6a3-1697483074276-cover.jpeg',
            },
            {
                id   : 'ae2257c9-bcdf-4947-a849-29a19a12ff32',
                name : 'Mobile Phones',
                slug : 'mobile-phones',
                category_id : '6daeaae4-1e00-4108-bc23-96a106d4c1a8',
                image : 'subcategories-238d0dd0-c7d0-46ed-8ff0-5bea3e33c259-1697483643123-cover.jpeg',
            },
            {
                id   : 'cf0693ed-118c-4557-9be1-06fe6be7a464',
                name : 'Computers Desktop',
                slug : 'computers-desktop',
                category_id : 'ef7c4c67-e11c-42cc-90a2-a842170cf448',
                image : 'subcategories-f716c771-c46f-4780-bc8b-9f09e965c9be-1697483202566-cover.jpeg',
            },
            {
                id   : 'e59aee84-3a80-4200-99cf-c8efac4c7047',
                name : 'Tablets',
                slug : 'tablets',
                category_id : '9d98ad73-fc01-4ade-ba79-4093708be05c',
                image : 'subcategories-4d0a88e5-436f-494c-a127-8f8f320c3c5d-1697483459797-cover.jpeg',
            }
    ],{});
	},

	async down (queryInterface, Sequelize) {
	    await queryInterface.bulkDelete('subcategories', null, {});
	}
};