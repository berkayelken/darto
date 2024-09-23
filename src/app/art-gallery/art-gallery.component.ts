import { CommonModule, DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { afterRender, Component, Inject } from '@angular/core';

@Component({
  selector: 'app-art-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './art-gallery.component.html',
  styleUrl: './art-gallery.component.css'
})
export class ArtGalleryComponent {

  constructor(
    private httpClient: HttpClient, @Inject(DOCUMENT) private document: Document) { 
      afterRender(() => {
        if (!this.init) {
          this.getAllNfts()
          this.init = true
        }
      })
    }

  allNfts: any = []
  myNfts = false
  init = false

  transfer(nft: any) {
    let reqBody = {from: nft.owner, to: this.getWallet(), tokenMintAddress: nft.mintHash}
    this.httpClient.post("/api/nft/transfer", reqBody).subscribe(res => this.getMyNfts())
  }

  async getAllNfts() {
    this.httpClient.get("/api/nft/all").subscribe(res => {
      this.allNfts = res
      this.myNfts = false
      let button = this.document.getElementById("all-button")
      if(button?.classList && !button.classList.contains("active")) {
        button?.classList.add("active")
      }
      let myNfts = this.document.getElementById("my-nfts-button")
      if(myNfts?.classList && myNfts.classList.contains("active")) {
        myNfts?.classList.remove("active")
      }
    })
  }


  async getMyNfts() {
    this.httpClient.get("/api/nft").subscribe(res => {
      this.allNfts = res
      this.myNfts = true
      let button = this.document.getElementById("all-button")
      if(button?.classList && button.classList.contains("active")) {
        button?.classList.remove("active")
      }
      let myNfts = this.document.getElementById("my-nfts-button")
      if(myNfts?.classList && !myNfts.classList.contains("active")) {
        myNfts?.classList.add("active")
      }
    })
  }

  private getWallet() {
    let wallet = this.getCookie("wallet")
    if (wallet && wallet.length > 0) {
      return wallet
    }

    return this.getItemFromLocalStorage(wallet)
  }

  private getCookie =  (name: string) => {
    let ca: Array<string> = this.document.cookie.split(';');
    let caLen: number = ca.length;
    let cookieName = `${name}=`;
    let c: string;
  
    for (let i: number = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s+/g, '');
      if (c.indexOf(cookieName) == 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return '';
  }

  private getItemFromLocalStorage = (fieldName: string) => {
    return this.document.defaultView?.localStorage.getItem(fieldName)
  }
  

}
