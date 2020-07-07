import { Component, OnInit } from '@angular/core';
import { PostagemService } from '../service/postagem.service';
import { Postagem } from '../model/Postagem';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  nome: string = localStorage.getItem('nome')
  key = 'data'
  reverse = true

  listaPostagens: Postagem[]

  postagem: Postagem = new Postagem

  alerta: boolean = false

  titulo: string

  constructor(private postagemService: PostagemService, private router: Router) { }

  ngOnInit() {
    let token = localStorage.getItem('token');

    if (token == null) {
      alert('Faça o login antes de acessar a página feed!');
      this.router.navigate(['/login']);
    }

    this.findallPostagens()

    window.scroll(0, 0)

    let item: string = localStorage.getItem('delOK')

    if (item == "true") {
      this.alerta = true
      localStorage.clear()

      setTimeout(() => {
        location.assign('/feed')
      }, 3000)
    }

  }

  findallPostagens() {
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp
    });
  }

  publicar() {
    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      location.assign('/feed')
    })
  }

  pesquisarPorTitulo() {
    this.postagemService.findByTitulo(this.titulo).subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp
    })
  }

}
