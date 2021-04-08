import router from './router';

const getToken = () => {
  return localStorage.getItem('fintax-token');
}


router.beforeEach(async(to, from, next) => {
  // check user token\
  const hasToken = getToken();
  const whiteList = ['Login']
  if(!!hasToken || whiteList.includes(to.name)) {
    next();
  } else {
    next({name: 'Login'})
  }
})