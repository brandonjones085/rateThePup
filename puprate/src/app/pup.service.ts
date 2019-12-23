import {Pup} from "./pup.model"
import {Injectable} from "@angular/core"
import {Subject} from 'rxjs'
import {HttpClient} from "@angular/common/http"
import {map} from 'rxjs/operators'
import {Router} from '@angular/router'

@Injectable({providedIn: "root"})
export class PupService{
    private pups: Pup[] = []; 
    private pupsUpdated = new Subject<Pup[]>(); 
    name: string
    breed: string
    quote: string
    image:string
    id: string
    rate: number
    
    constructor(private http:HttpClient, private router: Router){}

    getPups(){
        this.http.get<{message:string, pups: any}>("http://localhost:3000/pups")
        .pipe(map((pupData)=>{
            return pupData.pups.map(pup=>{
                return{
                    name: pup.name, 
                    breed: pup.breed, 
                    quote: pup.quote, 
                    id: pup._id, 
                    imagePath: pup.imagePath, 
                    rates: pup.rates
                
                }
         
            }); 
            
        }))
        
        .subscribe((transformedPups)=>{
            this.pups = transformedPups
            this.pupsUpdated.next([...this.pups])
         
        }); 
    }


    ratePup(id: string, name: string, breed: string, quote:string, rates: number, image: string){
        
      

        let pupData = {
            id: id, 
            name: name, 
            breed: breed, 
            quote: quote, 
            rates: rates + 1, 
            image: image

        }
       
        
        this.http.put("http://localhost:3000/rate/" + id, pupData)
        
        .subscribe(response=>{
          console.log(response)
         

        })
    }


    getPup(id: string){
        return this.http.get<{_id:string, name: string, breed:string, quote:string, imagePath: string, rates:number}>("http://localhost:3000/pups/"+id)
    }

    getP(){
        this.http.get<{message:string, pups:any}>("http://localhost:3000/rate")
        .pipe(map((pupData)=>{
            
            return pupData.pups.map(pup=>{
                return{
                    id: pup._id, 
                    name: pup.name, 
                    breed: pup.breed, 
                    quote: pup.quote, 
                    
                    imagePath: pup.imagePath, 
                    rates: pup.rates
                
                }
         
            }); 
            
        }))
        .subscribe((transformedPups)=>{
           this.pups = transformedPups
           this.pupsUpdated.next([...this.pups])
        
        })
          
         

        
        
    }


    getPupUpdateListener(){
        return this.pupsUpdated.asObservable(); 
    }

    addPup(name: string, breed: string, quote: string, image: File){
        const pupData = new FormData(); 
        pupData.append('name', name)
        pupData.append('breed', breed)
        pupData.append('quote', quote)
        pupData.append("image", image, name)
        this.http.post<{message: string, pup:Pup}>("http://localhost:3000/pups", pupData)
        .subscribe((responseData)=>{
            const pup: Pup = {id:responseData.pup.id, name: name, breed:breed, quote:quote, imagePath:responseData.pup.imagePath, rates: 0}
       
            this.pups.push(pup)
        this.pupsUpdated.next([...this.pups]);
        this.router.navigate(['/']);
        })
        
    }
}