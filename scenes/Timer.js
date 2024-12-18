export default class Timer {
    constructor() {
        if (Timer.instance) {
            return Timer.instance; 
        }

        Timer.instance = this;

        this.timeLeft = 120; 
        this.interval = null;
        this.callback = null; 

        return this;
    }

    start() {
        
        if (!this.interval) {
            this.interval = setInterval(() => {
                this.timeLeft--;

                if (this.callback) {
                    this.callback(this.timeLeft);
                }

                if (this.timeLeft <= 0) {
                    this.stop();
                }
            }, 1000);
        }
    }

    stop() {
        clearInterval(this.interval);
        this.interval = null;
    }

    reset(time = 60) {
        this.timeLeft = time;
        this.stop();
        this.start(); 
    }

    setCallback(callback) {
        this.callback = callback;
        if (this.callback) this.callback(this.timeLeft);
    }

    getTimeLeft() {
        return this.timeLeft;
    }
}