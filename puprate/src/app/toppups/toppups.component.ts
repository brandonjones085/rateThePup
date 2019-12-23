import { Component, OnInit, OnDestroy } from '@angular/core';
import {PupService} from '../pup.service'
import {Subscription} from 'rxjs'; 
import {Pup} from '../pup.model'

@Component({
  selector: 'app-toppups',
  templateUrl: './toppups.component.html',
  styleUrls: ['./toppups.component.css']
})
export class ToppupsComponent implements OnInit, OnDestroy {

 pups: Pup[] = []
 private pupsSub: Subscription; 

  constructor(public pupsService: PupService) { 
   
  }

  ngOnInit() {
    this.pupsService.getPups(); 
    this.pupsSub = this.pupsService.getPupUpdateListener().subscribe((pups:Pup[])=>{
      this.pups = pups; 
     
    }); 
  }



  ngOnDestroy(){
    this.pupsSub.unsubscribe(); 
  }


}
