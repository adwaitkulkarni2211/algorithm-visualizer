# Design

## Context

The Algorithm Visualizer is a client-side Single Page Application (React 19 + Vite 8). It does not require a persistent backend or database. It will be hosted on Google Cloud Platform under project `algorithm-visualizer-adwait` in region `asia-south1` (Mumbai). Infrastructure is managed by Terraform, and deployments are automated via GitHub Actions on merges to `main`. See `proposal.md` for motivation.

## Goals / Non-Goals

**Goals:**
- Containerize the static SPA with a multi-stage Docker build (`node:22-alpine` for `vite build`, `nginx:alpine` for serving).
- Configure Nginx with proper SPA routing (`try_files $uri $uri/ /index.html`).
- Manage infrastructure reproducibly using Terraform in a dedicated `terraform/` directory.
- Use a dedicated Google Cloud Storage (GCS) bucket (`algorithm-visualizer-adwait-tfstate`) for secure, remote Terraform state tracking with automatic state locking.
- Execute an initial manual deployment using Google Cloud Build (`gcloud builds submit`) to populate Artifact Registry and verify Cloud Run v2 provisioning.
- Establish an automated GitHub Actions workflow (`.github/workflows/deploy.yml`) using a dedicated GCP Service Account to build, test, and deploy new revisions on pushes to `main`.
- Update `docs/architecture.md` with complete documentation for hosting topology, Terraform usage, and CI/CD operations.

**Non-Goals:**
- Custom domain mapping or Cloud DNS configuration (the default `*.run.app` URL with automated managed SSL is used).
- Multi-environment staging pipelines (single production environment).

## Decisions

### 1. Multi-Stage Docker Build with Nginx Alpine
- **Choice**: Multi-stage `Dockerfile` (Stage 1: `node:22-alpine` runs `npm ci && npm run build`; Stage 2: `nginx:alpine` copies `dist/`).
- **Rationale**: Keeps final production image size around ~25MB, ensuring near-instant container startup (cold starts under 1–2 seconds) and zero Node.js runtime overhead or attack surface in production.
- **Alternatives considered**:
  - *Node-based web server (`serve` or `express`)*: Unnecessarily heavy (~150MB+), higher memory usage, slower cold start.
  - *Cloud Storage + External HTTPS Load Balancer*: ~$18/month minimum fixed cost for forwarding rules, violating the zero-cost idle objective.

### 2. Remote State in Dedicated GCS Bucket
- **Choice**: Store Terraform state in `gs://algorithm-visualizer-adwait-tfstate/terraform/state`.
- **Rationale**: Provides native encryption at rest, automatic object versioning, access control, and state locking. Ensures state is not tied to a single local machine and can be accessed safely in future collaborative or automated workflows.
- **Alternatives considered**:
  - *Local state file*: High risk of data loss or state corruption if local files are wiped; cannot be shared across machines.

### 3. Phased Initial Deployment Sequence
- **Choice**:
  1. Bootstrap: Create GCS state bucket via `gcloud storage buckets create` and configure Terraform GCS backend.
  2. Terraform Phase A: Enable GCP APIs (`run.googleapis.com`, `artifactregistry.googleapis.com`, `cloudbuild.googleapis.com`) and create the Artifact Registry repository.
  3. Build Phase: Execute `gcloud builds submit` to package and push the container image to the created repository.
  4. Terraform Phase B: Provision the Cloud Run v2 service targeting the image, and bind `roles/run.invoker` to `allUsers`.
- **Rationale**: Cloud Run requires an existing valid container image URI upon creation; decoupling registry creation from service creation prevents "image not found" errors during initial provisioning.

### 4. GitHub Actions CI/CD with Dedicated GCP Service Account
- **Choice**: GitHub Actions workflow triggered on `push` to `main` branch.
- **Authentication**: A dedicated GCP Service Account (`github-deployer@algorithm-visualizer-adwait.iam.gserviceaccount.com`) with roles:
  - `roles/run.developer` (deploy new revisions to Cloud Run)
  - `roles/artifactregistry.writer` (push Docker images)
  - `roles/iam.serviceAccountUser` (act as the Cloud Run runtime service account)
- **Workflow Steps**:
  1. Checkout code & set up Node.js.
  2. Run unit tests (`npm test`).
  3. Authenticate to Google Cloud using `google-github-actions/auth` and repository secret `GCP_SA_KEY`.
  4. Configure Docker for Artifact Registry via `gcloud auth configure-docker`.
  5. Build and push container image tagged with `${{ github.sha }}` and `latest`.
  6. Deploy new image to Cloud Run using `google-github-actions/deploy-cloudrun`.

## Risks / Trade-offs

- **[Cold Start Latency]**: Cloud Run scaling to 0 instances incurs a 1–2 second delay on the very first incoming request after idle periods.
  - *Mitigation*: Minimized by using a tiny Alpine Nginx image (<25MB) with negligible initialization time.
- **[Service Account Key Exposure]**: Service account keys can be a security liability if checked into code.
  - *Mitigation*: Key is stored exclusively in GitHub Encrypted Secrets (`GCP_SA_KEY`) and never committed to git.
- **[Bucket Name Collision]**: GCS bucket names are globally unique.
  - *Mitigation*: Prefixed with project ID `algorithm-visualizer-adwait-tfstate`.

## Migration Plan

1. Create GCS state bucket `gs://algorithm-visualizer-adwait-tfstate`.
2. Add `.dockerignore`, `Dockerfile`, and `nginx.conf`.
3. Create `terraform/` configurations with GCS backend and project variables.
4. Run Terraform Phase 1: enable APIs and provision Artifact Registry.
5. Execute `gcloud builds submit` to push the initial container image.
6. Apply full Terraform configuration to launch Cloud Run and open public access.
7. Provision the `github-deployer` Service Account, generate credentials, and guide user to add `GCP_SA_KEY` in GitHub.
8. Create `.github/workflows/deploy.yml` and test pipeline with a commit to `main`.
9. Update `docs/architecture.md` with complete architecture and operational steps.
