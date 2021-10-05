import config from '../config'

const {pgDatabaseSchema} = config

export const loginQuery = `select * from ${pgDatabaseSchema}.juries where jury_email_id = $1`;
export const pendingStatusCountQuery = `select COUNT(*) from ${pgDatabaseSchema}.students where evaluation_id is null`;
export const approvedStatusCountQuery = `select COUNT(*) from ${pgDatabaseSchema}.evaluations where evaluation_status = $1`;
export const declinedStatusCountQuery = `select COUNT(*) from ${pgDatabaseSchema}.evaluations where evaluation_status = $1`;