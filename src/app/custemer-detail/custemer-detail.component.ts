import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-custemer-detail',
  templateUrl: './custemer-detail.component.html',
  styleUrl: './custemer-detail.component.css'
})
export class CustemerDetailComponent {
  CustemerForm:FormGroup;

  constructor(private fb:FormBuilder){
    this.CustemerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobileNo: ['', Validators.required],
      address: [''],
      email: ['', [Validators.required, Validators.email]],
      age: ['', Validators.required],
      dob: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  
  }

  onSubmit() {
    console.log(this.CustemerForm.value);
  }
}
