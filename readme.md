# **Redis Documentation**

## **Table of Contents**

1. [Introduction](#introduction)
2. [Key Features](#key-features)
3. [Installation](#installation)
4. [Getting Started](#getting-started)
5. [Data Types and Commands](#data-types-and-commands)
   - [Key Management](#1-key-management)
   - [Strings](#2-string-commands)
   - [Lists](#3-list-commands)
   - [Sets](#4-set-commands)
   - [Hashes](#5-hash-commands)
   - [Sorted Sets (ZSets)](#6-sorted-set-commands)
   - [Transactions](#7-transactions-commands)
   - [Pub/Sub](#8-pubsub-commands)
   - [HyperLogLog](#9-hyperloglog-commands)
   - [Streams](#10-stream-commands)
   - [Bitmaps](#11-bit-commands)
   - [Geospatial](#12-geospatial-commands)
6. [Persistence](#persistence)
7. [Replication](#replication)
8. [Redis CLI Commands](#redis-cli-commands)
9. [Client Libraries](#client-libraries)
10. [Conclusion](#conclusion)

---

## **Introduction**

Redis (REmote DIctionary Server) is an **in-memory key-value database** known for its high performance, flexibility, and wide range of data structures. It can be used as a cache, message broker, real-time analytics engine, and session store.

Redis supports various data types, including **strings, hashes, lists, sets, and sorted sets**. It ensures extremely low latency by storing data in memory and can persist data to disk for durability.

---

## **Key Features**

- **High Performance**: In-memory storage enables fast read and write operations.
- **Flexible Data Structures**: Supports multiple data types like strings, lists, sets, hashes, etc.
- **Persistence Options**: Snapshots (RDB) or Append-only logs (AOF) for saving data to disk.
- **Replication & High Availability**: Master-slave replication for redundancy and scalability.
- **Pub/Sub Messaging**: Publish/subscribe system for real-time messaging.
- **Transactions**: Support for atomic operations using multi/exec commands.

---

## **Installation**

### **Using Docker**

```bash
docker run --name redis-server -d redis
```

### **Using APT on Linux (Ubuntu)**

```bash
sudo apt update
sudo apt install redis-server
```

### **On macOS (Homebrew)**

```bash
brew install redis
```

---

## **Getting Started**

1. Start the Redis server:
   ```bash
   redis-server
   ```
2. Use the Redis CLI to interact with Redis:
   ```bash
   redis-cli
   ```
3. Test connection with a `PING` command:
   ```bash
   PING
   ```
   Expected response:
   ```
   PONG
   ```

---

## **Data Types and Commands**

### **1. Key Management**

| Command                | Description                       |
| ---------------------- | --------------------------------- |
| `DEL key`              | Delete a key.                     |
| `EXPIRE key seconds`   | Set a TTL for a key.              |
| `KEYS pattern`         | List all keys matching a pattern. |
| `RENAME oldkey newkey` | Rename a key.                     |
| `TTL key`              | Get remaining TTL for a key.      |

**Example:**

```bash
SET mykey "value"
EXPIRE mykey 10
TTL mykey
```

---

### **2. String Commands**

| Command              | Description                           |
| -------------------- | ------------------------------------- |
| `SET key value`      | Set the value of a key.               |
| `GET key`            | Get the value of a key.               |
| `INCR key`           | Increment the integer value of a key. |
| `APPEND key value`   | Append a value to a string.           |
| `MSET key value ...` | Set multiple keys at once.            |

**Example:**

```bash
SET counter 1
INCR counter
GET counter
```

---

### **3. List Commands**

| Command           | Description                            |
| ----------------- | -------------------------------------- |
| `LPUSH key value` | Push value to the beginning of a list. |
| `RPUSH key value` | Push value to the end of a list.       |
| `LPOP key`        | Remove the first element.              |
| `LRANGE key 0 -1` | Get all elements of the list.          |
| `LLEN key`        | Get the length of the list.            |

**Example:**

```bash
RPUSH tasks "Task 1" "Task 2"
LRANGE tasks 0 -1
```

---

### **4. Set Commands**

| Command            | Description                 |
| ------------------ | --------------------------- |
| `SADD key member`  | Add a member to a set.      |
| `SMEMBERS key`     | Get all members of a set.   |
| `SREM key member`  | Remove a member from a set. |
| `SUNION key1 key2` | Get the union of two sets.  |

---

### **5. Hash Commands**

| Command              | Description                          |
| -------------------- | ------------------------------------ |
| `HSET key field val` | Set a field-value pair in a hash.    |
| `HGET key field`     | Get the value of a field.            |
| `HGETALL key`        | Get all fields and values in a hash. |

---

### **6. Sorted Set Commands**

| Command                 | Description                |
| ----------------------- | -------------------------- |
| `ZADD key score member` | Add a member with a score. |
| `ZRANGE key 0 -1`       | Get all members in order.  |

---

### **7. Transactions Commands**

| Command | Description                  |
| ------- | ---------------------------- |
| `MULTI` | Start a transaction.         |
| `EXEC`  | Execute all queued commands. |

---

### **8. Pub/Sub Commands**

| Command               | Description                     |
| --------------------- | ------------------------------- |
| `PUBLISH channel msg` | Publish a message to a channel. |
| `SUBSCRIBE channel`   | Subscribe to a channel.         |

---

### **9. HyperLogLog Commands**

| Command             | Description                    |
| ------------------- | ------------------------------ |
| `PFADD key element` | Add elements to a HyperLogLog. |
| `PFCOUNT key`       | Get approximate cardinality.   |

---

### **10. Stream Commands**

| Command                  | Description                    |
| ------------------------ | ------------------------------ |
| `XADD stream id key val` | Add entry to a stream.         |
| `XRANGE stream - +`      | Get all entries from a stream. |

---

### **11. Bit Commands**

| Command                 | Description                    |
| ----------------------- | ------------------------------ |
| `SETBIT key offset val` | Set or clear a bit.            |
| `GETBIT key offset`     | Get the bit at a given offset. |

---

### **12. Geospatial Commands**

| Command                     | Description                    |
| --------------------------- | ------------------------------ |
| `GEOADD key lon lat member` | Add a location to a key.       |
| `GEORADIUS key lon lat r m` | Get locations within a radius. |

---

## **Persistence**

Redis supports **RDB** (snapshotting) and **AOF** (Append-Only File) for data persistence. You can configure them in `redis.conf`.

---

## **Replication**

Redis allows **master-slave replication** to ensure high availability. Use `SLAVEOF` to configure replication between servers.

---

## **Redis CLI Commands**

Some helpful Redis CLI commands:

- `FLUSHALL`: Delete all keys from all databases.
- `INFO`: Get server information and statistics.
- `CONFIG GET *`: View configuration parameters.

---

## **Client Libraries**

- **Node.js**: `redis`
- **Python**: `redis-py`
- **Java**: Jedis  
  See the Redis [client library documentation](https://redis.io/clients) for more.

---

## **Conclusion**

Redis is a powerful in-memory data store with a wide variety of use cases, from caching and messaging to analytics and geospatial operations. With a rich set of commands, Redis enables developers to build efficient, real-time applications.

---
