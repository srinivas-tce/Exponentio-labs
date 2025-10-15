#!/usr/bin/env node

/**
 * Advanced API Stress Testing Tool for Exponentio Labs Platform
 * Tests both GET and POST APIs with various load patterns
 */

const https = require('https');
const http = require('http');
const { performance } = require('perf_hooks');

// Configuration
const BASE_URL = 'https://exponential-labs.vercel.app'; // Production URL
const CONCURRENT_REQUESTS = 100;
const TIMEOUT_MS = 30000;

// Advanced test scenarios
const ADVANCED_TESTS = [
  {
    name: 'Database Connection Stress',
    endpoint: '/api/test-db',
    method: 'GET',
    description: 'Heavy database connection testing',
    loadPattern: 'burst'
  },
  {
    name: 'Labs API Load Test',
    endpoint: '/api/labs',
    method: 'GET',
    description: 'Labs data retrieval under load',
    loadPattern: 'sustained'
  },
  {
    name: 'Service APIs Load Test',
    endpoint: '/api/services/fullstack',
    method: 'GET',
    description: 'Complex service data with joins',
    loadPattern: 'ramp'
  },
  {
    name: 'Proposal Gig Details',
    endpoint: '/api/proposals/gig/1fd4c432-bab1-45e3-bdfd-01522edcb89f',
    method: 'GET',
    description: 'Proposal gig details with complex joins',
    loadPattern: 'burst'
  }
];

// Load patterns
const LOAD_PATTERNS = {
  burst: (requests) => {
    // All requests at once
    return Array(requests).fill(0).map(() => 0);
  },
  sustained: (requests) => {
    // Evenly distributed over time
    const interval = 100; // 100ms between requests
    return Array(requests).fill(0).map((_, i) => i * interval);
  },
  ramp: (requests) => {
    // Gradually increasing load
    const baseInterval = 50;
    return Array(requests).fill(0).map((_, i) => {
      const delay = Math.pow(i / requests, 2) * 1000; // Quadratic ramp
      return delay;
    });
  }
};

// Utility function to make HTTP request
function makeRequest(url, method = 'GET', data = null, delay = 0) {
  return new Promise((resolve, reject) => {
    const startTime = performance.now();
    const isHttps = url.startsWith('https');
    const client = isHttps ? https : http;
    
    const options = {
      method,
      timeout: TIMEOUT_MS,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Advanced-Stress-Test-Tool/1.0'
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
          success: res.statusCode >= 200 && res.statusCode < 300,
          delay
        });
      });
    });

    req.on('error', (error) => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      reject({
        error: error.message,
        duration,
        success: false,
        delay
      });
    });

    req.on('timeout', () => {
      req.destroy();
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      reject({
        error: 'Request timeout',
        duration,
        success: false,
        delay
      });
    });

    if (data) {
      req.write(data);
    }
    
    req.end();
  });
}

