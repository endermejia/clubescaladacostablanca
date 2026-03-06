import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

export interface PostCardModel {
  title: string;
  img: {
    src: string;
    size?: string;
  };
  id?: string;
  description?: string;
  date?: string;
}

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe, NgOptimizedImage, TranslateModule],
})
export class PostCardComponent {
  @Input() public postCard: PostCardModel | undefined;

  constructor(private router: Router) {}

  openPost(): void {
    if (this.postCard?.id) {
      this.router.navigate(['post', this.postCard.id]);
    }
  }
}
