import { AfterViewInit, Component } from '@angular/core';
declare global {
  interface Window {
    Tawk_API: any;
    Tawk_LoadStart: any;
  }
}

@Component({
  selector: 'app-tok',
  standalone: true,
  imports: [],
  templateUrl: './tok.component.html',
  styleUrl: './tok.component.css'
})
export class TokComponent  implements AfterViewInit {

  
  ngAfterViewInit(): void {
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    const s1 = document.createElement('script');
    s1.async = true;
    s1.src = 'https://embed.tawk.to/69488d04420bc819787eff99/1jd1mdmlf';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    document.body.appendChild(s1);

    // Optional: تأخير التثبيت حتى يظهر أسفل الشمال
    s1.onload = () => {
      // Tawk.to iframe يتحكم فيه CSS داخليًا
      const iframe = document.querySelector('iframe[title="chat widget"]') as HTMLElement;
      if (iframe) {
        iframe.style.left = '20px';
        iframe.style.right = 'auto';
      }
    };
  }
}