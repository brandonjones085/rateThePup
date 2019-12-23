import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {NgForm, FormsModule, FormGroup, FormControl, Validators} from "@angular/forms"
import {Pup} from '../pup.model'
import {PupService} from '../pup.service'
import { ActivatedRoute, ParamMap } from '@angular/router';
import {mimeType} from './mime-type.validator'

@Component({
  selector: 'app-uploadpic',
  templateUrl: './uploadpic.component.html',
  styleUrls: ['./uploadpic.component.css']
})
export class UploadpicComponent implements OnInit {
  enteredName=""
  enteredBreed=""
  enteredQuote=""
  isLoading = false; 
  form: FormGroup;
  imagePreview: string; 
  private mode = 'create'; 
  private pupId: string; 
  private pup: Pup; 

  constructor(public pupsService: PupService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      'name':new FormControl(null, {validators:[Validators.required]}), 
      'breed': new FormControl(null, {validators: [Validators.required]}), 
      'quote':new FormControl(null, {validators: [Validators.required]}), 
      'image': new FormControl(null, {validators:[Validators.required], asyncValidators: [mimeType]})
    })
    this.route.paramMap.subscribe(((paramMap:ParamMap)=>{
      if(paramMap.has('pupId')){
        this.mode = 'edit'; 
        this.pupId = paramMap.get('pupId')
        this.pupsService.getPup(this.pupId).subscribe(pupData =>{
          this.pup = {id: pupData._id, name: pupData.name, breed: pupData.breed, quote: pupData.quote, imagePath: pupData.imagePath, rates: pupData.rates}; 
          this.form.setValue({'name': this.pup.name, 'breed':this.pup.breed, 'quote':this.pup.quote, 'image':this.pup.imagePath, 'rate': null})
        } )
      }else{
        this.mode = 'create'; 
        this.pupId = null; 
      }
      
    }))
  }

  onImagePicked(event:Event){
    const file = (event.target as HTMLInputElement).files[0]; 
    this.form.patchValue({image: file}); 
    this.form.get('image').updateValueAndValidity()
    const reader = new FileReader(); 
    reader.onload = ()=>{
      this.imagePreview = reader.result as string; 
    }
    reader.readAsDataURL(file); 
  }

  uploadPup(){
    if(this.form.invalid){
      return
    }
    this.isLoading =true; 
    if(this.mode === "create"){
      this.pupsService.addPup(this.form.value.name, this.form.value.breed, this.form.value.quote, this.form.value.image);
    }else{
      
      this.pupsService.addPup(this.form.value.name, this.form.value.breed, this.form.value.quote, this.form.value.image); 

    }
    
    this.form.reset(); 
  }; 
  

}