// Advanced stress test with load patterns
async function advancedStressTest(testConfig) {
  console.log(`\n🚀 Advanced stress test: ${testConfig.name}`);
  console.log(`📡 Endpoint: ${testConfig.method} ${testConfig.endpoint}`);
  console.log(`📊 Load pattern: ${testConfig.loadPattern}`);
  console.log(`📝 Description: ${testConfig.description}`);
  
  const url = `${BASE_URL}${testConfig.endpoint}`;
  const delays = LOAD_PATTERNS[testConfig.loadPattern](CONCURRENT_REQUESTS);
  const promises = [];
  const results = [];
  const errors = [];
  
  const testStartTime = performance.now();
  
  // Create requests with delays
  for (let i = 0; i < CONCURRENT_REQUESTS; i++) {
    const delay = delays[i];
    
    const promise = new Promise((resolve) => {
      setTimeout(async () => {
        try {
          const result = await makeRequest(url, testConfig.method, null, delay);
          results.push(result);
          resolve(result);
        } catch (error) {
          errors.push(error);
          resolve(error);
        }
      }, delay);
    });
    
    promises.push(promise);
  }
  
  // Wait for all requests to complete
  try {
    await Promise.all(promises);
  } catch (error) {
    console.error('❌ Error during advanced stress test:', error);
  }
  
  const testEndTime = performance.now();
  const totalTestDuration = testEndTime - testStartTime;
  
  // Calculate advanced statistics
  const successfulRequests = results.filter(r => r.success);
  const failedRequests = errors.length;
  const totalRequests = results.length + errors.length;
  const successRate = (successfulRequests.length / totalRequests) * 100;
  
  // Response time analysis
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
  
  // Throughput analysis
  const requestsPerSecond = totalRequests / (totalTestDuration / 1000);
  
  // Response time variance
  const variance = responseTimes.length > 0 
    ? responseTimes.reduce((sum, time) => sum + Math.pow(time - avgResponseTime, 2), 0) / responseTimes.length
    : 0;
  const standardDeviation = Math.sqrt(variance);
  
  // Error analysis
  const errorTypes = {};
  errors.forEach(error => {
    const errorType = error.error || 'unknown';
    errorTypes[errorType] = (errorTypes[errorType] || 0) + 1;
  });
  
  // Status code distribution
  const statusCodes = {};
  results.forEach(result => {
    const code = result.statusCode || 'unknown';
    statusCodes[code] = (statusCodes[code] || 0) + 1;
  });
  
  // Performance grade
  let performanceGrade = 'A';
  if (avgResponseTime > 1000) performanceGrade = 'C';
  else if (avgResponseTime > 500) performanceGrade = 'B';
  if (successRate < 95) performanceGrade = 'D';
  if (successRate < 90) performanceGrade = 'F';
  
  return {
    test: testConfig.name,
    endpoint: testConfig.endpoint,
    loadPattern: testConfig.loadPattern,
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
      p99: Math.round(p99 * 100) / 100,
      standardDeviation: Math.round(standardDeviation * 100) / 100
    },
    performanceGrade,
    statusCodes,
    errorTypes,
    errors: errors.slice(0, 3) // First 3 errors for debugging
  };
}

