'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db,callback) {
  db.createTable('volunteers',{
    id:          { type: 'int', primaryKey: true, autoIncrement: true },
    name:        { type: 'text' },
    email:       { type: 'text' },
    created_at:  { type: 'timestamp' },
    updated_at:  { type: 'timestamp' },
  },() => {
    db.runSql('CREATE TRIGGER timestamp_volunteers BEFORE INSERT OR UPDATE ON volunteers FOR EACH ROW EXECUTE PROCEDURE timestamp_on_change();',callback);
  })
};

exports.down = function(db,callback) {
  db.runSql('DROP TRIGGER IF EXISTS timestamp_volunteers on volunteers;',() => {
    db.dropTable('volunteers');
  });
};
