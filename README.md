## 1.Abuot this project

### Project name

docker-test

### The purpsse of this project

The project demonstrates how to operate a system using React, Go, and PostgreSQL within Docker containers.

## 2.Tech stack

| Language・Framework |  version |
| -------------------- | ---------- |
| Next.js             | 18         |
| Python               | 3.6       |
| PostgresSQL          | latest     |
| Docker               | 27.2.0     |

## 3. Command List

| Command                               |    Process to execute         |
| --------------------------------------| ------------------------------|
| docker-compose down                   | Stop docker                   |
| docekr-compose up -d                  | Start Docker background       |
| docker-compose up --build             | Build + Start Docker          |
| docker builder prune --all --force    | Delete all cash in Docker     |

## 4. SQL command

### 1.Move root directory and connect to database
```
docker exec -it db psql -U postgres 
```

### 2.Check if table exist
```
\dt
```

### 3. Move to table
```
SELECT * FROM table_name
```

### 4. Quite table
```
\q
```

### 5. Exit sql
```
exit
```