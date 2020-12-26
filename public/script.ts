const title = <HTMLInputElement>document.getElementById('title')
const authorLast = <HTMLInputElement>document.getElementById('authorLast')
const authorFirst = <HTMLInputElement>document.getElementById('authorFirst')
const goButton = document.getElementById('go')

getBooks()
    .then(data => console.log(data))

goButton?.addEventListener('click', () => {
    if (getFormData()) {
        addbook(getFormData())
        window.location.reload()
    }
})

function getFormData() {
    let formObj = {
        'title': title.value,
        'authorLast': authorLast.value,
        'authorFirst': authorFirst.value
    }

    return formObj
}

async function getBooks() {
    const find = await fetch('/books')
    const res = await find.json()
    const resObj = await res
    return resObj
}

function addbook(book: object | null): void {
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