function validateUpload(filename) {
  const allowedExtensions = ['mp4a', 'mp4'];
  fileType = filename.split('.').slice(-1)[0]
  // TODO: Validate file size also

  // validate the file type
  if (allowedExtensions.indexOf(fileType) === -1) {
    return false;
  } else return true;
}

function onUpload() {
  let filename = document.querySelector('#mp4-upload').value
  if (filename) {
    if (validateUpload(filename)) {
      document.querySelector('#mp4-upload-submit').disabled = false;
      return true;
    }
  }
  document.querySelector('.warning-message').innerHTML = `Please ensure that you have submitted a mp4 or mp4a 
  file THAT is below 10kb.`
  return false; // TODO: probably should display some message also and disable the submit btn
}

// TODO: Create function to set cookie containing CSRF Token