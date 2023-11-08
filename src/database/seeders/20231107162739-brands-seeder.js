const uuid = require('uuid');

module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.bulkInsert('brands', [
            {
                id : uuid.v4(),
                name :"LG",	
                slug :"lg",	
                image :"brands-5e0f2766-bfce-4c41-b159-f9120cf2feab-1697485695919.jpeg"
            },
            { 
                id : uuid.v4(),
                name :"Google",	
                slug :"google",	
                image :"brands-e8bc2ae9-810d-459e-9820-44717474060f-1697485630204.jpeg"
            },
            { 
                id : uuid.v4(),
                name :"Toshiba",	
                slug :"toshiba",	
                image :"brands-5a4a324b-3286-48f8-9bf9-96b3be8220f7-1697485583872.jpeg"
            },
            { 
                id : uuid.v4(),
                name :"Apple",	
                slug :"apple",	
                image :"brands-ce987a18-2a30-4f1b-983d-0945b76062b6-1697485392001.jpeg"
            },
            { 
                id : uuid.v4(),
                name :"Asus",	
                slug :"asus",	
                image :"brands-5d45ecde-0c50-46d4-b959-5f52539519b1-1697485543870.jpeg"
            },
            { 
                id : uuid.v4(),
                name :"Nokia",	
                slug :"nokia",	
                image :"brands-691fdb1d-55f1-4a71-bf4d-d6871ea45b10-1697485715558.jpeg"
            },
            { 
                id : uuid.v4(),
                name :"Lenovo",	
                slug :"lenovo",	
                image :"brands-de06ac76-7a0a-4f68-be40-dc6aa8fecd01-1697485521784.jpeg"
            },
            { 
                id : uuid.v4(),
                name :"Dell",	
                slug :"dell",	
                image :"brands-383a1ee6-e7c2-4180-bd75-a48a1afc7f02-1697485460150.jpeg"
            },
            { 
                id : uuid.v4(),
                name :"Sony",	
                slug :"sony",	
                image :"brands-22e179b8-97f6-4af3-b3ea-a0ddd7902104-1697485666686.jpeg"
            },
            { 
                id : uuid.v4(),
                name :"Huawei",	
                slug :"huawei",	
                image :"brands-b4b93edd-6dcb-4af6-b0bf-6a2d32ed4e1a-1697485645065.jpeg"
            },
            { 
                id : uuid.v4(),
                name :"Acer",	
                slug :"acer",	
                image :"brands-acc742bf-ee6c-4db6-9e07-2061d80f8825-1697485564141.jpeg"
            },
            { 
                id : uuid.v4(),
                name :"Samsung",	
                slug :"samsung",	
                image :"brands-9a1468a4-b42c-4345-8395-10bbbdd67440-1697485613616.jpeg"
            },
            { 
                id : uuid.v4(),
                name :"HP",	
                slug :"hp",	
                image :"brands-d351f9f7-5f3c-48a6-b25d-e40d8799aff7-1697485497498.jpeg"
            },
	    ],{});
	},

	async down (queryInterface, Sequelize) {
	    await queryInterface.bulkDelete('brands', null, {});
	}
};
