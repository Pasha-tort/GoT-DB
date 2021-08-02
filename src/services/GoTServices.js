export default class GoTServices {
    constructor() {
        this._apiBase = "https://anapioficeandfire.com/api";
        this._characterAll = "/characters";
        this._booksAll = "/books";
        this._housesAll = "/houses";
        this.page = 5;
        this.pageSize = 10;
    } 
     getResource = async(url) => {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Не получилось сделать запрос по адресу: ${this._apiBase}${url}, статус: ${res.status}`);
        }
        return await res.json();
    }

    getCharactersAll = async(page, size) => {
        const res = await this.getResource(`${this._characterAll}?page=${page}&pageSize=${size}`);
        await res.map(this._transformCharacter);
        return await res.filter(char => char.name !== "Неизвестно");
    }
    getCharacter = async(id) => {
        const res = await this.getResource(`/characters/${id}`);
        return await this._transformCharacter(res);
    }

    getBooksAll = async() => {
        const res = await this.getResource(`${this._booksAll}?page=1&pageSize=12`);
        return await res.map(this._transformBook);
    }
    getBook = async(id) => {
        const res = await this.getResource(`/books/${id}`);
        return await this._transformBook(res);
    }

    getHousesAll = async(page, size) => {
        const res = await this.getResource(`${this._housesAll}?page=${page}&pageSize=${size}`);
        return await res.map(this._transformHouse);
    }
    getHouse = async(id) => {
        const res = await this.getResource(`/houses/${id}`);
        return await this._transformHouse(res);
    }

    _transformItemUndefiend(obj) {
        for(let key in obj) {
            if (obj[key] === "" || obj[key] === undefined) {
                obj[key] = "Неизвестно"
            }
            if (key === "released") {
                obj[key] = obj[key].slice(0, 10);
            }
        }
    }

    _transformCharacter = (char) => {
        this._transformItemUndefiend(char);
        return {
            url : char.url,
            name: char.name,
            gender: char.gender,
            culture: char.culture,
            born: char.born,
            died: char.died,
        }
    }

    _transformBook = (book) => {
        this._transformItemUndefiend(book);
        return {
            url : book.url,
            name: book.name,
            numberOfPages: book.numberOfPages,
            publisher: book.publisher,
            released: book.released,
        }
    }

    _transformHouse = (house) => {
        this._transformItemUndefiend(house);
        return {
            url : house.url,
            name: house.name,
            region: house.region,
            words: house.words,
        }
    }

}