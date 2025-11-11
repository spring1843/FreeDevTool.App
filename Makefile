# Development Makefile for DevTools Suite
# Comprehensive development workflow management

.PHONY: help setup start stop restart dev build lint lint-fix format type-check test clean deps install status health deploy prepare-deploy ci all apply-cloudformation-stage warm-cache-stage warm-cache-prod

# Default target
.DEFAULT_GOAL := help

# Colors for terminal output
RED=\033[0;31m
GREEN=\033[0;32m
YELLOW=\033[1;33m
BLUE=\033[0;34m
NC=\033[0m # No Color

GIT_TAG:=$(shell git describe --tags --abbrev=7 --always HEAD)
GIT_SHA:=$(shell git rev-parse HEAD)
GIT_SHA_SHORT:=$(shell git rev-parse --short HEAD)

# Image tags
IMAGE_REPO:=ghcr.io/spring1843/freedevtool.app
IMAGE=${IMAGE_REPO}/app
IMAGE_TAG:=${IMAGE}:${GIT_SHA_SHORT}
E2E_IMAGE:=${IMAGE_REPO}/e2e
E2E_IMAGE_TAG:=${E2E_IMAGE}:${GIT_SHA_SHORT}
E2E_IMAGE_USE:=${E2E_IMAGE}:e9c0ff7
PWD:=$(shell pwd)
STAGE_CLOUDFRONT_ID:=E17MASS8004CRI
PROD_CLOUDFRONT_ID:=E1CLKXJU2N6KW7

## Setup Commands

setup: ## Complete project setup - install dependencies, browsers, and prepare for development
	make deps
	make e2e-install

## Combined Commands

all: clean setup lint type-check test build ## Run full development setup with all dependencies including tests

pre-commit: format type-check lint-fix ## Pre-commit hook (fix, format, check)

ci-containerized:  ## Run CI checks inside a container that has dependencies installed
	docker run --rm -v "${PWD}:/app" ${E2E_IMAGE_USE} make setup && make ci

ci-without-e2e: pre-commit build test ## CI commands without end-to-end tests, for environments that can't run e2e tests

ci: ci-without-e2e e2e-test ## Commands run in the CI. Good to run before pushing changes

install: deps ## Install dependencies (alias for deps)

deps: ## Install all dependencies
	npm install

deps-update: ## Update all dependencies
	npm update

deps-audit: ## Audit dependencies for security issues
	npm audit

deps-audit-fix: ## Fix dependency security issues
	npm audit fix

## Core Development Commands

help: ## Display this help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "$(GREEN)%-20s$(NC) %s\n", $$1, $$2}'

start: ## Start the development server
	npm run dev

stop: ## Stop the development server (if running in background)
	@pkill -f "tsx server/index.ts" || true
	@pkill -f "vite" || true

restart: stop start ## Restart the development server

dev: ## Start development server with verbose logging
	NODE_ENV=development DEBUG=* npm run dev

build: clean
	npm run build

build-static: clean
	npm run build:static

build-image: ## Build the Docker image for the app
	docker build --platform linux/amd64 -t ${IMAGE_TAG} -f infra/images/Dockerfile .

build-and-push-image: build-image # Build and push the Docker image for the app
	docker push ${IMAGE_TAG}

build-e2e-image: ## Build the Docker image for end-to-end testing
	docker build --platform linux/amd64 -t ${E2E_IMAGE_TAG} -f infra/images/Dockerfile.e2e .

build-and-push-e2e-image: build-e2e-image ## Build the Docker image for end-to-end testing
	docker push ${E2E_IMAGE_TAG}

build-all-images: build-image build-e2e-image ## Build all Docker images

push-all-images: build-and-push-image build-and-push-e2e-image ## Build and push all Docker images

## Code Quality Commands

lint: ## Run ESLint to check for code issues
	npx eslint . --ext ts,tsx --report-unused-disable-directives

lint-fix: ## Run ESLint with automatic fixing
	npx eslint . --ext ts,tsx --fix

format: ## Format code with Prettier
	npx prettier --list-different --write "**/*.{ts,tsx,js,jsx,json,css,md,html,yaml,yml}"

format-check: ## Check if code is properly formatted
	npx prettier --check "**/*.{ts,tsx,js,jsx,json,css,md,html,yaml,yml}"

type-check: ## Run TypeScript type checking
	npx tsc --noEmit

## Testing Commands

test: ## Run unit tests
	npx vitest run

test-watch: ## Run tests in watch mode
	npx vitest

test-ui: ## Run tests with UI interface
	npx vitest --ui

test-coverage: ## Run tests with coverage report
	npx vitest run --coverage

e2e-test: ## Run end-to-end tests with Playwright
	npx playwright test

e2e-test-ui: ## Run end-to-end tests with UI
	npx playwright test --ui

e2e-install: ## Install Playwright browsers
	npx playwright install
	npx playwright install-deps

## Maintenance Commands

clean: ## Clean build artifacts and temporary files
	rm -rf dist/
	rm -rf node_modules/.cache/
	rm -rf .next/

clean-all: clean ## Clean everything including node_modules
	rm -rf node_modules/
	npm install

cache-clear: ## Clear npm and build caches
	npm cache clean --force
	rm -rf node_modules/.cache/

## Status and Health Commands

status: ## Show project status and health check
	@echo "$(GREEN)Node version:$(NC) $$(node --version)"
	@echo "$(GREEN)NPM version:$(NC) $$(npm --version)"
	@npm list --depth=0 2>/dev/null | head -20 || true
	@git status --porcelain 2>/dev/null || echo "Not a git repository"

health: status ## Comprehensive health check
	@echo -n "$(GREEN)TypeScript:$(NC) "
	@npx tsc --noEmit >/dev/null 2>&1 && echo "✓ OK" || echo "✗ Errors found"
	@echo -n "$(GREEN)ESLint:$(NC) "
	@npx eslint . --ext ts,tsx --max-warnings 0 >/dev/null 2>&1 && echo "✓ OK" || echo "✗ Issues found"
	@echo -n "$(GREEN)Prettier:$(NC) "
	@npx prettier --check "**/*.{ts,tsx,js,jsx,json,css,md}" >/dev/null 2>&1 && echo "✓ OK" || echo "✗ Formatting needed"

## Deployment Commands

copy-static-assets-to-stage: build-static
	aws s3 sync ./dist/public s3://freedevtool-staging

invalidate-cloudfront-stage:  copy-static-assets-to-stage
	aws cloudfront create-invalidation --distribution-id ${STAGE_CLOUDFRONT_ID} --paths "/*"

deploy-to-stage: invalidate-cloudfront-stage

warm-cache-stage: ## Warm CloudFront cache for staging (visit all pages)
	npx tsx scripts/warm-cache.ts https://stage.freedevtool.app

apply-cloudformation-stage:
	aws cloudformation deploy \
                --template-file infra/cloudformation/stage.yaml \
                --stack-name freedevtool-staging \
                --region us-east-1 \
                --no-fail-on-empty-changeset

copy-static-assets-to-production: build-static
	aws s3 sync ./dist/public s3://freedevtool-production

invalidate-cloudfront-production: copy-static-assets-to-production
	aws cloudfront create-invalidation --distribution-id ${PROD_CLOUDFRONT_ID} --paths "/*"

deploy-to-production: invalidate-cloudfront-production

warm-cache-prod: ## Warm CloudFront cache for production (visit all pages)
	npx tsx scripts/warm-cache.ts https://freedevtool.app

apply-cloudformation-production:
	aws cloudformation deploy \
                --template-file infra/cloudformation/production.yaml \
                --stack-name freedevtool-production \
                --region us-east-1 \
                --no-fail-on-empty-changeset

## Documentation

docs: ## Open project documentation
	@echo "See replit.md for project documentation"

## Environment Commands

env-check: ## Check environment variables and configuration
	@echo "$(GREEN)NODE_ENV:$(NC) $${NODE_ENV:-development}"
	@echo "$(GREEN)Working Directory:$(NC) $$(pwd)"
	@echo "$(GREEN)Package Manager:$(NC) npm"

## Advanced Development Commands

dev-https: ## Start development server with HTTPS (if configured)
	HTTPS=true npm run dev

dev-debug: ## Start development server with debugging enabled
	NODE_ENV=development DEBUG=express:* npm run dev

benchmark: ## Run performance benchmarks (placeholder)
	@echo "$(YELLOW)Benchmarking not yet implemented$(NC)"

profile: ## Profile application performance (placeholder)
	@echo "$(YELLOW)Profiling not yet implemented$(NC)"

## Information Commands

version: ## Show version information
	@echo "$(GREEN)Project:$(NC) DevTools Suite v1.0.0"
	@echo "$(GREEN)Node:$(NC) $$(node --version)"
	@echo "$(GREEN)NPM:$(NC) $$(npm --version)"
	@echo "$(GREEN)TypeScript:$(NC) $$(npx tsc --version | cut -d' ' -f2)"

info: version status ## Show comprehensive project information
