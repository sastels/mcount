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

The manifest files currently point to docker images in DockerHub.

### Setup Azure

```
az login

az group create --name sja-test-ResourceGroup --location eastus
az aks create --resource-group sja-test-ResourceGroup --name sja-test-cluster --node-count 1 --enable-addons monitoring --generate-ssh-keys

az aks get-credentials --resource-group sja-test-ResourceGroup --name=sja-test-cluster
```

And when you're done

```
az group delete --name sja-test-ResourceGroup --yes --no-wait
```

### Setup Google Cloud

Make a new project `sja-test-project` and enable Kubernetes Engine API for it.

```
gcloud auth login

gcloud config set project sja-test-project
gcloud config set compute/zone northamerica-northeast1
gcloud container clusters create --num-nodes=1 sja-gc-cluster

gcloud container clusters get-credentials sja-gc-cluster
```

### Deploy

```
kubectl config get-contexts      # ensure we're connected to the new cluster

kubectl create -f frontend/manifests/frontend-deployment.yaml
kubectl create -f frontend/manifests/frontend-service.yaml
kubectl create -f api/manifests/api-deployment.yaml
kubectl create -f api/manifests/api-service.yaml
```

To get the IP to connect to frontend, run

```
kubectl get service
```
