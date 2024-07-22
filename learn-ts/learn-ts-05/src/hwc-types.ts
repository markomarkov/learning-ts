export enum HwcEvents {
    Connect = 'w.connect',
    Disconnect = 'w.disconnect',
    Outcome = 'w.outcome',
    SpinStart = 'w.spin-start',
    ConfirmOutcome = 'w.confirm-outcome',
    Unknown = 'w.unknown'
}

export enum HwcStates {
    init = 'init',
    idle = 'idle',
    bet = 'bet',
    final_bet = 'final_bet',
    nmb = 'nmb',
    outcome = 'outcome',
    game_stopped = 'game_stopped',
    error = 'error',
    unknown = 'unknown'
}

export enum directions {
    clockwise = 'clockwise',
    counter_clockwise = 'counter_clockwise'
}

export interface WheelData {
    ts: number;
    state: HwcStates;
    event: number;
    ballRevolution: number;
    wheelRevolution: number;
    spinTime: number;
    connectError: boolean;
    wheelError: boolean;
    ballError: boolean;
    data: {
        winningNumber: number;
        wheelEventData: string;
        errorMessageId: number;
        errorMessageText: string;
        errorMessageTimeStamp: number;
    }
}

export interface HwcMessage {
    event: HwcEvents;
    data: WheelData;
}

// export interface HwcMessageEvent {
//     data: HwcMessage;
// }

export interface mechanicalButtons {
    buttonPressed: number;
}

export interface fingerprint {
    fingerprintScanner: string;
}

export interface tableStatus {
    wheelSpeed: number;
    wheelRevolution: number;
    wheelDirection: directions;
    ballSpeed: number;
    ballRevolution: number;
    ballDirection: directions;
}