const Sequelize = require('sequelize')
const db = require('../db')

//ACTIVITIES

const Activity = db.define('activity', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'activity must not be empty'
            }
        }
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'must have a description for the activity'
          }
        }
      },
    longitude: {
        type: Sequelize.DECIMAL
    },
    latitude: {
        type: Sequelize.DECIMAL
    }

})

module.exports = Activity