import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ApplicationUserModel } from "../_models/applicationusermodel";
import { MembersService } from "../_services/members.service";

@Injectable({
    providedIn:'root'
})
export class MemberDetailedResolver implements Resolve<ApplicationUserModel>{
    constructor(private memberService:MembersService){}
    resolve(route: ActivatedRouteSnapshot):   Observable<ApplicationUserModel> {
        return this.memberService.getMember(route.paramMap.get('username'));
    }
    
}