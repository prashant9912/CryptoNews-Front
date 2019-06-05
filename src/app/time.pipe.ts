import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {
  moment: moment.Moment = moment();

  transform(value: any, args?: any): any {
    return moment(value).fromNow()
  }

}
