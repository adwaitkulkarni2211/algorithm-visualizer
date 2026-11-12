# Tasks

## 1. Containerization

- [x] 1.1 Create `nginx.conf` configured for single-page application routing (`try_files $uri $uri/ /index.html`) and verify syntax.
- [x] 1.2 Create multi-stage `Dockerfile` (Node 22 build stage and Alpine Nginx runtime stage) and `.dockerignore` excluding build artifacts and Terraform state.

## 2. Terraform Infrastructure & GCS State Backend

- [x] 2.1 Update `.gitignore` to exclude Terraform cache and state files (`.terraform/`, `*.tfstate`, `*.tfstate.backup`, `*.tfvars`).
- [x] 2.2 Create GCS remote state bucket `gs://algorithm-visualizer-adwait-tfstate` in `asia-south1` and verify creation.
- [x] 2.3 Create `terraform/variables.tf`, `terraform/outputs.tf`, and `terraform/terraform.tfvars` configured for project `algorithm-visualizer-adwait` and region `asia-south1`.
- [x] 2.4 Create `terraform/main.tf` declaring GCS backend, required GCP APIs (`run.googleapis.com`, `artifactregistry.googleapis.com`, `cloudbuild.googleapis.com`), Artifact Registry Docker repository, Cloud Run v2 service with scale-to-zero settings, and public `allUsers` invoker IAM binding.

## 3. Initial Deployment Execution (Order of Operations)

- [x] 3.1 Initialize Terraform (`terraform init`) and provision Phase 1 resources (APIs and Artifact Registry repository).
- [x] 3.2 Build and push the container image to Artifact Registry via Google Cloud Build (`gcloud builds submit`).
- [x] 3.3 Apply full Terraform configuration (`terraform apply`) to provision the Cloud Run service and public invoker policy.
- [x] 3.4 Verify the initial live Cloud Run HTTPS service URL returns the React application with status 200.

## 4. GitHub Actions CI/CD Pipeline

- [x] 4.1 Create GCP Service Account `github-deployer` with Cloud Run Developer, Artifact Registry Writer, and Service Account User roles.
- [x] 4.2 Generate JSON credentials for `github-deployer` and prompt user for manual addition: **[USER ACTION: Save key as `GCP_SA_KEY` secret in GitHub Repository Settings]**, then delete the local key file.
- [x] 4.3 Create `.github/workflows/deploy.yml` configured to trigger on merge to `main`, run tests, build the Docker image, push to Artifact Registry, and deploy to Cloud Run.

## 5. Verification and Canonical Documentation

- [ ] 5.1 Push branch `deploy-gcp-cloud-run` to GitHub and guide user: **[USER ACTION: Open PR and merge to `main` on GitHub]**, then verify the automated GitHub Actions workflow triggers and completes successfully.
- [x] 5.2 Update `docs/architecture.md` with the new GCP hosting model, Terraform infrastructure layout, GCS state management, CI/CD pipeline, and operational procedures.
