window.onload(() => {
  document.querySelector('#mp4-upload').addEventListener('change', () => {
    onUpload();
  });
});

function validateFileType(filename) {
  const allowedExtensions = ['mp4a', 'mp4'];
  fileType = filename.split('.').slice(-1)[0];
  // validate the file type
  if (allowedExtensions.indexOf(fileType) === -1) {
    return false;
  }
  return true;
}

function onUpload() {
  let file = document.querySelector('#mp4-upload');
  if (file.value) {
    if (!validateFileType(file.value)) {
      document.querySelector('.warning-message').innerHTML = `Please ensure that you have submitted a mp4 or mp4a 
      file`;
      return;
    }
  } else {
    document.querySelector('.warning-message').innerHTML = `Please ensure that you have submitted a file`;
  }
  if (!validateFileSize(file)) {
    document.querySelector('.warning-message').innerHTML = `Please ensure that the file is less than 10kb`;
    return;
  }
  document.querySelector('#mp4-upload-submit').disabled = false;
  return; 
}

function validateFileSize(file) {
  if (!window.FileReader) {
    alert("File API is not supported on your browser. Use a better one");
    return false;
  }
  if (file.files[0].size > 10000) {
    return false;
  } 
  return true;
}