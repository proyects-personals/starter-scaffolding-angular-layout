import { Company, CompanyService } from '@/app/api-service';
import { ISignInInteractor } from '@/app/application';
import { SignInModel } from '@/app/domain';
import { SING_IN_PROVIDERS } from '@/app/infrestructure';
import { Component, inject, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-welcome-component',
  imports: [],
  providers: [...SING_IN_PROVIDERS],
  templateUrl: './welcome-screen.component.html',
  styleUrl: './welcome-screen.component.scss',
})
export class WelcomeComponent implements OnInit {
  protected readonly title = signal('steveen');
  companies: Company[] = [];

  public userSession: SignInModel | null = null;
  public loading = false;

  public iInicioSesionInteractor = inject(ISignInInteractor);

  constructor(private companyService: CompanyService) {}

  async ngOnInit() {
    try {
      // this.iInicioSesionInteractor
      // .signIn({ email: 'user@test.com', password: '123' })
      // .subscribe({
      //   next: (res: SignInModel) => {
      //     this.userSession = res;
      //     console.log('Login exitoso con subscribe 😎');
      //   },
      //   error: (err) => {
      //     console.error('Error en el flujo:', err);
      //     this.loading = false;
      //   },
      //   complete: () => {
      //     this.loading = false;
      //   }
      // });
    } catch (loginError) {
      console.log('⚠️ Usuario no existe o no confirmado', loginError);
    }

    try {
      // 🔥 5. Llamar GraphQL
      const data = await this.companyService.getCompanies();
      this.companies = data.listCompanies.items;

      console.log('📦 Companies:', this.companies);
    } catch (apiError) {
      console.error('❌ Error llamando API:', apiError);
    }
  }
}
