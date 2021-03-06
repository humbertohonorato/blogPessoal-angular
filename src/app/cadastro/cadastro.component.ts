import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { User } from '../model/User';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  user: User = new User();
  senha: string

  constructor(private authservice: AuthService, private router: Router) { }

  ngOnInit() {
  }

  conferirSenha(event: any) {
    this.senha = event.target.value;
  }

  cadastrar() {
    if (this.senha === this.user.senha) {

      this.authservice.cadastrar(this.user).subscribe((resp: User) => {
        this.user = resp;
        this.router.navigate(['/login']);
        alert('Usuario cadastrado com sucesso!');
      })
    }
    else {
      alert('As senhas não estão iguais.')
    }
  }

}
