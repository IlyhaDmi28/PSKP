const EventEmitter = require("events");

function IsCorrectObject(obj) {
    return obj.ID != undefined && obj.FIO != undefined && obj.BDay != undefined && obj.ID >= 1;
}

function IsCorrectDateBirthday(obj) { 
    return new Date(obj.BDay) < new Date();
}


class DB extends EventEmitter {
    constructor(){
        super();
        this.db_data = 
        [
            {
                ID:"1",
                FIO: "Dmitruk I.I.", 
                BDay: "2004-01-28"
            },
            {
                ID:"2",
                FIO: "Bogdanov A.V.", 
                BDay: "2004-09-20"
            },
            {
                ID:"3",
                FIO: "Zykov K.D.", 
                BDay: "2004-08-28"
            },
            {
                ID:"4",
                FIO: "Metlushko A.N.", 
                BDay: "2004-05-20"
            },
                        
        ]
    }

    async select() {
        return this.db_data
    }

    async insert(obj) {
        if(!IsCorrectObject(obj)) {
            console.log("Ошибка: пользователь указан некорректно");
        }
        if(this.db_data.find(item => item.ID === obj.ID) != undefined) {
            console.log("Ошибка:Пользователь существует");
        }
        else if(!IsCorrectDateBirthday(obj)) {
            console.log("Ошибка: дата дня рождения болше текущей даты.");
        }
        else {
            this.db_data.push({ID : obj.ID, FIO : obj.FIO, BDay: obj.BDay});
        }
    }

    async update(obj) {
        if(!IsCorrectObject(obj)) {
            console.log("Ошибка: пользователь указан некорректно");
        }
        if(this.db_data.find(item => item.ID === obj.ID) == undefined) {
            console.log("Ошибка: пользователя не существует");
        }
        else if(!IsCorrectDateBirthday(obj)) {
            console.log("Ошибка: дата дня рождения болше текущей даты.");
        }
        else {
            let findElem = this.db_data.find(item => item.ID === obj.ID)
            
            let index = this.db_data.indexOf(findElem);
            this.db_data[index] = obj;
        }
    }

    async delete(id) {
        let findElem = this.db_data.find(item => item.ID === id);

        if(findElem != undefined) {
            let index = this.db_data.indexOf(findElem);
            if(index !== -1) this.db_data.splice(index, 1);
        }
        else console.log("Ошибка: пользователя не существует")
        console.log(this.db_data);
    }
}

exports.DB = DB;