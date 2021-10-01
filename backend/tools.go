//go:build tools
// +build tools

// File to track dependencies for tools.
package main

import (
	_ "github.com/99designs/gqlgen@v0.13.0"
	_ "github.com/deepmap/oapi-codegen/cmd/oapi-codegen@v1.7.1"
	_ "github.com/dmarkham/enumer@v1.5.2"
	_ "github.com/golang-migrate/migrate/v4/cmd/migrate@v4.14.1"
	_ "github.com/golang/mock/mockgen@v1.6.0"
)
