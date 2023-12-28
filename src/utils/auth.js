'use client';

const isAuthenticated = () => {
//   setTimeout(() => {
    let token = window.localStorage.getItem('token');
    console.log('Mytoken new', token);
    if (token) {
      return true;
    } else {
      return false;
    }
//   }, 1000);
};
export default isAuthenticated;
