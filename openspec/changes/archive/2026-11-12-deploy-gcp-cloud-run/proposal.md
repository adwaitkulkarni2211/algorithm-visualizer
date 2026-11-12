# Proposal

## Why

The Algorithm Visualizer currently runs only in local development environments. To make the project accessible to users and demonstrate production cloud and DevOps practices, we need a reliable, cost-effective public hosting solution on Google Cloud Platform (GCP) paired with an automated deployment pipeline. Using Cloud Run ensures zero base cost when idle while providing managed HTTPS and scale-to-zero compute. Managing infrastructure with Terraform and remote state in Google Cloud Storage (GCS) ensures consistency across environments. Adding a GitHub Actions CI/CD pipeline ensures future updates pushed to `main` are automatically tested, containerized, and deployed without manual intervention.

## What Changes

- Add containerization assets (`Dockerfile`, `nginx.conf`, and `.dockerignore`) for building a lightweight production container of the React SPA served via Nginx.
- Provision a dedicated private GCS bucket (`algorithm-visualizer-adwait-tfstate`) in region `asia-south1` to maintain remote Terraform state with locking and encryption.
- Add Terraform configuration in a `terraform/` directory managing:
  - Required GCP APIs (`run.googleapis.com`, `artifactregistry.googleapis.com`, `cloudbuild.googleapis.com`).
  - Google Artifact Registry Docker repository in region `asia-south1`.
  - Cloud Run v2 service in region `asia-south1` with scale-to-zero configuration.
  - Public unauthenticated IAM invoker binding (`allUsers` -> `roles/run.invoker`).
- Provision a dedicated GCP Service Account with least-privilege deployment roles to empower GitHub Actions.
- Add a GitHub Actions workflow (`.github/workflows/deploy.yml`) that triggers on push/merge to `main` to run tests, build the container image, push to Artifact Registry, and update Cloud Run.
- Update `docs/architecture.md` with hosting topology, deployment commands, CI/CD pipeline details, and verification records.

## Capabilities

### New Capabilities
- `cloud-run-deployment`: Public HTTPS hosting on GCP Cloud Run with scale-to-zero idle performance, declarative Terraform infrastructure with remote GCS state, and automated continuous deployment from the `main` git branch via GitHub Actions.

### Modified Capabilities
- *(None)*

## Impact

- **Source Code**: No changes to application React components or styling.
- **Repository Structure**: Adds `Dockerfile`, `nginx.conf`, `.dockerignore`, `terraform/` configurations, and `.github/workflows/deploy.yml`.
- **GCP Infrastructure**:
  - GCS Bucket: `algorithm-visualizer-adwait-tfstate`
  - Artifact Registry: `algorithm-visualizer-repo` (Docker)
  - Cloud Run v2: `algorithm-visualizer`
  - Service Account: `github-deployer@algorithm-visualizer-adwait.iam.gserviceaccount.com`
- **Documentation**: Updates `docs/architecture.md` to document the infrastructure, deployment procedures, and CI/CD operations.
