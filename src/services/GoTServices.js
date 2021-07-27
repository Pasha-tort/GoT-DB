export default class GoTServices {
    constructor() {
        this._apiBase = "https://anapioficeandfire.com/api";
        this._characterAll = "/characters";
        this._booksAll = "/books";
        this._housesAll = "/houses";
        this.page = 5;
        this.pageSize = 10;
    } 
    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Не получилось сделать запрос по адресу: ${this._apiBase}${url}, статус: ${res.status}`);
        }
        return await res.json();
    }

    async getCharactersAll(page, size) {
        const res = await this.getResource(`${this._characterAll}?page=${page}&pageSize=${size}`);
        await res.map(this._transformCharacter);
        return res.filter(char => char.name !== "Неизвестно");
    }
    async getCharacter(id) {
        const res = await this.getResource(`/characters/${id}`);
        return await this._transformCharacter(res);
    }

    async getBooksAll() {
        const res = await this.getResource(`${this._booksAll}?page=1&pageSize=12`);
        return await res.map(this._transformBook);
    }
    async getBook(id) {
        const res = await this.getResource(`/books/${id}`);
        return await this._transformBook(res);
    }

    async getHousesAll(page, size) {
        const res = await this.getResource(`${this._housesAll}?page=${page}&pageSize=${size}`);
        return await res.map(this._transformHouse);
    }
    async getHouse(id) {
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