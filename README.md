# sre-take-home

#  SRE Take-Home Assignment

## 1.  Project Overview

This project demonstrates a production-grade monorepo architecture for managing two backend services — one in Go and one in Node.js — with automated CI/CD and Kubernetes deployment. The goal is to showcase skills in DevOps, containerization, CI/CD pipelines, and infrastructure management using modern tools.

---

## 2.  Monorepo Structure
sre-take-home/

├── go-service/ # Simple Go HTTP service

│ ├── main.go

│ ├── go.mod

│ └── Dockerfile

├── node-service/ # Basic Node.js/Express app

│ ├── app.js

│ ├── package.json

│ └── Dockerfile

├── k8s/ # Kubernetes manifests

│ ├── go-service.yaml

│ └── node-service.yaml

└── .github/

└── workflows/

└── ci-cd.yml # GitHub Actions pipeline


---

## 3. Technology Stack

| Component       | Description                                |
|----------------|--------------------------------------------|
| **Languages**   | Go, Node.js (JavaScript)                  |
| **Containers**  | Docker                                    |
| **Registry**    | GitHub Container Registry (GHCR)          |
| **CI/CD**       | GitHub Actions                            |
| **Orchestration** | Kubernetes (manifests provided)          |
| **Secrets**     | GitHub Actions Secrets (`GHCR_PAT`)       |

---

## 4. My Approach

1. **Code Organization**: Used a clean monorepo pattern with isolated services.
2. **Dockerization**: Both services are containerized with optimized Dockerfiles.
3. **CI/CD**:
   - Docker builds and pushes images to GHCR.
   - Kubernetes YAMLs are uploaded as build artifacts.
4. **Kubernetes-Ready**: Provided manifests for easy deployment to any K8s cluster.
5. **Security**: Authentication to GHCR uses GitHub Secrets.

---

## 5. CI/CD Pipeline Workflow

### Trigger:  
Push to `main` branch

### Steps:
1. Checkout code
2. Log in to GitHub Container Registry using `GHCR_PAT`
3. Build & push Docker image for:
   - `go-service`
   - `node-service`
4. Upload `k8s/` manifests as GitHub Action artifacts

### Secrets Required:
- `GHCR_PAT`: A GitHub Personal Access Token with `write:packages`, `read:packages`, and `repo` scopes

---

## 6.  How to Run / Test

### Local Testing

#### Go Service
```bash
cd go-service
go run main.go
# or
docker build -t go-service .
docker run -p 8080:8080 go-service
```
#### Node.js Service
```bash
cd node-service
npm install
node app.js
# or
docker build -t node-service .
docker run -p 3000:3000 node-service
```

#### CI/CD Deployment

Push to main:
``` 
bash
Copy
Edit
git add .
git commit -m "Trigger CI/CD"
git push origin main
```
GitHub Actions will:
* Build Docker images
* Push to GHCR
* Upload Kubernetes YAMLs

#### Kubernetes Deployment
##### Obtaining Manifests
1. After a successfull run og the Github Actions CI/CD Pipeline, donwload the kubernetes manifest artifacts from the summary page on the workflow run
2. Extract on local

##### Applying manifests
Ensure 'kubectl' configured to point to your target kubernetes cluster 

1. Apply the go service manifest
```bash
kubectl apply -f /path extracted/k8s-manifest/
```
2. Check Deployment status
```bash
kubectl get pods
kubectl get services
```


## Monitoring Design
propose using Prometheus and Grafana for application and infrastructure monitoring.

Tools:
* Prometheus – Metrics collection and alerting.
* Grafana – Dashboard visualization.
* kube-state-metrics – Monitors Kubernetes resources.
* node-exporter – Monitors node-level system metrics.

Logging Design
recommend using a centralized logging stack like the EFK stack:

Tools:
* Fluent Bit – Lightweight log collector
* Elasticsearch – Log storage and search
* Kibana – Visualization

