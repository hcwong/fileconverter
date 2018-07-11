window.onload = () => {
  document.querySelector('#mp4-upload').addEventListener('change', () => {
    onUpload();
  });
  onSubmitForm();
};

function validateFileType(filename) {
  const allowedExtensions = ['mp4a', 'mp4', 'm4a'];
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
      or m4a file`;
      return;
    }
  } else {
    document.querySelector('.warning-message').innerHTML = `Please ensure that you have submitted a file`;
    return;
  }
  if (!validateFileSize(file)) {
    document.querySelector('.warning-message').innerHTML = `Please ensure that the file is less than 40kb`;
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
  if (file.files[0].size > 40000) {
    return false;
  } 
  return true;
}

function onSubmitForm() {
  $('.upload-form').submit((e) => {
    e.preventDefault();
    let form = $('.upload-form')[0];
    let formData = new FormData(form);
    let originalFileName = $('#mp4-upload')[0].files[0].name.split('.')[0];
    $('.download-file').html = "";

    // TODO: change the url website to the droplet address
    fetch('/upload', {
      method: 'POST',
      body: formData,
    })
      .then((res) => {
        console.log('PLACEHOLDER', res);
        return res.blob();
      })
      .then((result) => {
        let returnedFile = result;
        createDownloadButton(returnedFile, originalFileName);
      })  
      .catch((err) => {
        console.log(err);
        alert("501 Internal Server Error while converting your file");
      });
  });
}

function createDownloadButton(returnedFile, originalFileName) {
  let button = document.createElement('button');
  let anchorTag = document.createElement('a');
  anchorTag.href = window.URL.createObjectURL(returnedFile);
  anchorTag.download = `${originalFileName}.flac`;
  anchorTag.innerHTML = "Click here to download!";
  button.appendChild(anchorTag);
  $('.download-file').append(button);
}