# Dead simple react async hook 

*@tutanck/react-async* offers only 2 hooks :
* **useAsync**: run an async function and allows you to follow its execution status.

* **useOnDone**: execute a callback whenever at least one of its dependencies is 'done'.

## Example

 ```JavaScript
import { fetch, add, update, remove } from 'src/api/products';
import { useAsync, useOnDone } from '@tutanck/react-async';

export default function App({ onError }) {
  const [products, setProducts] = useState([]);

  const [fetchProducts, fetchStatus] = useAsync(fetch);
  const [addProduct, addStatus] = useAsync(add);
  const [updateProduct, updateStatus] = useAsync(update);
  const [removeProduct, removeStatus] = useAsync(remove);

  const fetchAndSet = () => fetchProducts().then(setProducts).catch(onError);

  useEffect(fetchAndSet, []); // first fetch

  // Will run 'fetchProducts' whenever 
  // addStatus, updateStatus or removeStatus 
  // is equal to 'done'.
  useOnDone(fetchAndSet, [addStatus, updateStatus, removeStatus]);

  return fetchStatus === 'loading' ? (
    <LinearProgress />
  ) : (
    <div>
        <Button 
          disabled={addStatus === 'loading'} 
          onClick={() => addProduct()}
        >
            Create
        </Button>

        <Button 
          disabled={removeStatus === 'loading'} 
          onClick={(id) => removeProduct(id)}
        >
            Delete
        </Button>
    </div>  
  );
}
```
You will find the [full working example here.](https://github.com/tutanck/Babazon)

## API

> ## useAsync
### **Syntax**

```JavaScript
 useAsync(asynFn);
```
### **Parameters**

1. asynFn: Whatever async function you want.
### **Return value**

An array of 2 elements in this order:
1. The async function (asyncFn) you passed in parameter.
2. An execution status between:
    - *undefined*
    - *'loading'*
    - *'error'*
    - *'done'*


> ## useOnDone
### **Syntax**

```JavaScript
 useOnDone(fn, statusDeps);
```
### **Parameters**

1. fn: Whatever callback function you want (async or not).
2. statusDeps: An array of *status* dependencies.
### **Return value**

No return value.


