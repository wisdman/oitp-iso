SET search_path = "$user";

CREATE TABLE private.users_charge (
  "owner" uuid NOT NULL,
  "value" smallint NOT NULL DEFAULT 100 ("value" > 0),
  "ts" timestamp without time zone NOT NULL,

  PRIMARY KEY ("owner", "ts"),
  FOREIGN KEY ("owner") REFERENCES private.users("id")
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE VIEW self.charge AS
  SELECT t."value"
  FROM private.users_charge AS t
  WHERE t."owner" = current_setting('app.sessionUser')::uuid
  ORDER BY t."ts";

GRANT SELECT ON self.charge TO "api-self";
