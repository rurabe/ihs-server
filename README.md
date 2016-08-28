# ihs-server
server for ihs reports app

## get started
### install dependencies

- postgresql 9.5
- nodejs 6.3

### set up db

open up a psql shell with `psql -d postgres`. you need to create a user and a database. suggested names are 'ihs' and 'ihs_development'. if you choose these names, the sql might look like this:

```
CREATE ROLE ihs LOGIN CREATEDB;
CREATE DATABASE ihs_development;
```

### update database.json
fill in the username and database that you chose above. if you used the suggestion, those values are already populated.

### install node packages and run migrations

```bash
npm install
npm run migrate
```

### start server
```bash
npm run server
```

## endpoints

### post /reports
accepts json in the body constructed as:
- longitude:decimal
- latitude:decimal
- photo:text (url to photo)
- description: text
- name: text,
- phone: text

no need to send timestamps, they will be applied automatically on the server.

responds with GeoJSON FeatureCollection that includes the newly created report.

```json
{
    "type":"FeatureCollection",
    "features":[{
        "type":"Feature",
        "geometry":{
            "type":"Point",
            "coordinates":["20.202020","10.101000"]
        },
        "properties":{
            "id":5,
            "photo":"path/to/photo",
            "description":"stuff",
            "name":"brah",
            "phone":"8888888888",
            "notes":null,
            "created_at":"2016-08-28T11:14:27.667Z",
            "updated_at":"2016-08-28T11:14:27.667Z"
        }
    }]
}
```

### get /reports
accepts nothing at the moment

responds with GeoJSON FeatureCollection of every report in the reports table ordered by created_at descending.