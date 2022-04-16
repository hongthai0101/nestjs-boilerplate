import { Injectable } from '@nestjs/common';
import moment, {unitOfTime} from 'moment';

@Injectable()
export class HelperDateService {
  calculateAge(dateOfBirth: Date): number {
    return moment().diff(dateOfBirth, 'years');
  }

  diff(dateOne: string, dateTwo: string, options?: string): number {
    const mDateOne = moment(dateOne);
    const mDateTwo = moment(dateTwo);
    const diff = moment.duration(mDateTwo.diff(mDateOne));

    if (options === 'milis') {
      return diff.asMilliseconds();
    } else if (options === 'seconds') {
      return diff.asSeconds();
    } else if (options === 'hours') {
      return diff.asHours();
    } else if (options === 'days') {
      return diff.asDays();
    } else {
      return diff.asMinutes();
    }
  }

  check(date: string): boolean {
    return moment(date, true).isValid();
  }

  create(date?: string | Date): Date {
    return moment(date, true).toDate();
  }

  timestamp(date?: string | Date): number {
    return moment(date, true).valueOf();
  }

  toString(date: Date, format?: string): string {
    return moment(date).format(format || 'YYYY-MM-DD');
  }

  forwardInMinutes(minutes: number): Date {
    return moment().add(minutes, 'm').toDate();
  }

  backwardInMinutes(minutes: number): Date {
    return moment().subtract(minutes, 'm').toDate();
  }

  forwardInDays(input?: string, days: number = 1): Date {
    const date = input ? moment(input) : moment();
    return date.add(days, 'd').toDate();
  }

  backwardInDays(days: number): Date {
    return moment().subtract(days, 'd').toDate();
  }

  forwardInMonths(months: number): Date {
    return moment().add(months, 'M').toDate();
  }

  backwardInMonths(months: number): Date {
    return moment().subtract(months, 'M').toDate();
  }

  isSame(first: string | Date, second: string | Date, unit: unitOfTime.StartOf = 'D'): boolean {
    return moment(first).isSame(second, unit)
  }
}
