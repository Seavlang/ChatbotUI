#!/usr/bin/env node
import { config } from 'dotenv';

config(); // Load environment variables from .env

// Access the API key from the environment variables
const apiKey = process.env.API_KEY;

if (apiKey) {
  console.log(`API Key loaded from .env: ${apiKey}`);
} else {
  console.log('No API Key found in .env. Please add API_KEY to your .env file.');
}
