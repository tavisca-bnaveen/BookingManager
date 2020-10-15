import { Car } from './Car';
import { Flight } from './Flight';
import { Hotel } from './Hotel';
import { OverallStatus } from './OverallStatus';

export class Trip{
    id:string;
    bookedDate:string;
    flight:Flight;
    hotel:Array<Hotel>;
    car:Array<Car>;
    totalCost:string;
    status:OverallStatus;
}