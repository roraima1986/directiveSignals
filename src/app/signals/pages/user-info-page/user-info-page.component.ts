import { Component, inject, OnInit, signal } from '@angular/core';
import { User } from '../../interfaces/user-request.interface';
import { UsersServiceService } from '../../services/users-service.service';

@Component({
  selector: 'app-user-info-page',
  templateUrl: './user-info-page.component.html',
  styleUrls: ['./user-info-page.component.css']
})
export class UserInfoPageComponent implements OnInit {

  private usersServices = inject(UsersServiceService);
  public userId = signal(1);

  public currentUser = signal<User|undefined>(undefined);
  public userwasFound = signal(true);

  ngOnInit():void {
    this.loadUser(this.userId());
  }

  loadUser(id:number) {
    if(id<=0) return;

    this.userId.set(id);
    this.currentUser.set(undefined);

    this.usersServices.getUsersById(id)
      .subscribe(user => {
        this.currentUser.set(user)
      })
  }
}
