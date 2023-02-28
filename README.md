# Special-Traffic-Authorization
Project for Denatran, Federal Department of Traffic in Brazil for authorization of long vehicles on public roads

The project consists of checking bridges, tunnels, obstacles that may prevent vehicles longer than 20 meters from traveling on Brazilian public roads.

In the administrator panel, bridges, tunnels... must be registered, informing height and width where it will be compared with the size of the vehicle and if there is a possibility of traveling through the road.

Just mark the starting and ending points on the map and the route is traced and checked if there are any obstacles. The route can be redone directly from the map, changing the streets where a new verification will be performed automatically.

As they are very large vehicles, over 20 meters, some roads do not support the width and height of the vehicle.

This verification takes around 20 days to complete, but now we do it in less than 1 minute.

- Using geolocation with directionsService, displayRoute.

- Turf.js geospatial library

- Javascript, JQuery, Ajax,

- C# (Server - Admin)

Operation:
- Enter the admin by informing login and password.
- Click directly on the map to inform the location of the bridge or tunnel you want to register.
- The system returns the coordinates and the name of the street through geolocation.
- Inform the width, height and supported weight.
- Click save.
- Go to the map and mark a starting point and an ending point, where the long vehicle will pass.
- The system automatically traces the route and shows the location of each work on the route, as well as whether or not it is compatible with the vehicle.
- Icons are displayed on the map and information on the side panel.
- If the work is compatible with the vehicle, it will be in green, if it is not compatible it will be in red.

This system allows or not the circulation of vehicles on city streets.
A vehicle that is 6 meters high cannot pass through a tunnel that is 5 meters high, or a vehicle weighing 10 tons cannot pass through a bridge that supports 7 tons.



https://user-images.githubusercontent.com/28272136/221728382-7be661b9-8594-406b-bc1e-8c8d01814c19.mp4

