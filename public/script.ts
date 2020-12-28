type BookData = {
    title: string;
    authorLast: string;
    authorFirst: string;
};

type ResultsData = {
    id: string;
    title: string;
    authorLast: string;
    authorFirst: string;
};

const title = <HTMLInputElement>document.getElementById('title')
const authorLast = <HTMLInputElement>document.getElementById('authorLast')
const authorFirst = <HTMLInputElement>document.getElementById('authorFirst')
const goButton = <HTMLButtonElement>document.getElementById('go')
const results = <HTMLElement>document.getElementById('results')
// on load, 
window.addEventListener('load', (e: Event) => {
    e.preventDefault()
    getBooks()
    .then(data => setResults(data))
    .catch(err => console.log(err.message))
})

document.addEventListener('click', (e: Event) => {
    e.preventDefault()
    const target = e.target as HTMLTextAreaElement;
    if (target.id !== "" && target.id !== 'title' && target.id !== 'authorLast' && target.id !== 'authorFirst' && target.id !== 'go') {
        tossBook(target.id)
        getBooks()
        .then(data => setResults(data))
        .catch(err => console.log(err.message))
    }
})

goButton.addEventListener('click', () => {
    if (getFormData() === undefined) {
        alert('each field must have a value')
        return;
    }
    else {
        addBook(getFormData()!)
        emptyFormDivs()
        getBooks()
        .then(data => setResults(data))
        .catch(err => console.log(err.message))
    }
})

function setResults(array: Array<ResultsData>): void {
    if (array) {
        results.textContent = ""
        results.innerHTML = "<table></table>"
        array.map(book => {
            results.innerHTML += `<li id=${book.id}><strong>Title: </strong>${book.title}; <strong>Author: </strong>${book.authorLast}, ${book.authorFirst}</li>`
        })
    }
}

function getFormData(): BookData | undefined{
    if (!title.value || !authorLast.value || !authorFirst.value) {
        return;
    } 
    const formObj: BookData = {
        title: title.value.toString(),
        authorLast: authorLast.value.toString(),
        authorFirst: authorFirst.value.toString()
    }
    return formObj;
}

async function getBooks(): Promise<any> {
    const find = await fetch('/books')
    const res: Array<BookData> = await find.json()
    return res;
}

function addBook(book: BookData): void | undefined {
    if (!book) {
        return;
    }
    else {
        fetch('/books', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        })
        .then(res => res.json())
        .then(data => console.log('data added: ', data))
    }
}

function tossBook (id: String): void | undefined {
    if (!id) {
        return;
    }
    else {
        fetch('/books/delete'+id, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id})
        })
        .then(res => res.json())
        .catch(err => console.log(err.message))
    }
}

function emptyFormDivs():void {
    title.value = ''
    authorLast.value = ''
    authorFirst.value = ''
}