# container
  Inversion of Control container

## Usage
```javascript
var app = new Container()

app.set('name', function () {
    return 'wryk'
})

app.set('greet', function () {
    return function greet (name) {
        return 'Hello ' + name + ' !'
    }
})

app.set('', function (container) {
    var greet = container.get('greet')
    var name = container.get('name')

    return greet(name)
})

app.get('') // => "Hello wryk !"
```

## API
  * Container
    * #invoke(provider)
    * #has(name)
    * #set(name, provider)
    * #get(name)

## Running tests
```bash
$ component build --dev
$ open test/index.html
```

## License
  MIT
