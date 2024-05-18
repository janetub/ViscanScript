  /**
   * TODO: implement resume
   * 
   * storageService.js
   */
  
  import { ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
  import { storage } from "./firebaseConfig";

  export function startUpload(file, filePath) {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage,  `${filePath}${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress.toFixed(2) + '% done');
          // TODO: Update UI with progress
        }, 
        (error) => {
          console.error('Error during upload', error);
          reject(error);
          // TODO: Update UI with error state
        }, 
        () => {
          resolve(uploadTask.snapshot.ref);
        }
      );
    });
  }
  
  export function resumeUpload(uploadTask) {
    if (uploadTask && uploadTask.snapshot.state === 'paused') {
      uploadTask.resume();
      console.log('Upload resumed');
    } else {
      console.log('No upload task is paused at the moment');
    }
  }
  
  export function pauseUpload(uploadTask) {
    if (uploadTask && uploadTask.snapshot.state === 'running') {
      uploadTask.pause();
      console.log('Upload paused');
    } else {
      console.log('No upload task is running at the moment');
    }
  }
  
  export function cancelUpload(uploadTask) {
    if (uploadTask) {
      uploadTask.cancel();
      console.log('Upload canceled');
    } else {
      console.log('No upload task to cancel');
    }
  }
    // export function downloadFile(filePath) {
    //     //
    // };

    // export function deleteFile(filePath)  {
    //   // 
    // };