async function verifyFileType(mimeType: string) {
  const acceptedTypes: string[] = ['audio/x-m4a']
  if (acceptedTypes.indexOf(mimeType) === -1) {
    console.log('File not of correct type');
    return false;
  }
  else return true;
}

async function verifyFileSize(size: number) {
  if (size > 40000) {
    console.log('File size too large');
    return false;
  }
  else return true;
}

module.exports = {
  verifyFileType: verifyFileType,
  verifyFileSize: verifyFileSize
};