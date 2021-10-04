import config from '../config'

const {pgDatabaseSchema} = config

export const loginQuery = `select * from ${pgDatabaseSchema}.juries where jury_email_id = $1`;