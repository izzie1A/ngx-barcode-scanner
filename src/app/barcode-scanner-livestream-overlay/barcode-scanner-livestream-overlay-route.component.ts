import { Component, ViewChild } from '@angular/core';
import { BarcodeScannerLivestreamOverlayComponent } from 'ngx-barcode-scanner';
import { delay } from 'rxjs/operators';

@Component({
    selector: 'app-barcode-scanner-livestream-overlay',
    templateUrl: './barcode-scanner-livestream-overlay-route.component.html',
    styleUrls: ['./barcode-scanner-livestream-overlay-route.component.scss']
})
export class BarcodeScannerOverlayRouteComponent {

    @ViewChild(BarcodeScannerLivestreamOverlayComponent)
    barcodeScannerOverlay: BarcodeScannerLivestreamOverlayComponent;
    barcodeValue: string;
    count: number;
    count2: number;
    ccount: number = 0;
    scannedBarcodeList: number[];
    searchingBarcodeList: any[];
    FoundMessage: any[];

    selector: boolean = false;
    constructor() {
        this.scannedBarcodeList = new Array();
        this.count = 0;
    }

    test() {
        this.scannedBarcodeList = this.scannedBarcodeList.sort((n1, n2) => n1 - n2);
        this.searchingBarcodeList = this.scannedBarcodeList;
        this.scannedBarcodeList = [];
        console.log('done');
        this.selector == true ? this.selector = false : this.selector = true;
        this.searchingBarcodeList = this.sort(this.searchingBarcodeList)
        console.log('done');
    }

  
    
    sort(input:any) {
        let output = input.sort();
        return output
    }

    listDelete(inputList:any[], targetNum:number){
        inputList[targetNum]=null;
    }

    search(inputList:any[], target:any){
        let result = null;
        let count = 0;
        for(let item of inputList){
            count++;
            if(target==item){
                alert('find at : '+count);
                this.FoundMessage = item;
                break;
            }
        }
        return count;
    }

    testAdd(){
        console.log(this.scannedBarcodeList)
        this.scannedBarcodeList[this.scannedBarcodeList.length] = this.searchingBarcodeList[this.searchingBarcodeList.length-1]
        this.barcodeValue = this.searchingBarcodeList[this.searchingBarcodeList.length-1]
        console.log(this.scannedBarcodeList)
        this.search(this.searchingBarcodeList,this.barcodeValue)
    }

    startBarcodeScannerOverlay(): void {
        this.barcodeScannerOverlay.show();
    }

    onValueChanges(result) {
        this.count += 1;
        if (this.scannedBarcodeList[this.scannedBarcodeList.length - 1] != result.codeResult.code) {
            this.barcodeValue = result.codeResult.code;
            this.scannedBarcodeList[this.scannedBarcodeList.length] = result.codeResult.code;
            this.search(this.searchingBarcodeList,this.barcodeValue)
        }
        this.barcodeScannerOverlay.hide();
    }

    onStarted(event: boolean): void {
        console.log('started', event);
    }
}
