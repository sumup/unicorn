package config

import (
	"fmt"

	"github.com/joho/godotenv"
	"github.com/kelseyhightower/envconfig"
)

type Config struct {
	Port string `envconfig:"SERVER_PORT" required:"true"`

	Database Database
}

type Database struct {
	Host     string `envconfig:"DB_HOST" required:"true"`
	Port     int    `envconfig:"DB_PORT" required:"true"`
	Username string `envconfig:"DB_USERNAME" required:"true"`
	Password string `envconfig:"DB_PASSWORD" required:"true"`
	Database string `envconfig:"DB_DATABASE" required:"true"`
}

func Load() (*Config, error) {
	if err := godotenv.Load(".env"); err != nil {
		return nil, fmt.Errorf("get config from env: %w", err)
	}

	config := new(Config)
	if err := envconfig.Process("", config); err != nil {
		return nil, fmt.Errorf("get config from env: %w", err)
	}

	return config, nil
}
