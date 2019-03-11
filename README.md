This app was built from scratch to practice using Docker and Kubernetes.

The app reports the number of days since the current President of the Treasury Board took office.

There are two parts:
- a frontend react app
- a backend api containing the name and tenure of the recent Presidents of the Treasury Board

No political statement was intended. It simply struck me on the bus home one day (a day when the President of TBS had resigned) that it might be a good, easy example to use to learn k8s with.

Locally you can run the two apps via
```
node api/index.js
cd frontend && yart start
```
or using docker with
```
docker-compose up
```

You can also deploy the two parts and relevant services to k8s on Google Cloud using the files in the `manifest` directories (this... is the whole point).