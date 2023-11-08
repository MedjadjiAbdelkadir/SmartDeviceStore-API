
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.createTable('reviews', {
            id: {
                type: Sequelize.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue :Sequelize.UUIDV4,
            },
            value: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            product_id : {
                allowNull: false,
                type: Sequelize.UUID,
                references: {
                    model: 'products', 
                    key: 'id',       
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE', 
            },
            user_id : {
                allowNull: false,
                type: Sequelize.UUID,
                references: {
                    model: 'users', 
                    key: 'id',       
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE', 
            },
            content : {
                type : Sequelize.STRING,
            },
            ratings : {
                type : Sequelize.INTEGER,
                allowNull :false,
                values : [1,2,3,4,5],
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
        await queryInterface.dropTable('reviews');
    }
};
