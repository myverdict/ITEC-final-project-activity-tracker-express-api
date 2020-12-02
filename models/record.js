// record.js describes the structure of the activity record object
// the way it would be stored in the database

module.exports = ( sequelize, DataTypes ) => {
    let ActivityRecord = sequelize.define('ActivityRecord', {
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        hours: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        medium: {
            type: DataTypes.STRING,
            allowNull: false
        },
        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false             // setting 'completed' default value to false
        },
        note: {
            type: DataTypes.STRING
        }
    })                                      // END of the activity record object

    // create a database: force: true means it will overwrite any old database tables
    // for e.g., if the structure of the database is changed, the database will be updated
    // force: true - recreate table and delete all data (initially needed)
    // force: false - don't recreate table and data is preserved
    ActivityRecord.sync( {force: false} ).then( () => {
        console.log('Synced activity record table')
    })

    return ActivityRecord;
}                                           // END of module.exports