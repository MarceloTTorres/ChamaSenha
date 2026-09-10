# ChamaSenha

### Real-Time Queue Management System

[![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?logo=node.js\&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express\&logoColor=white)](https://expressjs.com/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4.x-010101?logo=socket.io\&logoColor=white)](https://socket.io/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?logo=javascript\&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?logo=tailwindcss\&logoColor=white)](https://tailwindcss.com/)

**ChamaSenha** is a lightweight real-time queue management system designed to manage service counters and display the currently called ticket to users.

The application demonstrates how a web-based system can coordinate multiple clients in real time using **WebSockets through Socket.IO**, without requiring page refreshes or polling.

> A practical real-time systems project focused on event-driven architecture, client-server communication, and a simple operational workflow.

---

## Overview

ChamaSenha provides a simple queue management workflow composed of:

* **Service counters (Guichês)** — operators can call, advance, or return tickets.
* **Public display (Painel)** — displays the ticket currently being called.
* **Real-time communication** — updates are distributed instantly to connected clients.
* **Centralized server** — manages connected counters and the current ticket state.

The system was originally developed for use in an educational environment and can be adapted to other scenarios such as:

* Customer service desks
* Government service centers
* Clinics and healthcare reception
* Banks and financial institutions
* Educational institutions
* Technical support desks
* Internal service departments

---

## Why This Project?

This project was built as a practical exercise in designing a **real-time distributed web application**.

Instead of relying on periodic HTTP requests to check whether a new ticket was called, the application uses **Socket.IO events** to push state changes from the server to connected clients.

This approach provides:

* Low-latency updates
* Reduced unnecessary HTTP requests
* Bidirectional communication
* Event-driven application design
* Support for multiple simultaneously connected clients

---

## Architecture

The application follows a lightweight client-server architecture:

```text
                    ┌─────────────────────┐
                    │     Node.js Server  │
                    │                     │
                    │ Express + Socket.IO │
                    └──────────┬──────────┘
                               │
                WebSocket / Socket.IO
                               │
             ┌─────────────────┴─────────────────┐
             │                                   │
             ▼                                   ▼
    ┌──────────────────┐              ┌──────────────────┐
    │  Service Counter │              │  Public Display  │
    │     (Guichê)     │              │     (Painel)     │
    └──────────────────┘              └──────────────────┘
             │                                   │
             │                                   │
             └───────────────┬───────────────────┘
                             │
                             ▼
                    Real-time ticket state
```

The server maintains the current ticket number and the connected service counters.

When an operator calls a ticket, the server emits a Socket.IO event to the public display, which updates immediately.

---

## Key Features

### 🎫 Ticket Management

* Sequential ticket numbering
* Configurable starting ticket number
* Advance to the next ticket
* Return to the previous ticket
* Real-time synchronization

### 🏢 Service Counter Management

* Multiple counters can connect simultaneously
* Each counter identifies itself by number
* Prevents duplicate counter usage
* Tracks connected clients through Socket.IO connection IDs

### 📺 Real-Time Public Display

The public display receives ticket calls directly from the server.

Example event:

```javascript
io.to(painel).emit('painel:chama_senha', {
    senha: proximo,
    numero_guiche: guiche
})
```

This allows the display to react immediately without refreshing the browser.

### 🔄 Event-Driven Communication

The application uses Socket.IO events for communication between clients and the server.

Examples include:

```text
guiche:selecionado
guiche:atualizar_id
guiche:avanca_senha
guiche:volta_senha
guiche:chama_senha
painel:identifica
painel:chama_senha
guiche:proximo
```

This event-based design is one of the core technical aspects of the project.

---

## Technology Stack

| Technology                | Purpose                               |
| ------------------------- | ------------------------------------- |
| **Node.js**               | JavaScript runtime                    |
| **Express.js**            | HTTP server and static file serving   |
| **Socket.IO**             | Real-time bidirectional communication |
| **JavaScript ES Modules** | Application logic                     |
| **Tailwind CSS**          | User interface styling                |
| **HTML5**                 | Application views                     |
| **WebSockets**            | Real-time client/server communication |

The current `package.json` uses Express 5.1 and Socket.IO 4.8.1.

---

## Application Routes

The server exposes three main interfaces:

| Route     | Purpose                   |
| --------- | ------------------------- |
| `/`       | Application entry point   |
| `/guiche` | Service counter interface |
| `/painel` | Public display interface  |

These routes are served directly by the Node.js/Express server.

---

## Getting Started

### Prerequisites

Make sure you have installed:

* Node.js 20+
* npm

Check your installation:

```bash
node --version
npm --version
```

### Installation

Clone the repository:

```bash
git clone https://github.com/MarceloTTorres/ChamaSenha.git
```

Enter the project directory:

```bash
cd ChamaSenha
```

Install dependencies:

```bash
npm install
```

### Running the Application

Start the server:

```bash
node server.js
```

The application starts the HTTP server and exposes the web interfaces.

By default, the application listens on port `80`.

For development environments where port 80 is not appropriate, consider configuring the application to use an environment variable such as `PORT`.

---

## Using the Application

### 1. Start the server

```bash
node server.js
```

### 2. Open the main interface

```text
http://localhost/
```

### 3. Connect a service counter

Open:

```text
http://localhost/guiche
```

Select the counter number.

### 4. Open the public display

Open:

```text
http://localhost/painel
```

The display will receive ticket calls through Socket.IO.

### 5. Call a ticket

The service counter can:

* Call the current ticket
* Advance to the next ticket
* Return to the previous ticket

The public display is updated in real time.

---

## Real-Time Communication Flow

When a service counter calls a ticket, the following sequence occurs:

```text
Operator
   │
   │ "Call ticket"
   ▼
Guichê Client
   │
   │ Socket.IO event
   ▼
Node.js Server
   │
   │ Update ticket state
   │
   │ Socket.IO event
   ▼
Public Display
   │
   ▼
Ticket displayed immediately
```

This architecture avoids the need for clients to continuously poll the server.

---

## Engineering Concepts Demonstrated

Although the application is intentionally lightweight, it demonstrates several concepts relevant to modern software engineering:

### Event-Driven Architecture

Client actions are represented as events instead of traditional request/response workflows.

### Real-Time Systems

State changes are propagated immediately to connected clients.

### WebSocket Communication

Socket.IO provides persistent communication between clients and the server.

### State Management

The server maintains the current ticket and connected service counters.

### Multi-Client Coordination

Multiple browser clients can communicate with the same server and share application state.

### Separation of Concerns

The application separates:

* HTTP/static content delivery
* Real-time communication
* Counter management
* Public display functionality

---

## Project Structure

```text
ChamaSenha/
│
├── public/
│   ├── ...
│   └──
│
├── files/
│   └── start.json
│
├── index.html
├── guiche.html
├── painel.html
├── server.js
├── ChamaSenha.bat
├── package.json
├── package-lock.json
└── README.md
```

---

## Configuration

The initial ticket number is stored in:

```text
files/start.json
```

Example:

```json
{
    "numero": 1
}
```

This allows the application to initialize the queue from a predefined value.

---

## Potential Improvements

The current implementation intentionally keeps the architecture simple. Possible future improvements include:

* [ ] Environment-based configuration
* [ ] Configurable HTTP port
* [ ] Persistent ticket storage
* [ ] Queue history
* [ ] Priority queues
* [ ] Multiple ticket types
* [ ] Authentication and authorization
* [ ] Administrative dashboard
* [ ] Database integration
* [ ] Automated tests
* [ ] Docker support
* [ ] CI/CD with GitHub Actions
* [ ] Structured logging
* [ ] Monitoring and health checks
* [ ] Responsive/mobile-first improvements
* [ ] Accessibility improvements
* [ ] Internationalization (i18n)

These improvements would allow the application to evolve from a lightweight local queue system into a production-oriented service.

---

## Learning Outcomes

This project was developed to explore and demonstrate practical knowledge in:

* JavaScript backend development
* Node.js
* Express.js
* Socket.IO
* WebSockets
* Event-driven programming
* HTTP servers
* Multi-client communication
* Front-end and back-end integration
* Real-time application design

---

## What This Project Demonstrates to Hiring Teams

ChamaSenha is intentionally more than a static front-end project.

It demonstrates the ability to:

**Build a complete application**

The project includes both server-side and client-side components.

**Design real-time communication**

Socket.IO is used to synchronize multiple clients without relying on page refreshes or polling.

**Work with asynchronous events**

The server reacts to events generated by independently connected clients.

**Think about system architecture**

The application separates service-counter clients, public-display clients, and centralized server-side state.

**Translate a real-world problem into software**

The project addresses a concrete operational problem: coordinating service queues and communicating ticket calls to users.

---

## Future Production Architecture

A possible evolution of the system could be:

```text
                    ┌─────────────────────┐
                    │     Load Balancer   │
                    └──────────┬──────────┘
                               │
                 ┌─────────────┴─────────────┐
                 │                           │
                 ▼                           ▼
        ┌─────────────────┐        ┌─────────────────┐
        │ Node.js Server  │        │ Node.js Server  │
        │   Socket.IO     │        │   Socket.IO     │
        └────────┬────────┘        └────────┬────────┘
                 │                          │
                 └───────────┬──────────────┘
                             │
                      ┌──────▼──────┐
                      │    Redis    │
                      │ Pub/Sub     │
                      └──────┬──────┘
                             │
                      ┌──────▼──────┐
                      │   Database  │
                      └─────────────┘
```

This architecture could support horizontal scaling, persistent data, distributed Socket.IO communication, and production deployment.

---

## License

This project is available for educational and portfolio purposes.

See the repository license for the applicable terms.

---

## Author

**Marcelo Torres**

Software Engineer | Full-Stack Developer | Technical Lead

GitHub: [@MarceloTTorres](https://github.com/MarceloTTorres)

---

### ⭐ If you find this project useful

Feel free to explore the source code, open an issue, or suggest improvements.
