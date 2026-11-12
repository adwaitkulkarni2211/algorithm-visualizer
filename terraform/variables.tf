variable "project_id" {
  description = "The GCP project ID to deploy resources into"
  type        = string
  default     = "algorithm-visualizer-adwait"
}

variable "region" {
  description = "The GCP region for resources"
  type        = string
  default     = "asia-south1"
}

variable "service_name" {
  description = "The name of the Cloud Run service"
  type        = string
  default     = "algorithm-visualizer"
}

variable "repository_name" {
  description = "The Artifact Registry Docker repository name"
  type        = string
  default     = "algorithm-visualizer-repo"
}
