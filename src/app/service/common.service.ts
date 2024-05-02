import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({ providedIn: 'root'})
export class CommonService {

  constructor() { }

  sucessAlert(title: string, content: string, template: any, showCancle: boolean, confirmButton: string, cancelButton: string) {
    return Swal.fire({
      title: title,
      text: content,
      icon: template,
      showCancelButton: showCancle,
      confirmButtonText: confirmButton,
      cancelButtonText: cancelButton
    })
  };
  failureAlert(title: string,) {
    return Swal.fire(
      title,
      '',
      'error'
    )
  }
}
