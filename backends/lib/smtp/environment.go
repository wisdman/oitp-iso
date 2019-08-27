package smtp

import (
	"errors"
	"io/ioutil"
	"os"
	"strconv"
)

type Config struct {
	Server string
	Port   uint16

	User     string
	Password string

	Name string
	From string
}

func parseEnv() (*Config, error) {
	config := &Config{}

	if config.Server = os.Getenv("SMTP_SERVER"); config.Server == "" {
		return nil, errors.New("SMTP_SERVER isn't set")
	}

	if strPort := os.Getenv("SMTP_PORT"); strPort != "" {
		if port, err := strconv.ParseUint(strPort, 10, 16); err == nil {
			config.Port = uint16(port)
		} else {
			return nil, err
		}
	} else {
		config.Port = 25
	}

	if config.User = os.Getenv("SMTP_USER"); config.User == "" {
		return nil, errors.New("SMTP_USER isn't set")
	}

	if passwordFile := os.Getenv("SMTP_PASSWORD_FILE"); passwordFile != "" {
		if password, err := ioutil.ReadFile(passwordFile); err == nil {
			config.Password = string(password)
		} else {
			return nil, err
		}
	} else if password := os.Getenv("SMTP_PASSWORD"); password != "" {
		config.Password = password
	} else {
		return nil, errors.New("SMTP_PASSWORD isn't set")
	}

	if config.From = os.Getenv("SMTP_FROM"); config.From == "" {
		return nil, errors.New("SMTP_FROM isn't set")
	}

	config.Name = os.Getenv("SMTP_NAME")

	return config, nil
}
