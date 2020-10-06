import { FlightType } from './FlghtType';
import { FlightStatus } from './FlightStatus';

export class Flight{
    PNR: string;
    Type: FlightType;
    source: Array<string>;
    destination: Array<string>;
    DeparatureTimes: Array<string>;
    ArrivalTimes:Array<string>;
    Status:FlightStatus;
    cost:string;
    discount:string;
    PassengerCount:string;
    AirlineDetails:Array<string>;
}