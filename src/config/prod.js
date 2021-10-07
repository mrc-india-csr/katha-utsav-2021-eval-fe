module.exports = {
  pgDatabaseHost: process.env.PG_DATABASE_HOST,
  pgDatabasePort: process.env.PG_DATABASE_PORT,
  pgDatabaseName: process.env.PG_DATABASE_NAME,
  pgDatabaseUserName: process.env.PG_DATABASE_USERNAME,
  pgDatabasePassword: process.env.PG_DATABASE_PASSWORD,
  pgDatabaseSchema: process.env.PG_DATABASE_SCHEMA,
  s3BucketName: process.env.S3_BUCKET_NAME,
  s3BucketRegion: process.env.S3_BUCKET_REGION,
  s3Folder: process.env.S3_FOLDER,
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  jwtValidity: process.env.JWT_VALIDITY,
}