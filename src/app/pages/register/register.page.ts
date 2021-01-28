import { AuthService } from './../../services/auth.service';
import { RegisterUser } from './../../interfaces/register-user.interface';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit({ value, valid }: { value: RegisterUser; valid: boolean }) {
    if (!valid) {
      return;
    }

    this.auth.signUpWithEmail(value.email, value.password).then(() => {
      this.registerForm.reset();
    });
  }
}
