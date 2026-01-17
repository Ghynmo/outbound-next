
const express = require('express');
const next = require('next');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Server configuration
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

/**
 * Initialize and start the server
 */
async function startServer() {
  try {
    // Prepare Next.js app
    await app.prepare();

    console.log(`> Server starting in ${dev ? 'development' : 'production'} mode`);
    console.log(`> Database configuration: ${process.env.DB_TYPE}`);

    const server = express();

    // ==========================================
    // Middleware Configuration
    // ==========================================

    // Security Headers (Helmet)
    // Adjust contentSecurityPolicy for Next.js (images, scripts, etc.)
    server.use(
      helmet({
        contentSecurityPolicy: false, // Disabled for simplicity in Next.js, configure strictly if needed
        crossOriginEmbedderPolicy: false,
      })
    );

    // CORS Configuration
    // Allow requests from specific origins if defined in env, otherwise allow all (or default)
    const corsOptions = {
      origin: process.env.CORS_ORIGIN || '*', 
      optionsSuccessStatus: 200,
    };
    server.use(cors(corsOptions));

    // Compression (Gzip/Brotli)
    server.use(compression());

    // Logging (Morgan)
    // Use 'combined' for production (standard Apache log format), 'dev' for development
    server.use(morgan(dev ? 'dev' : 'combined'));

    // Body Parsing (if you have custom API routes in Express, though Next.js handles its own)
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));

    // ==========================================
    // Static Files (Optional: Express handling)
    // ==========================================
    // Next.js handles 'public' folder automatically, but if you have other static folders:
    // server.use('/static', express.static(path.join(__dirname, 'static')));

    // ==========================================
    // Custom API Routes (Optional: Express)
    // ==========================================
    // You can define custom Express routes here if you want to bypass Next.js routing
    // e.g. server.get('/api/health-check', (req, res) => res.send('OK'));
    
    server.get('/health', (req, res) => {
      res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
    });

    // ==========================================
    // Next.js Request Handling (Catch-all)
    // ==========================================
    server.all(/(.*)/, (req, res) => {
      return handle(req, res);
    });

    // ==========================================
    // Error Handling
    // ==========================================
    server.use((err, req, res, next) => {
      console.error('Server Error:', err);
      res.status(500).json({ 
        error: 'Internal Server Error', 
        message: dev ? err.message : 'Something went wrong' 
      });
    });

    // ==========================================
    // Start Listening
    // ==========================================
    server.listen(PORT, HOST, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://${HOST}:${PORT}`);
      console.log(`> Environment: ${process.env.NODE_ENV}`);
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
