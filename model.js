class ToDo {

    // static - proprietà solo della classe e non dell'oggetto
    static PRIORITY = {

        low: { order: 0, name: 'bassa', color: 'green' },
        medium: { order: 1, name: 'media', color: 'yellow' },
        high: { order: 2, name: 'alta', color: 'orange' },
        veryHigh: { order: 3, name: 'molto alta', color: 'red' },
        expired: {order: -1, name: 'scaduta', color: 'grey'}
    }

    constructor(name, priority = ToDo.PRIORITY.low, tags = []) {

        this.name = name;
        this._priority = priority;
        this.tags = tags;
        this._creationDate = new Date().getTime()
        // underscore si usa per le proprietà private non pubbliche
    }


    set priority(newPriority){
        this._priority = newPriority;
    }


    get priority(){
        return this._priority;
    }



    // trasforma il numerone alla data leggibile:
    get creationDate() {
        const date = new Date(this._creationDate);
        return date;
    }

    // per modificare la data pubblica senza rompere la proprietà privata:
    set creationDate(newDate) {

        const timeStamp = newDate.getTime();
        this._creationDate = timeStamp;
    }



    toString() {


        const todoString = 'Todo: ' + this.name + '\n' +
            //    'Priorità: ' + ToDo.fromPriorityToString(this.priority) + '\n' +
            'Priorità: ' + this.priority.name + '\n' +
            'Tags: ' + this.tags + '\n' +
            'Data di creazione: ' + this.creationDate;

        return todoString;
    }



    static getFormattedDate(date){
       
        const dateString = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();
        return dateString;

    }






    // static fromPriorityToString(selectedPriority){
    //     if (selectedPriority === 0) {
    //         return 'bassa';
    //     } else if (selectedPriority === 1) {
    //         return 'media';
    //     } else if (selectedPriority === 2) {
    //         return 'alta';
    //     } else  {
    //         return 'molto alta';
    //     }
    // }

}



class DeadLineToDo extends ToDo {

    constructor(name, deadLineDate = null, priority = ToDo.PRIORITY.low, tags = []) {
        super(name, priority, tags);
        if (deadLineDate === null) {
            this._deadLineDate = this._creationDate + (1000 * 60 * 60 * 24);
            //oppure:
            // const tomorrow = new Data(this._creationDate.getTime());
            // tomorrow.setDate(tomorrow.getDate + 1);
            // this._deadLineDate = tomorrow.getTime();

        } else {
            this._deadLineDate = deadLineDate.getTime();
        }
    }


    
    get priority() {
        const nowTimeStamp = new Date().getTime();
        const deltaTime = this._deadLineDate - nowTimeStamp;

        const day = 1000 * 60 * 60 * 24;

        let deadLinePriority;

        if (deltaTime <= day) {
            deadLinePriority = ToDo.PRIORITY.veryHigh;
        } else if (deltaTime <= 2 * day) {
            deadLinePriority = ToDo.PRIORITY.high;
        } else if (deltaTime <= 3 * day) {
            deadLinePriority = ToDo.PRIORITY.medium;
        } else {
            deadLinePriority = ToDo.PRIORITY.low;
        }


        if (this._priority.order > deadLinePriority.order) {
            return this._priority;
        } else {
            return deadLinePriority;
        }
    }


  
    set deadLineDate(newDate) {
        const timeStamp = newDate.getTime();
        this._deadLineDate = timeStamp;
    }

    

    get deadLineDate() {
        const date = new Date(this._deadLineDate);
        return date;
    }



    toString() {

        const todoString = super.toString() + '\n' +
                           'DeadLine: ' + this.deadLineDate;

        return todoString;
    }
    
}