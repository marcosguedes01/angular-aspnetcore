Passo a passo encontrado no seguinte endereço:
https://medium.com/@levifuller/building-an-angular-application-with-asp-net-core-in-visual-studio-2017-visualized-f4b163830eaa

Principais Passos:

1. Adicionar os pacotes:
	<PackageReference Include="Microsoft.AspNetCore.Mvc" Version="1.1.2" />
	<PackageReference Include="Microsoft.AspNetCore.StaticFiles" Version="1.1.1" />
	
2. Editar o .csproject e bloquear o compilador TypeScript:
	<PropertyGroup>
		<TypeScriptCompileBlocked>true</TypeScriptCompileBlocked>
	</PropertyGroup>

3. Alterar o arquivo Startup.cs
	Add a seguinte linha de código no método ConfigureServices:
		services.AddMvc();
	Substituir o código do método Configure para:
		app.Use(async (context, next) => {
		await next();
		
		if (context.Response.StatusCode == 404 &&
			!Path.HasExtension(context.Request.Path.Value) &&
			!context.Request.Path.Value.StartsWith("/api/")) {
				context.Request.Path = "/index.html";
				await next();
			}
		});
		app.UseMvcWithDefaultRoute();
		app.UseDefaultFiles();
		app.UseStaticFiles();
		
4. Abrir o prompt de comando, ir para o diretório principal do projeto e executar a seguinte linha de código:
	ng new {kebab-cased-app-name-here} --skip-install
	
5. Mover os arquivos do angular para a raiz do projeto

6. No arquivo src/app/app.module.ts importar os módulos FormsModule e HttpModule:
		import { BrowserModule } from '@angular/platform-browser';
		import { NgModule } from '@angular/core';
		import { AppComponent } from './app.component';
		import { FormsModule } from '@angular/forms';
		import { HttpModule } from '@angular/http';
		@NgModule({
		   declarations: [
			  AppComponent
		   ],
		   imports: [
			  BrowserModule,
			  FormsModule,
			  HttpModule
		   ],
		   providers: [],
		   bootstrap: [AppComponent]
		})
		export class AppModule { }
		
7. Abrir arquivo .angular-cli.json e alterar o outDir para "wwwroot"

8. Substituir o conteúdo do arquivo src/app/app.component.ts para:
		import { Component, OnInit } from '@angular/core';
		import { Http } from '@angular/http'
		@Component({
		   selector: 'app-root',
		   templateUrl: './app.component.html',
		   styleUrls: ['./app.component.css']
		})
		export class AppComponent implements OnInit {
		   constructor(private _httpService: Http) { }
		   apiValues: string[] = [];
		   ngOnInit() {
			  this._httpService.get('/api/values').subscribe(values => {
				 this.apiValues = values.json() as string[];
			  });
		   }
		}
		
9. Subsrtituir o conteúdo do arquivo src/app/app.component.html para:
		<h1>Application says what?</h1>
		<ul *ngFor="let value of apiValues">
		   <li>{{value}}</li>
		</ul>
		
10. Executar o comando npm install
11. Executar o comando ng build
12. Executar o comando dotnet run para rodar a aplicação ou executar a aplicação pelo visual studio