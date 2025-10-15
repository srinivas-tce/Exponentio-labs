#!/usr/bin/env node

/**
 * API Stress Testing Tool for Exponentio Labs Platform
 * Tests multiple APIs with 100 concurrent requests each
 */

const https = require('https');
const http = require('http');
const { performance } = require('perf_hooks');

// Configuration
const BASE_URL = 'https://exponential-labs.vercel.app'; // Production URL
const CONCURRENT_REQUESTS = 100;
const TIMEOUT_MS = 30000; // 30 seconds timeout

// Test APIs configuration
const TEST_APIS = [
  {
    name: 'Database Test',
    endpoint: '/api/test-db',
    method: 'GET',
    description: 'Tests Supabase connection and basic queries'
  },
  {
    name: 'Labs API',
    endpoint: '/api/labs',
    method: 'GET',
    description: 'Fetches all labs from database'
  },
  {
    name: 'Full Stack Service',
    endpoint: '/api/services/fullstack',
    method: 'GET',
    description: 'Fetches full stack service data with gigs'
  },
  {
    name: 'AR/VR Service',
    endpoint: '/api/services/ar-vr',
    method: 'GET',
    description: 'Fetches AR/VR service data'
  },
  {
    name: 'Robotics Service',
    endpoint: '/api/services/robotics',
    method: 'GET',
    description: 'Fetches robotics service data'
  },
  {
    name: 'Agentic AI Service',
    endpoint: '/api/services/agentic-ai',
    method: 'GET',
    description: 'Fetches AI service data'
  },
  {
    name: 'Embedded IoT Service',
    endpoint: '/api/services/embedded-iot',
    method: 'GET',
    description: 'Fetches IoT service data'
  },
  {
    name: 'Idea Labs Service',
    endpoint: '/api/services/idea-labs',
    method: 'GET',
    description: 'Fetches idea labs service data'
  }
];

// Utility function to make HTTP request
function makeRequest(url, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const startTime = performance.now();
    const isHttps = url.startsWith('https');
    const client = isHttps ? https : http;
    
    const options = {
      method,
      timeout: TIMEOUT_MS,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Stress-Test-Tool/1.0'
      }
    };

    if (data) {
      options.headers['Content-Length'] = Buffer.byteLength(data);
    }

    const req = client.request(url, options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        resolve({
          statusCode: res.statusCode,
          duration,
          data: responseData,
          headers: res.headers,
          success: res.statusCode >= 200 && res.statusCode < 300
        });
      });
    });

    req.on('error', (error) => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      reject({
        error: error.message,
        duration,
        success: false
      });
    });

    req.on('timeout', () => {
      req.destroy();
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      reject({
        error: 'Request timeout',
        duration,
        success: false
      });
    });

    if (data) {
      req.write(data);
    }
    
    req.end();
  });
}

