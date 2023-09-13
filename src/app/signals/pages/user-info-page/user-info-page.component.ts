import { Component, computed, inject, OnInit, signal } from '@angular/core';
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
  public fullName = computed<string>( () => {
    if (!this.currentUser()) return 'Usuario no encontrado';

    return `${this.currentUser()?.first_name} ${this.currentUser()?.last_name}`;
  } );

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
      .subscribe({
        next: (user) => {
          this.currentUser.set(user);
          this.userwasFound.set(true);
        },
        error: () => {
          this.userwasFound.set(false);
          this.currentUser.set(undefined);
        },

      });
  }
}
