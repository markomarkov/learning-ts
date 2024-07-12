type WheelOutput = {
    wheelNum: number;
}

let fetchWheelOutput = (): Promise<WheelOutput> => {
    const wheelNum = 1;
    return Promise.resolve({wheelNum});
}