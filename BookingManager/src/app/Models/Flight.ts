import { FlightType } from './FlghtType';
import { FlightStatus } from './FlightStatus';

export class Flight{
    PNR: string;
    Type: FlightType;
    source: Array<string>;
    destination: Array<string>;
    dates: Array<string>;
    journeytimes:Array<string>;
    Status:FlightStatus;
    cost:Array<string>;
    PassengerCount:string;

}