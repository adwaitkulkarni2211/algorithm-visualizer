# Spec Delta

## Purpose

Provides containerized public HTTPS hosting for the Algorithm Visualizer single-page application on Google Cloud Run with remote state tracking and automated CI/CD deployment.

## ADDED Requirements

### Requirement: Containerized SPA Web Serving
The deployment SHALL package the production React build inside an Nginx container that serves static assets and routes unmatched paths to index.html.

#### Scenario: User requests the root path
- **WHEN** an HTTP GET request is made to the root path `/`
- **THEN** the server returns `index.html` with status code 200 and Content-Type `text/html`.

#### Scenario: User requests static asset
- **WHEN** an HTTP GET request is made to an existing static asset path (e.g. JavaScript or CSS bundle)
- **THEN** the server returns the requested file with status code 200 and appropriate caching headers.

#### Scenario: User requests non-existent subpath
- **WHEN** an HTTP GET request is made to an unmatched route path
- **THEN** the server returns `index.html` with status code 200 to allow client-side SPA routing.

### Requirement: Public Cloud Run Ingress and Scale to Zero
The Cloud Run deployment SHALL allow unauthenticated public web traffic over HTTPS and scale to zero active container instances when there is no incoming traffic.

#### Scenario: Service accessed by public user
- **WHEN** an unauthenticated visitor sends an HTTPS request to the Cloud Run service URL
- **THEN** the Cloud Run service accepts the request without requiring authentication credentials.

#### Scenario: Service receives no traffic
- **WHEN** the service receives no incoming requests for the idle timeout window
- **THEN** active container instances scale down to 0 instances to incur no compute charges.

### Requirement: Declarative Infrastructure with Remote State
All required GCP infrastructure components SHALL be declaratively managed via Terraform, storing state in a designated remote Google Cloud Storage bucket with state locking.

#### Scenario: Terraform execution applies configuration
- **WHEN** `terraform apply` is executed against the configured GCP project
- **THEN** defined GCP resources are reconciled, and state is safely persisted to `gs://algorithm-visualizer-adwait-tfstate/terraform/state`.

### Requirement: Automated Continuous Deployment
The repository SHALL define a GitHub Actions continuous deployment workflow that triggers on code pushes or merges to the `main` branch, building and deploying updated images to Cloud Run.

#### Scenario: Code merged to main branch
- **WHEN** a commit or pull request is merged into the `main` branch
- **THEN** the workflow executes test verification, builds and tags a container image, pushes it to Artifact Registry, and deploys the new revision to Cloud Run.
