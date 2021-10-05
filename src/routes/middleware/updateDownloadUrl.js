export const UpdateDownloadUrl = (req, res, next) => {
  try {
    res.locals.studentDetails = res.locals.studentDetails.map(data => {
      const filename = data.file_location_url.substring(data.file_location_url.split('/', 6).join('/').length);
      return {
        ...data,
        file_location_url: '/api/download_story'+ filename
      }
    });
    next();
  } catch (e) {
    console.log(e);
    res.status(500).send('Something went wrong');
  }
}