import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contacto',
  template: `
<section class="container pb-5">
  <!-- Section Title -->
  <div class="section-title">
    <h2>{{ "contact.title" | translate }}</h2>
    <p class="lead text-muted">
      {{ "contact.subtitle" | translate }}
    </p>
  </div>

  <div class="row g-5">
    <!-- Contact Info Cards -->
    <div class="col-lg-5">
      <div
        class="card-modern bg-white p-5 h-100 d-flex flex-column justify-content-center"
      >
        <h3 class="font-heading text-primary mb-5">
          {{ "contact.info_title" | translate }}
        </h3>

        <div class="d-flex align-items-center mb-5">
          <div class="bg-light p-4 rounded-circle me-4">
            <i class="bi bi-envelope-at fs-3 text-secondary"></i>
          </div>
          <div>
            <p
              class="mb-1 text-muted small text-uppercase fw-bold letter-spacing-1"
            >
              {{ "contact.form_email" | translate }}
            </p>
            <a
              href="mailto:clubescaladacostablanca@gmail.com"
              class="h6 font-heading text-primary text-decoration-none text-break w-100 d-block"
            >
              clubescaladacostablanca@gmail.com
            </a>
          </div>
        </div>

        <div class="mt-4 pt-4 border-top">
          <p class="small text-muted mb-3">
            {{ "contact.social_text" | translate }}
          </p>
          <div class="social-icons d-flex gap-4">
            <a
              href="https://www.facebook.com/groups/929089841231971"
              target="_blank"
              rel="noopener"
              class="text-primary fs-2"
              aria-label="Facebook del Club"
              ><i class="bi bi-facebook" aria-hidden="true"></i
            ></a>
            <a
              href="https://www.instagram.com/clubescaladacostablanca"
              target="_blank"
              rel="noopener"
              class="text-primary fs-2"
              aria-label="Instagram del Club"
              ><i class="bi bi-instagram" aria-hidden="true"></i
            ></a>
          </div>
        </div>
      </div>
    </div>

    <!-- Contact Form -->
    <div class="col-lg-7">
      <div class="card-modern bg-white p-5">
        <h3 class="font-heading text-primary mb-4">
          {{ "contact.form_title" | translate }}
        </h3>
        <form
          action="https://formspree.io/f/mwkydzgp"
          method="POST"
          class="needs-validation"
        >
          <div class="mb-4">
            <label
              for="inputName"
              class="form-label font-heading small text-muted text-uppercase"
              >{{ "contact.form_name" | translate }}</label
            >
            <input
              id="inputName"
              class="form-control form-control-lg bg-light border-0 rounded-3"
              type="text"
              name="name"
              required
            />
          </div>

          <div class="row g-4 mb-4">
            <div class="col-md-6">
              <label
                for="inputEmail"
                class="form-label font-heading small text-muted text-uppercase"
                >{{ "contact.form_email" | translate }}</label
              >
              <input
                id="inputEmail"
                class="form-control form-control-lg bg-light border-0 rounded-3"
                type="email"
                name="email"
                required
              />
            </div>
            <div class="col-md-6">
              <label
                for="inputTelephone"
                class="form-label font-heading small text-muted text-uppercase"
                >{{ "contact.form_phone" | translate }}</label
              >
              <input
                id="inputTelephone"
                class="form-control form-control-lg bg-light border-0 rounded-3"
                type="tel"
                name="phone"
                required
              />
            </div>
          </div>

          <div class="mb-5">
            <label
              for="messageTextArea"
              class="form-label font-heading small text-muted text-uppercase"
              >{{ "contact.form_message" | translate }}</label
            >
            <textarea
              id="messageTextArea"
              class="form-control bg-light border-0 rounded-3"
              rows="5"
              name="message"
              required
            ></textarea>
          </div>

          <button type="submit" class="btn-premium w-100 py-3">
            {{ "contact.form_send" | translate }}
            <i class="bi bi-send-fill ms-2"></i>
          </button>
        </form>
      </div>
    </div>
  </div>
</section>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslateModule],
})
export class ContactoComponent {
  constructor() {}
}
