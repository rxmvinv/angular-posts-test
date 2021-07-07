import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: 'posts', component: PostsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'detail/:id', component: PostDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes), HttpClientModule ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
