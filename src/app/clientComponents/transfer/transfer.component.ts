import { TranslatedPipe } from './../../core/pipes/translate.pipe';
import { Subscription, takeUntil } from 'rxjs';
import { Itransfer } from '../../core/interfaces/itransfer';
import { TransferService } from './../../core/services/transfer.service';
import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from "@angular/router";
import { TermtextPipe } from '../../core/pipes/termtext.pipe';
import { CommonModule } from '@angular/common';
import { ReloadableComponent } from '../reloadable/reloadable.component';

@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [RouterLink,TermtextPipe,CommonModule,TranslatedPipe],
  templateUrl: './transfer.component.html',
  styleUrl: './transfer.component.css'
})
export class TransferComponent extends ReloadableComponent  {

   private readonly TransferService=inject(TransferService);
  
    // AllTrasnferList:Itransfer[]=[];
    AllTrasnferList:WritableSignal<Itransfer[]>=signal([]);
    TrasnferSUbs:WritableSignal<Subscription|null>=signal(null);

    ngOnInit(): void {
    this.LoadData();
    this.onReload(() => this.LoadData());
        
      }
    LoadData(){
      this.TransferService.getAllTransfers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.AllTrasnferList.set(res.data);
          console.log(this.AllTrasnferList());
        },
        error: (err: HttpErrorResponse) => {
          console.log(err.message);
        }
      });

    };
      // ngOnDestroy(): void {
      //   if(this.TrasnferSUbs()){
      //     this.TrasnferSUbs()?.unsubscribe();
      //   }
      // }

}
