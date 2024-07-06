function isAllUpper(str: string): boolean {
    if (str === "") {
        return true;
    }

    for (let i = 0; i < str.length; i++) {
        if (str[i] >= "a" && str[i] <= "z") {
            return false;
        }
    }

    return true;
}