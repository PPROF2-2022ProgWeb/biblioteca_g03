import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css'],
})
export class DashboardLayoutComponent implements OnInit {
  public isMenuActive: boolean = false;
  public scrollActive: boolean = false;
  public title: string = '';
  public scrollTimeout: any;

  @ViewChild('main')
  main!: ElementRef;

  constructor(private router: Router) {
    if (window.innerWidth < 768) this.isMenuActive = false;
    router.events.subscribe(() => {
      let r = router.url.split('/')[1];
      switch (r) {
        case 'libros':
          this.title = 'Libros';
          break;
        case 'prestamos':
          this.title = 'Prestamos';
          break;
        case 'devoluciones':
          this.title = 'Devoluciones';
          break;
        case 'usuarios':
          this.title = 'Usuarios';
          break;
        default:
          this.title = 'Reportes';
          break;
      }
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.main.nativeElement.addEventListener('scroll', () => {
      this.scrollActive = true;
      if (this.scrollTimeout) {
        clearTimeout(this.scrollTimeout);
      }
      this.scrollTimeout = setTimeout(() => {
        this.scrollActive = false;
      }, 2000);
    });
  }
  toggleMenu() {
    this.isMenuActive = !this.isMenuActive;
  }
}
