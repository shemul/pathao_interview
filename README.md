# REST Key-Value Store
To Start the project 

> docker-compse up

## Endpoints

> **GET /values**

Fetch all the key-values from Database. If any pair exceed the TTL then it will immediately delete from database. otherwise it will reset the TTL.

> **GET /values?keys=key1,key2,key3**

Fetch key-values from Database according to queries param . If any pair exceed TTL then it will immediately delete from database. otherwise it will reset the TTL.

> **POST /values**

    { "key1" : "val1" , "key2" , "val2"}
Create Key-value pair to the database. If any exists it will update otherwise create.

> **PATCH /values**

    { "key1" : "val1" , "key2" , "val2"}

It will Update any existing key-values and reset the TTL  

 