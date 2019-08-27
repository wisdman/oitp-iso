package db

import (
	"io/ioutil"
	"net"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/jackc/pgx"
)

func parseEnv() (*pgx.ConnPoolConfig, error) {
	var config pgx.ConnConfig

	config.Host = os.Getenv("PGHOST")

	if strPort := os.Getenv("PGPORT"); strPort != "" {
		if port, err := strconv.ParseUint(strPort, 10, 16); err == nil {
			config.Port = uint16(port)
		} else {
			return nil, err
		}
	}

	config.Database = os.Getenv("PGDATABASE")
	config.User = os.Getenv("PGUSER")

	if passwordFile := os.Getenv("PGPASSWORD_FILE"); passwordFile != "" {
		if password, err := ioutil.ReadFile(passwordFile); err == nil {
			config.Password = string(password)
		} else {
			return nil, err
		}
	} else if password := os.Getenv("PGPASSWORD"); password != "" {
		config.Password = password
	}

	if strTimeout := os.Getenv("PGCONNECT_TIMEOUT"); strTimeout != "" {
		if timeout, err := strconv.ParseInt(strTimeout, 10, 64); err == nil {
			dialer := &net.Dialer{KeepAlive: 5 * time.Minute}
			dialer.Timeout = time.Duration(timeout) * time.Second
			config.Dial = dialer.Dial
		} else {
			return nil, err
		}
	}

	config.RuntimeParams = make(map[string]string)

	if appname := os.Getenv("PGAPPNAME"); appname != "" {
		config.RuntimeParams["application_name"] = appname
	}

	config.Logger = &DBLogger{}

	if strLogLevel := os.Getenv("PGLOG_LEVEL"); strLogLevel != "" {
		strLogLevel = strings.ToLower(strLogLevel)
		if logLevel, err := pgx.LogLevelFromString(strLogLevel); err == nil {
			config.LogLevel = logLevel
		} else {
			return nil, err
		}
	} else {
		config.LogLevel = pgx.LogLevelError
	}

	var maxConnections int
	if strPoolSize := os.Getenv("PGPOOL_SIZE"); strPoolSize != "" {
		if poolSize, err := strconv.ParseInt(strPoolSize, 10, 32); err == nil {
			maxConnections = int(poolSize)
		} else {
			return nil, err
		}
	} else {
		maxConnections = 5 // Default pool size
	}

	return &pgx.ConnPoolConfig{
		ConnConfig:     config,
		MaxConnections: maxConnections,
	}, nil
}
