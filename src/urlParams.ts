/**
 * 
 * @param url 
 * @returns 
 */
function getUrlParams(url: any) {
  const reg = /([^?&=]+)=([^?&=]+)/g;
  let obj: any = {};
  url.replace(reg, function() {
    obj[arguments[1]] = arguments[2]
  });
  return obj
}
