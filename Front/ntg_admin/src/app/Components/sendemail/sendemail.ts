import { Component, OnInit, inject } from '@angular/core';
import emailjs from '@emailjs/browser';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar';
import { RouterLink } from '@angular/router';
import { SuccessMessageService } from '../../Services/success-message';
import { ProfileService } from '../../Services/profile';

@Component({
  selector: 'app-sendemail',
  standalone: true,
  imports: [ReactiveFormsModule, SidebarComponent, RouterLink],
  templateUrl: './sendemail.html',
  styleUrl: './sendemail.css',
})
export class Sendemail implements OnInit {
  private fb = inject(FormBuilder);
  private successMessage = inject(SuccessMessageService);
  private profileService = inject(ProfileService);
  private route = inject(ActivatedRoute);

  form!: FormGroup;
  sending = false;

  ngOnInit() {
    this.form = this.fb.group({
      name: [{ value: '', disabled: true }, Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],

      subject: ['', Validators.required],
      message: ['', Validators.required],
      ToEmail: ['', [Validators.required, Validators.email]],
      toname: ['', Validators.required],
      bcc: ['', [Validators.email]],
      cc: ['', [Validators.email]],
    });

    this.loadSenderInfo();
    this.prefillRecipientFromQueryParams();
  }

  private loadSenderInfo(): void {
    this.profileService.getMyProfile().subscribe({
      next: (profile) => {
        this.form.patchValue({
          name: `${profile.firstName} ${profile.lastName}`,
          email: profile.email,
        });
      },
      error: (err) => {
        console.log(err);
        this.successMessage.showError('Failed to load your account information.');
      },
    });
  }

  private prefillRecipientFromQueryParams(): void {
    const params = this.route.snapshot.queryParamMap;
    const toEmail = params.get('toEmail');
    const toName = params.get('toName');

    if (toEmail || toName) {
      this.form.patchValue({
        ToEmail: toEmail ?? '',
        toname: toName ?? '',
      });
    }
  }

  async send() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.successMessage.showError(
        this.successMessage.validationMessage(this.form, {
          name: 'Sender Name',
          email: 'Sender Email',
          ToEmail: 'Recipient Email',
          toname: 'Recipient Name',
          subject: 'Subject',
          message: 'Message',
        }),
      );
      return;
    }

    const value = this.form.getRawValue();
    this.sending = true;

    try {
      emailjs.init('lWZpFiHTYw-gy86rP');
      await emailjs.send('service_hvxs5dw', 'template_pygwnbu', {
        name: value.name,
        subject: value.subject,
        message: value.message,
        title: 'Admin ntg',
        email: value.email,
        ToEmail: value.ToEmail,
        toname: value.toname,
        cc: value.cc || '',
        bcc: value.bcc || '',
      });

      this.successMessage.show('Email sent successfully.');
      this.form.reset();
      this.loadSenderInfo();
    } catch (err: any) {
      this.successMessage.showError(err?.text || 'Failed to send email.');
    } finally {
      this.sending = false;
    }
  }
}