// Run stress test for a single API
async function stressTestAPI(apiConfig) {
  console.log(`\n🚀 Starting stress test for: ${apiConfig.name}`);
  console.log(`📡 Endpoint: ${apiConfig.method} ${apiConfig.endpoint}`);
  console.log(`📊 Concurrent requests: ${CONCURRENT_REQUESTS}`);
  console.log(`⏱️  Timeout: ${TIMEOUT_MS}ms`);
  console.log(`📝 Description: ${apiConfig.description}`);
  
  const url = `${BASE_URL}${apiConfig.endpoint}`;
  const promises = [];
  const results = [];
  const errors = [];
  
  const testStartTime = performance.now();
  
  // Create concurrent requests
  for (let i = 0; i < CONCURRENT_REQUESTS; i++) {
    const promise = makeRequest(url, apiConfig.method)
      .then(result => {
        results.push(result);
        return result;
      })
      .catch(error => {
        errors.push(error);
        return error;
      });
    
    promises.push(promise);
  }
  
  // Wait for all requests to complete
  try {
    await Promise.all(promises);
  } catch (error) {
    console.error('❌ Error during stress test:', error);
  }
  
  const testEndTime = performance.now();
  const totalTestDuration = testEndTime - testStartTime;
  
  // Calculate statistics
  const successfulRequests = results.filter(r => r.success);
  const failedRequests = errors.length;
  const totalRequests = results.length + errors.length;
  const successRate = (successfulRequests.length / totalRequests) * 100;
  
  // Response time statistics
  const responseTimes = results.map(r => r.duration);
  const avgResponseTime = responseTimes.length > 0 
    ? responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length 
    : 0;
  
  const minResponseTime = responseTimes.length > 0 ? Math.min(...responseTimes) : 0;
  const maxResponseTime = responseTimes.length > 0 ? Math.max(...responseTimes) : 0;
  
  // Sort response times for percentile calculation
  const sortedResponseTimes = responseTimes.sort((a, b) => a - b);
  const p50 = sortedResponseTimes[Math.floor(sortedResponseTimes.length * 0.5)] || 0;
  const p90 = sortedResponseTimes[Math.floor(sortedResponseTimes.length * 0.9)] || 0;
  const p95 = sortedResponseTimes[Math.floor(sortedResponseTimes.length * 0.95)] || 0;
  const p99 = sortedResponseTimes[Math.floor(sortedResponseTimes.length * 0.99)] || 0;
  
  // Requests per second
  const requestsPerSecond = totalRequests / (totalTestDuration / 1000);
  
  // Status code distribution
  const statusCodes = {};
  results.forEach(result => {
    const code = result.statusCode || 'unknown';
    statusCodes[code] = (statusCodes[code] || 0) + 1;
  });
  
  // Error analysis
  const errorTypes = {};
  errors.forEach(error => {
    const errorType = error.error || 'unknown';
    errorTypes[errorType] = (errorTypes[errorType] || 0) + 1;
  });
  
  return {
    api: apiConfig.name,
    endpoint: apiConfig.endpoint,
    totalRequests,
    successfulRequests: successfulRequests.length,
    failedRequests,
    successRate: Math.round(successRate * 100) / 100,
    totalTestDuration: Math.round(totalTestDuration),
    requestsPerSecond: Math.round(requestsPerSecond * 100) / 100,
    responseTime: {
      average: Math.round(avgResponseTime * 100) / 100,
      min: Math.round(minResponseTime * 100) / 100,
      max: Math.round(maxResponseTime * 100) / 100,
      p50: Math.round(p50 * 100) / 100,
      p90: Math.round(p90 * 100) / 100,
      p95: Math.round(p95 * 100) / 100,
      p99: Math.round(p99 * 100) / 100
    },
    statusCodes,
    errorTypes,
    errors: errors.slice(0, 5) // First 5 errors for debugging
  };
}

