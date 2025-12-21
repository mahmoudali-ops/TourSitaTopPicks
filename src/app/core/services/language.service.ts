import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { signal, Signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private platformId = inject(PLATFORM_ID);

  // signal لحفظ اللغة الحالية
  public lang = signal<'en' | 'ar'|'de'|'nl'>('en');

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const savedLang = localStorage.getItem('lang') as 'en' | 'ar'|'de'|'nl';
      if (savedLang) this.lang.set(savedLang);
    }
  }

  // دالة لتغيير اللغة
  setLanguage(lang: 'en' | 'ar'|'de'|'nl') {
    this.lang.set(lang);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('lang', lang);
    }
  }

  // signal للغة الحالية
  get currentLang(): Signal<'en' | 'ar'|'de'|'nl'> {
    return this.lang;
  }

  // طريقة سريعة لإرجاع القيمة مباشرة
  get currentLangValue(): 'en' | 'ar'|'de'|'nl' {
    return this.lang();
  }
}
