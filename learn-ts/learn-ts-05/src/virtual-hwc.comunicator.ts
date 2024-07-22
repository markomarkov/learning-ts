import {Injectable} from '@nestjs/common';
import {EventEmitter} from 'node:events';
import { HwcEvents, HwcMessage, HwcStates, WheelData, mechanicalButtons, fingerprint, tableStatus } from './hwc-types';

@Injectable()
export class VirtualHwcCommunicator extends EventEmitter{
    private updateTimer?: NodeJS.Timeout;
    private spinTimer?: NodeJS.Timeout;
    private spinCount = 0;
    private spinTime = 2000;
    private spinDuration = 5000;
    private spinOutcome = 0;
    private spinOutcomeTime = 1000;
    private spinOutcomeCount = 0;
    private spinOutcomeMax = 15;
    // private randomSpinDirection = () => Math.random() > 0.5 ? 1 : -1;
    private randomSpinOutcome = () => Math.floor(Math.random() * 37);
    private randomSpinOutcomeTime = () => Math.floor(Math.random() * 1000) + 500;
    private randomWheelSpinOutcomeCount = () => Math.floor(Math.random() * this.spinOutcomeMax) + 1;
    private randomBallSpinOutcomeCount = () => Math.floor(Math.random() * this.spinOutcomeMax) + 1;
    private randomDisconnect = false;

    constructor() {
        super();
    }

    private spin(): void {
        console.log('spin');
    }
    
}

/*
write a hwc simulator that uses one after another the states in HwcStates and on every state sends a message with signature WheelData after state outcome it sends mechanicalButtons package 
the simulator should have a spin method that will simulate a spin of the wheel and will send messages with signature HwcMessage
the simulator should have a disconnect method that will simulate a disconnect and will send a message with signature HwcMessage
the simulator should have a connect method that will simulate a connect and will send a message with signature HwcMessage
the simulator should have a fingerprint method that will simulate a fingerprint and will send a message with signature fingerprint
the simulator should have a tableStatus method that will simulate a tableStatus and will send a message with signature tableStatus
the simulator should have a mechanicalButtons method that will simulate a mechanicalButtons and will send a message with signature mechanicalButtons
the simulator should have a randomDisconnect method that will simulate a randomDisconnect and will send a message with signature HwcMessage
the simulator should have a randomSpinOutcome method that will simulate a randomSpinOutcome and will send a message with signature WheelData


*/