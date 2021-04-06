This app was built from scratch to practice using Docker and Kubernetes.

The app reports the number of days since the current President of the Treasury Board took office.

There are two parts:

- a frontend react app
- a backend api containing the name and tenure of the recent Presidents of the Treasury Board

No political statement is intended. It simply struck me on the bus home one day (a day when the President of TBS had resigned) that it might be a good, easy example to use to learn k8s with.

## docker-compose

Locally you can run the two apps using docker:

```
docker-compose up
```

## Setup kubernetes

You can also deploy the two parts and relevant services to k8s using the files in the `manifest` directories (this is the whole point).

The manifest files point to my docker images in DockerHub.

### Minikube

```
minikube start
```

### Kind

```
kind create cluster --config kind-config.yaml
```

### Azure

```
az login

az group create --name sja-test-ResourceGroup --location eastus
az aks create --resource-group sja-test-ResourceGroup --name sja-test-cluster --node-count 1 --enable-addons monitoring --generate-ssh-keys

az aks get-credentials --resource-group sja-test-ResourceGroup --name=sja-test-cluster
```

### Google Cloud

In the Google Cloud [console](https://console.cloud.google.com/) make a new project `sja-test-project` and enable Kubernetes Engine API for it. Then run the following.

```
gcloud auth login

gcloud config set project sja-test-project
gcloud config set compute/zone northamerica-northeast1
gcloud container clusters create --num-nodes=1 sja-gc-cluster

gcloud container clusters get-credentials sja-gc-cluster
```

## Deploy

Check that `kubectl` is connected to the cluster you just created.

```
kubectl config get-contexts
```

Now use kustomize to deploy the appropriate overlay.

```
kubectl apply -k manifests/overlays/minikube
```

where `minikube` may be replaced by `kind`, `aks` or `gke`.

To get the IP to connect to frontend, run

```
kubectl get service
```

or

```
minikube service --url frontend-service
```

## Clean Up

Don't forget to delete the projects when you're done, so that Microsoft and/or Google don't bankrupt you.

### Minikube

```
minikube delete
```

### Kind

```
kind delete cluster
```

### Azure

```
az group delete --name sja-test-ResourceGroup --yes --no-wait
```

### Google

```
gcloud container clusters delete sja-gc-cluster
```

You can delete the project via the [console](https://console.cloud.google.com/).
