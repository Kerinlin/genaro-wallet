import { Pipe, PipeTransform } from '@angular/core';
import { STAKE_PER_NODE } from "../libs/config";

@Pipe({
  name: 'readable'
})
export class NumberPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    value = value.toString();
    value
  }
}


@Pipe({
  name: "maxNode"
})
export class maxNode implements PipeTransform {
  transform(value: any) {
    return Math.floor(value / STAKE_PER_NODE);
  }
}