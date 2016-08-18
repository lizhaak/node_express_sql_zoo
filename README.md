# node_express_sql_zoo

## Takeaways

* Able to connect to your Postgres database using the `pg` module
* You need to know the URI for the database (see `connectionString` in server/routes/animals.js)
* Using `pg.connect(...)` to connect to the database
* Using `client.query(...)` to query the database with SQL
* Using GET ajax call to retreive animals already in the database
* Using POST ajax call to add a new animal to the database
* within the animals.js file we are using another module (randomNumber.js) to retrieve a random number for
the count of that animal type.
