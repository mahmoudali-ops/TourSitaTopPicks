import { ITour } from './../../core/interfaces/itour';
import { Component, inject, OnInit, OnDestroy, WritableSignal, signal } from '@angular/core';
import { TourService } from '../../core/services/tour.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-tours',
  standalone: true,
  imports: [],
  templateUrl: './tours.component.html',
  styleUrl: './tours.component.css'
})
export class ToursComponent {

  



}
