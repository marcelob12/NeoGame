import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { IonIcon, ModalController } from '@ionic/angular/standalone';

@Component({
  standalone: true,
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
  imports: [CommonModule, IonIcon]
})
export class ConfirmModalComponent implements OnInit {
  private modalCtrl = inject(ModalController)


  @Input() title: string = ""
  @Input() message: string = "";

  constructor() { }

  ngOnInit() { }


  close() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss("", 'confirm');
  }

}
