function load(): any {
    fetch('/books')
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err.message))
}

load()