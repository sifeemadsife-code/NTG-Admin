import { Component } from '@angular/core';
import emailjs from '@emailjs/browser';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from "../sidebar/sidebar";
import { RouterLink } from "@angular/router";
import { SuccessMessageService } from '../../Services/success-message';
@Component({
  selector: 'app-sendemail',
  imports: [ReactiveFormsModule, SidebarComponent, RouterLink],
  templateUrl: './sendemail.html',
  styleUrl: './sendemail.css',
})
export class Sendemail {
  form!: FormGroup;
  constructor(private fb: FormBuilder, private successMessage: SuccessMessageService) {}

  ngOnInit() {
   this.form = this.fb.group({
    name: ['Admin'],
    subject: [''],
    message: [''],
    email: [''],
    ToEmail: [''],
    toname: ['']
  });
  }





async send() {
  try {
    emailjs.init('lWZpFiHTYw-gy86rP');
    await emailjs.send("service_hvxs5dw","template_pygwnbu",{
name: this.form.value.name,
subject: this.form.value.subject,
message: this.form.value.message,
title: "Admin ntg",
email: this.form.value.email,
ToEmail: this.form.value.ToEmail,
toname: this.form.value.toname,
    });

    this.successMessage.show('Email sent successfully!');
    this.form.reset();
  } catch (error) {
    console.error(error);
    this.successMessage.showError('Failed to send email. Please try again.');
  }
}


}
