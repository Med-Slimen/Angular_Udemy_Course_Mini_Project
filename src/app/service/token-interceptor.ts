import { HttpInterceptorFn } from '@angular/common/http';
import { Auth } from './auth';
import { inject } from '@angular/core/primitives/di';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(Auth);
  const toExclude = "/login";
  //tester s'il sagit de login, on n'ajoute pas le header Authorization
  //puisqu'on a pas encode de JWT (il est null)
  if(req.url.search(toExclude) === -1){
  let jwt = authService.getToken();
  let reqWithToken = req.clone( {
  setHeaders: { Authorization : "Bearer "+jwt}
  })
  return next(reqWithToken);
  }
  return next(req);

};
