'use client';

const isAuthenticated = () => {
    let token = window.localStorage.getItem('token');
    console.log('Mytoken new', token);
    if (token) {
      return true;
    } else {
      return false;
    }
};
export default isAuthenticated;
