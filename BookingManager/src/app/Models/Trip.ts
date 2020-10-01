import { Car } from './Car';
import { Flight } from './Flight';
import { Hotel } from './Hotel';
import { OverallStatus } from './OverallStatus';

export class Trip{
    Id:string;
    BookedDate:string;
    Flight:Flight;
    Hotel:Array<Hotel>;
    Car:Array<Car>;
    TotalCost:string;
    status:OverallStatus;
}