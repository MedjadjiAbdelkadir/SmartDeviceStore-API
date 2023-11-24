
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.createTable('coupons', {
            id: {
                type: Sequelize.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue :Sequelize.UUIDV4,
            },
            type : {
                type : Sequelize.ENUM,
                values : ['store','first_time_shopper','free_shipping','category', 'subcategory', 'product', 'brand','seasonal', 'special_occasion'],
                allowNull :false,
                defaultValue : 'store'
            },
            target_id : {
                type: Sequelize.UUID,
                allowNull: true,    
            },
            code : {
                type : Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            discount: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            start_at: {
                type: Sequelize.DATE,
                allowNull: false,        
            },
            expires_at: {
                type: Sequelize.DATE,
                allowNull: false,        
            },
            display : {
                type: Sequelize.BOOLEAN,
                defaultValue : false,
            },
            created_by : {
                allowNull: false,
                type: Sequelize.UUID,
                references: {
                    model: 'users', 
                    key: 'id',       
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE', 
            },

            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            deleted_at: {
                type: Sequelize.DATE,
                allowNull: true,
            }
        });
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.dropTable('coupons');
    }
};
