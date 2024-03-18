export const clearValue = (obj) => {
  Object.keys(obj).forEach(key => {
    if(typeof obj[key] == 'object'){
      clearValue(obj[key])
    }else{
      obj[key] = '';
    }
  })
}