// Generate comprehensive report
function generateReport(allResults) {
  console.log('\n' + '='.repeat(80));
  console.log('📊 STRESS TEST BENCHMARK REPORT');
  console.log('='.repeat(80));
  
  const overallStartTime = allResults[0]?.totalTestDuration || 0;
  const overallEndTime = allResults[allResults.length - 1]?.totalTestDuration || 0;
  const totalAPIs = allResults.length;
  const totalRequests = allResults.reduce((sum, r) => sum + r.totalRequests, 0);
  const totalSuccessful = allResults.reduce((sum, r) => sum + r.successfulRequests, 0);
  const totalFailed = allResults.reduce((sum, r) => sum + r.failedRequests, 0);
  const overallSuccessRate = (totalSuccessful / totalRequests) * 100;
  
  console.log(`\n📈 OVERALL SUMMARY`);
  console.log(`   Total APIs Tested: ${totalAPIs}`);
  console.log(`   Total Requests: ${totalRequests}`);
  console.log(`   Successful Requests: ${totalSuccessful}`);
  console.log(`   Failed Requests: ${totalFailed}`);
  console.log(`   Overall Success Rate: ${Math.round(overallSuccessRate * 100) / 100}%`);
  
  console.log(`\n🏆 TOP PERFORMING APIs (by success rate)`);
  const sortedBySuccess = [...allResults].sort((a, b) => b.successRate - a.successRate);
  sortedBySuccess.slice(0, 3).forEach((result, index) => {
    console.log(`   ${index + 1}. ${result.api}: ${result.successRate}% success rate`);
  });
  
  console.log(`\n⚡ FASTEST APIs (by average response time)`);
  const sortedBySpeed = [...allResults].sort((a, b) => a.responseTime.average - b.responseTime.average);
  sortedBySpeed.slice(0, 3).forEach((result, index) => {
    console.log(`   ${index + 1}. ${result.api}: ${result.responseTime.average}ms average`);
  });
  
  console.log(`\n📋 DETAILED RESULTS`);
  console.log('-'.repeat(80));
  
  allResults.forEach((result, index) => {
    console.log(`\n${index + 1}. ${result.api}`);
    console.log(`   Endpoint: ${result.endpoint}`);
    console.log(`   Success Rate: ${result.successRate}% (${result.successfulRequests}/${result.totalRequests})`);
    console.log(`   Response Time: ${result.responseTime.average}ms avg, ${result.responseTime.min}ms min, ${result.responseTime.max}ms max`);
    console.log(`   Percentiles: P50=${result.responseTime.p50}ms, P90=${result.responseTime.p90}ms, P95=${result.responseTime.p95}ms, P99=${result.responseTime.p99}ms`);
    console.log(`   Throughput: ${result.requestsPerSecond} req/sec`);
    console.log(`   Test Duration: ${result.totalTestDuration}ms`);
    
    if (Object.keys(result.statusCodes).length > 0) {
      console.log(`   Status Codes: ${JSON.stringify(result.statusCodes)}`);
    }
    
    if (Object.keys(result.errorTypes).length > 0) {
      console.log(`   Error Types: ${JSON.stringify(result.errorTypes)}`);
    }
    
    if (result.errors.length > 0) {
      console.log(`   Sample Errors:`);
      result.errors.forEach((error, i) => {
        console.log(`     ${i + 1}. ${error.error || 'Unknown error'}`);
      });
    }
  });
  
  console.log('\n' + '='.repeat(80));
  console.log('✅ Stress testing completed!');
  console.log('='.repeat(80));
}

// Main execution
async function main() {
  console.log('🚀 Exponentio Labs API Stress Testing Tool');
  console.log(`🌐 Base URL: ${BASE_URL}`);
  console.log(`⚡ Concurrent requests per API: ${CONCURRENT_REQUESTS}`);
  console.log(`⏱️  Request timeout: ${TIMEOUT_MS}ms`);
  
  const allResults = [];
  
  // Test each API
  for (const apiConfig of TEST_APIS) {
    try {
      const result = await stressTestAPI(apiConfig);
      allResults.push(result);
    } catch (error) {
      console.error(`❌ Failed to test ${apiConfig.name}:`, error);
      allResults.push({
        api: apiConfig.name,
        endpoint: apiConfig.endpoint,
        totalRequests: CONCURRENT_REQUESTS,
        successfulRequests: 0,
        failedRequests: CONCURRENT_REQUESTS,
        successRate: 0,
        totalTestDuration: 0,
        requestsPerSecond: 0,
        responseTime: { average: 0, min: 0, max: 0, p50: 0, p90: 0, p95: 0, p99: 0 },
        statusCodes: {},
        errorTypes: { 'Test Failed': CONCURRENT_REQUESTS },
        errors: [{ error: error.message || 'Unknown error', duration: 0, success: false }]
      });
    }
  }
  
  // Generate and display report
  generateReport(allResults);
  
  // Save results to file
  const fs = require('fs');
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `stress-test-results-${timestamp}.json`;
  
  try {
    fs.writeFileSync(filename, JSON.stringify(allResults, null, 2));
    console.log(`\n💾 Results saved to: ${filename}`);
  } catch (error) {
    console.error('❌ Failed to save results:', error);
  }
}

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n\n⚠️  Stress testing interrupted by user');
  process.exit(0);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught exception:', error);
  process.exit(1);
});

// Start the stress test
main().catch(error => {
  console.error('❌ Stress testing failed:', error);
  process.exit(1);
});
