# DevOps Todo App

A simple Task Manager built with the MERN stack, demonstrating a complete DevOps pipeline.

## Architecture

- **Frontend:** React (served via nginx)
- **Backend:** Node.js + Express
- **Database:** MongoDB
- **CI:** GitHub Actions
- **CD:** ArgoCD + GKE (Google Kubernetes Engine)
- **Registry:** GCP Artifact Registry
- **Security:** Trivy + Semgrep + npm audit
- **Monitoring:** Prometheus + Grafana

## Project Structure

\`\`\`
devops-todo/
├── frontend/          # React application
├── backend/           # Express API
├── docker/            # Dockerfiles + nginx config
├── k8s/               # Kubernetes manifests
└── .github/workflows/ # CI/CD pipelines
\`\`\`

## Local Development

\`\`\`bash
docker compose up --build
\`\`\`

- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Health: http://localhost:5000/health

## CI/CD Pipeline

Every push to \`main\` triggers:
1. Lint + Tests
2. SonarQube analysis
3. Docker build + Trivy security scan
4. Push to GCP Artifact Registry
5. ArgoCD auto-deploys to GKE
