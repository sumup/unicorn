.PHONY: install-tools
install-tools: download
	@echo Installing tools from tools.go
	@# seems this is the only way to properly install it
	go install -tags 'postgres' github.com/golang-migrate/migrate/v4/cmd/migrate@latest
	@cat tools.go | grep _ | awk -F'"' '{print $$2}' | xargs -tI % go install %

.PHONY: install-lint
install-lint: ## Installs the required version of golangci-lint. *Careful*, this will override your existing install if you have one!
	# golangci-lint team doesn't recommend install the tool via "go get"
	# https://golangci-lint.run/usage/install/
	curl -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh | sh -s -- -b "$${GOBIN:-${GOPATH}/bin}" v1.40.0

.PHONY: ensure-lint
ensure-lint: ## Ensure that the linting binary is the correct version
	@golangci-lint --version | grep 1.40 > /dev/null || echo "Please install version 1.40 of \`golangci-lint\` by running \`make install-lint\`"

.PHONY: ensure-mockgen
ensure-mockgen: ## Ensure that the mockgen binary is installed
	@which mockgen > /dev/null || echo "Please install \`mockgen\` by running \`make install-tools\`"

.PHONY: ensure-enumer
ensure-enumer: ## Ensure that the enumer binary is installed
	@which enumer > /dev/null || echo "Please install \`enumer\` by running \`make install-tools\`"

.PHONY: ensure-migrate
ensure-migrate: ## Ensure that the migrate binary is installed
	@which migrate > /dev/null || echo "Please install \`migrate\` by running \`make install-tools\`"

.PHONY: ensure-oapi-codegen
ensure-oapi-codegen: ## Ensure that the oapi-codegen binary is installed
	@oapi-codegen -version > /dev/null || echo "Please install \`oapi-codegen\` by running \`make install-tools\`"
