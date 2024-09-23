import { HttpInterceptorFn } from '@angular/common/http';

const baseUrl = "http://localhost:4200"

export const backendRequestInterceptor: HttpInterceptorFn = (req, next) => {
  const reqUrl = baseUrl + req.url
  if(req.url.startsWith("/api/auth")) {
      
      const newReq = req.clone({
        url: reqUrl
      })
      return next(newReq)
  } else {
    const newReq = req.clone({
      url: reqUrl,
      setHeaders: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "auth-token": `Bearer ${getToken()}`
      }
    })
      return next(newReq)
  }
};

export const getToken = () => {
  let cookieToken = getCookie("token")
  if (cookieToken && cookieToken.length > 0) {
    return cookieToken;
  }

  let localStorageToken = getItemFromLocalStorage("token")
  let expiresAtStr = getItemFromLocalStorage("expiresAt");
  let expiresAt = Number.parseInt(expiresAtStr ? expiresAtStr : '0')

  if (expiresAt > new Date().getTime() && localStorageToken && localStorageToken.length > 0) {
    return localStorageToken;
  } else {
    deleteFromLocalStorage("token")
    deleteFromLocalStorage("name")
    deleteFromLocalStorage("expiresAt")
  }

  return ''
}

export const  getCookie =  (name: string) => {
  let ca: Array<string> = document.cookie.split(';');
  let caLen: number = ca.length;
  let cookieName = `${name}=`;
  let c: string;

  for (let i: number = 0; i < caLen; i += 1) {
    c = ca[i].replace(/^\s+/g, '');
    if (c.indexOf(cookieName) == 0) {
      return c.substring(cookieName.length, c.length);
    }
  }
  return '';
}

const getItemFromLocalStorage = (fieldName: string) => {
  return document.defaultView?.localStorage.getItem(fieldName)
}

const deleteFromLocalStorage = (fieldName: string) => {
  document.defaultView?.localStorage.removeItem(fieldName);
}

