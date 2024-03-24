import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkIfTheUserIsInvited'
})
export class CheckIfTheUserIsInvitedPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {

  
    if(value == undefined || value?.slice(6) == '') return true;
    const regex = /^[0-9]+$/;
    console.log('activatedRoute2', value.slice(6));
    
    if(value.includes('guest_')){
      return !regex.test(value.slice(6));
    }
    
    return false;
  }

}
