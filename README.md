# Dead simple react async hook 

*@tutanck/react-async* offers only 2 hooks :
* **useAsync**: run an async function and allows to follow its execution status.

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

  useEffect(fetchProducts, []); // first fetch

  // Will run 'fetchProducts' whenever 
  // addStatus, updateStatus or removeStatus 
  // is equal to 'done'.
  
  useOnDone(fetchProducts, [addStatus, updateStatus, removeStatus]); // refresh on change

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
          disabled={addStatus === 'loading'} 
          onClick={(id) => removeProduct(id)}
        >
            Delete
        </Button>
    </div>  
  );
}
```
You can find the [full working example here.](https://github.com/tutanck/Babazon)

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
 useOnDone(fn, deps);
```
### **Parameters**

1. fn: Whatever function you want (async or not).
2. deps: An array of *status* dependencies
### **Return value**

No return value.


