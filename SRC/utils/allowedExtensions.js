export const allowedExtensions = {
    image: ['jpg', 'jpeg', 'png', 'gif'],
    video: ['mp4', 'avi', 'mkv'],
    audio: ['mp3', 'wav'],
    document: ['pdf'],
    code: ['js', 'jsx', 'ts', 'tsx', 'html', 'css', 'scss', 'json', 'xml'],
    compressed: ['zip', 'rar', '7z']
}

//i only need document pdf but i like to put it for feuture uses
//you can remove all of them except document and won't any thing happen 
//we can also remove this file and give extention to multer directly but that is more professional