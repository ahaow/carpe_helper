/**
 * 
 * @param url 
 * @returns 
 */
function urlParams(url: any) {
  const reg = /([^?&=]+)=([^?&=]+)/g;
  let obj: any = {};
  url.replace(reg, function() {
    obj[arguments[1]] = arguments[2]
  });
  return obj
}

export default urlParams