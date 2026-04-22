import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Auth } from "./auth";

const exclude_array : string[] = ['/login','/register','/verifyEmail'];
function toExclude(url :string)
{
var length = exclude_array.length;
for(var i = 0; i < length; i++) {
if( url.search(exclude_array[i]) != -1 )
return true;
}
return false;
}
export const tokenInterceptor : HttpInterceptorFn = (req, next) => {
const authService = inject(Auth);
if (!toExclude(req.url))
{
let jwt = authService.getToken();
let reqWithToken = req.clone( {
setHeaders: { Authorization : "Bearer "+jwt}
})
return next(reqWithToken);
}
return next(req);
}
