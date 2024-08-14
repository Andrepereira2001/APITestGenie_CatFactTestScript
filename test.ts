import axios from 'axios';

describe('Cat Facts API integration tests', () => {
  const BASE_ENDPOINT = process.env.CATFACT_BASE_ENDPOINT;

  test('should receive a random cat fact', async () => {
    // Call the random fact endpoint
    const randomFactResponse = await axios.get(`${BASE_ENDPOINT}/fact`);

    // Check that the response status is 200 and fact is received
    expect(randomFactResponse.status).toBe(200);
    expect(randomFactResponse.data.fact).toBeDefined();
    expect(typeof randomFactResponse.data.fact).toBe('string');

    // A random fact should have a non-zero length
    expect(randomFactResponse.data.length).toBeGreaterThan(0);
  });

  test('should receive a different random cat fact on a subsequent request', async () => {
    // Call the random fact endpoint twice
    const firstResponse = await axios.get(`${BASE_ENDPOINT}/fact`);
    const secondResponse = await axios.get(`${BASE_ENDPOINT}/fact`);

    // Check that both facts are defined
    expect(firstResponse.data.fact).toBeDefined();
    expect(secondResponse.data.fact).toBeDefined();

    // Check that the facts received are different
    expect(firstResponse.data.fact).not.toBe(secondResponse.data.fact);
  });

  test('should respect the maximum length of facts when provided', async () => {
    // Define the maximum length for the test
    const maxLength = 50;

    // Call the random fact endpoint with the maximum length
    const response = await axios.get(`${BASE_ENDPOINT}/fact`, {
      params: { max_length: maxLength }
    });

    // Check that the fact received respects the maximum length
    expect(response.data.fact.length).toBeLessThanOrEqual(maxLength);
  });

  // Add more tests for other scenarios if necessary...
});