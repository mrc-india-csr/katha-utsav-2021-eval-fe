import config from '../config'

const {pgDatabaseSchema} = config

export const loginQuery = `select * from ${pgDatabaseSchema}.jury_emails where email = $1`;