package tinkoff

import (
	"errors"
	"io/ioutil"
	"os"
)

type Config struct {
	BaseURL     string
	Password    string
	TerminalKey string
}

func parseEnv() (*Config, error) {
	config := &Config{}

	if config.BaseURL = os.Getenv("TINKOFF_API_URL"); config.BaseURL == "" {
		return nil, errors.New("TINKOFF_API_URL isn't set")
	}

	if config.TerminalKey = os.Getenv("TINKOFF_TERMINAL_KEY"); config.TerminalKey == "" {
		return nil, errors.New("TINKOFF_TERMINAL_KEY isn't set")
	}

	if passwordFile := os.Getenv("TINKOFF_PASSWORD_FILE"); passwordFile != "" {
		if password, err := ioutil.ReadFile(passwordFile); err == nil {
			config.Password = string(password)
		} else {
			return nil, err
		}
	} else if password := os.Getenv("TINKOFF_PASSWORD"); password != "" {
		config.Password = password
	} else {
		return nil, errors.New("TINKOFF_PASSWORD isn't set")
	}

	return config, nil
}
