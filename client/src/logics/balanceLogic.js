
export const getBalanceCheckMessage = (availableBalance, requiredBalance) => {
    if (availableBalance.zgold < requiredBalance.zgold && availableBalance.diamond < requiredBalance.diamond) {
        return `More zgold (${requiredBalance.zgold - availableBalance.zgold} more) and more diamond (${requiredBalance.diamond - availableBalance.diamond} more) needed.`;
    } else if (availableBalance.zgold < requiredBalance.zgold) {
        return `More zgold (${requiredBalance.zgold - availableBalance.zgold} more) needed.`;
    } else if (availableBalance.diamond < requiredBalance.diamond) {
        return `More diamond (${requiredBalance.diamond - availableBalance.diamond} more) needed.`;
    }
    return null; // Return null if balance meets or exceeds requiredBalance
};