REVOKE CONNECT ON DATABASE dina_db FROM PUBLIC;
REVOKE CREATE ON SCHEMA public FROM PUBLIC;

CREATE SCHEMA seqdb;
CREATE SCHEMA keycloak;

-- depends on the "seqdb" schema
CREATE ROLE seqdb_migration NOSUPERUSER NOCREATEDB NOCREATEROLE INHERIT LOGIN PASSWORD 'changeme2';
GRANT CONNECT ON DATABASE dina_db TO seqdb_migration;
GRANT USAGE, CREATE ON SCHEMA seqdb TO seqdb_migration;
ALTER DEFAULT PRIVILEGES IN SCHEMA seqdb GRANT ALL PRIVILEGES ON TABLES TO seqdb_migration;

CREATE ROLE seqdb_webapp NOSUPERUSER NOCREATEDB NOCREATEROLE INHERIT LOGIN PASSWORD 'changeme';
GRANT CONNECT ON DATABASE dina_db TO seqdb_webapp;
GRANT USAGE ON SCHEMA seqdb TO seqdb_webapp;
GRANT SELECT, INSERT, UPDATE, DELETE, REFERENCES ON ALL TABLES IN SCHEMA seqdb TO seqdb_webapp;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA seqdb TO seqdb_webapp;
ALTER DEFAULT PRIVILEGES FOR USER seqdb_migration IN SCHEMA seqdb GRANT SELECT, INSERT, UPDATE, DELETE, REFERENCES ON TABLES TO seqdb_webapp;
ALTER DEFAULT PRIVILEGES FOR USER seqdb_migration IN SCHEMA seqdb GRANT SELECT, USAGE ON SEQUENCES TO seqdb_webapp;
--FOR USER seqdb_migration is not a typo here, it means something like "when user seqdb_migration do something (create), grant the following permissions.

-- User for backups 'seqdb_backup'
CREATE ROLE seqdb_backup NOSUPERUSER NOCREATEDB NOCREATEROLE INHERIT LOGIN PASSWORD 'changeme3';
GRANT CONNECT ON DATABASE dina_db TO seqdb_backup;
GRANT USAGE ON SCHEMA seqdb TO seqdb_backup;
GRANT SELECT ON ALL TABLES IN SCHEMA seqdb TO seqdb_backup;
GRANT SELECT ON ALL SEQUENCES IN SCHEMA seqdb TO seqdb_backup;
ALTER DEFAULT PRIVILEGES FOR USER seqdb_migration IN SCHEMA seqdb GRANT SELECT ON TABLES TO seqdb_backup;
ALTER DEFAULT PRIVILEGES FOR USER seqdb_migration IN SCHEMA seqdb GRANT SELECT ON SEQUENCES TO seqdb_backup;
