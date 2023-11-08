
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.createTable('users', {
            id: {
                type: Sequelize.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue :Sequelize.UUIDV4,
            },
            first_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            last_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false,
            },
            phone : {
                type : Sequelize.STRING,
                allowNull :false,
                unique: true,
            },
            role : {
                type : Sequelize.ENUM,
                values : ['admin','manager','user'],
                allowNull :false,
                defaultValue : 'user'
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            password_changed_at:{
                type : Sequelize.DATE,
            },
            password_reset_code : {
                type : Sequelize.STRING,
            },
            password_reset_expires : {
                type : Sequelize.DATE,
            },
            password_reset_verified :{
                type : Sequelize.BOOLEAN,
            },
            profile_picture : {
                type : Sequelize.STRING,
                allowNull: false, 
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
        await queryInterface.dropTable('users');
    }
};
