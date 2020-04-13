CREATE STREAM transaction_events
  (status VARCHAR,
   cardBin VARCHAR,
   amount VARCHAR,
   currencyCode VARCHAR)
  WITH (KAFKA_TOPIC='transactions',
        VALUE_FORMAT='JSON');

CREATE STREAM transaction_authorized_events AS SELECT * FROM transaction_events WHERE status = 'AUTHORIZED';

CREATE TABLE transaction_authorized_table
   (status VARCHAR,
    cardBin VARCHAR,
    amount VARCHAR,
    currencyCode VARCHAR)
  WITH (KAFKA_TOPIC='transactions',
        VALUE_FORMAT='JSON');

CREATE TABLE transaction_authorized_group_by_currency AS
  SELECT status, amount, currencyCode, COUNT(*) AS TOTAL FROM transaction_authorized_table
  WHERE status = 'AUTHORIZED'
  GROUP BY currencyCode, status, cardBin, amount
  EMIT CHANGES;