// Generate advanced report
function generateAdvancedReport(allResults) {
  console.log('\n' + '='.repeat(100));
  console.log('📊 ADVANCED STRESS TEST BENCHMARK REPORT');
  console.log('='.repeat(100));
  
  const totalAPIs = allResults.length;
  const totalRequests = allResults.reduce((sum, r) => sum + r.totalRequests, 0);
  const totalSuccessful = allResults.reduce((sum, r) => sum + r.successfulRequests, 0);
  const totalFailed = allResults.reduce((sum, r) => sum + r.failedRequests, 0);
  const overallSuccessRate = (totalSuccessful / totalRequests) * 100;
  
  console.log(`\n📈 EXECUTIVE SUMMARY`);
  console.log(`   Total Test Scenarios: ${totalAPIs}`);
  console.log(`   Total Requests: ${totalRequests}`);
  console.log(`   Successful Requests: ${totalSuccessful}`);
  console.log(`   Failed Requests: ${totalFailed}`);
  console.log(`   Overall Success Rate: ${Math.round(overallSuccessRate * 100) / 100}%`);
  
  // Performance grades distribution
  const gradeDistribution = {};
  allResults.forEach(result => {
    const grade = result.performanceGrade;
    gradeDistribution[grade] = (gradeDistribution[grade] || 0) + 1;
  });
  
  console.log(`\n🏆 PERFORMANCE GRADES`);
  Object.entries(gradeDistribution).forEach(([grade, count]) => {
    const percentage = (count / totalAPIs) * 100;
    console.log(`   Grade ${grade}: ${count} APIs (${Math.round(percentage * 100) / 100}%)`);
  });
  
  console.log(`\n⚡ PERFORMANCE LEADERS`);
  const sortedBySpeed = [...allResults].sort((a, b) => a.responseTime.average - b.responseTime.average);
  sortedBySpeed.slice(0, 3).forEach((result, index) => {
    console.log(`   ${index + 1}. ${result.test} (${result.loadPattern}): ${result.responseTime.average}ms avg - Grade ${result.performanceGrade}`);
  });
  
  console.log(`\n🛡️ RELIABILITY LEADERS`);
  const sortedByReliability = [...allResults].sort((a, b) => b.successRate - a.successRate);
  sortedByReliability.slice(0, 3).forEach((result, index) => {
    console.log(`   ${index + 1}. ${result.test}: ${result.successRate}% success rate - Grade ${result.performanceGrade}`);
  });
  
  console.log(`\n📊 DETAILED ANALYSIS`);
  console.log('-'.repeat(100));
  
  allResults.forEach((result, index) => {
    console.log(`\n${index + 1}. ${result.test} [${result.loadPattern.toUpperCase()}]`);
    console.log(`   Endpoint: ${result.endpoint}`);
    console.log(`   Performance Grade: ${result.performanceGrade}`);
    console.log(`   Success Rate: ${result.successRate}% (${result.successfulRequests}/${result.totalRequests})`);
    console.log(`   Response Time: ${result.responseTime.average}ms avg (σ=${result.responseTime.standardDeviation}ms)`);
    console.log(`   Response Range: ${result.responseTime.min}ms - ${result.responseTime.max}ms`);
    console.log(`   Percentiles: P50=${result.responseTime.p50}ms, P90=${result.responseTime.p90}ms, P95=${result.responseTime.p95}ms, P99=${result.responseTime.p99}ms`);
    console.log(`   Throughput: ${result.requestsPerSecond} req/sec`);
    console.log(`   Test Duration: ${result.totalTestDuration}ms`);
    
    if (Object.keys(result.statusCodes).length > 0) {
      console.log(`   Status Codes: ${JSON.stringify(result.statusCodes)}`);
    }
    
    if (Object.keys(result.errorTypes).length > 0) {
      console.log(`   Error Types: ${JSON.stringify(result.errorTypes)}`);
    }
  });
  
  // Recommendations
  console.log(`\n💡 RECOMMENDATIONS`);
  const slowAPIs = allResults.filter(r => r.responseTime.average > 1000);
  const unreliableAPIs = allResults.filter(r => r.successRate < 95);
  
  if (slowAPIs.length > 0) {
    console.log(`   ⚠️  ${slowAPIs.length} API(s) have slow response times (>1000ms):`);
    slowAPIs.forEach(api => {
      console.log(`      - ${api.test}: ${api.responseTime.average}ms average`);
    });
  }
  
  if (unreliableAPIs.length > 0) {
    console.log(`   ⚠️  ${unreliableAPIs.length} API(s) have reliability issues (<95% success):`);
    unreliableAPIs.forEach(api => {
      console.log(`      - ${api.test}: ${api.successRate}% success rate`);
    });
  }
  
  if (slowAPIs.length === 0 && unreliableAPIs.length === 0) {
    console.log(`   ✅ All APIs are performing well!`);
  }
  
  console.log('\n' + '='.repeat(100));
  console.log('✅ Advanced stress testing completed!');
  console.log('='.repeat(100));
}

// Main execution
async function main() {
  console.log('🚀 Exponentio Labs Advanced API Stress Testing Tool');
  console.log(`🌐 Base URL: ${BASE_URL}`);
  console.log(`⚡ Concurrent requests per test: ${CONCURRENT_REQUESTS}`);
  console.log(`⏱️  Request timeout: ${TIMEOUT_MS}ms`);
  console.log(`📊 Load patterns: burst, sustained, ramp`);
  
  const allResults = [];
  
  // Test each scenario
  for (const testConfig of ADVANCED_TESTS) {
    try {
      const result = await advancedStressTest(testConfig);
      allResults.push(result);
    } catch (error) {
      console.error(`❌ Failed to test ${testConfig.name}:`, error);
    }
  }
  
  // Generate and display report
  generateAdvancedReport(allResults);
  
  // Save results to file
  const fs = require('fs');
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `advanced-stress-test-results-${timestamp}.json`;
  
  try {
    fs.writeFileSync(filename, JSON.stringify(allResults, null, 2));
    console.log(`\n💾 Results saved to: ${filename}`);
  } catch (error) {
    console.error('❌ Failed to save results:', error);
  }
}

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n\n⚠️  Advanced stress testing interrupted by user');
  process.exit(0);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught exception:', error);
  process.exit(1);
});

// Start the advanced stress test
main().catch(error => {
  console.error('❌ Advanced stress testing failed:', error);
  process.exit(1);
});
