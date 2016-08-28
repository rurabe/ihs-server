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
  db.createTable('reports',{
    id:          { type: 'int', primaryKey: true, autoIncrement: true },
    latitude:    { type: 'Decimal(8,6)' },
    longitude:   { type: 'Decimal(9,6)' },
    photo:       { type: 'text' },
    description: { type: 'text' },
    name:        { type: 'text' },
    phone:       { type: 'text' },
    notes:       { type: 'text' },
    created_at:  { type: 'timestamp' },
    updated_at:  { type: 'timestamp' },
  }, () => {
    db.runSql(`
      CREATE OR REPLACE FUNCTION timestamp_on_change() RETURNS trigger AS $$
        BEGIN
          new.created_at = COALESCE(new.created_at,now()); 
          new.updated_at = now();
          return new;
        END
      $$ LANGUAGE plpgsql;
    `,() => {
      db.runSql('CREATE TRIGGER timestamp_reports BEFORE INSERT OR UPDATE ON reports FOR EACH ROW EXECUTE PROCEDURE timestamp_on_change();',callback);
    });
  });
};

exports.down = function(db,callback) {
  db.runSql('DROP TRIGGER IF EXISTS timestamp_reports on reports;',() => {
    db.runSql('DROP FUNCTION IF EXISTS timestamp_on_change();',() => {
      db.dropTable('reports');
    });
  });
};
