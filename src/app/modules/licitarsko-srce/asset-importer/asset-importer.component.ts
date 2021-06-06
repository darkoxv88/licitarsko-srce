import { Component } from '@angular/core';
import { IDialogComponentView } from 'src/app/interfaces/i-dialog-component-view';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { AssetHandlerService } from 'src/app/core/data-transfers/windows/asset-handler.service';
import { NgIfExtensionsService } from 'src/app/core/utilities/ng-if-extensions.service';

@Component({
  selector: 'app-asset-importer',
  templateUrl: './asset-importer.component.html',
  styleUrls: ['./asset-importer.component.scss']
})
export class AssetImporterComponent implements IDialogComponentView<null, void> {

  public selectedValue;
  public selections: Array<any>;

  public disableBtn: boolean;

  public newAssetForm: FormGroup;

  public loading: boolean;
  public msg: string;

  constructor(private formBuilder: FormBuilder, private assetHandlerService: AssetHandlerService, public ngIfEx: NgIfExtensionsService,) {
    this.selectedValue = 'image/*';
    this.selections = [
      { value: 'image/*', display: 'Image'}
    ]
    this.newAssetForm = this.formBuilder.group({
      assetName: ['', [Validators.required, this.nameValidator()]],
    });
    this.disableBtn = true;
    this.loading = false;
    this.msg = '';
  }

  public nameValidator = (): ValidatorFn => {
    return (control: AbstractControl) : ValidationErrors | null => {
      const value = control.value;

      if (!value) return null;

      return this.assetHandlerService.checkIfNameExists(value) ? { nameUsed: this.disableBtn } : null;
    }
}

  public disableAction(): boolean {
    if (!this.newAssetForm.value?.assetName) return true;
    return false;
  }

  public loadAsset(e: Event): void {
    if (!e.target['files']) {
      return;
    }
      
    if (!e.target['files'][0]) {
      return;
    }

    this.assetHandlerService.loadAsset(e.target['files'][0] as File, this.newAssetForm.value?.assetName, () => {
      this.newAssetForm.reset();
    })

    e.target['value'] = '';
  }

  public onCreateAsset(): void {

  }

  public disable(): boolean { 
    return false;
  }

  public setData(data: null): void { }

  public getData(): void { }

}
