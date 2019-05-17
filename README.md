This app was built from scratch to practice using Docker and Kubernetes.

The app reports the number of days since the current President of the Treasury Board took office.

There are two parts:

- a frontend react app
- a backend api containing the name and tenure of the recent Presidents of the Treasury Board

No political statement is intended. It simply struck me on the bus home one day (a day when the President of TBS had resigned) that it might be a good, easy example to use to learn k8s with.

## Local

Locally you can run the two apps using docker:

```
docker-compose up
```

## Cloud

You can also deploy the two parts and relevant services to k8s using the files in the `manifest` directories (this is the whole point).

The manifest files point to my docker images in DockerHub.

### Setup Azure

```
az login

az group create --name sja-test-ResourceGroup --location eastus
az aks create --resource-group sja-test-ResourceGroup --name sja-test-cluster --node-count 1 --enable-addons monitoring --generate-ssh-keys

az aks get-credentials --resource-group sja-test-ResourceGroup --name=sja-test-cluster
```

### Setup Google Cloud

In the Google Cloud [console](https://console.cloud.google.com/) make a new project `sja-test-project` and enable Kubernetes Engine API for it.

```
gcloud auth login

gcloud config set project sja-test-project
gcloud config set compute/zone northamerica-northeast1
gcloud container clusters create --num-nodes=1 sja-gc-cluster

gcloud container clusters get-credentials sja-gc-cluster
```

### Deploy

Check that `kubectl` is connected to the cluster you just created.

```
kubectl config get-contexts
```

Now deploy the pods and services.

```
kubectl create -f frontend/manifests/frontend-deployment.yaml
kubectl create -f frontend/manifests/frontend-service.yaml
kubectl create -f api/manifests/api-deployment.yaml
kubectl create -f api/manifests/api-service.yaml
```

To get the IP to connect to frontend, run

```
kubectl get service
```

## Clean Up

Don't forget to delete the projects when you're done, so that Microsoft and/or Google don't bankrupt you. On Azure use

```
az group delete --name sja-test-ResourceGroup --yes --no-wait
```

while on Google Cloud you can delete the project via the [console](https://console.cloud.google.com/).
