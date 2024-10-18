# **Redis Caching with Express and Axios**

This project demonstrates how to implement **Redis caching** in an Express.js application to reduce API response times by storing frequently accessed data. We use **Redis** to cache responses from a placeholder photo API, reducing the need for repeated external API calls.

---

## **Features**

- **Redis Caching**: Store API responses temporarily for faster retrieval.
- **Axios for HTTP Requests**: Fetch data from a public API.
- **Express**: Lightweight web framework for handling API routes.
- **CORS Support**: Enable cross-origin requests.

---

## **Setup Instructions**

### **Prerequisites**

1. **Node.js** installed on your machine.
2. **Redis** installed and running.  
   You can install Redis via:
   - **Local Installation:** [Redis Installation Guide](https://redis.io/docs/getting-started/installation/)
   - **Docker:**
     ```bash
     docker run --name redis-server -p 6379:6379 -d redis
     ```

---

### **Installation**

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start Redis server:**  
   Ensure your Redis server is running. If using Docker:

   ```bash
   docker start redis-server
   ```

4. **Run the server:**
   ```bash
   node index.js
   ```

---

## **Endpoints**

### 1. **Get Photos by Album ID**

- **Route:** `/photos`
- **Method:** `GET`
- **Query Parameter:** `albumId` (optional)
- **Description:** Fetches photos for a given album ID. If no album ID is provided, it fetches all photos.

**Example Request:**

```bash
curl "http://localhost:3002/photos?albumId=1"
```

**Cache Behavior:**

- **Cache Key:** `photos?albumId=<albumId>`
- **Cache Expiration:** 1 hour (3600 seconds)

**Response Example:**

```json
[
  {
    "albumId": 1,
    "id": 1,
    "title": "photo title",
    "url": "https://via.placeholder.com/600/92c952",
    "thumbnailUrl": "https://via.placeholder.com/150/92c952"
  }
]
```

---

### 2. **Get Photo by ID**

- **Route:** `/photos/:id`
- **Method:** `GET`
- **Description:** Fetches a single photo by its ID.

**Example Request:**

```bash
curl "http://localhost:3002/photos/1"
```

**Cache Behavior:**

- **Cache Key:** `photos/<id>`
- **Cache Expiration:** 1 hour (3600 seconds)

**Response Example:**

```json
{
  "albumId": 1,
  "id": 1,
  "title": "photo title",
  "url": "https://via.placeholder.com/600/92c952",
  "thumbnailUrl": "https://via.placeholder.com/150/92c952"
}
```

---

## **Code Overview**

### **Key Components**

1. **Redis Client Setup:**

   ```javascript
   const Redis = require("redis");
   const redisClient = Redis.createClient();
   redisClient.connect(); // Ensure Redis connection
   ```

2. **Caching Logic in `/photos` Route:**

   - **Check Redis Cache:**
     ```javascript
     const cachedPhotos = await redisClient.get(`photos?albumId=${albumId}`);
     if (cachedPhotos) {
       return res.json(JSON.parse(cachedPhotos));
     }
     ```
   - **Fetch from API and Store in Redis:**
     ```javascript
     const { data } = await axios.get(
       "https://jsonplaceholder.typicode.com/photos",
       { params: { albumId } }
     );
     await redisClient.setEx(
       `photos?albumId=${albumId}`,
       3600,
       JSON.stringify(data)
     );
     res.json(data);
     ```

3. **Fetching a Single Photo:**
   ```javascript
   const cachedPhoto = await redisClient.get(`photos/${id}`);
   if (cachedPhoto) {
     return res.json(JSON.parse(cachedPhoto));
   }
   const { data } = await axios.get(
     `https://jsonplaceholder.typicode.com/photos/${id}`
   );
   await redisClient.setEx(`photos/${id}`, 3600, JSON.stringify(data));
   res.json(data);
   ```

---

## **How Redis Caching Works in This Project**

1. **Cache Check:**  
   When a request is made, the application checks Redis for the cached response using a **unique key** (e.g., `photos?albumId=1`).

2. **Cache Hit:**  
   If data is found in Redis, it returns the cached response immediately, avoiding the need for an external API call.

3. **Cache Miss:**  
   If the data is not in Redis, the application makes an **API call** to fetch the data, stores it in Redis with an **expiration of 1 hour**, and sends the response back to the client.

---

## **Handling Errors**

- If Redis is not available or there's an issue with the API call, the server responds with:

  ```json
  {
    "message": "Internal server error"
  }
  ```

- Errors are logged to the console for easier debugging.

---

## **Testing the Application**

1. **Redis Cache Test:**

   - Make the same API call multiple times.
   - On the first request, you should see **"Cache miss"** in the console.
   - On subsequent requests, you should see **"Cache hit"**.

2. **API Error Handling:**
   - Stop the Redis server and observe how the application handles the failure gracefully.

---

## **Dependencies**

- **Express:** Fast web framework for Node.js.
- **Axios:** Promise-based HTTP client for making API calls.
- **Redis:** In-memory key-value store for caching.
- **Cors:** Enable Cross-Origin Resource Sharing.

---

## **Conclusion**

This application demonstrates how to leverage **Redis caching** to enhance the performance of API requests. With proper caching in place, you can reduce redundant API calls, minimize latency, and improve the scalability of your service.

---

## **Commands to Run**

- **Start Redis Server:**

  ```bash
  redis-server
  ```

- **Run Application:**

  ```bash
  node index.js
  ```

- **Make API Requests:**
  ```bash
  curl "http://localhost:3002/photos?albumId=1"
  curl "http://localhost:3002/photos/1"
  ```

---

## **License**

This project is licensed under the MIT License. See the `LICENSE` file for details.

---
