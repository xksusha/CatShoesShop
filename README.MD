
# Cat Shoes Shop

This project implements the web API for a shop selling cat shoes.
Every order is identified by the list of order items. Each order item corresponds to the product and to the number of paws the customer is to dress.


## Swagger

http://opply-test.herokuapp.com/playground

### Authentication

1. Fill in username and password for api-token-auth endpoint to get USER_TOKEN
2. Using "Authorize" button at the upper right corner, input the following string:
```Token USER_TOKEN```
3. You can then perform the order requests that require user authentication

## Admin

http://opply-test.herokuapp.com/admin

## Tests

```python3 manage.py test catShoesStore.views_tests```


## ToDo

- Better test coverage; notably, permissions
- Better API documentation: payload description and validations, expected responses
- CI/CD
- Stable DB deployment (currently using ephemere sqlite)
- Handle exceptions: relationships edge cases (missing product/order id)


