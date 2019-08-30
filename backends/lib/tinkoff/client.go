package tinkoff

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"
)

type Client struct {
	baseURL     string
	password    string
	terminalKey string
}

func New() *Client {
	config, err := parseEnv()
	if err != nil {
		log.Fatalln(err)
	}

	return &Client{
		baseURL:     config.BaseURL,
		password:    config.Password,
		terminalKey: config.TerminalKey,
	}
}

func (c *Client) postRequest(url string, request RequestInterface, response interface{}) error {
	c.secureRequest(request)
	data, err := json.Marshal(request)
	if err != nil {
		return err
	}

	r, err := http.Post(c.baseURL+url, "application/json", bytes.NewReader(data))
	if err != nil {
		return err
	}
	defer r.Body.Close()

	return json.NewDecoder(r.Body).Decode(response)
}

func (c *Client) secureRequest(request RequestInterface) {
	request.SetTerminalKey(c.terminalKey)

	v := request.GetValuesForToken()
	v["TerminalKey"] = c.terminalKey
	v["Password"] = c.password
	request.SetToken(generateToken(v))
}
