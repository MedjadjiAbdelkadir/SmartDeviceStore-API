
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.createTable('products_attributes', {
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
            attribute_id : {
                allowNull: false,
                type: Sequelize.UUID,
                references: {
                    model: 'attributes', 
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
        await queryInterface.dropTable('products_attributes');
    }
};
