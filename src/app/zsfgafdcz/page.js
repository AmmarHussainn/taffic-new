'use client';

const zsfgafdcz = () => {
  setTimeout(() => {
    let token = localStorage.getItem('token');
    console.log('Mytoken new', token);
    if (token) {
      return true;
    } else {
      return false;
    }
  }, 1000);
};
export default zsfgafdcz;
