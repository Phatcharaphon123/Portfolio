export const API_KEY = "AIzaSyDzngQbM9xX6NeBZ06cWAOlsOVGaQbUbjw";   

export const value_converter = (value) => {
    if (value >= 1000000) {
        return Math.floor(value / 1000000) + " ล้าน";
    } else if (value >= 100000) {
        return (value / 100000).toFixed(1) + " แสน";
    } else if (value >= 10000) {
        return Math.floor(value / 10000).toFixed(1) + " หมื่น";
    } else if (value >= 1000) {
        return Math.floor(value / 1000).toFixed(1) + " พัน";
    } else {
        return value;
    }
}
