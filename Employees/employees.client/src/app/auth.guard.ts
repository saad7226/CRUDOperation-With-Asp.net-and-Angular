import { inject } from '@angular/core';
import { CanActivateFn,Router} from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router);

  let isloggedIn = sessionStorage.getItem("isLoggedIn");
 
  
  if (isloggedIn == 'true') {
    return true;
  }
  else {
    alert("Please First Login");
    _router.navigate(['/Login']);
    return false;
  }

 
};
