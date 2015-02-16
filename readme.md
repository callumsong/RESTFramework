This framework creates and deletes 'zoodle' files. For example if a post request is made, a file named zoodle1.json will be created on the data directory. If you wish to delete all your zoodles, use '/zoodles' as a url and send the delete request.

In order to add routes, use the app.addRoute() function, and add your required url. The app.zing() function will create the server. Otherwise it processes all the REST requests as per normal.

I also used the fs-extra package by jprichardson.