
module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('resumes', {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          allowNull: false
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        job_title: {
          type: Sequelize.STRING
        },
        ob_description: {
          type: Sequelize.TEXT
        },
        job_company: {
          type: Sequelize.STRING
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false
        }
      });
    },
    
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('resumes');
    }
  };

  // Run migrations using CLI commands:
  // npx sequelize-cli db:migrate
  // npx sequelize-cli db:migrate:undo to rollback the last migration
  