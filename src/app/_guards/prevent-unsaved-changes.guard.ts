import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {

  canDeactivate(
    component: MemberEditComponent):  boolean  {
      if(component.editForm.dirty){
        if(confirm('Are you sure you want to continue? Any unsaved chnages will be lost')){
          return true;
        }
        return false;
      }
    return true;
  }
  
}
