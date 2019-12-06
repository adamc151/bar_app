export const getCityCoordinates = (city) => {
    switch (city) {
        case 'leeds':
            return [53.8008, 1.5491];
        default:
            return [null, null];
    }
}