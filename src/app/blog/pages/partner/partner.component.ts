import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.css']
})
export class PartnerComponent implements OnInit {

  partnerForm: FormGroup | undefined;

  constructor(
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.partnerForm = this.fb.group({
      name: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(50)]
      ],
      lastName: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(50)]
      ],
      secondLastName: [
        '',
        [Validators.minLength(3), Validators.maxLength(50)]
      ],
      documentNumber: [
        '',
        [Validators.required, Validators.minLength(8), Validators.maxLength(8)]
      ],
      phone: [
        '',
        [Validators.required, Validators.pattern('^[0-9]+$')]
      ],
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(50)]
      ],
      gender: [
        '',
        [Validators.required]
      ],
      birthDate: [
        '',
        [Validators.required]
      ],
      address: [
        '',
        [Validators.required]
      ],
      zipCode: [
        '',
        [Validators.required, Validators.pattern('^[0-9]+$')]
      ],
      city: [
        '',
        [Validators.required]
      ],
      country: [
        '',
        [Validators.required]
      ],
      whatsapp: [
        '',
        [Validators.required]
      ],
      privacyPolicy: [
        '',
        [Validators.required]
      ]
    });
  }

}
