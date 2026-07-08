import { Component } from '@angular/core';
import emailjs from '@emailjs/browser';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-sendemail',
  imports: [ReactiveFormsModule],
  templateUrl: './sendemail.html',
  styleUrl: './sendemail.css',
})
export class Sendemail {
  form!: FormGroup;
  constructor(private fb: FormBuilder) {}

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
  emailjs.init('lWZpFiHTYw-gy86rP');
  let response = await emailjs.send("service_hvxs5dw","template_pygwnbu",{
name: this.form.value.name,
subject: this.form.value.subject,
message: this.form.value.message,
title: "Admin ntg",
email: this.form.value.email,
ToEmail: this.form.value.ToEmail,
toname: this.form.value.toname,
});

alert("Email sent successfully!");
this.form.reset();
}


}
