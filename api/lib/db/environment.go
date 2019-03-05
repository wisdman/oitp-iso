package db

import (
  "net"
  "os"
  "strconv"
  "time"

  "github.com/jackc/pgx"
)

func ParseEnvConfig() (*pgx.ConnPoolConfig, error) {
  cc :=  pgx.ConnConfig{
    Host: os.Getenv("POSTGRES_HOST"),
    User: os.Getenv("POSTGRES_USER"),
    Password: os.Getenv("POSTGRES_PASSWORD"),
    Database: os.Getenv("POSTGRES_DB"),
  }

  if pgPort := os.Getenv("POSTGRES_PORT"); pgPort != "" {
    port, err := strconv.ParseUint(pgPort, 10, 16)
    if err != nil {
      return nil, err
    }

    cc.Port = uint16(port)
  }

  if pgTimeout := os.Getenv("POSTGRES_TIMEOUT"); pgTimeout != "" {
    timeout, err := strconv.ParseInt(pgTimeout, 10, 64)
    if err != nil {
      return nil, err
    }

    d := &net.Dialer{KeepAlive: 5 * time.Minute}
    d.Timeout = time.Duration(timeout) * time.Second
    cc.Dial = d.Dial
  }

  cc.RuntimeParams = make(map[string]string)
  if appName := os.Getenv("POSTGRES_APPNAME"); appName != "" {
    cc.RuntimeParams["application_name"] = appName
  }

  var maxPoolSize int = 10
  if pgPoolSize := os.Getenv("POSTGRES_POOL_SIZE"); pgPoolSize != "" {
    poolSize, err := strconv.ParseUint(pgPoolSize, 10, 16)
    if err != nil {
      return nil, err
    }
    maxPoolSize = int(poolSize)
  }

  return &pgx.ConnPoolConfig{
    ConnConfig: cc,
    MaxConnections: maxPoolSize,
  }, nil
}
