import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [RouterModule, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public readonly contact = {
    items: [
      {
        name: 'Facebook',
        link: 'https://www.facebook.com/groups/929089841231971',
        img: 'facebook',
      },
      {
        name: 'Instagram',
        link: 'https://www.instagram.com/clubescaladacostablanca',
        img: 'instagram',
      },
      {
        name: 'GitHub',
        link: 'https://github.com/endermejia/clubescaladacostablanca',
        img: 'github',
      }
    ],
  };
}
