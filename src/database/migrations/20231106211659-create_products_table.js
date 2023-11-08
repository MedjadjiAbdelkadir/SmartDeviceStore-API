
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.createTable('products', {
            id: {
                type: Sequelize.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue :Sequelize.UUIDV4,
            },
            sub_category_id : {
                allowNull: false,
                type: Sequelize.UUID,
                references: {
                    model: 'subcategories', 
                    key: 'id',       
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE', 
            },
            brand_id : {
                type : Sequelize.UUID,
                allowNull :true,
                references: {
                    model: 'brands', 
                    key: 'id',       
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            slug: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            description : {
                type : Sequelize.TEXT,
                allowNull :false,
            },
            quantity : {
                type : Sequelize.INTEGER,
                allowNull :false,
                defaultValue : 1 ,
            },
            price : {
                type : Sequelize.INTEGER,
                allowNull :false,
            },
            price_after_discount : {
                type : Sequelize.INTEGER,
                allowNull :false,
            },
            average_rating : {
                type : Sequelize.DECIMAL,
                // defaultValue : 0;
            },

            image_cover : {
                type : Sequelize.STRING,
                allowNull: false, 
            },
            images : {
                // type : DataTypes.JSON,
                type: Sequelize.ARRAY(Sequelize.STRING),
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
        await queryInterface.dropTable('products');
    }
};
