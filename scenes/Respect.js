export default class Respect {
    constructor() {
        if (Respect.instance) {
            return Respect.instance; 
        }
        this.value = 100;
        Respect.instance = this;
    }

    decrease(amount) {
        this.value = Math.max(0, this.value - amount);
    }

    getValue() {
        return this.value;
    }
}