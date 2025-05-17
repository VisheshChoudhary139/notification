# notification
# Notification Service Backend

This is a Node.js backend service to manage users and send notifications via Email, SMS, and in-app notifications. It includes a queue-based system with retry logic for reliable notification delivery.

---

## Features

- User CRUD APIs
- Send notifications (Email, SMS, In-App)
- Retrieve user notifications
- Queue processing with retry on failure (using a simple in-memory queue; can be extended to RabbitMQ/Kafka)
  
---

## Setup Instructions

### Prerequisites

- Node.js (v14+ recommended)
- MongoDB (local or cloud instance)
- Git

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/VisheshChoudhary139/notification.git
   cd notification
