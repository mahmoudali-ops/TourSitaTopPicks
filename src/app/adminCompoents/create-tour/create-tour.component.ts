import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TourService } from '../../core/services/tour.service';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-create-tour',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './create-tour.component.html',
  styleUrl: './create-tour.component.css'
})
export class CreateTourComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;

  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  languages = ['en', 'de', 'pl'];
  activeLang = 'en';

  categories = [
    { id: 28, name: 'sea tours hurghada' },
    { id: 34, name: 'thing to do hurghada' },
    { id: 37, name: 'diving' },
    { id: 38, name: 'cairo tours hurghada' },
    { id: 39, name: 'luxor tours hurghada' },
    { id: 40, name: 'safari tours hurghada' }
  ];

  tourForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tourService: TourService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.tourForm = this.fb.group({
      isActive: [true],
      duration: ['', Validators.required],
      price: ['', Validators.required],
      startLocation: ['', Validators.required],
      endLocation: ['', Validators.required],
      languageOptions: ['en,de,pl'],
      referenceName: ['', Validators.required],
      linkVideo: [''],
      fkCategoryId: [null, Validators.required],

      translations: this.fb.array([]),
      includesList: this.fb.array([]),
      notIncludedList: this.fb.array([]),
      highlightList: this.fb.array([]),
      imagesList: this.fb.array([])
    });

    this.languages.forEach(lang => this.addTranslation(lang));
  }

  // ===================== GETTERS =====================
  get translations() { return this.tourForm.get('translations') as FormArray; }
  get includesList() { return this.tourForm.get('includesList') as FormArray; }
  get notIncludedList() { return this.tourForm.get('notIncludedList') as FormArray; }
  get highlightList() { return this.tourForm.get('highlightList') as FormArray; }
  get imagesList() { return this.tourForm.get('imagesList') as FormArray; }

  // ===================== TRANSLATIONS =====================
  addTranslation(lang: string) {
    this.translations.push(this.fb.group({
      language: [lang],
      title: ['', Validators.required],
      description: ['', Validators.required]
    }));
  }

  // ===================== INCLUDES =====================
  addInclude(lang: string) {
    this.includesList.push(this.fb.group({
      language: [lang, Validators.required],
      text: ['', Validators.required]
    }));
  }
  removeInclude(i: number) { this.includesList.removeAt(i); }

  addNotInclude(lang: string) {
    this.notIncludedList.push(this.fb.group({
      language: [lang, Validators.required],
      text: ['', Validators.required]
    }));
  }
  removeNotInclude(i: number) { this.notIncludedList.removeAt(i); }

  addHighlight(lang: string) {
    this.highlightList.push(this.fb.group({
      language: [lang, Validators.required],
      text: ['', Validators.required]
    }));
  }
  removeHighlight(i: number) { this.highlightList.removeAt(i); }

  // ===================== IMAGES =====================
  addImage() {
    this.imagesList.push(this.fb.group({
      imageFile: [null, Validators.required],
      isActive: [true],
      translations: this.fb.array(
        this.languages.map(lang =>
          this.fb.group({
            language: [lang],
            title: ['', Validators.required],
            tourName: ['']
          })
        )
      )
    }));
  }

  removeImage(i: number) {
    this.imagesList.removeAt(i);
  }

  // ===================== MAIN IMAGE =====================
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    this.selectedFile = file;
    const reader = new FileReader();
    reader.onload = () => this.imagePreview = reader.result;
    reader.readAsDataURL(file);
  }

  removeMainImage() {
    this.selectedFile = null;
    this.imagePreview = null;
    this.fileInput.nativeElement.value = '';
  }

  // ===================== SUBMIT =====================
  onSubmit() {
    if (this.tourForm.invalid) {
      this.toastr.error('Please fill all required fields');
      return;
    }

    const formData = new FormData();

    formData.append('IsActive', this.tourForm.value.isActive);
    formData.append('Duration', this.tourForm.value.duration);
    formData.append('Price', this.tourForm.value.price);
    formData.append('StartLocation', this.tourForm.value.startLocation);
    formData.append('EndLocation', this.tourForm.value.endLocation);
    formData.append('LanguageOptions', this.tourForm.value.languageOptions);
    formData.append('ReferneceName', this.tourForm.value.referenceName);
    formData.append('LinkVideo', this.tourForm.value.linkVideo || '');
    formData.append('FK_CategoryID', this.tourForm.value.fkCategoryId);
    formData.append('FK_DestinationID', '2');

    if (this.selectedFile) {
      formData.append('ImageFile', this.selectedFile);
    }

    formData.append('TranslationsJson', JSON.stringify(this.translations.value));
    formData.append('IncludesJson', JSON.stringify(this.includesList.value));
    formData.append('NonIncludesJson', JSON.stringify(this.notIncludedList.value));
    formData.append('hightlightJson', JSON.stringify(this.highlightList.value));

    this.imagesList.controls.forEach((img, i) => {
      formData.append(`ImagesList[${i}].ImageFile`, img.value.imageFile);
      formData.append(`ImagesList[${i}].IsActive`, img.value.isActive);
      formData.append(`ImagesList[${i}].TranslationsJson`,
        JSON.stringify(img.value.translations));
    });

    this.tourService.createTour(formData).subscribe({
      next: () => {
        this.toastr.success('Tour created successfully');
        this.router.navigate(['/admin/tours']);
      },
      error: () => this.toastr.error('Error creating tour')
    });
  }


  onImageChange(event: Event, index: number) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  const imgGroup = this.tourImages.at(index) as FormGroup;
  imgGroup.get('imageFile')?.setValue(file);
}
  get tourImages() {
    return this.tourForm.get('imagesList') as FormArray;
  }

  getImageTranslations(img: AbstractControl): FormArray {
    return img.get('translations') as FormArray;
  }

  
}