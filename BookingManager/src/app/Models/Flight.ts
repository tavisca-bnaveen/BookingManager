import { FlightType } from './FlghtType';
import { FlightStatus } from './FlightStatus';

export class Flight{
    pnr: string;
    type: FlightType;
    source: Array<string>;
    destination: Array<string>;
    deparatureTimes: Array<string>;
    arrivalTimes:Array<string>;
    status:FlightStatus;
    cost:string;
    discount:string;
    passengerCount:string;
    airlineDetails:Array<string>;
}