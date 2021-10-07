import config from "../../config";

export const UpdateDownloadUrl = (req, res, next) => {
  try {
    const { s3Folder, s3BucketRegion, s3BucketName } = config
    res.locals.responseObject.studentsList = res.locals.responseObject.studentsList.map(data => {
      const filename = data.file_location_url.substring((data.file_location_url.split('/', 6).join('/').length)+1);
      return {
        ...data,
        file_location_url: `https://${s3BucketName}.s3.${s3BucketRegion}.amazonaws.com/${s3Folder + filename}`
      }
    });
    next();
  } catch (e) {
    console.log(e);
    res.status(500).send('Something went wrong');
  }
}